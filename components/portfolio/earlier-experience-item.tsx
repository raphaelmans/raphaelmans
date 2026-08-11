import type { EarlierExperienceRecord } from "@/data/portfolio-data";
import { ExperienceSkills } from "./experience-skills";

export function EarlierExperienceItem({
  id,
  period,
  role,
  company,
  contribution,
  skills,
}: EarlierExperienceRecord) {
  return (
    <article data-experience={id} className="py-6">
      <div className="flex items-baseline justify-between gap-4 max-sm:flex-col max-sm:gap-1">
        <h4 className="font-medium text-foreground">
          {role} <span className="font-normal text-muted-foreground">· {company}</span>
        </h4>
        <time className="shrink-0 font-mono text-xs text-muted-foreground">{period}</time>
      </div>
      <p className="mt-2 max-w-[660px] text-sm leading-[1.65] text-muted-foreground">
        {contribution}
      </p>
      <ExperienceSkills skills={skills} />
    </article>
  );
}
