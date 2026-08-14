import type { LeadRequestDTO, LeadSubmissionResultDTO } from '@/types/dto/lead.dto'
import type { LeadRepository } from './lead.repository'

const SIMULATED_LATENCY_MS = 600

function delay<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), SIMULATED_LATENCY_MS))
}

function fail<T>(): Promise<T> {
  return new Promise((_resolve, reject) => setTimeout(() => reject(new Error('Simulated submission failure')), SIMULATED_LATENCY_MS))
}

/**
 * Deterministic QA/test hook — submitting with this exact email simulates a
 * server-side failure so the error UI (retry, data retained) can be
 * exercised on demand, without making the mock randomly (and confusingly)
 * fail for real demo/portfolio visitors.
 */
export const SIMULATE_FAILURE_EMAIL = 'fail@istam-test.com'

/**
 * Mock lead submission (M5). Ready to be swapped for a real API-backed
 * repository behind the same `LeadRepository` interface — the Dolibarr
 * integration milestone (M12) only needs to add a new implementation and
 * flip the factory in `index.ts`, exactly like every other domain.
 */
export class MockLeadRepository implements LeadRepository {
  async submit(dto: LeadRequestDTO): Promise<LeadSubmissionResultDTO> {
    if (dto.email.trim().toLowerCase() === SIMULATE_FAILURE_EMAIL) {
      return fail<LeadSubmissionResultDTO>()
    }

    return delay({
      id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
      submitted_at: new Date().toISOString(),
    })
  }
}
