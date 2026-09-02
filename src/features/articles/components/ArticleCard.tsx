import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { Link } from '@/components/ui/Link'
import type { SupportedLanguage } from '@/i18n'
import type { Article } from '@/types/entities/article'
import { formatDate } from '@/utils/format-date'
import { getLocalizedText } from '@/utils/localized-text'

interface ArticleCardProps {
  article: Article
  language: SupportedLanguage
  variant?: 'featured' | 'compact'
}

/**
 * Resources/Articles grid card (spec §7). `featured` mirrors `TrainingCard`/
 * `EventPreviewCard`'s dominant-treatment pattern (larger image, bigger
 * type) for the single most recent article; `compact` is the standard grid
 * card. The whole card links to `/resources/:slug`.
 */
export function ArticleCard({ article, language, variant = 'compact' }: ArticleCardProps) {
  const { t } = useTranslation('resources')
  const meta = `${article.authorName} · ${formatDate(article.publishedDate, language)} · ${t('readingTime', { count: article.readingTimeMinutes })}`

  if (variant === 'featured') {
    return (
      <Card className="group overflow-hidden md:flex-row" hoverable>
        <div className="md:w-1/2 md:shrink-0">
          <Image src={article.image} alt="" aspectRatio="16 / 10" className="h-full" />
        </div>
        <CardContent className="flex flex-1 flex-col justify-center gap-3">
          <Badge variant="brand" className="w-fit">
            {getLocalizedText(article.category, language)}
          </Badge>
          <Link href={`/resources/${article.slug}`} variant="subtle" className="no-underline">
            <h3 className="text-h2 font-bold text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
              {getLocalizedText(article.title, language)}
            </h3>
          </Link>
          <p className="text-body text-foreground-muted">
            {getLocalizedText(article.excerpt, language)}
          </p>
          <p className="text-small text-foreground-faint">{meta}</p>
          <Link
            href={`/resources/${article.slug}`}
            variant="default"
            className="mt-1 inline-flex w-fit items-center gap-2 no-underline"
          >
            {t('readArticle')}
            <Icon name="arrow-right" aria-hidden="true" className="text-sm rtl:rotate-180" />
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group h-full overflow-hidden" hoverable>
      <Image src={article.image} alt="" aspectRatio="16 / 10" />
      <CardContent className="flex h-full flex-col gap-3">
        <Badge variant="brand" className="w-fit">
          {getLocalizedText(article.category, language)}
        </Badge>
        <Link href={`/resources/${article.slug}`} variant="subtle" className="no-underline">
          <h3 className="text-h3 font-semibold text-foreground transition-colors duration-(--duration-fast) group-hover:text-brand">
            {getLocalizedText(article.title, language)}
          </h3>
        </Link>
        <p className="flex-1 text-body text-foreground-muted">
          {getLocalizedText(article.excerpt, language)}
        </p>
        <p className="text-caption text-foreground-faint">{meta}</p>
      </CardContent>
    </Card>
  )
}
