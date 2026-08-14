import { describe, expect, it } from 'vitest'
import { seoConfig } from '@/config/seo.config'
import type { Article } from '@/types/entities/article'
import type { Event } from '@/types/entities/event'
import type { Training } from '@/types/entities/training'
import {
  articleToArticleSchema,
  breadcrumbToSchema,
  eventToEventSchema,
  faqItemsToFaqPageSchema,
  trainingToCourseSchema,
} from './structured-data'

const training: Training = {
  id: 'trn-1',
  slug: 'leadership-101',
  title: { fr: 'Leadership 101', en: 'Leadership 101', ar: 'القيادة 101' },
  summary: { fr: 'Résumé', en: 'Summary', ar: 'ملخص' },
  description: { fr: 'Description', en: 'Description', ar: 'وصف' },
  objectives: [],
  targetAudience: [],
  prerequisites: [],
  program: [],
  methodology: { fr: '', en: '', ar: '' },
  faq: [{ question: { fr: 'Q', en: 'Q', ar: 'س' }, answer: { fr: 'R', en: 'A', ar: 'ج' } }],
  sessions: [
    { startDate: '2026-03-10', location: { fr: 'Paris', en: 'Paris', ar: 'باريس' } },
    { startDate: '2026-05-12' },
  ],
  format: 'hybrid',
  level: 'intermediate',
  durationHours: 14,
  categoryId: 'cat-1',
  trainerIds: ['trn-2'],
  featured: true,
  image: '/images/trainings/leadership-101.webp',
}

const article: Article = {
  id: 'art-1',
  slug: 'future-of-leadership',
  title: { fr: 'Titre', en: 'The Future of Leadership', ar: 'عنوان' },
  excerpt: { fr: 'Extrait', en: 'A short excerpt', ar: 'مقتطف' },
  content: { fr: '', en: '', ar: '' },
  category: { fr: '', en: '', ar: '' },
  authorName: 'Jane Doe',
  publishedDate: '2026-02-01',
  readingTimeMinutes: 6,
  image: '/images/articles/future-of-leadership.webp',
  featured: false,
}

const onsiteEvent: Event = {
  id: 'evt-1',
  slug: 'open-house-2026',
  title: { fr: 'Portes ouvertes', en: 'Open House', ar: 'يوم مفتوح' },
  description: { fr: 'Description', en: 'Description', ar: 'وصف' },
  startDate: '2026-04-05',
  format: 'in-person',
  location: { fr: 'Casablanca', en: 'Casablanca', ar: 'الدار البيضاء' },
  image: '/images/events/open-house-2026.webp',
}

const onlineEvent: Event = {
  id: 'evt-2',
  slug: 'webinar-2026',
  title: { fr: 'Webinaire', en: 'Webinar', ar: 'ندوة عبر الإنترنت' },
  description: { fr: 'Description', en: 'Description', ar: 'وصف' },
  startDate: '2026-06-15',
  format: 'online',
}

describe('trainingToCourseSchema', () => {
  it('maps a training entity to a schema.org Course', () => {
    const schema = trainingToCourseSchema(training, 'en')

    expect(schema['@type']).toBe('Course')
    expect(schema.name).toBe('Leadership 101')
    expect(schema.description).toBe('Summary')
    expect(schema.url).toBe(`${seoConfig.siteUrl}/trainings/leadership-101`)
    expect(schema.provider).toMatchObject({ '@type': 'Organization', name: seoConfig.siteName })
  })

  it('maps each session to a CourseInstance with the training format as courseMode', () => {
    const schema = trainingToCourseSchema(training, 'en')

    expect(schema.hasCourseInstance).toHaveLength(2)
    expect(schema.hasCourseInstance?.[0]).toMatchObject({
      '@type': 'CourseInstance',
      courseMode: 'Blended',
      startDate: '2026-03-10',
      location: { '@type': 'Place', name: 'Paris' },
    })
    expect(schema.hasCourseInstance?.[1]).not.toHaveProperty('location')
  })

  it('omits hasCourseInstance entirely when a training has no scheduled sessions', () => {
    const schema = trainingToCourseSchema({ ...training, sessions: [] }, 'en')

    expect(schema).not.toHaveProperty('hasCourseInstance')
  })
})

describe('articleToArticleSchema', () => {
  it('maps an article entity to a schema.org Article', () => {
    const schema = articleToArticleSchema(article, 'en')

    expect(schema['@type']).toBe('Article')
    expect(schema.headline).toBe('The Future of Leadership')
    expect(schema.description).toBe('A short excerpt')
    expect(schema.image).toBe(`${seoConfig.siteUrl}/images/articles/future-of-leadership.webp`)
    expect(schema.author).toEqual({ '@type': 'Person', name: 'Jane Doe' })
    expect(schema.mainEntityOfPage).toEqual({
      '@type': 'WebPage',
      '@id': `${seoConfig.siteUrl}/resources/future-of-leadership`,
    })
  })
})

describe('eventToEventSchema', () => {
  it('maps an in-person event to an offline attendance mode with a Place location', () => {
    const schema = eventToEventSchema(onsiteEvent, 'en')

    expect(schema['@type']).toBe('Event')
    expect(schema.eventAttendanceMode).toBe('https://schema.org/OfflineEventAttendanceMode')
    expect(schema.location).toEqual({ '@type': 'Place', name: 'Casablanca' })
  })

  it('maps an online event to an online attendance mode with a VirtualLocation', () => {
    const schema = eventToEventSchema(onlineEvent, 'en')

    expect(schema.eventAttendanceMode).toBe('https://schema.org/OnlineEventAttendanceMode')
    expect(schema.location).toEqual({ '@type': 'VirtualLocation', url: seoConfig.siteUrl })
  })

  it('falls back to the default OG image when an event has no image of its own', () => {
    const schema = eventToEventSchema(onlineEvent, 'en')

    expect(schema.image).toBe(`${seoConfig.siteUrl}${seoConfig.defaultOgImage}`)
  })
})

describe('faqItemsToFaqPageSchema', () => {
  it('maps a list of question/answer pairs to a schema.org FAQPage', () => {
    const schema = faqItemsToFaqPageSchema(training.faq, 'en')

    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toEqual([
      { '@type': 'Question', name: 'Q', acceptedAnswer: { '@type': 'Answer', text: 'A' } },
    ])
  })
})

describe('breadcrumbToSchema', () => {
  it('maps breadcrumb items to a schema.org BreadcrumbList with 1-based positions', () => {
    const schema = breadcrumbToSchema([{ label: 'Home', href: '/' }, { label: 'Trainings', href: '/trainings' }, { label: 'Leadership 101' }])

    expect(schema['@type']).toBe('BreadcrumbList')
    expect(schema.itemListElement).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${seoConfig.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name: 'Trainings', item: `${seoConfig.siteUrl}/trainings` },
      { '@type': 'ListItem', position: 3, name: 'Leadership 101' },
    ])
  })
})
