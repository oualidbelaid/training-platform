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
 * One large client story, with the supporting testimonials stacked
 * alongside it (redesign §19) instead of three equal-weight cards.
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
          <div className="mt-10 grid gap-8 lg:grid-cols-5 lg:items-stretch">
            <RevealOnScroll className="lg:col-span-3">
              <TestimonialCard testimonial={featured} language={language} variant="featured" />
            </RevealOnScroll>

            <div className="flex flex-col gap-6 lg:col-span-2">
              {rest.map((testimonial) => (
                <RevealOnScroll key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} language={language} variant="compact" />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        ) : null}

        <p className="mt-8 text-center text-caption text-foreground-faint">
          {t('testimonials.disclaimer')}
        </p>
      </Container>
    </Section>
  )
}
