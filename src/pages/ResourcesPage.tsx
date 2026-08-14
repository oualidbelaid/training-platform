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
import { Seo } from '@/components/seo/Seo'
import { ArticleCard } from '@/features/articles/components/ArticleCard'
import { useArticles } from '@/features/articles/hooks/useArticles'
import type { SupportedLanguage } from '@/i18n'

/** Articles / Ressources (spec §22, M4). Route: `/resources` (+ `/resources/:slug` details page). */
export default function ResourcesPage() {
  const { t, i18n } = useTranslation('resources')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const articlesQuery = useArticles()

  const articles = articlesQuery.data ?? []
  const [featured, ...rest] = articles

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/resources" />
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
        <Container className="flex flex-col gap-10">
          {articlesQuery.isLoading ? <LoadingState /> : null}
          {articlesQuery.isError ? <ErrorState onRetry={() => void articlesQuery.refetch()} /> : null}

          {!articlesQuery.isLoading && !articlesQuery.isError ? (
            articles.length > 0 ? (
              <>
                {featured ? (
                  <RevealOnScroll>
                    <ArticleCard article={featured} language={language} variant="featured" />
                  </RevealOnScroll>
                ) : null}

                {rest.length > 0 ? (
                  <Grid cols={3} gap="lg">
                    {rest.map((article) => (
                      <RevealOnScroll key={article.id}>
                        <ArticleCard article={article} language={language} />
                      </RevealOnScroll>
                    ))}
                  </Grid>
                ) : null}
              </>
            ) : (
              <EmptyState title={t('empty.title')} description={t('empty.description')} />
            )
          ) : null}
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
