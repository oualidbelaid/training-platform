import { eventRepository } from '@/repositories/event'
import type { Event } from '@/types/entities/event'

export const EventService = {
  getUpcoming(): Promise<Event[]> {
    return eventRepository.getUpcoming()
  },
  getAll(): Promise<Event[]> {
    return eventRepository.getAll()
  },
}
