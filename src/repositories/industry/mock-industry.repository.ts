import { mockIndustryDTOs } from '@/mocks/data/industries'
import type { Industry } from '@/types/entities/industry'
import { IndustryMapper } from './industry.mapper'
import type { IndustryRepository } from './industry.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockIndustryRepository implements IndustryRepository {
  private readonly industries: Industry[] = mockIndustryDTOs.map(IndustryMapper.fromDTO)

  async getAll(): Promise<Industry[]> {
    return delay(this.industries)
  }
}
