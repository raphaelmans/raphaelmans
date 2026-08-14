import { caseStudies } from "@/data/case-studies";
import { engineeringNotes } from "@/data/engineering-notes";
import { isValidPublicDate } from "@/data/public-date";

export const PORTFOLIO_ACTIVITY_WINDOW_DAYS = 30 as const;
export const PORTFOLIO_ACTIVITY_LIMIT = 3;
export const VERCEL_ANALYTICS_ROUTE_LIMIT = 100;
export const VERCEL_ANALYTICS_REVALIDATE_SECONDS = 60 * 60 * 6;
export const VERCEL_ANALYTICS_TIMEOUT_MS = 2_500;

export interface PopularPortfolioContent {
  href: string;
  title: string;
  pageViews: number;
}

export interface PortfolioActivity {
  windowDays: typeof PORTFOLIO_ACTIVITY_WINDOW_DAYS;
  visitors: number;
  pageViews: number;
  popularContent: PopularPortfolioContent[];
  measuredThrough: string;
}

export interface PortfolioAnalyticsWindow {
  since: string;
  until: string;
  measuredThrough: string;
}

interface PublicAnalyticsRoute {
  href: string;
  title: string;
  order: number;
}

const publicAnalyticsRoutes: PublicAnalyticsRoute[] = [
  ...caseStudies.map((caseStudy) => ({
    href: `/work/${caseStudy.slug}`,
    title: caseStudy.shortTitle,
  })),
  ...engineeringNotes.map((note) => ({
    href: `/engineering/${note.slug}`,
    title: note.title,
  })),
].map((route, order) => ({ ...route, order }));

const publicAnalyticsRouteByPath = new Map(
  publicAnalyticsRoutes.map((route) => [route.href, route])
);

function formatUtcDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfUtcDay(date: Date) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function isValidCountPair(
  value: unknown
): value is Record<string, unknown> & { pageviews: number; visitors: number } {
  if (!isRecord(value)) return false;
  if (!isSafeCount(value.pageviews) || !isSafeCount(value.visitors)) return false;
  return value.pageviews >= value.visitors && (value.pageviews === 0) === (value.visitors === 0);
}

function dateMatchesWindowBoundary(value: unknown, expected: string) {
  if (typeof value !== "string") return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString().slice(0, 10) === expected;
}

function dateMatchesWindowEnd(value: unknown, expected: string) {
  if (dateMatchesWindowBoundary(value, expected)) return true;
  if (typeof value !== "string") return false;
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return false;

  const nextDay = new Date(`${expected}T00:00:00.000Z`);
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  return timestamp === nextDay.getTime();
}

function hasExpectedQueryWindow(value: unknown, window: PortfolioAnalyticsWindow) {
  return (
    isRecord(value) &&
    dateMatchesWindowBoundary(value.since, window.since) &&
    dateMatchesWindowEnd(value.until, window.until)
  );
}

export function portfolioAnalyticsWindow(now = new Date()): PortfolioAnalyticsWindow {
  const until = startOfUtcDay(now);
  const since = new Date(until);
  since.setUTCDate(since.getUTCDate() - (PORTFOLIO_ACTIVITY_WINDOW_DAYS - 1));

  const window = {
    since: formatUtcDate(since),
    until: formatUtcDate(until),
    measuredThrough: formatUtcDate(until),
  };

  if (!isValidPublicDate(window.since) || !isValidPublicDate(window.until)) {
    throw new Error("Could not construct a valid portfolio analytics window");
  }

  return window;
}

export function publishedAnalyticsRoutes() {
  return publicAnalyticsRoutes.map(({ href, title }) => ({ href, title }));
}

export function normalizePortfolioActivity({
  countPayload,
  aggregatePayload,
  window,
}: {
  countPayload: unknown;
  aggregatePayload: unknown;
  window: PortfolioAnalyticsWindow;
}): PortfolioActivity | null {
  if (!isValidPublicDate(window.measuredThrough)) return null;
  if (!isRecord(countPayload) || countPayload.version !== 1) return null;
  if (!hasExpectedQueryWindow(countPayload.query, window)) return null;
  if (!isValidCountPair(countPayload.data)) return null;
  if (countPayload.data.pageviews === 0 || countPayload.data.visitors === 0) return null;

  if (!isRecord(aggregatePayload) || aggregatePayload.version !== 1) return null;
  if (!hasExpectedQueryWindow(aggregatePayload.query, window)) return null;
  if (!isRecord(aggregatePayload.query)) return null;
  if (
    !Array.isArray(aggregatePayload.query.groupBy) ||
    aggregatePayload.query.groupBy.length !== 1 ||
    aggregatePayload.query.groupBy[0] !== "requestPath" ||
    !isSafeCount(aggregatePayload.query.limit) ||
    aggregatePayload.query.limit < 1 ||
    aggregatePayload.query.limit > VERCEL_ANALYTICS_ROUTE_LIMIT
  ) {
    return null;
  }
  if (!Array.isArray(aggregatePayload.data)) return null;

  const seenPaths = new Set<string>();
  const eligibleContent: Array<PopularPortfolioContent & { order: number }> = [];

  for (const row of aggregatePayload.data) {
    if (!isRecord(row) || typeof row.requestPath !== "string" || !isValidCountPair(row)) {
      return null;
    }
    if (seenPaths.has(row.requestPath)) return null;
    seenPaths.add(row.requestPath);

    const publicRoute = publicAnalyticsRouteByPath.get(row.requestPath);
    if (!publicRoute || row.pageviews === 0) continue;

    eligibleContent.push({
      href: publicRoute.href,
      title: publicRoute.title,
      pageViews: row.pageviews,
      order: publicRoute.order,
    });
  }

  const eligiblePageViews = eligibleContent.reduce(
    (total, content) => total + content.pageViews,
    0
  );
  if (
    !Number.isSafeInteger(eligiblePageViews) ||
    eligiblePageViews > countPayload.data.pageviews
  ) {
    return null;
  }

  const popularContent = eligibleContent
    .sort((left, right) => right.pageViews - left.pageViews || left.order - right.order)
    .slice(0, PORTFOLIO_ACTIVITY_LIMIT)
    .map(({ href, title, pageViews }) => ({ href, title, pageViews }));

  return {
    windowDays: PORTFOLIO_ACTIVITY_WINDOW_DAYS,
    visitors: countPayload.data.visitors,
    pageViews: countPayload.data.pageviews,
    popularContent,
    measuredThrough: window.measuredThrough,
  };
}
