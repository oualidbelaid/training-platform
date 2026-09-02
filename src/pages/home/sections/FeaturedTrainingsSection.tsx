import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { EmptyState } from '@/components/feedback/EmptyState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { TrainingCard } from '@/features/trainings/components/TrainingCard'
import { useFeaturedTrainings } from '@/features/trainings/hooks/useFeaturedTrainings'
import { useCategories } from '@/features/categories/hooks/useCategories'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * One dominant horizontal training + a row of compact supporting cards
 * below it (redesign §13) — visually distinct from CategoriesSection's
 * "large panel + list" so the page doesn't repeat the same formula twice
 * in a row (redesign §14).
 */
export function FeaturedTrainingsSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const trainingsQuery = useFeaturedTrainings()
  const categoriesQuery = useCategories()

  const isLoading = trainingsQuery.isLoading || categoriesQuery.isLoading
  const isError = trainingsQuery.isError || categoriesQuery.isError
  const trainings = trainingsQuery.data
  const categoryById = new Map(categoriesQuery.data?.map((category) => [category.id, category]))
  const [dominant, ...supporting] = trainings ?? []

  return (
    <Section spacing="md">
      <Container>
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('featuredTrainings.eyebrow')}
            title={t('featuredTrainings.title')}
            description={t('featuredTrainings.description')}
          />
          <Button asChild variant="outline" className="shrink-0">
            <RouterLink to="/trainings">{t('featuredTrainings.cta')}</RouterLink>
          </Button>
        </RevealOnScroll>

        {isLoading ? <LoadingState className="mt-10" /> : null}
        {isError ? (
          <ErrorState className="mt-10" onRetry={() => void trainingsQuery.refetch()} />
        ) : null}
        {!isLoading && !isError && trainings?.length === 0 ? (
          <EmptyState className="mt-10" />
        ) : null}

        {dominant ? (
          <div className="mt-10 flex flex-col gap-8">
            <RevealOnScroll>
              <TrainingCard
                training={dominant}
                categoryName={
                  categoryById.get(dominant.categoryId)
                    ? getLocalizedText(categoryById.get(dominant.categoryId)!.name, language)
                    : undefined
                }
                featured
              />
            </RevealOnScroll>

            {supporting.length > 0 ? (
              <Grid cols={3}>
                {supporting.map((training) => {
                  const category = categoryById.get(training.categoryId)
                  return (
                    <RevealOnScroll key={training.id}>
                      <TrainingCard
                        training={training}
                        categoryName={
                          category ? getLocalizedText(category.name, language) : undefined
                        }
                      />
                    </RevealOnScroll>
                  )
                })}
              </Grid>
            ) : null}
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
