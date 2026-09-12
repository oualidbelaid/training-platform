# SEO Guide

Status: **implemented (M7)**. This document describes the SEO architecture as built, not a plan.

## Architecture

```
Training / Article / Event / Faq entity (existing, from the mock repository chain)
        ↓
lib/seo/structured-data.ts   — pure mapper fns → schema.org shape (never touches a DTO)
        ↓
components/seo/*Schema.tsx   — thin wrappers rendering <SchemaScript schema={...} />
        ↓
<head> (react-helmet-async)
```

Every structured-data mapper takes the same domain **entity** the page's own hook already returns — never a DTO, never a direct mock-data import. When the Mock repositories are eventually replaced with Dolibarr-backed ones (M12), this layer needs zero changes, since the entity shape is the stable contract (identical reasoning to every other mapper in the app — see `ARCHITECTURE.md`).

## Per-page metadata (`components/seo/Seo.tsx`)

Every route-level page renders one `<Seo title=... description=... canonicalPath=... image? type? />`. It sets:

- `<title>` (suffixed with the site name from `config/seo.config.ts`)
- meta description
- canonical URL (absolute, built from `seoConfig.siteUrl` + `canonicalPath`)
- `robots` `noindex` when `noIndex` is passed (e.g. `DesignSystemPreviewPage`)
- `og:title`, `og:description`, `og:type` (`website` by default, `article` on `ArticleDetailsPage`), `og:url`, `og:image` (page-specific `image` prop, falling back to `seoConfig.defaultOgImage`), `og:locale` (mapped per active language)
- `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`
- hreflang `<link>` alternates (see below) — rendered automatically whenever `canonicalPath` is provided

## Multilingual SEO

The app is a client-rendered SPA with no server-side per-language routing — language is chosen via `localStorage`/browser detection (`i18n/index.ts`). To give hreflang tags and the sitemap real, language-differentiated URLs without changing how real users browse, `'querystring'` (`?lng=fr|en|ar`) was added as the **first, highest-priority** source in the i18n detection order (`lookupQuerystring: 'lng'`).

- `?lng=` is **only** ever emitted by `lib/seo/hreflang.ts` (in `<head>` alternates) and `scripts/generate-sitemap.ts` (in the sitemap's `xhtml:link` entries).
- No in-app link, CTA, or the language switcher itself ever adds `?lng=` to a URL — normal browsing and the language-switching UX are unaffected.
- `buildHreflangLinks(canonicalPath)` returns one `?lng=<lang>` link per supported language plus one `x-default` link pointing at the bare canonical URL.

## Structured data (JSON-LD)

| Schema           | Where                                                  | Notes                                                                                                                                                  |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Organization`   | Every page (`OrganizationSchema`)                      | Includes `logo`                                                                                                                                        |
| `WebSite`        | Home only (`WebsiteSchema`)                            |                                                                                                                                                        |
| `BreadcrumbList` | Every page rendering `Breadcrumb` (`BreadcrumbSchema`) | Mirrors the same `items` shape as the `Breadcrumb` UI component                                                                                        |
| `Course`         | `TrainingDetailsPage` (`CourseSchema`)                 | `hasCourseInstance`/`CourseInstance.courseMode` mapped from the training's sessions/format; omitted entirely when a training has no scheduled sessions |
| `Article`        | `ArticleDetailsPage` (`ArticleSchema`)                 |                                                                                                                                                        |
| `Event`          | `EventsPage` (`EventSchema`, one per event)            | `eventAttendanceMode`/`location` mapped from `TrainingFormat` (in-person → `Place`, online → `VirtualLocation`)                                        |
| `FAQPage`        | `FaqPage` + each training's own FAQ (`FaqSchema`)      | One mapper (`faqItemsToFaqPageSchema`) covers both — `Faq` and `TrainingFaqItem` share the same `{question, answer}` shape                             |

**Person schema for trainers is deliberately not implemented** — the trainer roster (`TrainersPage`) is a grid of short bios, not individual profile pages; a Person schema per card was judged low-value relative to the effort. A considered exclusion, not a gap.

## Sitemap & robots.txt

Both are **build-time generated** by the same script, `scripts/generate-sitemap.ts`, run via `vite build --ssr` (plain Node/`tsx` execution can't resolve the real image assets the mock training/article data imports, nor populate `import.meta.env`). Wired into `npm run build`:

```
tsc -b && npm run generate:sitemap && vite build
```

- `public/sitemap.xml` — 17 static routes + one entry per training slug + one per article slug, sourced directly from the same mock data every page renders (no duplicated slug list, so it can't drift). Each `<url>` carries `xhtml:link` hreflang alternates matching `hreflang.ts`'s logic.
- `public/robots.txt` — `Allow: /`, `Disallow: /_design-system` (the internal design-system preview page), `Sitemap: <siteUrl>/sitemap.xml`.

Both files are generated from the same `seoConfig.siteUrl`, so they never drift apart when a real production domain is assigned. **Both are gitignored** — they are build artifacts, never hand-authored or committed, per the project's "never commit build artifacts" rule.

## Canonical URLs

Every page with filterable/param-driven state (`TrainingCatalogPage`'s filters, the lead forms' `?training=<slug>`) hardcodes a bare `canonicalPath` with no query string — there is no duplicate-URL indexing risk by construction.

## Semantic headings

`SectionHeading` accepts an `as?: 'h1' | 'h2'` prop (default `'h2'`). Each page's first/hero heading is `as="h1"`; every other `SectionHeading` on the page stays `h2`. The rendered CSS class is identical regardless of tag (`text-h2 text-foreground`) — this is a semantics-only change, never a visual one.

## Image SEO

`components/ui/Image.tsx` supports `loading`/`fetchPriority` overrides (default `loading="lazy"`). Each page's above-the-fold hero image is `loading="eager"`; the Home page's true LCP image additionally sets `fetchPriority="high"`. Everything else keeps the lazy default.

## Config

`src/config/seo.config.ts`:

```ts
{
  siteName: 'ISTAM',
  siteUrl: env.VITE_SITE_URL || 'https://www.example-training.com', // env-driven, placeholder fallback
  defaultLocale: 'fr',
  ogLocale: { fr: 'fr_FR', en: 'en_US', ar: 'ar_AR' },
  defaultOgImage: <existing hero photo asset>, // used when a page has no image of its own
}
```

`VITE_SITE_URL` (`.env.example`) lets a real production deployment set the real domain with zero code changes.

## Deliberate omissions

- No `apple-touch-icon` — no square icon-only ISTAM brand asset exists (only a wide mark+wordmark lockup, see `config/brand.ts`). Forcing that lockup into a square icon slot would itself be an unauthorized visual-asset invention; revisit if/when a dedicated square mark is provided.
- No Person schema for trainers (see Structured data above).
