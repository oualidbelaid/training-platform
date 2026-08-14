import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Image } from '@/components/ui/Image'
import type { SupportedLanguage } from '@/i18n'
import type { Event } from '@/types/entities/event'
import { formatDate, formatEventDay, formatEventMonth } from '@/utils/format-date'
import { getLocalizedText } from '@/utils/localized-text'

interface EventPreviewCardProps {
  event: Event
  language: SupportedLanguage
  variant?: 'featured' | 'compact'
}

/**
 * Featured/compact split (redesign §20) so three events don't render as
 * identical cards: the featured event gets an image (if the mock provides
 * one) and a large day/month date block; supporting events stay compact.
 */
export function EventPreviewCard({ event, language, variant = 'compact' }: EventPreviewCardProps) {
  const { t } = useTranslation('trainings')

  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden md:flex-row" hoverable>
        {event.image ? (
          <div className="md:w-2/5 md:shrink-0">
            <Image src={event.image} alt={t('eventImageAlt')} aspectRatio="4 / 3" className="h-full" />
          </div>
        ) : null}
        <CardContent className="flex flex-1 gap-5">
          <div className="flex shrink-0 flex-col items-center justify-center rounded-xl bg-primary-50 px-4 py-3 text-center">
            <span className="text-h2 font-extrabold leading-none text-primary-700">
              {formatEventDay(event.startDate, language)}
            </span>
            <span className="text-caption font-semibold uppercase tracking-wide text-primary-600">
              {formatEventMonth(event.startDate, language)}
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-h3 font-semibold text-foreground">{getLocalizedText(event.title, language)}</h3>
            <p className="text-body text-foreground-muted">{getLocalizedText(event.description, language)}</p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Badge variant="outline">{t(`format.${event.format}`)}</Badge>
              {event.location ? (
                <span className="text-small text-foreground-faint">{getLocalizedText(event.location, language)}</span>
              ) : null}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="h-full">
      <CardContent className="flex flex-col gap-3">
        <p className="text-small font-semibold text-brand">{formatDate(event.startDate, language)}</p>
        <h3 className="text-h3 font-medium text-foreground">{getLocalizedText(event.title, language)}</h3>
        <p className="text-body text-foreground-muted">
          {getLocalizedText(event.description, language)}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="outline">{t(`format.${event.format}`)}</Badge>
          {event.location ? (
            <span className="text-small text-foreground-faint">
              {getLocalizedText(event.location, language)}
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
