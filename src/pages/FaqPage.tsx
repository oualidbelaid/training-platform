import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Accordion } from '@/components/ui/Accordion'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { FilterSelect } from '@/components/ui/FilterSelect'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { EmptyState } from '@/components/feedback/EmptyState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { FaqSchema } from '@/components/seo/FaqSchema'
import { Seo } from '@/components/seo/Seo'
import { useFaqs } from '@/features/faq/hooks/useFaqs'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/** FAQ (spec §23, M4). Category filter reuses `FilterSelect` — the same accessible dropdown built for the Catalog filters. */
export default function FaqPage() {
  const { t, i18n } = useTranslation('faq')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const faqsQuery = useFaqs()
  const [categoryKey, setCategoryKey] = useState('')

  const faqs = faqsQuery.data ?? []

  const categoryOptions = useMemo(() => {
    const seen = new Map<string, string>()
    for (const faq of faqsQuery.data ?? []) {
      if (!seen.has(faq.categoryKey)) seen.set(faq.categoryKey, getLocalizedText(faq.category, language))
    }
    return Array.from(seen, ([value, label]) => ({ value, label }))
  }, [faqsQuery.data, language])

  const filteredFaqs = categoryKey ? faqs.filter((faq) => faq.categoryKey === categoryKey) : faqs

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/faq" />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FaqSchema items={faqs} language={language} />

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
          {faqsQuery.isLoading ? <LoadingState /> : null}
          {faqsQuery.isError ? <ErrorState onRetry={() => void faqsQuery.refetch()} /> : null}

          {!faqsQuery.isLoading && !faqsQuery.isError ? (
            <>
              <RevealOnScroll>
                <FilterSelect
                  label={t('categoryFilterLabel')}
                  placeholder={t('allCategories')}
                  value={categoryKey}
                  onChange={setCategoryKey}
                  options={[{ value: '', label: t('allCategories') }, ...categoryOptions]}
                  className="max-w-xs"
                />
              </RevealOnScroll>

              {filteredFaqs.length > 0 ? (
                <RevealOnScroll>
                  <Accordion
                    items={filteredFaqs.map((faq) => ({
                      id: faq.id,
                      question: getLocalizedText(faq.question, language),
                      answer: getLocalizedText(faq.answer, language),
                    }))}
                  />
                </RevealOnScroll>
              ) : (
                <EmptyState title={t('empty.title')} description={t('empty.description')} />
              )}
            </>
          ) : null}
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/contact' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/request-information' }}
      />
    </>
  )
}
