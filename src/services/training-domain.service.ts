import { trainingDomainRepository } from '@/repositories/training-domain'
import type { TrainingDomain } from '@/types/entities/training-domain'

export const TrainingDomainService = {
  getAll(): Promise<TrainingDomain[]> {
    return trainingDomainRepository.getAll()
  },
}
