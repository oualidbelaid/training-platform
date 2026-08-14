import { useQuery } from '@tanstack/react-query'
import { TrainingService } from '@/services/training.service'

export function useTraining(slug: string) {
  return useQuery({
    queryKey: ['training', slug],
    queryFn: () => TrainingService.getBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  })
}
