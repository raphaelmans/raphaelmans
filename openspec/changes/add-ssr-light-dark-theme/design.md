## Context

The App Router root currently forces `class="dark"`, an inline dark `colorScheme`, and a single dark `themeColor`. Global variables contain generic shadcn defaults, while portfolio and case-study components bypass them with raw Zinc, white-alpha, black-alpha, and hex utilities. Several homepage sections also use a client-side `Reveal` wrapper whose initial opacity hides server-rendered content until an observer runs.

The approved Impeccable direction is “The Clear Signal”: a calm, evidence-led interface using Warm Paper + Graphite in light mode, Midnight Zinc in dark mode, and Signal Sky only for action or active information. The site must remain statically renderable, use Next.js 16.3 and React 19.2, meet WCAG 2.2 AA, and preserve the current content, routes, and narrow editorial composition.

The local Next.js 16.3 guide recommends changing the root theme attribute before paint and limiting `suppressHydrationWarning` to `<html>`. The current `next-themes` release is 0.4.6; its peer range includes React 19 and its App Router contract matches that guidance.

## Goals / Non-Goals

**Goals:**

- Follow the operating-system preference on first visit and allow persistent System, Light, and Dark selection.
- Apply the resolved class before first paint while keeping the root layout and portfolio content server-rendered.
- Give light and dark modes semantic parity, intentional contrast, visible focus, and calm visual hierarchy.
- Eliminate dark-only component colors and observer-dependent content visibility across the homepage and case-study route.
- Keep the theme control accessible, layout-stable during hydration, and usable at mobile target sizes.
- Verify production behavior without introducing a return of the high-memory development workflow.

**Non-Goals:**

- Rewriting portfolio claims, changing employer/project disclosure, or restructuring case-study content.
- Replacing Tailwind, shadcn primitives, typography, routing, or the existing data model.
- Adding additional color themes, account-based preferences, a server-side preference cookie, or a database.
- Making Open Graph images dynamically follow a visitor theme; social images remain a static brand presentation.
- Introducing decorative entrance animation, a generalized animation system, or broad visual redesign beyond theme-safe craft.

## Decisions

### 1. Use `next-themes` behind a narrow client provider

Add `next-themes` at the latest compatible release resolved during implementation (0.4.6 at design time). Create a small client `ThemeProvider` wrapper and keep `app/layout.tsx` a Server Component. Configure it with:

- `attribute="class"` so the existing Tailwind v4 `.dark` custom variant remains valid.
- `defaultTheme="system"` and `enableSystem` so first-time visitors inherit `prefers-color-scheme`.
- `enableColorScheme` so native controls receive the resolved scheme.
- `disableTransitionOnChange` so switching does not animate every tokenized property inconsistently.

`next-themes` owns the pre-paint script and the `theme` local-storage key. The implementation will not add a second custom theme script. The root `<html>` keeps font and structural classes but drops the forced `dark` class and inline scheme; it receives `suppressHydrationWarning` because the library mutates that one element before hydration.

Alternatives considered:

- A hand-written inline script duplicates storage, system-listener, tab-sync, and transition handling already covered by the dependency.
- Reading a theme cookie in the root layout would let the server know the override, but would opt the root into request-time behavior and sacrifice static prerendering for no user-facing benefit.
- Client-only rendering of the page avoids server uncertainty at the cost of SEO, accessibility, and visible content; it is prohibited.

### 2. Render a stable, three-option theme utility

Place a secondary 44×44px theme trigger in navigation. Its server and pre-mount output uses the same neutral trigger geometry and a theme-independent icon/label. After mount, the client may expose the selected state for System, Light, and Dark. Selection calls `setTheme`; choosing System retains system-following behavior, and the library synchronizes the preference across reloads and tabs.

The control uses a button and an accessible menu/radio pattern from primitives already in the repository, with a persistent accessible name, keyboard navigation, visible focus, and no color-only status. Theme-dependent labels, checked state, or icons must not be derived from `useTheme` before mount. A fixed placeholder prevents layout shift.

Alternatives considered:

- A two-state sun/moon toggle has no discoverable route back to System.
- Suppressing warnings on the control would hide a real mismatch rather than produce stable markup.
- Returning `null` before mount avoids the mismatch but shifts navigation; a dimensionally stable fallback is preferable.

### 3. Establish semantic token parity at the global boundary

`:root` is the light fallback and `.dark` overrides the same semantic roles. Components consume roles rather than raw theme values.

| Semantic role | Light | Dark |
| --- | --- | --- |
| canvas / foreground | `#f7f7f5` / `#1c1c1a` | `#09090b` / `#fafafa` |
| card / card foreground | `#ffffff` / `#1c1c1a` | `#18181b` / `#fafafa` |
| primary / primary foreground | `#0369a1` / `#ffffff` | `#38bdf8` / `#09090b` |
| secondary / secondary foreground | `#f0f0ed` / `#3f3f3b` | `#27272a` / `#f4f4f5` |
| muted / muted foreground | `#f3f3f0` / `#686864` | `#18181b` / `#a1a1aa` |
| accent / accent foreground | `#e7f5fb` / `#0c4a6e` | `#082f49` / `#7dd3fc` |
| border / input / ring | `#e2e2de` / `#d8d8d3` / `#0284c7` | `white 8%` / `white 12%` / `#38bdf8` |

The equivalent approved OKLCH values from the color-system source will be used in CSS. Existing semantic aliases such as `background`, `foreground`, `card`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, and `ring` remain the public component contract. Additional semantic roles may be added only when an existing role cannot express a real meaning, not to preserve raw Zinc names.

Selection, scrollbar, sticky navigation, hover, tags, project rows, evidence surfaces, and the case-study route migrate to these roles. Signal Sky follows the 90/9/1 rule and does not become generic decoration.

Alternatives considered:

- Pairing every raw class with a `dark:` class multiplies component-level decisions and makes future palette work brittle.
- Reusing the generic shadcn neutral palette fails the approved warm-paper and Midnight Zinc brand contract.

### 4. Keep all meaningful content visible in the initial render

Remove the `Reveal` opacity gate and its intersection-observer client boundary. Sections render at their final opacity in SSR HTML. Any retained motion is limited to short hover, focus, menu, or theme-transition feedback and obeys `prefers-reduced-motion`; content visibility never depends on motion support or JavaScript.

This also lets portfolio sections return to Server Components unless they have a genuine interaction. The navigation and theme utility remain isolated Client Components.

### 5. Use the Next.js `viewport` API for browser-level defaults

Export `viewport.themeColor` as light/dark media descriptors using `#f7f7f5` and `#09090b`, and set `viewport.colorScheme` to `"light dark"`. CSS and `next-themes` then reflect the resolved scheme for page content and native controls. This follows the installed Next.js 16.3 API and avoids deprecated metadata fields.

Media-based browser chrome follows the OS preference. Some browsers may continue to use that system value when a stored override differs; this is acceptable because the page and native controls still use the explicit theme, and avoiding a second pre-hydration script is the more reliable SSR boundary.

## Risks / Trade-offs

- [Risk] Theme values read from local storage are unknown during SSR. → Render identical pre-mount control markup, let CSS variables style the document, and read `useTheme` state only after mount.
- [Risk] `suppressHydrationWarning` can conceal unrelated problems if spread broadly. → Apply it only to `<html>` and treat every other hydration warning as a failure.
- [Risk] Raw colors can survive in less-visible states or the dynamic case-study route. → Run repository searches for theme-specific utilities and visually exercise every state in both themes.
- [Risk] Light mode can expose boundaries and hierarchy that looked acceptable on black. → Review the full page at mobile and desktop sizes, using surface tone and spacing before adding borders or shadows.
- [Risk] Global transition disabling briefly injects style during a switch. → Keep the library behavior scoped to the switch event and verify no persistent style node or layout shift remains.
- [Risk] A future strict CSP could block the dependency's inline pre-paint script. → There is no current CSP; if one is added, pass the request nonce through the provider rather than weakening the policy.
- [Risk] A third-party release could regress React 19 behavior. → Use the latest peer-compatible version, lock it with pnpm, and require production build plus browser hydration checks before acceptance.

## Migration Plan

1. Add the dependency and provider/theme-control primitives without changing page colors.
2. Replace root forced-dark behavior and publish dual-scheme viewport metadata.
3. Install the approved semantic token pairs in global CSS.
4. Migrate shared components, homepage sections, navigation states, and case-study states from raw colors to semantic roles.
5. Remove `Reveal` usage and delete the obsolete observer component after all imports are gone.
6. Verify first visit, stored overrides, System changes, reloads, keyboard use, reduced motion, mobile/desktop layouts, hydration logs, lint, and production build.

Rollback is a normal source revert plus dependency removal. No user data migration is required; a leftover `theme` local-storage value is inert if the provider is removed.

## Open Questions

None. The approved product, hierarchy, and color-system documents resolve the theme direction and interaction contract.
