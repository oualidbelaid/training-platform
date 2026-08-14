# Development Roadmap

| #   | Milestone | Status |
| --- | --- | --- |
| M0 | Project Foundation | **Done** |
| M1 | Premium Design System & Visual Identity | **Done** |
| M2 | Home Page | **Done** |
| M3 | Training Catalog + Training Details | **Done** |
| M4 | Remaining Content Pages (About, Trainers, Testimonials, Partners, Success Stories, Events, Articles, FAQ, Industries, Solutions for Companies) | **Done** |
| M5 | Lead Generation Forms (Request Info, Request Quote, Contact, Register Interest, Consultation) | **Done** |
| M6 | 3D & Advanced Scroll Animation Pass | **Done — reviewed and approved as-is** |
| M7 | SEO Pass (full metadata, structured data, sitemap, robots.txt) | **Done** |
| M8 | Accessibility & Responsive Audit | Not started |
| M9 | Performance Audit (Lighthouse > 90) | Not started |
| M10 | Full Test Coverage Pass | Not started |
| M11 | Documentation Finalization | Not started |
| M12 | Dolibarr Integration | Not started — blocked on auth-strategy decision, see `DOLIBARR_GUIDE.md` |

---

# M0 — Project Foundation

**Status: DONE**

Implemented:

- React + TypeScript + Vite foundation
- Project configuration
- Application shell
- Design token foundation
- i18n architecture
- French / English / Arabic
- LTR / RTL support
- Mock API architecture
- Mock → Repository → Service → UI data flow
- Training domain foundation
- DTOs
- Mappers
- Repository pattern
- Service layer
- Motion foundations
- 3D foundations with performance gating
- Initial routing
- Error handling foundations
- Testing foundations
- Documentation foundations

No real Dolibarr connection was implemented during M0.

See:

- `ARCHITECTURE.md`
- `CLAUDE.md`

---

# M1 — Premium Design System & Visual Identity

**Status: DONE**

Implemented:

- Complete Design System
- ISTAM visual identity foundation
- Color tokens
- Semantic color system
- Typography system
- Responsive typography
- Layout primitives
- UI primitives
- Buttons
- Links
- Cards
- Glass panels
- Form controls
- Badges
- Avatars
- Images
- Dividers
- Section headings
- Stack / Grid
- Motion primitives
- RevealOnScroll
- TiltCard
- FloatingElement
- Responsive behavior
- RTL support
- Accessibility foundations
- Local FontAwesome integration

Documentation:

- `docs/DESIGN_SYSTEM.md`
- `docs/COMPONENT_GUIDE.md`
- `docs/ANIMATION_GUIDE.md`
- `docs/TRANSLATION_GUIDE.md`

Quality gates passed:

- TypeScript
- oxlint
- Vitest
- Production build
- RTL verification
- Accessibility verification

---

# M2 — Home Page

**Status: DONE**

The Home Page has been implemented and visually refined.

## Main sections

Implemented/refined:

- Hero
- Training discovery
- Professional development storytelling
- Featured training
- Notre équipe / Formateurs
- Ils nous font confiance
- Événements / Prochains rendez-vous
- Location / Nous trouver
- Testimonials
- CTA sections
- Footer

## ISTAM Branding

Implemented:

- ISTAM company branding
- Client logo
- Brand colors adapted to ISTAM
- Centralized logo/media architecture
- Footer branding
- Professional visual identity

## Photography

Replaced abstract/SVG visuals with professional photography for:

- Trainers
- Events
- Training-related content

Images are structured so they can later be replaced with official
ISTAM-owned images without modifying UI components.

## Notre équipe

Implemented:

- Real professional trainer photographs
- More trainers
- Compact trainer cards
- Responsive trainer grid
- Professional trainer profiles
- Existing motion behavior preserved

## Ils nous font confiance

Implemented:

- Trust/logo section
- Continuous automatic horizontal logo scrolling
- Seamless infinite marquee
- Responsive behavior
- Reduced-motion fallback

## Événements

Implemented:

- Real professional event photography
- Existing event card design preserved
- Image replacement architecture
- Responsive images
- Existing animation preserved

## Location

Implemented:

- OpenStreetMap
- Leaflet
- ISTAM location
- Responsive map
- No Google Maps API dependency

## Language Selector

Implemented:

- French
- English
- Arabic
- Compact language selector
- Icon + language name
- Mobile responsive dropdown
- RTL support
- Keyboard accessibility

## Scroll Storytelling

Implemented/refined:

- "Des personnes qui grandissent"
- Scroll-driven content changes
- Image transitions
- Text transitions
- Correct image visibility
- Responsive behavior
- Top spacing
- Reduced-motion support

## Footer

Implemented:

- Correct ISTAM logo
- Responsive logo behavior
- Existing footer design preserved

## Important Design Decision

The Home Page is now considered the **APPROVED VISUAL BASELINE**.

Future milestones must reuse this visual language.

Do NOT redesign the Home Page unless explicitly requested.

---

# M3 — Training Catalog + Training Details

**Status: DONE**

Built the full training-discovery experience on top of the existing Mock Data → DTO → Repository → Service → Hook → UI chain — no new architectural layer, the same pattern every domain (Training, Trainer, Category, Testimonial, Event) already followed since M0.

## Route decision

Implemented as `/trainings` + `/trainings/:slug`, **not** `/formations/:slug` as originally sketched above. Every link built across the Home Page since M2 (Navbar, Footer, `CategoryTile`, CTAs) already points at `/trainings`; switching the URL segment would have meant touching the *approved* Home Page just to rename a route, for no user-facing benefit. `/formations` remains a reasonable French-language alternative to revisit later (e.g. at the M12 Dolibarr integration, if the real system expects it), but wasn't worth the churn now.

## Training Catalog (`TrainingCatalogPage`, `/trainings`)

- Search (title/summary, active language, case-insensitive) + category/format/level filters + sort (relevance/duration) — all via `TrainingFilters`, all synced to the URL (`useSearchParams`), so results are shareable/bookmarkable and back-button-correct.
- `MockTrainingRepository.getAll()` extended to actually apply `categoryId`/`format`/`level`/`search`/`sortBy` server-side (mock-side), not just paginate — a real `TrainingListParams` contract the future `DolibarrTrainingRepository` implements against.
- Training cards reuse the existing `TrainingCard` (no new card component) — real photography, category/format badges, duration, "Learn more" CTA only.
- `Pagination`, `EmptyState`, `ErrorState`, `LoadingState` — all pre-existing or newly-generalized primitives, no one-off page-specific states.
- No cart, no checkout, no "Buy now" — confirmed absent by construction (the catalog never imports anything payment-related).

## Training Details (`TrainingDetailsPage`, `/trainings/:slug`)

Hero (title/category/format/level/duration + image + Request Information/Request a Quote CTAs) → description → objectives → program (numbered modules) → methodology → trainer(s) (`TrainerPreviewCard`, resolved via the new `useTrainers()` hook) → FAQ (`Accordion`) → testimonials for this training (filtered by `trainingId`) → related trainings (same category) → closing CTA panel. A sticky sidebar carries duration/format/level, target audience, prerequisites, and upcoming sessions (date + location). Explicit loading/error/not-found branches — a bad slug gets a real "training not found" state with a link back to the catalog, never a blank page.

## Data model extension

`Training` (entity + DTO + mapper) grew `description`, `objectives`, `targetAudience`, `prerequisites`, `program`, `methodology`, `faq`, `sessions` — all authored for the existing 6 mock trainings in fr/en/ar. New shared utility: `zipLocalizedText()` (turns three parallel `*_fr`/`*_en`/`*_ar` string arrays into `LocalizedText[]`), covered by its own unit test.

## Bug fixed along the way

`Select` unconditionally set `defaultValue=''`, which crashes React the moment a caller also passes a controlled `value` — exactly what the filter toolbar needed. Fixed to only fall back to `defaultValue` when the caller isn't controlling the field; existing RHF-based (uncontrolled) usages are unaffected.

## New reusable primitives

`SearchBar`, `Pagination`, `Accordion` (native `<details>`/`<summary>`, no custom JS widget), `Breadcrumb` — all in `src/components/ui/`, all usable outside the Catalog/Details pages when later milestones need them.

## Not done in M3 (by design)

- No Dolibarr connection (M12).
- Request Information / Request a Quote / Contact links point at real routes that don't exist yet (M5) — same "link now, build later" pattern the Home Page's CTAs have used since M2.
- No live-browser QA — see the M3 completion report for the honest disclosure (same tooling limitation as every pass since the branding-refinement phase).

---

# M4 — Remaining Content Pages

**Status: DONE**

Built the 10 remaining content pages on the same Mock Data → DTO → Mapper → Repository → Service → Hook → UI chain every domain has followed since M0 — no new architectural layer. All 10 pages reuse the approved ISTAM Design System (M1) and the approved Home Page visual language (M2); none of the "do not redesign" pages (Home, Catalog, Details, Header, Footer, cards, filters, Trust section, Events components, Location, Language selector) were touched beyond one one-line link fix (see "Route decisions" below).

## Pages implemented

| Page | Route | Data source |
| --- | --- | --- |
| About | `/about` | Static copy in `about.json` (mission/vision/values/approach/figures) — not a mock-data domain, since there's no queryable collection here, the same reasoning the Home Page's own sections already follow |
| Trainers | `/trainers` | Existing `useTrainers()` + `TrainerPreviewCard` — zero new domain code |
| Testimonials | `/testimonials` | Existing `useTestimonials()` + `TestimonialCard` (mock data expanded 3 → 7 entries for a fuller listing) |
| Partners | `/partners` | New `Partner` domain + new `PartnerCard` (Home's `TrustLogosSection` marquee is untouched; this is a separate, additive component) |
| Success Stories | `/success-stories` | New `SuccessStory` domain (client/industry/challenge/approach/results) + new `SuccessStoryCard` |
| Events | `/events` | Existing `Event` domain, extended with `getAll()` (upcoming **and** past — previously only `getUpcoming()` existed); mock data grew 3 → 5 events, 2 of them past-dated, to exercise the split |
| Resources (Articles) | `/resources`, `/resources/:slug` | New `Article` domain (list + `getBySlug`) + new `ArticleCard`; details page mirrors `TrainingDetailsPage`'s loading/error/not-found branch shape |
| FAQ | `/faq` | New `Faq` domain, grouped by a language-agnostic `categoryKey`; category filter reuses `FilterSelect` (the M3 filter-refinement dropdown) as-is; questions render through the existing `Accordion` |
| Industries | `/industries` | New `Industry` domain (same minimal shape as `Category`) + new `IndustryTile`, presented as non-interactive content-taxonomy tiles, not a catalog filter |
| Solutions for Companies | `/solutions-for-companies` | Static copy in `solutions.json` (approach/needs analysis/custom programs/formats/learning paths/business impact/process) — same reasoning as About |

## Route decisions

Slugs are English, kebab-case, matching the `/trainings` precedent from M3. `/about`, `/trainers`, `/events` and `/resources` were **not free choices** — the Navbar and Footer already hard-linked to those exact paths since M2/M3, so using them is what let this milestone ship without touching Header/Footer markup. The one exception: Navbar's "Solutions entreprises" nav item pointed at `#companies` (a same-page anchor into the Home Page's `CompaniesSection`, which itself already links to `/solutions-for-companies` — the intended slug was already legible from that existing code). Fixed the Navbar item to point at the new page directly, since `#companies` only made sense from `/`; Home's `Hero` secondary CTA still scrolls to the in-page teaser section as before (untouched, working as designed).

## New reusable primitives

`CtaBanner` (`src/components/ui/`) — the "CTA (standalone)" component `COMPONENT_GUIDE.md` had flagged as not built yet. Reuses `FinalCtaSection`'s exact gradient-panel visual language but with a plain `RevealOnScroll` fade/rise instead of GSAP ScrollTrigger (M4 is scoped to "subtle existing motion only" — advanced scroll choreography is M6). All 10 pages end on this same panel.

## Data architecture additions

Five new domains, each following the identical DTO (snake_case, per-language suffix) → Mapper → Repository (interface + Mock implementation + factory) → Service → Hook → UI pipeline: `Partner`, `SuccessStory`, `Article`, `Faq`, `Industry`. `Event` was extended, not replaced, with `getAll()`; `getUpcoming()` also gained an explicit date filter it was implicitly relying on the mock data's all-future dates to fake before.

## i18n

10 new namespaces (`about`, `trainerPages`, `testimonials`, `partners`, `successStories`, `events`, `resources`, `faq`, `industries`, `solutions`) × fr/en/ar = 30 new locale files, registered in `src/i18n/index.ts` alongside the existing 5. No hardcoded user-visible strings; no changes to the i18n *architecture* itself. (`trainerPages`, not `trainers`, to avoid colliding with the pre-existing `trainings` namespace — the two aren't related despite the similar name.)

## Not done in M4 (by design)

- No Dolibarr connection (M12).
- No live-browser QA — same disclosed tooling limitation as every prior pass; verified through code review, TypeScript, lint, tests and build instead.
- No advanced scroll choreography (M6) or full SEO pass beyond per-page `Seo` (title/description/canonical) — that's M7.

---

# M5 — Lead Generation Forms

**Status: DONE**

Built the 5 lead-generation experiences on a shared form architecture (one `Lead` domain, one set of reusable schema/field/state pieces) rather than 5 unrelated forms, on the same Mock Data → DTO → Mapper → Repository → Service → Hook → UI chain every domain has followed since M0 — the first domain in that chain to be a **write** path instead of a read path.

## Forms implemented

| Form | Route | Notes |
| --- | --- | --- |
| Request Information | `/request-information` | Training preselected from `?training=<slug>` (the query param `TrainingDetailsPage`'s CTA already passed since M3) |
| Request a Quote | `/request-quote` | Same preselection; adds participants count, preferred format/date, location |
| Contact | `/contact` | Adds subject; keeps ISTAM's real address/phone/email/hours and the `Map`/`LOCATION` pieces already used on the Home Page, in this page's own layout/copy |
| Register Interest | `/register-interest` | New entry point added to `TrainingDetailsPage`'s sidebar; same training preselection |
| Consultation | `/consultation` | New secondary CTA on `SolutionsForCompaniesPage` (was "Contact us", now "Demander une consultation" — Contact remains reachable everywhere else) |

## Form architecture

`Lead` (`types/entities/lead.ts`) is one shared entity with a `formType` discriminator and every field any of the 5 forms collects, each optional except what a given form actually requires — CLAUDE.md's own guidance ("don't over-engineer if a shared Lead DTO can safely represent the different request types") taken literally rather than 5 near-identical types. `LeadRequestDTO` is the same shape's outbound (write) mirror; `LeadMapper.toDTO()`/`fromResultDTO()` are the write-path counterpart to every other domain's `fromDTO()` mapper.

Shared, not duplicated: `buildContactFieldsSchema(t)` (Zod, factory not static export — see i18n below) for the common personal-info fields, extended per form with only the fields it needs; `HoneypotField`, `FormSection`, `LeadFormSuccess`, `TrainingSelectField` (`src/features/leads/components/`); `useSubmitLead()` (`src/features/leads/hooks/`), a `useMutation` wrapper — the first mutation hook in the codebase, every prior hook being a `useQuery`. Each page still writes its own field layout/JSX directly (React Hook Form + the Design System's existing `Input`/`Textarea`/`Select`/`Checkbox`/`RadioGroup`/`Button`), since the 5 forms' fields genuinely differ — that variation isn't duplication.

## Validation

React Hook Form + Zod (`@hookform/resolvers/zod`), already a project dependency, exercised for the first time here. `noValidate` on every `<form>` — Zod is the real, only validation layer; the browser's native constraint validation is fully disabled, not layered underneath it. Every text field enforces min/max length; email via `z.email()`; consent via `z.boolean().refine(v => v === true)`, never preselected.

**Bug found and fixed during this milestone**: `z.enum([...]).optional()` only accepts `undefined` for "no choice made," but an unselected native `<select>` resolves to `''` and an unchecked `RadioGroup` resolves to `null` (confirmed by direct inspection, not assumption) — neither is `undefined`, so every optional format/contact-method field was **permanently invalid at its own default state**, silently blocking every one of the 5 forms from ever submitting whenever that field was left untouched (the common case, since these fields are optional). Fixed with a shared `optionalEnum()` helper (`.nullable().optional().or(z.literal(''))`) and normalizing `'' | null` → `undefined` at the point each Lead payload is built. Covered by a dedicated regression test (`contact-fields.schema.test.ts`) asserting all three "no choice" shapes (`undefined`, `''`, `null`) validate successfully.

## Mock submission architecture

`MockLeadRepository.submit()` (`src/repositories/lead/`) simulates latency and resolves with a generated id/timestamp. A deterministic QA hook — submitting with the literal email `fail@istam-test.com` (exported as `SIMULATE_FAILURE_EMAIL`) — simulates a server failure on demand, so the error/retry UI is exercisable without making the mock randomly fail for real visitors. Swapping in a real API-backed repository later means adding one new class behind the same `LeadRepository` interface and flipping the factory in `repositories/lead/index.ts`, identical to every other domain's Mock → Dolibarr transition plan.

## Anti-spam

A honeypot field (`HoneypotField`) — off-screen, outside the tab order, never visible or reachable by a real user. Checked in `LeadService.submit()`, the one place this logic lives: a filled honeypot resolves successfully **without** calling the repository (indistinguishable from a real success to whatever filled it in; nothing actually reaches "the server"). Duplicate-submission prevention is the submit button's own `loading`/`disabled` state (`Button`'s existing `disabled={disabled || loading}`, wired to `mutation.isPending`). No third-party CAPTCHA, per spec.

## Success / error experience

Success: `LeadFormSuccess`, a shared `<output>` panel (implicit ARIA role "status", announced to assistive tech automatically) with a form-specific title/description and two next-action buttons — swaps in for the form on the same page, never a redirect. Error: the existing `ErrorState` component (already built in M0, reused as-is) with a retry button that resubmits the retained form data — nothing is cleared on failure, and no technical detail (stack trace, API error, internal id) is ever shown.

## i18n

One shared namespace, `leadForms` (field labels, placeholders, validation messages, action labels, the neutral consent/privacy text), plus 5 small per-page namespaces (`requestInformation`, `requestQuote`, `contact`, `registerInterest`, `consultation` — seo/hero/success copy only) × fr/en/ar = 18 new locale files, registered in `src/i18n/index.ts`. Consent text is neutral and explicitly marked as replaceable with ISTAM's official legal wording later (spec's "do not invent legal claims").

## Not done in M5 (by design)

- No Dolibarr connection (M12) — `MockLeadRepository` only.
- No live-browser QA — same disclosed limitation as every prior milestone; verified through code review, TypeScript (both `tsc --noEmit` and `tsc -b`), lint, 53 passing tests, and production build instead.
- No advanced scroll choreography (M6) or full SEO pass beyond per-page `Seo` (title/description/canonical) — that's M7.
- No production-grade rate limiting/CAPTCHA — the honeypot + duplicate-submission guard is the frontend-ready foundation spec asked for; a production anti-spam service is a real-backend concern for M12.

---

# M6 — 3D & Advanced Scroll Animation

**Status: DONE — reviewed and approved as-is, no new work built**

M0–M2 already shipped the site's full advanced-motion layer as part of the Design System and Home Page milestones: `RevealOnScroll` (Framer Motion), `TiltCard`, `FloatingElement`, the GSAP `ScrollTrigger`-driven `ProfessionalDevelopmentSection` scroll-storytelling sequence and `CompaniesSection` glow parallax, the seamless CSS marquee in `TrustLogosSection`, and the React Three Fiber `HeroScene` (with a static fallback and `prefers-reduced-motion` support). Every subsequent milestone (M3–M5) reused this same motion vocabulary rather than inventing new choreography per page.

At the start of M7, this existing motion layer was explicitly reviewed against the M6 spec (premium scroll storytelling, 3D visual elements, parallax, layered transitions, section reveals, interactive elements, `prefers-reduced-motion` support, no decorative-only animation) and **approved as the final production animation layer** — no additional 3D scenes, no new ScrollTrigger sequences, and no new interactive elements were added. This is recorded here as an honest status update, not a claim that new M6-scoped implementation work happened during this pass. M7 (SEO) was explicitly scoped to preserve this layer unchanged — no animation, transition, timing, easing, or 3D file was touched.

---

# M7 — SEO

**Status: DONE**

Made the existing site (21 pages, all already rendering a baseline `<Seo title/description/canonicalPath>`) technically SEO-ready for production, without changing any approved visual design, layout, animation, or 3D behavior — a technical/metadata pass on top of the M0–M6 visual baseline, not a redesign.

## Architecture

Follows the same layered pattern every other domain in the app uses, extended with an SEO-specific mapper stage:

```
Training / Article / Event / Faq entity (existing, from the mock repository chain)
        ↓
lib/seo/structured-data.ts   — pure mapper fns → schema.org shape (never touches a DTO)
        ↓
components/seo/*Schema.tsx   — thin wrappers rendering <SchemaScript schema={...} />
        ↓
<head> (react-helmet-async)
```

`lib/seo/hreflang.ts` and `components/seo/Seo.tsx` follow the same "pure function → thin component" split for metadata (title/description/canonical/OG/Twitter/hreflang). Because every mapper takes the existing domain **entity** (the same object every page's hook already returns), swapping the Mock repositories for Dolibarr-backed ones later (M12) requires zero changes anywhere in the SEO layer — identical reasoning to every other mapper in the codebase.

## Metadata (`Seo.tsx`)

Extended (backward compatible — every one of the 21 existing call sites kept compiling unchanged): added optional `image`/`type` (`'website' | 'article'`) props, `og:url`, `og:image`, `og:locale` (mapped per language via `seoConfig.ogLocale`), `twitter:title/description/image`, and hreflang `<link>` tags (rendered automatically whenever `canonicalPath` is given). Canonical URLs were already query-string-safe pre-M7 — every page with filterable/param-driven state (`TrainingCatalogPage`, the lead forms' `?training=`) already hardcoded a bare `canonicalPath`.

## Multilingual SEO

The app has no server-side per-language routing (client-rendered SPA, language chosen via `localStorage`/browser detection). To give hreflang tags — and the sitemap — real URLs to point to without changing how real visitors browse or how the language switcher works, added `'querystring'` (`?lng=fr|en|ar`) as the **first, highest-priority** source in `i18n/index.ts`'s detection order. No in-app link, button, or the language switcher itself ever adds `?lng=` — it is only ever emitted in `<head>` hreflang alternates and `sitemap.xml`. `index.html`'s static `lang`/`dir` fallback was also corrected from a hardcoded `en`/`ltr` to `fr`/`ltr` (matching the real default language; `DirectionProvider` still corrects it client-side post-mount for other languages, as before).

## Structured data (JSON-LD)

`OrganizationSchema` (existing, enriched with `logo`) + 6 new components: `WebsiteSchema` (Home only), `BreadcrumbSchema` (every page that renders the `Breadcrumb` UI component), `CourseSchema` (`TrainingDetailsPage`), `ArticleSchema` (`ArticleDetailsPage`), `EventSchema` (`EventsPage`, one per listed event), `FaqSchema` (`FaqPage` + each training's own FAQ section — one mapper function covers both, since `Faq` and `TrainingFaqItem` share the same `{question, answer}` shape). **Person schema for trainers was deliberately not built** — the trainer roster is a compact grid of short bios, not individual profile pages, so a Person schema per card was judged low-value relative to the effort; noted here as a considered exclusion, not a silent gap.

## Sitemap & robots.txt

Both are generated by the **same** build-time script, `scripts/generate-sitemap.ts` — run via `vite build --ssr` (not plain Node/`tsx`: the script transitively imports real image assets through `mocks/data/trainings.ts`/`articles.ts` → `config/media`, which only Vite's asset pipeline can resolve, and needs `import.meta.env` for `seoConfig`). Wired into `npm run build` as `tsc -b && npm run generate:sitemap && vite build`. Because both files are generated from the same `seoConfig.siteUrl`, they can never drift apart when a real production domain is assigned (`VITE_SITE_URL`) — a hand-authored static `robots.txt` would not pick that up automatically. Produces `sitemap.xml` with 29 URLs (17 static pages + 6 training slugs + 6 article slugs, sourced directly from the same mock data every page already renders — no duplicated slug list) with `xhtml:link` hreflang alternates per URL, and `robots.txt` (`Allow: /`, `Disallow: /_design-system`, pointing at the sitemap). Both files are build artifacts (gitignored), not hand-authored static files, per the "never commit build artifacts" rule.

## Semantic headings

Only 4 of 21 pages had a real `<h1>` before this pass (`TrainingDetailsPage`, `ArticleDetailsPage`, `DesignSystemPreviewPage`, `NotFoundPage`, plus Home's `Hero.tsx`, which already used `<motion.h1>`) — every other page opened with `SectionHeading`, which always rendered `<h2>`. Added an `as?: 'h1' | 'h2'` prop (default `'h2'`, so every other call site is unaffected) and set `as="h1"` on each page's first/hero heading. The CSS class stays identical (`text-h2 text-foreground`) regardless of tag — zero visual change.

## Image SEO

`Image` already supported `loading`/`fetchPriority` overrides; audited every page's above-the-fold hero image and added `loading="eager"` (Home's true LCP image also got `fetchPriority="high"`). Everything else keeps the existing lazy default. No `alt` text or decorative-image handling changed — that was already in place from earlier milestones.

## Internal linking

Audited every page listed in the CLAUDE.md spec for in-app reachability. Found 4 genuinely orphaned pages (reachable only via their own self-referencing `canonicalPath`, no in-app link anywhere): Testimonials, Partners, Success Stories, Industries. Fixed with the smallest possible additions, each mirroring an already-established pattern rather than inventing new navigation:

- Home's `TestimonialsSection` gained a "view all testimonials" link, matching the exact `Button`+`SectionHeading` row pattern `TrainersSection`/`EventsSection` already use.
- Home's `TrustLogosSection` gained a small "view our partners" text link below its description.
- `SolutionsForCompaniesPage` gained a small related-links row (Success Stories, Industries) just above its closing `CtaBanner` — the most thematically relevant existing page for a B2B audience evaluating corporate training, and additive only (no restructuring of the page's existing sections).

No changes to the approved Navbar or a Footer redesign — both explicitly out of scope for this pass.

## Config

`seoConfig.siteUrl` is now env-driven (`VITE_SITE_URL`, added to `env.ts`'s zod schema and `.env.example`), falling back to the existing placeholder (`https://www.example-training.com`) until a real domain is assigned — a real deployment needs zero code changes, only an env var.

## Testing

`lib/seo/hreflang.test.ts` and `lib/seo/structured-data.test.ts` (12 tests) — verifying hreflang link generation (one per language + `x-default`, no query string on `x-default`) and every structured-data mapper's output shape (Course with/without sessions, Article, Event in-person vs. online, FAQPage, BreadcrumbList).

## Quality gate

`tsc -b` clean, `oxlint` clean, full Vitest suite (22 files / 65 tests) passing, production build succeeding including `generate:sitemap` (29 URLs) and `robots.txt` generation.

## Not done in M7 (by design)

- No Dolibarr connection (M12).
- No live-browser QA — same disclosed tooling limitation as every prior milestone; verified through code review, TypeScript, lint, tests, and build instead.
- `apple-touch-icon` deliberately not added — no square icon-only ISTAM asset exists (only a wide mark+wordmark lockup, per `config/brand.ts`'s own comment); forcing that into a square slot would itself be an unauthorized visual-asset invention.
- The `env-*.js` bundle chunk grew (~69KB → ~340KB) after adding sitewide SEO components, due to Rollup's automatic chunk consolidation (the new components share `react-router-dom` reachability with more of the app now). Investigated and confirmed this is normal Rollup behavior, not a regression introduced by unnecessary code — bundle-splitting/Lighthouse work belongs to M9, not M7.

---

# M8 — Accessibility & Responsive Audit

**Status: NOT STARTED**

Perform a complete audit.

Verify:

- WCAG-conscious implementation
- keyboard navigation
- focus states
- screen-reader behavior
- semantic HTML
- forms
- contrast
- images
- RTL
- mobile
- tablet
- desktop

Test multiple viewport sizes.

---

# M9 — Performance Audit

**Status: NOT STARTED**

Target:

**Lighthouse > 90**

Audit:

- LCP
- CLS
- INP
- JavaScript
- CSS
- images
- fonts
- 3D
- animations
- lazy loading
- code splitting
- bundle size

Do not sacrifice UX quality unnecessarily.

---

# M10 — Full Test Coverage

**Status: NOT STARTED**

Expand testing across:

- components
- services
- repositories
- hooks
- forms
- validation
- routing
- i18n
- RTL
- animations where testable
- critical user flows

Run:

- unit tests
- integration tests
- appropriate end-to-end tests

---

# M11 — Documentation Finalization

**Status: NOT STARTED**

Finalize:

- Architecture documentation
- Design System documentation
- Component Guide
- Animation Guide
- Translation Guide
- Image/media strategy
- Development Guide
- Deployment Guide
- Environment configuration
- Content management guide
- Testing guide

Ensure documentation matches the actual implementation.

---

# M12 — Dolibarr Integration

**Status: NOT STARTED**

Final integration with the client's Dolibarr ERP.

The frontend must consume Dolibarr through a controlled API layer.

Expected architecture:

React UI
↓
Hooks
↓
Services
↓
Repositories
↓
API Client
↓
Dolibarr REST API

Do NOT expose Dolibarr credentials in the frontend.

Authentication strategy must be finalized before implementation.

See:

`DOLIBARR_GUIDE.md`

Potential data domains:

- Trainings
- Categories
- Trainers
- Events
- Companies
- Contact/lead information
- Other approved ERP data

Mock API must remain available for development/testing.

---

# MILESTONE RULE

Milestones must be completed sequentially.

Process:

READ
→ ANALYZE
→ PLAN
→ IMPLEMENT
→ TEST
→ LINT
→ TYPECHECK
→ RESPONSIVE REVIEW
→ ACCESSIBILITY REVIEW
→ PERFORMANCE REVIEW
→ DOCUMENT
→ REPORT
→ APPROVAL

Do NOT automatically start the next milestone after completing one.

Wait for explicit approval.

---

# CURRENT STATUS

M0 ✅
M1 ✅
M2 ✅
M3 ✅
M4 ✅
M5 ✅
M6 ✅ (reviewed and approved as-is, no new work built — see M6 writeup above)
M7 ✅

CURRENT NEXT MILESTONE:

## M8 — Accessibility & Responsive Audit

The Home Page, Training Catalog/Details, all M4 content pages, all M5 lead-generation forms, the M6 motion/3D layer, and the M7 SEO layer are approved.

Future work must preserve the existing ISTAM visual identity and
approved page designs.