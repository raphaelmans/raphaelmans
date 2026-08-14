# Search surface baseline

Captured before implementation on 2026-08-12. The application-authored origin was already the apex domain; production redirected that origin to `www`, which is the deployment mismatch this change addresses.

| Route | Rendered title | Description length | Canonical / Open Graph / JSON-LD / sitemap / `llms.txt` URL |
| --- | --- | ---: | --- |
| `/` | `Senior Full-Stack Engineer · AI Integrations \| Raphael Mansueto` | 167 | `https://raphaelmansueto.com` |
| `/work/ample-news` | `Ample News Production AI Workflow Case Study \| Raphael Mansueto` | 195 | `https://raphaelmansueto.com/work/ample-news` |
| `/work/kudoscourts` | `KudosCourts Realtime Reservation Architecture Case Study \| Raphael Mansueto` | 184 | `https://raphaelmansueto.com/work/kudoscourts` |
| `/work/cravingsph` | `CravingsPH Transactional Restaurant Operations Case Study \| Raphael Mansueto` | 162 | `https://raphaelmansueto.com/work/cravingsph` |

Additional baseline facts:

- Homepage ProfilePage JSON-LD used the apex URL and a literal `dateModified` of `2026-08-11`.
- Case-study Article JSON-LD used the corresponding apex work URL but did not declare `mainEntityOfPage` or `image`.
- The sitemap and `llms.txt` contained all three case-study URLs on the apex origin.
- `llms.txt` used a separately maintained `Last reviewed: 2026-08-10` literal.
