import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { WorkRecord } from "@/data/portfolio-data";

export function ProjectItem({
  slug,
  title,
  classification,
  status,
  homepagePresentation,
  caseStudyUrl,
  homepage,
}: WorkRecord) {
  const isFlagship = homepagePresentation === "flagship";

  return (
    <article
      data-featured-project={slug}
      data-project-presentation={homepagePresentation}
      className={
        isFlagship
          ? "border-y border-border py-10"
          : "grid gap-5 border-b border-border py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end"
      }
    >
      <div>
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.06em] text-primary">
          {isFlagship ? "Flagship case study" : `${classification} · ${status}`}
        </p>
        <h3
          className={
            isFlagship
              ? "text-3xl font-medium tracking-[-0.03em] text-foreground"
              : "text-xl font-medium tracking-[-0.02em] text-foreground"
          }
        >
          {title}
        </h3>
        {isFlagship && (
          <p className="mt-2 text-sm leading-[1.55] text-muted-foreground">
            {classification} · {status}
          </p>
        )}

        <p
          className={
            isFlagship
              ? "mt-5 max-w-[650px] text-lg leading-[1.65] text-secondary-foreground"
              : "mt-3 max-w-[590px] text-[15px] leading-[1.7] text-secondary-foreground"
          }
        >
          {homepage.context}
        </p>

        <p className="mt-3 max-w-[620px] text-sm leading-[1.65] text-muted-foreground">
          <strong className="font-medium text-foreground">How it holds together.</strong>{" "}
          {homepage.decision}
        </p>
      </div>

      {caseStudyUrl && (
        <Link
          href={caseStudyUrl}
          data-primary-proof-action
          className={
            isFlagship
              ? "mt-6 inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground no-underline transition-colors hover:bg-primary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              : "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-sm text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          }
        >
          {homepage.actionLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </article>
  );
}
