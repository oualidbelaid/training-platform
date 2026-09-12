import { env } from '@/config/env'
import { MockTrainerRepository } from './mock-trainer.repository'
import type { TrainerRepository } from './trainer.repository'

function createTrainerRepository(): TrainerRepository {
  if (env.VITE_USE_MOCK) {
    return new MockTrainerRepository()
  }

  throw new Error(
    'DolibarrTrainerRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const trainerRepository: TrainerRepository = createTrainerRepository()

export type { TrainerRepository } from './trainer.repository'
