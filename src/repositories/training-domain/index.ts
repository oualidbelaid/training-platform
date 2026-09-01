import { env } from '@/config/env'
import { MockTrainingDomainRepository } from './mock-training-domain.repository'
import type { TrainingDomainRepository } from './training-domain.repository'

function createTrainingDomainRepository(): TrainingDomainRepository {
  if (env.VITE_USE_MOCK) {
    return new MockTrainingDomainRepository()
  }

  throw new Error(
    'DolibarrTrainingDomainRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const trainingDomainRepository: TrainingDomainRepository = createTrainingDomainRepository()

export type { TrainingDomainRepository } from './training-domain.repository'
