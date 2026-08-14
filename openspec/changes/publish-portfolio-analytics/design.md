## Context

The portfolio is a Next.js 16 App Router site that is primarily statically rendered and deployed on Vercel. It currently has neither the `@vercel/analytics` collector nor a public analytics data source. The landing page has already been distilled around a qualified-interview journey, so any traffic evidence must remain a footer-level utility rather than becoming another primary section.

Vercel Web Analytics is the preferred source because it automatically measures Next.js page loads and client-side navigations, uses anonymous aggregate data, and now provides an authenticated Web Analytics API for page-view and visitor queries. That API still requires a private access token; the browser must never call it directly.

The implementation must tolerate missing configuration during local development, tests, preview deployments, and builds. Analytics is non-essential content: collection or query failures must not delay the primary hiring narrative, fail a build, or produce a public error state.

## Goals / Non-Goals

**Goals:**

- Measure production page views and anonymous visitors with the supported Vercel integration.
- Publish a truthful, compact rolling 30-day activity summary using aggregate data only.
- Keep credentials and Vercel query capabilities behind a server-only module.
- Bound upstream latency, validate all remote data, cache successful queries, and degrade to no activity UI when data is unavailable.
- Preserve the landing page's established hierarchy, SSR-safe themes, accessibility, responsiveness, and low client-JavaScript budget.
- Make the integration mechanically testable without live Vercel credentials or network calls.

**Non-Goals:**

- Identifying named visitors, employers, IP addresses, or persistent individuals.
- Publishing referrer, location, device, browser, session, or raw-event data.
- Building a general analytics dashboard, live counter, charting system, or arbitrary Vercel API proxy.
- Tracking custom conversion events in this change.
- Adding a database, analytics warehouse, Vercel Drain, or second analytics vendor.
- Promoting traffic counts as primary hiring evidence or adding them to the hero/navigation.

## Decisions

### Use Vercel Web Analytics for collection

Add the current supported `@vercel/analytics` package and render its Next.js `Analytics` component once in the root layout. Collection will use the package's production behavior and cover both initial loads and App Router navigations. The owner must separately enable Web Analytics in the Vercel dashboard before the next production deployment.

This is preferred over Google Analytics because the requested scope is simple, the site already runs on Vercel, and no cookie-heavy marketing stack is justified. Plausible or Umami remain future alternatives if public dashboards, longer retention, or free custom-event reporting become higher priorities.

### Query analytics only from a server-only adapter

Create a dedicated server-only module that owns environment parsing, request construction, authentication, response validation, timeout handling, route filtering, and normalization. It will read a custom `VERCEL_WEB_ANALYTICS_TOKEN` plus the project identifier and optional team/account identifier from non-public environment variables. None of these names will use the `NEXT_PUBLIC_` prefix.

The React presentation will be an async Server Component that calls this adapter. No public Route Handler will forward caller-supplied filters to Vercel, and no Client Component will receive credentials or raw API responses. Rendered HTML will contain only the selected aggregate numbers and public route labels.

This is preferred over a browser fetch because an access token in client JavaScript or browser network headers would be compromised. It is also preferred over a general internal API route because the page does not need client-side refresh and a fixed server query has a much smaller attack surface.

### Expose one narrow normalized contract

The adapter will return either `PortfolioActivity` or `null`:

```ts
type PortfolioActivity = {
  windowDays: 30;
  visitors: number;
  pageViews: number;
  popularContent: Array<{
    href: string;
    title: string;
    pageViews: number;
  }>;
  measuredThrough: string;
};
```

Queries will be limited to the production environment and a rolling 30-day UTC window. `popularContent` will contain at most three recognized, indexable case-study or engineering-note routes. Remote paths will be joined against the existing public content registries so unknown, draft, administrative, preview, asset, résumé, query-string, and fragment paths cannot appear publicly. Ties will use the canonical public registry order for stable output.

Totals will be non-negative safe integers. The adapter will reject malformed payloads rather than partially trusting them. It will not return raw rows, referrers, countries, visitor hashes, or arbitrary strings from the provider.

### Cache for six hours and fail closed

The server-side Vercel requests will use the Next.js 16 fetch cache with a six-hour revalidation interval; the repository does not currently enable Cache Components, so this change will not introduce that broader rendering migration. A short abort timeout will bound a cold upstream request. Successful normalized data can be reused during revalidation, while missing configuration, authentication failures, rate limits, timeouts, invalid payloads, and empty datasets resolve to `null` for presentation.

The analytics component will sit behind a local `Suspense` boundary whose fallback is empty. This prevents the optional request from holding the rest of the hiring page's presentation. The component will not throw an error into the page, render fabricated zeroes, or disclose provider error messages.

### Treat public analytics as footer-level transparency

Place the activity summary after Contact inside the footer utility region. It will not receive a navigation anchor or become a seventh homepage stage. The visual treatment will use the existing border, muted text, mono metadata, and link conventions rather than cards, charts, gradients, counters, or number animations.

The visible model is:

- `Portfolio activity` and `Last 30 days` as the context.
- `N anonymous visitors` and `M page views` as the two compact totals.
- An optional `Most viewed` inline/list continuation with up to three links when ranked content exists.
- A concise note that the figures are aggregate, privacy-preserving Vercel Web Analytics estimates.

If there is no valid non-zero activity, the whole region is omitted without preserving an empty gap. This is preferred over an unavailable message because analytics is supplementary and a provider outage is not relevant to a hiring visitor.

### Test the boundary with fixtures, not production credentials

Keep response decoding, normalization, route allowlisting, ranking, formatting, and unavailable-state decisions in pure functions. Unit tests will cover malformed numbers, unknown routes, duplicates, ties, empty results, and valid fixtures. Browser tests will use a deterministic injected fixture or mocked adapter result and will assert placement, labels, links, themes, mobile wrapping, and absence when unavailable. Tests must not call the live Vercel API or require a real token.

Integrity checks will verify that analytics credentials are never public-prefixed or serialized, the collector is mounted exactly once, and the public component exposes only the approved contract. The normal lint, typecheck, unit, portfolio-integrity, production-build, route, browser, and React Doctor checks remain release gates.

## Risks / Trade-offs

- **[Traffic totals can look like vanity metrics or weaken the hiring hierarchy]** → Keep them after Contact in the footer utility region, use muted editorial styling, and prohibit hero placement, cards, charts, animation, or comparative claims.
- **[Anonymous visitor totals are not persistent human identities]** → Label them as anonymous visitors for a defined 30-day window and include a concise aggregate-measurement explanation.
- **[A private Vercel token could leak through a client boundary]** → Isolate all environment reads and API calls in a server-only module, never return provider payloads, and test the rendered/client output for secret-shaped values.
- **[An external analytics request could slow or destabilize the homepage]** → Use a six-hour cached request, a short abort timeout, a local Suspense boundary, strict validation, and an empty fallback.
- **[Static builds may run without analytics configuration]** → Treat missing variables as a supported disabled state and ensure builds and tests return `null` without network access.
- **[Provider API or plan behavior can change]** → Keep the provider response behind one adapter and normalized domain type; collection remains useful even if the public summary is temporarily disabled.
- **[Low early traffic may create negative social proof]** → Omit the region for an empty dataset and do not fabricate or round counts upward.
- **[Caching makes the display non-realtime]** → State only the rolling window, not “live,” and accept up to six hours of staleness for a non-critical public metric.

## Migration Plan

1. Add the Vercel analytics package, root collector, server-only adapter, normalized domain model, and tests while keeping public rendering disabled when configuration is absent.
2. Add the footer-level Server Component and deterministic fixture coverage; verify builds still succeed without analytics variables.
3. In Vercel, enable Web Analytics and create a least-privilege access token with access to the deployed project.
4. Configure the token, project identifier, and optional team/account identifier as server-only production environment variables; redeploy production.
5. Verify the collection request, API query, aggregate labels, responsive presentation, and absence of credentials in page source and client assets.
6. If the public API is unavailable for the active account or fails after release, remove/disable the query variables so the activity region disappears while collection continues. Rollback requires no content or database migration.

## Open Questions

- Confirm the active Vercel account's Web Analytics API entitlement and exact project/team identifiers during implementation setup. This is not release-blocking because the collector and the component's disabled state can ship independently.
