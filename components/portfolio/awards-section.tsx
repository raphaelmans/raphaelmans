"use client";

import { awards } from "@/data/portfolio-data";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { ExternalLinkIcon } from "./external-link-icon";

export function AwardsSection() {
  return (
    <section id="awards" className="pb-[72px]">
      <Reveal>
        <SectionHeading>Awards</SectionHeading>
        <div className="flex flex-col gap-4">
          {awards.map((award) => (
            <div key={award.title} className="group">
              {award.url ? (
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 no-underline"
                >
                  <h3 className="text-base font-medium text-foreground leading-[1.3] group-hover:text-accent-sky transition-colors duration-150">
                    {award.title}
                  </h3>
                  <ExternalLinkIcon />
                </a>
              ) : (
                <h3 className="text-base font-medium text-foreground leading-[1.3]">
                  {award.title}
                </h3>
              )}
              <p className="text-[15px] text-zinc-400 mt-1">
                {award.org} · {award.detail}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
