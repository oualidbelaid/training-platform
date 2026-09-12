import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'
import { WebsiteSchema } from '@/components/seo/WebsiteSchema'
import { Hero } from '@/pages/home/sections/Hero'
import { TrustLogosSection } from '@/pages/home/sections/TrustLogosSection'
import { CategoriesSection } from '@/pages/home/sections/CategoriesSection'
import { ProfessionalDevelopmentSection } from '@/pages/home/sections/ProfessionalDevelopmentSection'
import { FeaturedTrainingsSection } from '@/pages/home/sections/FeaturedTrainingsSection'
import { ValuePropositionSection } from '@/pages/home/sections/ValuePropositionSection'
import { CompaniesSection } from '@/pages/home/sections/CompaniesSection'
import { TestimonialsSection } from '@/pages/home/sections/TestimonialsSection'
import { LocationSection } from '@/pages/home/sections/LocationSection'
import { EventsSection } from '@/pages/home/sections/EventsSection'
import { FinalCtaSection } from '@/pages/home/sections/FinalCtaSection'

/**
 * The Home Page (spec M2, then the "final premium UX / scroll storytelling"
 * pass). Storytelling order follows the spec's recommendation with two
 * adjustments, both explicitly allowed by CLAUDE.md when they serve a
 * stronger structure:
 *   - "Professional expertise / methodology" is folded into Value
 *     Proposition rather than given its own section.
 *   - ProfessionalDevelopmentSection — the signature scroll-driven "moment"
 *     — sits right after Categories and before Featured Trainings, exactly
 *     where the redesign brief requested it: after the visitor has seen
 *     *what* is taught, before *which specific programs* are popular.
 * TrustLogosSection (client-recognition) sits right after the Hero, and
 * LocationSection sits after Testimonials, before Events, matching the
 * branding-refinement brief's suggested position (§14).
 */
export default function HomePage() {
  const { t } = useTranslation('home')

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/" />
      <OrganizationSchema />
      <WebsiteSchema />
      <Hero />
      <TrustLogosSection />
      <CategoriesSection />
      <ProfessionalDevelopmentSection />
      <FeaturedTrainingsSection />
      <ValuePropositionSection />
      <CompaniesSection />
      <TestimonialsSection />
      <LocationSection />
      <EventsSection />
      <FinalCtaSection />
    </>
  )
}
