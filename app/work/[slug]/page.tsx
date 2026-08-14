import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download } from "lucide-react";
import { caseStudies, getPublishedCaseStudy } from "@/data/case-studies";
import { getPublishedEngineeringNotesForCaseStudy } from "@/data/engineering-notes";
import { BrandHomeLink } from "@/components/brand/brand-home-link";
import {
  CaseStudyClosing,
  CaseStudyEvidence,
  CaseStudyHeader,
  CaseStudyNarrative,
  CaseStudySnapshot,
} from "@/components/portfolio/case-study-sections";
import { SkipLink } from "@/components/portfolio/skip-link";
import { ThemeMenu } from "@/components/portfolio/theme-menu";
import { articleJsonLd, serializeJsonLd } from "@/lib/search";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getPublishedCaseStudy(slug);

  if (!caseStudy) return {};

  const canonical = `/work/${caseStudy.slug}`;
  const imageUrl = absoluteUrl(`${canonical}/opengraph-image`);

  return {
    title: caseStudy.seoTitle,
    description: caseStudy.seoDescription,
    alternates: { canonical },
    openGraph: {
      title: `${caseStudy.seoTitle} | ${siteConfig.name}`,
      description: caseStudy.seoDescription,
      type: "article",
      url: absoluteUrl(canonical),
      publishedTime: caseStudy.publishedAt,
      modifiedTime: caseStudy.lastReviewed,
      authors: [siteConfig.origin],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${caseStudy.shortTitle} engineering case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${caseStudy.seoTitle} | ${siteConfig.name}`,
      description: caseStudy.seoDescription,
      images: [imageUrl],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getPublishedCaseStudy(slug);

  if (!caseStudy) notFound();

  const pagePath = `/work/${caseStudy.slug}`;
  const relatedEngineeringNotes = getPublishedEngineeringNotesForCaseStudy(caseStudy.slug);
  const jsonLd = articleJsonLd({
    path: pagePath,
    headline: caseStudy.title,
    description: caseStudy.seoDescription,
    imagePath: `${pagePath}/opengraph-image`,
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.lastReviewed,
    about: {
      "@type": "SoftwareApplication",
      name: caseStudy.shortTitle,
      applicationCategory: caseStudy.applicationCategory,
      operatingSystem: caseStudy.operatingSystem,
      ...(caseStudy.externalUrl ? { url: caseStudy.externalUrl } : {}),
    },
    keywords: caseStudy.technologies,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <SkipLink />

      <nav className="sticky top-0 z-50 border-b border-border bg-sticky backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[860px] items-center justify-between px-6">
          <BrandHomeLink />
          <div className="flex items-center gap-1">
            <a
              href="/resume.pdf"
              download
              className="inline-flex min-h-11 items-center gap-2 rounded-sm px-2 font-mono text-xs text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Résumé
              <Download className="size-3.5" aria-hidden="true" />
            </a>
            <ThemeMenu />
          </div>
        </div>
      </nav>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto max-w-[860px] px-6 pb-20 pt-20 outline-none max-sm:pt-14"
      >
        <article>
          <Link
            href="/#work"
            className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Selected Work
          </Link>
          <CaseStudyHeader caseStudy={caseStudy} />
          <CaseStudySnapshot caseStudy={caseStudy} />
          <CaseStudyEvidence caseStudy={caseStudy} />
          <CaseStudyNarrative caseStudy={caseStudy} />
          <CaseStudyClosing
            caseStudy={caseStudy}
            relatedEngineeringNotes={relatedEngineeringNotes}
          />
        </article>
      </main>
    </div>
  );
}
