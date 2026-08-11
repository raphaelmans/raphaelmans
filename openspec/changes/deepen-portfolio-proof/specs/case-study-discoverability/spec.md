## ADDED Requirements

### Requirement: Only complete published records generate routes
The case-study system SHALL statically generate routes for reviewed published records, SHALL reject unknown slugs, and SHALL not generate thin pages from incomplete projects, technologies, or keyword combinations.

#### Scenario: Published static set
- **WHEN** the production build runs after CravingsPH passes its publication gate
- **THEN** static routes are generated for `/work/ample-news`, `/work/kudoscourts`, and `/work/cravingsph`

#### Scenario: Unknown or draft slug
- **WHEN** a visitor requests a slug outside the reviewed published set
- **THEN** the route resolves to not found and exposes no draft content

### Requirement: Every case study has unique canonical metadata
Each published case study SHALL provide a unique title, description, canonical URL, Open Graph article metadata, Twitter summary, publication date, and last-reviewed date derived from reviewed public copy.

#### Scenario: Metadata uniqueness
- **WHEN** metadata for the three published studies is compared
- **THEN** titles, descriptions, canonical URLs, and social summaries identify the specific project rather than substituting only a keyword in generic copy

#### Scenario: Review date update
- **WHEN** a case study is materially re-reviewed
- **THEN** its modified metadata reflects the new valid review date while its original publication date remains accurate

### Requirement: Structured data describes the article and subject accurately
Each case-study route SHALL emit valid Article structured data whose subject is a SoftwareApplication with reviewed name, application category, operating system, URL when public, author identity, and technology keywords.

#### Scenario: CravingsPH structured data
- **WHEN** `/work/cravingsph` renders
- **THEN** its JSON-LD identifies Raphael as author, CravingsPH as the SoftwareApplication subject, Web as an accurate operating system unless reviewed otherwise, and the canonical case-study URL as the article identity

#### Scenario: Structured-data privacy
- **WHEN** JSON-LD is inspected
- **THEN** it contains only public facts and no local source path, editorial status, withheld claim, or private project metadata

### Requirement: Social previews are route-specific and disclosure-safe
Each case study SHALL generate a readable social preview from approved public title and summary copy using the static portfolio brand presentation, without embedding confidential project imagery by default.

#### Scenario: Social image generation
- **WHEN** a case-study Open Graph image is requested
- **THEN** it renders the correct project identity and reviewed summary without relying on visitor theme state or an unreviewed screenshot

### Requirement: Published studies remain discoverable through site indexes
Every published case study SHALL appear in the sitemap and curated `llms.txt` portfolio index, and SHALL receive a descriptive internal link from Selected Work.

#### Scenario: New CravingsPH publication
- **WHEN** CravingsPH becomes published
- **THEN** its canonical route appears once in the sitemap, is summarized accurately in `llms.txt`, and is linked from its homepage project row

#### Scenario: Study is withdrawn
- **WHEN** a case study is removed from the reviewed published set
- **THEN** its route, sitemap entry, `llms.txt` entry, and homepage case-study link are removed together

### Requirement: Case-study documents remain semantically navigable
Each page SHALL use one `h1`, ordered `h2`/`h3` hierarchy, semantic article and section landmarks, lists for actual collections, figures and captions for artifacts, machine-readable time elements, and descriptive links.

#### Scenario: Heading outline
- **WHEN** a published case study is inspected without CSS
- **THEN** its project identity, evidence sections, figures, technology metadata, limitations, and next action remain understandable in document order

#### Scenario: Internal navigation
- **WHEN** a keyboard or screen-reader user opens and completes a case study
- **THEN** the user can identify the return-to-work, contact, and related-study destinations from their link text alone
