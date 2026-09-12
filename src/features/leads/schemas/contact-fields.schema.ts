import { z } from 'zod'

/** Loose structural type for `useTranslation('leadForms').t` — avoids coupling every schema factory to i18next's full generic `TFunction`. */
export type Translate = (key: string, options?: Record<string, unknown>) => string

/**
 * An optional single-choice field backed by a native `<select>` or a
 * `RadioGroup` — never left unregistered/`undefined` for a genuinely
 * unmade choice the way `z.enum(values).optional()` alone would assume.
 * An unselected native `<select>` (its placeholder `<option value="">` is
 * `disabled`, not absent — see `Select.tsx`) resolves to the DOM string
 * `''`; a `RadioGroup` with no option checked resolves to `null` (React
 * Hook Form's read of an unchecked radio input with no matching
 * `defaultValues` entry — confirmed by direct inspection, not assumption).
 * `.optional()` alone only accepts `undefined`, so either shape leaves the
 * field permanently invalid and the form silently stuck — the exact bug
 * this fixes. Normalize whichever the caller receives to `undefined` where
 * consumed (`value || undefined`, same as every optional text field here).
 */
export function optionalEnum<const T extends [string, ...string[]]>(values: T) {
  return z.enum(values).nullable().optional().or(z.literal(''))
}

/**
 * Shared field-level schemas reused across every lead form (Request
 * Information, Request a Quote, Contact, Register Interest, Consultation —
 * spec M5). Each form extends this base with only the fields it actually
 * needs, rather than duplicating validation rules five times.
 *
 * Built as a **factory** (`buildContactFieldsSchema(t)`), not a static
 * export, because validation messages must be localized (spec M5 §i18n)
 * and Zod schemas are otherwise defined once, outside any component's
 * render — the factory is called inside each form with the active
 * language's `t`, so messages match whatever language `useForm` is
 * mounted under.
 */
export function buildContactFieldsSchema(t: Translate) {
  return z.object({
    firstName: z
      .string()
      .trim()
      .min(2, t('validation.tooShort', { min: 2 }))
      .max(60, t('validation.tooLong', { max: 60 })),
    lastName: z
      .string()
      .trim()
      .min(2, t('validation.tooShort', { min: 2 }))
      .max(60, t('validation.tooLong', { max: 60 })),
    email: z.email(t('validation.invalidEmail')),
    phone: z
      .string()
      .trim()
      .min(6, t('validation.invalidPhone'))
      .max(20, t('validation.invalidPhone'))
      .optional()
      .or(z.literal('')),
    company: z
      .string()
      .trim()
      .max(120, t('validation.tooLong', { max: 120 }))
      .optional()
      .or(z.literal('')),
    jobTitle: z
      .string()
      .trim()
      .max(120, t('validation.tooLong', { max: 120 }))
      .optional()
      .or(z.literal('')),
    message: z
      .string()
      .trim()
      .max(2000, t('validation.tooLong', { max: 2000 }))
      .optional()
      .or(z.literal('')),
  })
}

export type ContactFields = z.infer<ReturnType<typeof buildContactFieldsSchema>>
