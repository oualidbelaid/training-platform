import type { Review } from '@/types/entities/review'

export interface ApprovedReviewStats {
  count: number
  average: number
}

/**
 * Only `approved` reviews ever contribute to the public rating — `pending`
 * submissions never move it until a future moderation step promotes them
 * (see `docs/ARCHITECTURE.md` → "Reviews data & persistence"). With zero
 * approved reviews, `average` is `0` — callers must show neutral copy
 * instead of rendering it, never fabricate a number.
 */
export function getApprovedReviewStats(reviews: Review[]): ApprovedReviewStats {
  const approved = reviews.filter((review) => review.status === 'approved')
  const count = approved.length
  const average = count > 0 ? approved.reduce((sum, review) => sum + review.rating, 0) / count : 0

  return { count, average }
}
