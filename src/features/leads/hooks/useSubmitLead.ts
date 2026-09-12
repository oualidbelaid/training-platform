import { useMutation } from '@tanstack/react-query'
import { LeadService } from '@/services/lead.service'
import type { Lead } from '@/types/entities/lead'

interface SubmitLeadInput {
  lead: Lead
  /** Hidden honeypot field's current value — see `LeadService.submit`. */
  honeypot: string
}

/** Shared submission mutation for all 5 lead forms — the only place the loading/success/error state machine is implemented. */
export function useSubmitLead() {
  return useMutation({
    mutationFn: ({ lead, honeypot }: SubmitLeadInput) => LeadService.submit(lead, honeypot),
  })
}
