## ADDED Requirements

### Requirement: Engineering notes are finite and evidence-led
The system SHALL publish an initial collection of three to five engineering notes based on distinct, first-hand decisions demonstrated in the public case studies. Every note SHALL identify at least one supporting case study and SHALL not claim metrics, ownership, or implementation details beyond the verified portfolio evidence.

#### Scenario: An initial note is proposed
- **WHEN** a topic is selected for the first engineering-notes release
- **THEN** it maps to a distinct technical question, a specific verified decision or mechanism, and at least one published supporting case study

#### Scenario: Evidence is insufficient
- **WHEN** a proposed note cannot be supported by public first-hand evidence
- **THEN** it remains unpublished regardless of keyword opportunity

### Requirement: Notes answer the query before expanding complexity
Every engineering note SHALL present a concise direct answer or takeaway near the start, then progressively disclose the mechanism, decision rationale, trade-offs, limitations, and supporting evidence. Headings SHALL be descriptive and semantic, and visuals SHALL use maintainable HTML or accessible SVG only when they materially improve understanding.

#### Scenario: A reader opens a technical note
- **WHEN** the note page first renders
- **THEN** the title, direct answer, author, review date, and supporting case-study context are understandable before the detailed implementation discussion

#### Scenario: A system relationship needs illustration
- **WHEN** prose alone cannot clearly communicate a sequence, state change, or boundary
- **THEN** the note uses a simplified semantic HTML or accessible SVG model with a text equivalent rather than a screenshot containing essential text

### Requirement: Published notes have typed discovery metadata
Each engineering-note record SHALL include a unique slug, editorial title, concise SEO title, description, direct answer, publication date, last-reviewed date, supporting case-study slugs, topic labels, publication state, and body sections. Published note pages SHALL render canonical metadata, Open Graph metadata, Article JSON-LD, and a representative image from those fields.

#### Scenario: A complete note is published
- **WHEN** a valid note record is marked published
- **THEN** `/engineering/[slug]` renders the note with unique metadata, Article schema, author identity, dates, and supporting-case links

#### Scenario: A required field is missing
- **WHEN** a published note omits its direct answer, supporting case, SEO metadata, valid dates, or body evidence
- **THEN** type or integrity validation prevents publication

### Requirement: Engineering content respects the hiring hierarchy
The system SHALL provide an `/engineering` index and contextual links from relevant case studies while keeping the portfolio homepage focused on identity, evidence, experience, and contact. The homepage SHALL expose no more than one restrained link to the engineering collection and SHALL not render the full note inventory.

#### Scenario: A hiring visitor scans the homepage
- **WHEN** the homepage is viewed without following secondary links
- **THEN** engineering notes do not add a new dense section or compete with the featured work and experience hierarchy

#### Scenario: A technical reader wants more depth
- **WHEN** the reader follows a contextual engineering link from a case study or footer
- **THEN** the engineering index or relevant note is reachable without searching the site manually

### Requirement: Thin programmatic pages are prohibited
The system SHALL NOT publish generic role/location pages, technology/location pages, interchangeable stack combinations, doorway pages, or query variants that reuse substantially the same evidence. No page SHALL be created solely because a keyword combination can be generated.

#### Scenario: A page matrix is proposed
- **WHEN** a proposed template combines roles, technologies, industries, or locations without unique first-hand evidence for every resulting URL
- **THEN** the proposal is rejected and no routes are generated

#### Scenario: Two notes target the same intent
- **WHEN** proposed pages answer substantially the same question with the same supporting evidence
- **THEN** they are consolidated into one canonical page

### Requirement: Programmatic expansion requires measured demand and unique data
The system SHALL defer templated content expansion until at least 12 distinct evidence-backed topics are available and Search Console demonstrates recurring impressions or queries for a coherent topic pattern. Before expansion, each candidate URL SHALL pass checks for unique intent, unique evidence, substantive value, indexability, internal-link placement, and maintenance ownership.

#### Scenario: The scale gate is not met
- **WHEN** fewer than 12 distinct evidence-backed topics exist or no recurring query pattern is measured
- **THEN** new content continues to be authored and reviewed individually without a generated page matrix

#### Scenario: The scale gate is met
- **WHEN** both the evidence inventory and measured-demand thresholds are met
- **THEN** a separate OpenSpec change defines the template, data source, URL inventory, quality controls, and rollout limits before any bulk routes are implemented

### Requirement: Notes form a connected expertise cluster
Published notes SHALL link to their supporting case studies, and supporting case studies SHALL link back to relevant notes. The engineering index SHALL group notes by reader problem rather than by an undifferentiated technology list. Link labels SHALL describe the destination's question or outcome.

#### Scenario: A note and case study share evidence
- **WHEN** a note references a decision demonstrated in a case study
- **THEN** both pages expose descriptive reciprocal links that help readers and crawlers follow the evidence relationship
