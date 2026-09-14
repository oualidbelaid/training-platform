import { reviewRepository } from '@/repositories/review'
import type { Review, ReviewSubmissionInput } from '@/types/entities/review'

export const ReviewService = {
  getAll(): Promise<Review[]> {
    return reviewRepository.getAll()
  },
  submit(input: ReviewSubmissionInput): Promise<Review> {
    return reviewRepository.submit(input)
  },
}
