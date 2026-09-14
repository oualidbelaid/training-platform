import type { ReviewDTO, ReviewSubmissionDTO } from '@/types/dto/review.dto'
import type { Review, ReviewSubmissionInput } from '@/types/entities/review'

export const ReviewMapper = {
  fromDTO(dto: ReviewDTO): Review {
    return {
      id: dto.id,
      rating: dto.rating,
      comment: dto.comment,
      authorName: dto.author_name,
      trainingId: dto.training_id,
      createdAt: dto.created_at,
      status: dto.status,
    }
  },
  toSubmissionDTO(input: ReviewSubmissionInput): ReviewSubmissionDTO {
    return {
      rating: input.rating,
      comment: input.comment,
      author_name: input.authorName,
      training_id: input.trainingId,
    }
  },
}
