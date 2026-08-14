import { useQuery } from '@tanstack/react-query'
import { ArticleService } from '@/services/article.service'

export function useArticle(slug: string) {
  return useQuery({
    queryKey: ['article', slug],
    queryFn: () => ArticleService.getBySlug(slug),
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(slug),
  })
}
