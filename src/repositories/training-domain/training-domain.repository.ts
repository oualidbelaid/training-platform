import type { TrainingDomain } from '@/types/entities/training-domain'

export interface TrainingDomainRepository {
  getAll(): Promise<TrainingDomain[]>
}
