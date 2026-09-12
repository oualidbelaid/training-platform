import { describe, expect, it } from 'vitest'
import type { ArticleDTO } from '@/types/dto/article.dto'
import { ArticleMapper } from './article.mapper'

const dto: ArticleDTO = {
  id: 'art-test',
  slug: 'test-article',
  title_fr: 'Titre FR',
  title_en: 'Title EN',
  title_ar: 'عنوان',
  excerpt_fr: 'Extrait FR',
  excerpt_en: 'Excerpt EN',
  excerpt_ar: 'مقتطف',
  content_fr: 'Contenu FR',
  content_en: 'Content EN',
  content_ar: 'محتوى',
  category_fr: 'Catégorie FR',
  category_en: 'Category EN',
  category_ar: 'فئة',
  author_name: 'Test Author',
  published_date: '2026-01-10',
  reading_time_minutes: 5,
  image_url: '/images/test-article.svg',
  is_featured: true,
}

describe('ArticleMapper.fromDTO', () => {
  it('maps a raw DTO to the canonical domain entity', () => {
    expect(ArticleMapper.fromDTO(dto)).toEqual({
      id: 'art-test',
      slug: 'test-article',
      title: { fr: 'Titre FR', en: 'Title EN', ar: 'عنوان' },
      excerpt: { fr: 'Extrait FR', en: 'Excerpt EN', ar: 'مقتطف' },
      content: { fr: 'Contenu FR', en: 'Content EN', ar: 'محتوى' },
      category: { fr: 'Catégorie FR', en: 'Category EN', ar: 'فئة' },
      authorName: 'Test Author',
      publishedDate: '2026-01-10',
      readingTimeMinutes: 5,
      image: '/images/test-article.svg',
      featured: true,
    })
  })
})
