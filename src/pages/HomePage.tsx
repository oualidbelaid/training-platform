import { useTranslation } from 'react-i18next'
import { Seo } from '@/components/seo/Seo'
import { OrganizationSchema } from '@/components/seo/OrganizationSchema'
import { WebsiteSchema } from '@/components/seo/WebsiteSchema'
import { Hero } from '@/pages/home/sections/Hero'
import { KeyPrinciplesSection } from '@/pages/home/sections/KeyPrinciplesSection'
import { EvaluationSection } from '@/pages/home/sections/EvaluationSection'
import { TrustLogosSection } from '@/pages/home/sections/TrustLogosSection'
import { CategoriesSection } from '@/pages/home/sections/CategoriesSection'
import { ProfessionalDevelopmentSection } from '@/pages/home/sections/ProfessionalDevelopmentSection'
import { CompaniesSection } from '@/pages/home/sections/CompaniesSection'
import { TestimonialsSection } from '@/pages/home/sections/TestimonialsSection'
import { LocationSection } from '@/pages/home/sections/LocationSection'
import { FinalCtaSection } from '@/pages/home/sections/FinalCtaSection'

/**
 * The Home Page (spec M2, then the "final premium UX / scroll storytelling"
 * pass, then the Home refinement pass). Storytelling order follows the
 * spec's recommendation with adjustments, all explicitly allowed by
 * CLAUDE.md when they serve a stronger structure:
 *   - KeyPrinciplesSection (the former ValuePropositionSection's 4 items)
 *     sits directly under the Hero, in the position the Hero's own
 *     subheadline used to occupy — not further down the page — per the
 *     Home refinement pass.
 *   - ProfessionalDevelopmentSection — the signature scroll-driven "moment"
 *     — sits right after Categories, exactly where the redesign brief
 *     requested it: after the visitor has seen *what* is taught.
 *   - EvaluationSection (rating summary + "leave an evaluation" CTA) sits
 *     right after KeyPrinciples, keeping the social-proof rating visible
 *     near the top without displacing KeyPrinciples from directly under
 *     the Hero.
 * TrustLogosSection (client-recognition) sits right after Evaluation, and
 * LocationSection sits after Testimonials, closing the page alongside
 * FinalCtaSection, matching the branding-refinement brief's suggested
 * position (§14).
 * ("Formations populaires"/FeaturedTrainingsSection was removed from the
 * Home page in the Home refinement pass — see docs/COMPONENT_GUIDE.md. The
 * Events page/section were removed entirely in a later client-directed
 * change — see docs/ROADMAP.md.)
 */
export default function HomePage() {
  const { t } = useTranslation('home')

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/" />
      <OrganizationSchema />
      <WebsiteSchema />
      <Hero />
      <KeyPrinciplesSection />
      <EvaluationSection />
      <TrustLogosSection />
      <CategoriesSection />
      <ProfessionalDevelopmentSection />
      <CompaniesSection />
      <TestimonialsSection />
      <LocationSection />
      <FinalCtaSection />
    </>
  )
}
