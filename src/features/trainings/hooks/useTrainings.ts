import { useQuery } from '@tanstack/react-query'
import type { TrainingListParams } from '@/repositories/training'
import { TrainingService } from '@/services/training.service'

export function useTrainings(params?: TrainingListParams) {
  return useQuery({
    queryKey: ['trainings', params],
    queryFn: () => TrainingService.getAll(params),
    staleTime: 5 * 60 * 1000,
  })
}
