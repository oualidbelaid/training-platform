import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { Accordion, type AccordionItemData } from '@/components/ui/Accordion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Pagination } from '@/components/ui/Pagination'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { TrainingCard } from '@/features/trainings/components/TrainingCard'
import { TrainingFilters, type TrainingFiltersValue } from '@/features/trainings/components/TrainingFilters'
import { useTrainingDomains } from '@/features/trainings/hooks/useTrainingDomains'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import type { SupportedLanguage } from '@/i18n'
import type { TrainingSortBy } from '@/repositories/training'
import type { TrainingFormat, TrainingLevel } from '@/types/entities/common'
import { getLocalizedText } from '@/utils/localized-text'

const PAGE_SIZE = 9

/**
 * Training Catalog (spec §18, M3). Filter/search/sort/page state lives in
 * the URL (`useSearchParams`) rather than local component state — the
 * result is shareable/bookmarkable, and it's how `CategoryTile` already
 * links here (`/trainings?category=<slug>`) from the Home Page, so no
 * change was needed there. No cart, no checkout — every card's CTA is
 * "Learn more" through to the Training Details page.
 */
export default function TrainingCatalogPage() {
  const { t, i18n } = useTranslation('catalog')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const [searchParams, setSearchParams] = useSearchParams()

  const categoriesQuery = useCategories()
  const domainsQuery = useTrainingDomains()
  const categorySlug = searchParams.get('category') ?? ''
  const selectedCategory = categoriesQuery.data?.find((category) => category.slug === categorySlug)
  const categoryId = selectedCategory?.id

  const page = Number(searchParams.get('page') ?? '1') || 1
  const filters: TrainingFiltersValue = {
    search: searchParams.get('q') ?? '',
    categorySlug,
    format: searchParams.get('format') ?? '',
    level: searchParams.get('level') ?? '',
    sortBy: searchParams.get('sort') ?? 'relevance',
  }

  const trainingsQuery = useTrainings({
    page,
    pageSize: PAGE_SIZE,
    categoryId: categorySlug ? categoryId : undefined,
    search: filters.search || undefined,
    searchLanguage: language,
    format: (filters.format || undefined) as TrainingFormat | undefined,
    level: (filters.level || undefined) as TrainingLevel | undefined,
    sortBy: filters.sortBy as TrainingSortBy,
  })

  const categoryById = useMemo(
    () => new Map(categoriesQuery.data?.map((category) => [category.id, category])),
    [categoriesQuery.data],
  )

  const domainAccordionItems: AccordionItemData[] = useMemo(() => {
    if (!categoryId || !domainsQuery.data) return []
    return domainsQuery.data
      .filter((domain) => domain.categoryId === categoryId)
      .map((domain) => ({
        id: domain.id,
        question: (
          <span className="flex flex-1 items-center justify-between gap-4">
            <span>{getLocalizedText(domain.name, language)}</span>
            <span className="shrink-0 text-caption font-normal text-foreground-faint">
              {t('domains.courseCount', { count: domain.courses.length })}
            </span>
          </span>
        ),
        answer: (
          <ul className="grid gap-2 sm:grid-cols-2">
            {domain.courses.map((course) => (
              <li key={getLocalizedText(course.name, language)} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-faint" />
                {getLocalizedText(course.name, language)}
              </li>
            ))}
          </ul>
        ),
      }))
  }, [categoryId, domainsQuery.data, language, t])

  function updateFilters(patch: Partial<TrainingFiltersValue>) {
    const next = new URLSearchParams(searchParams)
    const merged = { ...filters, ...patch }

    if (merged.search) next.set('q', merged.search)
    else next.delete('q')
    if (merged.categorySlug) next.set('category', merged.categorySlug)
    else next.delete('category')
    if (merged.format) next.set('format', merged.format)
    else next.delete('format')
    if (merged.level) next.set('level', merged.level)
    else next.delete('level')
    if (merged.sortBy && merged.sortBy !== 'relevance') next.set('sort', merged.sortBy)
    else next.delete('sort')
    next.delete('page')

    setSearchParams(next)
  }

  function goToPage(nextPage: number) {
    const next = new URLSearchParams(searchParams)
    if (nextPage <= 1) next.delete('page')
    else next.set('page', String(nextPage))
    setSearchParams(next)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  const total = trainingsQuery.data?.total ?? 0
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/trainings" />
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
        <Container className="flex flex-col gap-8">
          <RevealOnScroll>
            <TrainingFilters
              value={filters}
              onChange={updateFilters}
              categories={categoriesQuery.data ?? []}
              language={language}
            />
          </RevealOnScroll>

          {selectedCategory && domainAccordionItems.length > 0 ? (
            <RevealOnScroll className="flex flex-col gap-4 rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8">
              <SectionHeading
                eyebrow={t('domains.eyebrow')}
                title={t('domains.title', { category: getLocalizedText(selectedCategory.name, language) })}
                description={t('domains.description')}
              />
              <Accordion items={domainAccordionItems} />
            </RevealOnScroll>
          ) : null}

          {trainingsQuery.isLoading ? <LoadingState /> : null}
          {trainingsQuery.isError ? <ErrorState onRetry={() => void trainingsQuery.refetch()} /> : null}

          {!trainingsQuery.isLoading && !trainingsQuery.isError ? (
            <>
              <p className="text-small text-foreground-muted">{t('results.count', { count: total })}</p>

              {trainingsQuery.data && trainingsQuery.data.items.length > 0 ? (
                <Grid cols={3}>
                  {trainingsQuery.data.items.map((training) => {
                    const category = categoryById.get(training.categoryId)
                    return (
                      <RevealOnScroll key={training.id}>
                        <TrainingCard
                          training={training}
                          categoryName={category ? getLocalizedText(category.name, language) : undefined}
                        />
                      </RevealOnScroll>
                    )
                  })}
                </Grid>
              ) : (
                <EmptyState title={t('empty.title')} description={t('empty.description')} />
              )}

              <Pagination
                page={page}
                pageCount={pageCount}
                onPageChange={goToPage}
                statusLabel={t('pagination.status', { page, pageCount })}
                previousLabel={t('pagination.previous')}
                nextLabel={t('pagination.next')}
              />
            </>
          ) : null}
        </Container>
      </Section>
    </>
  )
}
