## ADDED Requirements

### Requirement: Production navigation is measured through Vercel Web Analytics
The system SHALL mount the supported Vercel Web Analytics collector exactly once in the root application layout and SHALL measure production initial page loads and client-side route transitions. Development and automated test execution MUST NOT emit production analytics events.

#### Scenario: Visitor navigates between public pages
- **WHEN** a production visitor loads a public route and follows an internal Next.js route
- **THEN** Vercel Web Analytics receives the corresponding page-view measurements without requiring route-specific instrumentation

#### Scenario: Developer runs the portfolio locally
- **WHEN** the application runs in development or automated tests
- **THEN** it does not send those visits into the production analytics dataset

### Requirement: Provider authentication remains server-only
The system SHALL read Vercel analytics credentials only from non-public server environment variables and SHALL isolate authenticated API requests in a server-only module. It MUST NOT expose a token, authenticated request headers, unrestricted query parameters, or raw provider responses to client JavaScript, rendered markup, logs, or a public proxy endpoint.

#### Scenario: Public activity is rendered
- **WHEN** a visitor receives the homepage HTML and client assets
- **THEN** those resources contain only approved aggregate values and no Vercel access credential or provider response payload

#### Scenario: A caller attempts to vary the analytics query
- **WHEN** a public request includes arbitrary analytics filters or route values
- **THEN** the fixed server-side analytics query remains unchanged and no general provider proxy is available

### Requirement: Public analytics uses a narrow aggregate contract
The system SHALL query production analytics for a rolling 30-day UTC window and SHALL normalize the result to non-negative safe-integer visitor and page-view totals, a measured-through date, and at most three ranked public content records. Ranked records MUST be recognized published case-study or engineering-note paths joined to titles from the canonical public registries.

#### Scenario: Valid aggregate data is returned
- **WHEN** Vercel returns valid totals and route aggregates for the configured project
- **THEN** the adapter returns the approved aggregate contract with stable ranking and canonical public links

#### Scenario: Provider rows contain unknown or non-content paths
- **WHEN** route aggregates include drafts, assets, the résumé, preview paths, unknown routes, query strings, or fragments
- **THEN** those rows are excluded from the public ranked-content result

#### Scenario: Ranked routes have equal page views
- **WHEN** two approved content routes have the same page-view count
- **THEN** their relative order follows the canonical public registry order

### Requirement: Remote analytics data is strictly validated
The system SHALL validate status codes, payload shape, numeric bounds, dates, route allowlisting, and duplicate rows before returning public activity. A malformed or partially trusted response MUST resolve to the unavailable state rather than being rendered.

#### Scenario: Provider response is malformed
- **WHEN** a response contains a negative count, unsafe integer, invalid date, unexpected shape, or conflicting duplicate route
- **THEN** the adapter rejects the response and returns no public activity data

### Requirement: Analytics queries are bounded, cached, and optional
The system SHALL bound upstream request duration, revalidate successful analytics queries no more frequently than every six hours, and treat missing configuration, timeouts, authentication failures, rate limits, invalid responses, and empty datasets as an unavailable result. These conditions MUST NOT fail a build, throw into a public page, or block essential portfolio content.

#### Scenario: Analytics configuration is absent
- **WHEN** local development, a test, preview, or production build does not provide the required server variables
- **THEN** the adapter returns the unavailable result without making a provider request and the application remains buildable

#### Scenario: The provider is slow or unavailable
- **WHEN** the Vercel API exceeds the configured timeout or returns an error
- **THEN** the optional analytics region resolves safely without delaying or replacing the primary page content

#### Scenario: Multiple visitors request cached activity
- **WHEN** a valid aggregate result is still within its six-hour revalidation interval
- **THEN** the system reuses the cached result instead of issuing a provider query per visitor

### Requirement: Published analytics preserves visitor privacy
The system MUST limit public output to aggregate totals, the defined window, and ranked public content. It MUST NOT publish raw events, hashes, persistent identities, IP addresses, referrers, locations, devices, browsers, session trails, or claims that an anonymous visitor count identifies distinct people across days.

#### Scenario: Public analytics markup is inspected
- **WHEN** a visitor or crawler reads the activity summary
- **THEN** it contains only the approved aggregate fields and describes visitors as anonymous aggregate measurements
