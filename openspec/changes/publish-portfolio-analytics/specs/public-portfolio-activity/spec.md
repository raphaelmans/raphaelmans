## ADDED Requirements

### Requirement: Portfolio activity remains a footer-level utility
The homepage SHALL place public portfolio activity after the Contact stage within the footer utility region. It MUST NOT become a primary homepage stage, navigation destination, hero signal, standalone dashboard, or interruption between hiring-evidence sections.

#### Scenario: Visitor scans the landing page
- **WHEN** the homepage renders with valid analytics data
- **THEN** the established `Hero → compact credibility → Experience → Selected Work → Recognition → Contact` sequence remains unchanged and activity appears only after Contact

### Requirement: The public summary exposes a bounded evidence set
When valid non-zero data is available, the component SHALL render the label `Portfolio activity`, the window `Last 30 days`, anonymous visitor and page-view totals, and up to three most-viewed approved content links. It MUST NOT render charts, trends, percentage changes, geographic or referrer breakdowns, provider controls, or fabricated values.

#### Scenario: Totals and ranked content are available
- **WHEN** the server provides valid activity with ranked public content
- **THEN** the summary renders both totals and no more than three canonical content links in descending page-view order

#### Scenario: Totals are available without ranked content
- **WHEN** the server provides valid non-zero totals but no eligible ranked content
- **THEN** the summary renders the totals without an empty `Most viewed` list

### Requirement: Labels describe anonymous estimates truthfully
The component SHALL identify the visitor figure as anonymous, define the 30-day measurement window, and provide concise accessible context that values come from aggregate privacy-preserving Vercel Web Analytics. It MUST NOT label the figures as named people, persistent unique users, realtime activity, recruiter views, or employer views.

#### Scenario: A visitor interprets the metrics
- **WHEN** the activity summary is read visually or by assistive technology
- **THEN** the measurement window, aggregate nature, and distinction between visitors and page views are understandable without implying personal identification

### Requirement: Unavailable analytics disappears cleanly
The component SHALL render no public activity region when configuration is missing, data is invalid or empty, or the provider is unavailable. Its loading fallback SHALL be empty, and omission MUST NOT leave a blank section, broken heading sequence, error message, cumulative layout shift, or failed primary page render.

#### Scenario: No valid activity can be loaded
- **WHEN** the analytics adapter returns the unavailable result
- **THEN** the homepage renders its complete hiring journey and footer without an analytics placeholder or provider error

### Requirement: Activity presentation is restrained and adaptive
The summary SHALL use existing semantic tokens, borders, typography, and spacing; remain visually subordinate to Contact; and preserve legibility in System, Light, and Dark themes at 390px and desktop widths. It MUST NOT use metric cards, equal-weight panels, animated counters, gradients, decorative charts, or color-only meaning.

#### Scenario: Summary renders across supported contexts
- **WHEN** the activity region is viewed at mobile and desktop widths in each supported theme
- **THEN** totals and links preserve one reading order, wrap without horizontal overflow, and remain subordinate to the primary contact action

### Requirement: Activity markup is semantic and operable
The component SHALL expose a named supplementary region, use semantic term/value or list relationships for metrics and ranked content, provide descriptive link names, and retain visible keyboard focus using the portfolio's existing focus treatment. Any ranked link target MUST meet the existing minimum interaction-target contract.

#### Scenario: Keyboard and screen-reader visitor reaches activity
- **WHEN** the visitor navigates through the footer utility region
- **THEN** the region has an accessible name, values are associated with their labels, ranked links identify their destinations, and focus remains visible

### Requirement: Public analytics behavior is mechanically verified
Automated coverage SHALL verify provider normalization, route allowlisting, privacy exclusions, deterministic ranking, missing-configuration behavior, component omission, visible aggregate rendering, placement after Contact, theme parity, responsive wrapping, and credential non-exposure using local fixtures rather than the live Vercel API.

#### Scenario: Release verification runs
- **WHEN** the analytics change is prepared for production
- **THEN** unit, integrity, build, route, browser, and React diagnostics pass without requiring live analytics credentials or network access
