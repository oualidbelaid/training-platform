import { env } from '@/config/env'
import { MockReviewRepository } from './mock-review.repository'
import type { ReviewRepository } from './review.repository'

function createReviewRepository(): ReviewRepository {
  if (env.VITE_USE_MOCK) {
    return new MockReviewRepository()
  }

  throw new Error(
    'DolibarrReviewRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const reviewRepository: ReviewRepository = createReviewRepository()

export type { ReviewRepository } from './review.repository'
