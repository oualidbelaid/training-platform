import { z } from 'zod'
import { buildContactFieldsSchema, optionalEnum, type Translate } from './contact-fields.schema'
import { buildConsentSchema } from './consent.schema'

export function buildRequestQuoteSchema(t: Translate) {
  return buildContactFieldsSchema(t)
    .extend(buildConsentSchema(t).shape)
    .extend({
      trainingId: z.string().trim().optional().or(z.literal('')),
      participantsCount: z
        .string()
        .trim()
        .optional()
        .or(z.literal(''))
        .refine(
          (value) => !value || (/^\d+$/.test(value) && Number(value) > 0),
          t('validation.invalidNumber'),
        ),
      preferredFormat: optionalEnum(['in-person', 'online', 'hybrid']),
      preferredDate: z.string().trim().optional().or(z.literal('')),
      location: z
        .string()
        .trim()
        .max(160, t('validation.tooLong', { max: 160 }))
        .optional()
        .or(z.literal('')),
    })
}

export type RequestQuoteValues = z.infer<ReturnType<typeof buildRequestQuoteSchema>>
