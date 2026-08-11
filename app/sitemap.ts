import type { MetadataRoute } from "next";
import { caseStudies } from "@/data/case-studies";

const siteUrl = "https://raphaelmansueto.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const workPages: MetadataRoute.Sitemap = caseStudies.map((caseStudy) => ({
    url: `${siteUrl}/work/${caseStudy.slug}`,
    lastModified: caseStudy.lastReviewed,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: "2026-08-11",
      changeFrequency: "monthly",
      priority: 1,
    },
    ...workPages,
  ];
}
