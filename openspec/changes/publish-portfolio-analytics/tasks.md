## 1. Provider Setup and Project Contract

- [x] 1.1 Confirm the active Vercel account can call the current Web Analytics visits count and aggregate endpoints, record the exact request/response contract as local test fixtures, and identify the production project plus optional team/account parameters.
- [x] 1.2 Add the current supported `@vercel/analytics` dependency and update the pnpm lockfile with a frozen-install check.
- [x] 1.3 Document `VERCEL_WEB_ANALYTICS_TOKEN`, project/team identifier resolution, dashboard enablement, least-privilege token setup, local disabled behavior, and production verification without committing secret values.

## 2. Aggregate Analytics Domain

- [x] 2.1 Define the serializable `PortfolioActivity` domain contract, 30-day UTC window calculation, count/date guards, and explicit unavailable result.
- [x] 2.2 Build the canonical analytics route allowlist from published case-study and engineering-note registries, including stable title lookup and registry-order tie breaking.
- [x] 2.3 Implement pure provider-response decoding and normalization that rejects malformed totals, dates, duplicates, and unsafe counts while excluding unknown, draft, asset, résumé, preview, query-string, and fragment paths.
- [x] 2.4 Add unit fixtures and tests for valid totals, no eligible ranked content, route exclusions, duplicate rows, deterministic ties, empty data, malformed payloads, and unsafe numeric values.

## 3. Server-Only Vercel Integration

- [x] 3.1 Implement a server-only configuration reader that accepts only non-public environment variables and returns the disabled state before any request when required values are absent.
- [x] 3.2 Implement fixed production-only Vercel Web Analytics count and route-aggregate requests with bearer authentication, a bounded abort timeout, and a six-hour Next.js fetch revalidation interval.
- [x] 3.3 Normalize the provider responses into `PortfolioActivity`, cap ranked content at three records, and convert authentication, rate-limit, timeout, network, invalid-response, and zero-activity outcomes into `null` without logging credentials or raw payloads.
- [x] 3.4 Add mocked adapter tests that prove the request scope is fixed, cached configuration is applied, missing configuration performs no fetch, error states fail closed, and no secret/provider-only fields cross the adapter boundary.

## 4. Collection and Public Presentation

- [x] 4.1 Mount the Next.js `Analytics` collector exactly once in the root layout and verify development/test execution does not emit production events.
- [x] 4.2 Build the async `PortfolioActivity` Server Component with a named supplementary region, semantic metric relationships, truthful `Last 30 days` and anonymous aggregate copy, and an optional list of at most three descriptive content links.
- [x] 4.3 Integrate the component after Contact within the footer utility region behind a local `Suspense` boundary with an empty fallback, ensuring `null` activity removes the region and its spacing completely.
- [x] 4.4 Apply the existing semantic tokens, muted editorial hierarchy, focus treatment, and 44px link targets; verify one reading order, clean mobile wrapping, no horizontal overflow, and parity across System, Light, and Dark themes without cards, charts, gradients, or animation.

## 5. Integrity and Browser Coverage

- [x] 5.1 Extend portfolio integrity checks to verify a single root collector, server-only credential naming/import boundaries, the approved public analytics fields, and the absence of a general analytics proxy.
- [x] 5.2 Add deterministic browser coverage for visible fixture data, totals without ranked content, omission when unavailable, placement after Contact, ranked-link destinations, semantic naming, keyboard focus, theme parity, and 390px/desktop wrapping.
- [x] 5.3 Add a rendered-output regression that checks a secret-shaped fixture and provider-only response fields never appear in homepage HTML or client assets.
- [x] 5.4 Verify local development, tests, and the production build complete without analytics credentials and without making a live Vercel API request.

## 6. Release Verification and Activation

- [x] 6.1 Run frozen dependency installation, lint, TypeScript, unit tests, portfolio integrity, production build, public-route checks, the full browser suite, React Doctor, and `git diff --check`; resolve every regression.
- [ ] 6.2 Enable Web Analytics in the Vercel project, configure the server-only production variables, redeploy, and confirm initial loads plus client-side transitions reach the analytics intake.
- [ ] 6.3 Smoke-test the deployed rolling totals and ranked content, inspect page source/client assets for credential leakage, confirm provider failure hides the region without affecting Contact, and record the rollback procedure.
