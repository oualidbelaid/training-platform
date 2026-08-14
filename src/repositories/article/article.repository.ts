import type { Article } from '@/types/entities/article'

export interface ArticleRepository {
  getAll(): Promise<Article[]>
  getBySlug(slug: string): Promise<Article | null>
}
