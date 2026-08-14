/**
 * Provisional shape of a Training record as anticipated from the future
 * Dolibarr REST API (spec §26). This is a best guess, not a confirmed
 * contract — real field names will only be known once Dolibarr access
 * exists (M14). Mock data is authored in this exact shape so the mapper
 * below is exercised from day one; when the real shape differs, only this
 * file and TrainingMapper.fromDTO need to change, never the UI.
 */

export interface TrainingProgramModuleDTO {
  title_fr: string
  title_en: string
  title_ar: string
  description_fr: string
  description_en: string
  description_ar: string
}

export interface TrainingFaqItemDTO {
  question_fr: string
  question_en: string
  question_ar: string
  answer_fr: string
  answer_en: string
  answer_ar: string
}

export interface TrainingSessionDTO {
  start_date: string
  location_fr?: string
  location_en?: string
  location_ar?: string
}

export interface TrainingDTO {
  id: string
  slug: string
  title_fr: string
  title_en: string
  title_ar: string
  summary_fr: string
  summary_en: string
  summary_ar: string
  description_fr: string
  description_en: string
  description_ar: string
  /** Parallel arrays, index-matched across languages (item N is the same objective in all three). */
  objectives_fr: string[]
  objectives_en: string[]
  objectives_ar: string[]
  target_audience_fr: string[]
  target_audience_en: string[]
  target_audience_ar: string[]
  prerequisites_fr: string[]
  prerequisites_en: string[]
  prerequisites_ar: string[]
  program: TrainingProgramModuleDTO[]
  methodology_fr: string
  methodology_en: string
  methodology_ar: string
  faq: TrainingFaqItemDTO[]
  sessions: TrainingSessionDTO[]
  format: 'in-person' | 'online' | 'hybrid'
  level: 'beginner' | 'intermediate' | 'advanced'
  duration_hours: number
  category_id: string
  trainer_ids: string[]
  is_featured: boolean
  image_url: string
}
