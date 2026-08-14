import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { EventSchema } from '@/components/seo/EventSchema'
import { Seo } from '@/components/seo/Seo'
import { EventPreviewCard } from '@/features/events/components/EventPreviewCard'
import { useEvents } from '@/features/events/hooks/useEvents'
import type { SupportedLanguage } from '@/i18n'

/**
 * Events / Événements (spec §21, M4). `useEvents()` fetches every event
 * (past + future); the upcoming/past split is a client-side date
 * comparison against today, presented as two stacked, clearly labeled
 * sections rather than a custom ARIA tab widget — simpler, and both lists
 * are short enough that hiding one behind a tab would cost more than it
 * saves.
 */
export default function EventsPage() {
  const { t, i18n } = useTranslation('events')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const eventsQuery = useEvents()

  const { upcoming, past } = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    const events = eventsQuery.data ?? []
    return {
      upcoming: events.filter((event) => event.startDate >= today).sort((a, b) => a.startDate.localeCompare(b.startDate)),
      past: events.filter((event) => event.startDate < today).sort((a, b) => b.startDate.localeCompare(a.startDate)),
    }
  }, [eventsQuery.data])

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/events" />
      <BreadcrumbSchema items={breadcrumbItems} />
      {[...upcoming, ...past].map((event) => (
        <EventSchema key={event.id} event={event} language={language} />
      ))}

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <SectionHeading as="h1" eyebrow={t('hero.eyebrow')} title={t('hero.title')} description={t('hero.description')} />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="flex flex-col gap-16">
          {eventsQuery.isLoading ? <LoadingState /> : null}
          {eventsQuery.isError ? <ErrorState onRetry={() => void eventsQuery.refetch()} /> : null}

          {!eventsQuery.isLoading && !eventsQuery.isError ? (
            <>
              <div className="flex flex-col gap-6">
                <h2 className="text-h2 font-bold text-foreground">{t('tabs.upcoming')}</h2>
                {upcoming.length > 0 ? (
                  <Grid cols={3} gap="lg">
                    {upcoming.map((event) => (
                      <RevealOnScroll key={event.id}>
                        <EventPreviewCard event={event} language={language} />
                      </RevealOnScroll>
                    ))}
                  </Grid>
                ) : (
                  <EmptyState title={t('empty.upcomingTitle')} description={t('empty.upcomingDescription')} />
                )}
              </div>

              <div className="flex flex-col gap-6">
                <h2 className="text-h2 font-bold text-foreground">{t('tabs.past')}</h2>
                {past.length > 0 ? (
                  <Grid cols={3} gap="lg">
                    {past.map((event) => (
                      <RevealOnScroll key={event.id}>
                        <EventPreviewCard event={event} language={language} />
                      </RevealOnScroll>
                    ))}
                  </Grid>
                ) : (
                  <EmptyState title={t('empty.pastTitle')} description={t('empty.pastDescription')} />
                )}
              </div>
            </>
          ) : null}
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/request-information' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/contact' }}
      />
    </>
  )
}
