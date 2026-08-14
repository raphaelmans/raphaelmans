## Why

The portfolio's content and machine-readable evidence are strong, but its live `www` redirect conflicts with apex-domain canonicals, sitemap URLs, structured data, and `llms.txt`, while the current case studies are not yet surfacing in search. The next iteration should make every crawl and entity signal consistent, improve search-result clarity, and establish a disciplined path for AI-search discovery without publishing thin pages at scale.

## What Changes

- Establish one site-origin source of truth and require redirects, canonical URLs, Open Graph URLs, structured data, robots metadata, sitemap entries, and `llms.txt` links to agree.
- Tighten homepage and case-study metadata for clearer search-result presentation while preserving the hiring narrative.
- Strengthen Article structured data with representative images and consistent author, page, and modification-date signals.
- Derive machine-readable review and modification dates from shared portfolio content rather than separately maintained literals.
- Add automated integrity checks for origin consistency, metadata limits, schema fields, sitemap coverage, and `llms.txt` coverage.
- Introduce an evidence-led engineering-notes model and hub for a small set of first-hand technical topics linked to the supporting case studies.
- Explicitly prohibit generic role/location, technology-combination, and other thin programmatic pages; any future templated expansion must pass evidence, differentiation, and measured-demand gates.
- Document post-deployment Search Console and external-profile synchronization steps that require owner access outside the repository.

## Capabilities

### New Capabilities

- `search-discovery-signals`: Defines consistent canonical-host, metadata, structured-data, sitemap, robots, `llms.txt`, and validation behavior for all public portfolio pages.
- `evidence-led-engineering-content`: Defines a finite, first-hand engineering-notes collection and the quality gates required before any programmatic expansion.

### Modified Capabilities

None.

## Impact

- Affects global and route-level Next.js metadata, canonical URL construction, JSON-LD, `robots.ts`, `sitemap.ts`, `llms.txt`, case-study data, public-route checks, and portfolio-integrity validation.
- Adds engineering-note content data, routes, navigation, sitemap entries, and structured data if included in the implementation release.
- May require a Vercel primary-domain setting change and Google Search Console actions outside the codebase.
- Does not add an SEO CMS, keyword-generation service, analytics vendor, or broad programmatic page inventory.
