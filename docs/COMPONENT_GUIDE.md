# Component Guide

Status: **M2 complete**, then a **"final premium UX / scroll storytelling" pass**, then a **"branding & UX refinement" pass** rebasing everything onto the real ISTAM brand, then **M3 — Training Catalog + Training Details**. The core Design System component library (M1) is complete; business/composite components live under `features/*/components/`, composed from those primitives.

Live gallery of the M1 primitives: `npm run dev`, open `/_design-system` (internal QA page, noindex'd).

## Layout (`src/components/layout/`)

| Component | Notes |
|---|---|
| `Container` | Max-width + responsive horizontal gutter |
| `Section` | Vertical rhythm; `spacing` prop; `forwardRef` (needed so pages can attach a GSAP `ScrollTrigger` directly to a `<Section>`) |
| `Stack` | Flex composition primitive: `direction`/`gap`/`align`/`justify`/`wrap` |
| `Grid` | Responsive CSS grid, mobile-first, `cols` prop |
| `Navbar` | Full premium nav: scroll-aware (transparent → solid+blur via `useScrolled`), desktop links + CTA, `Drawer`-based mobile menu with full focus management. Wordmark is now the real `BRAND.logo` image (`src/config/brand.ts`), not an icon+text lockup. |
| `Footer` | Full nav columns (Training/Company/Contact) sourced from `useCategories()`, legal links, copyright, real `BRAND.logo` — no fake social links (none exist yet) |
| `LanguageSwitcher` | **Rebuilt in the branding-refinement pass** — a compact globe-icon trigger opening an accessible `role="listbox"` popover (`role="option"` items, `aria-selected`), replacing the always-visible 3-button toggle. Arrow Up/Down/Home/End rove focus between options; Escape and outside-click close and return focus to the trigger. Panel animates via Framer Motion (skipped under reduced motion). Drives `<html dir/lang>` via `DirectionProvider` exactly as before. |

## Core UI (`src/components/ui/`)

| Component | Notes |
|---|---|
| `Button` | 5 variants (`primary`/`secondary`/`outline`/`ghost`/`inverse`), 3 sizes, `loading` state, `asChild`. The loading spinner is never rendered alongside `children` when `asChild` (Radix `Slot` requires exactly one child element). |
| `Icon` (branding-refinement) | The **only** place a raw `fa-solid fa-*` class string is written. `<Icon name="arrow-right" />` — `name` is a closed `IconName` union, sized via `text-*` (font-size), colored via inherited text color. Decorative by default (`aria-hidden`); pass `aria-label` for a meaningful icon (`role="img"`). See `docs/DESIGN_SYSTEM.md` → "Iconography" for the FontAwesome asset setup. |
| `IconButton` | Icon-only; `aria-label` required at the type level |
| `Link` | Internal (React Router) / same-page hash anchor / external, auto-detected from `href` (`/...` → route, `#...` → plain anchor for native smooth-scroll, else external `<a target="_blank">`) |
| `Badge` | 6 variants |
| `Card` / `CardImage` / `CardContent` / `CardFooter` | The primitive `TrainingCard`/`TrainerPreviewCard`/`TestimonialCard`/`EventPreviewCard` all compose |
| `GlassPanel` | `light`/`dark` tone — used for the Hero's floating info cards and the Companies-section image caption |
| `Input` / `Textarea` / `Select` | Label/hint/error via shared `FormField`, RHF-ready. **`Select` fixed in M3**: it always forced `defaultValue=''` internally, which crashes React ("a select must be either controlled or uncontrolled") the moment a caller also passes a controlled `value` — needed for the catalog's filter toolbar. It now only falls back to `defaultValue` when the caller didn't pass `value`, so existing uncontrolled (RHF `register()`) usage is unaffected. |
| `SearchBar` (M3) | Icon-prefixed search input for toolbars — visually distinct from labeled form fields (pill shape, no visible label, `sr-only` label + placeholder instead), with an optional inline clear button. Used by the Training Catalog's filter bar. |
| `FilterSelect` (M3 filter refinement) | Custom accessible single-select for toolbar/filter use — `role="listbox"` popover in the `LanguageSwitcher` pattern (Arrow Up/Down/Home/End roving focus, Escape + outside-click close-and-refocus, viewport-flip placement, `AnimatePresence` fade+slide skipped under `prefers-reduced-motion`), FontAwesome `chevron-down`/`check`. Exists because a native `<select>`'s *open* dropdown is OS/browser-rendered and cannot be restyled with CSS — only its closed box can. `Select` (native) is unchanged and still used for RHF form fields; `FilterSelect` is for controlled toolbar filters specifically (Training Catalog's category/format/level/sort). |
| `Pagination` (M3) | Previous/next + page-number buttons, `aria-current="page"` on the active page. No ellipsis-collapsing logic — catalog result sets are small. Renders nothing when there's only one page. |
| `Accordion` (M3) | FAQ accordion built on native `<details>`/`<summary>` — full keyboard support and expand/collapse state for free, no JS, no custom ARIA widget. Chevron rotation is a pure CSS `group-open:` transform. |
| `Breadcrumb` (M3) | `nav` + ordered list, `aria-current="page"` on the final (non-link) crumb — standard accessible pattern, also the base for the BreadcrumbList structured data planned for M7. |
| `Checkbox` / `Radio` + `RadioGroup` | Native controls styled via `accent-color` |
| `FormField` | Shared label/hint/error layout, usable standalone |
| `SectionHeading` | Eyebrow + headline + supporting text |
| `Avatar` | Image with initials fallback |
| `Image` | Lazy, async-decoded, CLS-safe, fade-in on load. `objectPosition` prop for off-center editorial crops, and a branded gradient-fallback box (not a broken-image icon) shown on load error *or* when `src` is falsy — so an entity without a photo yet degrades gracefully. |
| `Divider` | Horizontal (`<hr>`) / vertical (RTL-safe logical border) |
| `Drawer` | Slide-in panel (Framer `AnimatePresence`), used by `Navbar`'s mobile menu. Full accessible-dialog pattern: focus moves in on open, Tab/Shift+Tab trapped inside, Escape or backdrop closes, focus returns to the trigger, body scroll locked while open. `role="dialog"` on a plain `motion.div` (not native `<dialog>`, whose imperative API doesn't compose with `AnimatePresence`). |
| `Rating` | Star rating (fractional values via a clipped overlay of two star rows), built on `Icon`. `role="img"`, same composite-visual reasoning as `Avatar`. |

## Feedback (`src/components/feedback/`)

`LoadingState`, `ErrorState`, `EmptyState` — unchanged from M0.

## Motion (`src/components/motion/`)

| Component | Notes |
|---|---|
| `RevealOnScroll` | Framer Motion viewport-triggered fade/rise; accepts a `variants` prop (`fadeInUp`/`fadeIn`/`scaleIn`) |
| `TiltCard` | CSS-perspective pointer-follow tilt — used by `CategoryTile`, the Hero's floating info cards, and the Professional Development section's stage image |
| `FloatingElement` | Ambient decorative float, disabled under reduced motion |

## 3D (`src/components/three/`)

| Component | Notes |
|---|---|
| `Scene3D` | Gating pipeline: `useCanRender3D()` → lazy `HeroScene` → `Suspense` → `ErrorBoundary`, all resolving to the same static fallback. |
| `HeroScene` | The Hero's "knowledge/connection/growth" orb: a soft glass sphere (`MeshDistortMaterial`) with an emissive inner core, two thin encircling rings, and ~50 particles via drei's `<Sparkles>`. A `Group` auto-rotates slowly and tilts toward the pointer via `useFrame` — no React re-renders, no `OrbitControls`. **Recolored in the branding-refinement pass**: core/rings/point-light hex values updated from blue to burgundy (`#8c1e4b`/`#f7eef2`/`#dba7c0`/`#b23e6e`) to match the new palette — these are literal `three.js` material colors, not CSS tokens, so they needed a manual edit alongside the `globals.css` change. |

## Map (`src/components/map/`) — new in the branding-refinement pass

| Component | Notes |
|---|---|
| `Map` | The only place a page mounts the map — mirrors `Scene3D`'s role for 3D: `React.lazy` code-splits `leaflet`/`react-leaflet` into their own chunk (confirmed ~153 kB JS + ~10.5 kB CSS in the production build, separate from `HomePage`), `Suspense`/`ErrorBoundary` fall back to a static "map unavailable" placeholder that never leaves a blank hole. The address/phone/email remain real, selectable text in `LocationSection` regardless of whether the map itself loads. |
| `LocationMap` | The only file importing `leaflet`/`react-leaflet` directly. Free, keyless OpenStreetMap tiles (no API key to protect). Marker is a custom burgundy `L.divIcon` (plain HTML/CSS) rather than Leaflet's default marker image — sidesteps the well-known bundler-breaks-Leaflet's-default-icon-paths problem entirely and keeps the pin on-brand. `zoomAnimation`/`fadeAnimation` disabled under `prefers-reduced-motion`. |

## SEO (`src/components/seo/`)

`Seo`, `OrganizationSchema` (`EducationalOrganization` JSON-LD, homepage only) — both read `seoConfig.siteName` (now `'ISTAM'`), so branding is a one-file change that cascades to every page's `<title>`/OG tags automatically.

## Business components (`src/features/*/components/`, `src/pages/home/sections/`)

Several take a `variant`/`featured` prop pair (`'featured' | 'compact'` or a boolean) so the Home Page reads as **distinct editorial compositions** — a large dominant treatment plus visually different supporting items — rather than the same card shape repeated at different sizes.

| Component | Composes | Notes |
|---|---|---|
| `TrainingCard` | `Card`, `Image`, `Badge` | Uses `training.image` (real photography — see `docs/DESIGN_SYSTEM.md` → "Imagery"). `featured` renders a dominant horizontal card (image left, large type); default is a compact vertical card. |
| `CategoryTile` | `TiltCard`, `Link`, `Icon` | `variant="featured"` — one large panel (icon, `text-h2` name, full description, live program count from `useTrainings()`). `variant="compact"` — a slim list row (icon + name + count + arrow), not a second card shape, so `CategoriesSection` reads as "one panel + a list." Icon/color still come from `category-visuals.ts` (presentation, not on the `Category` entity) — now `IconName` string keys instead of component references. |
| `TestimonialCard` | `Avatar`, `Card` | `variant="featured"` — large pull-quote panel with the decorative `MEDIA.testimonial` texture and an oversized `font-display` quotation mark. `variant="compact"` — the original small card, for the supporting testimonials. |
| `EventPreviewCard` | `Badge`, `Card`, `Image` | `variant="featured"` — image (if the event has one) + a large day/month date block (`formatEventDay`/`formatEventMonth`). `variant="compact"` — the original text-forward card with the full localized date. |
| `ProfessionalDevelopmentSection` | `TiltCard`, `Icon`, Framer `AnimatePresence`, GSAP `ScrollTrigger` | The signature scroll-driven "moment" — see `docs/ANIMATION_GUIDE.md`. |
| `TrustLogosSection` | — | "Ils nous font confiance" — eyebrow + one line + a row of demonstration partner logos (`MEDIA.partner1`–`6`), opacity-only hover, no other motion. |
| `LocationSection` | `Map`, `Icon` | Two-column contact-details + map layout, sourced from `src/config/location.ts`. |
| 12 Home Page sections (`pages/home/sections/`) | — | `Hero`, `TrustSection`, `TrustLogosSection`, `CategoriesSection`, `ProfessionalDevelopmentSection`, `FeaturedTrainingsSection`, `ValuePropositionSection`, `CompaniesSection`, `TestimonialsSection`, `LocationSection`, `EventsSection`, `FinalCtaSection` — each fetches via its feature hook, never inline mock data. (`TrainersSection` existed here from M2 through the branding-refinement pass but was removed — see "Removed: public Trainers functionality" below.) |
| `TrainingFilters` (M3; filters refined to `FilterSelect`) | `SearchBar`, `FilterSelect` ×4 | The Catalog's search + category/format/level/sort toolbar. Purely a controlled view over a `TrainingFiltersValue` the caller owns (`TrainingCatalogPage` syncs it to the URL) — the component itself holds no state. |

## Pages (`src/pages/`) — M3 additions

| Page | Route | Notes |
|---|---|---|
| `TrainingCatalogPage` | `/trainings` | Search/filter/sort/page state lives in the URL (`useSearchParams`), not local state — shareable/bookmarkable, and it's exactly the URL shape `CategoryTile` already links to from the Home Page (`?category=<slug>`), so nothing there needed to change. Grid of (non-featured-variant) `TrainingCard`s + `Pagination`. |
| `TrainingDetailsPage` | `/trainings/:slug` | Hero, description, objectives, program, methodology, practical-info sidebar (duration/format/level/audience/prerequisites/next sessions), testimonials filtered by `trainingId`, related trainings (same category, current excluded), FAQ (`Accordion`), closing CTA panel. Loading/error/not-found states are explicit branches, not just an empty page. Every CTA is lead-generation (`/request-information`, `/request-quote`, `/contact`) — no cart, no checkout, matching CLAUDE.md §19/§49. (A per-training trainer section — `TrainerPreviewCard`s resolved via `useTrainers()` — existed here from M3 but was removed, see below.) |

## New UI/business components — M4

| Component | Composes | Notes |
|---|---|---|
| `CtaBanner` | `Button`, `RevealOnScroll` | The "CTA (standalone)" gap this doc previously flagged. Same gradient-panel visual language as Home's `FinalCtaSection`, but a plain fade/rise instead of GSAP ScrollTrigger — content (title/description/labels) always supplied by the caller, no copy of its own. Used to close all 10 M4 pages. |
| `PartnerCard` | `Card` | Logo (plain `<img>`, same treatment as `TrustLogosSection`'s marquee) + name + short collaboration description. Separate from, and doesn't touch, the Home Page marquee. |
| `SuccessStoryCard` | `Card`, `Badge`, `Divider` | Industry badge + client name, challenge/approach as labeled paragraphs (plain headings, not `<dl>`/`<dt>`/`<dd>` — same accessibility call made on `TrainingDetailsPage`'s practical-info sidebar), then a row of result stat highlights. |
| `ArticleCard` | `Card`, `Badge`, `Image`, `Link` | `featured`/`compact` variant split, same pattern as `TrainingCard`/`EventPreviewCard`. Links to `/resources/:slug`. |
| `IndustryTile` | `Icon` | Non-interactive display tile (icon badge + name + description) — unlike `CategoryTile`, doesn't link anywhere, since industries are a content taxonomy, not a catalog filter (spec §9). |

## Pages (`src/pages/`) — M4 additions

| Page | Route | Notes |
|---|---|---|
| `AboutPage` | `/about` | Mission/vision/values/approach/key-figures — static copy (`about.json`), not a mock-data domain. |
| `TestimonialsPage` | `/testimonials` | Full listing, reuses `useTestimonials()` + `TestimonialCard` as-is (mock data expanded 3 → 7). |
| `PartnersPage` | `/partners` | New `Partner` domain + `PartnerCard`. |
| `SuccessStoriesPage` | `/success-stories` | New `SuccessStory` domain + `SuccessStoryCard`. |
| `EventsPage` | `/events` | Upcoming/past split via `useEvents()` (new `EventRepository.getAll()`) — two stacked sections, not a custom tab widget. |
| `ResourcesPage` / `ArticleDetailsPage` | `/resources`, `/resources/:slug` | New `Article` domain. Details page mirrors `TrainingDetailsPage`'s loading/error/not-found branch shape exactly. |
| `FaqPage` | `/faq` | New `Faq` domain grouped by `categoryKey`; category filter reuses `FilterSelect` (M3); questions render through the existing `Accordion`. |
| `IndustriesPage` | `/industries` | New `Industry` domain (mirrors `Category`'s minimal shape) + `IndustryTile` grid. |
| `SolutionsForCompaniesPage` | `/solutions-for-companies` | Static copy (`solutions.json`), same reasoning as `AboutPage`. Primary CTA "Demander un devis", secondary "Demander une consultation" (M5) — no e-commerce. |

## New form components — M5 (`src/features/leads/`)

| Component | Notes |
|---|---|
| `HoneypotField` | Off-screen, out-of-tab-order hidden input — real users never see or reach it; a naive bot filling every field fills this one too. Checked in `LeadService.submit()`, not here. |
| `FormSection` | Logical field grouping (Personal info / Company info / Training requirements / Message / Consent) shared by all 5 forms. |
| `LeadFormSuccess` | Shared post-submission confirmation — a native `<output>` (implicit ARIA role "status"), title/description/two next-action buttons all supplied by the caller. Swaps in for the form in place; never a redirect. |
| `TrainingSelectField` | `useTrainings()` + native `Select`, wired for `register()` — the training/program picker shared by Request Information, Request a Quote and Register Interest. |
| `buildContactFieldsSchema(t)` / `buildConsentSchema(t)` / `optionalEnum(values)` (`schemas/`) | Shared Zod building blocks each form's schema factory extends. `optionalEnum` exists because `z.enum([...]).optional()` alone doesn't accept the `''`/`null` an unselected native `<select>`/`RadioGroup` actually produces — see ROADMAP.md's M5 section for the bug this fixed. |

## Pages (`src/pages/`) — M5 additions

| Page | Route | Notes |
|---|---|---|
| `RequestInformationPage` | `/request-information` | Training preselected from `?training=<slug>`. |
| `RequestQuotePage` | `/request-quote` | Adds participants count, preferred format/date, location. |
| `ContactPage` | `/contact` | Subject field; keeps ISTAM's real contact details + `Map`/`LOCATION` (same pieces as Home's `LocationSection`, this page's own layout/copy). |
| `RegisterInterestPage` | `/register-interest` | New entry point on `TrainingDetailsPage`'s sidebar. |
| `ConsultationPage` | `/consultation` | New entry point: `SolutionsForCompaniesPage`'s secondary CTA. |

## Removed: public Trainers functionality

At the client's explicit request, **ISTAM does not publicly expose individual trainer identities, profiles, photos or biographies.** Removed entirely: the `TrainersPage` (`/trainers`), Home's `TrainersSection`, `TrainingDetailsPage`'s per-training trainer block, the `TrainerPreviewCard` component, the `useTrainers`/`useFeaturedTrainers` hooks, the trainer-avatar stack in Home's `Hero`, the `trainerPages` i18n namespace, the 10 trainer portrait photos, and the `/trainers` sitemap entry. The generic `Trainer` DTO/entity/repository/service/mapper chain was deliberately **kept** (mock data emptied, not deleted) as reusable infrastructure a future private/admin surface could still use — see `docs/ARCHITECTURE.md` and `docs/ROADMAP.md` for the full removal record. Generic, non-identifying mentions of "expert trainers" as a marketing claim (no name/photo) remain where they already existed (Hero's trust card, Home's value-proposition section, etc.).

## Not built yet

MegaMenu, Statistics (as a standalone reusable primitive — the Home Page's metrics bar is currently Home-specific), Modal, Toast, DatePicker, Newsletter, Skeleton. Legal pages (privacy/legal notice/cookies) remain a later milestone.
