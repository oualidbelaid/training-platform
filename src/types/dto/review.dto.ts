import type { ReviewStatus } from '@/types/entities/review'

/** Provisional Dolibarr-anticipated shape — see docs/DOLIBARR_GUIDE.md. */
export interface ReviewDTO {
  id: string
  rating: number
  comment: string
  author_name?: string
  training_id?: string
  created_at: string
  status: ReviewStatus
}

/** Outbound submission shape — `id`/`created_at`/`status` are assigned by the repository. */
export type ReviewSubmissionDTO = Omit<ReviewDTO, 'id' | 'created_at' | 'status'>
