import { useQuery } from '@tanstack/react-query'
import { EventService } from '@/services/event.service'

export function useUpcomingEvents() {
  return useQuery({
    queryKey: ['events', 'upcoming'],
    queryFn: () => EventService.getUpcoming(),
    staleTime: 10 * 60 * 1000,
  })
}
