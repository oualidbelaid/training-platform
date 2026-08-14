import { describe, expect, it } from 'vitest'
import { MockArticleRepository } from './mock-article.repository'

describe('MockArticleRepository', () => {
  it('returns articles sorted most-recent-first', async () => {
    const repository = new MockArticleRepository()
    const articles = await repository.getAll()

    expect(articles.length).toBeGreaterThan(0)
    const dates = articles.map((article) => article.publishedDate)
    expect(dates).toEqual([...dates].sort((a, b) => b.localeCompare(a)))
  })

  it('resolves a single article by slug', async () => {
    const repository = new MockArticleRepository()
    const { slug, id } = (await repository.getAll())[0]!

    const article = await repository.getBySlug(slug)
    expect(article?.id).toBe(id)
  })

  it('returns null for an unknown slug', async () => {
    const repository = new MockArticleRepository()
    const article = await repository.getBySlug('does-not-exist')
    expect(article).toBeNull()
  })
})
