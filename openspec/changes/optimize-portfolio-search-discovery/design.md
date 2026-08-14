## Context

The application already renders a compact portfolio homepage, three substantive case studies, dynamic Open Graph images, ProfilePage/Person and Article JSON-LD, a sitemap, permissive robots metadata, and a detailed `llms.txt`. The content is first-hand and technically differentiated. The problem is coordination: production currently resolves to the `www` host while every authored search signal names the apex host, metadata strings are longer than desirable for result presentation, and freshness values are repeated as literals.

Search indexing and external profile updates also cross repository boundaries. The implementation can make the site internally coherent and expose a deployment checklist, but the owner must change the Vercel primary domain, use Google Search Console, and update third-party profiles with authenticated access.

The portfolio was recently distilled to reduce cognitive load. Search expansion must therefore live below the primary hiring journey, use progressive disclosure, and avoid turning the homepage into a content directory.

## Goals / Non-Goals

**Goals:**

- Make one production origin authoritative across metadata, schemas, discovery files, generated images, validation, and deployed redirects.
- Improve the clarity and consistency of search snippets without changing the factual employment narrative.
- Make schema images, authorship, entity identity, and freshness signals complete and mechanically verifiable.
- Publish a small engineering-notes layer that answers high-intent technical questions with first-hand evidence from the existing case studies.
- Encode quality gates that prevent low-value programmatic expansion.
- Provide actionable post-deployment checks for Search Console and external entity consistency.

**Non-Goals:**

- Generating role/location, technology/location, or arbitrary keyword-combination pages.
- Adding a CMS, keyword-volume API, SEO analytics vendor, or AI-generated bulk publishing pipeline.
- Promising rankings, AI citations, rich results, or a specific indexing timeline.
- Reintroducing dense content to the homepage or creating separate public identities for internal projects.
- Automating authenticated Vercel, Google Search Console, LinkedIn, GitHub, or community-profile changes.

## Decisions

### 1. Use the apex domain as the canonical production origin

Create a shared site configuration module whose production origin is `https://raphaelmansueto.com`. Metadata, JSON-LD identifiers, sitemap URLs, robots metadata, `llms.txt`, Open Graph image URLs, and validators consume that module rather than defining local constants.

The deployment checklist makes the apex domain the Vercel primary domain and requires `www` to redirect to the same path on apex with a permanent redirect. This direction minimizes source changes because the repository already names the apex domain. The alternative—changing every signal to `www`—would also work, but would preserve a host choice that conflicts with the existing source of truth.

### 2. Separate editorial headings from search-presentation fields

Case-study records gain explicit concise SEO titles and descriptions rather than shortening the on-page headline or technical summary. Generated metadata uses the SEO fields, while the H1 and opening copy continue to serve human readers. Validation measures the final rendered title including the site-name template and keeps descriptions in a concise target range.

This is preferred to deriving every metadata string from the H1 because editorial and result-page contexts have different constraints. Length checks are presentation safeguards, not claims that character counts affect rankings.

### 3. Generate complete schemas from typed shared records

Profile and Article JSON-LD are built with shared identity and URL helpers. Article objects include `mainEntityOfPage`, the dynamic 1200×630 Open Graph image URL, stable Person identity, published and modified dates, and project context. JSON serialization continues to escape `<` before insertion.

Homepage modification time is derived from the newest published portfolio review date. The `llms.txt` review line uses the same value. This removes contradictory manual timestamps while keeping the public dates deterministic at build time.

### 4. Treat discovery files as generated views of published content

Sitemap and `llms.txt` entries are generated from the same published case-study and engineering-note registries used by their routes. Draft records never appear. Robots metadata remains permissive for public content and advertises the canonical sitemap and host.

The integrity script validates origin consistency, page coverage, publication state, unique slugs, required schema/metadata fields, and metadata presentation limits. Route and browser tests verify rendered canonicals and schema, not only source constants.

### 5. Publish a finite engineering-notes collection, not a page factory

Add a typed note registry, `/engineering` index, and `/engineering/[slug]` pages. The initial release contains three to five manually authored notes drawn from the strongest existing evidence, such as human decision gates in AI workflows, correlated AI/application telemetry, transactional reservation boundaries, and realtime React Query reconciliation.

Each note must provide a direct answer near the top, a concrete decision or mechanism, trade-offs or limits, and a link to at least one supporting case study. Notes use semantic HTML and small HTML/SVG evidence models when a visual materially clarifies the system. The homepage receives at most one quiet route to the collection; contextual case-study links and the footer are the primary discovery paths.

This is preferred to broad programmatic SEO because the portfolio has deep evidence but no proprietary high-volume dataset or validated query matrix. A template may be introduced later only after Search Console shows recurring demand and the content inventory meets the scale gate in the specification.

### 6. Keep external operations explicit and auditable

Add a short release checklist for changing the primary Vercel domain, validating redirect/canonical parity, submitting the sitemap, requesting indexing for priority URLs, recording Google-selected canonicals, and synchronizing external profile language. These remain manual tasks because the repository does not own the necessary credentials or third-party content.

## Risks / Trade-offs

- **[Risk] Changing the Vercel primary domain can briefly expose redirect or certificate inconsistency.** → Verify both hosts and representative paths after deployment; retain the previous domain assignment until the apex certificate and redirects pass.
- **[Risk] Search engines may continue showing stale snippets after the code is corrected.** → Request reindexing and monitor selected canonicals; do not interpret delayed recrawling as an application regression.
- **[Risk] Metadata length limits can encourage vague copy.** → Treat limits as warning thresholds with human-readable, query-relevant wording rather than keyword stuffing.
- **[Risk] New notes can make the portfolio feel like a blog and dilute the hiring path.** → Keep the collection finite, place it below the main journey, and require every note to connect to demonstrated work.
- **[Risk] Similar notes can cannibalize one another or become templated paraphrases.** → Require one distinct search intent, unique evidence, and a canonical supporting case for each page; reject near-duplicate topics during validation/review.
- **[Risk] `llms.txt` may be consumed inconsistently across AI systems.** → Keep it as a low-cost machine-readable summary, while relying on crawlable HTML, conventional metadata, schemas, and entity consistency as the primary foundation.

## Migration Plan

1. Add shared site, identity, and freshness configuration without changing the selected apex origin.
2. Migrate existing metadata, JSON-LD, sitemap, robots, `llms.txt`, and validators to shared helpers; run unit, integrity, route, browser, and production-build checks.
3. Add concise SEO fields to existing records and confirm rendered titles, descriptions, canonicals, and images for every public route.
4. Add the engineering-note registry, initial notes, index/detail routes, structured data, contextual links, sitemap entries, and validation.
5. Deploy without changing DNS, verify preview behavior, then set the apex domain as primary in Vercel and verify `www` permanently redirects path-for-path to apex.
6. Submit the canonical sitemap and priority URLs in Search Console, record the initial indexing state, and update external profiles.

Rollback is safe at the application layer: revert the release and restore the previous Vercel primary-domain selection. Published note routes can be removed only with permanent redirects to the closest supporting case study or engineering index.

## Open Questions

- Which three to five note topics should ship first after reviewing current case-study evidence for the strongest non-overlapping search intents?
- Is the old GitHub Pages portfolio controllable enough to redirect, or should it be replaced with a short deprecation page that points to the canonical portfolio?
- Which external profiles beyond LinkedIn, GitHub Pages, and the known Vercel community post still require title and biography synchronization?
