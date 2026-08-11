## ADDED Requirements

### Requirement: The Experience Library remains the factual authority
Every published role, date, status, technology, metric, contribution, architecture claim, and outcome SHALL be checked against the matching Experience Library note or another documented reviewed source.

#### Scenario: New case-study claim
- **WHEN** a sentence adds a factual claim not already present in public portfolio data
- **THEN** the claim is traced to a reviewed source and classified before publication

#### Scenario: Inferred claim
- **WHEN** a claim is plausible but only inferred from surrounding evidence
- **THEN** it may guide investigation but is not rendered as a public fact

### Requirement: Only verified or user-confirmed claims are publishable
The editorial registry SHALL classify candidate claims as verified, user-confirmed, inferred, or withheld, and public content SHALL contain only verified or user-confirmed facts.

#### Scenario: Withheld metric
- **WHEN** the Ample News automation estimate or another listed withheld metric appears in draft copy
- **THEN** publication review rejects the copy until the claim is independently verified and reclassified

#### Scenario: Dynamic product metric
- **WHEN** a venue, booking, usage, transaction, or release count lacks a fresh authoritative source
- **THEN** the metric is omitted rather than published with a stale value

### Requirement: Attribution boundaries are explicit
Employer projects SHALL name the employer relationship through which work was delivered, distinguish attributable contribution from product-wide ownership, and avoid presenting client work as a separate employment relationship.

#### Scenario: Ample News attribution
- **WHEN** Ample News appears on the homepage, in experience, or in its case study
- **THEN** it is consistently described as an employer project delivered under HustleWing with bounded contribution language

#### Scenario: Personal product attribution
- **WHEN** KudosCourts or CravingsPH describes ownership
- **THEN** the wording may state personal or solo product ownership only to the extent supported by the reviewed source

### Requirement: Confidentiality review covers copy and full-resolution assets
No published copy, screenshot, diagram, caption, metadata, or social preview SHALL expose private customer data, prompts, credentials, secrets, internal identifiers, private URLs, raw traces, source paths, or unapproved client names.

#### Scenario: Screenshot sanitization
- **WHEN** an employer screenshot or observability artifact is proposed
- **THEN** reviewers inspect the original-resolution file and its metadata, remove or replace every private element, and approve the final exported asset before it enters `public`

#### Scenario: Diagram abstraction
- **WHEN** a public diagram derives from a private architecture
- **THEN** it preserves the reviewed engineering concept while omitting sensitive provider configuration, identifiers, data, and operational detail

### Requirement: Public status and limitations remain honest
Every case study SHALL state its reviewed current status, distinguish implementation from measured adoption, and disclose material limitations necessary to avoid a misleading outcome claim.

#### Scenario: Discontinued employer project
- **WHEN** the Ample News outcome is described
- **THEN** the page acknowledges that the product was discontinued and makes no commercial-success claim

#### Scenario: Early-partner personal product
- **WHEN** CravingsPH is described
- **THEN** the page does not imply verified production transaction scale or universal POS replacement

### Requirement: Review metadata is required and editorial data stays private
Every indexable work page SHALL expose a valid public last-reviewed date, while evidence-note paths, confidence decisions, withheld claims, and editorial notes SHALL remain in non-rendered references and outside client bundles.

#### Scenario: Missing review date
- **WHEN** a case-study record has no valid `lastReviewed` value
- **THEN** publication validation fails and the route is not added to the published static set

#### Scenario: Browser bundle inspection
- **WHEN** client-delivered source and rendered JSON are inspected
- **THEN** they contain no local Experience Library path, confidence classification, confidentiality note, or withheld-claim inventory
