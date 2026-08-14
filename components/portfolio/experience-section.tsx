import {
  experiences,
  type EarlierExperienceRecord,
  type PrimaryExperienceRecord,
} from "@/data/portfolio-data";
import { Download } from "lucide-react";
import { EarlierExperienceItem } from "./earlier-experience-item";
import { ExperienceItem } from "./experience-item";
import { SectionHeading } from "./section-heading";

const primaryExperience = experiences.filter(
  (experience): experience is PrimaryExperienceRecord =>
    experience.presentation === "primary"
);

const earlierExperience = experiences.filter(
  (experience): experience is EarlierExperienceRecord =>
    experience.presentation === "earlier"
);

export function ExperienceSection() {
  return (
    <section id="experience" tabIndex={-1} className="pb-[92px] outline-none">
      <SectionHeading>Experience that carries the work</SectionHeading>
      <div className="divide-y divide-border" data-experience-list>
        {primaryExperience.map((experience) => (
          <ExperienceItem key={experience.id} {...experience} />
        ))}
      </div>

      <div className="mt-10">
        <h3 className="mb-2 text-lg font-medium tracking-[-0.015em] text-foreground">
          Earlier experience
        </h3>
        <div className="divide-y divide-border">
          {earlierExperience.map((experience) => (
            <EarlierExperienceItem key={experience.id} {...experience} />
          ))}
        </div>
      </div>

      <a
        href="/resume.pdf"
        download
        data-experience-resume-action
        className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-sm px-1 text-sm text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        View the complete experience record
        <Download className="size-4" aria-hidden="true" />
      </a>
    </section>
  );
}
