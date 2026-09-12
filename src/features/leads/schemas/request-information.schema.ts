import { z } from 'zod'
import { buildContactFieldsSchema, optionalEnum, type Translate } from './contact-fields.schema'
import { buildConsentSchema } from './consent.schema'

export function buildRequestInformationSchema(t: Translate) {
  return buildContactFieldsSchema(t)
    .extend(buildConsentSchema(t).shape)
    .extend({
      trainingId: z.string().trim().optional().or(z.literal('')),
      preferredContactMethod: optionalEnum(['email', 'phone']),
    })
}

export type RequestInformationValues = z.infer<ReturnType<typeof buildRequestInformationSchema>>
