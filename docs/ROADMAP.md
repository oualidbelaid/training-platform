# Development Roadmap

| #   | Milestone                                                                                                                                      | Status                                                                   |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| M0  | Project Foundation                                                                                                                             | **Done**                                                                 |
| M1  | Premium Design System & Visual Identity                                                                                                        | **Done**                                                                 |
| M2  | Home Page                                                                                                                                      | **Done**                                                                 |
| M3  | Training Catalog + Training Details                                                                                                            | **Done**                                                                 |
| M4  | Remaining Content Pages (About, Trainers, Testimonials, Partners, Success Stories, Events, Articles, FAQ, Industries, Solutions for Companies) | **Done**                                                                 |
| M5  | Lead Generation Forms (Request Info, Request Quote, Contact, Register Interest, Consultation)                                                  | **Done**                                                                 |
| M6  | 3D & Advanced Scroll Animation Pass                                                                                                            | **Done — reviewed and approved as-is**                                   |
| M7  | SEO Pass (full metadata, structured data, sitemap, robots.txt)                                                                                 | **Done**                                                                 |
| M8  | Accessibility & Responsive Audit                                                                                                               | **Done**                                                                 |
| M9  | Performance Audit (Lighthouse > 90)                                                                                                            | Not started                                                              |
| M10 | Full Test Coverage Pass                                                                                                                        | Not started                                                              |
| M11 | Documentation Finalization                                                                                                                     | Not started                                                              |
| M12 | Dolibarr Integration                                                                                                                           | Not started — blocked on auth-strategy decision, see `DOLIBARR_GUIDE.md` |

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

Implemented as `/trainings` + `/trainings/:slug`, **not** `/formations/:slug` as originally sketched above. Every link built across the Home Page since M2 (Navbar, Footer, `CategoryTile`, CTAs) already points at `/trainings`; switching the URL segment would have meant touching the _approved_ Home Page just to rename a route, for no user-facing benefit. `/formations` remains a reasonable French-language alternative to revisit later (e.g. at the M12 Dolibarr integration, if the real system expects it), but wasn't worth the churn now.

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

| Page                    | Route                            | Data source                                                                                                                                                                                               |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About                   | `/about`                         | Static copy in `about.json` (mission/vision/values/approach/figures) — not a mock-data domain, since there's no queryable collection here, the same reasoning the Home Page's own sections already follow |
| Trainers                | `/trainers`                      | Existing `useTrainers()` + `TrainerPreviewCard` — zero new domain code                                                                                                                                    |
| Testimonials            | `/testimonials`                  | Existing `useTestimonials()` + `TestimonialCard` (mock data expanded 3 → 7 entries for a fuller listing)                                                                                                  |
| Partners                | `/partners`                      | New `Partner` domain + new `PartnerCard` (Home's `TrustLogosSection` marquee is untouched; this is a separate, additive component)                                                                        |
| Success Stories         | `/success-stories`               | New `SuccessStory` domain (client/industry/challenge/approach/results) + new `SuccessStoryCard`                                                                                                           |
| Events                  | `/events`                        | Existing `Event` domain, extended with `getAll()` (upcoming **and** past — previously only `getUpcoming()` existed); mock data grew 3 → 5 events, 2 of them past-dated, to exercise the split             |
| Resources (Articles)    | `/resources`, `/resources/:slug` | New `Article` domain (list + `getBySlug`) + new `ArticleCard`; details page mirrors `TrainingDetailsPage`'s loading/error/not-found branch shape                                                          |
| FAQ                     | `/faq`                           | New `Faq` domain, grouped by a language-agnostic `categoryKey`; category filter reuses `FilterSelect` (the M3 filter-refinement dropdown) as-is; questions render through the existing `Accordion`        |
| Industries              | `/industries`                    | New `Industry` domain (same minimal shape as `Category`) + new `IndustryTile`, presented as non-interactive content-taxonomy tiles, not a catalog filter                                                  |
| Solutions for Companies | `/solutions-for-companies`       | Static copy in `solutions.json` (approach/needs analysis/custom programs/formats/learning paths/business impact/process) — same reasoning as About                                                        |

## Route decisions

Slugs are English, kebab-case, matching the `/trainings` precedent from M3. `/about`, `/trainers`, `/events` and `/resources` were **not free choices** — the Navbar and Footer already hard-linked to those exact paths since M2/M3, so using them is what let this milestone ship without touching Header/Footer markup. The one exception: Navbar's "Solutions entreprises" nav item pointed at `#companies` (a same-page anchor into the Home Page's `CompaniesSection`, which itself already links to `/solutions-for-companies` — the intended slug was already legible from that existing code). Fixed the Navbar item to point at the new page directly, since `#companies` only made sense from `/`; Home's `Hero` secondary CTA still scrolls to the in-page teaser section as before (untouched, working as designed).

## New reusable primitives

`CtaBanner` (`src/components/ui/`) — the "CTA (standalone)" component `COMPONENT_GUIDE.md` had flagged as not built yet. Reuses `FinalCtaSection`'s exact gradient-panel visual language but with a plain `RevealOnScroll` fade/rise instead of GSAP ScrollTrigger (M4 is scoped to "subtle existing motion only" — advanced scroll choreography is M6). All 10 pages end on this same panel.

## Data architecture additions

Five new domains, each following the identical DTO (snake_case, per-language suffix) → Mapper → Repository (interface + Mock implementation + factory) → Service → Hook → UI pipeline: `Partner`, `SuccessStory`, `Article`, `Faq`, `Industry`. `Event` was extended, not replaced, with `getAll()`; `getUpcoming()` also gained an explicit date filter it was implicitly relying on the mock data's all-future dates to fake before.

## i18n

10 new namespaces (`about`, `trainerPages`, `testimonials`, `partners`, `successStories`, `events`, `resources`, `faq`, `industries`, `solutions`) × fr/en/ar = 30 new locale files, registered in `src/i18n/index.ts` alongside the existing 5. No hardcoded user-visible strings; no changes to the i18n _architecture_ itself. (`trainerPages`, not `trainers`, to avoid colliding with the pre-existing `trainings` namespace — the two aren't related despite the similar name.)

## Not done in M4 (by design)

- No Dolibarr connection (M12).
- No live-browser QA — same disclosed tooling limitation as every prior pass; verified through code review, TypeScript, lint, tests and build instead.
- No advanced scroll choreography (M6) or full SEO pass beyond per-page `Seo` (title/description/canonical) — that's M7.

---

# M5 — Lead Generation Forms

**Status: DONE**

Built the 5 lead-generation experiences on a shared form architecture (one `Lead` domain, one set of reusable schema/field/state pieces) rather than 5 unrelated forms, on the same Mock Data → DTO → Mapper → Repository → Service → Hook → UI chain every domain has followed since M0 — the first domain in that chain to be a **write** path instead of a read path.

## Forms implemented

| Form                | Route                  | Notes                                                                                                                                                    |
| ------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Request Information | `/request-information` | Training preselected from `?training=<slug>` (the query param `TrainingDetailsPage`'s CTA already passed since M3)                                       |
| Request a Quote     | `/request-quote`       | Same preselection; adds participants count, preferred format/date, location                                                                              |
| Contact             | `/contact`             | Adds subject; keeps ISTAM's real address/phone/email/hours and the `Map`/`LOCATION` pieces already used on the Home Page, in this page's own layout/copy |
| Register Interest   | `/register-interest`   | New entry point added to `TrainingDetailsPage`'s sidebar; same training preselection                                                                     |
| Consultation        | `/consultation`        | New secondary CTA on `SolutionsForCompaniesPage` (was "Contact us", now "Demander une consultation" — Contact remains reachable everywhere else)         |

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
- `apple-touch-icon` deliberately not added at the time — no square icon-only ISTAM asset existed (only a wide mark+wordmark lockup). **Resolved in a later client-directed favicon-branding pass**: a square icon-only crop was generated programmatically from the existing lockup's icon mark (not hand-drawn/invented) and used for both the browser-tab favicon and `apple-touch-icon` — see "Client-directed change — Favicon/tab branding" below.
- The `env-*.js` bundle chunk grew (~69KB → ~340KB) after adding sitewide SEO components, due to Rollup's automatic chunk consolidation (the new components share `react-router-dom` reachability with more of the app now). Investigated and confirmed this is normal Rollup behavior, not a regression introduced by unnecessary code — bundle-splitting/Lighthouse work belongs to M9, not M7.

---

# M8 — Accessibility & Responsive Audit

**Status: DONE**

Audited the approved M0–M7 site against WCAG 2.2 AA plus a responsive/RTL/mobile/keyboard/screen-reader pass, as a **bug-fix pass, not a redesign** — no visual design, spacing, cards, navigation, animation, scroll behavior, or 3D was changed. No live browser was available (same disclosed limitation as every prior milestone); the audit was performed via systematic code reading plus computed WCAG contrast ratios (OKLCH → sRGB → relative luminance, using the exact conversion math implemented in `src/styles/globals.css`'s token definitions) for every color-token pairing actually used as text/UI across the codebase.

Because M0–M7 were already built with accessibility discipline baked in (global `:focus-visible` styling, `IconButton.aria-label` required at the type level, native form controls, `role="alert"` errors, a full `Drawer` focus trap, an ARIA-listbox `LanguageSwitcher`, `Image` with mandatory `alt`, mobile-first `Grid`, RTL logical-property discipline), this audit surfaced a **small number of real, confirmed issues** rather than a large rewrite.

## Issues found and fixed

1. **No skip-to-content link** (WCAG 2.4.1 Bypass Blocks) — every page forced keyboard users through the full Navbar (logo, 5 links, language switcher, CTA) before reaching content, with no way to bypass it. Added a visually-hidden-until-focused "Skip to main content" link as the first focusable element in `MainLayout.tsx`, targeting a new `id="main-content"` on `<main>`. New `a11y.skipToContent` key (fr/en/ar `common.json`).
2. **No route-change focus management** — `<main>` had no `tabIndex` and nothing moved focus there on navigation, so a screen-reader user following a link got no signal a new page loaded. Added `tabIndex={-1}` to `<main>` and a `useEffect` keyed on `useLocation().pathname` that focuses it on every route change (skipped on first mount, so it doesn't steal focus from the skip link on initial load) — the standard React Router SPA accessibility pattern.
3. **Color contrast — two token fixes** (`src/styles/globals.css`), computed for every pairing actually used in the app:
   - `--color-foreground-faint` (aliased `neutral-400`) on white = 3.36:1 — used at 12–14px for disclaimers, form hints, card meta text, badges. Fails AA's 4.5:1 for text. Re-aliased to `neutral-500` → 6.00:1. The raw `neutral-400` step itself is untouched (confirmed only used elsewhere as a non-text hover-border color).
   - `--color-warning-700` on `--color-warning-50` = 3.54:1 (`Badge`'s `warning` variant, `TrustSection`'s "Training programs" stat badge). Darkened `oklch(0.6 0.14 85)` → `oklch(0.48 0.14 85)` → 5.84:1, same hue/chroma. (`success-700`/`error-700` on their own `-50` tints already passed — 5.38:1/6.83:1 — untouched.)
4. **Focus ring invisible on dark sections** (WCAG 1.4.11 / 2.4.11) — the global `:focus-visible` ring (`primary-500`) is 7.16:1 on white but only 2.75:1 against the `neutral-900`/`950` backgrounds used by `CompaniesSection`, `ProfessionalDevelopmentSection`, and dark `CtaBanner` usages, failing the 3:1 non-text minimum — keyboard focus was nearly invisible on every `inverse`-variant `Button`/`IconButton`. Added a `focus-visible:outline-neutral-0` override to the `inverse` variant of both components (19.67:1 on `neutral-900`).
5. **Decorative 3D canvas not hidden from assistive tech** — Home's `Hero.tsx` wraps the ambient `Scene3D` orb in a div with no `aria-hidden`, inconsistent with `Scene3D`'s own static fallback (which already has it). Added `aria-hidden="true"` to that wrapper — purely decorative, zero visual change.

## Verified correct — no fix needed (checked, not assumed)

- **RTL**: zero physical-direction Tailwind classes (`ml-`/`mr-`/`pl-`/`pr-`/`left-`/`right-`/`text-left`/`text-right`/`rounded-l-`/`rounded-r-`) found anywhere in `src` — only one doc comment mentioning `border-l-2` as a negative example. Logical properties (`border-s`/`border-e`, `ms-`/`me-`/`ps-`/`pe-`, `start-`/`end-`) are used consistently throughout.
- **Images**: the `Image` primitive requires `alt` at the type level; every `alt=""` usage audited is a defensible decorative/stock-photo case (an adjacent heading already conveys the same information); `PartnerCard` and other meaningful logos already carry real alt text.
- **Landmarks**: `<header>`, two `<nav aria-label>` (desktop + mobile drawer), `<main>`, and `<footer>` with three `<nav aria-label>` columns — all present and correctly labeled.
- **Mobile drawer** (`Drawer.tsx`): full focus trap (Tab/Shift+Tab), Escape close, backdrop click close, focus return to trigger, body scroll lock — already correct, matches the WAI-ARIA dialog pattern.
- **`LanguageSwitcher`**: full WAI-ARIA listbox popover pattern — roving tabindex, Arrow Up/Down/Home/End, Escape, outside-click close, and an already-implemented mobile viewport-flip fix for when it opens inside the Drawer near the bottom of the screen.
- **Forms** (all 5 lead-generation forms + the catalog filter toolbar): every field has an associated `<label>`, `aria-invalid`/`aria-describedby` wiring, `role="alert"` error messages, `<fieldset>/<legend>` radio groups, and a honeypot anti-spam field. React Hook Form's `shouldFocusError` option (default `true`) is never overridden anywhere in the codebase (confirmed by grep), so focus already moves to the first invalid field automatically on a failed submit — no additional code needed.
- **Touch targets**: `Button` sizes are 36/44/48px, `IconButton` 36/44px (default `md` = 44px) — all pass WCAG 2.2's 24×24 CSS px AA minimum (SC 2.5.8) with comfortable margin.
- **Responsive**: `Grid`/`Container`/`Section` are mobile-first by construction (1 column below `sm`, expanding via `sm`/`md`/`lg`); a sitewide grep for fixed pixel widths (`w-[…px]`) in page/component code returned zero matches; the Training Catalog's filter toolbar stacks via `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`.
- **Motion/3D**: `useCanRender3D`/`useReducedMotion` gating and all four GSAP `ScrollTrigger` instances' reduced-motion skip + unmount cleanup are unchanged and were already re-confirmed correct during the M6 review in M7.

## Known limitation (not fixed — out of M8's charter)

The Footer links to `/legal`, `/privacy`, `/cookies`, which have no routes yet (real 404s). This is a **missing content page**, not an accessibility or responsive defect — building three full legal pages is a future content milestone per `CLAUDE.md`, not something an accessibility bug-fix pass should improvise content for.

## Breakpoints / RTL / mobile "tested"

No live browser was available (disclosed limitation, consistent with every prior milestone) — verification was via code review against Tailwind's breakpoint system (`sm` 640/`md` 768/`lg` 1024/`xl` 1280/`2xl` 1536/`3xl` 1920, covering the requested 360–1440px range), confirming every layout primitive is mobile-first and free of fixed pixel widths, and confirming zero RTL-breaking physical-direction classes exist anywhere in the codebase.

## Quality gate

`tsc -b` clean, `oxlint` clean, full Vitest suite passing, production build succeeding — no test changes were needed since none of the 5 fixes touch component behavior/props, only CSS tokens, `aria-*` attributes, and a layout-level focus effect.

## Files modified

`src/layouts/MainLayout.tsx`, `src/i18n/locales/{fr,en,ar}/common.json`, `src/styles/globals.css`, `src/components/ui/Button.tsx`, `src/components/ui/IconButton.tsx`, `src/pages/home/sections/Hero.tsx`.

## Not done in M8 (by design)

- No Dolibarr connection (M12).
- No live-browser QA — same disclosed tooling limitation as every prior milestone.
- Legal pages (`/legal`, `/privacy`, `/cookies`) remain unbuilt — a content milestone, not an M8 fix.
- Lighthouse/bundle-size work is M9's scope, not M8's.

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
- Trainers (private/admin use only — not publicly displayed, see "Removed: public Trainers functionality" below)
- Companies
- Contact/lead information
- Other approved ERP data

Mock API must remain available for development/testing.

---

# Client-directed change — Removed: public Trainers functionality

**Status: Done.** Not a numbered milestone — a client-directed content/information-architecture change, requested after M4–M8 were already approved.

The client explicitly confirmed trainers/formateurs cannot be publicly displayed. **Rule going forward: ISTAM does not publicly expose individual trainer identities, profiles, photos or biographies.**

## Removed

- `TrainersPage` (`/trainers` route, page, lazy-page export)
- Home's `TrainersSection` (and its usage in `HomePage.tsx`)
- `TrainingDetailsPage`'s per-training trainer block (`{t('trainers')}` heading + `TrainerPreviewCard` grid, plus the `useTrainers()` fetch and `trainers` derived list)
- The 3-avatar trainer stack in Home's `Hero` trust row (and its `useFeaturedTrainers()` call) — the `Rating`/trust-label text beside it, which doesn't identify anyone, was kept
- `TrainerPreviewCard` component; `useTrainers`/`useFeaturedTrainers` hooks; the now-empty `features/trainers/` folder
- Footer's "Our trainers" link and its `footer.columns.company.trainers` i18n key (fr/en/ar)
- The `trainerPages` i18n namespace (`trainers.json` × 3 languages, plus its import/registration/`ns` entry in `src/i18n/index.ts`)
- `home.json`'s `trainers.*` section (eyebrow/title/description/cta) — fr/en/ar
- `trainingDetails.json`'s `trainers` key (the removed section's heading) — fr/en/ar
- 10 trainer portrait photos (`src/assets/images/trainers/trainer-{01..10}.webp`) and their `MEDIA.trainer1..10` imports/exports
- `/trainers` from the sitemap generator's static route list
- One event description ("Meet our trainers and discover our methodology on campus") rephrased to drop the trainer-meeting framing while keeping the open-day event itself (methodology discovery) — fr/en/ar, in `mocks/data/events.ts`

## Deliberately kept (generic, non-public architecture)

`types/dto/trainer.dto.ts`, `types/entities/trainer.ts`, `repositories/trainer/*`, `services/trainer.service.ts` — the same Mock → DTO → Mapper → Repository → Service → Hook shape every domain uses. `mocks/data/trainers.ts` is now an intentionally empty array (`mockTrainerDTOs: TrainerDTO[] = []`) rather than deleted, so the pipeline stays exercised and ready for a future private/admin surface without rebuilding it. Nothing in the public UI calls it anymore.

Also kept: generic, non-identifying mentions of "expert trainers"/"formateurs experts" as a marketing claim (Hero's trust card, Home's value-proposition section, About/Solutions copy, one FAQ answer, one testimonial, one success story) — none show a name, photo, or bio, matching the client's actual concern (identifiable individuals), not the word itself. The "Formation de formateurs" (Train-the-Trainer) catalogue domain in `mocks/data/training-domains.ts` is a real ISTAM service offering, also kept.

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing, production build succeeding. Re-grepped the full source tree for `trainer`/`formateur` after the pass — every remaining hit is either the kept generic architecture above, a kept non-identifying mention, or a doc-comment example (`Card.tsx`, `DesignSystemPreviewPage.tsx`) updated to reference `EventCard` instead. No live-browser QA (disclosed limitation, as always) — verified via code review that removing each section leaves no fixed-height gap (all conditional/flex-stacked, no absolute positioning depended on the removed content) and that no other approved section, animation, or the 3D hero were touched.

---

# Client-directed change — Removed: Events feature

**Status: Done.** Not a numbered milestone — the Events feature (introduced in M4) was removed entirely at the user's request. Unlike the Trainers removal above, **no generic architecture was kept** — this is a full, clean deletion (page, section, repository, DTO/entity, i18n, sitemap), not a "hide the public UI, keep the pipeline" change.

The feature had briefly reappeared after an unrelated full local+remote git-history loss forced a from-scratch reconstruction of the working tree from memory/architecture analysis; that reconstruction restored an earlier snapshot that still had Events in it. This change removes it again, completely, this time.

## Removed

- `EventsPage` (`/events` route, page, lazy-page export)
- Home's `EventsSection` (and its usage in `HomePage.tsx`)
- `features/events/` — `EventPreviewCard` component, `useEvents`/`useUpcomingEvents` hooks
- `repositories/event/` — `event.repository.ts` (interface), `event.mapper.ts`, `mock-event.repository.ts` (+ its test), `index.ts` (factory)
- `services/event.service.ts`
- `types/dto/event.dto.ts`, `types/entities/event.ts`
- `mocks/data/events.ts`
- `components/seo/EventSchema.tsx`, the `eventToEventSchema` mapper and `ATTENDANCE_MODE` map in `lib/seo/structured-data.ts` (+ its 3 tests in `structured-data.test.ts`)
- `formatEventDay`/`formatEventMonth` in `utils/format-date.ts` (only ever consumed by the now-deleted `EventPreviewCard`)
- The `events` i18n namespace (`events.json` × 3 languages, plus its import/registration/`ns` entry in `src/i18n/index.ts`)
- `home.json`'s `events.*` section (eyebrow/title/description/cta) and `footer.columns.company.events` key — fr/en/ar
- Footer's "Events"/"Événements" link
- The `events` image (`src/assets/images/events/event-01.webp`) and its `MEDIA.events` import/export
- `/events` from the sitemap generator's static route list (`scripts/generate-sitemap.ts`)
- Doc-comment mentions of `EventPreviewCard`/`EventCard` as a compositional example, updated to reference `ArticleCard`/`TrainingCard` instead (`Card.tsx`, `ArticleCard.tsx`, `DesignSystemPreviewPage.tsx`, `OrganizationSchema.tsx`)

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing (`structured-data.test.ts`'s 3 event-specific cases removed, its training/article/faq/breadcrumb cases untouched and still passing), production build succeeding, `npm run generate:sitemap` re-run and confirmed to emit zero `/events` entries. Re-grepped the full source tree for `event`/`Event` after the pass — every remaining hit is either DOM `Event`/`*Event` handler code (`onClick`, `KeyboardEvent`, etc., unrelated), or an intentional removal note in this doc/`ARCHITECTURE.md`/`COMPONENT_GUIDE.md`. No live-browser QA (disclosed limitation, as always) — verified via code review that removing `EventsSection` leaves no fixed-height gap on the Home page (conditional/flex-stacked layout, nothing absolutely positioned depended on it) and that no other approved section, animation, the 3D hero, or the Reviews feature built in a separate pass were touched.

---

# Client-directed change — Removed: Partners page

**Status: Done.** Not a numbered milestone. In Home's "Ils nous font confiance" (`TrustLogosSection`), the "Voir nos partenaires" CTA link and its destination, `PartnersPage` (`/partners`), were removed at the user's request.

## Removed

- The "Voir nos partenaires"/"View our partners" CTA link (`TrustLogosSection`'s `RouterLink to="/partners"`) and its `home.json` `trustLogos.cta` key (fr/en/ar)
- `PartnersPage` (`/partners` route, page, lazy-page export)
- `PartnerCard` component (its only consumer was `PartnersPage`)
- The `partners` i18n namespace (`partners.json` × 3 languages, plus its import/registration/`ns` entry in `src/i18n/index.ts`)
- `/partners` from the sitemap generator's static route list

## Deliberately kept

Unlike the Events removal, the underlying `Partner` DTO/entity/`repositories/partner/*`/`partner.service.ts`/`usePartners()` hook, and `mocks/data/partners.ts`, were **not** touched — `TrustLogosSection`'s logo marquee (the row of client logos in the same "Ils nous font confiance" section) still reads from `usePartners()`. Only the dedicated full-catalog page and its card component, reachable solely through the now-removed CTA, are gone.

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing, production build succeeding (no `PartnersPage` chunk), `npm run generate:sitemap` re-run and confirmed to emit zero `/partners` entries. Confirmed via grep that `/partners`, `PartnersPage`, and `PartnerCard` have no remaining references outside this doc/`ARCHITECTURE.md`/`COMPONENT_GUIDE.md`, and that `TrustLogosSection`'s marquee (still consuming `usePartners()`) and every other Home section were untouched.

---

# Client-directed change — Removed: AnnouncementBar close button

**Status: Done.** Not a numbered milestone. The top `AnnouncementBar`'s dismiss/close button — already non-functional, commented out in JSX — was removed at the user's request, along with its now-dead supporting code, rather than left as inert commented-out code.

## Removed

- The commented-out dismiss `IconButton` (with `Icon name="xmark"`) in `AnnouncementBar.tsx`, and its now-unused `IconButton`/`Icon` imports
- `store/promo-bar.store.ts` (Zustand + `persist`) — its sole purpose was backing this button; with no way to ever set `isDismissed`, keeping it would have been dead state
- The `isDismissed` read and the `if (isDismissed || …) return null` gate — the bar is no longer conditionally hidden by a prior dismissal
- The `promoBar.dismiss` i18n key (fr/en/ar `common.json`)
- The wrapper `<div>`'s now-unneeded `relative`/asymmetric end-padding (`pe-2`, reserved for the button) — simplified to symmetric `px-4`

The bar itself (rotating marquee messages, RTL mirroring, `prefers-reduced-motion` fallback) is unchanged — it is simply no longer dismissible.

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing, production build succeeding. Confirmed no remaining references to `promo-bar.store.ts`/`usePromoBarStore`/`promoBar.dismiss` anywhere in the source tree.

---

# Client-directed change — Training Catalog: browse by category, not individual trainings

**Status: Done.** Not a numbered milestone. `TrainingCatalogPage` (`/trainings`) dropped its "filterable grid of individual `Training` records" model at the user's request. The "categories + thématiques" accordion — which previously only appeared once a category was selected via `?category=<slug>`, sitting above the grid — is now the page's entire content. A follow-up request, minutes later in the same session, asked for the Category filter back (alongside search, same row) — folded into this entry rather than logged as a separate "removed X / re-added X" pair.

## Changed

- Removed: the `TrainingCard` grid, the "X formations trouvées" results count, `Pagination`, and the old Category/Format/Level/Sort `FilterSelect` toolbar (`TrainingFilters` component deleted entirely). Format/Level/Sort do not come back; Category does (see below).
- Kept, repurposed: the search box — narrows `TrainingDomain`s by domain name or course name (case-insensitive, active-language-aware) instead of training titles, via a new pure helper `features/trainings/utils/group-domains-by-category.ts` (`groupDomainsByCategory(categories, domains, search, language)`), with a unit test covering grouping order, search-by-domain-name, search-by-nested-course-name, case-insensitivity, and categories with zero matches being excluded. The helper stays filter-agnostic (no notion of "one selected category") — the page computes `visibleCategories` before calling it.
- **Category filter restored**, on the same row as the search box (`FilterSelect`, reused as-is — not redesigned), rather than the old stacked "search, then a row of 4 selects" toolbar layout. Unlike the old grid-filtering behavior, selecting a category now hides every other category's section entirely (a real filter over `visibleCategories`, computed from `?category=<slug>` before grouping) — "Toutes les catégories" clears it. Search and the category filter compose (narrow to one category, then search within it).
- Each `Category` with ≥1 matching `TrainingDomain` renders its own heading + `Accordion` — the exact `Accordion`/`SectionHeading` markup and classes the single-category block already used. No new visual design.
- `?category=<slug>` — still linked from Home's `CategoryTile` (both variants) and the Footer's training column, neither touched — drives the same filter (whether set by an incoming link or the new dropdown) and scrolls to/focuses that category's section (`id={category.slug}`, `tabIndex={-1}`, same programmatic-focus-target pattern `MainLayout`'s skip-link already uses), so those existing links keep doing something useful. Scroll respects `prefers-reduced-motion` (instant jump instead of smooth scroll).
- `catalog.json` (fr/en/ar): removed `filters.formatLabel/allFormats/levelLabel/allLevels/sortLabel/sort.*`, `results.*`, `pagination.*`. Reworded `filters.searchLabel/searchPlaceholder`, `empty.title/description`, `hero.description`, and `domains.eyebrow/title/description` (the latter's `{{category}}` interpolation removed — it's now a page-level intro shown once, not per selected category). `filters.categoryLabel/allCategories` were removed then restored (unchanged text) once the filter came back. `domains.courseCount_*` (incl. Arabic's full plural set) unchanged — still used per domain.

## Deliberately kept untouched

`CategoryTile`, `CategoriesSection` (Home), `Footer`'s training column, `TrainingDetailsPage` (its own, separate "related trainings" `TrainingCard` grid), `TrainingCard`, `useTrainings`, `Pagination` — none deleted, none redesigned; `TrainingCard`/`useTrainings`/`Pagination` are simply no longer used by this one page (still used elsewhere). `FilterSelect` was briefly unused by this page, then put back to work for the Category filter — never deleted.

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing (`group-domains-by-category.test.ts` untouched by the later Category-filter change — the helper's contract didn't change), production build succeeding, `prettier --check` clean. Confirmed no remaining references to `TrainingFilters`/`TrainingFiltersValue` anywhere in the source tree. No live-browser QA (disclosed limitation, as always) — verified via code review that every category with real domain data renders a section, that selecting a category hides the others and "Toutes les catégories" restores them, that Home/Footer/`TrainingDetailsPage` were untouched, and that the removed `catalog.json` keys have no other readers.

---

# Client-directed change — Favicon / browser-tab branding

**Status: Done.** Not a numbered milestone — a small client-directed branding fix. The browser tab was still showing the default Vite scaffold favicon (a purple Vite-brand SVG, never replaced since M0), because M7 had explicitly deferred it: no square icon-only ISTAM asset existed, only the wide "mark + wordmark" lockup (`src/assets/brand/istam-logo.png`, 738×222px).

## What changed

- Cropped a square icon-only favicon from the **existing** lockup's icon mark (the burgundy/charcoal shape left of the "ISTAM" wordmark) — no new artwork invented. Done programmatically (bounding-box detection + crop + resize via a temporary, not-persisted `jimp` install — `npm install --no-save`, never touched `package.json`/`package-lock.json`), not hand-drawn.
- `public/favicon.png` (64×64) and `public/apple-touch-icon.png` (180×180) generated from that crop.
- `public/favicon.svg` (the default Vite icon) **deleted**.
- `index.html`: `<link rel="icon">` now points at `/favicon.png` (was `/favicon.svg`); added `<link rel="apple-touch-icon" href="/apple-touch-icon.png">`; `<title>` tightened to "ISTAM — Formations professionnelles" (the static pre-hydration/crawler fallback only — every real page's rendered `<title>` already came from `Seo.tsx`/`seoConfig.siteName` since M7 and was untouched).
- `src/config/brand.ts` and `docs/DESIGN_SYSTEM.md` → "Branding" updated to document the new favicon files instead of the old "not yet possible" note.

## Verification

`tsc -b` clean, `oxlint` clean, full Vitest suite passing, production build succeeding. Confirmed no duplicate/conflicting `<link rel="icon">` declarations, no remaining `vite.svg`/`favicon.svg` references anywhere in the repo. `public/icons.svg` (an unrelated Vite-scaffold social-icon sprite still used by the internal `/_design-system` gallery page) was deliberately left untouched — out of scope for a favicon fix. No design/layout/animation/scroll/3D/color changes.

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
M8 ✅

CURRENT NEXT MILESTONE:

## M9 — Performance Audit

The Home Page, Training Catalog/Details, all M4 content pages, all M5 lead-generation forms, the M6 motion/3D layer, the M7 SEO layer, and the M8 accessibility/responsive fixes are approved.

Future work must preserve the existing ISTAM visual identity and
approved page designs.
