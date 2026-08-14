import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { TrainerPreviewCard } from '@/features/trainers/components/TrainerPreviewCard'
import { useFeaturedTrainers } from '@/features/trainers/hooks/useFeaturedTrainers'
import type { SupportedLanguage } from '@/i18n'

/**
 * A compact professional directory (branding refinement §5, roster/size
 * update) — 2 columns on mobile, 3 on tablet, up to 5 on large desktop —
 * rather than one dominant portrait plus two supporting ones. "Premium
 * directory," not a profile-page grid. Now backed by 10 mock trainers
 * (up from 3) covering a wider spread of training areas.
 */
export function TrainersSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const { data: trainers, isLoading, isError, refetch } = useFeaturedTrainers()

  return (
    <Section spacing="sm">
      <Container>
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('trainers.eyebrow')}
            title={t('trainers.title')}
            description={t('trainers.description')}
          />
          <Button asChild variant="outline" className="shrink-0">
            <RouterLink to="/trainers">{t('trainers.cta')}</RouterLink>
          </Button>
        </RevealOnScroll>

        {isLoading ? <LoadingState className="mt-10" /> : null}
        {isError ? <ErrorState className="mt-10" onRetry={() => void refetch()} /> : null}

        {trainers ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {trainers.map((trainer) => (
              <RevealOnScroll key={trainer.id}>
                <TrainerPreviewCard trainer={trainer} language={language} />
              </RevealOnScroll>
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
