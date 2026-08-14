import { successStoryRepository } from '@/repositories/success-story'
import type { SuccessStory } from '@/types/entities/success-story'

export const SuccessStoryService = {
  getAll(): Promise<SuccessStory[]> {
    return successStoryRepository.getAll()
  },
}
