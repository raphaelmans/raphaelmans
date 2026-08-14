# Search discovery deployment checklist

This checklist separates repository verification from owner-only actions in Vercel, Google Search Console, and external profiles. Complete it after the `optimize-portfolio-search-discovery` implementation passes locally.

## 1. Repository verification

- Run `pnpm lint`, `pnpm typecheck`, `pnpm test:unit`, `pnpm validate:portfolio`, `pnpm build`, `pnpm test:routes`, and `pnpm test:e2e`.
- Confirm `/`, `/engineering`, every `/engineering/[slug]`, every `/work/[slug]`, `/robots.txt`, `/sitemap.xml`, and `/llms.txt` return `200` in the production build.
- Inspect rendered canonicals, Open Graph URLs, and JSON-LD URLs. Every portfolio URL must begin with `https://raphaelmansueto.com`.
- Confirm every Article schema image route returns a 1200×630 PNG.

## 2. Vercel domain change — owner action

1. Keep both `raphaelmansueto.com` and `www.raphaelmansueto.com` assigned to the project during verification.
2. Set `raphaelmansueto.com` as the production primary domain in Vercel.
3. Configure `www.raphaelmansueto.com` to permanently redirect to the apex domain while preserving path and query.
4. Wait for Vercel to report valid TLS certificates for both hosts.
5. Verify representative requests:
   - `https://raphaelmansueto.com/` → `200`
   - `https://raphaelmansueto.com/work/kudoscourts` → `200`
   - `https://www.raphaelmansueto.com/` → permanent redirect to the apex homepage
   - `https://www.raphaelmansueto.com/work/kudoscourts?source=test` → permanent redirect to the matching apex path and query
6. Confirm the final URL, canonical, Open Graph URL, and JSON-LD URL agree after following the redirect.

Rollback: restore the previous Vercel primary-domain selection and redeploy the prior application release. Do not remove either domain assignment until TLS and redirect behavior have been rechecked.

## 3. Google Search Console — owner action

1. Verify the Domain property for `raphaelmansueto.com` so both host variants remain observable.
2. Submit `https://raphaelmansueto.com/sitemap.xml` after the domain change.
3. Inspect and request indexing for:
   - Homepage
   - All three case studies
   - Engineering index
   - All published engineering notes
4. For each priority URL, record:
   - Last crawl date
   - User-declared canonical
   - Google-selected canonical
   - Indexing status and exclusion reason, if any
5. Recheck the Pages report weekly until the new routes and canonical host settle.
6. Monitor Core Web Vitals field data separately from local lab measurements.
7. Review query and page impressions monthly. Do not interpret delayed recrawling or stale snippets as an application regression without checking the crawl date.

## 4. External entity synchronization — owner action

Use one public positioning line where the surface allows it:

> Senior Full-Stack Engineer · AI Integrations

Keep the official VISEO employment title factual where background-check context requires it. Present HustleWing as one Full-Stack AI Integration Engineer employment chapter, with Ample and Vectle contributing evidence rather than separate employers.

- Update LinkedIn headline, About, current portfolio URL, and HustleWing experience narrative.
- Redirect the legacy `raphaelmans.github.io` portfolio to the canonical site if repository control allows it. Otherwise replace its homepage with a short deprecation notice and canonical portfolio link.
- Update the known Vercel Community profile or “Hire me” post if editing remains available.
- Search Raphael's name and the old titles quarterly; record any controllable profile that still uses `Lead Front-End Engineer`, fragmented employer/project identities, or an obsolete portfolio URL.
- Keep GitHub profile, résumé, portfolio, and professional biographies aligned on name, specialty, employer chronology, and canonical site URL.

## 5. Engineering-content operating rule

- Keep the current collection individually authored and evidence-led.
- Do not publish role/location, technology/location, stack-combination, or other generated keyword matrices.
- Consolidate pages that answer the same intent with the same evidence.
- Review author, dates, support links, technical claims, limitations, metadata, and structured data before publication.

Programmatic expansion remains closed until both conditions are true:

1. At least 12 distinct, verified, evidence-backed topics exist.
2. Search Console shows recurring impressions or queries for a coherent topic pattern.

Meeting those conditions does not authorize automatic expansion. Create a separate OpenSpec change defining the template, data source, URL inventory, differentiation checks, internal linking, rollout limit, monitoring, maintenance owner, and rollback plan before generating any page matrix.
