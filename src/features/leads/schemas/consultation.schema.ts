import { z } from 'zod'
import { buildContactFieldsSchema, optionalEnum, type Translate } from './contact-fields.schema'
import { buildConsentSchema } from './consent.schema'

export function buildConsultationSchema(t: Translate) {
  return buildContactFieldsSchema(t)
    .extend(buildConsentSchema(t).shape)
    .extend({
      trainingNeeds: z
        .string()
        .trim()
        .max(2000, t('validation.tooLong', { max: 2000 }))
        .optional()
        .or(z.literal('')),
      participantsCount: z
        .string()
        .trim()
        .optional()
        .or(z.literal(''))
        .refine(
          (value) => !value || (/^\d+$/.test(value) && Number(value) > 0),
          t('validation.invalidNumber'),
        ),
      areasOfInterest: z
        .string()
        .trim()
        .max(500, t('validation.tooLong', { max: 500 }))
        .optional()
        .or(z.literal('')),
      preferredContactMethod: optionalEnum(['email', 'phone']),
    })
}

export type ConsultationValues = z.infer<ReturnType<typeof buildConsultationSchema>>
