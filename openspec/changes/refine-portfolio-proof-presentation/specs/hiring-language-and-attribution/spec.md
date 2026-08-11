## ADDED Requirements

### Requirement: Recruiter-recognizable hero positioning
The homepage SHALL present Raphael as `Senior Full-Stack Engineer · AI Integrations` rather than using `Product Engineer` or appending the current employer title to the hero identity line. The official VISEO title SHALL remain available in the Experience section and machine-readable professional record.

#### Scenario: Hiring visitor scans the opening viewport
- **WHEN** a visitor opens the homepage
- **THEN** the identity line reads `Raphael Mansueto · Senior Full-Stack Engineer · AI Integrations`
- **AND** the opening viewport does not append `Senior Full Stack Developer at VISEO` to that identity line
- **AND** the VISEO experience still identifies the official role as `Senior Full Stack Developer`

### Requirement: Outcome-led anonymized campaign workflow
The anonymized employer project SHALL lead with the product behavior delivered rather than LangGraph or implementation mechanics. It SHALL remain unnamed until the existing Vectle publication restriction is separately cleared, and its technical stack SHALL remain visually subordinate.

#### Scenario: Campaign workflow appears under HustleWing
- **WHEN** the anonymized campaign workflow is rendered in Experience
- **THEN** its label is `Customizable campaign workflow`
- **AND** its summary explains that business data becomes customizable campaign drafts, feedback refines each result, and a human decision gate controls final use
- **AND** the summary does not lead with LangGraph, schema validation, or approve/improve/reject UI labels
- **AND** the name `Vectle` is not rendered publicly

### Requirement: Ownership without solo framing
Public project attribution SHALL communicate concrete ownership through responsibilities and decisions without using `Solo product owner` as a role label or presenting team size as a value claim.

#### Scenario: Visitor inspects KudosCourts role metadata
- **WHEN** the KudosCourts case study renders its role or attribution summary
- **THEN** the phrase `Solo product owner` is absent
- **AND** ownership is demonstrated through specific product, architecture, implementation, or operational responsibilities elsewhere in the case study

### Requirement: Identity consistency across discovery surfaces
Visible metadata, structured data, Open Graph content, résumé-facing summaries, and machine-readable portfolio content SHALL distinguish the official current title from the agreed market positioning without presenting conflicting current job titles.

#### Scenario: Crawler and hiring visitor compare identity signals
- **WHEN** the homepage, metadata, structured data, Open Graph asset, and `llms.txt` are inspected together
- **THEN** `Senior Full-Stack Engineer · AI Integrations` is used as positioning where appropriate
- **AND** `Senior Full Stack Developer at VISEO` is used only as the factual current employment title
- **AND** neither surface describes `Product Engineer` as Raphael's role
