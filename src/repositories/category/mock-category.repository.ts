import { mockCategoryDTOs } from '@/mocks/data/categories'
import type { Category } from '@/types/entities/category'
import { CategoryMapper } from './category.mapper'
import type { CategoryRepository } from './category.repository'

const SIMULATED_LATENCY_MS = 200

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockCategoryRepository implements CategoryRepository {
  private readonly categories: Category[] = mockCategoryDTOs.map(CategoryMapper.fromDTO)

  async getAll(): Promise<Category[]> {
    return delay(this.categories)
  }

  async getBySlug(slug: string): Promise<Category | null> {
    return delay(this.categories.find((category) => category.slug === slug) ?? null)
  }
}
