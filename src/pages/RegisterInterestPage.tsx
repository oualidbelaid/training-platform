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
import { buildRegisterInterestSchema, type RegisterInterestValues } from '@/features/leads/schemas/register-interest.schema'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import type { SupportedLanguage } from '@/i18n'

/** Register Interest (spec M5 §4) — for a training the visitor wants to hear about when a future session opens. */
export default function RegisterInterestPage() {
  const { t, i18n } = useTranslation('registerInterest')
  const { t: tFields } = useTranslation('leadForms')
  const { t: tCommon } = useTranslation('common')
  const { t: tTrainings } = useTranslation('trainings')
  const language = i18n.language as SupportedLanguage
  const [searchParams] = useSearchParams()
  const trainingSlug = searchParams.get('training')

  const trainingsQuery = useTrainings({ pageSize: 100 })
  const honeypotRef = useRef<HTMLInputElement>(null)
  const mutation = useSubmitLead()

  const schema = useMemo(() => buildRegisterInterestSchema(tFields), [tFields])
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterInterestValues>({
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
      consent: false,
    },
  })

  useEffect(() => {
    if (!trainingSlug || !trainingsQuery.data) return
    const match = trainingsQuery.data.items.find((training) => training.slug === trainingSlug)
    if (match) setValue('trainingId', match.id)
  }, [trainingSlug, trainingsQuery.data, setValue])

  function onSubmit(values: RegisterInterestValues) {
    mutation.mutate({
      lead: {
        formType: 'register-interest',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        trainingId: values.trainingId || undefined,
        preferredFormat: values.preferredFormat || undefined,
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
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/register-interest" />
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

              <FormSection title={tFields('sections.training')}>
                <TrainingSelectField
                  language={language}
                  label={tFields('fields.training.label')}
                  placeholder={tFields('fields.training.placeholder')}
                  {...register('trainingId')}
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
              </FormSection>

              <FormSection title={tFields('sections.personal')}>
                <Input label={tFields('fields.firstName.label')} placeholder={tFields('fields.firstName.placeholder')} required error={errors.firstName?.message} {...register('firstName')} />
                <Input label={tFields('fields.lastName.label')} placeholder={tFields('fields.lastName.placeholder')} required error={errors.lastName?.message} {...register('lastName')} />
                <Input type="email" label={tFields('fields.email.label')} placeholder={tFields('fields.email.placeholder')} required error={errors.email?.message} {...register('email')} />
                <Input type="tel" label={tFields('fields.phone.label')} placeholder={tFields('fields.phone.placeholder')} error={errors.phone?.message} {...register('phone')} />
                <Input
                  label={tFields('fields.company.label')}
                  placeholder={tFields('fields.company.placeholder')}
                  className="sm:col-span-2"
                  error={errors.company?.message}
                  {...register('company')}
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
