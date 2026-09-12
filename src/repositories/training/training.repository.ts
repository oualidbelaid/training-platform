import type { PaginatedResult, TrainingFormat, TrainingLevel } from '@/types/entities/common'
import type { Training } from '@/types/entities/training'

export type TrainingSortBy = 'relevance' | 'duration-asc' | 'duration-desc'

export interface TrainingListParams {
  page?: number
  pageSize?: number
  categoryId?: string
  /** Matched against the training's title/summary in `searchLanguage` — case-insensitive. */
  search?: string
  searchLanguage?: 'fr' | 'en' | 'ar'
  format?: TrainingFormat
  level?: TrainingLevel
  sortBy?: TrainingSortBy
}

/**
 * Contract consumed by services/hooks. Never import a concrete
 * implementation (Mock/Dolibarr) above this interface — see
 * docs/DOLIBARR_GUIDE.md for the Mock→Dolibarr migration.
 */
export interface TrainingRepository {
  getAll(params?: TrainingListParams): Promise<PaginatedResult<Training>>
  getBySlug(slug: string): Promise<Training | null>
  getFeatured(): Promise<Training[]>
}
