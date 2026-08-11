export const PUBLIC_CASE_STUDY_SLUGS = [
  "ample-news",
  "kudoscourts",
  "cravingsph",
] as const;

export type PublicCaseStudySlug = (typeof PUBLIC_CASE_STUDY_SLUGS)[number];

export const PUBLIC_CASE_STUDY_SLUG_SET = new Set<string>(PUBLIC_CASE_STUDY_SLUGS);

export function publicCaseStudyPath(slug: PublicCaseStudySlug) {
  return `/work/${slug}` as const;
}

export function isPublicCaseStudySlug(value: string): value is PublicCaseStudySlug {
  return PUBLIC_CASE_STUDY_SLUG_SET.has(value);
}
