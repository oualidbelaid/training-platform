import type { LeadFormType, PreferredContactMethod } from '@/types/entities/lead'
import type { TrainingFormat } from '@/types/entities/common'

/**
 * Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md.
 * Unlike every other DTO in this codebase, this one is **outbound**: the UI
 * builds a `Lead`, `LeadMapper.toDTO()` converts it to this shape, and the
 * repository "sends" it (to the mock today, to Dolibarr eventually). Every
 * other domain only ever needed `fromDTO` (read); this is the write-path
 * mirror of that same mapper pattern.
 */
export interface LeadRequestDTO {
  form_type: LeadFormType
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  job_title?: string
  training_id?: string
  subject?: string
  preferred_contact_method?: PreferredContactMethod
  participants_count?: number
  preferred_format?: TrainingFormat
  preferred_date?: string
  location?: string
  training_needs?: string
  areas_of_interest?: string
  message?: string
  consent: boolean
}

export interface LeadSubmissionResultDTO {
  id: string
  submitted_at: string
}
