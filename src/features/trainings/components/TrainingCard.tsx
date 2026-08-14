
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import type { SupportedLanguage } from '@/i18n'
import type { Training } from '@/types/entities/training'
import { getLocalizedText } from '@/utils/localized-text'

interface TrainingCardProps {
  training: Training
  categoryName?: string
  featured?: boolean
}

/**
 * Editorial training card (redesign §13). `featured` renders a dominant
 * horizontal composition (large image + generous typography); the default
 * is a compact vertical card for the supporting programs around it — the
 * two variants are visually distinct, not the same shape at different
 * sizes (spec "avoid making every program look identical").
 */
export function TrainingCard({ training, categoryName, featured = false }: TrainingCardProps) {
  const { t, i18n } = useTranslation('trainings')
  const language = i18n.language as SupportedLanguage

  if (featured) {
    return (
      <Card className="group overflow-hidden md:flex-row" hoverable>
        <div className="md:w-[45%] md:shrink-0">
          <Image src={training.image} alt="" aspectRatio="4 / 3" className="h-full md:h-full" />
        </div>
        <CardContent className="flex flex-col justify-center gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {categoryName ? <Badge variant="brand">{categoryName}</Badge> : null}
            <Badge variant="outline">{t(`format.${training.format}`)}</Badge>
          </div>

          <h3 className="text-h2 font-extrabold text-foreground">{getLocalizedText(training.title, language)}</h3>
          <p className="max-w-lg text-body text-foreground-muted">
            {getLocalizedText(training.summary, language)}
          </p>

          <div className="mt-2 flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="flex items-center gap-1.5 text-small text-foreground-faint">
              <Icon name="clock" aria-hidden="true" className="text-base" />
              {t('duration', { count: training.durationHours })}
            </span>
            <a
              href={`/trainings/${training.slug}`}
              className="inline-flex items-center gap-1.5 text-small font-semibold text-brand"
            >
              {t('viewDetails')}
              <Icon
                name="arrow-right"
                aria-hidden="true"
                className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </a>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group h-full overflow-hidden" hoverable>
      <Image src={training.image} alt="" aspectRatio="16 / 10" />

      <CardContent className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center gap-2">
          {categoryName ? <Badge variant="brand">{categoryName}</Badge> : null}
          <Badge variant="outline">{t(`format.${training.format}`)}</Badge>
        </div>

        <h3 className="text-h3 font-semibold text-foreground">{getLocalizedText(training.title, language)}</h3>
        <p className="text-small text-foreground-muted">{getLocalizedText(training.summary, language)}</p>

        <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
          <span className="flex items-center gap-1.5 text-small text-foreground-faint">
            <Icon name="clock" aria-hidden="true" className="text-base" />
            {t('duration', { count: training.durationHours })}
          </span>
          <a
            href={`/trainings/${training.slug}`}
            className="inline-flex items-center gap-1 text-small font-semibold text-brand"
          >
            {t('viewDetails')}
            <Icon
              name="arrow-right"
              aria-hidden="true"
              className="text-sm transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
            />
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
