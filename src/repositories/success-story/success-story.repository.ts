import type { SuccessStory } from '@/types/entities/success-story'

export interface SuccessStoryRepository {
  getAll(): Promise<SuccessStory[]>
}
