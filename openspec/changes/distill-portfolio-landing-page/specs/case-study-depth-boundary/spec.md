## ADDED Requirements

### Requirement: Complete technical evidence belongs to case studies
Complete workflow, correlation, orchestration, and coordinated-state evidence models SHALL render only on their associated published case-study routes. The homepage MUST communicate project relevance without embedding those full models.

#### Scenario: Evidence placement is validated
- **WHEN** homepage and case-study routes render from the shared evidence registry
- **THEN** homepage featured-project regions contain no complete evidence model
- **AND** each retained evidence model appears in its associated case-study section

### Requirement: Evidence presents the conclusion before implementation detail
Each case-study evidence region SHALL expose a direct conclusion heading and one concise explanatory sentence before displaying stage, state, or signal relationships.

#### Scenario: Visitor encounters an evidence region
- **WHEN** a case-study evidence model enters the reading order
- **THEN** the visitor first encounters what the model proves
- **AND** the relationship overview follows that conclusion
- **AND** granular descriptions do not precede the model's meaning

### Requirement: Semantic diagrams avoid equal-card overload
Evidence relationships SHALL use semantic HTML lists or grouped regions with CSS-only decorative connectors. The renderer MUST NOT present every node as an equally weighted bordered card when sequence, grouping, or correlation is the meaningful relationship.

#### Scenario: Sequence evidence renders
- **WHEN** an ordered workflow is displayed
- **THEN** its reading order is represented by an ordered list
- **AND** connector decoration is hidden from assistive technology
- **AND** the relationship remains understandable without color

#### Scenario: Correlation or coordinated-state evidence renders
- **WHEN** grouped signals or state regions are displayed
- **THEN** semantic grouping communicates the anchor and related items
- **AND** the interface does not flatten every item into an identical card grid

### Requirement: Progressive detail preserves essential meaning
The evidence conclusion and relationship labels SHALL remain visible without interaction. Supplementary node descriptions MAY use a native disclosure control only when the control is server-rendered, keyboard-operable, clearly labeled, and understandable without client JavaScript.

#### Scenario: Supplementary evidence is collapsed
- **WHEN** a case-study evidence disclosure is closed
- **THEN** the evidence conclusion and relationship labels remain visible
- **AND** the summary identifies what additional detail will be revealed

#### Scenario: Keyboard visitor opens supplementary evidence
- **WHEN** focus reaches the native disclosure summary and the visitor activates it
- **THEN** all supplementary descriptions become available in DOM reading order
- **AND** focus does not move unexpectedly

### Requirement: Evidence adapts without horizontal overflow
Case-study evidence SHALL display a readable horizontal relationship where space permits and a vertical relationship on narrow screens. Labels and body copy SHALL meet the established typography and contrast floors in System, Light, and Dark themes.

#### Scenario: Evidence is viewed on a 390px viewport
- **WHEN** a sequence, correlation, or coordinated-state model renders
- **THEN** its complete visible overview fits within the viewport
- **AND** labels remain at least 12px
- **AND** meaningful body text meets WCAG AA contrast

### Requirement: Evidence remains governed and machine-readable
Evidence IDs, project association, case-study section placement, accessibility context, and public-claim boundaries SHALL remain centralized and validated. Distillation MUST NOT publish a private project name, unsupported metric, proprietary identifier, or new outcome claim.

#### Scenario: Portfolio integrity validation runs
- **WHEN** evidence records and public case studies are checked
- **THEN** IDs are unique and associated with published project slugs and sections
- **AND** every active model has an accessibility context
- **AND** homepage placement is rejected
- **AND** approved confidentiality and attribution boundaries remain unchanged
