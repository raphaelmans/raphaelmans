import { featuredWork } from "../data/portfolio-data";
import { caseStudies } from "../data/case-studies";
import { engineeringNotes } from "../data/engineering-notes";
import { legacyWorkArtifactPaths } from "../data/legacy-work-artifacts";

const baseUrl = (process.env.PORTFOLIO_BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const paths = new Set<string>([
  "/",
  "/resume.pdf",
  "/llms.txt",
  "/robots.txt",
  "/sitemap.xml",
  "/engineering",
  "/opengraph-image",
  "/engineering/opengraph-image",
  "/favicon.ico",
  "/icon.svg",
  "/apple-icon.png",
]);

for (const project of featuredWork) {
  if (project.caseStudyUrl) paths.add(project.caseStudyUrl);
}

for (const caseStudy of caseStudies) {
  paths.add(`/work/${caseStudy.slug}/opengraph-image`);
}

for (const note of engineeringNotes) {
  paths.add(`/engineering/${note.slug}`);
  paths.add(`/engineering/${note.slug}/opengraph-image`);
}

for (const legacyPath of legacyWorkArtifactPaths) {
  paths.add(legacyPath);
}

async function main() {
  const failures: string[] = [];

  for (const pathname of paths) {
    try {
      const response = await fetch(`${baseUrl}${pathname}`, { redirect: "manual" });
      if (response.status !== 200) {
        failures.push(`${pathname} returned ${response.status}`);
      }
      await response.body?.cancel();
    } catch (error) {
      failures.push(`${pathname} could not be requested: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (failures.length > 0) {
    console.error(`Public route smoke check failed against ${baseUrl}:`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`Public route smoke check passed: ${paths.size} destinations at ${baseUrl}.`);
  }
}

void main();
