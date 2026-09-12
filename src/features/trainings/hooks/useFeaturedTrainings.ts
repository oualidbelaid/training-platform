import { useQuery } from '@tanstack/react-query'
import { TrainingService } from '@/services/training.service'

export function useFeaturedTrainings() {
  return useQuery({
    queryKey: ['trainings', 'featured'],
    queryFn: () => TrainingService.getFeatured(),
    staleTime: 5 * 60 * 1000,
  })
}
