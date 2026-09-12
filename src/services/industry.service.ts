import { industryRepository } from '@/repositories/industry'
import type { Industry } from '@/types/entities/industry'

export const IndustryService = {
  getAll(): Promise<Industry[]> {
    return industryRepository.getAll()
  },
}
