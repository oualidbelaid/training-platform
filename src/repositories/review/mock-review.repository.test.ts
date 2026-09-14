import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReviewDTO } from '@/types/dto/review.dto'
import { MockReviewRepository } from './mock-review.repository'

function jsonResponse(body: unknown, ok = true): Response {
  return { ok, json: () => Promise.resolve(body) } as Response
}

/**
 * Node 22+'s built-in global `localStorage` (enabled without a valid
 * `--localstorage-file` path in this environment) shadows jsdom's own
 * implementation and exposes no methods at all — `window.localStorage.clear`
 * isn't even a function. Stubbing a real in-memory `Storage` is a test-env
 * workaround only; the repository's `window.localStorage` calls behave
 * normally in an actual browser.
 */
class InMemoryStorage implements Storage {
  private store = new Map<string, string>()
  get length() {
    return this.store.size
  }
  clear(): void {
    this.store.clear()
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) ?? null) : null
  }
  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null
  }
  removeItem(key: string): void {
    this.store.delete(key)
  }
  setItem(key: string, value: string): void {
    this.store.set(key, value)
  }
}

const SEED: ReviewDTO[] = [
  {
    id: 'review-seed-1',
    rating: 5,
    comment: 'Formation très complète et formateur excellent.',
    created_at: '2026-01-10T09:00:00.000Z',
    status: 'approved',
  },
]

describe('MockReviewRepository', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new InMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('getAll() fetches the public/data/reviews.json seed and maps it to entities', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse(SEED))),
    )

    const repository = new MockReviewRepository()
    const reviews = await repository.getAll()

    expect(fetch).toHaveBeenCalledWith('/data/reviews.json')
    expect(reviews).toEqual([
      {
        id: 'review-seed-1',
        rating: 5,
        comment: 'Formation très complète et formateur excellent.',
        authorName: undefined,
        trainingId: undefined,
        createdAt: '2026-01-10T09:00:00.000Z',
        status: 'approved',
      },
    ])
  })

  it('degrades to an empty seed when the fetch fails outright', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new Error('network down'))),
    )

    const repository = new MockReviewRepository()
    await expect(repository.getAll()).resolves.toEqual([])
  })

  it('degrades to an empty seed when the response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse([], false))),
    )

    const repository = new MockReviewRepository()
    await expect(repository.getAll()).resolves.toEqual([])
  })

  it('degrades to an empty seed when the response body is not an array', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse({ not: 'an array' }))),
    )

    const repository = new MockReviewRepository()
    await expect(repository.getAll()).resolves.toEqual([])
  })

  it('submit() persists the review to localStorage stamped as approved (no moderation backend)', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse([]))),
    )

    const repository = new MockReviewRepository()
    const result = await repository.submit({ rating: 4, comment: 'Très bonne formation pratique.' })

    expect(result.id).toMatch(/^review-/)
    expect(result.status).toBe('approved')
    expect(new Date(result.createdAt).toString()).not.toBe('Invalid Date')

    const stored = JSON.parse(window.localStorage.getItem('istam-submitted-reviews') ?? '[]')
    expect(stored).toHaveLength(1)
    expect(stored[0]).toMatchObject({ rating: 4, status: 'approved' })
  })

  it('a submitted review is immediately included in a subsequent getAll() (simulated reload), merged with the seed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(jsonResponse(SEED))),
    )

    const repository = new MockReviewRepository()
    await repository.submit({ rating: 3, comment: 'Contenu correct, rythme un peu rapide.' })

    const reviews = await repository.getAll()
    expect(reviews).toHaveLength(2)
    expect(reviews.some((review) => review.status === 'approved' && review.rating === 3)).toBe(true)
  })
})
