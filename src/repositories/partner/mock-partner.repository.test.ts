import { describe, expect, it } from 'vitest'
import { MockPartnerRepository } from './mock-partner.repository'

describe('MockPartnerRepository', () => {
  it('returns partners mapped to the domain entity shape', async () => {
    const repository = new MockPartnerRepository()
    const partners = await repository.getAll()

    expect(partners.length).toBeGreaterThan(0)
    expect(partners[0]).toHaveProperty('description.fr')
    expect(partners[0]).toHaveProperty('description.en')
    expect(partners[0]).toHaveProperty('description.ar')
  })
})
