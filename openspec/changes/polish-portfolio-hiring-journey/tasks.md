## 1. P1 Proof Integrity

- [x] 1.1 Read the relevant Next.js 16 route-generation, dynamic-parameter, Link, Image, and metadata guides from `node_modules/next/dist/docs/` before changing framework code.
- [x] 1.2 Trace why `/work/ample-news` returns not found despite its homepage action and resolve the mismatch by restoring a complete reviewed published record or withdrawing the action until the publication gate passes.
- [x] 1.3 Make featured-work links, published case-study records, generated static parameters, sitemap entries, and machine-readable portfolio indexes derive from or validate against one reviewed public set.
- [x] 1.4 Add a deterministic repository command that fails with actionable project/route details when a homepage case-study destination is unpublished, ungenerated, or otherwise invalid.
- [x] 1.5 Extend integrity validation to check rendered artifact paths, required metadata, responsive presentation data, and publication/index synchronization.
- [x] 1.6 Add a live-route smoke check confirming the homepage, résumé, every rendered internal case-study action, and every rendered public artifact return successfully.

## 2. P1 Navigation and Keyboard Safety

- [x] 2.1 Refactor the mobile menu so its destinations are mounted and focusable only while the menu is visibly open.
- [x] 2.2 Implement Escape handling, destination-close behavior, accurate `aria-expanded`/`aria-controls`, and predictable focus restoration to the menu trigger.
- [x] 2.3 Verify active-section behavior has no incorrect default at the hero and that every visible navigation destination maps to exactly one valid section.
- [x] 2.4 Add a visible-on-focus skip link and stable main-content target to the homepage and every public case-study route.
- [x] 2.5 Audit mobile menu, theme, social, hero, proof, and contact controls at 390px; provide at least 44×44px targets for primary and icon-only controls without introducing overflow.

## 3. Concise Qualified-Interview Brief

- [x] 3.1 Add an explicit compact homepage projection for featured projects containing direct context or bounded outcome, one attributable consequential decision, one proof artifact, and one primary action.
- [x] 3.2 Refactor `ProjectItem` so it renders only the four approved proof layers and no longer repeats dedicated Boundary copy, full technology inventories, or case-study-depth captions on the homepage.
- [x] 3.3 Verify long-form case studies retain the complete reviewed attribution, constraints, decisions, reliability evidence, limitations, captions, and technology details removed from homepage rows.
- [x] 3.4 Reorder the current reviewed set to lead with KudosCourts, followed by CravingsPH, with Ample News third only when its displayed destinations pass proof-integrity validation.
- [x] 3.5 Rewrite hero supporting copy and action hierarchy so identity, current role, senior/staff product-engineering fit, and the primary evaluation path dominate social, résumé, and other utilities in the opening viewport.
- [x] 3.6 Rewrite Contact with a factual role-fit invitation and email as the singular primary close; keep résumé and professional networks subordinate and make any retained “difficult middle” language explanatory rather than essential.
- [x] 3.7 Review the complete homepage at desktop and 390px to confirm each section advances the hiring argument without repeating case-study depth or broad capability claims.

## 4. Adaptive Evidence and Theme Parity

- [x] 4.1 Extend visual-artifact metadata and validation to support a reviewed mobile source/composition or explicit expanded presentation when the full diagram cannot remain legible inline.
- [x] 4.2 Create only the mobile diagram variants required to keep meaningful labels at least 12px at 390px, preserving the approved full-size source and confidentiality boundaries.
- [x] 4.3 Refactor `EvidenceFigure` to select the responsive presentation, preserve intrinsic dimensions, expose descriptive full-size access, and keep surrounding alt/caption evidence understandable without visual inspection.
- [x] 4.4 Replace the hard-coded evidence canvas with semantic figure tokens and verify canvas, boundaries, labels, captions, links, and focus states in System, Light, and Dark themes.
- [x] 4.5 Verify every homepage and case-study artifact at 390px and desktop width for readable labels, no horizontal overflow, no layout shift, and no unintended bright island in dark mode.

## 5. Artifact-Led Editorial Identity

- [x] 5.1 Reconcile the 13px caption and 28px section heading with documented type tokens or existing approved steps, and document the final display, heading, body, caption, label, and metadata hierarchy.
- [x] 5.2 Convert long uppercase monospace project metadata to readable sentence-case typography and reserve mono/uppercase treatments for terse identifiers.
- [x] 5.3 Reduce mechanically repeated status pills, technology tags, and identical project rhythms while preserving genuinely useful comparison signals.
- [x] 5.4 Remove every left/right accent border thicker than 1px from employer-project groupings and case-study callouts, replacing each with spacing, a full semantic boundary, heading structure, or quiet tonal surface.
- [x] 5.5 Replace the initials-only home identity with a recognisable Raphael label and explain the relationship of `rethndr.com` in the footer or remove the unexplained reference.
- [x] 5.6 Review Recognition's navigation omission deliberately: add a compact destination only if it improves the qualified-interview scan without competing with Experience, Work, and Contact, and record the final rationale in `DESIGN.md`.
- [x] 5.7 Perform an anti-template review confirming that artifacts—not decorative cards, generic gradients, excessive pills, or ornamental indices—carry the distinctive visual identity.

## 6. Regression Coverage and Acceptance

- [x] 6.1 Add a focused Chromium browser-test setup as a development-only dependency if the existing toolchain cannot provide repeatable keyboard, viewport, and theme assertions; keep it outside the normal dev-server process.
- [x] 6.2 Add browser tests for closed/open mobile-menu focus order, Escape behavior, focus restoration, skip links, visible focus, and primary/icon-only hit-target dimensions.
- [x] 6.3 Add browser tests for the homepage and every published case study at 390px and desktop width in light and dark themes, covering route success, horizontal overflow, evidence presentation, and unexpected console errors.
- [x] 6.4 Add content assertions for the compact four-layer project structure, KudosCourts-first ordering, explicit hiring invitation, one dominant contact action, recognisable site identity, and subordinate technology metadata.
- [x] 6.5 Run the integrity command, TypeScript validation, lint, production build, and browser suite; fix every failure without weakening the specifications.
- [x] 6.6 Manually review the production build in System, Light, and Dark themes at 390px and desktop width, including keyboard-only traversal and every primary proof path.
- [x] 6.7 Re-run `/impeccable critique` against `app/page.tsx`, compare with the 24/40 baseline, and record the new score plus any remaining P0/P1 findings before archiving this change. Final: 34/40, zero P0, zero P1.
