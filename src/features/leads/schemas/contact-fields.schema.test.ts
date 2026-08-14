import { z } from 'zod'
import { describe, expect, it } from 'vitest'
import { buildContactFieldsSchema, optionalEnum } from './contact-fields.schema'

const t = (key: string) => key

describe('buildContactFieldsSchema', () => {
  it('accepts a valid minimal submission', () => {
    const result = buildContactFieldsSchema(t).safeParse({
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'sophie.martin@example.com',
    })

    expect(result.success).toBe(true)
  })

  it('rejects an invalid email', () => {
    const result = buildContactFieldsSchema(t).safeParse({
      firstName: 'Sophie',
      lastName: 'Martin',
      email: 'not-an-email',
    })

    expect(result.success).toBe(false)
  })

  it('rejects a first name that is too short', () => {
    const result = buildContactFieldsSchema(t).safeParse({
      firstName: 'S',
      lastName: 'Martin',
      email: 'sophie.martin@example.com',
    })

    expect(result.success).toBe(false)
  })
})

describe('optionalEnum', () => {
  const schema = z.object({ choice: optionalEnum(['email', 'phone']) })

  it('accepts a real selected value', () => {
    expect(schema.safeParse({ choice: 'email' }).success).toBe(true)
  })

  it('accepts undefined (the field was never registered/touched)', () => {
    expect(schema.safeParse({ choice: undefined }).success).toBe(true)
  })

  it('accepts an empty string (an unselected native <select>)', () => {
    expect(schema.safeParse({ choice: '' }).success).toBe(true)
  })

  it('accepts null (React Hook Form\'s read of an unchecked RadioGroup with no matching defaultValues entry — regression test: this exact case silently broke every optional radio/select field across all 5 lead forms, since it\'s the default, most common state)', () => {
    expect(schema.safeParse({ choice: null }).success).toBe(true)
  })

  it('still rejects a genuinely invalid value', () => {
    expect(schema.safeParse({ choice: 'fax' }).success).toBe(false)
  })
})
