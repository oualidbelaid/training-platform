import { env } from '@/config/env'
import { MockEventRepository } from './mock-event.repository'
import type { EventRepository } from './event.repository'

function createEventRepository(): EventRepository {
  if (env.VITE_USE_MOCK) {
    return new MockEventRepository()
  }

  throw new Error(
    'DolibarrEventRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const eventRepository: EventRepository = createEventRepository()

export type { EventRepository } from './event.repository'
