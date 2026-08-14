import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { EventPreviewCard } from '@/features/events/components/EventPreviewCard'
import { useUpcomingEvents } from '@/features/events/hooks/useUpcomingEvents'
import type { SupportedLanguage } from '@/i18n'

export function EventsSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const { data: events, isLoading, isError, refetch } = useUpcomingEvents()
  const [featured, ...rest] = events ?? []

  return (
    <Section spacing="md">
      <Container>
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('events.eyebrow')}
            title={t('events.title')}
            description={t('events.description')}
          />
          <Button asChild variant="outline" className="shrink-0">
            <RouterLink to="/events">{t('events.cta')}</RouterLink>
          </Button>
        </RevealOnScroll>

        {isLoading ? <LoadingState className="mt-10" /> : null}
        {isError ? <ErrorState className="mt-10" onRetry={() => void refetch()} /> : null}

        {featured ? (
          <div className="mt-10 flex flex-col gap-6">
            <RevealOnScroll>
              <EventPreviewCard event={featured} language={language} variant="featured" />
            </RevealOnScroll>

            {rest.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {rest.map((event) => (
                  <RevealOnScroll key={event.id}>
                    <EventPreviewCard event={event} language={language} variant="compact" />
                  </RevealOnScroll>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
