## ADDED Requirements

### Requirement: Evidence uses semantic HTML instead of rendered diagram images
Active homepage and case-study evidence models SHALL render as semantic HTML and CSS rather than SVG or raster images. Text, sequence, gates, branches, and state relationships SHALL remain understandable in the document structure without relying on image pixels or color alone.

#### Scenario: Visitor reads a proof model
- **WHEN** a published evidence model is rendered
- **THEN** its meaningful labels and explanations exist as selectable HTML text
- **AND** ordered processes use semantic ordered structure where applicable
- **AND** decorative connectors are hidden from assistive technology
- **AND** the model does not require `next/image`, an image `src`, or a full-size-image action

### Requirement: Homepage proof depth varies by project value
The homepage SHALL not force an identical diagram slot into every project. KudosCourts SHALL present context, an owned decision, and its primary case-study action without an inline evidence diagram; Ample News and CravingsPH SHALL use simplified HTML evidence only when it improves comparison.

#### Scenario: Visitor compares Selected Work
- **WHEN** the homepage Selected Work section renders
- **THEN** KudosCourts appears without the `From fragmented evidence to an operated product` diagram or an equivalent inline flow
- **AND** Ample News and CravingsPH may each render one concise HTML evidence model
- **AND** every project retains exactly one dominant case-study action
- **AND** the three project rows are not forced into an identical visual rhythm

### Requirement: Case studies retain useful semantic evidence
The KudosCourts case study SHALL replace the removed diagram with a concise HTML explanation of its review boundary. The useful Ample News workflow and observability models and the CravingsPH correctness model SHALL be simplified into maintainable HTML compositions without losing their approved public claims.

#### Scenario: Visitor opens each published case study
- **WHEN** the visitor opens KudosCourts, Ample News, or CravingsPH
- **THEN** each retained evidence concept is rendered as theme-native HTML
- **AND** KudosCourts explains that reviewed evidence precedes deterministic persistence without repeating the removed homepage diagram
- **AND** Ample News preserves human confirmation, recoverable stages, and correlated observability
- **AND** CravingsPH preserves command deduplication, deterministic locking, coordinated state regions, and post-commit reconciliation

### Requirement: Evidence is responsive and theme-native by construction
HTML evidence components SHALL use existing semantic color, border, typography, and focus tokens. They SHALL remain readable without alternate mobile sources, horizontal scrolling, luminance inversion, or light-only canvases.

#### Scenario: Evidence renders across themes and viewports
- **WHEN** an evidence component is viewed at 390px or desktop width in System, Light, or Dark theme
- **THEN** all meaningful labels remain at least 12px
- **AND** the component introduces no horizontal overflow
- **AND** foreground, boundary, and emphasis colors retain sufficient contrast
- **AND** no device-specific duplicate content source or dark-mode image filter is required

### Requirement: Evidence copy remains concise
Homepage evidence components SHALL communicate one consequential relationship using no more than five labeled nodes or stages. Supporting explanation SHALL be concise and SHALL not repeat the adjacent project context, owned decision, or case-study CTA.

#### Scenario: Homepage evidence is reviewed for duplication
- **WHEN** the Ample News and CravingsPH homepage evidence components are inspected
- **THEN** each contains no more than five labeled nodes or stages
- **AND** each advances a distinct proof point not already stated verbatim in the surrounding copy
- **AND** the evidence remains understandable without opening a separate full-size asset

### Requirement: Legacy artifact URLs remain compatible during migration
Previously published SVG files SHALL remain available at their existing direct URLs during this change, but active portfolio rendering, machine-readable indexes, and integrity rules SHALL use the semantic evidence registry instead of treating those files as current proof surfaces.

#### Scenario: Migration removes active image rendering
- **WHEN** semantic evidence replaces an existing SVG model
- **THEN** the SVG is absent from homepage and case-study rendering
- **AND** the SVG is absent from newly generated active artifact indexes
- **AND** its existing direct public URL continues to return successfully during the compatibility period
