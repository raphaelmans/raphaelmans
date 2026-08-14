import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizePortfolioActivity,
  portfolioAnalyticsWindow,
  publishedAnalyticsRoutes,
} from "../../lib/portfolio-analytics";
import {
  buildVercelWebAnalyticsUrls,
  queryConfiguredPortfolioActivity,
  queryPortfolioActivity,
  readVercelWebAnalyticsConfig,
  type AnalyticsFetch,
} from "../../lib/vercel-web-analytics-core";
import {
  aggregateResponseFixture,
  analyticsWindowFixture,
  countResponseFixture,
} from "../fixtures/vercel-web-analytics";

const now = new Date("2026-08-14T16:45:00.000Z");

test("constructs an inclusive 30-day UTC window", () => {
  assert.deepEqual(portfolioAnalyticsWindow(now), analyticsWindowFixture);
});

test("builds the public route allowlist from published content registries", () => {
  const routes = publishedAnalyticsRoutes();
  assert.ok(routes.length > 3);
  assert.equal(routes[0]?.href, "/work/ample-news");
  assert.equal(routes.some(({ href }) => href === "/resume.pdf"), false);
  assert.equal(routes.some(({ href }) => href === "/"), false);
});

test("normalizes valid aggregate activity and excludes ineligible routes", () => {
  const activity = normalizePortfolioActivity({
    countPayload: countResponseFixture,
    aggregatePayload: aggregateResponseFixture,
    window: analyticsWindowFixture,
  });

  assert.deepEqual(activity, {
    windowDays: 30,
    visitors: 428,
    pageViews: 812,
    popularContent: [
      { href: "/work/ample-news", title: "Ample News", pageViews: 186 },
      { href: "/work/kudoscourts", title: "KudosCourts", pageViews: 144 },
      {
        href: "/engineering/transactional-reservation-boundaries",
        title: "Transactional boundaries for competing reservations",
        pageViews: 83,
      },
    ],
    measuredThrough: "2026-08-14",
  });
  assert.deepEqual(Object.keys(activity ?? {}).sort(), [
    "measuredThrough",
    "pageViews",
    "popularContent",
    "visitors",
    "windowDays",
  ]);
});

test("keeps totals when no eligible content route has activity", () => {
  const aggregate = {
    ...aggregateResponseFixture,
    data: [
      { requestPath: "/", pageviews: 500, visitors: 300 },
      { requestPath: "/resume.pdf", pageviews: 25, visitors: 21 },
    ],
  };

  const activity = normalizePortfolioActivity({
    countPayload: countResponseFixture,
    aggregatePayload: aggregate,
    window: analyticsWindowFixture,
  });
  assert.deepEqual(activity?.popularContent, []);
  assert.equal(activity?.pageViews, 812);
});

test("uses registry order to resolve equal page-view counts", () => {
  const aggregate = {
    ...aggregateResponseFixture,
    data: [
      { requestPath: "/work/cravingsph", pageviews: 50, visitors: 40 },
      { requestPath: "/work/kudoscourts", pageviews: 50, visitors: 40 },
      { requestPath: "/work/ample-news", pageviews: 50, visitors: 40 },
    ],
  };

  const activity = normalizePortfolioActivity({
    countPayload: countResponseFixture,
    aggregatePayload: aggregate,
    window: analyticsWindowFixture,
  });
  assert.deepEqual(
    activity?.popularContent.map(({ href }) => href),
    ["/work/ample-news", "/work/kudoscourts", "/work/cravingsph"]
  );
});

test("rejects duplicates, malformed dates, empty totals, and unsafe counts", () => {
  const duplicate = {
    ...aggregateResponseFixture,
    data: [...aggregateResponseFixture.data, aggregateResponseFixture.data[0]],
  };
  const malformedDate = {
    ...countResponseFixture,
    query: { ...countResponseFixture.query, since: "not-a-date" },
  };
  const empty = {
    ...countResponseFixture,
    data: { pageviews: 0, visitors: 0 },
  };
  const unsafe = {
    ...countResponseFixture,
    data: { ...countResponseFixture.data, pageviews: Number.MAX_SAFE_INTEGER + 1 },
  };

  for (const [countPayload, aggregatePayload] of [
    [countResponseFixture, duplicate],
    [malformedDate, aggregateResponseFixture],
    [empty, aggregateResponseFixture],
    [unsafe, aggregateResponseFixture],
  ]) {
    assert.equal(
      normalizePortfolioActivity({ countPayload, aggregatePayload, window: analyticsWindowFixture }),
      null
    );
  }
});

test("reads only valid server-side analytics configuration", () => {
  assert.equal(readVercelWebAnalyticsConfig({ NEXT_PUBLIC_VERCEL_WEB_ANALYTICS_TOKEN: "bad" }), null);
  assert.equal(readVercelWebAnalyticsConfig({ VERCEL_WEB_ANALYTICS_TOKEN: "token" }), null);
  assert.equal(
    readVercelWebAnalyticsConfig({
      VERCEL_WEB_ANALYTICS_TOKEN: " token ",
      VERCEL_PROJECT_ID: "prj_portfolio",
      VERCEL_ANALYTICS_TEAM_SLUG: "raphaelmans-projects",
    })?.token,
    "token"
  );
  assert.equal(
    readVercelWebAnalyticsConfig({
      VERCEL_WEB_ANALYTICS_TOKEN: "token",
      VERCEL_PROJECT_ID: "invalid",
    }),
    null
  );
});

test("builds fixed count and requestPath aggregate URLs", () => {
  const config = {
    token: "portfolio-test-token-must-not-leak",
    projectId: "prj_portfolio",
    teamSlug: "raphaelmans-projects",
  };
  const { countUrl, aggregateUrl } = buildVercelWebAnalyticsUrls(config, now);

  assert.match(countUrl, /^https:\/\/api\.vercel\.com\/v1\/query\/web-analytics\/visits\/count\?/);
  assert.match(aggregateUrl, /^https:\/\/api\.vercel\.com\/v1\/query\/web-analytics\/visits\/aggregate\?/);
  assert.equal(new URL(countUrl).searchParams.get("projectId"), "prj_portfolio");
  assert.equal(new URL(countUrl).searchParams.get("slug"), "raphaelmans-projects");
  assert.equal(new URL(countUrl).searchParams.get("since"), "2026-07-16T00:00:00.000Z");
  assert.equal(new URL(countUrl).searchParams.get("until"), now.toISOString());
  assert.equal(new URL(aggregateUrl).searchParams.get("by"), "requestPath");
  assert.equal(new URL(aggregateUrl).searchParams.get("limit"), "100");
  assert.equal(countUrl.includes(config.token), false);
});

test("accepts Vercel's inclusive next-midnight end boundary", () => {
  const count = {
    ...countResponseFixture,
    query: { ...countResponseFixture.query, until: "2026-08-15T00:00:00.000Z" },
  };
  assert.ok(
    normalizePortfolioActivity({
      countPayload: count,
      aggregatePayload: aggregateResponseFixture,
      window: analyticsWindowFixture,
    })
  );
});

test("adapter applies authentication, timeout caching, and returns only the public DTO", async () => {
  const requests: Array<{ url: string; init: Parameters<AnalyticsFetch>[1] }> = [];
  const fetcher: AnalyticsFetch = async (input, init) => {
    const url = String(input);
    requests.push({ url, init });
    const body = url.includes("/count?") ? countResponseFixture : aggregateResponseFixture;
    return new Response(JSON.stringify(body), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  };

  const activity = await queryPortfolioActivity({
    config: {
      token: "portfolio-test-token-must-not-leak",
      projectId: "prj_portfolio",
      teamSlug: "raphaelmans-projects",
    },
    fetcher,
    now,
  });

  assert.equal(requests.length, 2);
  for (const request of requests) {
    assert.equal(request.init.method, "GET");
    assert.equal(request.init.cache, "force-cache");
    assert.deepEqual(request.init.next, { revalidate: 21_600 });
    assert.equal(new Headers(request.init.headers).get("Authorization"), "Bearer portfolio-test-token-must-not-leak");
    assert.ok(request.init.signal instanceof AbortSignal);
  }
  assert.equal(JSON.stringify(activity).includes("portfolio-test-token-must-not-leak"), false);
  assert.equal(JSON.stringify(activity).includes("referrer"), false);
  assert.equal(JSON.stringify(activity).includes("country"), false);
});

test("adapter fails closed for provider and transport failures", async () => {
  const config = { token: "token", projectId: "prj_portfolio" };
  const rejected: AnalyticsFetch = async () => {
    throw new Error("network unavailable");
  };
  const unauthorized: AnalyticsFetch = async () => new Response(null, { status: 401 });

  assert.equal(await queryPortfolioActivity({ config, fetcher: rejected, now }), null);
  assert.equal(await queryPortfolioActivity({ config, fetcher: unauthorized, now }), null);
});

test("disabled and missing configuration states perform no provider fetch", async () => {
  let fetchCount = 0;
  const fetcher: AnalyticsFetch = async () => {
    fetchCount += 1;
    return new Response(null, { status: 500 });
  };

  assert.equal(
    await queryConfiguredPortfolioActivity({
      environment: {},
      isProduction: true,
      fetcher,
      now,
    }),
    null
  );
  assert.equal(
    await queryConfiguredPortfolioActivity({
      environment: {
        VERCEL_WEB_ANALYTICS_TOKEN: "token",
        VERCEL_PROJECT_ID: "prj_portfolio",
      },
      isProduction: false,
      fetcher,
      now,
    }),
    null
  );
  assert.equal(fetchCount, 0);
});
