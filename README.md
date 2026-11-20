# MindCode Academy

A complete frontend-only bilingual programming academy website, built directly in this repository with React, TypeScript, Vite, Tailwind CSS v4, React Router, Motion, Lucide, i18next, React Hook Form, and Zod.

## Run locally

Use Node.js **22.12 or newer** (Node 24 LTS recommended).

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally http://localhost:5173).

```sh
npm run typecheck
npm run lint
npm run build
npm run preview
```

## Routes

- `/`: complete marketing homepage
- `/courses`: searchable catalog with track, difficulty, and availability filters
- `/courses/html`, `/courses/css`, `/courses/javascript`, `/courses/react`: data-driven course details, level outlines, prerequisites, and related courses
- `/courses/scratchjr`, `/courses/scratch`, `/courses/python`: the shared course detail template, initially selecting the first level.
- `/courses/{scratchjr|scratch|python}/level-1` and `/courses/{scratchjr|scratch|python}/level-2`: six individually addressable level pages with Egyptian Arabic content, curriculum, project, prerequisites, pricing, and course/level-specific inquiries. Invalid levels show the existing 404 screen.
- `/about`: academy story, teaching approach, and an honest instructor-profile placeholder
- `/contact`: enrollment inquiry and proposed Cairo teaching slots
- All unmatched paths, including invalid course slugs: custom 404

## Update business information

Edit `src/config/academy.ts`:

- `whatsapp`: international number containing **digits only**, without `+`, spaces, or punctuation. Leave empty until the real academy number is available.
- `phone`, `email`, `facebookUrl`, `instagramUrl`: add verified academy details; empty channels are visibly marked as not configured and do not create dead links.
- `slots`: editable bilingual proposed availability in `Africa/Cairo`. These do not represent active groups.
- `name`, `tagline`, `currency`, and `teachingFormat`: academy configuration.

WhatsApp sending is disabled until a valid number is configured. Form validation can still be tried. On validation, the app prepares an encoded message; the learner chooses **Continue to WhatsApp** and sends it there. This site does not store submissions, send email, run analytics, or use a backend. A guardian name and parental involvement/consent are required for learners under 18. Never add real personal information to tests or logs.

## Update courses and content

- `src/data/courses.ts`: typed course prices, sessions, hours, level outlines, prerequisites, bilingual descriptions, and track availability. Prices are **per level, per student**, not for the full course. Course cards and detail pages share this source.
- `src/data/programmingPrograms.ts`: the three new programs, extending the existing course schema. Each has two levels. ScratchJr: 700 EGP / 4 sessions / 8 hours per level; Scratch: 800 EGP / 4 sessions / 8 hours; Python: 1,000 EGP / 5 sessions / 10 hours. Every session is two hours. Ages are recommendations; ScratchJr includes short activities and regular breaks. These prices are per student and level for small-group online learning. Existing course content and prices are preserved.
- All courses use the same `CourseCard` and `TechIcon` in `src/components/ui.tsx`, the same `src/pages/CourseDetails.tsx`, and the same `src/components/courses/CourseCurriculum.tsx`. The programs use existing Lucide icons (Blocks, Gamepad2, Terminal) and the original course styles. The duplicate program cards, page, stylesheet, and three unused illustrations were removed. Python topics follow the specified [W3Schools reference](https://www.w3schools.com/python/) and remain introductory.
- The owner confirmed the real regular prices for both levels: ScratchJr 900 EGP, Scratch 1,000 EGP, Python 1,200 EGP. They are stored in the existing `oldPrice` field at program and level scope, replacing the pending proposal values. Selling prices remain 700 / 800 / 1,000 EGP. The existing pricing UI shows the regular price with strikethrough on cards, detail pricing, curriculum prices, and the mobile enrollment bar. A level's `oldPrice` takes precedence over its course's value. Existing courses' prices and discounts are unchanged.
- `src/data/faq.ts`: bilingual FAQ.
- `src/data/testimonials.ts`: add genuine, authorized testimonials; the empty array shows an honest community empty state. No invented ratings, names, or outcomes are published.
- `src/i18n/index.ts`: shared interface translations. Page-specific bilingual copy is colocated in `copy(English, Arabic)` calls; structured content uses `{ en, ar }` objects. These all respond to the i18next language setting.
- `src/lib/enrollment.ts`: reusable bilingual validation schema and safe WhatsApp message URL builder.
- `src/components/ui.tsx`: shared logo, buttons, section headings, course cards, accessible accordions, motion wrapper, and localization helper.
- `src/styles/index.css`: semantic theme tokens, responsive layouts, Arabic typography, and reduced-motion support.

The supplied brand artwork lives in `public/mindcode_logo_dark.png` and `public/mindcode_logo_light.png`. Shared logo components frame the original artwork for the navigation, footer, hero, and About page, switching automatically with the website theme. Browser favicons use the matching supplied image for the system color scheme. The original image files are preserved unchanged.

## Deploy

Run `npm run build`, then deploy the generated **`dist/`** directory to a static host. Configure all application routes to fall back to `index.html`:

- Netlify / Cloudflare Pages: `public/_redirects` is copied into `dist`.
- Vercel: the included `vercel.json` provides an SPA rewrite. Select Vite, build command `npm run build`, output `dist`.
- Nginx: `try_files $uri $uri/ /index.html;` in the location serving this app.

The application assumes deployment at the domain root. For subdirectory hosting, configure Vite's `base` and BrowserRouter's `basename` together. No hosting account or remote deployment was created by this local repository task.

## Accessibility, preferences, and performance

Semantic landmarks, one main heading per page, skip link, visible focus states, native keyboard-operable disclosure controls, labeled form errors, conditional guardian validation, mobile navigation with Escape close, logical RTL layout, and reduced-motion support are included. Theme and language persist in localStorage; initial theme follows the operating system. A head script sets preferences before the first render. Storage restrictions gracefully fall back to session behavior.

Secondary pages are lazy-loaded. Inter and Cairo are loaded through Google Fonts with `display=swap`; system fonts are the fallback if offline. No external imagery is required.

Metadata and EducationalOrganization JSON-LD include only known facts. The shared SEO component sets per-route titles, descriptions, canonical URLs, Open Graph URLs and the existing brand image; `academy.siteUrl` is the public canonical origin. **SEO limitation:** this is a client-rendered SPA with one shared URL per language. Crawlers that do not execute JavaScript, and social preview scrapers, may only see the default English shell metadata. Prerendering or SSR would be needed for per-route metadata in the initial HTML. A nonexistent SPA route displays a 404 screen but static hosts may return HTTP 200; configure host-level status handling or SSR when true HTTP 404 responses are needed.

## Browser QA

The browser scripts use the locally installed Chrome, or a custom `CHROME_PATH`:

```sh
# Start npm run dev in another terminal first
npm run check:interactions
npm run check:browser
npm run check:courses
npm run check:programs
```

`check:interactions` covers catalog search/filter/reset, course details, course preselection, required and guardian validation, consent, disabled WhatsApp configuration, Arabic metadata, persistent preferences, mobile navigation, keyboard FAQ, and a simulated configured WhatsApp URL. It never sends a message or persists a business number.

`check:browser` visits all routes at 320, 375, 430, 768, 1024, 1440, and 1920px in English/Arabic and dark/light, checks document overflow and runtime errors, runs axe WCAG A/AA checks on the principal screens, and saves screenshots and results under `artifacts/`. Automated checks complement manual accessibility review; they do not certify WCAG compliance.

See `artifacts/validation.md` for the recorded results and limitations.

`check:programs` covers the six levels, unique identifiers, selling/confirmed regular prices, sessions/hours, original eight course prices and discounts, shared card structure/styles, icon rendering, shared detail structure, level progression, metadata, keyboard curriculum controls, and inquiry preselection/reload/WhatsApp URL generation. It checks original and new pages at 360, 390, 768, 1024 and 1440px in Arabic RTL and both themes (60 new level-page cases) and runs scoped axe accessibility checks. The existing interaction suite also covers English and language switching. It generates side-by-side card comparisons and desktop/mobile detail comparisons under `artifacts/ui-consistency-*.png`. No message is sent. Set `TEST_URL` if Vite uses a port other than 5173.

### Course-level implementation files

Added: `src/data/programmingPrograms.ts` and `scripts/check-programming-programs.mjs`. Removed the previous separate program card/page/styles and illustration assets after checking references.

Course implementation updates: `src/data/courses.ts` (schema/catalog), `src/components/ui.tsx` (shared cards/icons), `src/components/courses/CourseCurriculum.tsx` (selected-level expansion and program content), `src/pages/Courses.tsx` (filters/availability), `src/pages/CourseDetails.tsx` and `src/main.tsx` (shared detail routing), `src/components/SEO.tsx` and `src/config/academy.ts` (canonical metadata), the existing test scripts, `package.json`, and this README. The unused stylesheet import was removed from `src/styles/index.css`; the original stylesheet content is unchanged. Dependencies, payment configuration, existing course prices, and the configured WhatsApp number were not changed. Generated screenshots and QA reports are in `artifacts/`.

Corrective UI refactor files: `src/components/ui.tsx`, `src/pages/CourseDetails.tsx`, `src/components/courses/CourseCurriculum.tsx`, `src/data/courses.ts`, `src/data/programmingPrograms.ts`, `scripts/check-programming-programs.mjs`, `scripts/check-professional-courses.mjs`, and this README. The program stylesheet import, duplicate `ProgramCard`, `ProgramDetails.tsx`, `program-details.css`, and all three `public/programs` illustrations were removed. Existing unrelated work was retained.

Local corrective verification: `check:programs` passed 60 level-page cases, shared card/template structure and styles, icon rendering, all six inquiry handoffs, metadata, level navigation, original eight selling/original price regression, keyboard controls and scoped axe checks. No overflow, runtime errors or scoped accessibility violations were found. `check:interactions` passed. `check:courses` passed 96 responsive cases plus original professional-course curricula, pricing/totals, filters, enrollment/reload/WhatsApp handoff and scoped accessibility. Its navigation checks now wait for DOM readiness and the actual UI rather than unrelated external-resource completion. The general `check:browser` suite was not rerun for this correction; its previous interrupted run is not a passing result. Review `artifacts/programming-programs-report.json` and `artifacts/professional-courses-report.json` for the completed runs.

Visual review: all three `ui-consistency-cards-git-github-*.png` captures show the existing card next to a new program card with matching dimensions, spacing, icon containers, typography and CTA alignment. `ui-consistency-details-html-python-390.png` and `ui-consistency-details-html-python-1440.png` compare the shared original/new detail template on mobile and desktop. The educational sections extend the shared template; the original course stylesheets are unchanged. No messages, commits, pushes, database changes or deployments were made.

Final source checks: `npm run lint`, `npm run typecheck`, `npm run build`, and `git diff --check` passed. The temporary QA preview was stopped after verification; use `npm.cmd run dev` from PowerShell to review locally, or `npm.cmd run preview` to serve the production build.
