## Why

The portfolio homepage now asks a scanning visitor to absorb résumé-level experience detail and case-study-level diagrams before choosing what to inspect. This gives too many claims equal visual weight, weakens the hiring hierarchy established in the information-audit references, and makes the complete landing page feel overwhelming even though its section order is broadly correct.

## What Changes

- Distill the homepage into a scan-level hiring journey: identity and promise, compact credibility, relevant experience, selected proof, recognition, and contact.
- Align the hero's primary action with Experience, the first major evidence section, and move secondary profile/contact utilities out of the opening decision path.
- Replace the multi-item proof strip with one quiet credibility sentence or equivalently compact row.
- Limit VISEO and HustleWing to a concise summary plus their two strongest homepage proof points; keep earlier roles as compact rows and route exhaustive employment detail to the résumé.
- Make Ample News the flagship Selected Work entry and render KudosCourts and CravingsPH as supporting editorial rows rather than three equally weighted proof blocks.
- Remove complete evidence diagrams and technical workflow models from the homepage. Keep those models in case studies, where visitors have intentionally requested depth.
- Give case-study evidence its own hierarchy: one conclusion first, a compact semantic relationship second, and supporting stage detail only when it adds a distinct claim.
- Compress Recognition and Contact so they close the hiring argument without introducing another large visual chapter.
- Preserve SSR-safe light/dark themes, accessible semantics, public evidence boundaries, SEO surfaces, and current routes while adding regression coverage for hierarchy and proof placement.

## Capabilities

### New Capabilities

- `landing-page-progressive-disclosure`: Defines the scan-level homepage sequence, content budgets, unequal proof hierarchy, aligned actions, and compact supporting sections.
- `case-study-depth-boundary`: Defines which technical evidence stays off the homepage and how semantic case-study evidence reveals conclusions before implementation detail.

### Modified Capabilities

None. The repository has no synchronized main specifications; this follow-up introduces explicit progressive-disclosure contracts while treating the completed portfolio changes as implementation constraints.

## Impact

- Homepage composition and copy in `app/page.tsx`, `components/portfolio/*`, and `data/portfolio-data.ts`.
- Evidence placement and rendering in `components/portfolio/evidence-model.tsx`, `data/work-evidence.ts`, and `app/work/[slug]/page.tsx`.
- Featured-work order and presentation in shared public manifests, metadata, `llms.txt`, and continuation paths where applicable.
- Browser and integrity tests covering CTA alignment, homepage content budgets, flagship/supporting hierarchy, evidence placement, responsive behavior, and theme parity.
- No new runtime dependency, route, external API, or visual-asset format is required.
