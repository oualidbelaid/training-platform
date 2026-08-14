import { describe, expect, it } from 'vitest'
import { MockTrainingRepository } from './mock-training.repository'

describe('MockTrainingRepository', () => {
  it('returns paginated trainings mapped to the domain entity shape', async () => {
    const repository = new MockTrainingRepository()
    const result = await repository.getAll()

    expect(result.total).toBeGreaterThan(0)
    expect(result.items[0]).toHaveProperty('title.fr')
    expect(result.items[0]).toHaveProperty('title.en')
    expect(result.items[0]).toHaveProperty('title.ar')
  })

  it('resolves a single training by slug', async () => {
    const repository = new MockTrainingRepository()
    const { items } = await repository.getAll()
    const first = items[0]
    expect(first).toBeDefined()

    const training = await repository.getBySlug(first!.slug)
    expect(training?.id).toBe(first!.id)
  })

  it('returns null for an unknown slug', async () => {
    const repository = new MockTrainingRepository()
    const training = await repository.getBySlug('does-not-exist')
    expect(training).toBeNull()
  })

  it('returns only featured trainings from getFeatured', async () => {
    const repository = new MockTrainingRepository()
    const featured = await repository.getFeatured()
    expect(featured.length).toBeGreaterThan(0)
    expect(featured.every((training) => training.featured)).toBe(true)
  })

  it('filters by category', async () => {
    const repository = new MockTrainingRepository()
    const { items } = await repository.getAll()
    const categoryId = items[0]!.categoryId

    const result = await repository.getAll({ categoryId })
    expect(result.items.length).toBeGreaterThan(0)
    expect(result.items.every((training) => training.categoryId === categoryId)).toBe(true)
  })

  it('filters by format and level', async () => {
    const repository = new MockTrainingRepository()

    const online = await repository.getAll({ format: 'online' })
    expect(online.items.every((training) => training.format === 'online')).toBe(true)

    const advanced = await repository.getAll({ level: 'advanced' })
    expect(advanced.items.every((training) => training.level === 'advanced')).toBe(true)
  })

  it('searches by title in the requested language, case-insensitively', async () => {
    const repository = new MockTrainingRepository()

    const frResult = await repository.getAll({ search: 'LEADERSHIP', searchLanguage: 'fr' })
    expect(frResult.items.some((training) => training.slug === 'leadership-nouveaux-managers')).toBe(true)

    const noMatch = await repository.getAll({ search: 'zzzznotfound', searchLanguage: 'fr' })
    expect(noMatch.items).toHaveLength(0)
    expect(noMatch.total).toBe(0)
  })

  it('sorts by duration ascending and descending', async () => {
    const repository = new MockTrainingRepository()

    const ascending = await repository.getAll({ sortBy: 'duration-asc', pageSize: 100 })
    const ascendingDurations = ascending.items.map((training) => training.durationHours)
    expect(ascendingDurations).toEqual([...ascendingDurations].sort((a, b) => a - b))

    const descending = await repository.getAll({ sortBy: 'duration-desc', pageSize: 100 })
    const descendingDurations = descending.items.map((training) => training.durationHours)
    expect(descendingDurations).toEqual([...descendingDurations].sort((a, b) => b - a))
  })

  it('paginates results', async () => {
    const repository = new MockTrainingRepository()
    const all = await repository.getAll({ pageSize: 100 })

    const firstPage = await repository.getAll({ page: 1, pageSize: 2 })
    expect(firstPage.items).toHaveLength(2)
    expect(firstPage.total).toBe(all.total)

    const secondPage = await repository.getAll({ page: 2, pageSize: 2 })
    expect(secondPage.items[0]?.id).not.toBe(firstPage.items[0]?.id)
  })
})
