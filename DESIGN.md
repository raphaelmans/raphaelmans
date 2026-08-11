---
name: Raphael Mansueto Portfolio
description: A calm, evidence-led career-proof hub for senior full-stack and applied-AI work.
colors:
  signal-300: "#7dd3fc"
  signal-400: "#38bdf8"
  signal-600: "#0284c7"
  signal-700: "#0369a1"
  signal-900: "#0c4a6e"
  signal-950: "#082f49"
  signal-soft: "#e7f5fb"
  midnight-950: "#09090b"
  midnight-900: "#18181b"
  midnight-800: "#27272a"
  midnight-500: "#71717a"
  midnight-400: "#a1a1aa"
  midnight-100: "#f4f4f5"
  midnight-50: "#fafafa"
  paper-canvas: "#f7f7f5"
  paper-surface: "#ffffff"
  paper-secondary: "#f0f0ed"
  paper-muted: "#f3f3f0"
  paper-border: "#e2e2de"
  paper-input: "#d8d8d3"
  graphite-primary: "#1c1c1a"
  graphite-secondary: "#3f3f3b"
  graphite-muted: "#686864"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.125rem)"
    fontWeight: 600
    lineHeight: 1.06
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  sectionHeading:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.06em"
rounded:
  tag: "4px"
  control: "8px"
  surface: "10px"
  pill: "9999px"
spacing:
  hairline: "0.5px"
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "76px"
components:
  button-primary-dark:
    backgroundColor: "{colors.signal-400}"
    textColor: "{colors.midnight-950}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  button-primary-light:
    backgroundColor: "{colors.signal-700}"
    textColor: "{colors.paper-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  button-secondary-dark:
    backgroundColor: "{colors.midnight-900}"
    textColor: "{colors.midnight-100}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  button-secondary-light:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.graphite-secondary}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    padding: "10px 16px"
    height: "40px"
  tag-signal-dark:
    backgroundColor: "{colors.signal-900}"
    textColor: "{colors.signal-300}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "3px 8px"
  text-link-dark:
    backgroundColor: "{colors.midnight-950}"
    textColor: "{colors.signal-400}"
    typography: "{typography.body}"
    rounded: "{rounded.tag}"
    padding: "8px 4px"
  navigation-dark:
    backgroundColor: "{colors.midnight-950}"
    textColor: "{colors.midnight-400}"
    typography: "{typography.label}"
    padding: "0 24px"
    height: "64px"
  evidence-row-dark:
    backgroundColor: "{colors.midnight-950}"
    textColor: "{colors.midnight-50}"
    rounded: "{rounded.surface}"
    padding: "16px"
  proof-line-dark:
    backgroundColor: "{colors.midnight-900}"
    textColor: "{colors.midnight-400}"
    typography: "{typography.label}"
    rounded: "{rounded.surface}"
    padding: "12px 16px"
---

# Design System: Raphael Mansueto Portfolio

## 1. Overview

**Creative North Star: "The Clear Signal"**

The system turns dense engineering experience into decisive evidence. It should feel like a carefully prepared technical briefing: calm enough to scan quickly, precise enough to reward scrutiny, and confident without advertising theatrics. The opening viewport resolves identity, specialty, credibility, and the next action; later sections deepen the case without repeating it.

The composition is narrow and text-led: a 740px homepage reading column, an 860px case-study column, 24px page gutters, and varied vertical rhythm anchored by a 76px section interval. Content remains the primary visual material. Signal Sky marks action and active information, while neutral contrast establishes hierarchy. The approved system pairs Midnight Zinc in dark mode with Warm Paper and Graphite Ink in light mode.

This document defines the intended system. The implementation uses `next-themes` with class-based SSR-safe system detection, a persistent visitor override, semantic CSS-variable parity, and no theme-dependent content tree before hydration. Evidence diagrams use reviewed mobile compositions and a controlled luminance-preserving theme treatment rather than a light-only canvas.

The interface explicitly rejects the look of a SaaS dashboard, a heavily animated showcase, and a generic developer template assembled from metric cards, repeated uppercase labels, or technology inventories.

**Key Characteristics:**

- Evidence-led hierarchy with one clear action per decision point.
- Restrained 90/9/1 color balance: neutral structure, selective Signal Sky, semantic status color only when needed.
- Compact, readable typography with mono reserved for metadata and technical labels.
- Flat, quiet surfaces separated by tone, spacing, and hairline borders.
- Essential content visible immediately, with motion limited to responsive state feedback.
- Light and dark modes that share semantic roles without mechanically mirroring neutral colors.

## 2. Colors

Signal Sky is the single chromatic voice across two distinct neutral environments. The frontmatter is the normative sRGB token set; implementation may use the equivalent approved OKLCH values from the project color-system source.

### Primary

- **Signal Sky:** `signal-400` is the dark-theme primary action, link, active-navigation, and focus color. `signal-700` performs the same role in the light theme so white labels remain accessible. `signal-300` is a dark-theme hover or foreground on deep signal surfaces; `signal-900` and `signal-950` provide restrained emphasis surfaces. `signal-soft` is the light-theme selected or highlighted surface.

### Neutral

- **Midnight Zinc:** `midnight-950` is the dark canvas; `midnight-900` and `midnight-800` provide raised and secondary surfaces. `midnight-50` is primary text, `midnight-400` is sustained secondary copy, and `midnight-500` is the absolute floor for meaningful normal-sized text.
- **Warm Paper:** `paper-canvas` recedes behind content; `paper-surface` brings proof forward. `paper-secondary`, `paper-muted`, `paper-border`, and `paper-input` create quiet structure without gray-boxing every section.
- **Graphite Ink:** `graphite-primary` is light-theme primary text, `graphite-secondary` supports body copy and icons, and `graphite-muted` is the lowest meaningful metadata tone.

### Named Rules

**The Clear Signal Rule.** Signal Sky means “pay attention or act.” It identifies the primary action, links, active navigation, keyboard focus, and genuinely selected information. It never decorates generic surfaces or long prose.

**The 90/9/1 Rule.** Approximately 90% of a surface is neutral, 9% may carry Signal Sky, and 1% is reserved for real semantic status feedback. This is a restraint doctrine, not a pixel-count exercise.

**The Contrast Floor Rule.** Meaningful normal text must meet WCAG 2.2 AA in both themes. Zinc 600 and Zinc 700 are forbidden for meaningful text on Midnight Zinc; use `midnight-500` or stronger.

**The Semantic Parity Rule.** Components consume background/foreground roles such as `primary` and `primary-foreground`. Dark and light themes may use different raw values, but a role's meaning never changes.

## 3. Typography

**Display Font:** Inter with system-ui fallback

**Body Font:** Inter with system-ui fallback
**Label/Mono Font:** Geist Mono with ui-monospace fallback

**Character:** Inter keeps the hiring case direct and familiar without becoming decorative; weight, scale, and line-height carry the hierarchy. Geist Mono is a small technical annotation voice, not the page's personality costume.

### Hierarchy

- **Display** (600, 36–50px fluid range, 1.06 line-height): hero and case-study headlines only. Balance the line and never tighten tracking below -0.04em.
- **Headline** (500, 24px, 1.2 line-height): major case-study and closing-action headings.
- **Section heading** (500, 24px, 1.2 line-height): homepage argument shifts. The former 28px exception is retired.
- **Title** (500, 16px, 1.3 line-height): roles, projects, capabilities, and compact proof names.
- **Body** (400, 15–18px, 1.65–1.8 line-height): narrative and evidence. Limit sustained prose to roughly 65–72 characters per line and use pretty wrapping.
- **Caption** (400, 14px, 1.65 line-height): what a proof artifact demonstrates and how to inspect it at full size. The former 13px exception is retired.
- **Label** (400–500, 10–12px, 0.06em maximum default tracking): dates, statuses, metadata, and short technical identifiers. Uppercase is allowed only for truly compact metadata—not every section heading.

### Named Rules

**The Evidence Voice Rule.** Prose states scope, ownership, constraints, decisions, and outcomes. Technology names support that argument; they never replace it.

**The Mono Ration Rule.** Geist Mono is restricted to metadata, dates, status, and terse technical labels. If an entire section's identity depends on mono uppercase, the hierarchy is too weak.

**The Natural Heading Rule.** Section headings use direct descriptive language and varied scale. Repeated tiny uppercase tracked eyebrows are prohibited as page scaffolding.

## 4. Elevation

The portfolio is flat and tonally layered by default. Depth comes from canvas/surface contrast, 0.5–1px borders, spacing, and temporary state changes—not decorative drop shadows. Sticky navigation may use restrained backdrop blur because it protects readability while content moves underneath; blur is functional there, not a glassmorphism motif.

### Named Rules

**The Flat-by-Default Rule.** Surfaces rest in the page rather than float above it. If a card needs a shadow to be understood, its hierarchy, spacing, or boundary is unresolved.

**The Earned Surface Rule.** A container receives a surface and border only when it groups evidence, creates a control boundary, or distinguishes an actionable closing area. Never box prose by reflex.

**The Functional Blur Rule.** Backdrop blur is allowed only on sticky navigation or another moving overlap where it materially preserves legibility.

## 5. Components

Components are refined and restrained: compact in appearance, comfortable in interaction, gently curved, and visibly keyboard-usable. The implementation contract is semantic CSS variables mapped through Tailwind v4; raw theme-specific utilities are migration targets.

### Buttons

- **Shape:** gently curved control corners (`control`, 8px) with a minimum 40px visual height; primary mobile and icon-only targets must provide at least a 44×44px hit area.
- **Primary:** dark mode uses `signal-400` with `midnight-950`; light mode uses `signal-700` with `paper-surface`. Standard padding is 10px 16px, 14px text, and medium weight.
- **Hover / Focus:** hover moves one tonal step without changing meaning. Focus uses a visible 2–3px Signal Sky ring with adequate offset from the canvas. State transitions run 150–200ms and use an ease-out curve; no bounce or layout animation.
- **Secondary:** a quiet surface, semantic border, and strong secondary text. It supports the main action and never competes through equal chroma.
- **Text link:** direct, underlined on focus where appropriate, and given a comfortable hit area even when its visual footprint remains compact.

### Chips

- **Style:** technical tags use a 4px radius, 3px 8px padding, 12px Geist Mono, and quiet semantic surfaces. Signal styling is reserved for a small number of tags that carry actual emphasis.
- **State:** status pills may use a full radius, but “Current,” selected, success, warning, and destructive states must remain semantically distinct. Signal Sky does not mean success.

### Cards / Containers

- **Corner Style:** gently curved surfaces (`surface`, 10px); inner tags use 4px and controls use 8px.
- **Background:** transparent by default. Grouped proof may use `card`; highlighted calls to action may use the appropriate accent surface.
- **Shadow Strategy:** none at rest; rely on the Elevation rules.
- **Border:** quiet 0.5–1px semantic borders. Colored side stripes are forbidden.
- **Internal Padding:** 16px for compact evidence, 24–32px for major grouped proof or closing calls to action.

### Evidence Rows

- Experience and selected-work entries are editorial rows, not standalone marketing cards. Their hierarchy is role/project, scope, personal ownership, consequential decision, inspectable proof, then technology metadata.
- Hover may add a barely visible surface and border shift, but the row must remain understandable and complete at rest.
- Earlier experience compresses; current and most relevant evidence receives greater narrative depth.

### Navigation

- Desktop navigation is a quiet 64px bar within the 740px reading column. Active state uses Signal Sky; inactive links use the accessible muted text role.
- On scroll, navigation may gain a semantic canvas with high opacity, a hairline border, and 12px backdrop blur.
- Mobile navigation uses a 44×44px trigger and a clear open/closed accessible state. Links remain direct anchors into the hiring journey.
- Recognition intentionally remains outside primary navigation. It is supporting third-party evidence after Selected Work, while Experience, Work, and Contact remain the three decision-driving destinations for the qualified-interview journey.
- The future theme control lives in navigation as a secondary utility. `next-themes` must use `attribute="class"`, `defaultTheme="system"`, `enableSystem`, and a persistent override. The root `<html>` uses `suppressHydrationWarning`; theme-specific interactive content renders only after mount, while CSS-variable theming remains SSR-safe.

### Proof Line

- The four proof signals become one quiet inline row or sentence rather than a metric-cell dashboard. Their job is recognition, not spectacle.
- On narrow screens, proof may wrap naturally with separators that preserve reading order; it must not turn into a grid of pseudo-analytics.

### Motion

- Essential content is visible in server-rendered HTML and in the initial paint. Scroll observers must never control its opacity.
- Motion is limited to hover, focus, active navigation, menu state, and theme transition feedback. `prefers-reduced-motion: reduce` disables non-essential movement and smooth scrolling.
- Theme changes may suppress global transitions briefly to avoid a color-sweep flash. They must not animate dozens of individual color properties.

## 6. Do's and Don'ts

### Do:

- **Do** make identity, specialty, professional credibility, and the next action understandable within the opening viewport.
- **Do** preserve a 740px homepage reading column, an 860px case-study column, 24px gutters, and varied vertical rhythm around the 76px section cadence.
- **Do** use semantic theme roles for every foreground/background pair and test default, hover, focus-visible, active, selected, disabled, and destructive states in both themes.
- **Do** follow system preference by default and provide a persistent light/dark override through an SSR-safe `next-themes` provider.
- **Do** keep meaningful text at or above the approved contrast floor and maintain visible keyboard focus and comfortable touch targets.
- **Do** spend visual complexity on inspectable evidence: screenshots, sanitized diagrams, case-study structure, ownership, constraints, and decisions.
- **Do** keep essential content visible without JavaScript-triggered entrance effects.

### Don't:

- **Don't** make the portfolio resemble a SaaS dashboard, including metric-cell proof strips, identical card grids, or decorative analytics patterns.
- **Don't** build a heavily animated showcase. Scroll-triggered opacity gates, uniform section reveals, bounce, elastic motion, and ornamental parallax are prohibited.
- **Don't** use a generic developer template assembled from repeated uppercase labels, numbered section scaffolds, and technology inventories.
- **Don't** use Signal Sky for every heading, every technology tag, generic card backgrounds, long prose, or semantic success/warning/error states.
- **Don't** use raw Zinc 600 or Zinc 700 for meaningful normal-sized text on the dark canvas.
- **Don't** maintain competing `primary`, `accent`, and `accent-sky` concepts. Migrate components to the semantic contract.
- **Don't** render a different server and client content tree based on the active theme. Theme variation belongs in CSS variables until the mounted state is known.
- **Don't** use gradient text, decorative glassmorphism, colored side-stripe borders, or shadows to compensate for weak hierarchy.
