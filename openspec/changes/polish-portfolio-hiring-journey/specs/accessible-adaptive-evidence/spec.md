## ADDED Requirements

### Requirement: Closed mobile navigation is absent from keyboard navigation
Mobile navigation destinations SHALL be focusable only while the menu is visibly open, and the trigger SHALL expose an accurate programmatic open/closed state.

#### Scenario: Keyboard traverses a closed menu
- **WHEN** the mobile navigation is closed and a keyboard user tabs through the header
- **THEN** focus moves from the visible header controls to the next visible page control without entering a hidden navigation destination

#### Scenario: Keyboard opens and closes the menu
- **WHEN** a keyboard user opens the menu, presses Escape, or activates a destination
- **THEN** the visual and programmatic menu state close together and focus returns predictably to the trigger or selected page destination

#### Scenario: Menu state is announced
- **WHEN** assistive technology encounters or activates the mobile menu trigger
- **THEN** the trigger exposes its accessible name, controlled region, and accurate expanded state

### Requirement: Evidence diagrams remain readable at narrow widths
Every inline evidence diagram SHALL preserve meaningful labels at a rendered size of at least 12px at 390px viewport width or SHALL provide a mobile-specific composition with a descriptive expanded-view action.

#### Scenario: Wide source diagram on mobile
- **WHEN** a diagram designed near 1000px wide cannot keep its labels readable within the mobile content width
- **THEN** the compact figure renders a reviewed mobile crop or composition and retains access to the complete full-size artifact

#### Scenario: Expanded diagram action
- **WHEN** a compact artifact provides a full-size view
- **THEN** the action has descriptive link text, visible keyboard focus, and an accessible explanation of what additional detail becomes inspectable

### Requirement: Evidence presentation has semantic theme parity
Figure canvases, borders, labels, captions, and interactive states SHALL consume semantic roles and remain legible in System, Light, and Dark themes without a hard-coded light-only surface.

#### Scenario: Dark-theme evidence figure
- **WHEN** an evidence figure renders in the dark theme
- **THEN** its canvas does not appear as an unintended bright island and its meaningful labels, boundaries, and caption meet the approved contrast requirements

#### Scenario: Theme changes while viewing evidence
- **WHEN** a visitor switches among System, Light, and Dark while a figure is visible
- **THEN** the figure hierarchy remains coherent without losing labels, state distinctions, or focus visibility

### Requirement: Primary controls provide comfortable interaction targets
Mobile menu and theme triggers, icon-only social links, hero actions, proof actions, and the primary contact action SHALL provide at least a 44×44px interaction area while compact inline links remain distinguishable and keyboard accessible.

#### Scenario: Mobile primary-action audit
- **WHEN** primary and icon-only controls are measured at 390px
- **THEN** each provides at least 44px in both dimensions without causing horizontal overflow

#### Scenario: Inline evidence link
- **WHEN** an inline text link is intentionally smaller than a button-like target
- **THEN** it remains visually identifiable, has adequate spacing from adjacent actions, and exposes a visible focus indicator

### Requirement: Repeated navigation can be bypassed
Every public portfolio route SHALL offer a keyboard-accessible skip path to the main content before repeated navigation controls.

#### Scenario: Keyboard user enters a route
- **WHEN** a keyboard user presses Tab from the top of the document
- **THEN** a visible-on-focus skip link can move focus to the route's main content

### Requirement: Responsive and theme regressions are browser-verifiable
The repository SHALL provide repeatable browser checks for mobile navigation focus behavior, key public routes, evidence readability, theme parity, primary hit targets, horizontal overflow, and console health.

#### Scenario: Portfolio browser suite
- **WHEN** the browser verification suite runs against the homepage and published case studies at 390px and desktop width in light and dark themes
- **THEN** required routes load, no hidden menu target receives focus, no horizontal overflow occurs, primary targets meet their size contract, and no unexpected console error is reported
