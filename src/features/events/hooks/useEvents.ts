import { useQuery } from '@tanstack/react-query'
import { EventService } from '@/services/event.service'

/** All events, past and future — for the dedicated Events page (M4). */
export function useEvents() {
  return useQuery({
    queryKey: ['events', 'all'],
    queryFn: () => EventService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
