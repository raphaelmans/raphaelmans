## ADDED Requirements

### Requirement: The opening viewport establishes the hiring case
The homepage SHALL make Raphael's identity, current role, specialty, compact credibility signal, and primary next action understandable from the opening viewport without requiring interaction.

#### Scenario: Ten-second first scan
- **WHEN** a first-time visitor scans the opening viewport at a desktop or 390px mobile width
- **THEN** the visitor can identify Raphael Mansueto, Senior Full Stack AI Engineer, the production-AI/integration/full-stack positioning, a credibility bridge to current work, and the `View experience` action

#### Scenario: Content before hydration
- **WHEN** the server-rendered homepage is inspected before client effects run
- **THEN** the complete opening identity, positioning, credibility copy, and actions are present and visible

### Requirement: The homepage follows the approved evidence sequence
The homepage SHALL render Hero, compact proof line, Experience, Selected Work, compact Recognition, Contact, and Footer in that order, with no standalone Capabilities or How I Work section.

#### Scenario: Normal reading order
- **WHEN** a visitor reads the homepage from top to bottom
- **THEN** each major section follows the approved sequence and introduces evidence not already stated by the preceding section

#### Scenario: Removed repetitive sections
- **WHEN** the homepage section landmarks and navigation anchors are enumerated
- **THEN** there is no `capabilities` or `approach` section landmark or destination

### Requirement: The compact proof line recognizes breadth without imitating analytics
The homepage SHALL present the approved `5+ years`, `Production AI`, `TypeScript + Go`, and `Web + mobile` signals as one quiet, ordered line or sentence rather than separate metric cells.

#### Scenario: Wide viewport proof
- **WHEN** the proof line has enough horizontal space
- **THEN** the four signals read as one grouped sequence with restrained separators and no equal-width cell grid

#### Scenario: Narrow viewport proof
- **WHEN** the proof line wraps at 390px
- **THEN** its reading order and associations remain clear without becoming a two-column grid or causing horizontal overflow

### Requirement: Every homepage section advances the belief ladder
The homepage SHALL move from current identity to professional credibility, public ownership evidence, supporting recognition, and a direct contact decision without repeating broad capability claims as standalone content.

#### Scenario: Section-purpose review
- **WHEN** each major section is summarized in one sentence
- **THEN** no two adjacent sections have the same primary purpose or repeat the same production-AI, integrations, and full-stack claim without adding evidence

#### Scenario: Fast-to-deep transition
- **WHEN** a visitor needs more detail than the homepage provides
- **THEN** the relevant selected-work row offers an inspectable case-study or live-product destination instead of expanding exhaustive detail inline
