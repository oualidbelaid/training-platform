import { describe, expect, it } from 'vitest'
import { MockSuccessStoryRepository } from './mock-success-story.repository'

describe('MockSuccessStoryRepository', () => {
  it('returns success stories mapped to the domain entity shape', async () => {
    const repository = new MockSuccessStoryRepository()
    const stories = await repository.getAll()

    expect(stories.length).toBeGreaterThan(0)
    expect(stories[0]!.results.length).toBeGreaterThan(0)
    expect(stories[0]).toHaveProperty('challenge.fr')
  })
})
