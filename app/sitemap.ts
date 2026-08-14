import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";
import { engineeringNotes } from "@/data/engineering-notes";
import { latestPortfolioReviewDate } from "@/data/public-content";
import { absoluteUrl, siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const workPages: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: absoluteUrl(`/work/${caseStudy.slug}`),
    lastModified: caseStudy.lastReviewed,
    changeFrequency: "monthly",
    priority: 0.8,
  }));
  const engineeringPages: MetadataRoute.Sitemap = engineeringNotes.map((note) => ({
    url: absoluteUrl(`/engineering/${note.slug}`),
    lastModified: note.lastReviewed,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.origin,
      lastModified: latestPortfolioReviewDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...workPages,
    {
      url: absoluteUrl("/engineering"),
      lastModified: latestPortfolioReviewDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...engineeringPages,
  ];
}
