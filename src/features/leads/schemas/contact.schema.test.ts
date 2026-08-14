import { describe, expect, it } from 'vitest'
import { buildContactSchema } from './contact.schema'

const t = (key: string) => key

const validValues = {
  firstName: 'Sara',
  lastName: 'Bouzid',
  email: 'sara.bouzid@example.com',
  phone: '',
  company: '',
  jobTitle: '',
  message: '',
  subject: 'Question about corporate training',
  preferredContactMethod: 'email' as const,
  consent: true,
}

describe('buildContactSchema', () => {
  it('accepts a fully valid submission', () => {
    const result = buildContactSchema(t).safeParse(validValues)
    expect(result.success).toBe(true)
  })

  it('rejects missing required fields (first name, last name, subject)', () => {
    const result = buildContactSchema(t).safeParse({ ...validValues, firstName: '', lastName: '', subject: '' })
    expect(result.success).toBe(false)
    const paths = (result.error?.issues ?? []).map((issue) => issue.path[0])
    expect(paths).toEqual(expect.arrayContaining(['firstName', 'lastName', 'subject']))
  })

  it('rejects an invalid email address', () => {
    const result = buildContactSchema(t).safeParse({ ...validValues, email: 'not-an-email' })
    expect(result.success).toBe(false)
    expect((result.error?.issues ?? []).some((issue) => issue.path[0] === 'email')).toBe(true)
  })

  it('requires consent to be explicitly true', () => {
    const result = buildContactSchema(t).safeParse({ ...validValues, consent: false })
    expect(result.success).toBe(false)
    expect((result.error?.issues ?? []).some((issue) => issue.path[0] === 'consent')).toBe(true)
  })

  it('never preselects consent — default form state has it unchecked', () => {
    // This is enforced at the page level (`consent: false` in useForm defaultValues),
    // this test documents the schema-level contract that makes that meaningful.
    const result = buildContactSchema(t).safeParse({ ...validValues, consent: undefined })
    expect(result.success).toBe(false)
  })
})
