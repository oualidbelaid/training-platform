import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Icon, type IconName } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { TrainerPreviewCard } from '@/features/trainers/components/TrainerPreviewCard'
import { useTrainers } from '@/features/trainers/hooks/useTrainers'
import type { SupportedLanguage } from '@/i18n'

const EXPERTISE_KEYS = ['leadership', 'digital', 'finance', 'communication'] as const
const EXPERTISE_ICONS: Record<(typeof EXPERTISE_KEYS)[number], IconName> = {
  leadership: 'user-group',
  digital: 'microchip',
  finance: 'wallet',
  communication: 'bullhorn',
}

/** Trainers / Notre équipe (spec §17, M4). Full directory — reuses `useTrainers()` and `TrainerPreviewCard` as-is. */
export default function TrainersPage() {
  const { t, i18n } = useTranslation('trainerPages')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const trainersQuery = useTrainers()

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/trainers" />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <SectionHeading as="h1" eyebrow={t('hero.eyebrow')} title={t('hero.title')} description={t('hero.description')} />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="flex flex-col gap-6">
          <RevealOnScroll>
            <p className="max-w-2xl text-body-lg text-foreground-muted">{t('intro.description')}</p>
          </RevealOnScroll>

          {trainersQuery.isLoading ? <LoadingState /> : null}
          {trainersQuery.isError ? <ErrorState onRetry={() => void trainersQuery.refetch()} /> : null}

          {!trainersQuery.isLoading && !trainersQuery.isError ? (
            trainersQuery.data && trainersQuery.data.length > 0 ? (
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
                {trainersQuery.data.map((trainer) => (
                  <RevealOnScroll key={trainer.id}>
                    <TrainerPreviewCard trainer={trainer} language={language} />
                  </RevealOnScroll>
                ))}
              </div>
            ) : (
              <EmptyState title={t('empty.title')} description={t('empty.description')} />
            )
          ) : null}
        </Container>
      </Section>

      <Section spacing="sm" className="bg-surface-subtle">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll>
            <SectionHeading eyebrow={t('expertise.eyebrow')} title={t('expertise.title')} description={t('expertise.description')} />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
              {EXPERTISE_KEYS.map((key) => (
                <div key={key} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
                    <Icon name={EXPERTISE_ICONS[key]} aria-hidden="true" className="text-xl" />
                  </span>
                  <p className="text-body font-medium text-foreground">{t(`expertise.items.${key}`)}</p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/trainings' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/contact' }}
      />
    </>
  )
}
