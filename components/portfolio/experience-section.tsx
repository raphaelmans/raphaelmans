"use client";

import { experiences } from "@/data/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ExperienceItem } from "./experience-item";

export function ExperienceSection() {
  return (
    <section id="experience" className="pb-[72px]">
      <Reveal>
        <SectionHeading>Experience</SectionHeading>
        <div className="flex flex-col gap-2">
          {experiences.map((exp) => (
            <ExperienceItem key={exp.company} {...exp} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
