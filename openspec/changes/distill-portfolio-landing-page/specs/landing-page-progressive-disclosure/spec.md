## ADDED Requirements

### Requirement: The homepage presents a scan-level hiring journey
The homepage SHALL render the primary sequence `Hero → compact credibility → Experience → Selected Work → Recognition → Contact`, and each stage SHALL add a distinct level of evidence rather than restating the same positioning at case-study depth.

#### Scenario: Visitor scans the complete page
- **WHEN** the homepage renders
- **THEN** the six primary stages appear in the required order
- **AND** the page does not insert a standalone capability grid, process explanation, or complete case-study model between them

### Requirement: The opening resolves one hiring decision
The hero SHALL expose Raphael's recruiter-facing identity, one outcome-led value promise, one current-role credibility line, a primary action targeting Experience, and a subordinate résumé utility. Secondary professional-profile and extended availability details MUST NOT compete with the primary action in the opening decision group.

#### Scenario: Visitor evaluates the first screen
- **WHEN** the homepage hero renders
- **THEN** the visitor can identify Raphael, his full-stack and AI-integration specialization, and his current VISEO credibility
- **AND** the primary action is labeled `View experience` and targets the Experience section
- **AND** the résumé remains available as a visually subordinate utility

### Requirement: Credibility signals read as one proof line
The experience-duration, production-AI, TypeScript/Go, and web/mobile signals SHALL render as one continuous sentence or visually unified inline row rather than independent metric cells or cards.

#### Scenario: Proof signals render
- **WHEN** the credibility region is displayed at desktop or mobile width
- **THEN** its signals preserve one reading order and one visual region
- **AND** no signal is rendered as a standalone metric card

### Requirement: Homepage experience uses a bounded evidence budget
VISEO and HustleWing SHALL each render one concise summary and no more than two visible homepage proof points. Outliant and Vibravid SHALL use compact earlier-experience rows, and the section SHALL provide a route to the complete résumé.

#### Scenario: Hiring visitor compares relevant roles
- **WHEN** Experience renders on the homepage
- **THEN** VISEO and HustleWing each expose at most two proof-list items
- **AND** earlier roles remain visually subordinate to the two primary roles
- **AND** a résumé action communicates where exhaustive employment detail is available

### Requirement: Selected Work uses an unequal proof hierarchy
Selected Work SHALL derive the order `Ample News → KudosCourts Web + Mobile → CravingsPH` from shared typed data. Ample News SHALL use the flagship presentation, while KudosCourts and CravingsPH SHALL use supporting editorial-row presentations.

#### Scenario: Visitor reaches Selected Work
- **WHEN** the featured-work collection renders
- **THEN** Ample News appears first with flagship emphasis
- **AND** KudosCourts appears second as supporting proof
- **AND** CravingsPH appears third as supporting proof
- **AND** the three entries are not presented as equally weighted cards or technical briefs

#### Scenario: Public project order is enumerated elsewhere
- **WHEN** a continuation path, generated public index, or machine-readable featured-work summary exposes project order
- **THEN** it derives from the same shared public manifest
- **AND** it does not maintain a conflicting manual order

### Requirement: Homepage project entries remain scan-level
The flagship project SHALL expose concise context, one attributable consequential decision, and one primary case-study action. Each supporting project SHALL expose one outcome sentence, one compact differentiator or decision, and one action. Homepage project entries MUST NOT render complete evidence models, full architecture stages, or exhaustive technology inventories.

#### Scenario: Visitor compares project proof
- **WHEN** the three homepage project entries render
- **THEN** each entry has one primary proof action
- **AND** no featured-project region contains an element marked `data-evidence-model`
- **AND** detailed technical relationships remain available through the case-study action

### Requirement: Recognition and Contact close without adding new complexity
Recognition SHALL render as compact supporting credibility, and Contact SHALL provide one direct invitation with email as its primary action. LinkedIn and résumé links MAY appear as subordinate utilities but MUST NOT create additional equal-weight calls to action.

#### Scenario: Visitor reaches the end of the homepage
- **WHEN** Recognition and Contact render
- **THEN** awards remain visibly secondary to professional and project proof
- **AND** Contact presents exactly one primary email action
- **AND** the closing copy does not introduce a new capability inventory or technical narrative

### Requirement: Distillation preserves accessible and adaptive behavior
The distilled homepage SHALL preserve server-rendered essential content, semantic headings and landmarks, keyboard-visible focus, SSR-safe System/Light/Dark theming, minimum 44px primary interaction targets, and zero horizontal overflow at 390px and desktop widths.

#### Scenario: Homepage is evaluated across supported contexts
- **WHEN** browser regression coverage runs at mobile and desktop widths in supported themes
- **THEN** the required hierarchy and actions remain present and operable
- **AND** no essential section depends on scroll-triggered visibility or client-only disclosure
- **AND** the document has no horizontal overflow
