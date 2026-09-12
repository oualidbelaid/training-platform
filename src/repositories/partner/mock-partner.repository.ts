import { mockPartnerDTOs } from '@/mocks/data/partners'
import type { Partner } from '@/types/entities/partner'
import { PartnerMapper } from './partner.mapper'
import type { PartnerRepository } from './partner.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockPartnerRepository implements PartnerRepository {
  private readonly partners: Partner[] = mockPartnerDTOs.map(PartnerMapper.fromDTO)

  async getAll(): Promise<Partner[]> {
    return delay(this.partners)
  }
}
