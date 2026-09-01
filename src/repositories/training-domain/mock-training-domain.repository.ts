import { mockTrainingDomainDTOs } from '@/mocks/data/training-domains'
import type { TrainingDomain } from '@/types/entities/training-domain'
import { TrainingDomainMapper } from './training-domain.mapper'
import type { TrainingDomainRepository } from './training-domain.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockTrainingDomainRepository implements TrainingDomainRepository {
  private readonly domains: TrainingDomain[] = mockTrainingDomainDTOs.map(TrainingDomainMapper.fromDTO)

  async getAll(): Promise<TrainingDomain[]> {
    return delay(this.domains)
  }
}
