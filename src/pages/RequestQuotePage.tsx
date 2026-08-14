import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Textarea } from '@/components/ui/Textarea'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { FormSection } from '@/features/leads/components/FormSection'
import { HoneypotField } from '@/features/leads/components/HoneypotField'
import { LeadFormSuccess } from '@/features/leads/components/LeadFormSuccess'
import { TrainingSelectField } from '@/features/leads/components/TrainingSelectField'
import { useSubmitLead } from '@/features/leads/hooks/useSubmitLead'
import { buildRequestQuoteSchema, type RequestQuoteValues } from '@/features/leads/schemas/request-quote.schema'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import type { SupportedLanguage } from '@/i18n'

/** Request a Quote (spec M5 §2). Same training-preselection pattern as Request Information. */
export default function RequestQuotePage() {
  const { t, i18n } = useTranslation('requestQuote')
  const { t: tFields } = useTranslation('leadForms')
  const { t: tCommon } = useTranslation('common')
  const { t: tTrainings } = useTranslation('trainings')
  const language = i18n.language as SupportedLanguage
  const [searchParams] = useSearchParams()
  const trainingSlug = searchParams.get('training')

  const trainingsQuery = useTrainings({ pageSize: 100 })
  const honeypotRef = useRef<HTMLInputElement>(null)
  const mutation = useSubmitLead()

  const schema = useMemo(() => buildRequestQuoteSchema(tFields), [tFields])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RequestQuoteValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      message: '',
      trainingId: '',
      participantsCount: '',
      preferredDate: '',
      location: '',
      consent: false,
    },
  })

  useEffect(() => {
    if (!trainingSlug || !trainingsQuery.data) return
    const match = trainingsQuery.data.items.find((training) => training.slug === trainingSlug)
    if (match) setValue('trainingId', match.id)
  }, [trainingSlug, trainingsQuery.data, setValue])

  function onSubmit(values: RequestQuoteValues) {
    mutation.mutate({
      lead: {
        formType: 'request-quote',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        jobTitle: values.jobTitle || undefined,
        trainingId: values.trainingId || undefined,
        participantsCount: values.participantsCount ? Number(values.participantsCount) : undefined,
        preferredFormat: values.preferredFormat || undefined,
        preferredDate: values.preferredDate || undefined,
        location: values.location || undefined,
        message: values.message || undefined,
        consent: values.consent,
      },
      honeypot: honeypotRef.current?.value ?? '',
    })
  }

  if (mutation.isSuccess) {
    return (
      <Section spacing="lg">
        <Container className="max-w-2xl">
          <LeadFormSuccess
            title={t('success.title')}
            description={t('success.description')}
            primaryAction={{ label: t('success.primaryCta'), href: '/trainings' }}
            secondaryAction={{ label: t('success.secondaryCta'), href: '/' }}
          />
        </Container>
      </Section>
    )
  }

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/request-quote" />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <SectionHeading as="h1" eyebrow={t('hero.eyebrow')} title={t('hero.title')} description={t('hero.description')} align="center" />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="mx-auto max-w-2xl">
          <RevealOnScroll>
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-8 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
            >
              <HoneypotField ref={honeypotRef} />

              <FormSection title={tFields('sections.personal')}>
                <Input label={tFields('fields.firstName.label')} placeholder={tFields('fields.firstName.placeholder')} required error={errors.firstName?.message} {...register('firstName')} />
                <Input label={tFields('fields.lastName.label')} placeholder={tFields('fields.lastName.placeholder')} required error={errors.lastName?.message} {...register('lastName')} />
                <Input type="email" label={tFields('fields.email.label')} placeholder={tFields('fields.email.placeholder')} required error={errors.email?.message} {...register('email')} />
                <Input type="tel" label={tFields('fields.phone.label')} placeholder={tFields('fields.phone.placeholder')} error={errors.phone?.message} {...register('phone')} />
              </FormSection>

              <FormSection title={tFields('sections.company')}>
                <Input label={tFields('fields.company.label')} placeholder={tFields('fields.company.placeholder')} error={errors.company?.message} {...register('company')} />
                <Input label={tFields('fields.jobTitle.label')} placeholder={tFields('fields.jobTitle.placeholder')} error={errors.jobTitle?.message} {...register('jobTitle')} />
              </FormSection>

              <FormSection title={tFields('sections.training')}>
                <TrainingSelectField
                  language={language}
                  label={tFields('fields.training.label')}
                  placeholder={tFields('fields.training.placeholder')}
                  {...register('trainingId')}
                />
                <Input
                  inputMode="numeric"
                  label={tFields('fields.participantsCount.label')}
                  placeholder={tFields('fields.participantsCount.placeholder')}
                  error={errors.participantsCount?.message}
                  {...register('participantsCount')}
                />
                <Select
                  label={tFields('fields.preferredFormat.label')}
                  placeholder={tFields('fields.preferredFormat.placeholder')}
                  options={[
                    { value: 'in-person', label: tTrainings('format.in-person') },
                    { value: 'online', label: tTrainings('format.online') },
                    { value: 'hybrid', label: tTrainings('format.hybrid') },
                  ]}
                  {...register('preferredFormat')}
                />
                <Input type="date" label={tFields('fields.preferredDate.label')} error={errors.preferredDate?.message} {...register('preferredDate')} />
                <Input
                  label={tFields('fields.location.label')}
                  placeholder={tFields('fields.location.placeholder')}
                  className="sm:col-span-2"
                  error={errors.location?.message}
                  {...register('location')}
                />
              </FormSection>

              <FormSection title={tFields('sections.message')}>
                <Textarea
                  label={tFields('fields.message.label')}
                  placeholder={tFields('fields.message.placeholder')}
                  error={errors.message?.message}
                  className="sm:col-span-2"
                  {...register('message')}
                />
              </FormSection>

              <FormSection title={tFields('sections.consent')}>
                <Checkbox label={tFields('privacy.consentLabel')} error={errors.consent?.message} className="sm:col-span-2" {...register('consent')} />
              </FormSection>

              {mutation.isError ? (
                <ErrorState title={tFields('error.title')} description={tFields('error.description')} onRetry={handleSubmit(onSubmit)} />
              ) : null}

              <Button type="submit" size="lg" loading={mutation.isPending}>
                {mutation.isPending ? tFields('actions.submitting') : tFields('actions.submit')}
              </Button>
            </form>
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  )
}
