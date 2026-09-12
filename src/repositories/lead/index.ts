import { env } from '@/config/env'
import { MockLeadRepository } from './mock-lead.repository'
import type { LeadRepository } from './lead.repository'

function createLeadRepository(): LeadRepository {
  if (env.VITE_USE_MOCK) {
    return new MockLeadRepository()
  }

  throw new Error(
    'DolibarrLeadRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const leadRepository: LeadRepository = createLeadRepository()

export type { LeadRepository } from './lead.repository'
