import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ReviewService } from '@/services/review.service'
import type { ReviewSubmissionInput } from '@/types/entities/review'

export function useSubmitReview() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: ReviewSubmissionInput) => ReviewService.submit(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['reviews'] })
    },
  })
}
