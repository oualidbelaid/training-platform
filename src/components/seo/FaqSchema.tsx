import { SchemaScript } from '@/components/seo/SchemaScript'
import type { SupportedLanguage } from '@/i18n'
import { faqItemsToFaqPageSchema } from '@/lib/seo/structured-data'
import type { LocalizedText } from '@/types/entities/common'

interface FaqSchemaProps {
  items: Array<{ question: LocalizedText; answer: LocalizedText }>
  language: SupportedLanguage
}

/** Works for both the standalone `Faq` entity and `Training.faq` (`TrainingFaqItem[]`) — both share this exact `{question, answer}` shape. Only renders when `items` is non-empty. */
export function FaqSchema({ items, language }: FaqSchemaProps) {
  if (items.length === 0) return null
  return <SchemaScript schema={faqItemsToFaqPageSchema(items, language)} />
}
