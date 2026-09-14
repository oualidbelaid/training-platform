# Architecture

## Layers

```
UI (pages/components/features)
   ↓
Hooks (TanStack Query wrappers, e.g. useTrainings)
   ↓
Services (business orchestration, e.g. TrainingService)
   ↓
Repositories (interface, e.g. TrainingRepository)
   ↓
   ├── MockTrainingRepository   ← active today (VITE_USE_MOCK=true)
   └── DolibarrTrainingRepository ← added in the Dolibarr Integration milestone
```

Rules that keep this real, not just diagrammed:

- Components/hooks never import a repository directly — only a service.
- Services never import `Mock*`/`Dolibarr*` by name — only the repository interface, resolved through one factory per domain (`repositories/<domain>/index.ts`).
- DTOs never cross above the mapper. A component sees a `Training` entity, never a `TrainingDTO`.

## Folder structure (M0 shape, evolved through M2/branding-refinement/M3/M4/M5 — see each doc for the detailed history)

```
src/
  app/            App.tsx — composition root (providers + router)
  assets/         brand/, images/{photos,trainers,placeholders}/ — see DESIGN_SYSTEM.md → "Imagery"
  components/
    ui/           Design System primitives — Button, Input, Textarea, Select, Checkbox, Radio/RadioGroup,
                  FilterSelect, Icon, SearchBar, Pagination, Accordion, Breadcrumb, Image, Card, Badge,
                  CtaBanner (M4), etc. (see COMPONENT_GUIDE.md)
    layout/       Navbar, Footer, Container, Section, LanguageSwitcher, AnnouncementBar
    motion/       RevealOnScroll, TiltCard, FloatingElement (Framer Motion)
    three/        HeroScene (R3F), Scene3D (lazy-load + gating wrapper)
    map/          Map, LocationMap (lazy-loaded Leaflet/OpenStreetMap)
    feedback/     LoadingState, ErrorState, EmptyState
    seo/          Seo, OrganizationSchema (react-helmet-async wrappers)
  config/         env.ts, seo.config.ts, query-client.config.ts, brand.ts, location.ts, media.ts
  core/           http.ts (axios instance), ErrorBoundary.tsx
  features/
    trainings/    hooks/ — useTrainings, useTraining, useFeaturedTrainings,
                  useTrainingDomains (ISTAM Full Catalogue pass — the 51 real
                  skill domains/204 course names under the 4 pillars; see
                  "Training vs. TrainingDomain" below)
                  components/ — TrainingCard, CategoryTile
                  utils/ — group-domains-by-category.ts (Catalog page simplification —
                  groups `TrainingDomain[]` under their `Category`, with an optional
                  search filter; see "Training Catalog: browse by category" in ROADMAP.md.
                  `TrainingFilters` — the old search+category+format+level+sort toolbar —
                  was deleted in that same change)
                  config/ — category-visuals.ts, development-stages.ts
    categories/, testimonials/  — same hooks/components/ shape
    partners/ — hooks/usePartners.ts only, no components/: `PartnersPage` and its
                  `PartnerCard` were removed (see "Removed: Partners page" below), but
                  `usePartners()` is kept — Home's `TrustLogosSection` still sources its
                  logo marquee from it
    success-stories/, articles/, faq/, industries/ — M4, same hooks/components/ shape;
                  industries/ additionally has config/industry-visuals.ts (mirrors category-visuals.ts)
    (a `trainers/` folder — `useFeaturedTrainers`, `useTrainers`, `TrainerPreviewCard` —
                  existed from M3–M4 but was **removed** at the client's explicit request:
                  ISTAM does not publicly expose individual trainer identities, profiles,
                  photos or biographies. The `Trainer` DTO/entity/repository/service/mapper
                  chain below was deliberately kept — generic, reusable, matches every other
                  domain's shape — only the public-facing UI layer was deleted. See ROADMAP.md.)
    (an `events/` folder — `useEvents`, `useUpcomingEvents`, `EventPreviewCard` —
                  existed from M4 but was later **removed entirely**: page, Home section,
                  repository, DTO/entity, i18n, sitemap entry. Unlike `trainers/`, no generic
                  architecture was kept — a clean, full deletion. See ROADMAP.md.)
    leads/        M5 — the first **write**-path feature (every other feature/ folder is read-only)
                  schemas/ — contact-fields.schema.ts + consent.schema.ts (shared Zod bases, factories not
                  static exports — see ROADMAP.md M5 for why) + one schema per form
                  components/ — HoneypotField, FormSection, LeadFormSuccess, TrainingSelectField
                  hooks/ — useSubmitLead (useMutation — the first mutation hook; every other hook is useQuery)
  hooks/          useMediaQuery, useReducedMotion, useDirection, useCanRender3D, useCountUp, useScrolled
  i18n/           i18next bootstrap + locales/{fr,en,ar}/{common,home,trainings,catalog,trainingDetails,
                  about,testimonials,successStories,resources,faq,industries,
                  solutions,leadForms,requestInformation,requestQuote,contact,registerInterest,consultation,
                  reviews}.json
                  (the `trainerPages` namespace/`trainers.json` files were removed along with the
                  public Trainers page — see the `trainers/` note above. The `events.json` namespace
                  was removed along with the Events feature — see the `events/` note above. The
                  `partners.json` namespace was removed along with `PartnersPage` — see "Removed:
                  Partners page" below.)
  layouts/        MainLayout (Navbar + Outlet + Footer)
  lib/            cn.ts, motion.ts, gsap.ts, r3f.ts
  mocks/data/     trainings.ts, categories.ts, trainers.ts (empty array — see the `trainers/` note
                  above), testimonials.ts,
                  partners.ts, success-stories.ts, articles.ts, faqs.ts, industries.ts (M4),
                  training-domains.ts (ISTAM Full Catalogue pass) — all DTO-shaped
                  (leads has no mock data file — a lead is submitted, never listed/read back in the UI.
                  events.ts was deleted along with the rest of the Events feature — see the `events/` note above.
                  reviews' seed lives in `public/data/reviews.json`, not here — see "Reviews data & persistence" below)
  pages/          HomePage, TrainingCatalogPage (M3), TrainingDetailsPage (M3),
                  AboutPage, TestimonialsPage, SuccessStoriesPage,
                  ResourcesPage, ArticleDetailsPage, FaqPage, IndustriesPage,
                  SolutionsForCompaniesPage (M4),
                  RequestInformationPage, RequestQuotePage, ContactPage, RegisterInterestPage,
                  ConsultationPage (M5),
                  DesignSystemPreviewPage, NotFoundPage
  providers/      QueryProvider, DirectionProvider
  repositories/
    training/     training.repository.ts (interface — search/format/level/sort in M3),
                  training.mapper.ts, mock-training.repository.ts, index.ts (factory)
    trainer/, category/, testimonial/ — same interface/mapper/mock/factory shape
    partner/, success-story/, article/, faq/, industry/ — M4, identical shape
                  (article/ additionally has getBySlug(), like category/ and training/)
    training-domain/ — ISTAM Full Catalogue pass, identical getAll()-only
                  shape to industry/. Deliberately NOT part of training/: a
                  `TrainingDomain` only ever carries a name + a flat list of
                  real course *titles* (from the official ISTAM catalogue),
                  never the rich fields (objectives/program/prerequisites/
                  sessions) a bookable `Training` needs — representing the
                  204 real course names as full `Training` records would
                  mean inventing ~90% of each one. See `types/dto/training-
                  domain.dto.ts` and `docs/ROADMAP.md`'s "ISTAM Full
                  Catalogue" entry.
    lead/         M5 — the odd one out: `submit(dto)`, not `getAll()`/`getBySlug()`. `lead.mapper.ts`
                  has `toDTO()`/`fromResultDTO()` (outbound), not `fromDTO()` (inbound) like every other
                  domain's mapper. `mock-lead.repository.ts` has `SIMULATE_FAILURE_EMAIL`, a deterministic
                  QA hook for exercising the error/retry UI on demand.
    review/       Reviews feature — same interface/mapper/factory shape, but its Mock repository
                  reads its seed from `public/data/reviews.json` via `fetch()`, not a `mocks/data/*.ts`
                  module. See "Reviews data & persistence" below.
                  (an `event/` folder existed here from M4 but was **removed entirely** along with
                  the rest of the Events feature — no generic architecture kept. See ROADMAP.md.)
  routes/         index.tsx (router — 16 business routes + "/_design-system" + 404), lazy-pages.tsx
  services/       training.service.ts, trainer.service.ts, category.service.ts, testimonial.service.ts,
                  partner.service.ts, success-story.service.ts, article.service.ts,
                  faq.service.ts, industry.service.ts, training-domain.service.ts (ISTAM Full Catalogue
                  pass), lead.service.ts (M5 — also the anti-spam
                  honeypot checkpoint, see ROADMAP.md M5), review.service.ts
                  (event.service.ts was deleted along with the rest of the Events feature)
  store/          ui.store.ts (Zustand — mobile menu state only)
                  (promo-bar.store.ts — AnnouncementBar dismissal persistence — was deleted along
                  with the dismiss/close button itself; the bar is no longer dismissible. See ROADMAP.md.)
  styles/         globals.css (Tailwind v4 + design tokens), vendor/fontawesome/
  test/           setup.ts — jest-dom matchers + jsdom polyfills (matchMedia, IntersectionObserver) every
                  full-page component test needs, since every page renders RevealOnScroll
  types/
    dto/          training.dto.ts (extended in M3: description/objectives/program/faq/sessions), category.ts,
                  trainer.ts, testimonial.ts, partner.ts, success-story.ts, article.ts, faq.ts,
                  industry.ts (M4), training-domain.dto.ts (ISTAM Full Catalogue pass),
                  lead.dto.ts (M5 — LeadRequestDTO, outbound), review.dto.ts
                  (event.dto.ts was deleted along with the rest of the Events feature)
    entities/      training.ts (same M3 extension), category.ts, trainer.ts, testimonial.ts,
                  partner.ts, success-story.ts, article.ts, faq.ts, industry.ts (M4),
                  training-domain.ts (ISTAM Full Catalogue pass), lead.ts (M5 — one
                  shared Lead type with a formType discriminator, not 5 near-identical types), common.ts,
                  review.ts (event.ts was likewise deleted)
  utils/          localized-text.ts (+ zipLocalizedText, M3), format-date.ts
```

`constants/` remains empty — still no content that needs it yet.

## Data flow, worked example (Training)

1. `mocks/data/trainings.ts` — mock content authored **in the same shape as the anticipated Dolibarr payload** (`TrainingDTO`), not the clean entity.
2. `repositories/training/training.mapper.ts` — `TrainingMapper.fromDTO()` converts DTO → `Training` entity.
3. `repositories/training/mock-training.repository.ts` — reads the mock DTOs, maps every one, simulates latency.
4. `repositories/training/index.ts` — factory; today always returns `MockTrainingRepository` (`VITE_USE_MOCK=true`).
5. `services/training.service.ts` — thin pass-through today; the place cross-cutting business rules get added later.
6. `features/trainings/hooks/useTrainings.ts` (+ `useTraining`, `useFeaturedTrainings`) — TanStack Query wrappers.
7. `pages/TrainingCatalogPage.tsx` / `TrainingDetailsPage.tsx` — render the real (mock) content end to end.

This chain was deliberately exercised end-to-end starting in M0 so the mapper is battle-tested before any real Dolibarr shape exists — see `DOLIBARR_GUIDE.md`. M3 extended the DTO/entity/mapper with the fields the Details page needs (`description`, `objectives`, `targetAudience`, `prerequisites`, `program`, `methodology`, `faq`, `sessions`) — same pattern, more fields.

## Reviews data & persistence

The training-evaluation feature (Home page rating summary + "leave a review" modal) follows the same DTO → mapper → repository → service → hooks chain as every other domain, with one deliberate difference in where the seed data lives:

- **`public/data/reviews.json`** — the seed, as a plain static JSON asset (not a `src/mocks/data/*.ts` module like every other domain). It ships empty (`[]`): no fabricated reviews, ratings, or names. `repositories/review/mock-review.repository.ts` fetches it at runtime (`fetch('/data/reviews.json')`); any network failure, non-OK response, or malformed body degrades to an empty array rather than surfacing an error or inventing content.
- **`localStorage` (`istam-submitted-reviews`)** — where a visitor's own submitted reviews persist. `getAll()` merges the fetched seed with whatever is in `localStorage`; `submit()` appends to it.
- **No backend, so no cross-visitor sharing.** This is a static frontend — there is no server a submission could be written to, so a review submitted in one visitor's browser is never visible to a _different_ visitor on a different device or browser. It only "publishes" within the submitter's own browser (until a real backend replaces the mock repository, see below).
- **`status: 'pending' | 'approved'`** — kept on the `Review`/`ReviewDTO` type for a future real moderation workflow, but the mock repository stamps every submission `'approved'` immediately: with no backend to moderate against, a `'pending'` state that never changes would just make the visitor's own submission invisible to them. `getApprovedReviewStats()` (`features/reviews/utils/`) only ever averages `status === 'approved'` reviews, so this is the single place that logic lives — the Home page's `EvaluationSection` never computes an average itself, and shows neutral copy instead of a fabricated number when the count is `0`.
- **Replacing this with Dolibarr later** means adding a `DolibarrReviewRepository` (real moderation queue, real cross-visitor persistence) behind the existing `repositories/review/index.ts` factory — the `ReviewRepository` interface, mapper, service, and hooks do not change, same as every other domain.

## State management split

- **TanStack Query** — all server/mock data (`features/*/hooks`).
- **Zustand** — UI-only global state, never server-derived data. `store/ui.store.ts` — mobile menu open/closed. (`store/promo-bar.store.ts` — `AnnouncementBar` dismissal persistence — was removed along with the bar's close button; see ROADMAP.md.)
- **URL (`useSearchParams`)** — added in M3 for the Training Catalog's search/filter/sort/page state. Deliberately _not_ Zustand or local `useState`: filter state that lives in the URL is shareable/bookmarkable/back-button-friendly for free, and it's exactly the shape `CategoryTile` on the Home Page already links to (`/trainings?category=<slug>`) — using the URL as the source of truth means that link needed zero changes when the Catalog page was built.
