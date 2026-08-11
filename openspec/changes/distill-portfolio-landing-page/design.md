## Context

The homepage already uses the audited career-first sequence—Hero, proof, Experience, Selected Work, Recognition, and Contact—but later iterations increased the amount of content rendered inside each stage. The hero now carries several positioning and availability messages, HustleWing exposes five proof points, and each featured project renders metadata, context, a boxed decision, a complete semantic evidence model, and a primary action. Repeating that treatment three times makes the homepage behave like three case studies embedded in one landing page.

The reference portfolio pattern is structurally simpler: the landing page establishes identity and relevance, offers a small amount of selected proof, and uses a page transition to reveal depth. The current implementation already has published case-study routes, semantic evidence data, SSR-safe themes, accessible primitives, and a shared public-work manifest, so the change can be achieved by reassigning content depth rather than adding a new system.

The design remains constrained by evidence governance, the approved public project set, the anonymized campaign-workflow boundary, the official VISEO title, and the existing light/dark design tokens. Essential hiring content must remain server-rendered and understandable without client-side reveal behavior.

## Goals / Non-Goals

**Goals:**

- Make the complete homepage scannable as a hiring argument rather than readable only as a long technical brief.
- Ensure each section introduces one new level of belief and one appropriate next action.
- Use Experience as the first major evidence destination and align the hero action accordingly.
- Limit homepage employment evidence to the most relevant proof while preserving the full résumé as the exhaustive record.
- Establish Ample News as the one flagship project and make KudosCourts and CravingsPH visibly supporting proof.
- Keep all complete technical evidence models on case-study routes and make their conclusions understandable before granular stage detail.
- Preserve accessibility, responsive behavior, semantic theming, disclosure boundaries, metadata integrity, and existing public routes.

**Non-Goals:**

- Removing case studies, semantic HTML evidence, or technical depth from the portfolio.
- Hiding essential identity, experience, or project meaning behind JavaScript interactions.
- Adding a new project, article archive, About page, animation system, diagram library, or image-generation workflow.
- Changing the approved employment facts, case-study claims, confidentiality constraints, font families, color system, or theme provider.
- Replacing the résumé as the complete employment-history artifact.

## Decisions

### 1. Use route depth as the primary progressive-disclosure mechanism

The homepage will contain recognition-level and comparison-level evidence; case-study routes will contain explanation-level and implementation-level evidence. This is preferred over adding accordions throughout the homepage, because a hiring visitor should not have to open multiple controls to discover the page's basic argument. It is also preferred over retaining every detail and relying only on smaller typography, which reduces legibility without reducing cognitive load.

Native disclosure controls may be used inside a case study for supplementary node descriptions. The conclusion and relationship labels remain visible in server-rendered HTML, so the essential meaning does not depend on interaction or client JavaScript.

### 2. Enforce section-level content budgets

The hero will retain the recruiter-facing identity, one outcome-led promise, one current-role credibility line, a primary `View experience` action, and a quiet résumé utility. Availability detail and professional-profile links move to the closing contact or footer region.

The proof strip becomes one compact credibility sentence or one visually continuous row. It must not read as four independent metrics.

VISEO and HustleWing each render one summary and no more than two homepage proof points. HustleWing's five-part canonical sequence remains available to résumé and synthesis artifacts; the homepage selects the two points that best support the target hiring argument. Outliant and Vibravid remain compact earlier-experience rows. A résumé link provides the exhaustive path.

Recognition becomes a compact supporting row. Contact retains one direct invitation and email action, with résumé and LinkedIn as subordinate utilities.

### 3. Model Selected Work as one flagship plus two supporting rows

The public manifest will order work as `Ample News → KudosCourts Web + Mobile → CravingsPH`. Presentation data will explicitly identify Ample News as `flagship` and the remaining entries as `supporting`; the interface will not infer importance from an `nth-child` selector or duplicate the order in component code.

The flagship may use a larger heading, a concise context statement, one attributable consequential decision, and one case-study action. Supporting entries use a compact editorial row with one outcome sentence, one short decision or differentiator, and one action. None renders a complete evidence model on the homepage.

This intentionally replaces the current equal project treatment. Equal cards were considered but rejected because they recreate the hierarchy problem even if their copy is shorter.

### 4. Remove homepage evidence placement from the active evidence contract

`ProjectItem` will stop importing or rendering `EvidenceModel`. Evidence records currently marked `homepage` or `both` will become case-study evidence, and the `compact` rendering branch will be removed or retired. The evidence registry remains the source of case-study relationships and machine-readable proof, but it no longer controls homepage height.

Integrity checks will assert that no `[data-evidence-model]` appears inside a homepage featured-project region. Existing case-study URLs, semantic evidence IDs, and legacy artifact compatibility remain intact.

### 5. Render case-study evidence conclusion first and details second

Every case-study evidence region will expose, in order:

1. a direct conclusion heading;
2. one concise sentence explaining why the relationship matters;
3. a compact semantic path, state relationship, or correlation overview using labels and CSS-only connectors;
4. optional supporting descriptions when they add a distinct implementation or reliability claim.

The renderer will stop presenting every evidence node as an equally weighted bordered card. Ordered processes remain ordered lists; correlations and coordinated states retain grouped semantic regions. At desktop widths the relationship may read horizontally; on narrow screens it becomes a vertical path without horizontal scrolling. A native `<details>` element may contain supplementary node descriptions, with an explicit summary label and full keyboard support.

### 6. Keep one source of truth for order, metadata, and hierarchy

Homepage order, case-study continuation, sitemap/static parameter enumeration where ordering is visible, and `llms.txt` featured summaries will derive from the shared public project manifest. Homepage-specific presentation fields stay in the same typed work data rather than a component-local array.

Copy remains data-driven. Components own visual hierarchy and content limits; they do not contain project-name conditionals.

### 7. Test hierarchy as behavior, not only styling

Browser coverage will verify section order, hero-target alignment, proof-line continuity, maximum visible homepage proof-point counts, flagship/supporting order, absence of homepage evidence models, one primary proof action per project, and compact Recognition/Contact behavior. Responsive and theme checks will continue at 390px and desktop widths.

Case-study tests will verify visible conclusions and relationship labels before disclosure, keyboard-operable supplementary detail, semantic list/group structure, theme parity, and zero horizontal overflow. Geometry checks should assert meaningful bounds and spacing, not exact pixel snapshots.

## Risks / Trade-offs

- **[Risk] The homepage becomes too sparse to establish senior depth** → Preserve two strong proof points for each relevant role, one flagship decision, and direct case-study actions; evaluate depth through the ten-second hiring questions rather than raw word count.
- **[Risk] Making Ample the flagship weakens the independent-product story** → Keep KudosCourts immediately visible as the first supporting row and describe its end-to-end transactional and web/mobile ownership distinctly.
- **[Risk] Visitors miss diagrams after they move off the homepage** → Make the flagship case-study action explicit and ensure the opened case study reaches its evidence conclusion quickly.
- **[Risk] Native disclosure hides useful implementation detail** → Keep conclusions and relationship labels always visible; place only supplementary explanations inside the control.
- **[Risk] Machine-readable project order diverges from the rendered page** → Derive all enumerations from the shared typed manifest and extend integrity validation.
- **[Risk] Content-budget tests become coupled to copy** → Assert semantic counts, roles, placement, and stable data attributes rather than full paragraph strings except for approved identity and CTA contracts.

## Migration Plan

1. Add typed flagship/supporting presentation metadata and update the shared public project order.
2. Distill the hero and proof line, align the primary action with Experience, and relocate secondary utilities.
3. Limit homepage experience proof and add the explicit résumé depth path.
4. Split Selected Work into flagship and supporting presentations and remove homepage evidence rendering.
5. Reclassify active evidence as case-study-only and simplify the semantic renderer to conclusion-first relationships with optional supplementary detail.
6. Compress Recognition and Contact while preserving accessible actions and metadata.
7. Update integrity, route, responsive, theme, keyboard, and hierarchy regression coverage; visually review mobile and desktop in System, Light, and Dark themes.

Rollback is component-by-component: public routes and evidence data remain present, so the previous homepage project renderer can be restored independently if hierarchy validation reveals a loss of necessary proof.

## Open Questions

No product-direction questions remain. Invoking this fast-forward change after the full-page hierarchy discussion confirms the audited hiring sequence, Ample News as flagship proof, homepage-to-case-study disclosure boundary, and conclusion-first HTML evidence direction.
