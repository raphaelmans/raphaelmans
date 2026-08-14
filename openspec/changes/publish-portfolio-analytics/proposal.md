## Why

The portfolio currently offers no first-party view of how its pages are being used and no safe way to share aggregate activity with visitors. Vercel Web Analytics and its aggregated API can provide privacy-preserving traffic evidence while a restrained public summary adds transparent social proof without turning the hiring page into an analytics dashboard.

## What Changes

- Enable Vercel Web Analytics for automatic page-view and anonymous visitor measurement across public Next.js routes.
- Add a server-only analytics query boundary that keeps Vercel credentials private, requests only aggregate production data, validates upstream responses, and caches successful results.
- Add a compact public portfolio-activity presentation for a rolling 30-day window, limited to visitor and page-view totals plus a small ranked set of public content routes.
- Keep the activity summary subordinate to hiring evidence, exclude visitor-level, geographic, device, and referrer details, and label anonymous visitor estimates accurately.
- Define resilient loading, unavailable, empty, and stale-data behavior so analytics failures never block or destabilize public pages.
- Add configuration, integrity, unit, and browser coverage for collection, privacy boundaries, formatting, placement, responsiveness, and graceful degradation.

## Capabilities

### New Capabilities

- `privacy-preserving-traffic-analytics`: Defines analytics collection, server-only Vercel API access, aggregate-data validation, caching, privacy, and failure behavior.
- `public-portfolio-activity`: Defines the bounded public metrics, truthful labels, progressive-disclosure placement, responsive presentation, and accessibility requirements.

### Modified Capabilities

None.

## Impact

- Affects the root Next.js layout, dependency manifest and lockfile, server-side analytics integration, environment-variable documentation, and the landing-page or engineering-index composition selected for the public summary.
- Introduces authenticated requests to the Vercel Web Analytics API through a server-only boundary; required project, team/account, and token values remain deployment secrets.
- Adds cached external data to an otherwise primarily static portfolio and therefore requires deterministic fallback rendering and bounded revalidation.
- Requires the owner to enable Web Analytics in the Vercel dashboard and provision a least-privilege Vercel access token outside the repository.
- Does not expose raw events, persistent visitor identities, IP addresses, private referrer details, or a general-purpose analytics proxy.
