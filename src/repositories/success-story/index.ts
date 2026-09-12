import { env } from '@/config/env'
import { MockSuccessStoryRepository } from './mock-success-story.repository'
import type { SuccessStoryRepository } from './success-story.repository'

function createSuccessStoryRepository(): SuccessStoryRepository {
  if (env.VITE_USE_MOCK) {
    return new MockSuccessStoryRepository()
  }

  throw new Error(
    'DolibarrSuccessStoryRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const successStoryRepository: SuccessStoryRepository = createSuccessStoryRepository()

export type { SuccessStoryRepository } from './success-story.repository'
