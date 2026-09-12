import { leadRepository } from '@/repositories/lead'
import { LeadMapper } from '@/repositories/lead/lead.mapper'
import type { Lead, LeadSubmissionResult } from '@/types/entities/lead'

/**
 * Anti-spam checkpoint (spec M5 §"Anti-spam"). `honeypot` is a hidden field
 * real users never see or fill; a bot that fills every field on the page
 * will fill it too. A filled honeypot resolves successfully **without**
 * calling the repository — indistinguishable from a real success to
 * whatever filled it in, so it doesn't learn to route around the check,
 * while nothing actually reaches "the server." This is the one place that
 * check happens, so swapping in a production anti-spam service later means
 * touching only this function.
 */
export const LeadService = {
  async submit(lead: Lead, honeypot: string): Promise<LeadSubmissionResult> {
    if (honeypot.trim().length > 0) {
      return { id: 'dropped', submittedAt: new Date().toISOString() }
    }

    const dto = LeadMapper.toDTO(lead)
    const result = await leadRepository.submit(dto)
    return LeadMapper.fromResultDTO(result)
  },
}
