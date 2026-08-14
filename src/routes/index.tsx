import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import {
  AboutPage,
  ArticleDetailsPage,
  ConsultationPage,
  ContactPage,
  DesignSystemPreviewPage,
  EventsPage,
  FaqPage,
  HomePage,
  IndustriesPage,
  NotFoundPage,
  PartnersPage,
  RegisterInterestPage,
  RequestInformationPage,
  RequestQuotePage,
  ResourcesPage,
  SolutionsForCompaniesPage,
  SuccessStoriesPage,
  TestimonialsPage,
  TrainersPage,
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
 * `/trainings` precedent above — `/about`, `/trainers`, `/events` and
 * `/resources` specifically were **not** a free choice: the Navbar and
 * Footer already hard-linked to those exact paths since M2/M3, so using
 * them is what let this milestone ship without touching Header/Footer
 * markup at all. The remaining slugs (`/testimonials`, `/partners`,
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
 */
export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'trainings', element: <TrainingCatalogPage /> },
      { path: 'trainings/:slug', element: <TrainingDetailsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'trainers', element: <TrainersPage /> },
      { path: 'testimonials', element: <TestimonialsPage /> },
      { path: 'partners', element: <PartnersPage /> },
      { path: 'success-stories', element: <SuccessStoriesPage /> },
      { path: 'events', element: <EventsPage /> },
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
