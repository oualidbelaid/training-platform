import { useQuery } from '@tanstack/react-query'
import { ArticleService } from '@/services/article.service'

export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => ArticleService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
