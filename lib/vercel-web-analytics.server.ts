import "server-only";

import {
  queryConfiguredPortfolioActivity,
} from "@/lib/vercel-web-analytics-core";
import type { PortfolioActivity } from "@/lib/portfolio-analytics";

const localBrowserFixture: PortfolioActivity = {
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
};

export async function getPortfolioActivity(): Promise<PortfolioActivity | null> {
  if (
    process.env.PORTFOLIO_ANALYTICS_TEST_FIXTURE === "visible" &&
    process.env.VERCEL !== "1"
  ) {
    return localBrowserFixture;
  }

  return queryConfiguredPortfolioActivity({
    environment: process.env,
    isProduction: process.env.VERCEL_ENV === "production",
  });
}
