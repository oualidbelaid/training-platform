import { describe, expect, it } from 'vitest'
import type { Lead } from '@/types/entities/lead'
import { LeadMapper } from './lead.mapper'

const lead: Lead = {
  formType: 'consultation',
  firstName: 'Amine',
  lastName: 'Kaci',
  email: 'amine.kaci@example.com',
  phone: '+213 555 00 11',
  company: 'Test Corp',
  jobTitle: 'HR Director',
  trainingNeeds: 'Leadership for new managers',
  participantsCount: 12,
  areasOfInterest: 'Leadership, Communication',
  preferredContactMethod: 'email',
  message: 'We would like to discuss our Q3 training plan.',
  consent: true,
}

describe('LeadMapper.toDTO', () => {
  it('maps a Lead entity to the outbound snake_case request DTO', () => {
    expect(LeadMapper.toDTO(lead)).toEqual({
      form_type: 'consultation',
      first_name: 'Amine',
      last_name: 'Kaci',
      email: 'amine.kaci@example.com',
      phone: '+213 555 00 11',
      company: 'Test Corp',
      job_title: 'HR Director',
      training_id: undefined,
      subject: undefined,
      preferred_contact_method: 'email',
      participants_count: 12,
      preferred_format: undefined,
      preferred_date: undefined,
      location: undefined,
      training_needs: 'Leadership for new managers',
      areas_of_interest: 'Leadership, Communication',
      message: 'We would like to discuss our Q3 training plan.',
      consent: true,
    })
  })
})

describe('LeadMapper.fromResultDTO', () => {
  it('maps the submission result DTO to the domain shape', () => {
    expect(
      LeadMapper.fromResultDTO({ id: 'lead-123', submitted_at: '2026-01-10T10:00:00.000Z' }),
    ).toEqual({
      id: 'lead-123',
      submittedAt: '2026-01-10T10:00:00.000Z',
    })
  })
})
