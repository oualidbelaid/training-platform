import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Divider } from '@/components/ui/Divider'
import type { SupportedLanguage } from '@/i18n'
import type { SuccessStory } from '@/types/entities/success-story'
import { getLocalizedText } from '@/utils/localized-text'

interface SuccessStoryCardProps {
  story: SuccessStory
  language: SupportedLanguage
}

/**
 * Case-study card (spec §16): client/industry, then challenge → approach as
 * labeled paragraphs (plain headings, not `<dl>`/`<dt>`/`<dd>` — a prior
 * accessibility pass on `TrainingDetailsPage` found that pairing redundant
 * enough to replace with plain markup, so new cards follow that precedent
 * directly), then a row of result stat highlights.
 */
export function SuccessStoryCard({ story, language }: SuccessStoryCardProps) {
  const { t } = useTranslation('successStories')

  return (
    <Card className="h-full" hoverable={false}>
      <CardContent className="flex h-full flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <Badge variant="outline" className="w-fit">
            {getLocalizedText(story.industry, language)}
          </Badge>
          <p className="text-h3 font-semibold text-foreground">{story.clientName}</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">{t('card.challenge')}</p>
            <p className="mt-1 text-body text-foreground-muted">{getLocalizedText(story.challenge, language)}</p>
          </div>
          <div>
            <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">{t('card.approach')}</p>
            <p className="mt-1 text-body text-foreground-muted">{getLocalizedText(story.approach, language)}</p>
          </div>
        </div>

        <Divider className="mt-auto" />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {story.results.map((result, index) => (
            <div key={index}>
              <p className="text-h3 font-extrabold text-brand">{result.value}</p>
              <p className="text-caption text-foreground-muted">{getLocalizedText(result.label, language)}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
