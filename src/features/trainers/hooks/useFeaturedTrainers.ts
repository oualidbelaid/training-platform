import { useQuery } from '@tanstack/react-query'
import { TrainerService } from '@/services/trainer.service'

export function useFeaturedTrainers() {
  return useQuery({
    queryKey: ['trainers', 'featured'],
    queryFn: () => TrainerService.getFeatured(),
    staleTime: 10 * 60 * 1000,
  })
}
