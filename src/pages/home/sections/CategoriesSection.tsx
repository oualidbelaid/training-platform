import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { CategoryTile } from '@/features/trainings/components/CategoryTile'
import {
  CATEGORY_VISUALS,
  DEFAULT_CATEGORY_VISUAL,
} from '@/features/trainings/config/category-visuals'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import { useCategories } from '@/features/categories/hooks/useCategories'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * The 4 ISTAM service pillars in equal-size boxes (Home refinement pass) —
 * previously an asymmetric "1 featured + list" composition; now every
 * category renders through `CategoryTile`'s existing `featured` variant
 * (same TiltCard hover, icon, description, count, CTA) inside a 4-up `Grid`,
 * so no new card design or hover treatment was introduced.
 */
export function CategoriesSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const categoriesQuery = useCategories()
  const trainingsQuery = useTrainings()

  const isLoading = categoriesQuery.isLoading || trainingsQuery.isLoading
  const isError = categoriesQuery.isError || trainingsQuery.isError
  const categories = categoriesQuery.data ?? []

  const programCountByCategory = new Map<string, number>()
  for (const training of trainingsQuery.data?.items ?? []) {
    programCountByCategory.set(
      training.categoryId,
      (programCountByCategory.get(training.categoryId) ?? 0) + 1,
    )
  }

  return (
    <Section spacing="md">
      <Container>
        <RevealOnScroll className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow={t('categories.eyebrow')}
            title={t('categories.title')}
            description={t('categories.description')}
          />
          <Button asChild variant="outline" className="shrink-0">
            <RouterLink to="/trainings">{t('categories.cta')}</RouterLink>
          </Button>
        </RevealOnScroll>

        {isLoading ? <LoadingState className="mt-10" /> : null}
        {isError ? (
          <ErrorState className="mt-10" onRetry={() => void categoriesQuery.refetch()} />
        ) : null}

        {categories.length > 0 ? (
          <Grid cols={4} gap="lg" className="mt-10">
            {categories.map((category) => {
              const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_CATEGORY_VISUAL
              return (
                <RevealOnScroll key={category.id} className="h-full">
                  <CategoryTile
                    category={category}
                    name={getLocalizedText(category.name, language)}
                    description={getLocalizedText(category.description, language)}
                    programCount={programCountByCategory.get(category.id) ?? 0}
                    icon={visual.icon}
                    badgeClassName={visual.badgeClassName}
                    variant="featured"
                  />
                </RevealOnScroll>
              )
            })}
          </Grid>
        ) : null}
      </Container>
    </Section>
  )
}
