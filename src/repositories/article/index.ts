import { env } from '@/config/env'
import { MockArticleRepository } from './mock-article.repository'
import type { ArticleRepository } from './article.repository'

function createArticleRepository(): ArticleRepository {
  if (env.VITE_USE_MOCK) {
    return new MockArticleRepository()
  }

  throw new Error(
    'DolibarrArticleRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const articleRepository: ArticleRepository = createArticleRepository()

export type { ArticleRepository } from './article.repository'
