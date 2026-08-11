## ADDED Requirements

### Requirement: Selected Work contains three complementary projects
The homepage SHALL feature no more than three projects, ordered as Ample News, KudosCourts Web + Mobile, and CravingsPH.

#### Scenario: Default project order
- **WHEN** Selected Work renders from reviewed portfolio data
- **THEN** Ample News appears first, KudosCourts Web + Mobile second, and CravingsPH third with no fourth default project

#### Scenario: Complementary proof categories
- **WHEN** the three rows are reviewed together
- **THEN** they respectively demonstrate employer-delivered production AI, independent cross-platform product ownership, and transaction/realtime workflow reliability

### Requirement: Each project row makes an evidence argument
Each selected-work row SHALL communicate the real workflow or problem, Raphael's attributable ownership, at least one consequential engineering decision or constraint, and an inspectable proof destination before presenting technology metadata.

#### Scenario: Project row without tags
- **WHEN** technology tags are visually ignored
- **THEN** the row still explains what the product does, what Raphael owned, why an engineering choice mattered, and what the visitor can inspect

#### Scenario: Employer-project ownership boundary
- **WHEN** the Ample News row states Raphael's contribution
- **THEN** the wording distinguishes attributable full-stack and production-AI work from ownership of the entire employer product

### Requirement: Inspectable destinations are explicit
Selected-work rows SHALL label case-study and live-product destinations by purpose, using internal navigation for case studies and safe external-link behavior for live products.

#### Scenario: KudosCourts destinations
- **WHEN** the KudosCourts row renders
- **THEN** the visitor can distinguish `Read case study` from `Visit product` before activating either link

#### Scenario: Current CravingsPH proof
- **WHEN** the CravingsPH case study has not yet shipped
- **THEN** the row still offers its reviewed live-product destination and does not render a broken or placeholder case-study link

### Requirement: Technology metadata remains subordinate
Project technologies SHALL use a compact secondary treatment after the evidence copy and SHALL not read as the primary explanation of project value.

#### Scenario: Long technology list
- **WHEN** a project has more technologies than fit the intended row density
- **THEN** the homepage presents a curated subset or concise summary while the complete verified list remains available in the case study
