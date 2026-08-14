import { env } from '@/config/env'
import { MockCategoryRepository } from './mock-category.repository'
import type { CategoryRepository } from './category.repository'

function createCategoryRepository(): CategoryRepository {
  if (env.VITE_USE_MOCK) {
    return new MockCategoryRepository()
  }

  throw new Error(
    'DolibarrCategoryRepository is not implemented yet. Set VITE_USE_MOCK=true until the Dolibarr integration milestone.',
  )
}

export const categoryRepository: CategoryRepository = createCategoryRepository()

export type { CategoryRepository } from './category.repository'
