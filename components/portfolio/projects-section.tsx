import { featuredWork } from "@/data/portfolio-data";
import { SectionHeading } from "./section-heading";
import { ProjectItem } from "./project-item";

export function FeaturedWorkSection() {
  return (
    <section id="work" tabIndex={-1} className="scroll-mt-20 pb-[92px] outline-none">
      <SectionHeading>Selected work</SectionHeading>
      <p className="-mt-4 mb-8 max-w-[620px] text-[15px] leading-[1.7] text-muted-foreground">
        One flagship production-AI system, followed by two supporting product proofs.
        Each case study carries the implementation detail.
      </p>
      <div data-selected-work-list>
        {featuredWork.map((project) => (
          <ProjectItem key={project.slug} {...project} />
        ))}
      </div>
    </section>
  );
}
