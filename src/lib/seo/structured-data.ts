import type { BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { BRAND } from '@/config/brand'
import { seoConfig } from '@/config/seo.config'
import type { SupportedLanguage } from '@/i18n'
import type { Article } from '@/types/entities/article'
import type { LocalizedText, TrainingFormat } from '@/types/entities/common'
import type { Event } from '@/types/entities/event'
import type { Training } from '@/types/entities/training'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * Structured-data mappers (spec M7 §3/§14). Every function here takes the
 * same domain **entity** every page already consumes via its hook/service
 * — never a DTO, never a direct mock-data import — so when the Mock
 * repositories are eventually replaced with Dolibarr-backed ones (M12),
 * this file needs zero changes: the entity shape is the stable contract,
 * exactly like every other mapper in the app (`ARCHITECTURE.md`).
 */

function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${seoConfig.siteUrl}${path}`
}

const ORGANIZATION_REF = {
  '@type': 'Organization',
  name: seoConfig.siteName,
  url: seoConfig.siteUrl,
  logo: absoluteUrl(BRAND.logo),
} as const

const COURSE_MODE: Record<TrainingFormat, string> = {
  'in-person': 'Onsite',
  online: 'Online',
  hybrid: 'Blended',
}

export function trainingToCourseSchema(training: Training, language: SupportedLanguage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: getLocalizedText(training.title, language),
    description: getLocalizedText(training.summary, language),
    url: absoluteUrl(`/trainings/${training.slug}`),
    provider: ORGANIZATION_REF,
    ...(training.sessions.length > 0
      ? {
          hasCourseInstance: training.sessions.map((session) => ({
            '@type': 'CourseInstance',
            courseMode: COURSE_MODE[training.format],
            startDate: session.startDate,
            ...(session.location
              ? { location: { '@type': 'Place', name: getLocalizedText(session.location, language) } }
              : {}),
          })),
        }
      : {}),
  }
}

export function articleToArticleSchema(article: Article, language: SupportedLanguage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: getLocalizedText(article.title, language),
    description: getLocalizedText(article.excerpt, language),
    image: absoluteUrl(article.image),
    datePublished: article.publishedDate,
    author: { '@type': 'Person', name: article.authorName },
    publisher: ORGANIZATION_REF,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/resources/${article.slug}`) },
  }
}

const ATTENDANCE_MODE: Record<TrainingFormat, string> = {
  'in-person': 'https://schema.org/OfflineEventAttendanceMode',
  online: 'https://schema.org/OnlineEventAttendanceMode',
  hybrid: 'https://schema.org/MixedEventAttendanceMode',
}

export function eventToEventSchema(event: Event, language: SupportedLanguage) {
  const location =
    event.format === 'online'
      ? { '@type': 'VirtualLocation', url: seoConfig.siteUrl }
      : { '@type': 'Place', name: event.location ? getLocalizedText(event.location, language) : seoConfig.siteName }

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: getLocalizedText(event.title, language),
    description: getLocalizedText(event.description, language),
    startDate: event.startDate,
    eventAttendanceMode: ATTENDANCE_MODE[event.format],
    eventStatus: 'https://schema.org/EventScheduled',
    location,
    image: absoluteUrl(event.image ?? seoConfig.defaultOgImage),
    organizer: { '@type': 'Organization', name: seoConfig.siteName, url: seoConfig.siteUrl },
  }
}

/**
 * Takes any `{question, answer}` LocalizedText pair list — the standalone
 * `Faq` entity and `Training.faq` (`TrainingFaqItem[]`) are structurally
 * identical on exactly these two fields, so one mapper covers both the
 * dedicated FAQ page and each training's own FAQ section.
 */
export function faqItemsToFaqPageSchema(
  items: Array<{ question: LocalizedText; answer: LocalizedText }>,
  language: SupportedLanguage,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: getLocalizedText(item.question, language),
      acceptedAnswer: { '@type': 'Answer', text: getLocalizedText(item.answer, language) },
    })),
  }
}

export function breadcrumbToSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  }
}
