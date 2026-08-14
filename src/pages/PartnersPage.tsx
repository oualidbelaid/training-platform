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
import { PartnerCard } from '@/features/partners/components/PartnerCard'
import { usePartners } from '@/features/partners/hooks/usePartners'
import type { SupportedLanguage } from '@/i18n'

/** Partners / Nos partenaires (spec §19, M4). */
export default function PartnersPage() {
  const { t, i18n } = useTranslation('partners')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage
  const partnersQuery = usePartners()

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/partners" />
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
          {partnersQuery.isLoading ? <LoadingState /> : null}
          {partnersQuery.isError ? <ErrorState onRetry={() => void partnersQuery.refetch()} /> : null}

          {!partnersQuery.isLoading && !partnersQuery.isError ? (
            partnersQuery.data && partnersQuery.data.length > 0 ? (
              <>
                <Grid cols={3} gap="lg">
                  {partnersQuery.data.map((partner) => (
                    <RevealOnScroll key={partner.id}>
                      <PartnerCard partner={partner} language={language} />
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

      <Section spacing="sm" className="bg-surface-subtle">
        <Container>
          <RevealOnScroll>
            <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
              <p className="text-small font-semibold uppercase tracking-wide text-brand">{t('approach.eyebrow')}</p>
              <h2 className="text-h2 font-bold text-foreground">{t('approach.title')}</h2>
              <p className="text-body-lg text-foreground-muted">{t('approach.description')}</p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/solutions-for-companies' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/contact' }}
      />
    </>
  )
}
