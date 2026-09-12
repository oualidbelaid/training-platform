import type { Partner } from '@/types/entities/partner'

export interface PartnerRepository {
  getAll(): Promise<Partner[]>
}
