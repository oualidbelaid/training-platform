import { SchemaScript } from '@/components/seo/SchemaScript'
import type { SupportedLanguage } from '@/i18n'
import { trainingToCourseSchema } from '@/lib/seo/structured-data'
import type { Training } from '@/types/entities/training'

interface CourseSchemaProps {
  training: Training
  language: SupportedLanguage
}

export function CourseSchema({ training, language }: CourseSchemaProps) {
  return <SchemaScript schema={trainingToCourseSchema(training, language)} />
}
