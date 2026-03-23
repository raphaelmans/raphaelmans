"use client";

import { projects } from "@/data/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ProjectItem } from "./project-item";

export function ProjectsSection() {
  return (
    <section id="projects" className="pb-[72px]">
      <Reveal>
        <SectionHeading>Personal Projects</SectionHeading>
        <div className="flex flex-col gap-2">
          {projects.map((project) => (
            <ProjectItem key={project.title} {...project} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
