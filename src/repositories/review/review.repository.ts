import type { Review, ReviewSubmissionInput } from '@/types/entities/review'

export interface ReviewRepository {
  getAll(): Promise<Review[]>
  submit(input: ReviewSubmissionInput): Promise<Review>
}
