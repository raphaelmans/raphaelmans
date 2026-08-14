import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { PortfolioActivityView } from "../../components/portfolio/portfolio-activity-view";
import type { PortfolioActivity } from "../../lib/portfolio-analytics";

const activity: PortfolioActivity = {
  windowDays: 30,
  visitors: 428,
  pageViews: 812,
  popularContent: [
    { href: "/work/ample-news", title: "Ample News", pageViews: 186 },
    { href: "/work/kudoscourts", title: "KudosCourts", pageViews: 144 },
  ],
  measuredThrough: "2026-08-14",
};

function render(value: PortfolioActivity | null) {
  return renderToStaticMarkup(createElement(PortfolioActivityView, { activity: value }));
}

test("renders a named aggregate region with semantic metrics and ranked links", () => {
  const html = render(activity);

  assert.match(html, /<aside[^>]*aria-labelledby="portfolio-activity-title"/);
  assert.match(html, /<dl/);
  assert.match(html, /Visitors/);
  assert.match(html, />428</);
  assert.match(html, /Page views/);
  assert.match(html, />812</);
  assert.match(html, /Anonymous aggregates · Last 30 days/);
  assert.match(html, /href="\/work\/ample-news"/);
  assert.match(html, /href="\/work\/kudoscourts"/);
});

test("renders totals without inventing ranked content", () => {
  const html = render({ ...activity, popularContent: [] });

  assert.match(html, /Portfolio activity/);
  assert.doesNotMatch(html, /Most viewed/);
  assert.doesNotMatch(html, /<ol/);
});

test("renders nothing when aggregate activity is unavailable", () => {
  assert.equal(render(null), "");
});

test("public markup contains no credential or provider-only response fields", () => {
  const html = render(activity);

  for (const forbidden of [
    "portfolio-test-token-must-not-leak",
    "Authorization",
    "referrerHostname",
    "country",
    "deviceType",
  ]) {
    assert.equal(html.includes(forbidden), false, `${forbidden} must not be public`);
  }
});
