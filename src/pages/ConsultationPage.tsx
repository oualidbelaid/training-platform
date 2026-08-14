import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Input } from '@/components/ui/Input'
import { Radio, RadioGroup } from '@/components/ui/Radio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Textarea } from '@/components/ui/Textarea'
import { ErrorState } from '@/components/feedback/ErrorState'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { FormSection } from '@/features/leads/components/FormSection'
import { HoneypotField } from '@/features/leads/components/HoneypotField'
import { LeadFormSuccess } from '@/features/leads/components/LeadFormSuccess'
import { useSubmitLead } from '@/features/leads/hooks/useSubmitLead'
import { buildConsultationSchema, type ConsultationValues } from '@/features/leads/schemas/consultation.schema'

/** Consultation (spec M5 §5) — companies/professionals wanting to discuss their training needs directly with an advisor. */
export default function ConsultationPage() {
  const { t } = useTranslation('consultation')
  const { t: tFields } = useTranslation('leadForms')
  const { t: tCommon } = useTranslation('common')

  const honeypotRef = useRef<HTMLInputElement>(null)
  const mutation = useSubmitLead()

  const schema = useMemo(() => buildConsultationSchema(tFields), [tFields])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ConsultationValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      message: '',
      trainingNeeds: '',
      participantsCount: '',
      areasOfInterest: '',
      consent: false,
    },
  })

  function onSubmit(values: ConsultationValues) {
    mutation.mutate({
      lead: {
        formType: 'consultation',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        jobTitle: values.jobTitle || undefined,
        trainingNeeds: values.trainingNeeds || undefined,
        participantsCount: values.participantsCount ? Number(values.participantsCount) : undefined,
        areasOfInterest: values.areasOfInterest || undefined,
        preferredContactMethod: values.preferredContactMethod || undefined,
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
            primaryAction={{ label: t('success.primaryCta'), href: '/solutions-for-companies' }}
            secondaryAction={{ label: t('success.secondaryCta'), href: '/' }}
          />
        </Container>
      </Section>
    )
  }

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/consultation" />
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
                <Textarea
                  label={tFields('fields.trainingNeeds.label')}
                  placeholder={tFields('fields.trainingNeeds.placeholder')}
                  className="sm:col-span-2"
                  error={errors.trainingNeeds?.message}
                  {...register('trainingNeeds')}
                />
                <Input
                  inputMode="numeric"
                  label={tFields('fields.participantsCount.label')}
                  placeholder={tFields('fields.participantsCount.placeholder')}
                  error={errors.participantsCount?.message}
                  {...register('participantsCount')}
                />
                <Input
                  label={tFields('fields.areasOfInterest.label')}
                  placeholder={tFields('fields.areasOfInterest.placeholder')}
                  error={errors.areasOfInterest?.message}
                  {...register('areasOfInterest')}
                />
                <RadioGroup legend={tFields('fields.preferredContactMethod.legend')} className="sm:col-span-2">
                  <Radio label={tFields('fields.preferredContactMethod.email')} value="email" {...register('preferredContactMethod')} />
                  <Radio label={tFields('fields.preferredContactMethod.phone')} value="phone" {...register('preferredContactMethod')} />
                </RadioGroup>
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
