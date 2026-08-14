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
import { IndustryTile } from '@/features/industries/components/IndustryTile'
import { DEFAULT_INDUSTRY_VISUAL, INDUSTRY_VISUALS } from '@/features/industries/config/industry-visuals'
import { useIndustries } from '@/features/industries/hooks/useIndustries'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/** Industries / Secteurs (spec §24, M4). Content taxonomy, not client claims — see `industries.disclaimer`. */
export default function IndustriesPage() {
  const { t, i18n } = useTranslation('industries')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const industriesQuery = useIndustries()

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/industries" />
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
          {industriesQuery.isLoading ? <LoadingState /> : null}
          {industriesQuery.isError ? <ErrorState onRetry={() => void industriesQuery.refetch()} /> : null}

          {!industriesQuery.isLoading && !industriesQuery.isError ? (
            industriesQuery.data && industriesQuery.data.length > 0 ? (
              <>
                <Grid cols={3} gap="lg">
                  {industriesQuery.data.map((industry) => {
                    const visual = INDUSTRY_VISUALS[industry.slug] ?? DEFAULT_INDUSTRY_VISUAL
                    return (
                      <RevealOnScroll key={industry.id}>
                        <IndustryTile
                          name={getLocalizedText(industry.name, language)}
                          description={getLocalizedText(industry.description, language)}
                          icon={visual.icon}
                          badgeClassName={visual.badgeClassName}
                        />
                      </RevealOnScroll>
                    )
                  })}
                </Grid>
                <p className="text-center text-caption text-foreground-faint">{t('disclaimer')}</p>
              </>
            ) : (
              <EmptyState />
            )
          ) : null}
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/contact' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/solutions-for-companies' }}
      />
    </>
  )
}
