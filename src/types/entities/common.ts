import type { SupportedLanguage } from '@/i18n'

/** Text that exists in every supported language (spec §15). */
export type LocalizedText = Record<SupportedLanguage, string>

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}

export type TrainingFormat = 'in-person' | 'online' | 'hybrid'
export type TrainingLevel = 'beginner' | 'intermediate' | 'advanced'
