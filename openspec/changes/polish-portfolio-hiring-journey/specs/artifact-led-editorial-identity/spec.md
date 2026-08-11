## ADDED Requirements

### Requirement: Evidence artifacts provide the distinctive visual motif
The portfolio SHALL derive its project-specific visual identity from meaningful diagrams, evidence framing, and editorial composition rather than generic decorative illustration, equal marketing cards, or repeated ornamental scaffolds.

#### Scenario: Featured-project visual comparison
- **WHEN** the three featured projects are viewed together
- **THEN** each is recognisable through its own reviewed proof artifact while all three remain part of one restrained editorial system

#### Scenario: Decorative element review
- **WHEN** a proposed visual element does not improve evidence comprehension, project comparison, orientation, or action clarity
- **THEN** it is excluded from the interface

### Requirement: Typography follows a documented hierarchy
Display, section-heading, body, caption, label, and metadata type SHALL use documented tokens or approved steps, with monospace and uppercase treatments limited to terse identifiers rather than extended explanatory copy.

#### Scenario: Type-token audit
- **WHEN** portfolio components are inspected after implementation
- **THEN** the former undocumented 13px caption and 28px heading values have either named approved tokens or use an established documented step

#### Scenario: Long project metadata
- **WHEN** classification, platform, or status copy exceeds a terse identifier
- **THEN** it uses readable sentence case and body-appropriate typography rather than a long uppercase monospace run

### Requirement: Repetitive template signals are reduced
Status pills, technology tags, metadata rows, and identical project rhythms SHALL be used only when they clarify comparison and SHALL not repeat mechanically across every project at equal prominence.

#### Scenario: Technology treatment on homepage
- **WHEN** a featured project contains a complete verified technology inventory
- **THEN** the homepage omits it or presents only a concise subordinate summary while the case study retains the complete list

#### Scenario: Status treatment
- **WHEN** project status is essential to interpreting evidence
- **THEN** it remains visible in a restrained form; otherwise it does not create an ornamental pill solely for visual consistency

### Requirement: Side-stripe accents are prohibited
Portfolio rows, cards, callouts, and evidence summaries SHALL NOT use a left or right border thicker than 1px as a colored accent.

#### Scenario: Employer project grouping
- **WHEN** employer projects are visually nested under an experience record
- **THEN** hierarchy is communicated through spacing, a full boundary, heading structure, or a quiet tonal surface rather than a thick side stripe

#### Scenario: Case-study evidence callout
- **WHEN** observable evidence or another summary needs emphasis
- **THEN** it uses editorial hierarchy or a complete semantic container rather than `border-left` or `border-right` greater than 1px

### Requirement: Personal identity is explicit at repeated landmarks
The home navigation identity and footer SHALL make Raphael recognisable to a first-time visitor and SHALL explain any secondary identity or domain that remains visible.

#### Scenario: First-time visitor reads the home mark
- **WHEN** the header is encountered without prior knowledge of the initials `RM`
- **THEN** the accessible and visible identity provides enough of Raphael's name to identify the portfolio owner

#### Scenario: Secondary domain remains in the footer
- **WHEN** `rethndr.com` is displayed
- **THEN** nearby copy states its relationship to Raphael or the unexplained reference is removed

### Requirement: Editorial restraint preserves the hiring journey
The interface SHALL retain a calm reading rail, deliberate information density, strong section cadence, and restrained secondary controls while making one primary action and one primary evidence signal clear at each decision point.

#### Scenario: Opening viewport hierarchy
- **WHEN** the homepage renders at desktop or 390px
- **THEN** identity, positioning, and the primary evaluation action dominate over social, résumé, theme, and secondary navigation utilities

#### Scenario: Selected Work hierarchy
- **WHEN** a visitor scans a project row without interaction
- **THEN** context, decision, proof artifact, and primary case-study action are visually distinguishable without relying on hover, shadow, or decorative card treatment
