## ADDED Requirements

### Requirement: Selected Work follows the agreed hiring order
The homepage, case-study continuation paths, sitemap ordering, and machine-readable featured-work summaries SHALL derive from the reviewed order `KudosCourts → Ample News → CravingsPH`.

#### Scenario: Visitor scans featured work
- **WHEN** Selected Work renders on the homepage
- **THEN** KudosCourts is first
- **AND** Ample News is second
- **AND** CravingsPH is third

#### Scenario: Public indexes derive from the reviewed order
- **WHEN** static parameters, sitemap entries, `llms.txt`, or continuation links enumerate published work
- **THEN** they use the same reviewed public manifest rather than maintaining a separate manual ordering

### Requirement: Dividers preserve adjacent breathing room
Every horizontal divider used between experience entries, projects, evidence sections, fact rows, or footer content SHALL have intentional spacing between the rule and meaningful content on both sides. A heading, role line, date, badge, or paragraph SHALL never share or visually collide with the divider's vertical position.

#### Scenario: Experience begins below its section heading
- **WHEN** the first primary experience entry renders after `Experience that carries the work`
- **THEN** no top border crosses or touches the role and date row
- **AND** the first entry has deliberate separation from any retained boundary

#### Scenario: Repeated content is divided consistently
- **WHEN** adjacent experience or project entries use a horizontal rule
- **THEN** both entries retain at least 24px of vertical separation from the rule on desktop
- **AND** compact mobile treatments retain at least 16px of vertical separation

### Requirement: Edge borders are used only when they communicate structure
Containers SHALL not add top or bottom borders merely to frame a list when internal separators already communicate grouping. Retained boundaries SHALL correspond to a meaningful region such as a card, table, evidence model, or section transition.

#### Scenario: Divider audit removes redundant framing
- **WHEN** homepage and case-study list containers are reviewed
- **THEN** redundant `border-y` plus `divide-y` combinations are removed
- **AND** the remaining rules have an identifiable grouping or transition purpose

### Requirement: Spacing regressions are covered at representative widths
Browser regression coverage SHALL verify divider geometry and evidence placement at 390px and desktop width in light and dark themes.

#### Scenario: Automated spacing check runs
- **WHEN** the portfolio browser suite evaluates Experience and Selected Work
- **THEN** the first content block begins below any preceding rule
- **AND** representative divider-to-content distances meet the required minimums
- **AND** the page has no horizontal overflow
