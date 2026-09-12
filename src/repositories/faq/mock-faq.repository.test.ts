import { describe, expect, it } from 'vitest'
import { MockFaqRepository } from './mock-faq.repository'

describe('MockFaqRepository', () => {
  it('returns FAQs grouped across multiple category keys', async () => {
    const repository = new MockFaqRepository()
    const faqs = await repository.getAll()

    expect(faqs.length).toBeGreaterThan(0)
    const categoryKeys = new Set(faqs.map((faq) => faq.categoryKey))
    expect(categoryKeys.size).toBeGreaterThan(1)
  })
})
