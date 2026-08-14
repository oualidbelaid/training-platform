import { articleRepository } from '@/repositories/article'
import type { Article } from '@/types/entities/article'

export const ArticleService = {
  getAll(): Promise<Article[]> {
    return articleRepository.getAll()
  },
  getBySlug(slug: string): Promise<Article | null> {
    return articleRepository.getBySlug(slug)
  },
}
