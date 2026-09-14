import { describe, expect, it } from 'vitest'
import type { Review } from '@/types/entities/review'
import { getApprovedReviewStats } from './getApprovedReviewStats'

function makeReview(overrides: Partial<Review> = {}): Review {
  return {
    id: 'review-1',
    rating: 5,
    comment: 'Excellente formation.',
    createdAt: '2026-01-10T09:00:00.000Z',
    status: 'approved',
    ...overrides,
  }
}

describe('getApprovedReviewStats', () => {
  it('returns a zero count and a zero average for an empty list', () => {
    expect(getApprovedReviewStats([])).toEqual({ count: 0, average: 0 })
  })

  it('ignores pending reviews entirely', () => {
    const stats = getApprovedReviewStats([
      makeReview({ id: 'a', rating: 5, status: 'pending' }),
      makeReview({ id: 'b', rating: 1, status: 'pending' }),
    ])

    expect(stats).toEqual({ count: 0, average: 0 })
  })

  it('averages only the approved reviews', () => {
    const stats = getApprovedReviewStats([
      makeReview({ id: 'a', rating: 5, status: 'approved' }),
      makeReview({ id: 'b', rating: 3, status: 'approved' }),
      makeReview({ id: 'c', rating: 1, status: 'pending' }),
    ])

    expect(stats).toEqual({ count: 2, average: 4 })
  })

  it('computes a fractional average without rounding', () => {
    const stats = getApprovedReviewStats([
      makeReview({ id: 'a', rating: 5 }),
      makeReview({ id: 'b', rating: 4 }),
      makeReview({ id: 'c', rating: 4 }),
    ])

    expect(stats.count).toBe(3)
    expect(stats.average).toBeCloseTo(4.333, 3)
  })
})
