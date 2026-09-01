import { useTranslation } from 'react-i18next'
import { Link as RouterLink, useParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Grid } from '@/components/layout/Grid'
import { Accordion } from '@/components/ui/Accordion'
import { Badge } from '@/components/ui/Badge'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { LoadingState } from '@/components/feedback/LoadingState'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { CourseSchema } from '@/components/seo/CourseSchema'
import { FaqSchema } from '@/components/seo/FaqSchema'
import { Seo } from '@/components/seo/Seo'
import { useCategories } from '@/features/categories/hooks/useCategories'
import { TestimonialCard } from '@/features/testimonials/components/TestimonialCard'
import { useTestimonials } from '@/features/testimonials/hooks/useTestimonials'
import { TrainingCard } from '@/features/trainings/components/TrainingCard'
import { useTraining } from '@/features/trainings/hooks/useTraining'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import type { SupportedLanguage } from '@/i18n'
import { formatDate } from '@/utils/format-date'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * Training Details (spec §19, M3). Every CTA here is a lead-generation
 * link (Request information / Request a quote / Contact an advisor) —
 * there is deliberately no "Add to cart" or "Register now" button; the
 * routes it links to (`/request-information`, `/request-quote`,
 * `/contact`) are built in M5 and 404 through the catch-all route until
 * then, which is expected at this stage (the same pattern the Home Page's
 * CTAs have used since M2).
 */
export default function TrainingDetailsPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation('trainingDetails')
  const { t: tTrainings } = useTranslation('trainings')
  const { t: tCommon } = useTranslation('common')
  const language = i18n.language as SupportedLanguage

  const trainingQuery = useTraining(slug)
  const categoriesQuery = useCategories()
  const relatedQuery = useTrainings(
    trainingQuery.data ? { categoryId: trainingQuery.data.categoryId, pageSize: 4 } : undefined,
  )
  const testimonialsQuery = useTestimonials()

  if (trainingQuery.isLoading) {
    return (
      <Section spacing="md">
        <Container>
          <LoadingState />
        </Container>
      </Section>
    )
  }

  if (trainingQuery.isError) {
    return (
      <Section spacing="md">
        <Container>
          <ErrorState onRetry={() => void trainingQuery.refetch()} />
        </Container>
      </Section>
    )
  }

  const training = trainingQuery.data

  if (!training) {
    return (
      <Section spacing="lg">
        <Container className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-h1 font-extrabold text-foreground">{t('notFound.title')}</h1>
          <p className="max-w-md text-body-lg text-foreground-muted">{t('notFound.description')}</p>
          <Button asChild size="lg">
            <RouterLink to="/trainings">{t('notFound.backToCatalog')}</RouterLink>
          </Button>
        </Container>
      </Section>
    )
  }

  const category = categoriesQuery.data?.find((item) => item.id === training.categoryId)
  const categoryName = category ? getLocalizedText(category.name, language) : undefined
  const related = (relatedQuery.data?.items ?? []).filter((item) => item.id !== training.id).slice(0, 3)
  const testimonials = (testimonialsQuery.data ?? []).filter((item) => item.trainingId === training.id)
  const requestParams = `?training=${training.slug}`

  const breadcrumbItems = [
    { label: tCommon('nav.home'), href: '/' },
    { label: t('breadcrumb.catalog'), href: '/trainings' },
    { label: getLocalizedText(training.title, language) },
  ]

  return (
    <>
      <Seo
        title={getLocalizedText(training.title, language)}
        description={getLocalizedText(training.summary, language)}
        canonicalPath={`/trainings/${training.slug}`}
        image={training.image}
      />
      <BreadcrumbSchema items={breadcrumbItems} />
      <CourseSchema training={training} language={language} />
      <FaqSchema items={training.faq} language={language} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <RevealOnScroll className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-2">
                {categoryName ? <Badge variant="brand">{categoryName}</Badge> : null}
                <Badge variant="outline">{tTrainings(`format.${training.format}`)}</Badge>
                <Badge variant="outline">{tTrainings(`level.${training.level}`)}</Badge>
              </div>
              <h1 className="text-h1 font-extrabold text-foreground">{getLocalizedText(training.title, language)}</h1>
              <p className="text-body-lg text-foreground-muted">{getLocalizedText(training.summary, language)}</p>

              <div className="flex items-center gap-2 text-small text-foreground-faint">
                <Icon name="clock" aria-hidden="true" className="text-base" />
                {tTrainings('duration', { count: training.durationHours })}
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg">
                  <RouterLink to={`/request-information${requestParams}`} className="group">
                    {t('cta.requestInfo')}
                    <Icon
                      name="arrow-right"
                      aria-hidden="true"
                      className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                    />
                  </RouterLink>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <RouterLink to={`/request-quote${requestParams}`}>{t('cta.requestQuote')}</RouterLink>
                </Button>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="overflow-hidden rounded-3xl shadow-lg">
                <Image src={training.image} alt="" aspectRatio="4 / 3" loading="eager" />
              </div>
            </RevealOnScroll>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-12">
            <RevealOnScroll className="flex flex-col gap-4">
              <h2 className="text-h3 font-semibold text-foreground">{getLocalizedText(training.title, language)}</h2>
              <p className="text-body-lg text-foreground-muted">{getLocalizedText(training.description, language)}</p>
            </RevealOnScroll>

            {training.objectives.length > 0 ? (
              <RevealOnScroll className="flex flex-col gap-4">
                <h2 className="text-h3 font-semibold text-foreground">{t('objectives')}</h2>
                <ul className="flex flex-col gap-3">
                  {training.objectives.map((objective, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon name="check" aria-hidden="true" className="mt-1 text-small text-brand" />
                      <span className="text-body text-foreground-muted">{getLocalizedText(objective, language)}</span>
                    </li>
                  ))}
                </ul>
              </RevealOnScroll>
            ) : null}

            {training.program.length > 0 ? (
              <RevealOnScroll className="flex flex-col gap-4">
                <h2 className="text-h3 font-semibold text-foreground">{t('program')}</h2>
                <ol className="flex flex-col gap-5">
                  {training.program.map((module, index) => (
                    <li key={index} className="flex gap-4 border-s-2 border-primary-600 ps-4">
                      <span className="text-caption font-semibold text-foreground-faint">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="flex flex-col gap-1">
                        <p className="text-body-lg font-medium text-foreground">
                          {getLocalizedText(module.title, language)}
                        </p>
                        <p className="text-body text-foreground-muted">
                          {getLocalizedText(module.description, language)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </RevealOnScroll>
            ) : null}

            <RevealOnScroll className="flex flex-col gap-4">
              <h2 className="text-h3 font-semibold text-foreground">{t('methodology')}</h2>
              <p className="text-body text-foreground-muted">{getLocalizedText(training.methodology, language)}</p>
            </RevealOnScroll>

            {training.faq.length > 0 ? (
              <RevealOnScroll className="flex flex-col gap-4">
                <h2 className="text-h3 font-semibold text-foreground">{t('faq')}</h2>
                <Accordion
                  items={training.faq.map((item, index) => ({
                    id: String(index),
                    question: getLocalizedText(item.question, language),
                    answer: getLocalizedText(item.answer, language),
                  }))}
                />
              </RevealOnScroll>
            ) : null}
          </div>

          <RevealOnScroll className="flex h-fit flex-col gap-6 rounded-2xl border border-border bg-surface-subtle p-6 lg:sticky lg:top-24">
            <div>
              <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
                {t('practicalInfo')}
              </p>
              <ul className="mt-4 flex flex-col gap-3 text-small">
                <li className="flex items-center gap-2">
                  <Icon name="clock" aria-hidden="true" className="text-foreground-faint" />
                  <span className="text-foreground">{tTrainings('duration', { count: training.durationHours })}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="diagram-project" aria-hidden="true" className="text-foreground-faint" />
                  <span className="text-foreground">{tTrainings(`format.${training.format}`)}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="bullseye" aria-hidden="true" className="text-foreground-faint" />
                  <span className="text-foreground">{tTrainings(`level.${training.level}`)}</span>
                </li>
              </ul>
            </div>

            {training.targetAudience.length > 0 ? (
              <div>
                <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
                  {t('targetAudience')}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {training.targetAudience.map((audience, index) => (
                    <li key={index} className="text-small text-foreground-muted">
                      {getLocalizedText(audience, language)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {training.prerequisites.length > 0 ? (
              <div>
                <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
                  {t('prerequisites')}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {training.prerequisites.map((prerequisite, index) => (
                    <li key={index} className="text-small text-foreground-muted">
                      {getLocalizedText(prerequisite, language)}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {training.sessions.length > 0 ? (
              <div>
                <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
                  {t('nextSessions')}
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {training.sessions.map((session, index) => (
                    <li key={index} className="flex items-start gap-2 text-small text-foreground-muted">
                      <Icon name="calendar-days" aria-hidden="true" className="mt-0.5 text-foreground-faint" />
                      <span>
                        {formatDate(session.startDate, language)}
                        {session.location ? ` — ${getLocalizedText(session.location, language)}` : ''}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <Button asChild variant="outline">
              <RouterLink to={`/register-interest${requestParams}`}>{t('cta.registerInterest')}</RouterLink>
            </Button>
            <Button asChild variant="outline">
              <RouterLink to="/contact">{t('cta.contact')}</RouterLink>
            </Button>
          </RevealOnScroll>
        </Container>
      </Section>

      {testimonials.length > 0 ? (
        <Section spacing="sm" className="bg-surface-subtle">
          <Container className="flex flex-col gap-8">
            <RevealOnScroll>
              <h2 className="text-h3 font-semibold text-foreground">{t('testimonials')}</h2>
            </RevealOnScroll>
            <Grid cols={3}>
              {testimonials.map((testimonial) => (
                <RevealOnScroll key={testimonial.id}>
                  <TestimonialCard testimonial={testimonial} language={language} />
                </RevealOnScroll>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {related.length > 0 ? (
        <Section spacing="sm">
          <Container className="flex flex-col gap-8">
            <RevealOnScroll>
              <h2 className="text-h3 font-semibold text-foreground">{t('relatedTrainings')}</h2>
            </RevealOnScroll>
            <Grid cols={3}>
              {related.map((item) => (
                <RevealOnScroll key={item.id}>
                  <TrainingCard training={item} categoryName={categoryName} />
                </RevealOnScroll>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      <Section spacing="sm">
        <Container>
          <div className="bg-gradient-brand flex flex-col items-center gap-6 rounded-2xl px-6 py-16 text-center sm:px-16">
            <h2 className="max-w-2xl text-h2 font-extrabold text-neutral-0">{t('cta.requestInfo')}</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="secondary">
                <RouterLink to={`/request-quote${requestParams}`}>{t('cta.requestQuote')}</RouterLink>
              </Button>
              <Button asChild size="lg" variant="inverse">
                <RouterLink to="/contact">{t('cta.contact')}</RouterLink>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
