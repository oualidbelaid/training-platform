import { mockTrainingDTOs } from '@/mocks/data/trainings'
import type { PaginatedResult } from '@/types/entities/common'
import type { Training } from '@/types/entities/training'
import { getLocalizedText } from '@/utils/localized-text'
import { TrainingMapper } from './training.mapper'
import type { TrainingListParams, TrainingRepository } from './training.repository'

const SIMULATED_LATENCY_MS = 250

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

export class MockTrainingRepository implements TrainingRepository {
  private readonly trainings: Training[] = mockTrainingDTOs.map(TrainingMapper.fromDTO)

  async getAll(params: TrainingListParams = {}): Promise<PaginatedResult<Training>> {
    const {
      page = 1,
      pageSize = 12,
      categoryId,
      search,
      searchLanguage = 'fr',
      format,
      level,
      sortBy = 'relevance',
    } = params

    let filtered = this.trainings

    if (categoryId) {
      filtered = filtered.filter((training) => training.categoryId === categoryId)
    }

    if (format) {
      filtered = filtered.filter((training) => training.format === format)
    }

    if (level) {
      filtered = filtered.filter((training) => training.level === level)
    }

    if (search?.trim()) {
      const query = search.trim().toLowerCase()
      filtered = filtered.filter((training) => {
        const title = getLocalizedText(training.title, searchLanguage).toLowerCase()
        const summary = getLocalizedText(training.summary, searchLanguage).toLowerCase()
        return title.includes(query) || summary.includes(query)
      })
    }

    const sorted = [...filtered]
    if (sortBy === 'duration-asc') {
      sorted.sort((a, b) => a.durationHours - b.durationHours)
    } else if (sortBy === 'duration-desc') {
      sorted.sort((a, b) => b.durationHours - a.durationHours)
    }
    // 'relevance' keeps authoring order — the mock has no real relevance signal to rank by.

    const start = (page - 1) * pageSize
    const items = sorted.slice(start, start + pageSize)

    return delay({ items, total: sorted.length, page, pageSize })
  }

  async getBySlug(slug: string): Promise<Training | null> {
    const training = this.trainings.find((item) => item.slug === slug) ?? null
    return delay(training)
  }

  async getFeatured(): Promise<Training[]> {
    return delay(this.trainings.filter((training) => training.featured))
  }
}
