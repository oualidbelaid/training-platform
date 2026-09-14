export type ReviewStatus = 'pending' | 'approved'

/**
 * A visitor-submitted training evaluation. `status` gates public visibility
 * — only `approved` reviews contribute to the displayed average/count. The
 * mock repository stamps new submissions `approved` immediately (no backend
 * to moderate against); `'pending'` is kept on the type for a future real
 * moderation workflow.
 */
export interface Review {
  id: string
  rating: number
  comment: string
  authorName?: string
  trainingId?: string
  createdAt: string
  status: ReviewStatus
}

/** What a visitor actually provides — `id`/`createdAt`/`status` are assigned on submission. */
export type ReviewSubmissionInput = Omit<Review, 'id' | 'createdAt' | 'status'>
