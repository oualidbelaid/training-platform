import type { BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { SchemaScript } from '@/components/seo/SchemaScript'
import { breadcrumbToSchema } from '@/lib/seo/structured-data'

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/** Takes the exact same `items` a page already passes to the `Breadcrumb` UI component — one line to add wherever that's already rendered. */
export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  return <SchemaScript schema={breadcrumbToSchema(items)} />
}
