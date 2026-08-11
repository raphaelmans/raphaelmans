## Context

The portfolio currently publishes two static case studies through one `/work/[slug]` route: Ample News and KudosCourts. Their server-only records already contain reviewed metadata, architecture steps, narrative sections, technology lists, and structured-data fields. CravingsPH appears on the homepage but is intentionally absent from the case-study registry until its full narrative and visual evidence are reviewed. No project media currently exists under `public`, so homepage rows and case studies are entirely text-led.

The proof layer must serve technical interviewers who have moved beyond a fast homepage scan and now need to evaluate ownership, system judgment, reliability, attribution, and honest limitations. The Obsidian Experience Library is the factual authority; `references/content-governance.md` and `references/case-studies.md` are the repository's non-rendered publication gates. This change follows `overhaul-portfolio-hiring-journey`, which settles the selected set and homepage row contract.

## Goals / Non-Goals

**Goals:**

- Give all three featured projects a complete, consistent deep-evaluation route.
- Publish a source-reviewed CravingsPH study without converting modeled depth into unsupported production claims.
- Add visual proof that explains product behavior or architecture rather than decorating the page.
- Make evidence provenance, attribution, confidentiality, review state, and withheld claims explicit editorial gates.
- Preserve static rendering, semantic document structure, metadata, structured data, and fast responsive media.
- Keep the case-study system typed and data-driven without turning it into programmatic SEO.

**Non-Goals:**

- Adding a CMS, database, authenticated editor, visitor uploads, comments, or personalization.
- Publishing Vectle, the institutional settlement project, BookAgad, UgnayPH, or other approval-gated studies.
- Claiming commercial success, transaction volume, time savings, store releases, or dynamic usage metrics without fresh evidence.
- Exposing private customer data, prompts, credentials, internal identifiers, raw traces, source paths, or editorial confidence notes.
- Making social or project imagery visitor-theme-dependent.
- Generating thin keyword variations, project-directory pages, or a writing archive.

## Decisions

### 1. Keep one data-driven case-study route with a stricter record contract

Retain `/work/[slug]`, `dynamicParams = false`, and `generateStaticParams`. Extend the server-only record contract so published records explicitly supply:

- project orientation and attribution;
- real-world problem and user workflow;
- constraints and ownership;
- consequential architecture or product decisions;
- reliability/correctness evidence;
- verified outcome or observable evidence;
- honest limitations and next steps;
- one or more typed visual artifacts;
- publication and review dates.

The renderer may continue using ordered narrative sections, but required semantic content cannot be omitted merely because the array accepts arbitrary IDs. A small server-side validation helper or test should reject incomplete published records during development/build.

Alternative considered: dedicated page components per project would allow art direction but duplicate metadata, semantics, next actions, and governance checks. The shared route can still support project-specific section content and artifact placement.

### 2. Add typed visual-artifact metadata

Introduce a server-safe artifact shape conceptually equivalent to:

```ts
type VisualArtifact = {
  id: string;
  kind: "screenshot" | "system-diagram";
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  placement: "homepage" | "case-study" | "both";
};
```

Files live under `public/work/<slug>/` with descriptive names. Raster screenshots use `next/image` with intrinsic dimensions and responsive `sizes`; diagrams may use optimized SVG or raster exports but must remain readable at narrow widths. Captions explain what the artifact proves and whether a diagram is a simplified public model. Homepage presentation uses at most one decisive artifact per project; case studies may contain additional evidence.

Alternative considered: hard-coded images in JSX would make validation, alt text, captions, and per-project completeness difficult to enforce.

### 3. Use project-specific visual evidence, not generic illustration

- Ample News: one sanitized pipeline diagram plus one redacted product or observability artifact, as required by the existing registry. The public diagram may abstract provider boundaries and omit private identifiers.
- KudosCourts: one product screenshot or system diagram that clarifies evidence capture, review-gated ingestion, typed product core, web/mobile clients, and operations.
- CravingsPH: one product screenshot or system diagram explaining the transaction-heavy order/session workflow, three-region state model, deterministic locking, realtime reconciliation, or kiosk trust boundary.

Visuals cannot imply functionality or production adoption that the reviewed sources do not support. Decorative AI-generated product mockups are not acceptable evidence.

### 4. Publish CravingsPH only after a dedicated evidence gate

Draft the new record from the verified CravingsPH Experience Library note and source-reviewable repository evidence. Its narrative centers on:

- restaurant discovery and operational workflows;
- personal end-to-end ownership;
- lifecycle/payment/fulfillment state regions and cross-region guards;
- command IDs, row locking, deduplication, deterministic multi-order settlement, and benign conflict handling;
- realtime floor updates and cache reconciliation;
- secure kiosk pairing and scoped device trust;
- early-partner status and honest limitations.

The study must not claim broad production volume, active payment settlement, universal POS replacement, or commercial outcome. The route enters the published record set only after narrative, attribution, external URL, visual artifact, and confidentiality review are complete.

### 5. Keep governance outside the browser-facing content model

The Experience Library remains the source of truth. `references/content-governance.md` and `references/case-studies.md` record source note, classification, public state, withheld claims, required visuals, and last review. Runtime case-study records contain public copy only and remain `server-only`; editorial file paths, confidence classifications, review notes, and withheld facts never enter client bundles or rendered JSON.

Every publishable claim is either verified or explicitly user-confirmed. Inferred statements can guide investigation but cannot appear as facts. Dynamic metrics are omitted unless reverified immediately before publication.

Alternative considered: embedding provenance fields in public JSON makes automated rendering convenient but risks leaking internal paths and editorial decisions.

### 6. Preserve and strengthen static discoverability

Every published case study receives:

- a unique canonical URL, title, and description;
- Article metadata with publication/review dates;
- a SoftwareApplication subject in JSON-LD with accurate category and operating system;
- a route-specific social preview derived from reviewed public copy;
- inclusion in `generateStaticParams`, sitemap, and the curated `llms.txt` portfolio index;
- semantic `article`, headings, lists, figures, captions, time elements, and internal navigation.

The template remains one high-quality route per reviewed project. It must not generate pages from incomplete records or technology-keyword combinations.

### 7. Standardize orientation and next actions without flattening project voice

Each page opens with classification, status, period, role, platform, direct summary, and review date. The body covers the required evidence categories in project-appropriate language; sections need not share identical titles or count. Each page closes with email as the primary hiring action, a return to Selected Work, and a contextual link to another published case study when useful.

The route navigation maintains theme access and clear orientation back to the portfolio. Visual artifacts use `figure`/`figcaption` and sit adjacent to the claim they substantiate.

## Risks / Trade-offs

- [Risk] Employer screenshots or telemetry can leak sensitive information even after superficial redaction. → Prefer a purpose-built public diagram; perform a full-resolution review for names, prompts, identifiers, URLs, account data, and metadata before copying any image into `public`.
- [Risk] Architecture diagrams can look like evidence while merely restating prose. → Require each caption to identify the specific workflow, boundary, or decision made clearer by the visual.
- [Risk] A shared renderer can make every case study feel mechanically identical. → Standardize information requirements and semantics, while allowing project-specific section ordering, artifact placement, and narrative emphasis.
- [Risk] Screenshots can damage LCP and cause layout shift. → Store intrinsic dimensions, use responsive image sizing, optimize formats, and avoid loading below-fold media eagerly.
- [Risk] CravingsPH's source depth can tempt production or commercial overclaims. → State early-partner status, distinguish implemented architecture from measured usage, and retain explicit claims-to-avoid in governance review.
- [Risk] Review dates become stale while the site remains indexable. → Make `lastReviewed` required and add a publishing check/report that flags missing or invalid dates without inventing freshness.
- [Risk] The proof change can conflict with the preceding homepage data refactor. → Apply after the hiring-journey change and add artifacts to its final project contract rather than restoring the old one.

## Migration Plan

1. Apply `overhaul-portfolio-hiring-journey` and inspect the final selected-work record contract.
2. Extend server-only case-study and project types with visual artifacts and required publication fields; add completeness validation.
3. Create and sanitize the approved Ample News, KudosCourts, and CravingsPH artifacts under project-specific public directories.
4. Add figure rendering to homepage project rows and the case-study template with responsive image behavior.
5. Draft and review the CravingsPH record against its Experience Library note and claims-to-avoid before adding it to the published set.
6. Normalize existing Ample News and KudosCourts records to the required orientation, limitations, visual-proof, and next-action contract.
7. Update governance registry, sitemap, `llms.txt`, metadata, JSON-LD, and social-preview inputs for the three published studies.
8. Verify privacy at full resolution, static generation, invalid-slug behavior, structured data, internal links, media performance, responsive layouts, themes, keyboard use, and production build.

Rollback removes the CravingsPH record and new artifact references from the published set before deleting public assets. Existing Ample News and KudosCourts routes can continue using the prior text-only renderer if the visual system must be reverted.

## Open Questions

None for specification. Exact screenshot crops and public diagram composition are implementation-time craft decisions constrained by the artifact and governance requirements.
