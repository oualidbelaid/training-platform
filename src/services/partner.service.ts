import { partnerRepository } from '@/repositories/partner'
import type { Partner } from '@/types/entities/partner'

export const PartnerService = {
  getAll(): Promise<Partner[]> {
    return partnerRepository.getAll()
  },
}
