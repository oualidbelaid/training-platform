import type { LeadRequestDTO, LeadSubmissionResultDTO } from '@/types/dto/lead.dto'

export interface LeadRepository {
  submit(dto: LeadRequestDTO): Promise<LeadSubmissionResultDTO>
}
