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
import { SuccessStoryCard } from '@/features/success-stories/components/SuccessStoryCard'
import { useSuccessStories } from '@/features/success-stories/hooks/useSuccessStories'
import type { SupportedLanguage } from '@/i18n'

/** Success Stories / Réussites clients (spec §20, M4). */
export default function SuccessStoriesPage() {
  const { t, i18n } = useTranslation('successStories')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const successStoriesQuery = useSuccessStories()

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/success-stories" />
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
          {successStoriesQuery.isLoading ? <LoadingState /> : null}
          {successStoriesQuery.isError ? <ErrorState onRetry={() => void successStoriesQuery.refetch()} /> : null}

          {!successStoriesQuery.isLoading && !successStoriesQuery.isError ? (
            successStoriesQuery.data && successStoriesQuery.data.length > 0 ? (
              <>
                <Grid cols={2} gap="lg">
                  {successStoriesQuery.data.map((story) => (
                    <RevealOnScroll key={story.id}>
                      <SuccessStoryCard story={story} language={language} />
                    </RevealOnScroll>
                  ))}
                </Grid>
                <p className="text-center text-caption text-foreground-faint">{t('disclaimer')}</p>
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
        primaryAction={{ label: t('cta.primaryCta'), href: '/request-quote' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/contact' }}
      />
    </>
  )
}
