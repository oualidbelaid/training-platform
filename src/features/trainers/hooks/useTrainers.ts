import { useQuery } from '@tanstack/react-query'
import { TrainerService } from '@/services/trainer.service'

/** All trainers (not just `featured`) — used by the Training Details page's trainer section. */
export function useTrainers() {
  return useQuery({
    queryKey: ['trainers', 'all'],
    queryFn: () => TrainerService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
