## ADDED Requirements

### Requirement: System theme is the first-visit default
The site SHALL resolve to the visitor's operating-system light or dark preference when no explicit theme has been selected, and SHALL respond to later system preference changes while System remains selected.

#### Scenario: First visit with a light system preference
- **WHEN** a visitor has no stored theme and the operating system prefers light colors
- **THEN** the site renders with the light semantic palette before the first content paint

#### Scenario: First visit with a dark system preference
- **WHEN** a visitor has no stored theme and the operating system prefers dark colors
- **THEN** the site renders with the dark semantic palette before the first content paint

#### Scenario: System preference changes
- **WHEN** the selected theme is System and the operating-system preference changes
- **THEN** the rendered theme updates to the new system preference without requiring a reload

### Requirement: Visitors can persist a theme preference
The site SHALL offer System, Light, and Dark selections and SHALL persist the selected value across reloads and same-origin tabs.

#### Scenario: Explicit Light selection
- **WHEN** a visitor selects Light while the system prefers dark colors
- **THEN** the site uses the light palette and restores Light after reload

#### Scenario: Explicit Dark selection
- **WHEN** a visitor selects Dark while the system prefers light colors
- **THEN** the site uses the dark palette and restores Dark after reload

#### Scenario: Return to System
- **WHEN** a visitor selects System after using an explicit theme
- **THEN** the site immediately resolves from the current system preference and continues following later system changes

### Requirement: Theme initialization is SSR-safe
The site SHALL keep meaningful page content in server-rendered output, SHALL apply the resolved theme class before normal content paint when JavaScript is available, and SHALL produce identical server and initial-client markup for theme-dependent controls.

#### Scenario: Hydration with a stored override
- **WHEN** server-rendered markup loads with a stored theme that differs from the system preference
- **THEN** the stored theme is applied without a visible page-theme flash and hydration completes without an error

#### Scenario: Theme state is unresolved on the server
- **WHEN** a theme control renders before client mount
- **THEN** it occupies its final dimensions with stable, theme-independent markup and does not read an unresolved theme value into the DOM

#### Scenario: JavaScript is unavailable
- **WHEN** client scripts do not execute
- **THEN** all portfolio and case-study content remains visible and readable using the server-rendered light fallback

#### Scenario: Hydration-warning scope
- **WHEN** the theme bootstrap mutates the document theme class before hydration
- **THEN** mismatch suppression is limited to the root `html` element and no descendant hydration warning is suppressed

### Requirement: The theme utility is accessible
The theme utility SHALL provide a minimum 44×44px trigger, a persistent accessible name, keyboard-operable System/Light/Dark choices, a visible focus indicator, and a non-color indication of the selected choice.

#### Scenario: Keyboard theme selection
- **WHEN** a keyboard user focuses the theme trigger, opens its choices, and selects Dark
- **THEN** focus remains visible throughout, the selection is announced, and the dark theme is applied

#### Scenario: Pre-mount trigger
- **WHEN** assistive technology encounters the server-rendered trigger before theme state is available
- **THEN** the trigger has a meaningful accessible name without asserting an inaccurate selected theme

### Requirement: Browser color scheme metadata supports both modes
The site SHALL declare both light and dark color schemes through the Next.js viewport API, SHALL provide media-aware browser theme colors for the approved canvases, and SHALL expose the resolved scheme to native browser controls.

#### Scenario: Browser uses light system chrome
- **WHEN** the browser evaluates a light `prefers-color-scheme`
- **THEN** the viewport theme color is `#f7f7f5` and both color schemes remain declared

#### Scenario: Browser uses dark system chrome
- **WHEN** the browser evaluates a dark `prefers-color-scheme`
- **THEN** the viewport theme color is `#09090b` and both color schemes remain declared

### Requirement: Content visibility does not depend on entrance motion
The site SHALL render essential headings, evidence, links, and calls to action at their final visible opacity, and SHALL limit animation to interaction feedback that respects reduced-motion preferences.

#### Scenario: Page loads before observers or effects
- **WHEN** the homepage or case-study route is captured immediately after server render
- **THEN** all meaningful content is visible without waiting for an intersection observer or mount effect

#### Scenario: Reduced motion is requested
- **WHEN** a visitor enables `prefers-reduced-motion: reduce`
- **THEN** smooth scrolling and non-essential transitions are disabled while interaction state remains understandable
