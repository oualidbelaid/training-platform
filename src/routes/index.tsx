import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import {
  AboutPage,
  ArticleDetailsPage,
  ConsultationPage,
  ContactPage,
  DesignSystemPreviewPage,
  FaqPage,
  HomePage,
  IndustriesPage,
  NotFoundPage,
  RegisterInterestPage,
  RequestInformationPage,
  RequestQuotePage,
  ResourcesPage,
  SolutionsForCompaniesPage,
  SuccessStoriesPage,
  TestimonialsPage,
  TrainingCatalogPage,
  TrainingDetailsPage,
} from './lazy-pages'

/**
 * Route table. "/" is the real Home Page (spec M2). "/trainings" and
 * "/trainings/:slug" are the Training Catalog + Details pages (M3) — the
 * `/trainings` path (not `/formations`) matches every link already built
 * across the Home Page (Navbar, Footer, CategoryTile, CTAs) since M2, so
 * keeping it avoids breaking/duplicating that existing architecture.
 * "/_design-system" is an internal, noindex'd component gallery (M1) for
 * visual/RTL/responsive QA — not a business page, never linked from nav.
 *
 * M4 adds the remaining content pages. Slugs are English, matching the
 * `/trainings` precedent above — `/about` and `/resources` specifically
 * were **not** a free choice: the Navbar and
 * Footer already hard-linked to those exact paths since M2/M3, so using
 * them is what let this milestone ship without touching Header/Footer
 * markup at all. The remaining slugs (`/testimonials`,
 * `/success-stories`, `/faq`, `/industries`, `/solutions-for-companies`)
 * follow the same English-kebab-case convention for consistency.
 *
 * M5 adds the 5 lead-generation experiences. `/request-information`,
 * `/request-quote` and `/contact` were, again, not a free choice — every
 * CTA built since M2/M3 (Navbar, Footer, Home's `FinalCtaSection`,
 * `TrainingDetailsPage`, most M4 pages' `CtaBanner`) already links to
 * those exact paths, `?training=<slug>` included. `/register-interest`
 * and `/consultation` are new, unclaimed slugs, same kebab-case
 * convention. Legal pages (privacy/legal notice/cookies) remain a later
 * milestone.
 *
 * `/trainers` (M4) was later removed at the client's explicit request:
 * ISTAM does not publicly expose individual trainer identities, profiles,
 * photos or biographies. No redirect was added — the underlying content
 * genuinely no longer exists, so the route falls through to the catch-all
 * `NotFoundPage` like any other unknown path. See docs/ROADMAP.md.
 *
 * `/events` (M4) was later removed entirely — page, Home section,
 * repository, DTO/entity, i18n, sitemap entry — with no architecture kept
 * for later reuse (unlike `/trainers`). No redirect: falls through to
 * `NotFoundPage`. See docs/ROADMAP.md.
 *
 * `/partners` (M4) was later removed the same way as `/events` — page,
 * `PartnerCard`, `partners.json` i18n namespace, sitemap entry — after its
 * only entry point (Home's `TrustLogosSection` "Voir nos partenaires" CTA)
 * was removed. Unlike `/events`, the underlying `Partner` DTO/entity/
 * repository/service/`usePartners()` hook were **kept**: `TrustLogosSection`
 * still sources its logo marquee from them. No redirect: falls through to
 * `NotFoundPage`. See docs/ROADMAP.md.
 */
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'trainings', element: <TrainingCatalogPage /> },
      { path: 'trainings/:slug', element: <TrainingDetailsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'success-stories', element: <SuccessStoriesPage /> },
      { path: 'resources', element: <ResourcesPage /> },
      { path: 'resources/:slug', element: <ArticleDetailsPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'industries', element: <IndustriesPage /> },
      { path: 'solutions-for-companies', element: <SolutionsForCompaniesPage /> },
      { path: 'request-information', element: <RequestInformationPage /> },
      { path: 'request-quote', element: <RequestQuotePage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'register-interest', element: <RegisterInterestPage /> },
      { path: 'consultation', element: <ConsultationPage /> },
      { path: '_design-system', element: <DesignSystemPreviewPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
