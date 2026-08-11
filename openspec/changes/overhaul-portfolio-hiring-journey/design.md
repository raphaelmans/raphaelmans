## Context

The completed theme change removed the forced-dark implementation, migrated colors to semantic roles, removed observer-gated reveals, and established accessible theme controls. The remaining homepage still reflects its earlier information architecture: the hero sends the primary CTA to Featured Work even though Experience appears first; the proof strip is a four-cell metric grid; all four employers receive similar treatment; Capabilities and How I Work repeat the same positioning; navigation exposes five equally weighted anchors; and every major section uses the same uppercase mono heading.

The approved product outcome is a qualified interview for senior full-stack, applied-AI, or integration-heavy work. Hiring managers and technical interviewers are time-constrained, so the homepage must function as a short evidence sequence while case studies carry deep evaluation. “The Clear Signal” remains the visual contract: calm hierarchy, restrained secondary UI, direct language, editorial rows, semantic light/dark tokens, and no decorative complexity that competes with evidence.

## Goals / Non-Goals

**Goals:**

- Resolve identity, role, specialty, credibility, and next action in the opening viewport.
- Make the page order itself express the hiring argument without repeated positioning sections.
- Give current and role-relevant professional experience more depth than earlier experience.
- Present exactly three complementary projects with clear ownership and inspectable proof.
- Reduce navigation and visual scaffolding so evidence controls attention.
- Preserve SSR-visible content, semantic theme behavior, accessibility, and narrow reading widths.

**Non-Goals:**

- Creating or revising deep case-study content, diagrams, screenshots, or media assets.
- Adding analytics, testimonials, employer logos, writing, a Now page, or a CMS.
- Changing approved public claims beyond editing for hierarchy and avoiding repetition.
- Redesigning the paired color system, theme behavior, fonts, routing model, or résumé.
- Turning the homepage into a comprehensive employment archive or technology inventory.

## Decisions

### 1. Use one fixed evidence sequence

The homepage composition becomes:

1. Hero
2. Compact proof line
3. Relevant experience
4. Selected work
5. Compact recognition
6. Contact
7. Footer

Capabilities is removed as a standalone section. How I Work is also removed as a standalone section; its durable ideas—specifications, typed boundaries, tests, and human review—may appear only where they strengthen an experience or project claim. This ensures every scroll adds evidence rather than repackaging the positioning.

Alternative considered: retaining all sections and merely restyling them would preserve repetition and keep secondary claims visually equal to professional proof.

### 2. Make the hero CTA hierarchy match the page hierarchy

The hero keeps name, current role, the approved one-sentence positioning, and a concise credibility bridge. Actions are:

- Primary: `View experience` → `#experience`
- Secondary: `Read the KudosCourts case study` → `/work/kudoscourts`
- Utility: `Download résumé` → `/resume.pdf`

Professional-profile links remain utilities and use comfortable hit areas. The hero does not add availability badges, tool inventories, testimonials, or metric cards.

Alternative considered: moving Selected Work ahead of Experience would make the existing CTA coherent, but conflicts with the hiring-first evidence ladder and understates current professional credibility.

### 3. Replace the proof grid with a semantic sentence

The four approved signals remain in source data but render as one `aside` containing an inline sequence or sentence. Separators are typographic and wrap naturally in reading order. The proof line uses a quiet semantic surface only if grouping needs it; it never becomes four equal cells on narrow or wide screens.

Alternative considered: a responsive two-by-two grid still reads as pseudo-analytics and overweights short labels.

### 4. Encode experience prominence in data

Experience records gain an explicit presentation tier rather than relying on array indexes or employer-name conditionals. `primary` records receive summary, two evidence points, relevant employer-project context, and restrained technology metadata. `earlier` records render in one compact grouped treatment with role, company, period, and one concise relevance statement.

VISEO and HustleWing are primary. Outliant and Vibravid are earlier experience. Current status remains semantic metadata rather than a bright decorative badge. Employer-project attribution remains nested under the actual employer.

Alternative considered: slicing the existing array in the component is less explicit and makes content governance depend on display order.

### 5. Keep three complementary selected-work records

Selected Work remains ordered as Ample News, KudosCourts Web + Mobile, and CravingsPH. Each editorial row exposes four evidence layers before technology metadata: real problem/workflow, Raphael's ownership, a consequential decision or constraint, and an inspectable route or live product. Technology tags are compressed or summarized so they support rather than lead the argument.

This change uses existing case-study and external links. Typed visual artifacts and the CravingsPH case-study route are deferred to `deepen-portfolio-proof`.

### 6. Reduce navigation to decision-relevant destinations

Desktop and mobile navigation expose Experience, Work, and Contact plus the existing secondary theme utility. Recognition remains discoverable in the natural page flow but does not need a top-level anchor. Active-section behavior derives from this reduced navigation data. The mobile panel closes after selection, and all important triggers and links maintain at least a 44px hit area.

The contact section provides one direct close: email as the primary action, LinkedIn and résumé as utilities. Case-study navigation is outside this change.

Alternative considered: keeping Capabilities and Approach in navigation would preserve removed destinations and advertise information the new hierarchy intentionally folds into evidence.

### 7. Replace universal section scaffolding with content-led headings

Section headings use direct language and a meaningful type scale rather than the same tiny uppercase mono component. Mono remains for dates, status, and terse technical metadata. Experience and project entries remain flat editorial rows separated by rhythm and hairlines; they do not become equal marketing cards. Recognition is a compact supporting row, not a competing showcase.

The implementation may retain a shared heading primitive if it supports variants, but the rendered hierarchy must not repeat one visual formula. Existing semantic tokens, radii, reading columns, and focus behavior remain normative.

### 8. Preserve server rendering and minimize client scope

Homepage sections stay Server Components. Navigation remains the sole page-level client island because it owns scroll state, the mobile menu, and the theme utility. Data shaping happens in server-safe modules; no homepage content is hidden pending hydration.

## Risks / Trade-offs

- [Risk] Removing sections could make breadth feel smaller. → Fold capability evidence into richer experience and project rows, where it is more credible.
- [Risk] Dense primary experience can slow scanning. → Cap each primary entry at a concise summary and two strongest evidence points; move detail to case studies or the résumé.
- [Risk] Compressing earlier roles can look dismissive. → Preserve their titles, companies, periods, and one relevant contribution under an explicit Earlier Experience heading.
- [Risk] Three hero actions can compete. → Use one filled primary, one quiet secondary, and one lower-emphasis utility treatment.
- [Risk] The exact hierarchy can break on narrow screens. → Preserve DOM reading order, use wrapping rather than horizontal overflow, and test at 390px plus long-copy cases.
- [Risk] The two planned changes both touch project records. → Apply this change first, then rebase the proof change's typed artifact additions on the final selected-work data model.

## Migration Plan

1. Update portfolio data with explicit experience tiers and the reduced navigation model.
2. Align hero actions and rewrite the proof strip as a compact proof line.
3. Split primary and earlier experience presentation while preserving reviewed claims.
4. Refine selected-work rows around problem, ownership, decision, and existing inspectable links.
5. Remove Capabilities and standalone Approach from homepage composition and navigation; delete obsolete components/data after all uses are gone.
6. Replace repeated section headings and equal-card scaffolds across Experience, Work, Recognition, and Contact.
7. Verify the hiring journey at mobile and desktop widths, in both themes, with keyboard navigation, static rendering, and production build checks.

Rollback is a source revert of the homepage composition and data-shape changes. No URL, external data, or persisted visitor state migration is required.

## Open Questions

None. PRODUCT.md, DESIGN.md, and the approved information-hierarchy audit settle the outcome, sequence, CTA labels, featured set, and visual direction.
