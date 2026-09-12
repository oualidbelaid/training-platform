import type { Industry } from '@/types/entities/industry'

export interface IndustryRepository {
  getAll(): Promise<Industry[]>
}
