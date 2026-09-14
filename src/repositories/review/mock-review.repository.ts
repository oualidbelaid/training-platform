import type { ReviewDTO } from '@/types/dto/review.dto'
import type { Review, ReviewSubmissionInput } from '@/types/entities/review'
import { ReviewMapper } from './review.mapper'
import type { ReviewRepository } from './review.repository'

const SIMULATED_LATENCY_MS = 200
const STORAGE_KEY = 'istam-submitted-reviews'
const SEED_URL = '/data/reviews.json'

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

function generateId(): string {
  return `review-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

/**
 * `public/data/reviews.json` is a static seed — approved reviews baked in
 * at build/deploy time — served as a plain static asset. A Vercel
 * deployment (or any static host) can never let frontend code write back
 * to it, so it's fetched read-only here; any network/parse failure
 * degrades to an empty seed rather than surfacing an error or fabricating
 * content.
 */
async function readSeed(): Promise<ReviewDTO[]> {
  try {
    const response = await fetch(SEED_URL)
    if (!response.ok) return []
    const data: unknown = await response.json()
    return Array.isArray(data) ? (data as ReviewDTO[]) : []
  } catch {
    return []
  }
}

function readSubmitted(): ReviewDTO[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as ReviewDTO[]) : []
  } catch {
    return []
  }
}

function writeSubmitted(reviews: ReviewDTO[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews))
  } catch {
    // localStorage unavailable (private browsing, quota) — the submission
    // still resolves for this session; it just won't survive a reload.
  }
}

/**
 * Visitor-submitted reviews persist only in that visitor's own browser, via
 * `localStorage`, and are stamped `status: 'approved'` immediately — there
 * is no backend to run a moderation step against, so the submission counts
 * toward the average right away, in that same browser only. `getAll()`
 * merges the static `public/data/reviews.json` seed with whatever is in
 * `localStorage`; a *different* visitor never sees another visitor's
 * submission — see `docs/ARCHITECTURE.md` → "Reviews data & persistence"
 * for that limitation. The `ReviewStatus` type keeps `'pending'` for when a
 * real backend/admin moderation step is added later. Swapping this for a
 * real backend means adding a `DolibarrReviewRepository` here, same as
 * every other domain — the `ReviewRepository` interface, mapper, service
 * and hooks don't change.
 */
export class MockReviewRepository implements ReviewRepository {
  async getAll(): Promise<Review[]> {
    const seed = await readSeed()
    const all = [...seed, ...readSubmitted()]
    return delay(all.map(ReviewMapper.fromDTO))
  }

  async submit(input: ReviewSubmissionInput): Promise<Review> {
    const dto: ReviewDTO = {
      ...ReviewMapper.toSubmissionDTO(input),
      id: generateId(),
      created_at: new Date().toISOString(),
      status: 'approved',
    }

    writeSubmitted([...readSubmitted(), dto])
    return delay(ReviewMapper.fromDTO(dto))
  }
}
