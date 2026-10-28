# Validation results

Verified 28 October 2026 (Africa/Cairo) using Node v24.17.0 and Google Chrome 156.0.8078.47.

| Check                        | Result                                                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `npm run lint`               | Pass, no errors or warnings                                                                |
| `npm run typecheck`          | Pass                                                                                       |
| `npm run build`              | Pass; deployable static output in `dist/`                                                  |
| `npm audit --omit=dev`       | Zero reported vulnerabilities                                                              |
| Course-data assertions       | All supplied levels, sessions, hours, and prices match exactly; every session is two hours |
| `npm run check:interactions` | Pass                                                                                       |
| Responsive matrix            | 252 combinations; zero document overflow; zero runtime errors                              |
| axe WCAG A/AA checks         | 20 route/language/theme checks; zero reported violations after fixes                       |
| Production preview           | All 10 tested route URLs render exactly one main heading; zero browser runtime errors      |
| Visual review                | Desktop dark hero, complete desktop homepage, and Arabic light mobile layout inspected     |

Responsive matrix: 9 URLs (`/`, `/courses`, four course details, `/about`, `/contact`, `/missing`) × 7 viewport widths (320, 375, 430, 768, 1024, 1440, 1920) × English/Arabic × dark/light. The rotated hero orbit initially caused narrow-screen overflow; its actual dimensions were reduced. No global horizontal overflow hiding was applied.

Accessibility matrix: `/`, `/courses`, `/courses/react`, `/about`, `/contact` × English/Arabic × dark/light, with reduced motion. The final accessibility-only run reused the passing full responsive matrix after color-only adjustments to sample illustration text. Full results: `browser-report.json`; responsive results: `responsive-report.json`. Automated checks do not certify accessibility; manual screen-reader review remains useful.

Interaction coverage:

- Catalog search, no-results state, reset, difficulty and availability filtering.
- Expandable course levels and inquiry course preselection.
- Required fields, consent, guardian requirement for minors, and disabled WhatsApp sending when unconfigured.
- Existing validation errors update when switching to Arabic.
- Arabic RTL, translated page title, language persistence, theme persistence.
- Mobile navigation, Escape close, and keyboard FAQ expansion.
- Simulated configured WhatsApp handoff: correctly encoded URL and message, without sending a message or writing a business number to source.

Production preview additionally checked `/courses/missing` as a custom 404 screen. SPA fallback responses are HTTP 200; the README explains true HTTP 404 and SSR options.

Screenshots:

- `home-dark-desktop.png`: full desktop homepage.
- `home-mobile.png`: full mobile homepage.
- `home-arabic-light.png`: full Arabic/light mobile homepage.
- `hero-desktop.png`, `hero-arabic-mobile.png`: viewport captures from production preview.

Not verified externally: an actual WhatsApp message delivery, real social/email accounts, a remote hosting deployment, screen-reader behavior, or search-engine indexing. Contact details are intentionally empty; no fabricated testimonials, ratings, credentials, or academy statistics are used.
