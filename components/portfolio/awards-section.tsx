import { awards } from "@/data/portfolio-data";
import { SectionHeading } from "./section-heading";
import { ExternalLinkIcon } from "./external-link-icon";

export function RecognitionSection() {
  return (
    <section id="recognition" className="pb-[72px]">
      <SectionHeading>Recognition</SectionHeading>
      <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
        {awards.map((award) => (
          <div key={award.title} className="group border-t border-border pt-3">
            {award.url ? (
              <a
                href={award.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 rounded-sm no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <h3 className="text-base font-medium leading-[1.3] text-foreground transition-colors duration-150 group-hover:text-primary">
                  {award.title}
                </h3>
                <ExternalLinkIcon />
              </a>
            ) : (
              <h3 className="text-base font-medium leading-[1.3] text-foreground">
                {award.title}
              </h3>
            )}
              <p className="text-sm leading-[1.55] text-muted-foreground">
              {award.org} · {award.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
