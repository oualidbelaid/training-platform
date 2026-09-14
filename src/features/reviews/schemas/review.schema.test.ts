import { describe, expect, it } from 'vitest'
import { buildReviewSchema } from './review.schema'

const t = (key: string) => key

describe('buildReviewSchema', () => {
  it('accepts a valid rating and comment', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 5,
      comment: 'Formation très bien organisée et animée.',
    })

    expect(result.success).toBe(true)
  })

  it('rejects a rating of 0 (nothing selected)', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 0,
      comment: 'Formation très bien organisée et animée.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects a rating above the 5-star max', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 6,
      comment: 'Formation très bien organisée et animée.',
    })

    expect(result.success).toBe(false)
  })

  it('rejects a comment shorter than 10 characters', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 4,
      comment: 'Trop',
    })

    expect(result.success).toBe(false)
  })

  it('rejects a comment longer than 2000 characters', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 4,
      comment: 'a'.repeat(2001),
    })

    expect(result.success).toBe(false)
  })

  it('trims the comment before validating length', () => {
    const result = buildReviewSchema(t).safeParse({
      rating: 4,
      comment: `  ${'a'.repeat(10)}  `,
    })

    expect(result.success).toBe(true)
  })
})
