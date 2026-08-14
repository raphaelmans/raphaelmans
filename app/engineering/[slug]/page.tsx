import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies } from "@/data/case-studies";
import { engineeringNotes, getPublishedEngineeringNote } from "@/data/engineering-notes";
import { BrandHomeLink } from "@/components/brand/brand-home-link";
import { EngineeringSequence } from "@/components/portfolio/engineering-sequence";
import { ThemeMenu } from "@/components/portfolio/theme-menu";
import { SkipLink } from "@/components/portfolio/skip-link";
import { articleJsonLd, serializeJsonLd } from "@/lib/search";
import { absoluteUrl, siteConfig } from "@/lib/site";

const noteDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string) {
  return noteDateFormatter.format(new Date(`${value}T00:00:00Z`));
}

export const dynamicParams = false;

export function generateStaticParams() {
  return engineeringNotes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getPublishedEngineeringNote(slug);
  if (!note) return {};

  const canonical = `/engineering/${note.slug}`;
  const imageUrl = absoluteUrl(`${canonical}/opengraph-image`);

  return {
    title: note.seoTitle,
    description: note.description,
    alternates: { canonical },
    openGraph: {
      title: `${note.seoTitle} | ${siteConfig.name}`,
      description: note.description,
      type: "article",
      url: absoluteUrl(canonical),
      publishedTime: note.publishedAt,
      modifiedTime: note.lastReviewed,
      authors: [siteConfig.origin],
      images: [{ url: imageUrl, width: 1200, height: 630, alt: note.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${note.seoTitle} | ${siteConfig.name}`,
      description: note.description,
      images: [imageUrl],
    },
  };
}

export default async function EngineeringNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getPublishedEngineeringNote(slug);
  if (!note) notFound();

  const pagePath = `/engineering/${note.slug}`;
  const supportingCases = note.supportingCaseStudySlugs.map((caseSlug) => {
    const caseStudy = caseStudies.find((candidate) => candidate.slug === caseSlug);
    if (!caseStudy) throw new Error(`Engineering note references missing case study: ${caseSlug}`);
    return caseStudy;
  });
  const jsonLd = articleJsonLd({
    path: pagePath,
    headline: note.title,
    description: note.description,
    imagePath: `${pagePath}/opengraph-image`,
    datePublished: note.publishedAt,
    dateModified: note.lastReviewed,
    about: supportingCases.map((caseStudy) => ({
      "@type": "SoftwareApplication",
      name: caseStudy.shortTitle,
      url: absoluteUrl(`/work/${caseStudy.slug}`),
    })),
    keywords: note.topics,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />
      <SkipLink />
      <nav className="sticky top-0 z-50 border-b border-border bg-sticky backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-6">
          <BrandHomeLink />
          <ThemeMenu />
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-[760px] px-6 pb-20 pt-20 outline-none max-sm:pt-14">
        <article>
          <Link
            href="/engineering"
            className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Engineering notes
          </Link>
          <header className="border-b border-border pb-12">
            <p className="font-mono text-xs text-primary">Engineering note</p>
            <h1 className="mt-5 max-w-[720px] text-[50px] font-semibold leading-[1.06] tracking-[-0.04em] text-balance max-sm:text-[37px]">
              {note.title}
            </h1>
            <p data-direct-answer className="mt-7 max-w-[700px] text-lg leading-[1.75] text-secondary-foreground text-pretty">
              {note.directAnswer}
            </p>
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              By {siteConfig.name} · Reviewed <time dateTime={note.lastReviewed}>{formatDate(note.lastReviewed)}</time>
            </p>
          </header>

          <aside
            data-supporting-case-context
            aria-labelledby="supporting-work-heading"
            className="border-b border-border py-10"
          >
            <h2 id="supporting-work-heading" className="text-xl font-medium tracking-[-0.02em] text-balance">
              See the decision in context
            </h2>
            <ul className="mt-5 divide-y divide-border border-y border-border">
              {supportingCases.map((caseStudy) => (
                <li key={caseStudy.slug}>
                  <Link
                    href={`/work/${caseStudy.slug}`}
                    className="group flex min-h-20 items-center justify-between gap-6 py-4 text-foreground no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <span>
                      <span className="block font-medium">{caseStudy.shortTitle} case study</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{caseStudy.architectureTitle}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>

          {note.visual && <EngineeringSequence visual={note.visual} />}

          <div className="divide-y divide-border">
            {note.sections.map((section) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="py-12">
                <h2 id={`${section.id}-heading`} className="max-w-[680px] text-2xl font-medium tracking-[-0.025em] text-balance">
                  {section.title}
                </h2>
                <div className="mt-5 max-w-[700px] space-y-4 text-[16px] leading-[1.8] text-secondary-foreground">
                  {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-pretty">{paragraph}</p>)}
                </div>
                {section.bullets && (
                  <ul className="mt-5 max-w-[700px] space-y-3 text-[15px] leading-[1.7] text-muted-foreground">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="relative pl-5 before:absolute before:left-0 before:top-[0.75em] before:h-px before:w-2 before:bg-primary/60">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

        </article>
      </main>
    </div>
  );
}
