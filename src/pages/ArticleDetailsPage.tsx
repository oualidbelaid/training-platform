import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Image } from '@/components/ui/Image'
import { ErrorState } from '@/components/feedback/ErrorState'
import { LoadingState } from '@/components/feedback/LoadingState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { ArticleSchema } from '@/components/seo/ArticleSchema'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { ArticleCard } from '@/features/articles/components/ArticleCard'
import { useArticle } from '@/features/articles/hooks/useArticle'
import { useArticles } from '@/features/articles/hooks/useArticles'
import type { SupportedLanguage } from '@/i18n'
import { formatDate } from '@/utils/format-date'
import { getLocalizedText } from '@/utils/localized-text'

/** Article details (spec §22). Same loading/error/not-found branch shape as `TrainingDetailsPage`. */
export default function ArticleDetailsPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation('resources')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage

  const articleQuery = useArticle(slug)
  const articlesQuery = useArticles()

  if (articleQuery.isLoading) {
    return (
      <Section spacing="md">
        <Container>
          <LoadingState />
        </Container>
      </Section>
    )
  }

  if (articleQuery.isError) {
    return (
      <Section spacing="md">
        <Container>
          <ErrorState onRetry={() => void articleQuery.refetch()} />
        </Container>
      </Section>
    )
  }

  const article = articleQuery.data

  if (!article) {
    return (
      <Section spacing="lg">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h1 font-extrabold text-foreground">{t('details.notFoundTitle')}</h1>
          <p className="max-w-md text-body-lg text-foreground-muted">{t('details.notFoundDescription')}</p>
          <Button asChild size="lg">
            <RouterLink to="/resources">{t('details.back')}</RouterLink>
          </Button>
        </Container>
      </Section>
    )
  }

  const related = (articlesQuery.data ?? []).filter((item) => item.id !== article.id).slice(0, 3)

  const breadcrumbItems = [
    { label: tCommon('nav.home'), href: '/' },
    { label: t('hero.title'), href: '/resources' },
    { label: getLocalizedText(article.title, language) },
  ]

  return (
    <>
      <Seo
        title={getLocalizedText(article.title, language)}
        description={getLocalizedText(article.excerpt, language)}
        canonicalPath={`/resources/${article.slug}`}
        image={article.image}
        type="article"
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ArticleSchema article={article} language={language} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />

          <RevealOnScroll className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <Badge variant="brand">{getLocalizedText(article.category, language)}</Badge>
            <h1 className="text-h1 font-extrabold text-foreground">{getLocalizedText(article.title, language)}</h1>
            <p className="text-small text-foreground-faint">
              {article.authorName} · {formatDate(article.publishedDate, language)} · {t('readingTime', { count: article.readingTimeMinutes })}
            </p>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container>
          <RevealOnScroll>
            <Image src={article.image} alt="" aspectRatio="21 / 9" className="mx-auto max-w-4xl rounded-2xl" loading="eager" />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container>
          <RevealOnScroll className="mx-auto flex max-w-2xl flex-col gap-5 whitespace-pre-line text-body-lg text-foreground-muted">
            {getLocalizedText(article.content, language)}
          </RevealOnScroll>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section spacing="sm" className="bg-surface-subtle">
          <Container className="flex flex-col gap-8">
            <RevealOnScroll>
              <h2 className="text-h3 font-semibold text-foreground">{t('details.relatedTitle')}</h2>
            </RevealOnScroll>
            <Grid cols={3}>
              {related.map((item) => (
                <RevealOnScroll key={item.id}>
                  <ArticleCard article={item} language={language} />
                </RevealOnScroll>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/trainings' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/contact' }}
      />
    </>
  )
}
