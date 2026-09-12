import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { MEDIA } from '@/config/media'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'

const PILLAR_KEYS = ['needsAnalysis', 'customPrograms', 'learningPaths', 'businessImpact'] as const
const PILLAR_ICONS: Record<(typeof PILLAR_KEYS)[number], IconName> = {
  needsAnalysis: 'compass',
  customPrograms: 'diagram-project',
  learningPaths: 'rocket',
  businessImpact: 'chart-column',
}

const FORMAT_KEYS = ['in-person', 'online', 'hybrid'] as const
const FORMAT_ICONS: Record<(typeof FORMAT_KEYS)[number], IconName> = {
  'in-person': 'building',
  online: 'globe',
  hybrid: 'network-wired',
}

const PROCESS_STEPS = ['discover', 'design', 'deliver', 'followUp'] as const

/** Solutions for Companies (spec §25, M4). Primary CTA "Demander un devis", secondary "Nous contacter" — no e-commerce. */
export default function SolutionsForCompaniesPage() {
  const { t } = useTranslation('solutions')
  const { t: tCommon } = useTranslation('common')
  const { t: tTrainings } = useTranslation('trainings')

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        canonicalPath="/solutions-for-companies"
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-8">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <SectionHeading
                  as="h1"
                  eyebrow={t('hero.eyebrow')}
                  title={t('hero.title')}
                  description={t('hero.description')}
                />
              </div>
              <Image
                src={MEDIA.companyTraining}
                alt=""
                aspectRatio="4 / 3"
                className="rounded-2xl"
                loading="eager"
              />
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <RevealOnScroll>
            <div className="mx-auto flex max-w-2xl flex-col gap-3 text-center">
              <p className="text-small font-semibold uppercase tracking-wide text-brand">
                {t('approach.eyebrow')}
              </p>
              <h2 className="text-h2 font-bold text-foreground">{t('approach.title')}</h2>
              <p className="text-body-lg text-foreground-muted">{t('approach.description')}</p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <RevealOnScroll>
            <Grid cols={4} gap="lg">
              {PILLAR_KEYS.map((key) => (
                <div key={key} className="flex flex-col gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                    <Icon name={PILLAR_ICONS[key]} aria-hidden="true" className="text-2xl" />
                  </span>
                  <div>
                    <p className="text-body-lg font-semibold text-foreground">
                      {t(`${key}.title`)}
                    </p>
                    <p className="mt-1 text-body text-foreground-muted">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </div>
              ))}
            </Grid>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="bg-surface-subtle">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={t('formats.eyebrow')}
              title={t('formats.title')}
              description={t('formats.description')}
              align="center"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
              {FORMAT_KEYS.map((format) => (
                <div
                  key={format}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-surface p-6 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                    <Icon name={FORMAT_ICONS[format]} aria-hidden="true" className="text-2xl" />
                  </span>
                  <p className="text-body-lg font-semibold text-foreground">
                    {tTrainings(`format.${format}`)}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll>
            <SectionHeading eyebrow={t('process.eyebrow')} title={t('process.title')} />
          </RevealOnScroll>
          <RevealOnScroll>
            <Grid cols={4} gap="lg">
              {PROCESS_STEPS.map((step, index) => (
                <div key={step} className="flex flex-col gap-3">
                  <span className="text-h2 font-extrabold text-primary-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-body-lg font-semibold text-foreground">
                    {t(`process.steps.${step}.title`)}
                  </p>
                  <p className="text-body text-foreground-muted">
                    {t(`process.steps.${step}.description`)}
                  </p>
                </div>
              ))}
            </Grid>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <RevealOnScroll>
            <div className="flex flex-col items-center gap-4 text-center">
              <p className="text-body font-semibold text-foreground">{t('relatedLinks.title')}</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                <RouterLink
                  to="/success-stories"
                  className="text-body text-brand underline-offset-4 hover:underline"
                >
                  {t('relatedLinks.successStories')}
                </RouterLink>
                <RouterLink
                  to="/industries"
                  className="text-body text-brand underline-offset-4 hover:underline"
                >
                  {t('relatedLinks.industries')}
                </RouterLink>
              </div>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <CtaBanner
        title={t('cta.title')}
        description={t('cta.description')}
        primaryAction={{ label: t('cta.primaryCta'), href: '/request-quote' }}
        secondaryAction={{ label: t('cta.secondaryCta'), href: '/consultation' }}
      />
    </>
  )
}
