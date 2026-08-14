## ADDED Requirements

### Requirement: One canonical production origin
The system SHALL define one shared production origin and SHALL use it for metadata bases, absolute canonical URLs, Open Graph URLs, JSON-LD identifiers and URLs, sitemap entries, robots host and sitemap declarations, `llms.txt` links, and integrity validation. The deployed alternate host SHALL permanently redirect each requested path to the equivalent path on the canonical origin.

#### Scenario: Public page search signals agree
- **WHEN** any indexable portfolio page is rendered in production
- **THEN** its final URL, canonical URL, Open Graph URL, and structured-data page URL use the same canonical origin and path

#### Scenario: Alternate host is requested
- **WHEN** a visitor or crawler requests a public path on `www.raphaelmansueto.com`
- **THEN** the deployment permanently redirects to the same path and query on `https://raphaelmansueto.com`

### Requirement: Search-result metadata is distinct and concise
The system SHALL provide each indexable page with a unique, human-readable title and description that communicate the page's primary hiring or technical intent. Editorial H1 text and search metadata SHALL be independently configurable. The final rendered title SHALL be no longer than 60 characters where practical, and descriptions SHALL target 140–160 characters without truncating a sentence.

#### Scenario: Homepage metadata is rendered
- **WHEN** the homepage metadata is generated
- **THEN** it identifies Raphael Mansueto's full-stack and AI-integration positioning without repeating the visible name as a separate headline fragment or presenting him as a software product

#### Scenario: Case-study metadata is rendered
- **WHEN** a published case-study route generates metadata
- **THEN** it uses the record's concise SEO title and description while preserving the separate editorial headline on the page

### Requirement: Complete and stable entity structured data
The system SHALL render valid ProfilePage and Person structured data on the homepage and valid Article structured data on each case study and engineering note. Each Article SHALL include a stable page identifier, `mainEntityOfPage`, headline, description, canonical URL, representative image, publication and modification dates, and the shared Person author identity.

#### Scenario: Case-study schema is rendered
- **WHEN** a crawler reads a published case study
- **THEN** its Article JSON-LD references the canonical page, a crawlable 1200×630 route-specific image, shared author identity, and dates matching the visible and sitemap data

#### Scenario: Structured data is serialized
- **WHEN** JSON-LD is inserted into a rendered page
- **THEN** it is valid JSON and escapes less-than characters to prevent markup termination

### Requirement: Freshness signals derive from published content
The system SHALL derive the homepage modification date and `llms.txt` review date from the newest review date among published portfolio records. Page-level modification dates SHALL come from their owning content records and SHALL use strictly validated calendar dates.

#### Scenario: A published record is reviewed
- **WHEN** the newest published content record receives a later valid `lastReviewed` date
- **THEN** the homepage schema, sitemap homepage entry, and `llms.txt` review line expose that same derived date without separate literal edits

#### Scenario: An invalid date is entered
- **WHEN** a content record contains a normalized-but-impossible date such as `2026-02-30`
- **THEN** integrity validation fails before publication

### Requirement: Discovery feeds include every published page
The sitemap and `llms.txt` SHALL be generated from the same published registries used by the routes. They SHALL include the homepage, every published case study, every published engineering note, and the résumé where appropriate, and SHALL omit drafts and unknown slugs. Robots metadata SHALL allow public crawling and advertise the canonical host and sitemap.

#### Scenario: A note is published
- **WHEN** an engineering note changes from draft to published
- **THEN** its canonical URL appears in the sitemap and `llms.txt` and becomes available through static route generation

#### Scenario: A note remains a draft
- **WHEN** an engineering note is marked draft
- **THEN** it is absent from static parameters, sitemap output, `llms.txt`, and index-page links

### Requirement: Search integrity is mechanically verified
The portfolio integrity and route checks SHALL fail on conflicting origins, missing public-page coverage, duplicate slugs, missing schema essentials, missing representative images, invalid dates, or metadata outside configured presentation thresholds. Browser coverage SHALL verify the rendered canonical and JSON-LD for the homepage and at least one route of each content type.

#### Scenario: A local URL constant diverges
- **WHEN** a public metadata or discovery surface emits a host different from the shared canonical origin
- **THEN** automated validation fails with the surface and conflicting URL identified

#### Scenario: A production build is verified
- **WHEN** the release candidate runs the complete verification workflow
- **THEN** lint, type checking, unit tests, portfolio integrity, production build, public-route checks, and representative browser assertions all pass

### Requirement: External indexing actions are documented
The repository SHALL contain a post-deployment checklist for domain verification, sitemap submission, priority-URL inspection, Google-selected canonical review, indexing monitoring, and third-party profile synchronization. The checklist SHALL distinguish repository automation from authenticated owner actions.

#### Scenario: Search release is deployed
- **WHEN** the canonical-host release reaches production
- **THEN** the owner can follow one documented checklist to verify both hosts, submit the sitemap, request priority indexing, and record external entity updates
