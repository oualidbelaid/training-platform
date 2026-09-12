import { SchemaScript } from '@/components/seo/SchemaScript'
import type { SupportedLanguage } from '@/i18n'
import { eventToEventSchema } from '@/lib/seo/structured-data'
import type { Event } from '@/types/entities/event'

interface EventSchemaProps {
  event: Event
  language: SupportedLanguage
}

/** One `Event` schema per event — render once per item in a list (e.g. `EventsPage`'s upcoming events). */
export function EventSchema({ event, language }: EventSchemaProps) {
  return <SchemaScript schema={eventToEventSchema(event, language)} />
}
