import { Avatar } from '@/components/ui/Avatar'
import { Card, CardContent } from '@/components/ui/Card'
import { MEDIA } from '@/config/media'
import type { SupportedLanguage } from '@/i18n'
import type { Testimonial } from '@/types/entities/testimonial'
import { getLocalizedText } from '@/utils/localized-text'

interface TestimonialCardProps {
  testimonial: Testimonial
  language: SupportedLanguage
  /**
   * `featured` — large pull-quote panel (Home's `TestimonialsSection` only).
   * `compact` — the original card, used standalone on `TestimonialsPage`'s
   * 3-column grid — untouched, so that page's layout is unaffected.
   * `compact-dense` — a tighter version of `compact` (smaller quote text,
   * reduced padding/gap) used only for the 2-column supporting-testimonial
   * grid next to the featured card, so that grid doesn't unbalance the
   * section's height — kept as its own variant rather than changing
   * `compact` itself, precisely to leave `TestimonialsPage` unchanged.
   */
  variant?: 'featured' | 'compact' | 'compact-dense'
}

/**
 * "A real client story, not a card grid" (redesign §19). `featured` is a
 * large pull-quote panel with an oversized quotation mark and a decorative
 * background texture (MEDIA.testimonial — presentation only, not tied to
 * any one author, same reasoning as category-visuals.ts); `compact` keeps
 * the original small card for the supporting testimonials beside it.
 */
export function TestimonialCard({
  testimonial,
  language,
  variant = 'compact',
}: TestimonialCardProps) {
  if (variant === 'featured') {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface p-7 shadow-md sm:p-9">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${MEDIA.testimonial})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative flex h-full flex-col gap-6">
          <span aria-hidden="true" className="font-display text-h1 leading-none text-primary-300">
            “
          </span>
          <p className="max-w-2xl text-h3 font-medium text-foreground">
            {getLocalizedText(testimonial.quote, language)}
          </p>
          <div className="flex items-center gap-4">
            <Avatar name={testimonial.authorName} size="lg" />
            <div>
              <p className="text-body-lg font-semibold text-foreground">{testimonial.authorName}</p>
              <p className="text-small text-foreground-muted">
                {getLocalizedText(testimonial.authorRole, language)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const dense = variant === 'compact-dense'

  return (
    <Card className="h-full" hoverable={false}>
      <CardContent
        className={dense ? 'flex h-full flex-col gap-4 p-5' : 'flex h-full flex-col gap-5'}
      >
        <p
          className={
            dense ? 'flex-1 text-small text-foreground' : 'flex-1 text-body text-foreground'
          }
        >
          {getLocalizedText(testimonial.quote, language)}
        </p>
        <div className="flex items-center gap-3">
          <Avatar name={testimonial.authorName} size="sm" />
          <div>
            <p className="text-small font-semibold text-foreground">{testimonial.authorName}</p>
            <p className="text-caption text-foreground-muted">
              {getLocalizedText(testimonial.authorRole, language)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
