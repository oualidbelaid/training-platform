import { mockTrainerDTOs } from '@/mocks/data/trainers'
import type { Trainer } from '@/types/entities/trainer'
import { TrainerMapper } from './trainer.mapper'
import type { TrainerRepository } from './trainer.repository'

const SIMULATED_LATENCY_MS = 220

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockTrainerRepository implements TrainerRepository {
  private readonly trainers: Trainer[] = mockTrainerDTOs.map(TrainerMapper.fromDTO)

  async getAll(): Promise<Trainer[]> {
    return delay(this.trainers)
  }

  async getFeatured(): Promise<Trainer[]> {
    return delay(this.trainers.filter((trainer) => trainer.featured))
  }

  async getBySlug(slug: string): Promise<Trainer | null> {
    return delay(this.trainers.find((trainer) => trainer.slug === slug) ?? null)
  }
}
