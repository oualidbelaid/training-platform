import { useQuery } from '@tanstack/react-query'
import { IndustryService } from '@/services/industry.service'

export function useIndustries() {
  return useQuery({
    queryKey: ['industries'],
    queryFn: () => IndustryService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
