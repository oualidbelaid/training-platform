import { env } from '@/config/env'
import { MockPartnerRepository } from './mock-partner.repository'
import type { PartnerRepository } from './partner.repository'

function createPartnerRepository(): PartnerRepository {
  if (env.VITE_USE_MOCK) {
    return new MockPartnerRepository()
  }

  throw new Error(
    'DolibarrPartnerRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const partnerRepository: PartnerRepository = createPartnerRepository()

export type { PartnerRepository } from './partner.repository'
