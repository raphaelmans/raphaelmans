## Context

The current portfolio derives published project order and image artifacts from shared registries, renders SVG evidence through `next/image`, and maintains separate desktop, mobile, and compact-mobile sources. That system made the first evidence pass testable, but it now imposes asset duplication, image-specific dark-mode inversion, full-size-image actions, and identical diagram slots across projects. It also prevents evidence text from behaving like normal responsive document content.

The latest design review exposed two adjacent editorial problems. The hero identity line reads like an employment record rather than recruiter-facing positioning, while the anonymized Vectle summary leads with LangGraph and UI mechanics rather than the product outcome. The Experience wrapper also combines `border-y` with a first child that removes top padding, which causes the top rule to collide visually with the first role row.

This change is constrained by existing publication governance: Vectle remains anonymized, approved technical claims must not be expanded into unverified outcomes, and the old SVG URLs must not break during the migration. It also preserves the established SSR-safe semantic theme and the full case-study disclosure record.

## Goals / Non-Goals

**Goals:**

- Use established hiring language in the hero while keeping the official current title factual in Experience and structured data.
- Describe the anonymized campaign workflow as customizable, feedback-refined product behavior with a human decision gate.
- Remove negative or defensive solo framing without weakening concrete ownership evidence.
- Rank public work as KudosCourts, Ample News, then CravingsPH from one manifest.
- Replace active image diagrams with simplified, selectable, responsive HTML evidence.
- Vary homepage proof depth so KudosCourts does not render a diagram merely to satisfy a template.
- Repair divider rhythm across homepage and case studies and add geometry-based regression coverage.
- Preserve direct access to existing SVG URLs during a compatibility period.

**Non-Goals:**

- Publishing the Vectle name or adding unverified campaign outcomes, adoption, time savings, or performance metrics.
- Rewriting the complete case-study narratives or changing the approved confidentiality boundaries.
- Introducing a canvas/SVG drawing library, animation framework, diagram DSL dependency, or client-side measurement runtime.
- Removing legacy SVG files in this change.
- Changing the established color palette, font families, global page rail, or theme-selection behavior.
- Adding new portfolio projects or routes.

## Decisions

### 1. Separate market positioning from employment facts

The homepage identity line will use the exact agreed position `Raphael Mansueto · Senior Full-Stack Engineer · AI Integrations`. The Experience section will continue to state `Senior Full Stack Developer · VISEO`, and structured professional data will retain the official current title. Metadata may use the market position as a portfolio descriptor only when it does not imply that it is the VISEO job title.

This is preferred over `Product Engineer`, which is less consistently recognized by hiring teams, and over keeping VISEO in the hero, which makes the opening feel like a résumé heading rather than a clear specialization.

### 2. Lead employer-project copy with configurable product behavior

The anonymized Vectle entry will be labeled `Customizable campaign workflow` and use the approved outcome-led summary: `Turned business data into customizable campaign drafts, using feedback to refine each result and a human decision gate before final use.` LangGraph and the supporting stack remain in tertiary metadata.

The phrase `Solo product owner` will be removed from KudosCourts metadata rather than replaced with another staffing-size claim. Existing ownership and decision sections already prove product, architecture, implementation, and operations scope more credibly.

### 3. Replace the visual-artifact registry with semantic evidence models

Active proof will move from `VisualArtifact` records containing image paths and intrinsic dimensions to a typed semantic evidence registry. The registry will retain identifiers, project slug, placement, title, summary, accessibility context, and a discriminated model shape such as sequence, correlation, or coordinated-state flow.

Shared React primitives will render semantic elements—ordered lists for sequences, grouped regions for related states, headings and descriptions for nodes—with CSS-only connectors marked decorative. Project-specific data remains centralized and validated, while the renderer may branch by a small set of evidence kinds. This is preferred over four bespoke components with embedded copy, which would scatter content governance, and over a general-purpose diagram engine, which would recreate the complexity being removed.

### 4. Assign evidence by argument, not by template

KudosCourts will not render evidence on the homepage. Its context, owned decision, and case-study action already establish the hiring argument; the previous five-stage flow adds length without increasing confidence. Inside the case study, a concise semantic sequence will explain only the useful boundary: evidence is reviewed before deterministic persistence and product consumption.

Ample News will render one simplified homepage sequence focused on recoverable, human-confirmed production stages. Its case study may additionally render a compact correlated-observability model. CravingsPH will render a simplified command-to-coordinated-state model. Homepage models are limited to five labeled nodes or stages, while case-study models may use additional detail only when each item carries a distinct claim.

### 5. Keep legacy asset compatibility separate from active evidence

Existing SVGs will remain under `public/work/**` so bookmarked or previously indexed direct URLs continue to return 200. They will move out of the active evidence registry, homepage/case-study rendering, sitemap and `llms.txt` evidence listings, and primary integrity requirements. A small explicit legacy-path list will support compatibility smoke checks without implying those assets remain current portfolio surfaces.

This staged migration avoids public link breakage while ensuring future evidence edits occur in one HTML/data system rather than desktop/mobile SVG triplets.

### 6. Use internal separators without redundant edge rules

List containers will prefer internal `divide-y` separators and remove redundant `border-y` framing. The first and last items will own intentional section spacing; any retained edge boundary must correspond to a meaningful region. Repeated desktop items will maintain at least 24px between content and a divider, with at least 16px on compact mobile surfaces.

Browser tests will measure representative divider and content rectangles rather than merely asserting that a border class exists. This catches the current condition where technically valid classes still produce a collapsed composition.

### 7. Extend existing validation instead of adding dependencies

Portfolio validation will verify the new evidence registry, permitted placement, unique IDs, node/stage bounds, public project coverage, and absence of active image sources. Playwright will verify order, conditional evidence presence, semantic text, theme parity, minimum label size, divider geometry, and horizontal overflow. No new runtime dependency is necessary.

## Risks / Trade-offs

- **[Risk] HTML evidence becomes a decorative card stack instead of a diagram** → Keep the visual vocabulary restrained, use semantic sequence/group structure, and let connectors express only relationships already present in the DOM.
- **[Risk] Simplification removes technical credibility** → Preserve the full approved explanation in case-study prose and require every retained node to carry a distinct, verifiable relationship.
- **[Risk] Removing KudosCourts homepage evidence weakens its proof** → Keep its owned decision and primary case-study action prominent; verify that the case study exposes the review boundary immediately when opened.
- **[Risk] Market positioning conflicts with the official title** → Test visible, metadata, structured-data, Open Graph, résumé, and machine-readable identity together and assign each phrase an explicit role.
- **[Risk] Legacy SVGs become forgotten dead files** → Maintain an explicit compatibility list and schedule deletion only in a later change after checking external references and index history.
- **[Risk] Geometry assertions become brittle** → Measure minimum separation and overflow contracts rather than exact pixel snapshots or component-specific class strings.
- **[Risk] Outcome-led campaign copy implies unsupported commercial results** → Describe delivered workflow behavior only; do not claim speed, adoption, revenue, conversion, or campaign performance.

## Migration Plan

1. Add the semantic evidence types, registry, validation, and shared render primitives alongside the current image system.
2. Implement the case-study HTML models and verify their content against approved public claims.
3. Switch Ample News and CravingsPH homepage evidence to the semantic renderer; remove KudosCourts homepage evidence.
4. Update case-study rendering, generated indexes, integrity checks, and route smoke checks to use semantic evidence while retaining legacy URL coverage.
5. Apply the agreed hero, campaign-workflow, ownership, and project-order copy changes.
6. Remove redundant edge borders and audit divider geometry across homepage and case studies.
7. Update browser/content tests, run the full acceptance suite, and visually review System, Light, and Dark themes at 390px and desktop width.

Rollback is incremental: the legacy SVGs remain present, so the previous image renderer can be restored while the semantic registry is corrected. Copy, order, divider, and evidence-placement changes are independently revertible.

## Open Questions

No product-direction questions remain. The five-question alignment fixed the hero position, anonymized workflow framing, HTML evidence scope, KudosCourts placement, and public project order. Implementation copy may be shortened for fit only if it preserves the approved product behavior and confidentiality constraints.
