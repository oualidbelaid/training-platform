import { describe, expect, it } from 'vitest'
import { MockEventRepository } from './mock-event.repository'

describe('MockEventRepository', () => {
  it('getUpcoming excludes events dated before today', async () => {
    const repository = new MockEventRepository()
    const upcoming = await repository.getUpcoming()
    const today = new Date().toISOString().slice(0, 10)

    expect(upcoming.length).toBeGreaterThan(0)
    expect(upcoming.every((event) => event.startDate >= today)).toBe(true)
  })

  it('getAll returns every event, past and future, sorted most-recent-first', async () => {
    const repository = new MockEventRepository()
    const [all, upcoming] = await Promise.all([repository.getAll(), repository.getUpcoming()])

    expect(all.length).toBeGreaterThan(upcoming.length)
    const dates = all.map((event) => event.startDate)
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)))
  })
})
