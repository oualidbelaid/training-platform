import { env } from '@/config/env'
import { MockTrainingRepository } from './mock-training.repository'
import type { TrainingRepository } from './training.repository'

/**
 * Single switch point for Mock -> Dolibarr (spec §26). Services/hooks only
 * ever import `trainingRepository` from here, never a concrete class, so
 * adding DolibarrTrainingRepository later is additive: implement it here,
 * flip VITE_USE_MOCK, done.
 */
function createTrainingRepository(): TrainingRepository {
  if (env.VITE_USE_MOCK) {
    return new MockTrainingRepository()
  }

  throw new Error(
    'DolibarrTrainingRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const trainingRepository: TrainingRepository = createTrainingRepository()

export type { TrainingListParams, TrainingRepository, TrainingSortBy } from './training.repository'
