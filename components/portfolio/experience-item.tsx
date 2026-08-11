import type { PrimaryExperienceRecord } from "@/data/portfolio-data";

export function ExperienceItem({
  period,
  role,
  company,
  status,
  summary,
  proofPoints,
  tags,
}: PrimaryExperienceRecord) {
  return (
    <article className="py-8 first:pt-0 last:pb-0">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col max-sm:gap-2">
        <div>
          <h3 className="text-lg font-medium leading-[1.3] tracking-[-0.015em] text-foreground">
            {role} <span className="font-normal text-muted-foreground">· {company}</span>
          </h3>
          {status === "Current" && (
            <span className="mt-2 inline-flex rounded-full border border-primary/25 bg-accent px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-accent-foreground">
              Current
            </span>
          )}
        </div>
        <time className="shrink-0 whitespace-nowrap font-mono text-xs text-muted-foreground">
          {period}
        </time>
      </div>

      <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-secondary-foreground">
        {summary}
      </p>

      <ul className="mt-4 max-w-[680px] space-y-2 text-sm leading-[1.65] text-muted-foreground">
        {proofPoints.slice(0, 2).map((proofPoint) => (
          <li
            key={proofPoint}
            data-homepage-proof-point
            className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-1.5 before:bg-primary/60"
          >
            {proofPoint}
          </li>
        ))}
      </ul>

      <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
        {tags.slice(0, 6).join(" · ")}
      </p>
    </article>
  );
}
