import { mockSuccessStoryDTOs } from '@/mocks/data/success-stories'
import type { SuccessStory } from '@/types/entities/success-story'
import { SuccessStoryMapper } from './success-story.mapper'
import type { SuccessStoryRepository } from './success-story.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockSuccessStoryRepository implements SuccessStoryRepository {
  private readonly successStories: SuccessStory[] = mockSuccessStoryDTOs.map(
    SuccessStoryMapper.fromDTO,
  )

  async getAll(): Promise<SuccessStory[]> {
    return delay(this.successStories)
  }
}
