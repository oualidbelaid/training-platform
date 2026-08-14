import { z } from 'zod'
import type { Translate } from './contact-fields.schema'

/** Explicit, never-preselected consent checkbox shared by every lead form (spec M5 §Privacy/Consent). */
export function buildConsentSchema(t: Translate) {
  return z.object({
    consent: z.boolean().refine((value) => value === true, t('validation.consentRequired')),
  })
}
