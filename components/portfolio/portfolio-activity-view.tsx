import Link from "next/link";
import type { PortfolioActivity } from "@/lib/portfolio-analytics";

const numberFormatter = new Intl.NumberFormat("en-US");
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function PortfolioActivityView({ activity }: { activity: PortfolioActivity | null }) {
  if (!activity) return null;

  const measuredThrough = new Date(`${activity.measuredThrough}T00:00:00.000Z`);

  return (
    <aside
      aria-labelledby="portfolio-activity-title"
      data-portfolio-activity
      data-measured-through={activity.measuredThrough}
      className="border-b border-border py-6"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2
            id="portfolio-activity-title"
            className="text-sm font-medium text-foreground"
          >
            Portfolio activity
          </h2>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Anonymous aggregates · Last {activity.windowDays} days · through{" "}
            <time dateTime={activity.measuredThrough}>
              {dateFormatter.format(measuredThrough)}
            </time>
          </p>
        </div>

        <dl className="flex gap-7 sm:justify-end">
          <div>
            <dt className="text-xs text-muted-foreground">Visitors</dt>
            <dd className="mt-1 font-mono text-lg leading-none text-foreground">
              {numberFormatter.format(activity.visitors)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Page views</dt>
            <dd className="mt-1 font-mono text-lg leading-none text-foreground">
              {numberFormatter.format(activity.pageViews)}
            </dd>
          </div>
        </dl>
      </div>

      {activity.popularContent.length > 0 ? (
        <div className="mt-5 border-t border-border pt-3">
          <p className="text-xs text-muted-foreground">Most viewed</p>
          <ol className="mt-1 divide-y divide-border">
            {activity.popularContent.map((content) => (
              <li key={content.href}>
                <Link
                  href={content.href}
                  className="flex min-h-11 items-center justify-between gap-4 rounded-sm text-sm text-secondary-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>{content.title}</span>
                  <span className="shrink-0 font-mono text-xs text-muted-foreground">
                    {numberFormatter.format(content.pageViews)} views
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      ) : null}
    </aside>
  );
}
