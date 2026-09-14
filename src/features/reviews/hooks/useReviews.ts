import { useQuery } from '@tanstack/react-query'
import { ReviewService } from '@/services/review.service'

export function useReviews() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: () => ReviewService.getAll(),
    staleTime: 60 * 1000,
  })
}
