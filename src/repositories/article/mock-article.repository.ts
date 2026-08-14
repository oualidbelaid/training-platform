import { mockArticleDTOs } from '@/mocks/data/articles'
import type { Article } from '@/types/entities/article'
import { ArticleMapper } from './article.mapper'
import type { ArticleRepository } from './article.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockArticleRepository implements ArticleRepository {
  private readonly articles: Article[] = mockArticleDTOs
    .map(ArticleMapper.fromDTO)
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))

  async getAll(): Promise<Article[]> {
    return delay(this.articles)
  }

  async getBySlug(slug: string): Promise<Article | null> {
    return delay(this.articles.find((article) => article.slug === slug) ?? null)
  }
}
