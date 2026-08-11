## ADDED Requirements

### Requirement: Homepage proof destinations are publishable and reachable
Every internal case-study action rendered on the homepage SHALL correspond to a reviewed published case-study record, a generated static route, and a successful public destination.

#### Scenario: Valid featured case study
- **WHEN** a featured project renders a `Read case study` action
- **THEN** its slug exists in the published case-study set, is included in static parameters, and resolves successfully at `/work/<slug>`

#### Scenario: Case study is unavailable
- **WHEN** a featured project's case study is incomplete, withdrawn, or missing from generated routes
- **THEN** the homepage does not render a case-study action for that project and offers only a reviewed reachable alternative when one exists

### Requirement: Public proof assets are validated before release
Every artifact rendered on a homepage or published case study SHALL reference an existing approved public file and SHALL contain the metadata required for accessible responsive rendering.

#### Scenario: Missing public artifact
- **WHEN** validation encounters an artifact path that does not exist in the public output
- **THEN** the validation command fails with the project slug and missing artifact path before release

#### Scenario: Incomplete artifact metadata
- **WHEN** a rendered artifact lacks dimensions, alt text, caption, placement, theme behavior, or required responsive presentation metadata
- **THEN** validation identifies the artifact and prevents it from entering the published proof set

### Requirement: Public indexes remain synchronized with publication state
Homepage links, generated work routes, sitemap entries, and curated machine-readable portfolio indexes SHALL derive from or be validated against the same reviewed published set.

#### Scenario: Study is withdrawn
- **WHEN** a case study leaves the reviewed published set
- **THEN** its homepage case-study action, generated route, sitemap entry, and machine-readable index entry are removed together

#### Scenario: Study is published
- **WHEN** a reviewed case study enters the published set
- **THEN** route generation and public indexes include it without requiring an unrelated duplicate allowlist

### Requirement: Integrity checks are repeatable
The repository SHALL expose a deterministic command that validates project-route, publication, index, and artifact integrity and returns a non-zero status on failure.

#### Scenario: Broken homepage route regression
- **WHEN** a homepage case-study URL is changed to a slug outside the published route set
- **THEN** the integrity command fails and names the invalid project and destination

#### Scenario: Clean public proof graph
- **WHEN** all rendered proof destinations and assets match the reviewed published set
- **THEN** the integrity command completes successfully and can be run in local and CI verification
