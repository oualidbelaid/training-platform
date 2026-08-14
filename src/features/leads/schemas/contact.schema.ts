import { z } from 'zod'
import { buildContactFieldsSchema, optionalEnum, type Translate } from './contact-fields.schema'
import { buildConsentSchema } from './consent.schema'

export function buildContactSchema(t: Translate) {
  return buildContactFieldsSchema(t)
    .extend(buildConsentSchema(t).shape)
    .extend({
      subject: z.string().trim().min(2, t('validation.tooShort', { min: 2 })).max(160, t('validation.tooLong', { max: 160 })),
      preferredContactMethod: optionalEnum(['email', 'phone']),
    })
}

export type ContactValues = z.infer<ReturnType<typeof buildContactSchema>>
