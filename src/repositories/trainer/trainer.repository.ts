import type { Trainer } from '@/types/entities/trainer'

export interface TrainerRepository {
  getAll(): Promise<Trainer[]>
  getFeatured(): Promise<Trainer[]>
  getBySlug(slug: string): Promise<Trainer | null>
}
