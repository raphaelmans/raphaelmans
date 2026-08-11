## Why

The portfolio now has a coherent theme foundation, but its homepage still distributes attention across repeated claims, mismatched calls to action, metric-like proof cells, and equally weighted sections. The hierarchy must be rebuilt around the approved primary outcome: helping a hiring manager understand Raphael's fit and reach credible evidence quickly enough to initiate a qualified interview.

## What Changes

- Reorder the homepage into the approved hiring journey: Hero, compact proof line, Experience, Selected Work, compact Recognition, and Contact.
- Align the hero's primary action with Experience, add a direct KudosCourts case-study action, and retain the résumé as a utility.
- Replace the four-cell proof strip with one quiet, scannable credibility line.
- Prioritize current and role-relevant professional experience while compressing earlier roles and de-emphasizing technology inventories.
- Present no more than three selected projects as evidence of problem-solving, ownership, consequential decisions, and inspectable proof.
- Remove the standalone Capabilities section and fold its claims into experience and project evidence; reduce How I Work to a concise supporting statement where it adds new information.
- Simplify navigation around the reduced page structure and preserve comfortable keyboard and touch interaction.
- Replace repeated uppercase section scaffolds, decorative numbering, and equal card grids with direct headings, editorial evidence rows, and varied information density.

## Capabilities

### New Capabilities

- `homepage-hiring-journey`: Opening-screen comprehension, exact homepage sequence, proof-line behavior, and non-redundant progression toward a qualified interview.
- `experience-evidence-hierarchy`: Prioritization and presentation rules for current, relevant, earlier, and disclosure-sensitive professional experience.
- `selected-work-evidence`: Selection, ordering, and evidence requirements for the three featured projects on the homepage.
- `portfolio-navigation-and-conversion`: Navigation structure, CTA hierarchy, anchor integrity, contact flow, and interaction-target requirements across the hiring journey.
- `editorial-interface-language`: Heading cadence, row and surface grammar, density, typography roles, and anti-template rules for the overhauled homepage.

### Modified Capabilities

None. The repository has no archived main OpenSpec capabilities for homepage information architecture.

## Impact

- Affects homepage composition, hero, proof line, experience and project records, section headings, navigation, recognition, contact, footer utilities, and related responsive states.
- Removes the standalone Capabilities component from the public journey and either removes or folds the current Approach content into evidence-led sections.
- Builds on the completed `add-ssr-light-dark-theme` change; semantic tokens, SSR-visible content, and theme behavior remain unchanged contracts.
- Does not add new public routes, analytics, writing, a Now page, visual project artifacts, or new case-study content; those proof-layer concerns belong to `deepen-portfolio-proof`.
