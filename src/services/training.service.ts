import { trainingRepository, type TrainingListParams } from '@/repositories/training'
import type { PaginatedResult } from '@/types/entities/common'
import type { Training } from '@/types/entities/training'

/**
 * Business orchestration layer between hooks and repositories (spec §25).
 * Depends only on the TrainingRepository interface — this is where
 * cross-cutting rules (e.g. filtering, sorting policy) live once needed;
 * at foundation stage it simply delegates.
 */
export const TrainingService = {
  getAll(params?: TrainingListParams): Promise<PaginatedResult<Training>> {
    return trainingRepository.getAll(params)
  },

  getBySlug(slug: string): Promise<Training | null> {
    return trainingRepository.getBySlug(slug)
  },

  getFeatured(): Promise<Training[]> {
    return trainingRepository.getFeatured()
  },
}
