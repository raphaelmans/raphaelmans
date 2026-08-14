## 1. Next.js Search-Surface Baseline

- [x] 1.1 Read the repository-installed Next.js 16 guides for metadata, dynamic routes, `robots.ts`, `sitemap.ts`, and generated Open Graph images before changing route code.
- [x] 1.2 Record the current rendered title, description, canonical, Open Graph URL, JSON-LD URL, sitemap entry, and `llms.txt` entry for the homepage and each published case study as regression fixtures.
- [x] 1.3 Add unit fixtures for strict calendar-date validation and final rendered metadata-length calculation.

## 2. Canonical Site and Identity Configuration

- [x] 2.1 Add a shared typed site configuration for the apex production origin, person identity, profile URLs, default search metadata, and URL construction.
- [x] 2.2 Replace route-local site URL and identity constants in global metadata, homepage metadata/schema, case-study metadata/schema, sitemap, robots metadata, `llms.txt`, and integrity validation with the shared configuration.
- [x] 2.3 Add origin-consistency validation that identifies any canonical, Open Graph, schema, sitemap, robots, or `llms.txt` URL emitted on a different host.

## 3. Search Metadata and Freshness

- [x] 3.1 Add distinct SEO title and description fields to case-study records and write concise metadata for the homepage and all published case studies.
- [x] 3.2 Update metadata generation to use concise SEO fields while preserving editorial H1, summary, and orientation copy.
- [x] 3.3 Derive the portfolio-wide latest-review date from published content and use it for homepage JSON-LD, the homepage sitemap entry, and the `llms.txt` review line.
- [x] 3.4 Extend integrity validation to reject duplicate search titles, incomplete descriptions, final titles over the configured presentation limit, descriptions outside the target range, and impossible calendar dates.

## 4. Structured Data Completion

- [x] 4.1 Extract safe shared JSON-LD helpers for canonical page identifiers, Person authorship, page entities, and less-than escaping.
- [x] 4.2 Add `mainEntityOfPage`, canonical 1200×630 Open Graph image URLs, and shared author identity to every case-study Article schema.
- [x] 4.3 Align schema dates and URLs with visible dates, canonical metadata, and sitemap records, and add integrity tests that fail on divergence.
- [x] 4.4 Add rendered browser assertions for valid homepage ProfilePage/Person schema and one representative case-study Article schema.

## 5. Evidence-Led Engineering Content

- [x] 5.1 Map and verify four non-overlapping initial topics against public case-study evidence: human decision gates in production AI workflows, correlated Langfuse/OpenTelemetry observability, PostgreSQL transaction boundaries for reservation consistency, and realtime React Query reconciliation.
- [x] 5.2 Add a typed engineering-note registry with publication state, unique slug, editorial and SEO fields, direct answer, valid dates, topic labels, supporting case-study slugs, and structured body sections.
- [x] 5.3 Author and review the four initial notes with a direct answer first, concrete mechanism, rationale, trade-offs, limitations, and explicit supporting-case links; remove or qualify any statement not supported by public evidence.
- [x] 5.4 Implement the `/engineering` index grouped by reader problem and statically generated `/engineering/[slug]` detail routes with semantic heading hierarchy and progressive disclosure.
- [x] 5.5 Add route-specific metadata, Article JSON-LD, and dynamic 1200×630 Open Graph images for published engineering notes.
- [x] 5.6 Add simplified semantic HTML or accessible SVG evidence models only where a note's sequence, state transition, or system boundary is materially clearer visually.

## 6. Discovery and Information Hierarchy

- [x] 6.1 Generate engineering-note static parameters, sitemap entries, and `llms.txt` summaries exclusively from published note records.
- [x] 6.2 Add descriptive reciprocal links between each note and its supporting case studies.
- [x] 6.3 Add one restrained engineering-collection link through the existing secondary navigation or footer without adding a note inventory or dense new section to the homepage.
- [x] 6.4 Add validation that rejects draft discovery, duplicate slugs or intents, missing evidence links, and unsupported role/location or interchangeable keyword-matrix pages.

## 7. Automated Verification

- [x] 7.1 Extend public-route checks to cover the engineering index, every published note, dynamic Open Graph images, sitemap, robots metadata, and `llms.txt`.
- [x] 7.2 Add unit tests for origin helpers, freshness derivation, note publication filtering, metadata thresholds, reciprocal evidence links, and programmatic-expansion quality gates.
- [x] 7.3 Add desktop and mobile browser tests for the engineering index and a representative note, including canonical metadata, JSON-LD, heading order, keyboard access, overflow, theme support, and the homepage hierarchy constraint.
- [x] 7.4 Run lint, type checking, unit tests, portfolio integrity validation, production build, public-route tests, and the complete browser suite; resolve all regressions.

## 8. Deployment and Search Operations Handoff

- [x] 8.1 Add a post-deployment search checklist covering Vercel apex-primary configuration, path-preserving permanent `www` redirects, TLS and status verification, and rollback.
- [x] 8.2 Document Google Search Console owner actions for domain verification, sitemap resubmission, homepage/case-study/note URL inspection, indexing requests, selected-canonical checks, and Core Web Vitals monitoring.
- [x] 8.3 Document an external entity synchronization checklist for LinkedIn, the legacy GitHub Pages portfolio, the known Vercel community profile/post, and any discovered biography using an outdated title or fragmented employment narrative.
- [x] 8.4 Document the future expansion gate: at least 12 distinct evidence-backed topics plus recurring Search Console demand, followed by a separate OpenSpec change before any templated page inventory is built.

## 9. Review Remediation

- [x] 9.1 Surface supporting case-study context before engineering-note implementation details.
- [x] 9.2 Replace literal browser freshness assertions with values derived from published content records.
- [x] 9.3 Add cross-registry validation and regression tests for duplicate public-page search titles and descriptions.
- [x] 9.4 Re-run the complete verification workflow and React Doctor regression scan.
