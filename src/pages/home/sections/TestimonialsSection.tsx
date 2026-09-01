import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { TestimonialCard } from '@/features/testimonials/components/TestimonialCard'
import { useTestimonials } from '@/features/testimonials/hooks/useTestimonials'
import type { SupportedLanguage } from '@/i18n'

/**
 * One large client story, with the supporting testimonials beside it
 * (redesign §19) instead of three equal-weight cards.
 *
 * Layout-balance pass: the supporting testimonials render as a 2-column
 * grid (not a single-column vertical stack) so that column's height stays
 * roughly in step with the featured card instead of running far taller —
 * the original imbalance this fixes. Left/right are ~50/50 (`lg:grid-cols-2`)
 * rather than 60/40, and the supporting cards use the `compact-dense`
 * variant (tighter padding/gap, smaller quote text) so two columns of them
 * still feel comfortable, not cramped.
 */
export function TestimonialsSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const { data: testimonials, isLoading, isError, refetch } = useTestimonials()
  const [featured, ...rest] = testimonials ?? []

  return (
    <Section spacing="md">
      <Container>
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={t('testimonials.eyebrow')} title={t('testimonials.title')} />
          <Button asChild variant="outline" className="shrink-0">
            <RouterLink to="/testimonials">{t('testimonials.cta')}</RouterLink>
          </Button>
        </RevealOnScroll>

        {isLoading ? <LoadingState className="mt-10" /> : null}
        {isError ? <ErrorState className="mt-10" onRetry={() => void refetch()} /> : null}

        {featured ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
            <RevealOnScroll>
              <TestimonialCard testimonial={featured} language={language} variant="featured" />
            </RevealOnScroll>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {rest.map((testimonial) => (
                <RevealOnScroll key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} language={language} variant="compact-dense" />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-6 text-center text-caption text-foreground-faint">
          {t('testimonials.disclaimer')}
        </p>
      </Container>
    </Section>
  )
}
