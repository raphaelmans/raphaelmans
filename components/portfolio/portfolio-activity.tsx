import { PortfolioActivityView } from "@/components/portfolio/portfolio-activity-view";
import { getPortfolioActivity } from "@/lib/vercel-web-analytics.server";

export async function PortfolioActivity() {
  const activity = await getPortfolioActivity();
  if (!activity) return null;

  return <PortfolioActivityView activity={activity} />;
}
