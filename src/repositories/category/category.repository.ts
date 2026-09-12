import type { Category } from '@/types/entities/category'

export interface CategoryRepository {
  getAll(): Promise<Category[]>
  getBySlug(slug: string): Promise<Category | null>
}
