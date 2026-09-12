import type { LeadRequestDTO, LeadSubmissionResultDTO } from '@/types/dto/lead.dto'
import type { Lead, LeadSubmissionResult } from '@/types/entities/lead'

export const LeadMapper = {
  toDTO(lead: Lead): LeadRequestDTO {
    return {
      form_type: lead.formType,
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      job_title: lead.jobTitle,
      training_id: lead.trainingId,
      subject: lead.subject,
      preferred_contact_method: lead.preferredContactMethod,
      participants_count: lead.participantsCount,
      preferred_format: lead.preferredFormat,
      preferred_date: lead.preferredDate,
      location: lead.location,
      training_needs: lead.trainingNeeds,
      areas_of_interest: lead.areasOfInterest,
      message: lead.message,
      consent: lead.consent,
    }
  },
  fromResultDTO(dto: LeadSubmissionResultDTO): LeadSubmissionResult {
    return {
      id: dto.id,
      submittedAt: dto.submitted_at,
    }
  },
}
