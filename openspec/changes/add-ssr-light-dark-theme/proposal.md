## Why

The portfolio is currently forced into dark mode at the document root, while its visual contract calls for equally intentional light and dark experiences that follow the visitor's system preference. The change must preserve server-rendered content, avoid theme flashes and hydration errors, and remove dark-only color assumptions before a public release.

## What Changes

- Add system-aware light and dark theme selection with a persistent visitor override.
- Apply the resolved theme before first paint without making portfolio content client-only or suppressing hydration errors below the document root.
- Add an accessible theme control with a layout-stable server fallback.
- Implement the approved Warm Paper + Graphite and Midnight Zinc palettes through shared semantic color tokens.
- Replace dark-only utility colors and root metadata across the homepage and case-study route with semantic, theme-safe styling.
- Remove opacity-gated entrance rendering so primary content remains visible in SSR output and when JavaScript or motion is unavailable.
- Validate both themes for contrast, focus visibility, keyboard use, system preference changes, persistence, responsive layouts, and hydration cleanliness.

## Capabilities

### New Capabilities

- `adaptive-theme`: System-default light/dark selection, persistent overrides, pre-paint application, SSR-safe theme UI, and browser color-scheme integration.
- `semantic-color-system`: Shared light/dark portfolio tokens and component-level requirements for contrast-safe, theme-independent surfaces, text, borders, states, and selection styling.

### Modified Capabilities

None. The repository has no existing OpenSpec capabilities.

## Impact

- Affects the root App Router layout and viewport configuration, global Tailwind/CSS variables, portfolio navigation and theme control, homepage sections, and the work case-study route.
- Adds `next-themes` as a runtime dependency, using the latest version compatible with the installed React 19 stack.
- Replaces hard-coded dark colors and reveal-only client behavior; no public URLs, content records, or external APIs change.
- Requires regression checks against Next.js 16.3 SSR/hydration behavior, production builds, responsive layouts, and WCAG 2.2 AA expectations.
