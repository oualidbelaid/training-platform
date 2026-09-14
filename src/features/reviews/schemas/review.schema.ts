import { z } from 'zod'

/** Loose structural type for `useTranslation('reviews').t` — same convention as `leads/schemas/contact-fields.schema.ts`, kept local so this feature doesn't depend on the leads feature for a one-line type. */
export type Translate = (key: string, options?: Record<string, unknown>) => string

/**
 * Built as a factory (`buildReviewSchema(t)`), not a static export, so
 * validation messages are localized — same convention as every lead-form
 * schema in this codebase.
 */
export function buildReviewSchema(t: Translate) {
  return z.object({
    rating: z
      .number()
      .min(1, t('validation.ratingRequired'))
      .max(5, t('validation.ratingRequired')),
    comment: z
      .string()
      .trim()
      .min(10, t('validation.tooShort', { min: 10 }))
      .max(2000, t('validation.tooLong', { max: 2000 })),
  })
}

export type ReviewFormValues = z.infer<ReturnType<typeof buildReviewSchema>>
