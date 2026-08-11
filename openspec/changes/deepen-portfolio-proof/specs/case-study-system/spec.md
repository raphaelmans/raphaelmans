## ADDED Requirements

### Requirement: Published case studies satisfy a complete evidence structure
Every published case study SHALL contain direct orientation, current status, personal role and attribution, real-world problem, constraints, ownership, consequential decisions, reliability or correctness evidence, verified outcome or observable evidence, honest limitations, next steps, and a review date.

#### Scenario: Existing study completeness
- **WHEN** Ample News or KudosCourts is validated for publication
- **THEN** every required evidence category is present in public copy even when project-specific section titles and ordering differ

#### Scenario: Incomplete record
- **WHEN** a case-study record lacks a required evidence category, review date, or approved visual artifact
- **THEN** development or build validation reports the record as incomplete and the record is not added to generated public routes

### Requirement: Case-study orientation is immediate and attributable
Each case-study opening SHALL expose classification, status, period, Raphael's role, platform scope, a direct summary, and the last-reviewed date before the long-form narrative.

#### Scenario: Employer project orientation
- **WHEN** the Ample News case study opens
- **THEN** the visitor can immediately tell that it was an employer project delivered under HustleWing and that the contribution described is attributable rather than sole ownership

#### Scenario: Personal product orientation
- **WHEN** KudosCourts or CravingsPH opens
- **THEN** the visitor can immediately identify Raphael's personal product ownership, current public status, and platform scope

### Requirement: CravingsPH receives a reviewed case study
The system SHALL publish `/work/cravingsph` only after its narrative and visual evidence are reviewed, focusing on restaurant workflows, end-to-end ownership, state modeling, transactional commands, concurrency control, realtime operations, and secure kiosk boundaries.

#### Scenario: CravingsPH publication gate passes
- **WHEN** the CravingsPH narrative, attribution, external URL, artifact, limitations, and confidentiality review are complete
- **THEN** `cravingsph` is included in static parameters and the route renders a complete case study

#### Scenario: CravingsPH claims remain bounded
- **WHEN** the CravingsPH outcome and status are rendered
- **THEN** the page says early-partner, distinguishes implemented system depth from measured production volume, and makes no unsupported payment, POS-replacement, commercial-success, or transaction-volume claim

### Requirement: Case studies explain decisions rather than only technology
Long-form sections SHALL connect architecture and technology to a user workflow, constraint, decision, correctness property, or operational consequence.

#### Scenario: Technology-list removal test
- **WHEN** a visitor ignores the verified technology section
- **THEN** the narrative still demonstrates engineering judgment, ownership, reliability boundaries, and why the system was designed as described

#### Scenario: CravingsPH concurrency decision
- **WHEN** the CravingsPH study discusses simultaneous staff actions or session settlement
- **THEN** it explains command deduplication, deterministic locking, transactional behavior, and the user-facing consequence of benign conflicts

### Requirement: Every case study ends with a coherent next step
Each case study SHALL close with email as the primary hiring action, a route back to homepage Selected Work, and an optional contextual link to another published case study.

#### Scenario: Case-study completion
- **WHEN** a visitor finishes a case study
- **THEN** the visitor can contact Raphael or continue evaluating related work without relying on browser Back or an unlabeled logo link

### Requirement: Project-specific depth remains possible
The shared renderer SHALL enforce common evidence requirements without forcing every project to have identical section titles, section counts, or visual placement.

#### Scenario: Different evidence emphasis
- **WHEN** Ample News emphasizes workflow observability and CravingsPH emphasizes concurrency and state modeling
- **THEN** both satisfy the common publication contract while preserving their distinct technical narratives
