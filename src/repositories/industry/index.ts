import { env } from '@/config/env'
import { MockIndustryRepository } from './mock-industry.repository'
import type { IndustryRepository } from './industry.repository'

function createIndustryRepository(): IndustryRepository {
  if (env.VITE_USE_MOCK) {
    return new MockIndustryRepository()
  }

  throw new Error(
    'DolibarrIndustryRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const industryRepository: IndustryRepository = createIndustryRepository()

export type { IndustryRepository } from './industry.repository'
