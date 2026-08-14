# Design System

Status: **M1 complete**, typography/visual language refined in M2's redesign, further refined in the **"final premium UX / scroll storytelling" pass**, and then rebased onto the real **ISTAM** brand in the **"branding & UX refinement" pass** (real logo, a burgundy palette derived from it, FontAwesome icons, real training photography, a compact directory-style trainer grid, a location/map section, and a further-reduced type scale — see "Branding" and "Imagery" below). Tokens, layout primitives and the core component library are in place; business components (TrainingCard, CategoryTile, etc.) live under `features/*/components/`, composed from the primitives documented here.

Live gallery of everything below: run `npm run dev` and open `/_design-system` (internal, noindex'd, not linked from navigation).

## Where tokens live

`src/styles/globals.css`, inside a Tailwind v4 `@theme` block, plus `src/styles/fonts.css` for self-hosted font imports. Every `@theme` token is automatically available as a Tailwind utility (`--color-primary-600` → `bg-primary-600`/`text-primary-600`/`border-primary-600`; `--text-h1` → `text-h1`). **Never hardcode a color/spacing/radius/shadow/font value in a component** — extend the token set instead.

## Visual direction

Premium, editorial, restrained — closer to Linear/Stripe/Vercel's marketing sites than a generic SaaS template (CLAUDE.md explicitly warns against "generic Bootstrap-like layouts," "excessive gradients/glassmorphism," "AI-generated templates"). Color is confident but restrained: one brand color (now burgundy, see "Branding"), one accent used only for CTAs/highlights, everything else neutral.

This is now a **confirmed** direction, not a placeholder — see Color and Typography below for the actual values.

## Branding

The real client is **ISTAM**, a professional training organization. Brand source of truth:

- **Name** — `common.json` → `app.name` (all 3 locales) and `seoConfig.siteName` (`src/config/seo.config.ts`) — the latter auto-appends to every page's `<title>` and Open Graph `site_name` via the shared `Seo`/`OrganizationSchema` components, so it only needed changing in one place.
- **Logo** — `src/config/brand.ts` exports `BRAND.logo`, resolving to `src/assets/brand/istam-logo.png` (the client-supplied file, also kept at its original drop location `src/assets/images/ISTAM logo.png`). `Navbar` and `Footer` (including the mobile `Drawer` header) all render this same file at different heights — there is currently only one lockup (full mark + wordmark), no separate icon-only mark, so `public/favicon.svg` is **unchanged** until a real favicon export exists. **To update the logo:** replace `src/assets/brand/istam-logo.png` (or point `BRAND.logo` at a new import) — no component changes needed.
- **Color palette** — the primary scale (`--color-primary-*` in `src/styles/globals.css`) was rebuilt from the logo: a burgundy/wine mark (`#8C1E4B`-ish) + a neutral charcoal wordmark. The new scale keeps the exact same L/C progression shape as the original navy scale (vivid mid-tones, muted extremes) with the hue rotated from 255° (blue) to 345° (wine/magenta-red). Large full-bleed dark sections (`CompaniesSection`, `ProfessionalDevelopmentSection`) intentionally use `neutral-900`/`950` (the logo's charcoal), **not** a dark shade of the new burgundy scale — burgundy is reserved for interactive/brand moments (buttons, links, icons, badges, hover states), mirroring the logo's own color proportion (mostly gray + one red accent shape), not "paint everything wine red." `accent` (warm gold) is unchanged — burgundy + gold is a deliberate, classic premium pairing, not a leftover.
- Two hardcoded (non-token) color spots were updated by hand since they can't reference CSS custom properties: the Hero's `HeroScene` 3D orb material colors (`#8c1e4b` core, `#f7eef2` glass shell, `#dba7c0`/`#b23e6e` rings/light — all approximating the new primary scale), and the abstract placeholder-image generator's palette constants (kept for `testimonial.svg`/`events.svg`/trainer portraits — see "Imagery").

## Color

- **`primary`** (11-step burgundy/wine scale, `50`→`950`, derived from the ISTAM logo — see "Branding") — the brand color. `600` is the default interactive/CTA shade.
- **`neutral`** (12-step graphite/off-white scale, `0`→`950`) — everything structural (text, borders, backgrounds), and now also every large dark full-bleed section background (see "Branding").
- **`accent`** (`400`/`500`/`600`, warm gold) — CTAs and highlights only, per CLAUDE.md §8's "use sparingly." Not a secondary brand color.
- **Semantic status** — `success`/`warning`/`error`/`info`, each with a `-50` (badge background) and `-600`/`-700` (text) step.
- **Semantic aliases** (prefer these in components over raw scales): `background`, `surface`, `surface-subtle`, `foreground`, `foreground-muted`, `foreground-faint`, `foreground-inverse`, `border`, `border-strong`, `brand`, `brand-foreground`, and — added in the branding-refinement pass — `primary` / `primary-hover` / `primary-soft` / `secondary` / `muted` (thin aliases onto the scales above, not new hue families; `secondary` aliases `neutral-800`).

## Typography

**Revised during the M2 Home Page redesign, then reduced again in the branding-refinement pass.** The original direction paired large serif (Fraunces) display headlines with sans body text — reviewed against a premium-corporate reference and found to read as editorial/dated rather than premium-corporate. Headings now default to **Inter, heavy weight (700–800), tight tracking**. The branding-refinement pass then lowered the whole clamp() scale's ceiling and floor again (e.g. `--text-h1` max 3.25rem → 2.75rem, `--text-h2` max 2.5rem → 2.125rem, `--text-h3` max 1.75rem → 1.375rem) — the previous sizes still read as "volume" rather than a confident, restrained hierarchy. Because every heading consumes these tokens rather than a hardcoded size, this was a **single-file change** (`src/styles/globals.css`) that cascaded everywhere; only a handful of components additionally had their heading *role* stepped down a level (e.g. `CategoryTile`'s featured name and `TrainingCard`'s featured title moved from `text-h1` to `text-h2`, the Hero headline from `text-display` to `text-h1`). Fraunces is kept installed and available via `font-display`, but is now **opt-in only**, for a rare editorial accent (e.g. the oversized quotation mark in `TestimonialCard`) — never the default heading treatment.

Three font families, self-hosted via `@fontsource` (no external Google Fonts request — see `src/styles/fonts.css` for the exact weight files imported):

| Role | Family | Languages |
|---|---|---|
| `--font-sans` | Inter (now also the default for all headings) | fr, en |
| `--font-display` | Fraunces (serif) — opt-in accent only | fr, en |
| Arabic override | IBM Plex Sans Arabic | ar — replaces **both** `--font-sans` and `--font-display` |

Fraunces has no Arabic glyphs, and Arabic serif faces are rare/less legible in UI contexts, so Arabic uses a strong sans weight for display roles instead — a standard bilingual/multiscript pattern, not a compromise. The swap is a pure CSS override:

```css
:lang(ar) {
  --font-sans: 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;
  --font-display: 'IBM Plex Sans Arabic', ui-sans-serif, system-ui, sans-serif;
}
```

`DirectionProvider` (M0) already keeps `document.documentElement.lang` in sync with i18next, so no component branches on language itself — verified live: switching to Arabic changes `getComputedStyle(document.body).fontFamily` to `"IBM Plex Sans Arabic", ...` automatically.

### Named type-scale roles

Each is one Tailwind utility class combining size + line-height (+ tracking/weight where prescribed): `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-body-lg`, `text-body`, `text-small`, `text-caption`, `text-button`, `text-nav`. Display/H1/H2/H3 are fluid (`clamp()`-based) so they scale smoothly between mobile and ultra-wide rather than jumping at breakpoints. All roles default to `font-sans`; add `font-display` explicitly only for a deliberate, rare editorial accent.

## Spacing, radius, shadow, blur, gradients, z-index

- **Radius** — `xs`(4px)→`2xl`(24px), deliberately modest (CLAUDE.md §8 warns against "excessive rounded").
- **Shadow** — `xs`→`xl` subtle elevation, plus `shadow-brand` (a colored shadow used sparingly on primary-button hover for a premium lift).
- **Blur** — `xs`(4px)→`xl`(32px), backs both `blur-*` and `backdrop-blur-*` utilities (used by `GlassPanel`).
- **Gradients** — `--gradient-brand` (CTA panels), `--gradient-glow` (small warm accent glow), `--gradient-hero` (the Home Page hero's soft atmospheric wash — hand-updated from a blue tint to the burgundy hue in the branding-refinement pass, since it's a hardcoded `oklch(... 255)` value rather than a token reference), and `--gradient-text-brand` (used via the `.text-gradient-brand` utility for a single accented word in the Hero headline — `background-clip: text`, automatically burgundy since it references `--color-primary-*`). Exposed as `.bg-gradient-brand`/`.bg-gradient-glow`/`.bg-gradient-hero`/`.text-gradient-brand` utility classes in `@layer utilities`. Not used raw/inline — this is the only sanctioned way to apply a gradient, so gradients stay rare and intentional rather than scattered.
- **Z-index** — `dropdown`/`sticky`/`header`/`drawer`/`modal`/`toast`.
- **Breakpoints** — Tailwind defaults plus a custom `3xl` (120rem) for ultra-wide.

## Imagery

Centralized image registry: `src/config/media.ts`, mapping semantic keys to imports — components only ever consume `training.image` / `trainer.photoUrl` / `event.image` through the `Image` primitive; none of them import `media.ts` or know where a file physically lives.

**Real photography (branding-refinement pass, spec §11/§12/§13).** 8 keys — `heroTraining`, `leadership`, `management`, `digitalTransformation`, `communication`, `strategy`, `featuredTraining`, `companyTraining` — are now real editorial photography in `src/assets/images/photos/*.webp`, sourced from Unsplash's free tier (Unsplash License: commercial use permitted, no attribution required). Downloaded at 1100px wide / quality 70 / WebP for a small footprint (48–150 KB each vs. 127–452 KB as JPEG at the same width). Source record, for licensing traceability:

| Key | Unsplash photo ID | Photographer |
|---|---|---|
| `heroTraining` | `1681949222860-9cb3b0329878` | Sable Flow |
| `leadership` | `1758691736580-a41e0cfe9e9f` | Vitaly Gariev |
| `management` | `1758873269035-aae0e1fd3422` | Vitaly Gariev |
| `digitalTransformation` | `1709281847780-2b34c28853c0` | Lukas Müller |
| `communication` | `1573166826272-5acd0ef8f650` | Christina @ wocintechchat.com |
| `strategy` | `1758873268998-2f77c2d38862` | Vitaly Gariev |
| `featuredTraining` | `1758873269276-9518d0cb4a0b` | Vitaly Gariev |
| `companyTraining` | `1758518731706-be5d5230e5a5` | Unsplash contributor (uncredited in page metadata) |

**Trainer portraits (trainer-photography update, expanded in the roster/size update to 10).** All 10 mock trainers have a real individual portrait in `src/assets/images/trainers/trainer-{01..10}.webp`, all from the same Unsplash photographer (Vitaly Gariev) for consistent lighting/composition/quality across the roster, each a verified genuinely different person (an earlier candidate pair turned out to be two frames of the same photoshoot and was swapped out before use), downloaded at an 800×1000 face-aware crop (`crop=faces,center`) so `TrainerPreviewCard` never has to further crop a mismatched aspect ratio — the card itself displays them at 3:4 (`aspectRatio="3 / 4"`, shrunk from the original 4:5 in the size-reduction pass, still within the source crop so nothing is stretched or upscaled):

| Key | Trainer | Unsplash photo ID |
|---|---|---|
| `trainer1` | Claire Dubois | `1758876019290-be620a8971f3` |
| `trainer2` | Karim El Amrani | `1758518729058-b158e71c5a9b` |
| `trainer3` | Lina Haddad | `1758518727888-ffa196002e59` |
| `trainer4` | Sophie Laurent | `1758518729459-235dcaadc611` |
| `trainer5` | Nadia Cherif | `1758691737587-7630b4d31d16` |
| `trainer6` | Amel Rahmouni | `1753161618091-b4cf35b9aa99` |
| `trainer7` | Yacine Boukhalfa | `1758599543141-8eb4fa0d922d` |
| `trainer8` | Thomas Girard | `1758518729286-e8d94cc231f5` |
| `trainer9` | Julien Moreau | `1758876021212-a87517fc8954` |
| `trainer10` | Nicolas Petit | `1758518730620-fb1910998e32` |

All 10, Vitaly Gariev, Unsplash free tier.

`testimonial` and `events` remain the locally generated navy→now-burgundy/charcoal abstract decorative textures from the earlier redesign pass — they were never meant to be literal photography, so they were left alone.

Every domain entity that needs a photo carries a plain `image: string` (Training, required) or `image?: string` (Event, optional; Trainer already had `photoUrl?`) field, populated in mock data from `MEDIA.*` — **exactly the shape a future Dolibarr DTO will hand back** (a URL string).

**Replacing any of these with real ISTAM-supplied photography is a data change, not a component change:**
1. Drop the licensed file(s) into `src/assets/images/photos/` (or `src/assets/images/trainers/` for trainer portraits).
2. Point the relevant `MEDIA.*` entry at the new import (or, once Dolibarr is live, the DTO simply carries a real URL and `media.ts` is bypassed entirely for that field).

No entity, DTO, mapper, repository, or component edit is required either way — the same guarantee the Mock → Dolibarr repository swap already provides (spec §26). The `Image` primitive's branded-gradient fallback (see the Core Components table) means a missing/broken file degrades gracefully rather than showing a broken-image icon.

## Iconography

FontAwesome Free, self-hosted (branding-refinement §9/§10) — replaces the `lucide-react` SVG set used through the earlier redesign passes (now removed from `package.json`). The client supplied the FontAwesome CSS/webfont bundle directly (`src/styles/all.min.css` + root `webfonts/`); the working copy actually wired into the build lives at `src/styles/vendor/fontawesome/{css,webfonts}/`, mirroring FontAwesome's own package layout so the CSS's relative `url(../webfonts/...)` references resolve correctly through Vite (the original drop location's relative paths didn't line up with where the CSS file itself sat — see the git history for the exact mismatch). Imported once, globally, via `@import './vendor/fontawesome/css/all.min.css';` in `globals.css`.

**Every icon goes through `src/components/ui/Icon.tsx`** — `<Icon name="arrow-right" />` — never a raw `<i className="fa-solid fa-arrow-right" />` in a component. `name` is a closed union (`IconName`), so an unsupported/misspelled icon is a type error, not a silently-missing glyph. Sizing is font-size-based (`className="text-xl"`), not `h-*`/`w-*` like the SVG set it replaced; color follows the inherited text color exactly as before. Decorative by default (`aria-hidden`); pass `aria-label` for a meaningful icon, which switches it to `role="img"`.

## Layout primitives

- **`Container`** — max-width + responsive horizontal gutter (now includes a `3xl:` step for ultra-wide).
- **`Section`** — vertical rhythm; `spacing` prop (`none`/`sm`/`md`/`lg`).
- **`Stack`** — the one flex-composition primitive: `direction`, `gap`, `align`, `justify`, `wrap`. Covers both "Stack" and "Flex utilities" from the M1 spec — a separate `Flex` component would just duplicate this; one-off flex needs use Tailwind classes directly.
- **`Grid`** — responsive CSS grid, mobile-first (`grid-cols-1` below `sm`), `cols` (2/3/4) sets the breakpoint it expands at.

## Core components (`src/components/ui/`)

| Component | Notes |
|---|---|
| `Button` | Variants: `primary`/`secondary`/`outline`/`ghost`/`inverse` (for dark/photo backgrounds). Sizes `sm`/`md`/`lg`. `loading` prop shows a spinner + `aria-busy` + auto-disables. `asChild` via Radix `Slot`. |
| `IconButton` | Icon-only actions; `aria-label` is **required at the type level**. |
| `Link` | One primitive for internal (`react-router-dom` `Link`) and external (`<a target="_blank" rel="noopener noreferrer">`) — routes on whether `href` starts with `/`. |
| `Badge` | `neutral`/`brand`/`success`/`warning`/`error`/`outline`. |
| `Card` + `CardImage` + `CardContent` + `CardFooter` | Surface/border/radius/shadow + optional hover-depth. The primitive every future TrainingCard/TrainerCard/EventCard composes — **do not build those business cards from scratch**. |
| `GlassPanel` | `tone`: `light`/`dark`. Restrained per CLAUDE.md §8 — reach for `Card` by default; `GlassPanel` is for a small number of signature moments over imagery/gradients. |
| `Input`, `Textarea`, `Select` | Share `FormField` internally for label/hint/error layout; all wire `aria-invalid`/`aria-describedby`. `Select` is a styled **native** `<select>` — accessible by default, no custom listbox until a form genuinely needs one. |
| `Checkbox`, `Radio` + `RadioGroup` | Native inputs styled via the `accent-color` CSS property (Tailwind's `accent-*` utility) rather than custom-drawn controls — keyboard/screen-reader/OS-high-contrast behavior for free. `RadioGroup` provides the `<fieldset>`/`<legend>` grouping. |
| `FormField` | Shared label/hint/error chrome; also usable standalone when composing a future custom control. |
| `SectionHeading` | Eyebrow + large headline + supporting text — the recurring section-opener block (CLAUDE.md §8's "editorial layouts, strong typography, visual hierarchy"). |
| `Avatar` | Circular, with an initials fallback (`role="img"` + `aria-label` on the container — the correct pattern when a real `<img>` can't also render the text fallback). |
| `Image` | Lazy by default, `decoding="async"`, reserved `aspectRatio` to prevent CLS, subtle fade-in on load, `objectPosition` for off-center editorial crops, and (final pass) a **branded gradient fallback** — shown both on load error and when `src` is empty/undefined — so a missing image is never a broken-image icon or a blank box, and the aspect ratio/layout never shifts. |
| `Divider` | Horizontal = native `<hr>`. Vertical = `aria-hidden` div (no native vertical-rule element) using `border-s` (logical, RTL-safe). |
| `Rating` | Fractional star rating via two layered star rows clipped by width; `role="img"`, same composite-visual reasoning as `Avatar`. |
| `Drawer` | Accessible slide-in panel (`role="dialog"`, focus trap, Escape/backdrop close, focus return) — see `docs/COMPONENT_GUIDE.md`. |

## Interaction states

Every interactive primitive above implements the same state set consistently via tokens, not per-component ad-hoc styling: hover (`hover:` + a token-driven color/shadow shift), focus (`:focus-visible` → 2px `primary-500` outline, defined once globally), active/press (Tailwind's native `:active` or Framer's `pressScale`, see below), disabled (`disabled:opacity-50 disabled:pointer-events-none`), loading (`Button`'s `loading` prop), success/error (form controls' `error` prop + semantic color tokens).

## Motion system

`src/lib/motion.ts` holds every animation token/variant, numerically in sync with the `--duration-*`/`--ease-*` CSS custom properties:

- **Entrance**: `fadeInUp`, `fadeIn`, `scaleIn`, `staggerContainer` (Framer Motion `Variants`).
- **Hover/press**: `hoverLift`, `pressScale` presets (pass to `whileHover`/`whileTap`).
- **Page transitions**: `pageTransition` variant defined as a token but **not wired into the router yet** — there is only one real route today; wiring `AnimatePresence` belongs to the milestone that introduces real page-to-page navigation.

Tool selection (unchanged decision rule since M0, now exercised by real components, including a real **pinned** ScrollTrigger section): CSS for simple always-on transitions, **Framer Motion** for component-state-driven UI (`RevealOnScroll`, `TiltCard`, `FloatingElement`, `Button` loading spinner, and — final pass — the Professional Development section's per-stage text/image crossfade), **GSAP + ScrollTrigger** for scroll-position-driven choreography (Hero/Companies/FinalCta parallax, and the Professional Development section's pin + 5-stage progress tracking), **React Three Fiber** only for genuine 3D. Full table in `docs/ANIMATION_GUIDE.md`.

### Reduced motion

Every motion-bearing component checks `useReducedMotion()` (or the global CSS media-query kill-switch) and either renders statically (`RevealOnScroll`, `TiltCard`, `FloatingElement` all fall back to a plain, unanimated `div`) or, for `FloatingElement` specifically, is disabled outright rather than shortened — it's purely decorative, so there's no "essential" version of it to preserve.

## Restrained 3D / depth language (spec M1 §11)

Two new CSS-driven primitives complement the R3F `Scene3D` from M0 — neither imports `three`/`@react-three/fiber`:

- **`TiltCard`** (`components/motion/TiltCard.tsx`) — CSS `perspective` + Framer Motion spring-smoothed `rotateX`/`rotateY` following the pointer. This is the "3D card tilt" primitive; per `docs/ANIMATION_GUIDE.md`'s tool-selection table, card tilt is a CSS-3D case, not an R3F case. Gated by `useCanRender3D()` — the same hook the R3F layer uses — so it falls back to a static, untilted card on touch devices and under reduced motion.
- **`FloatingElement`** (`components/motion/FloatingElement.tsx`) — ambient vertical drift for decorative shapes/badges ("floating geometric shapes" in CLAUDE.md's root spec). Disabled under reduced motion.

Genuine 3D (a real hero scene) is still `components/three/HeroScene.tsx` — unchanged from M0, still a proof-of-architecture placeholder, still lazy-loaded/gated/error-boundaried via `Scene3D`. The final hero scene is designed in a later milestone.

## RTL

Verified live in a real browser (not just unit tests): switching to Arabic sets `dir="rtl"`, swaps both font families, and produces **zero horizontal overflow** on the full component gallery. Rules followed throughout the M1 components:

- Logical properties over physical ones: `border-s`/`border-e` (not `border-l`/`border-r`), `text-start`/`text-end`, `ms-*`/`me-*`/`ps-*`/`pe-*` where directional spacing is needed.
- No RTL-specific component variants or duplicated components — one implementation, direction-aware via logical CSS only.
- Icon-implying-direction cases (chevrons, back/forward arrows) don't exist yet in the M1 component set — that's a note for when navigation/pagination are built.

## Accessibility

- `:focus-visible` styling defined once globally (M0), inherited by every component.
- `prefers-reduced-motion` respected by every motion-bearing component via one shared hook.
- `IconButton.aria-label` is required at the **type level**, not just convention.
- Native form elements (`select`, `input[type=checkbox/radio]`) chosen specifically for their built-in accessibility over custom-drawn equivalents.
- `role="separator"`/`role="img"` used only where no semantic HTML tag exists (vertical divider, composite Avatar) — the horizontal divider uses a real `<hr>`, and the one remaining `role="img"` usage (`Avatar`) is a deliberate, documented, lint-suppressed exception (`.oxlintrc.json` `overrides`), not an oversight.
- `oxlint`'s `jsx-a11y` plugin passes with zero warnings across the entire M1 component set (verified — see the M1 completion report).

## Responsive

No business pages exist yet to audit page-by-page (that starts at M2 — see `docs/RESPONSIVE_GUIDE.md`), but every M1 primitive is mobile-first by construction: `Grid` defaults to one column below `sm`, `Container`/`Section` use responsive padding/spacing scales, and the type scale is fluid (`clamp()`-based) rather than breakpoint-stepped, so headline sizes never jump abruptly.
