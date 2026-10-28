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

Metadata and EducationalOrganization JSON-LD include only known facts. **SEO limitation:** this is a client-rendered SPA with one shared URL per language. Crawlers that do not execute JavaScript, and social preview scrapers, may only see the default English shell metadata. A future prerendering or SSR upgrade should produce `/en/...` and `/ar/...` documents with per-route metadata, canonical and hreflang links, sitemap, and an approved social image. A nonexistent SPA route displays a 404 screen but static hosts may return HTTP 200; configure host-level status handling or SSR when true HTTP 404 responses are needed.

## Browser QA

The browser scripts use the locally installed Chrome, or a custom `CHROME_PATH`:

```sh
# Start npm run dev in another terminal first
npm run check:interactions
npm run check:browser
```

`check:interactions` covers catalog search/filter/reset, course details, course preselection, required and guardian validation, consent, disabled WhatsApp configuration, Arabic metadata, persistent preferences, mobile navigation, keyboard FAQ, and a simulated configured WhatsApp URL. It never sends a message or persists a business number.

`check:browser` visits all routes at 320, 375, 430, 768, 1024, 1440, and 1920px in English/Arabic and dark/light, checks document overflow and runtime errors, runs axe WCAG A/AA checks on the principal screens, and saves screenshots and results under `artifacts/`. Automated checks complement manual accessibility review; they do not certify WCAG compliance.

See `artifacts/validation.md` for the recorded results and limitations.
