import { useTranslation } from 'react-i18next'
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

/** The real ISTAM values — the letters of I-S-T-A-M itself (official presentation). */
const VALUE_KEYS = ['integrity', 'knowledge', 'transformation', 'ambition', 'mastery'] as const
const VALUE_ICONS: Record<(typeof VALUE_KEYS)[number], IconName> = {
  integrity: 'shield',
  knowledge: 'graduation-cap',
  transformation: 'arrow-trend-up',
  ambition: 'rocket',
  mastery: 'star',
}

const APPROACH_STEPS = ['diagnose', 'design', 'deliver', 'followUp'] as const
/** Real, verifiable facts from the official ISTAM presentation — no "demonstration" disclaimer needed here, unlike Home's stat bar. */
const FIGURE_KEYS = ['founded', 'staff', 'consultants', 'accreditation'] as const

/**
 * About / À propos (spec §16, M4). Editorial page copy (mission, vision,
 * values, approach, key figures) lives directly in `about.json` — not a
 * mock-data "collection" domain, since there's nothing here that's a
 * queryable/paginated record the way trainings or articles are (spec §25's
 * repository/service/hook pipeline is for genuine business data; static
 * page copy is exactly what the Home Page's own sections already do).
 */
export default function AboutPage() {
  const { t } = useTranslation('about')
  const { t: tCommon } = useTranslation('common')

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/about" />
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
            <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
              <h2 className="text-h2 font-bold text-foreground">{t('intro.title')}</h2>
              <p className="text-body-lg text-foreground-muted">{t('intro.paragraph1')}</p>
              <p className="text-body-lg text-foreground-muted">{t('intro.paragraph2')}</p>
            </div>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <RevealOnScroll>
            <Grid cols={2} gap="lg">
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h3 className="text-h3 font-semibold text-foreground">{t('mission.title')}</h3>
                <p className="mt-3 text-body text-foreground-muted">{t('mission.description')}</p>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-8">
                <h3 className="text-h3 font-semibold text-foreground">{t('vision.title')}</h3>
                <p className="mt-3 text-body text-foreground-muted">{t('vision.description')}</p>
              </div>
            </Grid>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container className="flex flex-col gap-10">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={t('values.eyebrow')}
              title={t('values.title')}
              description={t('values.description')}
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Grid cols={4} gap="lg">
              {VALUE_KEYS.map((key) => (
                <div key={key} className="flex flex-col gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                    <Icon name={VALUE_ICONS[key]} aria-hidden="true" className="text-2xl" />
                  </span>
                  <div>
                    <p className="text-body-lg font-semibold text-foreground">
                      {t(`values.items.${key}.title`)}
                    </p>
                    <p className="mt-1 text-body text-foreground-muted">
                      {t(`values.items.${key}.description`)}
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
              eyebrow={t('approach.eyebrow')}
              title={t('approach.title')}
              description={t('approach.description')}
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <Grid cols={4} gap="lg">
              {APPROACH_STEPS.map((step, index) => (
                <div key={step} className="flex flex-col gap-3">
                  <span className="text-h2 font-extrabold text-primary-200">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-body-lg font-semibold text-foreground">
                    {t(`approach.steps.${step}.title`)}
                  </p>
                  <p className="text-body text-foreground-muted">
                    {t(`approach.steps.${step}.description`)}
                  </p>
                </div>
              ))}
            </Grid>
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container className="flex flex-col gap-8">
          <RevealOnScroll>
            <SectionHeading
              eyebrow={t('figures.eyebrow')}
              title={t('figures.title')}
              align="center"
            />
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              {FIGURE_KEYS.map((key) => (
                <div key={key} className="text-center">
                  <p className="text-h1 font-extrabold text-foreground">
                    {t(`figures.items.${key}.value`)}
                  </p>
                  <p className="mt-1 text-small text-foreground-muted">
                    {t(`figures.items.${key}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
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
