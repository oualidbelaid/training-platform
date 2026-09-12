import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
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
 * Editorial "one large panel + a list" composition (redesign §12) —
 * deliberately not a repeated card grid. The featured category gets full
 * typographic and visual weight; the rest are a compact, scannable list.
 */
export function CategoriesSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage
  const categoriesQuery = useCategories()
  const trainingsQuery = useTrainings()

  const isLoading = categoriesQuery.isLoading || trainingsQuery.isLoading
  const isError = categoriesQuery.isError || trainingsQuery.isError
  const categories = categoriesQuery.data

  const programCountByCategory = new Map<string, number>()
  for (const training of trainingsQuery.data?.items ?? []) {
    programCountByCategory.set(
      training.categoryId,
      (programCountByCategory.get(training.categoryId) ?? 0) + 1,
    )
  }

  const [featured, ...rest] = categories ?? []

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

        {featured ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-5">
            <RevealOnScroll className="lg:col-span-3">
              <CategoryTile
                category={featured}
                name={getLocalizedText(featured.name, language)}
                description={getLocalizedText(featured.description, language)}
                programCount={programCountByCategory.get(featured.id) ?? 0}
                icon={(CATEGORY_VISUALS[featured.slug] ?? DEFAULT_CATEGORY_VISUAL).icon}
                badgeClassName={
                  (CATEGORY_VISUALS[featured.slug] ?? DEFAULT_CATEGORY_VISUAL).badgeClassName
                }
                variant="featured"
              />
            </RevealOnScroll>

            <RevealOnScroll className="lg:col-span-2">
              <div className="flex h-full flex-col justify-center rounded-2xl border border-border bg-surface p-6 sm:p-8">
                {rest.map((category) => {
                  const visual = CATEGORY_VISUALS[category.slug] ?? DEFAULT_CATEGORY_VISUAL
                  return (
                    <CategoryTile
                      key={category.id}
                      category={category}
                      name={getLocalizedText(category.name, language)}
                      description={getLocalizedText(category.description, language)}
                      programCount={programCountByCategory.get(category.id) ?? 0}
                      icon={visual.icon}
                      badgeClassName={visual.badgeClassName}
                      variant="compact"
                    />
                  )
                })}
              </div>
            </RevealOnScroll>
          </div>
        ) : null}
      </Container>
    </Section>
  )
}
