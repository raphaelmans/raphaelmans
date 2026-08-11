## ADDED Requirements

### Requirement: Both themes implement the approved semantic palette
The site SHALL define the same semantic color roles for light and dark modes, using the approved Warm Paper + Graphite values in light mode and Midnight Zinc + Signal Sky values in dark mode.

#### Scenario: Light semantic roles
- **WHEN** the light theme is active
- **THEN** canvas/foreground are `#f7f7f5`/`#1c1c1a`, card is `#ffffff`, primary/primary-foreground are `#0369a1`/`#ffffff`, muted/muted-foreground are `#f3f3f0`/`#686864`, accent/accent-foreground are `#e7f5fb`/`#0c4a6e`, and border/input/ring are `#e2e2de`/`#d8d8d3`/`#0284c7`

#### Scenario: Dark semantic roles
- **WHEN** the dark theme is active
- **THEN** canvas/foreground are `#09090b`/`#fafafa`, card is `#18181b`, primary/primary-foreground are `#38bdf8`/`#09090b`, muted/muted-foreground are `#18181b`/`#a1a1aa`, accent/accent-foreground are `#082f49`/`#7dd3fc`, and border/input/ring are white at 8%/white at 12%/`#38bdf8`

### Requirement: Components consume semantic roles
Portfolio UI SHALL express canvases, text hierarchy, surfaces, borders, controls, focus, hover, active state, selection, and scroll affordances through semantic tokens rather than raw Zinc, black, white, or theme-specific hex utility classes.

#### Scenario: Shared component audit
- **WHEN** theme-related source code is searched outside the global token definitions and approved static social-image rendering
- **THEN** component markup contains no raw `text-zinc-*`, `bg-black*`, `bg-white*`, `border-white*`, forced dark-canvas hex, or equivalent theme-specific presentation utilities

#### Scenario: Component switches theme
- **WHEN** a portfolio row, tag, navigation state, button, or case-study surface changes between light and dark
- **THEN** its semantic meaning and hierarchy remain stable while its raw colors resolve from the active theme

### Requirement: Meaningful text meets WCAG 2.2 AA contrast
All meaningful normal-size text and interactive labels SHALL meet at least 4.5:1 contrast against their rendered background in both themes, and large text SHALL meet at least 3:1.

#### Scenario: Dark secondary text
- **WHEN** meaningful secondary or metadata text appears on the dark canvas
- **THEN** it uses the accessible muted-foreground role at Zinc 400 or a stronger approved value, never Zinc 600 or Zinc 700

#### Scenario: Light secondary text
- **WHEN** meaningful secondary or metadata text appears on the light canvas
- **THEN** it uses Graphite Muted `#686864` or a stronger approved semantic value

#### Scenario: Interactive state contrast
- **WHEN** a control is focused, hovered, active, or selected
- **THEN** its label, boundary, and focus indicator remain discernible at WCAG 2.2 AA contrast without relying on color alone

### Requirement: Signal Sky remains restrained and semantic
The interface SHALL reserve Signal Sky for primary action, links, active navigation, keyboard focus, and genuinely selected information; neutral roles SHALL carry general layout and prose.

#### Scenario: Static content surface
- **WHEN** a surface contains ordinary prose or grouped evidence with no active state
- **THEN** the surface uses neutral canvas, card, secondary, or muted roles rather than a Signal Sky fill or border

#### Scenario: Primary action in each theme
- **WHEN** the primary action is rendered in light or dark mode
- **THEN** light mode uses Signal 700 with white foreground and dark mode uses Signal 400 with Midnight 950 foreground

### Requirement: Theme parity covers every public portfolio route
The homepage, sticky and mobile navigation, work case-study route, footer, selection styling, and all responsive interaction states SHALL be intentionally legible in both light and dark themes.

#### Scenario: Homepage parity
- **WHEN** the homepage is reviewed at 390px and desktop width in each theme
- **THEN** hierarchy, surface boundaries, text, focus, hover, open navigation, and calls to action remain readable without decorative shadow dependence

#### Scenario: Case-study parity
- **WHEN** a valid work case study is reviewed in each theme
- **THEN** the header, metadata, evidence steps, narrative sections, stack, return navigation, and footer all use semantic theme roles with no dark-only remnants

#### Scenario: System-theme route navigation
- **WHEN** a visitor navigates between the homepage and a case study while System, Light, or Dark is selected
- **THEN** the selected theme remains consistent and no route transition exposes the opposite canvas
