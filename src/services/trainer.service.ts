import { trainerRepository } from '@/repositories/trainer'
import type { Trainer } from '@/types/entities/trainer'

export const TrainerService = {
  getAll(): Promise<Trainer[]> {
    return trainerRepository.getAll()
  },

  getFeatured(): Promise<Trainer[]> {
    return trainerRepository.getFeatured()
  },

  getBySlug(slug: string): Promise<Trainer | null> {
    return trainerRepository.getBySlug(slug)
  },
}
