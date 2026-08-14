import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import type { CaseStudyRecord } from "@/data/case-studies";
import type { EngineeringNoteRecord } from "@/data/engineering-notes";
import { EvidenceModel } from "@/components/portfolio/evidence-model";
import { RelatedEngineeringNotes } from "@/components/portfolio/related-engineering-notes";

const caseStudyDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatCaseStudyDate(value: string) {
  return caseStudyDateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export function CaseStudyHeader({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  return (
    <header className="border-b border-border pb-12">
      <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
        {caseStudy.eyebrow}
      </p>
      <h1 className="mt-5 max-w-[760px] text-[50px] font-semibold leading-[1.06] tracking-[-0.045em] text-pretty max-sm:text-[37px]">
        {caseStudy.headline}
      </h1>
      <p className="mt-6 max-w-[720px] text-lg leading-[1.75] text-secondary-foreground">
        {caseStudy.summary}
      </p>
      <p className="mt-4 max-w-[720px] text-sm leading-[1.7] text-muted-foreground">
        {caseStudy.orientation}
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-4">
        {caseStudy.externalUrl && caseStudy.externalLabel && (
          <a
            href={caseStudy.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {caseStudy.externalLabel}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
        <span className="font-mono text-xs text-muted-foreground">
          Last reviewed{" "}
          <time dateTime={caseStudy.lastReviewed}>
            {formatCaseStudyDate(caseStudy.lastReviewed)}
          </time>
        </span>
      </div>
    </header>
  );
}

export function CaseStudySnapshot({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  const details = [
    ["Classification", caseStudy.classification],
    ["Status", caseStudy.status],
    ["Period", caseStudy.period],
    ["Role", caseStudy.role],
    ["Platforms", caseStudy.platforms],
  ];

  return (
    <section aria-labelledby="snapshot-heading" className="py-12">
      <h2 id="snapshot-heading" className="sr-only">
        Project snapshot
      </h2>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-5">
        {details.map(([label, value]) => (
          <div key={label} className="min-h-28 bg-background p-4">
            <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              {label}
            </dt>
            <dd className="mt-3 text-sm leading-[1.55] text-secondary-foreground">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function EvidenceList({
  title,
  items,
  comfortable = false,
}: {
  title: string;
  items: readonly string[];
  comfortable?: boolean;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul
        className={
          comfortable
            ? "mt-3 space-y-3 text-[15px] leading-[1.7] text-muted-foreground"
            : "mt-3 space-y-2 text-sm leading-[1.65] text-muted-foreground"
        }
      >
        {items.map((item) => (
          <li key={item} className="relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2 before:bg-primary/60">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyEvidence({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  return (
    <section aria-labelledby="evidence-heading" className="border-t border-border py-14">
      <h2 id="evidence-heading" className="text-2xl font-medium tracking-[-0.025em]">
        Evidence at a glance
      </h2>
      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <EvidenceList title="Constraints" items={caseStudy.constraints} />
        <div>
          <h3 className="text-sm font-semibold text-foreground">Attributable ownership</h3>
          <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
            {caseStudy.ownershipSummary}
          </p>
        </div>
        <EvidenceList title="Consequential decisions" items={caseStudy.decisions} />
        <EvidenceList title="Reliability and correctness" items={caseStudy.reliabilityEvidence} />
      </div>
      <div className="mt-8 rounded-lg border border-border bg-secondary/45 p-5">
        <h3 className="text-sm font-semibold text-foreground">Observable evidence</h3>
        <p className="mt-2 text-[15px] leading-[1.75] text-secondary-foreground">
          {caseStudy.observableEvidence}
        </p>
      </div>
    </section>
  );
}

export function CaseStudyNarrative({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  return (
    <div className="divide-y divide-border">
      {caseStudy.sections.map((section, index) => {
        const sectionEvidence = caseStudy.evidence.filter(
          (model) => model.caseStudySectionId === section.id
        );

        return (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="grid gap-5 py-12 md:grid-cols-[160px_1fr] md:gap-12"
          >
            <div>
              <span className="font-mono text-[10px] text-muted-foreground">0{index + 1}</span>
            </div>
            <div>
              <h2
                id={`${section.id}-heading`}
                className="text-2xl font-medium tracking-[-0.025em] text-foreground text-pretty"
              >
                {section.title}
              </h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-secondary-foreground">
                {section.lead}
              </p>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-4 text-[15px] leading-[1.8] text-muted-foreground">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 space-y-3 text-[15px] leading-[1.7] text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2 before:bg-primary/60">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
              {sectionEvidence.map((model) => (
                <EvidenceModel key={model.id} model={model} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function CaseStudyBoundaries({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  return (
    <section aria-labelledby="boundaries-heading" className="border-b border-border py-12">
      <h2 id="boundaries-heading" className="text-2xl font-medium tracking-[-0.025em]">
        Limitations and next steps
      </h2>
      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <EvidenceList title="Honest limitations" items={caseStudy.limitations} comfortable />
        <EvidenceList title="Next evidence to establish" items={caseStudy.nextSteps} comfortable />
      </div>
    </section>
  );
}

function CaseStudyCallToAction({ caseStudy }: { caseStudy: CaseStudyRecord }) {
  return (
    <aside className="rounded-lg border border-primary/20 bg-accent p-6 sm:p-8">
      <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent-foreground">
        Next step
      </p>
      <h2 className="mt-3 text-2xl font-medium tracking-[-0.025em]">
        Need someone who can own the difficult middle?
      </h2>
      <p className="mt-3 max-w-[620px] text-[15px] leading-[1.75] text-secondary-foreground">
        I work best where product behavior crosses APIs, data, workflows,
        infrastructure, and user-facing decisions.
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="mailto:raphaelmansueto@gmail.com"
          className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground no-underline hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Email Raphael
          <Mail className="size-4" aria-hidden="true" />
        </a>
        <Link
          href="/#work"
          className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 py-2.5 text-sm text-muted-foreground no-underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          Return to Selected Work
          <ArrowUpRight className="size-3.5" aria-hidden="true" />
        </Link>
        {caseStudy.relatedStudySlug && caseStudy.relatedStudyLabel && (
          <Link
            href={`/work/${caseStudy.relatedStudySlug}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 py-2.5 text-sm text-muted-foreground no-underline hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {caseStudy.relatedStudyLabel}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </aside>
  );
}

export function CaseStudyClosing({
  caseStudy,
  relatedEngineeringNotes,
}: {
  caseStudy: CaseStudyRecord;
  relatedEngineeringNotes: readonly EngineeringNoteRecord[];
}) {
  return (
    <>
      <CaseStudyBoundaries caseStudy={caseStudy} />
      <section aria-labelledby="stack-heading" className="py-12">
        <h2 id="stack-heading" className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
          Verified technology
        </h2>
        <p className="mt-5 max-w-[720px] text-sm leading-[2] text-muted-foreground">
          {caseStudy.technologies.join(" · ")}
        </p>
      </section>
      <RelatedEngineeringNotes notes={relatedEngineeringNotes} />
      <CaseStudyCallToAction caseStudy={caseStudy} />
    </>
  );
}
