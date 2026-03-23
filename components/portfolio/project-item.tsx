import type { Project } from "@/data/portfolio-data";
import { TechTag } from "./tech-tag";
import { ExternalLinkIcon } from "./external-link-icon";

export function ProjectItem({ title, url, description, tags, glowTags }: Project) {
  const Tag = url ? "a" : "div";
  const linkProps = url
    ? { href: url, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  return (
    <Tag
      {...linkProps}
      className="group block p-4 -mx-4 rounded-lg border-[0.5px] border-transparent hover:border-white/10 hover:bg-white/[0.015] transition-[border-color,background-color] duration-200 no-underline"
      style={{ cursor: url ? "pointer" : "default" }}
    >
      <div className="flex items-center gap-[5px] mb-1.5">
        <h3 className="text-base font-medium text-foreground group-hover:text-accent-sky transition-colors duration-150">
          {title}
        </h3>
        {url && <ExternalLinkIcon />}
      </div>
      <p className="text-[15px] text-zinc-400 leading-[1.6] mb-3">
        {description}
      </p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <TechTag key={tag} glow={glowTags.includes(tag)}>
            {tag}
          </TechTag>
        ))}
      </div>
    </Tag>
  );
}
