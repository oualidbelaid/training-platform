import type { LocalizedText, TrainingFormat, TrainingLevel } from '@/types/entities/common'

/** One module/unit inside a training's program (spec §19 "Program"). */
export interface TrainingProgramModule {
  title: LocalizedText
  description: LocalizedText
}

/** One question in a training's FAQ (spec §19 "FAQ where appropriate"). */
export interface TrainingFaqItem {
  question: LocalizedText
  answer: LocalizedText
}

/** One upcoming scheduled session (spec §19 "Dates" / "Location"). */
export interface TrainingSession {
  startDate: string
  location?: LocalizedText
}

/**
 * Canonical domain shape consumed by the UI. Produced by TrainingMapper
 * from a TrainingDTO — components never see a DTO directly (spec §25).
 *
 * `summary` (short, catalog-card length) and `description` (long-form,
 * details-page length) are deliberately separate fields rather than one
 * field truncated by the UI — a catalog card and a details page have very
 * different editorial needs, and Dolibarr is likely to expose these as two
 * distinct fields too (a short description and a full description).
 */
export interface Training {
  id: string
  slug: string
  title: LocalizedText
  summary: LocalizedText
  description: LocalizedText
  objectives: LocalizedText[]
  targetAudience: LocalizedText[]
  prerequisites: LocalizedText[]
  program: TrainingProgramModule[]
  methodology: LocalizedText
  faq: TrainingFaqItem[]
  sessions: TrainingSession[]
  format: TrainingFormat
  level: TrainingLevel
  durationHours: number
  categoryId: string
  trainerIds: string[]
  featured: boolean
  image: string
}
