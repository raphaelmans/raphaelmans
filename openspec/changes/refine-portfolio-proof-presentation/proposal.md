## Why

The latest portfolio pass improved proof integrity but still presents several hiring signals as résumé labels or technical implementation details instead of clear product outcomes. Its image-based diagrams also duplicate desktop/mobile assets, complicate theme handling, and create long proof sections whose borders and spacing sometimes collapse visually.

## What Changes

- Replace the employer-title hero eyebrow with the agreed hiring-language position: `Raphael Mansueto · Senior Full-Stack Engineer · AI Integrations`.
- Rewrite the anonymized Vectle employer-project summary around customizable campaign drafts, feedback-driven refinement, and a human decision gate; keep implementation technologies subordinate.
- Remove “Solo product owner” language and let specific ownership evidence communicate scope without a potentially negative staffing frame.
- Reorder Selected Work to KudosCourts, Ample News, then CravingsPH.
- Remove the KudosCourts diagram from the homepage and represent its useful review boundary as concise semantic HTML inside the case study.
- Replace the useful Ample News and CravingsPH image diagrams with simplified, responsive, theme-native HTML/CSS evidence components; remove image-only full-size actions and duplicated mobile diagram variants from the rendered experience.
- Audit every portfolio divider so content has deliberate spacing on both sides and no heading, metadata row, or card visually collides with a rule.
- Preserve legacy public SVG files during this change so existing direct artifact URLs do not break, while removing them from active rendering and generated public indexes when their HTML replacements take over.

## Capabilities

### New Capabilities

- `hiring-language-and-attribution`: Defines recruiter-recognizable positioning, outcome-led employer-project copy, and ownership language that stays factual without overemphasizing solo execution.
- `semantic-evidence-presentation`: Defines which proof belongs on the homepage versus case studies and requires simplified, responsive, accessible HTML evidence instead of rendered diagram images.
- `editorial-order-and-spacing`: Defines the selected-work ranking and consistent divider spacing across homepage and case-study surfaces.

### Modified Capabilities

None. The repository has no archived main specifications yet; these requirements are introduced as new capabilities and remain compatible with the completed change history.

## Impact

The change affects homepage hero and experience copy, featured-work ordering, case-study role metadata, evidence rendering and artifact registries, generated machine-readable indexes, portfolio integrity checks, responsive/theme styles, and browser regression coverage. No runtime dependency is required; the HTML evidence should use the existing React, Tailwind, and semantic theme-token system.
