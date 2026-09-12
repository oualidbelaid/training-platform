import { useQuery } from '@tanstack/react-query'
import { PartnerService } from '@/services/partner.service'

export function usePartners() {
  return useQuery({
    queryKey: ['partners'],
    queryFn: () => PartnerService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
