import { z } from 'zod'
import { buildContactFieldsSchema, optionalEnum, type Translate } from './contact-fields.schema'
import { buildConsentSchema } from './consent.schema'

export function buildRegisterInterestSchema(t: Translate) {
  return buildContactFieldsSchema(t)
    .extend(buildConsentSchema(t).shape)
    .extend({
      trainingId: z.string().trim().optional().or(z.literal('')),
      preferredFormat: optionalEnum(['in-person', 'online', 'hybrid']),
    })
}

export type RegisterInterestValues = z.infer<ReturnType<typeof buildRegisterInterestSchema>>
