import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  engineeringIndexSearchMetadata,
  engineeringNotes,
  type EngineeringNoteGroup,
} from "@/data/engineering-notes";
import { latestPortfolioReviewDate } from "@/data/public-content";
import { BrandHomeLink } from "@/components/brand/brand-home-link";
import { ThemeMenu } from "@/components/portfolio/theme-menu";
import { SkipLink } from "@/components/portfolio/skip-link";
import { absoluteUrl, siteConfig } from "@/lib/site";

const imageUrl = absoluteUrl("/engineering/opengraph-image");

export const metadata: Metadata = {
  title: engineeringIndexSearchMetadata.title,
  description: engineeringIndexSearchMetadata.description,
  alternates: { canonical: "/engineering" },
  openGraph: {
    title: `${engineeringIndexSearchMetadata.title} | ${siteConfig.name}`,
    description: engineeringIndexSearchMetadata.description,
    url: absoluteUrl("/engineering"),
    type: "website",
    images: [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: "Engineering decisions, explained — Raphael Mansueto",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${engineeringIndexSearchMetadata.title} | ${siteConfig.name}`,
    description: engineeringIndexSearchMetadata.description,
    images: [imageUrl],
  },
};

const groups: EngineeringNoteGroup[] = [
  "Production AI operations",
  "Transactional product systems",
];

export default function EngineeringIndexPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <nav className="sticky top-0 z-50 border-b border-border bg-sticky backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between px-6">
          <BrandHomeLink />
          <ThemeMenu />
        </div>
      </nav>

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-[760px] px-6 pb-20 pt-20 outline-none max-sm:pt-14">
        <Link
          href="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground no-underline transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Portfolio
        </Link>
        <header className="border-b border-border pb-12">
          <h1 className="max-w-[680px] text-[50px] font-semibold leading-[1.06] tracking-[-0.04em] text-balance max-sm:text-[37px]">
            Engineering decisions, explained.
          </h1>
          <p className="mt-6 max-w-[680px] text-lg leading-[1.75] text-secondary-foreground text-pretty">
            Focused notes on the boundaries that make AI workflows, transactional systems, and realtime interfaces operable.
          </p>
          <p className="mt-4 font-mono text-xs text-muted-foreground">
            Evidence drawn from published case studies · Reviewed {latestPortfolioReviewDate}
          </p>
        </header>

        {groups.map((group) => {
          const notes = engineeringNotes.filter((note) => note.group === group);
          return (
            <section key={group} aria-labelledby={`${group.replaceAll(" ", "-").toLowerCase()}-heading`} className="py-14">
              <h2
                id={`${group.replaceAll(" ", "-").toLowerCase()}-heading`}
                className="text-2xl font-medium tracking-[-0.025em] text-balance"
              >
                {group}
              </h2>
              <ul className="mt-6 divide-y divide-border border-y border-border">
                {notes.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={`/engineering/${note.slug}`}
                      className="group block py-6 text-foreground no-underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      <span className="flex items-start justify-between gap-6">
                        <span className="text-lg font-medium tracking-[-0.015em] text-balance">{note.title}</span>
                        <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" aria-hidden="true" />
                      </span>
                      <span className="mt-3 block max-w-[680px] text-sm leading-[1.7] text-muted-foreground text-pretty">
                        {note.directAnswer}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </main>
    </div>
  );
}
