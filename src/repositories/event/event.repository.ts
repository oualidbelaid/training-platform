import type { Event } from '@/types/entities/event'

export interface EventRepository {
  getUpcoming(): Promise<Event[]>
  /** All events, past and future, sorted most-recent-start-date-first (M4 — dedicated Events page). */
  getAll(): Promise<Event[]>
}
