import {
  normalizePortfolioActivity,
  portfolioAnalyticsWindow,
  VERCEL_ANALYTICS_REVALIDATE_SECONDS,
  VERCEL_ANALYTICS_ROUTE_LIMIT,
  VERCEL_ANALYTICS_TIMEOUT_MS,
  type PortfolioActivity,
} from "@/lib/portfolio-analytics";

const VERCEL_WEB_ANALYTICS_API = "https://api.vercel.com/v1/query/web-analytics/visits";

export interface VercelWebAnalyticsConfig {
  token: string;
  projectId: string;
  teamId?: string;
  teamSlug?: string;
}

export interface AnalyticsRequestInit extends RequestInit {
  next: { revalidate: number };
}

export type AnalyticsFetch = (
  input: string | URL,
  init: AnalyticsRequestInit
) => Promise<Response>;

function hasValue(value: string | undefined): value is string {
  return Boolean(value?.trim());
}

export function readVercelWebAnalyticsConfig(
  environment: Readonly<Record<string, string | undefined>>
): VercelWebAnalyticsConfig | null {
  const token = environment.VERCEL_WEB_ANALYTICS_TOKEN?.trim();
  const projectId = (
    environment.VERCEL_ANALYTICS_PROJECT_ID ?? environment.VERCEL_PROJECT_ID
  )?.trim();
  const teamId = environment.VERCEL_ANALYTICS_TEAM_ID?.trim();
  const teamSlug = environment.VERCEL_ANALYTICS_TEAM_SLUG?.trim();

  if (!hasValue(token) || !hasValue(projectId)) return null;
  if (!projectId.startsWith("prj_")) return null;
  if (teamId && !teamId.startsWith("team_")) return null;
  if (teamSlug && !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(teamSlug)) return null;

  return {
    token,
    projectId,
    ...(teamId ? { teamId } : {}),
    ...(!teamId && teamSlug ? { teamSlug } : {}),
  };
}

function sharedSearchParams(
  config: VercelWebAnalyticsConfig,
  window: ReturnType<typeof portfolioAnalyticsWindow>,
  untilTimestamp: string
) {
  const searchParams = new URLSearchParams({
    projectId: config.projectId,
    since: `${window.since}T00:00:00.000Z`,
    until: untilTimestamp,
  });
  if (config.teamId) searchParams.set("teamId", config.teamId);
  else if (config.teamSlug) searchParams.set("slug", config.teamSlug);
  return searchParams;
}

export function buildVercelWebAnalyticsUrls(
  config: VercelWebAnalyticsConfig,
  now = new Date()
) {
  const window = portfolioAnalyticsWindow(now);
  const untilTimestamp = now.toISOString();
  const countSearch = sharedSearchParams(config, window, untilTimestamp);
  const aggregateSearch = sharedSearchParams(config, window, untilTimestamp);
  aggregateSearch.set("by", "requestPath");
  aggregateSearch.set("limit", String(VERCEL_ANALYTICS_ROUTE_LIMIT));

  return {
    countUrl: `${VERCEL_WEB_ANALYTICS_API}/count?${countSearch.toString()}`,
    aggregateUrl: `${VERCEL_WEB_ANALYTICS_API}/aggregate?${aggregateSearch.toString()}`,
    window,
  };
}

export async function queryPortfolioActivity({
  config,
  fetcher = fetch,
  now = new Date(),
}: {
  config: VercelWebAnalyticsConfig;
  fetcher?: AnalyticsFetch;
  now?: Date;
}): Promise<PortfolioActivity | null> {
  const { countUrl, aggregateUrl, window } = buildVercelWebAnalyticsUrls(config, now);
  const signal = AbortSignal.timeout(VERCEL_ANALYTICS_TIMEOUT_MS);
  const requestInit: AnalyticsRequestInit = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${config.token}`,
    },
    cache: "force-cache",
    next: { revalidate: VERCEL_ANALYTICS_REVALIDATE_SECONDS },
    signal,
  };

  try {
    const [countResponse, aggregateResponse] = await Promise.all([
      fetcher(countUrl, requestInit),
      fetcher(aggregateUrl, requestInit),
    ]);
    if (!countResponse.ok || !aggregateResponse.ok) return null;

    const [countPayload, aggregatePayload] = await Promise.all([
      countResponse.json() as Promise<unknown>,
      aggregateResponse.json() as Promise<unknown>,
    ]);

    return normalizePortfolioActivity({ countPayload, aggregatePayload, window });
  } catch {
    return null;
  }
}

export async function queryConfiguredPortfolioActivity({
  environment,
  isProduction,
  fetcher = fetch,
  now = new Date(),
}: {
  environment: Readonly<Record<string, string | undefined>>;
  isProduction: boolean;
  fetcher?: AnalyticsFetch;
  now?: Date;
}): Promise<PortfolioActivity | null> {
  if (!isProduction) return null;

  const config = readVercelWebAnalyticsConfig(environment);
  if (!config) return null;

  return queryPortfolioActivity({ config, fetcher, now });
}
