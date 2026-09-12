import { categoryRepository } from '@/repositories/category'
import type { Category } from '@/types/entities/category'

export const CategoryService = {
  getAll(): Promise<Category[]> {
    return categoryRepository.getAll()
  },

  getBySlug(slug: string): Promise<Category | null> {
    return categoryRepository.getBySlug(slug)
  },
}
