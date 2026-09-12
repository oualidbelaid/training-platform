import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Icon } from '@/components/ui/Icon'
import { Input } from '@/components/ui/Input'
import { Radio, RadioGroup } from '@/components/ui/Radio'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Textarea } from '@/components/ui/Textarea'
import { ErrorState } from '@/components/feedback/ErrorState'
import { Map } from '@/components/map/Map'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema'
import { Seo } from '@/components/seo/Seo'
import { LOCATION } from '@/config/location'
import { FormSection } from '@/features/leads/components/FormSection'
import { HoneypotField } from '@/features/leads/components/HoneypotField'
import { LeadFormSuccess } from '@/features/leads/components/LeadFormSuccess'
import { useSubmitLead } from '@/features/leads/hooks/useSubmitLead'
import { buildContactSchema, type ContactValues } from '@/features/leads/schemas/contact.schema'

/**
 * Contact (spec M5 §3). Keeps ISTAM's real contact details and the same
 * `Map`/`LOCATION` pieces `LocationSection` uses on the Home Page — a
 * separate presentation with this page's own copy, not a reuse of
 * `LocationSection` itself (that component is Home-namespaced).
 */
export default function ContactPage() {
  const { t } = useTranslation('contact')
  const { t: tFields } = useTranslation('leadForms')
  const { t: tCommon } = useTranslation('common')
  const { t: tHome } = useTranslation('home')

  const honeypotRef = useRef<HTMLInputElement>(null)
  const mutation = useSubmitLead()

  const schema = useMemo(() => buildContactSchema(tFields), [tFields])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      subject: '',
      message: '',
      consent: false,
    },
  })

  function onSubmit(values: ContactValues) {
    mutation.mutate({
      lead: {
        formType: 'contact',
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone || undefined,
        company: values.company || undefined,
        subject: values.subject,
        preferredContactMethod: values.preferredContactMethod || undefined,
        message: values.message || undefined,
        consent: values.consent,
      },
      honeypot: honeypotRef.current?.value ?? '',
    })
  }

  const breadcrumbItems = [{ label: tCommon('nav.home'), href: '/' }, { label: t('hero.title') }]

  return (
    <>
      <Seo title={t('seo.title')} description={t('seo.description')} canonicalPath="/contact" />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Section spacing="sm">
        <Container className="flex flex-col gap-6">
          <Breadcrumb items={breadcrumbItems} />
          <RevealOnScroll>
            <SectionHeading
              as="h1"
              eyebrow={t('hero.eyebrow')}
              title={t('hero.title')}
              description={t('hero.description')}
              align="center"
            />
          </RevealOnScroll>
        </Container>
      </Section>

      <Section spacing="sm" className="pt-0">
        <Container className="grid gap-10 lg:grid-cols-[3fr_2fr]">
          <RevealOnScroll>
            {mutation.isSuccess ? (
              <LeadFormSuccess
                title={t('success.title')}
                description={t('success.description')}
                primaryAction={{ label: t('success.primaryCta'), href: '/trainings' }}
                secondaryAction={{ label: t('success.secondaryCta'), href: '/' }}
              />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-8 rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
              >
                <HoneypotField ref={honeypotRef} />

                <FormSection title={tFields('sections.personal')}>
                  <Input
                    label={tFields('fields.firstName.label')}
                    placeholder={tFields('fields.firstName.placeholder')}
                    required
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label={tFields('fields.lastName.label')}
                    placeholder={tFields('fields.lastName.placeholder')}
                    required
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                  <Input
                    type="email"
                    label={tFields('fields.email.label')}
                    placeholder={tFields('fields.email.placeholder')}
                    required
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    type="tel"
                    label={tFields('fields.phone.label')}
                    placeholder={tFields('fields.phone.placeholder')}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label={tFields('fields.company.label')}
                    placeholder={tFields('fields.company.placeholder')}
                    className="sm:col-span-2"
                    error={errors.company?.message}
                    {...register('company')}
                  />
                </FormSection>

                <FormSection title={tFields('sections.message')}>
                  <Input
                    label={tFields('fields.subject.label')}
                    placeholder={tFields('fields.subject.placeholder')}
                    required
                    className="sm:col-span-2"
                    error={errors.subject?.message}
                    {...register('subject')}
                  />
                  <Textarea
                    label={tFields('fields.message.label')}
                    placeholder={tFields('fields.message.placeholder')}
                    error={errors.message?.message}
                    className="sm:col-span-2"
                    {...register('message')}
                  />
                  <RadioGroup
                    legend={tFields('fields.preferredContactMethod.legend')}
                    className="sm:col-span-2"
                  >
                    <Radio
                      label={tFields('fields.preferredContactMethod.email')}
                      value="email"
                      {...register('preferredContactMethod')}
                    />
                    <Radio
                      label={tFields('fields.preferredContactMethod.phone')}
                      value="phone"
                      {...register('preferredContactMethod')}
                    />
                  </RadioGroup>
                </FormSection>

                <FormSection title={tFields('sections.consent')}>
                  <Checkbox
                    label={tFields('privacy.consentLabel')}
                    error={errors.consent?.message}
                    className="sm:col-span-2"
                    {...register('consent')}
                  />
                </FormSection>

                {mutation.isError ? (
                  <ErrorState
                    title={tFields('error.title')}
                    description={tFields('error.description')}
                    onRetry={handleSubmit(onSubmit)}
                  />
                ) : null}

                <Button type="submit" size="lg" loading={mutation.isPending}>
                  {mutation.isPending ? tFields('actions.submitting') : tFields('actions.submit')}
                </Button>
              </form>
            )}
          </RevealOnScroll>

          <RevealOnScroll className="flex flex-col gap-6">
            <div className="flex flex-col gap-6 rounded-2xl border border-border bg-surface-subtle p-6 sm:p-8">
              <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
                {t('info.title')}
              </p>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Icon
                    name="location-dot"
                    aria-hidden="true"
                    className="mt-0.5 text-lg text-brand"
                  />
                  <span className="text-body text-foreground">{LOCATION.address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="phone" aria-hidden="true" className="text-lg text-brand" />
                  <a
                    href={`tel:${LOCATION.phone.replace(/\s+/g, '')}`}
                    className="text-body text-foreground hover:text-brand"
                  >
                    {LOCATION.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Icon name="envelope" aria-hidden="true" className="text-lg text-brand" />
                  <a
                    href={`mailto:${LOCATION.email}`}
                    className="text-body text-foreground hover:text-brand"
                  >
                    {LOCATION.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Icon name="clock" aria-hidden="true" className="mt-0.5 text-lg text-brand" />
                  <span className="flex flex-col gap-0.5 text-body text-foreground">
                    {LOCATION.hours.map((entry) => (
                      <span key={entry.day}>
                        {tHome(`location.hours.${entry.day}`)} — {entry.value}
                      </span>
                    ))}
                  </span>
                </li>
              </ul>
            </div>
            <Map className="min-h-72 w-full rounded-2xl" />
          </RevealOnScroll>
        </Container>
      </Section>
    </>
  )
}
