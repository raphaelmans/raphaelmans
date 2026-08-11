## ADDED Requirements

### Requirement: Every featured project has meaningful visual proof
Ample News, KudosCourts, and CravingsPH SHALL each expose at least one reviewed screenshot or explanatory system diagram that clarifies product behavior, architecture, or an engineering decision.

#### Scenario: Featured-work completeness
- **WHEN** the three selected-work records are validated
- **THEN** each record references at least one approved artifact and no project uses a generic decorative illustration as proof

#### Scenario: No safe screenshot exists
- **WHEN** a screenshot would expose confidential information or cannot be reviewed
- **THEN** the project uses a purpose-built public system diagram rather than a blurred placeholder or fabricated product mockup

### Requirement: Ample News satisfies its stricter visual gate
The Ample News case study SHALL include a sanitized public pipeline diagram and a separately reviewed redacted product or observability artifact.

#### Scenario: Ample News visual review
- **WHEN** the Ample News case study is prepared for publication
- **THEN** both required artifacts are present, captioned, and free of customer data, prompts, credentials, raw traces, internal identifiers, and the withheld time-saving estimate

### Requirement: Visual artifacts use typed metadata
Every project artifact SHALL declare a stable identifier, screenshot or system-diagram kind, public source path, meaningful alt text, explanatory caption, intrinsic width and height, and homepage/case-study placement.

#### Scenario: Missing artifact metadata
- **WHEN** an artifact omits alt text, caption, dimensions, kind, or placement
- **THEN** validation fails before the artifact can render in a published project

#### Scenario: Artifact replacement
- **WHEN** a reviewed image is replaced with a new crop or diagram
- **THEN** its data record is updated without adding project-specific image markup to the shared renderer

### Requirement: Visual evidence is accessible and explanatory
Artifacts SHALL use semantic figures and captions, SHALL provide alt text that communicates their relevant information, and SHALL not rely on color alone to distinguish states or flows.

#### Scenario: System diagram with multiple states
- **WHEN** a diagram uses color to group workflow stages
- **THEN** labels, ordering, boundaries, or patterns also communicate the grouping in light and dark viewing contexts

#### Scenario: Screen-reader reading order
- **WHEN** a visitor encounters an artifact through assistive technology
- **THEN** the surrounding claim, alt text, and caption explain what the artifact proves without duplicating irrelevant visual detail

### Requirement: Media preserves responsive performance
Raster artifacts SHALL render with intrinsic dimensions, responsive source sizing, optimized delivery, and lazy loading when below the fold; diagrams SHALL remain legible without horizontal page overflow.

#### Scenario: Mobile case study
- **WHEN** an artifact renders at 390px
- **THEN** it fits the content width, preserves readable labels or provides an accessible expanded presentation, and causes no layout shift from missing dimensions

#### Scenario: Homepage loading
- **WHEN** the homepage loads with one artifact per selected project
- **THEN** below-fold media is not eagerly loaded and the opening viewport's primary content is not displaced or delayed by project imagery

### Requirement: Visuals remain evidence rather than decoration
Every artifact caption SHALL name the workflow, boundary, decision, or observable behavior the artifact substantiates, and the page SHALL not add visual media solely to fill space.

#### Scenario: Artifact value review
- **WHEN** an artifact is removed during editorial review
- **THEN** reviewers can identify a specific technical or product understanding that would be lost; otherwise the artifact is excluded
