import { describe, expect, it } from 'vitest'
import type { LeadRequestDTO } from '@/types/dto/lead.dto'
import { MockLeadRepository, SIMULATE_FAILURE_EMAIL } from './mock-lead.repository'

function makeDto(overrides: Partial<LeadRequestDTO> = {}): LeadRequestDTO {
  return {
    form_type: 'contact',
    first_name: 'Sara',
    last_name: 'Bouzid',
    email: 'sara.bouzid@example.com',
    subject: 'Question about corporate training',
    consent: true,
    ...overrides,
  }
}

describe('MockLeadRepository', () => {
  it('resolves with a generated id and timestamp on success', async () => {
    const repository = new MockLeadRepository()
    const result = await repository.submit(makeDto())

    expect(result.id).toMatch(/^lead-/)
    expect(new Date(result.submitted_at).toString()).not.toBe('Invalid Date')
  })

  it('rejects when submitted with the deterministic QA failure email', async () => {
    const repository = new MockLeadRepository()
    await expect(repository.submit(makeDto({ email: SIMULATE_FAILURE_EMAIL }))).rejects.toThrow(
      'Simulated submission failure',
    )
  })

  it('is case-insensitive when matching the QA failure email', async () => {
    const repository = new MockLeadRepository()
    await expect(
      repository.submit(makeDto({ email: SIMULATE_FAILURE_EMAIL.toUpperCase() })),
    ).rejects.toThrow('Simulated submission failure')
  })
})
