import type { Experience } from "@/data/portfolio-data";
import { TechTag } from "./tech-tag";

export function ExperienceItem({ period, role, company, description, tags, glowTags }: Experience) {
  return (
    <div className="group p-4 -mx-4 rounded-lg border-[0.5px] border-transparent hover:border-white/10 hover:bg-white/[0.015] transition-[border-color,background-color] duration-200">
      <div className="flex justify-between items-baseline gap-4 mb-1.5">
        <h3 className="text-base font-medium leading-[1.3] text-foreground group-hover:text-accent-sky transition-colors duration-150">
          {role}{" "}
          <span className="font-normal text-zinc-400">&middot; {company}</span>
        </h3>
        <span className="text-xs font-mono text-zinc-500 whitespace-nowrap shrink-0">
          {period}
        </span>
      </div>
      <p className="text-[15px] text-zinc-400 leading-[1.65] mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <TechTag key={tag} glow={glowTags.includes(tag)}>
            {tag}
          </TechTag>
        ))}
      </div>
    </div>
  );
}
