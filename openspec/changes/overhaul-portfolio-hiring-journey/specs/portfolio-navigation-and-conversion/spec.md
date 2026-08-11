## ADDED Requirements

### Requirement: Navigation reflects the reduced hiring journey
The primary homepage navigation SHALL expose Experience, Work, and Contact in page order, with the theme utility visually secondary and no links to removed Capabilities or Approach sections.

#### Scenario: Desktop navigation
- **WHEN** the homepage is viewed at desktop width
- **THEN** Experience, Work, and Contact are the only section links and each destination exists exactly once

#### Scenario: Mobile navigation
- **WHEN** the mobile navigation opens
- **THEN** it exposes the same three destinations in the same order, closes after selection, and preserves the separate theme utility

### Requirement: Hero actions have an explicit priority
The hero SHALL provide `View experience` as the primary action targeting `#experience`, `Read the KudosCourts case study` as the secondary action targeting `/work/kudoscourts`, and `Download résumé` as a lower-emphasis utility targeting the reviewed résumé.

#### Scenario: Primary action activation
- **WHEN** a visitor activates `View experience`
- **THEN** focus and scroll position arrive at the Experience section without a missing or mismatched anchor

#### Scenario: Secondary action activation
- **WHEN** a visitor activates `Read the KudosCourts case study`
- **THEN** Next.js navigation opens the published KudosCourts case-study route

#### Scenario: Résumé download
- **WHEN** a visitor activates `Download résumé`
- **THEN** the current public résumé PDF is requested with download semantics

### Requirement: The contact section provides one direct close
The Contact section SHALL use a short invitation specific to senior full-stack, applied-AI, and integration work, with email as the primary action and LinkedIn plus résumé as supporting utilities.

#### Scenario: Contact decision
- **WHEN** a qualified visitor reaches Contact
- **THEN** the most visually prominent action opens a pre-addressed email path and supporting actions do not compete at equal emphasis

### Requirement: Important controls have comfortable interaction targets
Navigation triggers, theme utilities, professional-profile links, hero actions, project proof links, and contact actions SHALL provide at least a 44×44px hit area where they are icon-only or primary mobile controls, while retaining compact visual styling.

#### Scenario: Mobile target audit
- **WHEN** interactive elements are measured at 390px
- **THEN** the mobile menu, theme trigger, icon-only social links, and primary actions meet or exceed a 44px target in both dimensions

#### Scenario: Keyboard navigation
- **WHEN** a visitor traverses the hero, navigation, project links, and contact actions by keyboard
- **THEN** focus follows DOM order, remains visible, and no action requires pointer hover to understand

### Requirement: Active navigation never replaces semantic orientation
Active-section styling SHALL reinforce the visitor's current location but SHALL not be the only indication of destination or page structure.

#### Scenario: Active-section script unavailable
- **WHEN** the active-section client behavior has not hydrated
- **THEN** all navigation labels and anchors remain visible, meaningful, and usable
