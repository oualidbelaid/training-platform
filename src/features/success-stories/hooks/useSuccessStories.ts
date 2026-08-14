import { useQuery } from '@tanstack/react-query'
import { SuccessStoryService } from '@/services/success-story.service'

export function useSuccessStories() {
  return useQuery({
    queryKey: ['success-stories'],
    queryFn: () => SuccessStoryService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
