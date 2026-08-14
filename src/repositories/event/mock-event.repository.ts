import { mockEventDTOs } from '@/mocks/data/events'
import type { Event } from '@/types/entities/event'
import { EventMapper } from './event.mapper'
import type { EventRepository } from './event.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockEventRepository implements EventRepository {
  private readonly events: Event[] = mockEventDTOs
    .map(EventMapper.fromDTO)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))

  async getUpcoming(): Promise<Event[]> {
    const today = new Date().toISOString().slice(0, 10)
    return delay(this.events.filter((event) => event.startDate >= today))
  }

  async getAll(): Promise<Event[]> {
    return delay([...this.events].sort((a, b) => b.startDate.localeCompare(a.startDate)))
  }
}
