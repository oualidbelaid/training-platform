import { useQuery } from '@tanstack/react-query'
import { TrainingDomainService } from '@/services/training-domain.service'

/** All real ISTAM catalogue domains — filtering by pillar happens client-side (`categoryId`), same pattern as `useTrainings`' in-memory mock filtering. */
export function useTrainingDomains() {
  return useQuery({
    queryKey: ['training-domains'],
    queryFn: () => TrainingDomainService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
