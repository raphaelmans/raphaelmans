## ADDED Requirements

### Requirement: Section headings use a natural hierarchy
Major homepage sections SHALL use direct descriptive headings with meaningful scale and spacing rather than repeating the same tiny uppercase mono eyebrow treatment.

#### Scenario: Heading cadence review
- **WHEN** Experience, Selected Work, Recognition, and Contact are viewed together
- **THEN** their hierarchy is legible without every heading sharing uppercase, monospace, tracking, size, and margin values

#### Scenario: Mono typography use
- **WHEN** Geist Mono appears on the homepage
- **THEN** it labels terse metadata such as dates, status, or technical identifiers rather than carrying every major section title or body paragraph

### Requirement: Evidence uses editorial rows rather than equal marketing cards
Experience and selected-work records SHALL render as content-led rows whose spacing and density reflect relevance, without identical icon-card grids, nested cards, or decorative numbered tiles.

#### Scenario: Experience surface review
- **WHEN** primary and earlier experience render together
- **THEN** prominence comes from content depth, spacing, and typography rather than arbitrary card height or numbered decoration

#### Scenario: Selected-work surface review
- **WHEN** the three selected projects render
- **THEN** each remains understandable at rest without depending on hover color, shadow, or a boxed dashboard treatment

### Requirement: Surfaces are earned by grouping or action
The homepage SHALL remain flat by default and SHALL use card, border, or accent surfaces only to group evidence, establish a control boundary, or distinguish the closing action.

#### Scenario: Static prose block
- **WHEN** content is ordinary explanatory prose with no grouped evidence or action boundary
- **THEN** it is not automatically enclosed in a bordered card

#### Scenario: Recognition treatment
- **WHEN** awards render after Selected Work
- **THEN** they appear as compact supporting evidence and do not use a grid or surface treatment that competes with professional and project proof

### Requirement: Responsive rhythm preserves reading priority
The homepage SHALL maintain the approved DOM order, readable 65–75 character prose width, balanced headings, varied section spacing, and no horizontal overflow from 390px through desktop widths.

#### Scenario: Narrow viewport
- **WHEN** the homepage renders at 390px with long role, company, project, and CTA labels
- **THEN** text wraps without clipping, actions remain distinguishable, and earlier experience does not become an unreadable multi-column layout

#### Scenario: Desktop viewport
- **WHEN** the homepage renders within its 740px reading column
- **THEN** section spacing distinguishes major argument shifts while related evidence stays visually grouped

### Requirement: Decorative sequencing is prohibited
Numbers SHALL appear only when content represents a real ordered process; metric-cell grids, section-number scaffolds, and repeated decorative indices SHALL not organize the hiring journey.

#### Scenario: Homepage scaffold audit
- **WHEN** all visible section and item labels are reviewed
- **THEN** no `01`, `02`, or similar index is used solely to make a non-sequential card or section appear structured
