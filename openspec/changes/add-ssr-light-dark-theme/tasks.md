## 1. Theme Foundation

- [x] 1.1 Re-read the installed Next.js 16.3 theme/hydration and viewport guides, resolve the current latest `next-themes` release, verify its React 19 peer range, and add it with pnpm so `package.json` and the lockfile agree.
- [x] 1.2 Add a narrow client `ThemeProvider` wrapper configured for class-based System/Light/Dark behavior, native color-scheme support, persistent storage, and transition suppression while keeping the root layout server-rendered.
- [x] 1.3 Update the root layout to remove forced dark classes and inline dark scheme, add `suppressHydrationWarning` only to `<html>`, wrap page content with the provider, and retain font and structural classes.
- [x] 1.4 Replace the single dark viewport values with light/dark media-aware theme colors and a `light dark` color-scheme declaration using the Next.js viewport API.

## 2. Semantic Color System

- [x] 2.1 Replace the generic light variables in `globals.css` with the approved Warm Paper + Graphite OKLCH values and align every existing semantic role.
- [x] 2.2 Replace the current dark variables with the approved Midnight Zinc + Signal Sky OKLCH values, including 8% border, 12% input, and accessible muted foreground roles.
- [x] 2.3 Tokenize selection, scrollbar, focus, hover, sticky-canvas, and other global states so they resolve intentionally in both themes and respect reduced motion.
- [x] 2.4 Check the normative text and control color pairs against WCAG 2.2 AA contrast thresholds and adjust only through approved semantic roles.

## 3. Accessible Theme Utility

- [x] 3.1 Build a layout-stable 44×44px navigation theme trigger and accessible System/Light/Dark menu whose server markup does not depend on unresolved theme state.
- [x] 3.2 Connect mounted selected-state rendering to `next-themes`, including explicit Light/Dark persistence, returning to System, keyboard operation, focus visibility, and non-color selection feedback.
- [x] 3.3 Integrate the utility into desktop and mobile navigation without weakening the primary hiring journey, overflowing at 390px, or introducing an additional full-page client boundary.

## 4. Theme-Safe Portfolio Migration

- [x] 4.1 Migrate navigation, hero, proof, experience, selected work, approach/services, recognition, contact, and footer components from raw Zinc/white/black/hex utilities to semantic roles.
- [x] 4.2 Migrate shared portfolio rows, project items, tags, social links, buttons, badges, surfaces, and every hover/focus/active/open state to semantic roles.
- [x] 4.3 Migrate the dynamic work case-study route, including sticky navigation, metadata, evidence steps, prose hierarchy, stack, return links, and footer, with deliberate light and dark surfaces.
- [x] 4.4 Remove all `Reveal` wrappers and observer-based opacity gating, delete the obsolete component after imports are gone, and return sections to Server Components wherever no real interaction remains.
- [x] 4.5 Run a source audit that confirms raw theme-specific utilities remain only in approved global token definitions or static social-image rendering, and resolve every unintended match.

## 5. Behavioral and Visual Verification

- [x] 5.1 Verify first visits for light and dark system preferences, live system changes while System is selected, explicit Light/Dark overrides, returning to System, reload persistence, and same-origin tab synchronization.
- [x] 5.2 Verify production-mode hard loads and route transitions with stored overrides show no opposite-theme flash, descendant hydration warning, cumulative layout shift from the theme control, or loss of server-rendered content.
- [x] 5.3 Verify the homepage and a valid case study at 390px and desktop widths in both themes, including mobile navigation, long text, surface boundaries, selection, hover, focus, and theme-menu states.
- [x] 5.4 Verify keyboard-only use, accessible names and selected-state announcements, 44px touch targets, WCAG 2.2 AA text/focus contrast, reduced motion, and meaningful content with JavaScript disabled.
- [x] 5.5 Run the repository lint, production build, React diagnostics, and relevant regression checks; fix introduced issues and record any unrelated pre-existing warnings separately.
