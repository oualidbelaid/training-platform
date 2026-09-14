import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Accordion, type AccordionItemData } from '@/components/ui/Accordion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { FilterSelect } from '@/components/ui/FilterSelect'
import { SearchBar } from '@/components/ui/SearchBar'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { useTrainingDomains } from '@/features/trainings/hooks/useTrainingDomains'
import { groupDomainsByCategory } from '@/features/trainings/utils/group-domains-by-category'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * Training Catalog (spec §18, M3 — later simplified in a client-directed
 * change, see docs/ROADMAP.md). No longer a filterable grid of individual
 * `Training` records: the page browses straight to the "categories +
 * thématiques" level. Each `Category` with at least one matching
 * `TrainingDomain` gets its own heading + `Accordion` — the exact block
 * that used to only render once a category was filtered now renders for
 * every visible category. Search narrows domain/course names
 * (`groupDomainsByCategory`) instead of training titles; the Category
 * `FilterSelect` beside it narrows which category (or categories) are
 * visible at all — `visibleCategories` is computed before grouping, so the
 * pure helper itself stays filter-agnostic. Format/Level/Sort do not come
 * back. `?category=<slug>` — still linked from Home's `CategoryTile` and
 * the Footer, both untouched — drives the same filter and scrolls to/
 * focuses that category's section, so those existing links keep doing
 * something useful.
 */
export default function TrainingCatalogPage() {
  const { t, i18n } = useTranslation('catalog')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const prefersReducedMotion = useReducedMotion()
  const [searchParams, setSearchParams] = useSearchParams()

  const categoriesQuery = useCategories()
  const domainsQuery = useTrainingDomains()
  const search = searchParams.get('q') ?? ''
  const categorySlug = searchParams.get('category') ?? ''

  const visibleCategories = useMemo(() => {
    const categories = categoriesQuery.data ?? []
    return categorySlug ? categories.filter((category) => category.slug === categorySlug) : categories
  }, [categoriesQuery.data, categorySlug])

  const groups = useMemo(
    () => groupDomainsByCategory(visibleCategories, domainsQuery.data ?? [], search, language),
    [visibleCategories, domainsQuery.data, search, language],
  )

  useEffect(() => {
    if (!categorySlug || groups.length === 0) return
    const target = document.getElementById(categorySlug)
    if (!target) return
    target.focus({ preventScroll: true })
    target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' })
  }, [categorySlug, groups, prefersReducedMotion])

  function updateSearch(value: string) {
    const next = new URLSearchParams(searchParams)
    if (value) next.set('q', value)
    else next.delete('q')
    setSearchParams(next)
  }

  function updateCategory(slug: string) {
    const next = new URLSearchParams(searchParams)
    if (slug) next.set('category', slug)
    else next.delete('category')
    setSearchParams(next)
  }

  const isLoading = categoriesQuery.isLoading || domainsQuery.isLoading
  const isError = categoriesQuery.isError || domainsQuery.isError
  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/trainings" />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <SectionHeading
              as="h1"
              eyebrow={t('hero.eyebrow')}
              title={t('hero.title')}
              description={t('hero.description')}
            />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <SearchBar
                label={t('filters.searchLabel')}
                placeholder={t('filters.searchPlaceholder')}
                clearLabel={t('filters.clearSearch')}
                value={search}
                onChange={(event) => updateSearch(event.target.value)}
                onClear={() => updateSearch('')}
                className="max-w-md"
              />
              <FilterSelect
                label={t('filters.categoryLabel')}
                placeholder={t('filters.allCategories')}
                value={categorySlug}
                onChange={updateCategory}
                options={[
                  { value: '', label: t('filters.allCategories') },
                  ...(categoriesQuery.data ?? []).map((category) => ({
                    value: category.slug,
                    label: getLocalizedText(category.name, language),
                  })),
                ]}
                className="w-full sm:w-56"
              />
            </div>
          </RevealOnScroll>

          {isLoading ? <LoadingState /> : null}
          {isError ? (
            <ErrorState
              onRetry={() => {
                void categoriesQuery.refetch()
                void domainsQuery.refetch()
              }}
            />
          ) : null}

          {!isLoading && !isError ? (
            groups.length > 0 ? (
              <>
                <RevealOnScroll>
                  <SectionHeading
                    eyebrow={t('domains.eyebrow')}
                    title={t('domains.title')}
                    description={t('domains.description')}
                  />
                </RevealOnScroll>

                <div className="flex flex-col gap-10">
                  {groups.map(({ category, domains }) => {
                    const items: AccordionItemData[] = domains.map((domain) => ({
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
                            <li
                              key={getLocalizedText(course.name, language)}
                              className="flex items-start gap-2"
                            >
                              <span
                                aria-hidden="true"
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground-faint"
                              />
                              {getLocalizedText(course.name, language)}
                            </li>
                          ))}
                        </ul>
                      ),
                    }))

                    return (
                      <RevealOnScroll key={category.id} className="flex flex-col gap-4">
                        <h2
                          id={category.slug}
                          tabIndex={-1}
                          className="text-h2 font-bold text-foreground outline-none"
                        >
                          {getLocalizedText(category.name, language)}
                        </h2>
                        <Accordion items={items} />
                      </RevealOnScroll>
                    )
                  })}
                </div>
              </>
            ) : (
              <EmptyState title={t('empty.title')} description={t('empty.description')} />
            )
          ) : null}
        </Container>
      </Section>
    </>
  )
}
