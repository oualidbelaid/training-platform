import { SchemaScript } from '@/components/seo/SchemaScript'
import type { SupportedLanguage } from '@/i18n'
import { articleToArticleSchema } from '@/lib/seo/structured-data'
import type { Article } from '@/types/entities/article'

interface ArticleSchemaProps {
  article: Article
  language: SupportedLanguage
}

export function ArticleSchema({ article, language }: ArticleSchemaProps) {
  return <SchemaScript schema={articleToArticleSchema(article, language)} />
}
