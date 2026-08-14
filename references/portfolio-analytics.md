# Portfolio analytics operations

The portfolio uses Vercel Web Analytics for two separate concerns:

- `@vercel/analytics` collects anonymous page visits in the browser.
- A server-only query reads rolling aggregate counts for the optional public footer summary.

The public component exposes only aggregate visitors, page views, the measurement date, and up to three allowlisted portfolio-content links. Raw events, referrers, countries, devices, query strings, fragments, and credentials are never returned to the page.

## Production configuration

1. Enable Web Analytics for the production project in the Vercel dashboard.
2. Create a dedicated Vercel access token with the least account/team scope that can read Web Analytics for this project. Do not reuse a personal CLI token.
3. Add the token as the encrypted production-only variable `VERCEL_WEB_ANALYTICS_TOKEN`.
4. The adapter uses Vercel's system `VERCEL_PROJECT_ID` automatically. Set `VERCEL_ANALYTICS_PROJECT_ID` only when an explicit project override is required.
5. For a team-owned project, set one of:
   - `VERCEL_ANALYTICS_TEAM_ID` with the `team_...` identifier; or
   - `VERCEL_ANALYTICS_TEAM_SLUG` with the account slug.
6. Redeploy after changing environment variables. Vercel environment changes do not affect an existing deployment.

Never prefix these variables with `NEXT_PUBLIC_`. They belong only to the Server Component data path.

## Current production target

- Project: `raphaelmans`
- Project ID: `prj_NMRI1rcKsHIglohVOaozpSReyAd2`
- Account slug: `raphaelmans-projects`
- Canonical origin: `https://www.raphaelmansueto.com`

The checked-in response fixtures document the provider contract used by the decoder. The live endpoints are:

- `GET https://api.vercel.com/v1/query/web-analytics/visits/count`
- `GET https://api.vercel.com/v1/query/web-analytics/visits/aggregate?by=requestPath&limit=100`

Both requests include `projectId`, an inclusive UTC-midnight `since`, the current ISO timestamp as `until`, and the optional team identifier. Vercel may normalize the inclusive end to the following UTC midnight; the decoder accepts only that documented boundary adjustment. Requests use bearer authentication, a 2.5-second timeout, and six-hour Next.js revalidation.

## Local and failure behavior

Local development, tests, preview deployments, missing configuration, zero activity, timeouts, rate limits, authorization failures, and malformed provider responses all return `null`. The footer region and its spacing then disappear. They do not block the rest of the page.

`PORTFOLIO_ANALYTICS_TEST_FIXTURE=visible` is only for deterministic local browser tests. The server ignores it on Vercel. Never configure it in a Vercel project.

## Production verification

After deployment:

1. Load the homepage, then navigate client-side to a work or engineering route.
2. Confirm requests reach Vercel's Web Analytics intake in browser developer tools.
3. After Vercel has processed activity, verify the two query endpoints return version `1`, matching date boundaries, and numeric aggregate counts.
4. Confirm the homepage source and downloaded JavaScript contain no access token, authorization header, referrer, country, or device data.
5. Confirm a provider outage or invalid token hides the activity region while Contact remains usable.

## Rollback

Remove `VERCEL_WEB_ANALYTICS_TOKEN` and redeploy to disable only the public aggregate summary. The collector can remain enabled. To remove collection as well, remove the root `Analytics` component, redeploy, and disable Web Analytics in the Vercel dashboard.
