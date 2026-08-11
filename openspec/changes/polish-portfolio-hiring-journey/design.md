## Context

The portfolio already implements the structural overhaul, long-form case-study system, and SSR-safe light/dark theme described by three completed OpenSpec changes. The first post-implementation Impeccable critique provides the baseline for this follow-up: 24/40 overall, zero P0 findings, two P1 findings, and three P2 design findings.

The page succeeds at immediate identity and current-role clarity, uses evidence responsibly, and remains stable at 1440px and 390px without horizontal overflow. Its main failure is the transition from orientation to proof: the homepage exposes almost the full case-study argument for every project, producing a roughly 7,313px mobile document and making comparison difficult. The lead Ample News link is also unreachable, the closed mobile menu can retain invisible focus targets, evidence diagrams collapse below readable label sizes, and hard-coded figure colors break semantic theme parity.

The design is constrained by the locked alignment decisions:

- The homepage exists to earn a qualified interview quickly.
- Homepage proof leads with outcome/context, one owned decision, and one artifact.
- The visual direction is artifact-led technical editorial: Linear-like restraint and deliberate density with Lee Robinson-like identity clarity.

The saved critique at `.impeccable/critique/2026-08-10T12-02-42Z__app-page-tsx.md` remains the evidence record and future score baseline.

## Goals / Non-Goals

**Goals:**

- Eliminate the two P1 defects before aesthetic polish.
- Turn Selected Work into a fast comparison surface while preserving full evidence in case studies.
- Make every displayed proof destination structurally verifiable rather than relying on manual spot checks.
- Keep diagrams legible at 390px and coherent in System, Light, and Dark themes.
- Convert qualified interest with explicit role-fit language and one dominant email action.
- Make the portfolio visually ownable through evidence composition, disciplined typography, and project-specific artifact presentation.
- Establish browser and data-level regression checks that can be repeated after implementation and future content edits.

**Non-Goals:**

- Adding more projects, pages, blog content, testimonials, analytics, or programmatic SEO routes.
- Inventing confidential outcomes, usage metrics, screenshots, or commercial claims.
- Replacing the established Warm Paper / Midnight Zinc / Signal Sky semantic color system.
- Introducing a decorative illustration system, heavy animation, dashboard-style cards, or a broader site redesign unrelated to the critique.
- Rewriting the complete long-form case-study narratives except where required for route integrity, next actions, or moving detail off the homepage.

## Decisions

### 1. Treat published proof as a validated content graph

Homepage project data, case-study publication data, generated static parameters, sitemap entries, and artifact files SHALL agree on the same reviewed public set. A repository validation command will fail when a homepage case-study link lacks a published record/static route, when a required artifact path is missing, or when a withdrawn study remains linked from a public index.

This is preferred over a browser-only link crawl because it catches mismatches before a server is running and identifies the underlying data inconsistency. A small live-route smoke test will still confirm that generated public destinations return successfully.

### 2. Encode a compact homepage proof model separately from long-form evidence

Each featured project will expose a deliberately small homepage projection: direct context or bounded outcome, one attributable decision, one artifact, and one primary action. Ownership boundaries remain present within the context/decision language for employer work, but the dedicated Boundary paragraph, complete technology inventory, and detailed caption move to the case study.

The shared source may retain richer fields for case studies, but the homepage renderer will not consume every available field merely because it exists. This avoids using CSS to hide structural overproduction and keeps the server-rendered document concise.

### 3. Curate project order by interview value and proof readiness

The first project must be complete, reachable, current enough to discuss, and representative of senior product judgment. With the present records, KudosCourts is the default lead because it is live, independently owned, cross-platform, and has a working case study and product destination. CravingsPH follows as transaction/realtime correctness evidence. Ample News can remain third only when its published route and approved artifacts pass validation; otherwise its homepage case-study action is withdrawn until repaired.

This replaces the previous Ample-first ordering. Employer prestige alone is not sufficient to outrank a stronger verifiable artifact.

### 4. Remove closed mobile navigation from the interaction tree

The mobile menu panel will be conditionally mounted only while open, rather than remaining focusable behind `max-height: 0` and `opacity: 0`. The trigger retains `aria-expanded` and `aria-controls`; opening moves focus into a predictable menu sequence only when appropriate, Escape closes the panel, destination activation closes it, and closing restores focus to the trigger when focus has not moved to page content.

Conditional mounting is preferred over managing `tabIndex` on every descendant because it makes visual, accessibility, and interaction state agree by construction.

### 5. Give evidence artifacts responsive variants and semantic surfaces

Artifact metadata will support either a responsive/mobile source or an explicit expanded presentation when the original diagram cannot remain readable inline. At 390px, meaningful diagram labels must render at 12px or larger; otherwise the compact figure uses a mobile crop/composition and keeps the full-size diagram available through a descriptive action.

Figure canvas, borders, labels, and captions will consume semantic tokens in both themes. Hard-coded light surfaces are removed from shared rendering. Alt text and captions continue to explain what the artifact proves so expanded visual inspection is not the only way to understand it.

### 6. Build identity from evidence hierarchy, not decoration

The existing fonts and calm reading rail remain. Distinctiveness comes from project-specific artifact framing, stronger editorial contrast between summary and evidence, and less repetition of pills, uppercase mono lines, and technology tags. Mono type remains limited to terse identifiers. Undocumented 13px and 28px values will either map to named tokens or move to existing documented steps.

Side-stripe accents greater than 1px are removed from experience and case-study callouts. Full boundaries, spacing, quiet tonal surfaces, or semantic headings replace them. The home identity uses a recognisable Raphael label rather than relying only on `RM`, and the footer explains the relationship of `rethndr.com` if it remains.

### 7. Make hiring conversion literal

Hero and contact copy will state the target senior/staff product-engineering conversation using factual availability language. Email remains the single primary closing action; résumé and professional networks remain lower-emphasis utilities. Metaphors such as “the difficult middle” may survive only as supporting language after the literal invitation is clear.

### 8. Verify in layers

The implementation will use four verification layers:

1. Data/static validation for publication, route, artifact, and content-projection integrity.
2. TypeScript, lint, and production build checks.
3. Browser regression coverage for keyboard navigation, internal routes, hit targets, light/dark theme parity, and 390px/desktop layouts. A focused Playwright setup may be added as a development-only dependency because the repository currently lacks a browser test runner.
4. A repeat Impeccable critique after fixes, using the 24/40 snapshot as the comparison baseline.

## Risks / Trade-offs

- **[Risk] Distillation removes valuable technical nuance** → Keep the complete reviewed evidence in case studies and verify that each homepage row still communicates context, attribution, decision, and inspectable proof without reading tags.
- **[Risk] KudosCourts-first ordering underrepresents employer work** → Preserve employer evidence prominently in Experience and keep Ample News in Selected Work once its route is trustworthy.
- **[Risk] Diagram variants increase asset maintenance** → Add responsive metadata only where label-size validation shows it is needed; do not duplicate artifacts that remain legible with one source.
- **[Risk] Explicit availability becomes stale** → Store the phrase in one reviewed data location and avoid dates or commitments that require frequent updates unless a review reminder exists.
- **[Risk] A browser test dependency adds install weight** → Keep the suite focused, Chromium-only by default, and outside the dev-server process so it does not reintroduce the prior memory issue.
- **[Risk] Visual distinctiveness becomes decorative** → Reject motifs that do not improve evidence comprehension, project comparison, orientation, or action clarity.

## Migration Plan

1. Add integrity validation and either restore or withdraw the Ample News route/action.
2. Correct mobile navigation semantics and keyboard behavior.
3. Introduce the compact homepage project projection and reorder the curated projects.
4. Add responsive artifact metadata/variants and semantic figure tokens.
5. Refine hero/contact language, identity labels, typography, and repetitive treatments.
6. Add browser regression coverage, run lint/build/checks, and manually review both themes at 390px and desktop width.
7. Re-run `/impeccable critique` and compare against the 24/40 baseline.

Rollback is content- and component-local: preserve the long-form case-study data throughout, revert the homepage projection/order independently if necessary, and retain full-size source artifacts even when mobile variants are added.

## Open Questions

No product-direction questions remain before implementation. Exact availability wording must be factual at implementation time, and any new mobile artifact variant must pass the existing confidentiality review before publication.

## Post-Implementation Critique and Follow-up

The final dual-agent Impeccable critique scored `app/page.tsx` **34/40 (Good)**, up from the **24/40** baseline. The final report records **zero P0** and **zero P1** findings. During the critique loop, the implementation also resolved a focused skip link positioned outside the viewport, a translucent first frame when opening mobile navigation, official-title ambiguity across visible and machine-readable identity, and undersized standalone Recognition targets.

The archived evidence is `.impeccable/critique/2026-08-10T13-17-03Z__app-page-tsx.md`. The final deterministic CLI scan returned zero source-level findings. Browser overlay inspection returned thirteen low-severity desktop prose-measure advisories plus one accepted Inter false positive; it reported no console errors, no console warnings, and no horizontal overflow at desktop or 390px.

The following findings are intentionally retained as non-blocking follow-up rather than reopening this acceptance scope:

1. **P2 — prose measure:** tighten or narrow thirteen experience and decision paragraphs toward the documented 65–75ch measure without weakening attribution or technical precision (`/impeccable typeset`).
2. **P2 — observable consequence:** add one short, disclosure-safe result or verification line per project so operational value is visible before opening a case study (`/impeccable clarify`).
3. **P3 — repeated mobile proof rhythm:** vary editorial compression across the three projects while preserving their approved evidence and primary paths (`/impeccable distill`).

Final acceptance evidence: portfolio integrity passed for three case studies, three featured projects, and four artifacts; TypeScript and lint passed; React Doctor reported no issues; the production build generated all three public case studies; four Chromium tests passed; and the live-route smoke check passed all eighteen rendered destinations.
