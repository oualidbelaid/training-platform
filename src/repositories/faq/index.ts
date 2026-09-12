import { env } from '@/config/env'
import { MockFaqRepository } from './mock-faq.repository'
import type { FaqRepository } from './faq.repository'

function createFaqRepository(): FaqRepository {
  if (env.VITE_USE_MOCK) {
    return new MockFaqRepository()
  }

  throw new Error(
    'DolibarrFaqRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const faqRepository: FaqRepository = createFaqRepository()

export type { FaqRepository } from './faq.repository'
