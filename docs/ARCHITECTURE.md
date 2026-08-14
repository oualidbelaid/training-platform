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
  assets/         brand/, images/{photos,trainers,events,placeholders}/ — see DESIGN_SYSTEM.md → "Imagery"
  components/
    ui/           Design System primitives — Button, Input, Textarea, Select, Checkbox, Radio/RadioGroup,
                  FilterSelect, Icon, SearchBar, Pagination, Accordion, Breadcrumb, Image, Card, Badge,
                  CtaBanner (M4), etc. (see COMPONENT_GUIDE.md)
    layout/       Navbar, Footer, Container, Section, LanguageSwitcher
    motion/       RevealOnScroll, TiltCard, FloatingElement (Framer Motion)
    three/        HeroScene (R3F), Scene3D (lazy-load + gating wrapper)
    map/          Map, LocationMap (lazy-loaded Leaflet/OpenStreetMap)
    feedback/     LoadingState, ErrorState, EmptyState
    seo/          Seo, OrganizationSchema (react-helmet-async wrappers)
  config/         env.ts, seo.config.ts, query-client.config.ts, brand.ts, location.ts, media.ts
  core/           http.ts (axios instance), ErrorBoundary.tsx
  features/
    trainings/    hooks/ — useTrainings, useTraining, useFeaturedTrainings
                  components/ — TrainingCard, CategoryTile, TrainingFilters (M3)
                  config/ — category-visuals.ts, development-stages.ts
    trainers/     hooks/ — useFeaturedTrainers, useTrainers (M3 — all trainers)
                  components/ — TrainerPreviewCard
    categories/, testimonials/, events/  — same hooks/components/ shape (events/ hooks: useUpcomingEvents, useEvents (M4 — all))
    partners/, success-stories/, articles/, faq/, industries/ — M4, same hooks/components/ shape;
                  industries/ additionally has config/industry-visuals.ts (mirrors category-visuals.ts)
    leads/        M5 — the first **write**-path feature (every other feature/ folder is read-only)
                  schemas/ — contact-fields.schema.ts + consent.schema.ts (shared Zod bases, factories not
                  static exports — see ROADMAP.md M5 for why) + one schema per form
                  components/ — HoneypotField, FormSection, LeadFormSuccess, TrainingSelectField
                  hooks/ — useSubmitLead (useMutation — the first mutation hook; every other hook is useQuery)
  hooks/          useMediaQuery, useReducedMotion, useDirection, useCanRender3D, useCountUp, useScrolled
  i18n/           i18next bootstrap + locales/{fr,en,ar}/{common,home,trainings,catalog,trainingDetails,
                  about,trainerPages,testimonials,partners,successStories,events,resources,faq,industries,
                  solutions,leadForms,requestInformation,requestQuote,contact,registerInterest,consultation}.json
  layouts/        MainLayout (Navbar + Outlet + Footer)
  lib/            cn.ts, motion.ts, gsap.ts, r3f.ts
  mocks/data/     trainings.ts, categories.ts, trainers.ts, testimonials.ts, events.ts,
                  partners.ts, success-stories.ts, articles.ts, faqs.ts, industries.ts (M4) — all DTO-shaped
                  (leads has no mock data file — a lead is submitted, never listed/read back in the UI)
  pages/          HomePage, TrainingCatalogPage (M3), TrainingDetailsPage (M3),
                  AboutPage, TrainersPage, TestimonialsPage, PartnersPage, SuccessStoriesPage,
                  EventsPage, ResourcesPage, ArticleDetailsPage, FaqPage, IndustriesPage,
                  SolutionsForCompaniesPage (M4),
                  RequestInformationPage, RequestQuotePage, ContactPage, RegisterInterestPage,
                  ConsultationPage (M5),
                  DesignSystemPreviewPage, NotFoundPage
  providers/      QueryProvider, DirectionProvider
  repositories/
    training/     training.repository.ts (interface — search/format/level/sort in M3),
                  training.mapper.ts, mock-training.repository.ts, index.ts (factory)
    trainer/, category/, testimonial/, event/ — same interface/mapper/mock/factory shape
                  (event/ — getAll() added in M4 alongside the original getUpcoming())
    partner/, success-story/, article/, faq/, industry/ — M4, identical shape
                  (article/ additionally has getBySlug(), like category/ and training/)
    lead/         M5 — the odd one out: `submit(dto)`, not `getAll()`/`getBySlug()`. `lead.mapper.ts`
                  has `toDTO()`/`fromResultDTO()` (outbound), not `fromDTO()` (inbound) like every other
                  domain's mapper. `mock-lead.repository.ts` has `SIMULATE_FAILURE_EMAIL`, a deterministic
                  QA hook for exercising the error/retry UI on demand.
  routes/         index.tsx (router — 19 business routes + "/_design-system" + 404 as of M5), lazy-pages.tsx
  services/       training.service.ts, trainer.service.ts, category.service.ts, testimonial.service.ts,
                  event.service.ts, partner.service.ts, success-story.service.ts, article.service.ts,
                  faq.service.ts, industry.service.ts, lead.service.ts (M5 — also the anti-spam
                  honeypot checkpoint, see ROADMAP.md M5)
  store/          ui.store.ts (Zustand — mobile menu state only)
  styles/         globals.css (Tailwind v4 + design tokens), vendor/fontawesome/
  test/           setup.ts — jest-dom matchers + jsdom polyfills (matchMedia, IntersectionObserver) every
                  full-page component test needs, since every page renders RevealOnScroll
  types/
    dto/          training.dto.ts (extended in M3: description/objectives/program/faq/sessions), category.ts,
                  trainer.ts, testimonial.ts, event.ts, partner.ts, success-story.ts, article.ts, faq.ts,
                  industry.ts (M4), lead.dto.ts (M5 — LeadRequestDTO, outbound)
    entities/      training.ts (same M3 extension), category.ts, trainer.ts, testimonial.ts, event.ts,
                  partner.ts, success-story.ts, article.ts, faq.ts, industry.ts (M4), lead.ts (M5 — one
                  shared Lead type with a formType discriminator, not 5 near-identical types), common.ts
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

## State management split

- **TanStack Query** — all server/mock data (`features/*/hooks`).
- **Zustand** (`store/ui.store.ts`) — UI-only global state. Only one slice exists today: mobile menu open/closed. Nothing server-derived belongs here.
- **URL (`useSearchParams`)** — added in M3 for the Training Catalog's search/filter/sort/page state. Deliberately *not* Zustand or local `useState`: filter state that lives in the URL is shareable/bookmarkable/back-button-friendly for free, and it's exactly the shape `CategoryTile` on the Home Page already links to (`/trainings?category=<slug>`) — using the URL as the source of truth means that link needed zero changes when the Catalog page was built.
