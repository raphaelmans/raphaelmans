import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "../app/sitemap";
import robots from "../app/robots";
import { buildLlmsText } from "../app/llms.txt/route";
import { caseStudies } from "../data/case-studies";
import {
  engineeringNotes,
  engineeringIndexSearchMetadata,
  getPublishedEngineeringNotesForCaseStudy,
  programmaticExpansionAllowed,
  validateEngineeringNotes,
} from "../data/engineering-notes";
import { latestPortfolioReviewDate, publicSearchMetadataRecords } from "../data/public-content";
import { experiences, featuredWork } from "../data/portfolio-data";
import {
  PUBLIC_CASE_STUDY_SLUGS,
  PUBLIC_CASE_STUDY_SLUG_SET,
  publicCaseStudyPath,
  type PublicCaseStudySlug,
} from "../data/public-portfolio";
import { evidenceRegistry, type SemanticEvidenceModel } from "../data/work-evidence";
import { legacyWorkArtifactPaths } from "../data/legacy-work-artifacts";
import { isValidPublicDate } from "../data/public-date";
import { searchMetadataCollisions, searchMetadataIssues } from "../lib/search";
import { absoluteUrl, isCanonicalSiteUrl, siteConfig } from "../lib/site";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures: string[] = [];

function fail(message: string) {
  failures.push(message);
}

function sameOrder(actual: readonly string[], expected: readonly string[]) {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

const caseStudySlugs = caseStudies.map((caseStudy) => caseStudy.slug);
const engineeringNoteSlugs = engineeringNotes.map((note) => note.slug);
const featuredSlugs = featuredWork.map((project) => project.slug);
const flagshipProjects = featuredWork.filter(
  (project) => project.homepagePresentation === "flagship"
);
const supportingProjects = featuredWork.filter(
  (project) => project.homepagePresentation === "supporting"
);

for (const experience of experiences) {
  if (experience.skills.length < 5 || experience.skills.some((skill) => !skill.trim())) {
    fail(`Experience "${experience.id}" must expose at least five named skills`);
  }
  const skills = new Set<string>();
  for (const skill of experience.skills) {
    if (skills.has(skill)) {
      fail(`Experience "${experience.id}" repeats skill "${skill}"`);
    }
    skills.add(skill);
  }
}

if (!sameOrder(caseStudySlugs, PUBLIC_CASE_STUDY_SLUGS)) {
  fail(`Published case-study order is ${caseStudySlugs.join(", ")}; expected ${PUBLIC_CASE_STUDY_SLUGS.join(", ")}`);
}

if (!sameOrder(featuredSlugs, PUBLIC_CASE_STUDY_SLUGS)) {
  fail(`Featured-work order is ${featuredSlugs.join(", ")}; expected ${PUBLIC_CASE_STUDY_SLUGS.join(", ")}`);
}

if (
  flagshipProjects.length !== 1 ||
  flagshipProjects[0]?.slug !== "ample-news" ||
  supportingProjects.length !== 2
) {
  fail("Featured work must contain Ample News as one flagship and two supporting projects");
}

for (const project of featuredWork) {
  const expectedPath = publicCaseStudyPath(project.slug as PublicCaseStudySlug);
  if (project.caseStudyUrl !== expectedPath) {
    fail(`Featured project "${project.slug}" links to ${project.caseStudyUrl ?? "nothing"}; expected ${expectedPath}`);
  }
  if (!caseStudies.some((caseStudy) => caseStudy.slug === project.slug)) {
    fail(`Featured project "${project.slug}" has no published case-study record`);
  }
}

for (const [index, caseStudy] of caseStudies.entries()) {
  if (caseStudy.relatedStudySlug && !PUBLIC_CASE_STUDY_SLUG_SET.has(caseStudy.relatedStudySlug)) {
    fail(`Case study "${caseStudy.slug}" references unpublished related study "${caseStudy.relatedStudySlug}"`);
  }
  const expectedContinuation = PUBLIC_CASE_STUDY_SLUGS[(index + 1) % PUBLIC_CASE_STUDY_SLUGS.length];
  if (caseStudy.relatedStudySlug !== expectedContinuation) {
    fail(`Case study "${caseStudy.slug}" continues to ${caseStudy.relatedStudySlug}; expected ${expectedContinuation}`);
  }
}

const homeSearchIssues = searchMetadataIssues({
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  absoluteTitle: true,
});
if (homeSearchIssues.length > 0) {
  fail(`Homepage search metadata is invalid: ${homeSearchIssues.join(", ")}`);
}
const engineeringIndexSearchIssues = searchMetadataIssues(engineeringIndexSearchMetadata);
if (engineeringIndexSearchIssues.length > 0) {
  fail(`Engineering index search metadata is invalid: ${engineeringIndexSearchIssues.join(", ")}`);
}
for (const collision of searchMetadataCollisions(publicSearchMetadataRecords)) {
  fail(collision);
}
if (engineeringNotes.length < 3 || engineeringNotes.length > 5) {
  fail(`Initial engineering collection has ${engineeringNotes.length} notes; expected three to five`);
}

try {
  validateEngineeringNotes(engineeringNotes, caseStudySlugs);
} catch (error) {
  fail(error instanceof Error ? error.message : String(error));
}

if (!isValidPublicDate(latestPortfolioReviewDate)) {
  fail(`Derived portfolio review date is invalid: ${latestPortfolioReviewDate}`);
}
if (programmaticExpansionAllowed({ evidenceBackedTopicCount: engineeringNotes.length, hasRecurringSearchDemand: false })) {
  fail("Programmatic expansion must remain disabled before the evidence and demand gates are met");
}

for (const note of engineeringNotes) {
  for (const caseSlug of note.supportingCaseStudySlugs) {
    if (!getPublishedEngineeringNotesForCaseStudy(caseSlug).some((candidate) => candidate.slug === note.slug)) {
      fail(`Engineering note "${note.slug}" is not reciprocally discoverable from ${caseSlug}`);
    }
  }
}

const evidenceIds = new Set<string>();
for (const [slug, models] of Object.entries(evidenceRegistry) as Array<
  [string, readonly SemanticEvidenceModel[]]
>) {
  if (!PUBLIC_CASE_STUDY_SLUG_SET.has(slug)) {
    fail(`Evidence registry contains unpublished project "${slug}"`);
  }

  const caseStudy = caseStudies.find((record) => record.slug === slug);
  const sectionIds = new Set(caseStudy?.sections.map((section) => section.id) ?? []);
  for (const model of models) {
    if (evidenceIds.has(model.id)) fail(`Duplicate semantic-evidence id: ${model.id}`);
    evidenceIds.add(model.id);
    if (model.projectSlug !== slug) fail(`Evidence "${model.id}" is associated with ${model.projectSlug}, not ${slug}`);
    if (!sectionIds.has(model.caseStudySectionId)) fail(`Evidence "${model.id}" targets an unknown case-study section`);
    if (!model.title.trim() || !model.summary.trim() || !model.accessibilityContext.trim()) {
      fail(`Evidence "${model.id}" is missing title, summary, or accessibility context`);
    }
    if (model.placement !== "case-study") {
      fail(`Evidence "${model.id}" must be case-study-only`);
    }
    if (!["sequence", "correlation", "coordinated-state"].includes(model.kind)) {
      fail(`Evidence "${model.id}" uses an unsupported model shape`);
    }
    if (/"(?:src|mobile|compactMobile|themeTreatment|width|height)"\s*:/.test(JSON.stringify(model))) {
      fail(`Evidence "${model.id}" contains an active image presentation field`);
    }
  }
}

for (const legacyPath of legacyWorkArtifactPaths) {
  const publicPath = path.join(projectRoot, "public", legacyPath.replace(/^\//, ""));
  if (!existsSync(publicPath) || !statSync(publicPath).isFile()) {
    fail(`Legacy artifact compatibility file is missing: ${legacyPath}`);
  }
}

const sitemapWorkUrls = sitemap()
  .map((entry) => entry.url)
  .filter((url) => url.startsWith(`${siteConfig.origin}/work/`));
const expectedSitemapUrls = PUBLIC_CASE_STUDY_SLUGS.map((slug) => absoluteUrl(publicCaseStudyPath(slug)));

if (!sameOrder(sitemapWorkUrls, expectedSitemapUrls)) {
  fail(`Sitemap work URLs are ${sitemapWorkUrls.join(", ")}; expected ${expectedSitemapUrls.join(", ")}`);
}

const sitemapEntries = sitemap();
const expectedEngineeringUrls = [
  absoluteUrl("/engineering"),
  ...engineeringNoteSlugs.map((slug) => absoluteUrl(`/engineering/${slug}`)),
];
for (const url of expectedEngineeringUrls) {
  if (!sitemapEntries.some((entry) => entry.url === url)) {
    fail(`Sitemap omits published engineering URL ${url}`);
  }
}
for (const entry of sitemapEntries) {
  if (!isCanonicalSiteUrl(entry.url)) fail(`Sitemap emits a non-canonical URL: ${entry.url}`);
}

const robotsMetadata = robots();
if (robotsMetadata.host !== siteConfig.origin) {
  fail(`Robots host is ${String(robotsMetadata.host)}; expected ${siteConfig.origin}`);
}
const robotsSitemaps = Array.isArray(robotsMetadata.sitemap)
  ? robotsMetadata.sitemap
  : robotsMetadata.sitemap
    ? [robotsMetadata.sitemap]
    : [];
for (const url of robotsSitemaps) {
  if (!isCanonicalSiteUrl(url)) fail(`Robots emits a non-canonical sitemap URL: ${url}`);
}

const llmsText = buildLlmsText();
for (const slug of PUBLIC_CASE_STUDY_SLUGS) {
  const url = absoluteUrl(publicCaseStudyPath(slug));
  if (!llmsText.includes(url)) {
    fail(`llms.txt omits published case study ${url}`);
  }
}
for (const slug of engineeringNoteSlugs) {
  const url = absoluteUrl(`/engineering/${slug}`);
  if (!llmsText.includes(url)) fail(`llms.txt omits published engineering note ${url}`);
}
if (!llmsText.includes(`Last reviewed: ${latestPortfolioReviewDate}`)) {
  fail(`llms.txt does not use the derived review date ${latestPortfolioReviewDate}`);
}
for (const match of llmsText.matchAll(/https:\/\/[^\s)]+/g)) {
  const url = match[0].replace(/[.,]$/, "");
  if (url.includes("raphaelmansueto.com") && !isCanonicalSiteUrl(url)) {
    fail(`llms.txt emits a non-canonical portfolio URL: ${url}`);
  }
}

const resumePath = path.join(projectRoot, "public", "resume.pdf");
const resumeArtifactPath = path.join(projectRoot, "output", "pdf", "raphael-mansueto-resume.pdf");
const resumeExists = existsSync(resumePath) && statSync(resumePath).isFile();
const resumeArtifactExists =
  existsSync(resumeArtifactPath) && statSync(resumeArtifactPath).isFile();

if (!resumeExists) {
  fail("Public résumé is missing at /resume.pdf");
}
if (!resumeArtifactExists) {
  fail("Generated résumé deliverable is missing at output/pdf/raphael-mansueto-resume.pdf");
}
if (
  resumeExists &&
  resumeArtifactExists &&
  !readFileSync(resumePath).equals(readFileSync(resumeArtifactPath))
) {
  fail(
    "Public résumé differs from the generated deliverable; run scripts/generate_resume.py before publication"
  );
}

if (failures.length > 0) {
  console.error("Portfolio integrity validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exitCode = 1;
} else {
  const evidenceCount = Object.values(evidenceRegistry).reduce((total, models) => total + models.length, 0);
  console.log(
    `Portfolio integrity valid: ${caseStudies.length} case studies, ${engineeringNotes.length} engineering notes, ${featuredWork.length} featured projects, ${evidenceCount} semantic evidence models, ${legacyWorkArtifactPaths.length} legacy URLs.`
  );
}
