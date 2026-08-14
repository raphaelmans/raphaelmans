import { caseStudies } from "./case-studies";
import { engineeringIndexSearchMetadata, engineeringNotes } from "./engineering-notes";
import { latestReviewDate, renderedSearchTitle, type PublicSearchMetadataRecord } from "@/lib/search";
import { siteConfig } from "@/lib/site";

export const latestPortfolioReviewDate = latestReviewDate([
  ...caseStudies,
  ...engineeringNotes,
]);

export const publicSearchMetadataRecords: PublicSearchMetadataRecord[] = [
  {
    path: "/",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  {
    path: "/engineering",
    title: renderedSearchTitle(engineeringIndexSearchMetadata),
    description: engineeringIndexSearchMetadata.description,
  },
  ...caseStudies.map((caseStudy) => ({
    path: `/work/${caseStudy.slug}`,
    title: renderedSearchTitle({
      title: caseStudy.seoTitle,
      description: caseStudy.seoDescription,
    }),
    description: caseStudy.seoDescription,
  })),
  ...engineeringNotes.map((note) => ({
    path: `/engineering/${note.slug}`,
    title: renderedSearchTitle({
      title: note.seoTitle,
      description: note.description,
    }),
    description: note.description,
  })),
];
