import type { TrainingFormat } from '@/types/entities/common'

/** Which of the 5 lead-generation experiences a submission came from (spec M5). */
export type LeadFormType = 'request-information' | 'request-quote' | 'contact' | 'register-interest' | 'consultation'

export type PreferredContactMethod = 'email' | 'phone'

/**
 * Single shared shape for every lead form rather than 5 near-identical
 * entities — CLAUDE.md M5 §"Data architecture": "Do not over-engineer if a
 * shared Lead DTO can safely represent the different request types." Each
 * form's Zod schema only requires the subset of these fields it actually
 * collects; the rest stay optional here so one type covers all 5.
 */
export interface Lead {
  formType: LeadFormType
  firstName: string
  lastName: string
  email: string
  phone?: string
  company?: string
  jobTitle?: string
  trainingId?: string
  subject?: string
  preferredContactMethod?: PreferredContactMethod
  participantsCount?: number
  preferredFormat?: TrainingFormat
  preferredDate?: string
  location?: string
  trainingNeeds?: string
  areasOfInterest?: string
  message?: string
  consent: boolean
}

/** Server-assigned data a successful submission returns. */
export interface LeadSubmissionResult {
  id: string
  submittedAt: string
}
