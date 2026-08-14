import { SITE_TITLE_SUFFIX, absoluteUrl, personId, siteConfig } from "./site";

export const searchPresentationLimits = {
  titleMaximum: 60,
  descriptionMinimum: 140,
  descriptionMaximum: 160,
} as const;

export interface SearchMetadataInput {
  title: string;
  description: string;
  absoluteTitle?: boolean;
}

export interface PublicSearchMetadataRecord {
  path: string;
  title: string;
  description: string;
}

export function renderedSearchTitle({ title, absoluteTitle = false }: SearchMetadataInput) {
  return absoluteTitle ? title : `${title}${SITE_TITLE_SUFFIX}`;
}

export function searchMetadataIssues(input: SearchMetadataInput) {
  const title = renderedSearchTitle(input);
  const issues: string[] = [];

  if (!input.title.trim()) issues.push("title is empty");
  if (title.length > searchPresentationLimits.titleMaximum) {
    issues.push(`rendered title is ${title.length} characters`);
  }
  if (input.description.length < searchPresentationLimits.descriptionMinimum) {
    issues.push(`description is ${input.description.length} characters`);
  }
  if (input.description.length > searchPresentationLimits.descriptionMaximum) {
    issues.push(`description is ${input.description.length} characters`);
  }

  return issues;
}

function normalizeSearchMetadata(value: string) {
  return value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-US");
}

export function searchMetadataCollisions(records: readonly PublicSearchMetadataRecord[]) {
  const seenTitles = new Map<string, PublicSearchMetadataRecord>();
  const seenDescriptions = new Map<string, PublicSearchMetadataRecord>();
  const collisions: string[] = [];

  for (const record of records) {
    const normalizedTitle = normalizeSearchMetadata(record.title);
    const titleOwner = seenTitles.get(normalizedTitle);
    if (titleOwner) {
      collisions.push(`Duplicate search title on ${titleOwner.path} and ${record.path}: ${record.title.trim()}`);
    } else {
      seenTitles.set(normalizedTitle, record);
    }

    const normalizedDescription = normalizeSearchMetadata(record.description);
    const descriptionOwner = seenDescriptions.get(normalizedDescription);
    if (descriptionOwner) {
      collisions.push(
        `Duplicate search description on ${descriptionOwner.path} and ${record.path}: ${record.description.trim()}`
      );
    } else {
      seenDescriptions.set(normalizedDescription, record);
    }
  }

  return collisions;
}

export function latestReviewDate(records: readonly { lastReviewed: string }[]) {
  if (records.length === 0) throw new Error("Cannot derive freshness without published records");
  return records.reduce(
    (latest, record) => (record.lastReviewed > latest ? record.lastReviewed : latest),
    records[0].lastReviewed
  );
}

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": personId(),
    name: siteConfig.person.name,
    jobTitle: siteConfig.person.jobTitle,
    url: siteConfig.origin,
    email: siteConfig.person.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.person.location,
      addressCountry: siteConfig.person.country,
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.person.employer,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: siteConfig.person.alumniOf,
    },
    sameAs: Object.values(siteConfig.profiles),
  };
}

export function articleJsonLd({
  path,
  headline,
  description,
  imagePath,
  datePublished,
  dateModified,
  about,
  keywords,
}: {
  path: string;
  headline: string;
  description: string;
  imagePath: string;
  datePublished: string;
  dateModified: string;
  about: Record<string, unknown> | readonly Record<string, unknown>[];
  keywords: readonly string[];
}) {
  const url = absoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline,
    description,
    url,
    image: absoluteUrl(imagePath),
    datePublished,
    dateModified,
    author: personJsonLd(),
    about,
    keywords: keywords.join(", "),
  };
}

export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
