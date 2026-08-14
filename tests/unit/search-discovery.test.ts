import assert from "node:assert/strict";
import test from "node:test";
import { caseStudies } from "../../data/case-studies";
import {
  engineeringNotes,
  programmaticExpansionAllowed,
  publishedEngineeringNotes,
  validateEngineeringNotes,
} from "../../data/engineering-notes";
import { latestPortfolioReviewDate, publicSearchMetadataRecords } from "../../data/public-content";
import { isValidPublicDate } from "../../data/public-date";
import {
  articleJsonLd,
  latestReviewDate,
  renderedSearchTitle,
  searchMetadataCollisions,
  searchMetadataIssues,
  serializeJsonLd,
} from "../../lib/search";
import { absoluteUrl, isCanonicalSiteUrl, personId, siteConfig } from "../../lib/site";

test("builds canonical site URLs without changing the root form", () => {
  assert.equal(absoluteUrl(), siteConfig.origin);
  assert.equal(absoluteUrl("/work/ample-news"), `${siteConfig.origin}/work/ample-news`);
  assert.equal(absoluteUrl("engineering"), `${siteConfig.origin}/engineering`);
  assert.equal(isCanonicalSiteUrl(absoluteUrl("/sitemap.xml")), true);
  assert.equal(isCanonicalSiteUrl("https://www.raphaelmansueto.com/work/ample-news"), false);
  assert.equal(personId(), `${siteConfig.origin}/#raphael-mansueto`);
});

test("measures final rendered titles including the site suffix", () => {
  assert.equal(
    renderedSearchTitle({ title: "Production AI Workflow Case Study", description: "x".repeat(150) }),
    "Production AI Workflow Case Study | Raphael Mansueto"
  );
  assert.deepEqual(
    searchMetadataIssues({ title: "x".repeat(45), description: "x".repeat(150) }),
    ["rendered title is 64 characters"]
  );
  assert.deepEqual(
    searchMetadataIssues({ title: "Valid title", description: "too short" }),
    ["description is 9 characters"]
  );
});

test("all published search metadata fits the presentation contract", () => {
  assert.deepEqual(
    searchMetadataIssues({
      title: siteConfig.defaultTitle,
      description: siteConfig.defaultDescription,
      absoluteTitle: true,
    }),
    []
  );
  for (const record of [...caseStudies, ...engineeringNotes]) {
    const description = "seoDescription" in record ? record.seoDescription : record.description;
    assert.deepEqual(
      searchMetadataIssues({ title: record.seoTitle, description }),
      [],
      record.slug
    );
  }
});

test("public search metadata stays unique across every indexable registry", () => {
  assert.deepEqual(searchMetadataCollisions(publicSearchMetadataRecords), []);

  const collisionFixture = [
    { path: "/first", title: "Distinct title", description: "A distinct description" },
    { path: "/second", title: "  distinct   TITLE ", description: "Another description" },
    { path: "/third", title: "Another title", description: " A DISTINCT DESCRIPTION " },
  ];
  assert.deepEqual(searchMetadataCollisions(collisionFixture), [
    "Duplicate search title on /first and /second: distinct   TITLE",
    "Duplicate search description on /first and /third: A DISTINCT DESCRIPTION",
  ]);
});

test("derives freshness from the newest published review date", () => {
  assert.equal(latestReviewDate([{ lastReviewed: "2026-08-10" }, { lastReviewed: "2026-08-12" }]), "2026-08-12");
  assert.equal(latestPortfolioReviewDate, latestReviewDate([...caseStudies, ...engineeringNotes]));
  assert.equal(isValidPublicDate(latestPortfolioReviewDate), true);
});

test("filters drafts and enforces the programmatic expansion gate", () => {
  const draft = { ...engineeringNotes[0], slug: "draft-note", intent: "draft intent", publicationState: "draft" as const };
  assert.equal(publishedEngineeringNotes([...engineeringNotes, draft]).some((note) => note.slug === "draft-note"), false);
  assert.equal(programmaticExpansionAllowed({ evidenceBackedTopicCount: 11, hasRecurringSearchDemand: true }), false);
  assert.equal(programmaticExpansionAllowed({ evidenceBackedTopicCount: 12, hasRecurringSearchDemand: false }), false);
  assert.equal(programmaticExpansionAllowed({ evidenceBackedTopicCount: 12, hasRecurringSearchDemand: true }), true);
});

test("rejects duplicate intents, unsupported matrices, and missing evidence", () => {
  const duplicate = { ...engineeringNotes[1], slug: "other-slug", intent: engineeringNotes[0].intent };
  assert.throws(() => validateEngineeringNotes([engineeringNotes[0], duplicate], caseStudies.map(({ slug }) => slug)), /Duplicate engineering-note intent/);

  const matrix = { ...engineeringNotes[0], pageKind: "role-location" as "evidence-note" };
  assert.throws(() => validateEngineeringNotes([matrix], caseStudies.map(({ slug }) => slug)), /missing required evidence/);

  const unsupported = { ...engineeringNotes[0], supportingCaseStudySlugs: ["missing"] as never };
  assert.throws(() => validateEngineeringNotes([unsupported], caseStudies.map(({ slug }) => slug)), /unpublished evidence/);
});

test("builds complete Article schema and safely serializes markup-like text", () => {
  const schema = articleJsonLd({
    path: "/engineering/test",
    headline: "Test",
    description: "A test article",
    imagePath: "/engineering/test/opengraph-image",
    datePublished: "2026-08-12",
    dateModified: "2026-08-12",
    about: { "@type": "Thing", name: "Testing" },
    keywords: ["testing"],
  });
  assert.equal(schema.mainEntityOfPage["@id"], absoluteUrl("/engineering/test"));
  assert.equal(schema.image, absoluteUrl("/engineering/test/opengraph-image"));
  assert.equal(schema.author["@id"], personId());
  assert.equal(serializeJsonLd({ value: "</script>" }).includes("</script>"), false);
});
