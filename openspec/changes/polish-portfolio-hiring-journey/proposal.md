## Why

The first Impeccable critique of the implemented portfolio scored 24/40 with two P1 defects: the lead Ample News proof path returns 404, and the closed mobile navigation can retain invisible focus targets. The review also found that the homepage duplicates case-study depth, mobile evidence diagrams become unreadable, dark-theme evidence surfaces bypass semantic tokens, and the closing invitation does not clearly convert qualified interest into an interview.

This change turns that critique into a remediation contract aligned around one outcome: earn a qualified interview quickly through a concise hiring brief, senior-judgment evidence, and an artifact-led technical editorial identity.

## What Changes

- Repair or withdraw every broken homepage proof destination and add an automated integrity check for public internal links and required artifacts.
- Make the mobile navigation state accessible: closed destinations cannot receive focus, open/close state is announced, Escape closes the menu, and focus returns predictably.
- Distill each homepage project into a comparable argument built from outcome/context, one attributable decision, one proof artifact, and one primary case-study action.
- Move detailed boundaries, complete technology inventories, and long-form evidence into published case studies.
- Lead Selected Work with the strongest complete and reachable case study rather than preserving Ample News first by default.
- Adapt evidence diagrams for mobile readability and both semantic themes, including accessible expanded viewing where needed.
- Make the hero and closing invitation explicit about the target senior/staff product-engineering conversation, with email as the singular primary conversion action.
- Establish an artifact-led technical editorial language that combines restrained density with immediate identity clarity, removes side-stripe accents and repetitive template signals, and reconciles undocumented typography values.
- Add regression coverage for responsive layout, keyboard navigation, theme parity, internal routes, hit targets, console health, and the intended hiring-brief content hierarchy.

## Capabilities

### New Capabilities

- `portfolio-proof-integrity`: Public project routes, artifacts, and homepage proof actions remain complete, reachable, and automatically verifiable.
- `concise-hiring-brief`: The homepage earns a qualified interview through a compact, comparable proof sequence and an explicit conversion close.
- `accessible-adaptive-evidence`: Navigation and visual proof remain operable, readable, and theme-correct across keyboard, mobile, desktop, light, and dark contexts.
- `artifact-led-editorial-identity`: The interface uses a distinctive technical-editorial hierarchy driven by evidence artifacts rather than repetitive portfolio-template treatments.

### Modified Capabilities

None. The repository currently has no synchronized main specs; this change treats the implemented `overhaul-portfolio-hiring-journey`, `deepen-portfolio-proof`, and `add-ssr-light-dark-theme` changes as constraints while defining focused follow-up capabilities.

## Impact

- Homepage composition and portfolio content data in `app/page.tsx`, `components/portfolio/*`, and `data/*`.
- Published work routes, static parameters, metadata, artifacts, and case-study navigation in `app/work/*` and `public/work/*`.
- Semantic tokens and responsive/theme presentation in `app/globals.css` and shared UI primitives.
- Automated checks for internal links, project publication completeness, keyboard behavior, responsive evidence, and theme parity.
- No new runtime service or external API is required; implementation should prefer the existing Next.js, React, and test/tooling stack.
