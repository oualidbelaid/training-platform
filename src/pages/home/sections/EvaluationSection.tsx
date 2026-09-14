import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Rating } from '@/components/ui/Rating'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { EvaluationModal } from '@/features/reviews/components/EvaluationModal'
import { useReviews } from '@/features/reviews/hooks/useReviews'
import { getApprovedReviewStats } from '@/features/reviews/utils/getApprovedReviewStats'

/**
 * Compact rating summary + CTA to leave an evaluation, right after
 * `KeyPrinciplesSection`. With zero approved reviews (the honest starting
 * state — no fabricated seed data), shows neutral copy instead of a fake
 * average; a real average/count/stars only ever appear once a genuine
 * review exists — see `getApprovedReviewStats` and `docs/ARCHITECTURE.md` →
 * "Reviews data & persistence".
 */
export function EvaluationSection() {
  const { t } = useTranslation('reviews')
  const [open, setOpen] = useState(false)
  const { data: reviews = [] } = useReviews()
  const stats = getApprovedReviewStats(reviews)

  return (
    <Section spacing="sm">
      <Container className="flex flex-col items-center gap-5 text-center">
        <RevealOnScroll className="flex flex-col items-center gap-4">
          <p className="text-small font-semibold uppercase tracking-wide text-foreground-faint">
            {t('section.eyebrow')}
          </p>
          <h2 className="text-h2 font-bold text-foreground">{t('section.title')}</h2>

          {stats.count > 0 ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Rating value={stats.average} />
              <span className="text-body font-semibold text-foreground">
                {stats.average.toFixed(1)} / 5
              </span>
              <span className="text-body text-foreground-muted">
                {t('section.count', { count: stats.count })}
              </span>
            </div>
          ) : (
            <p className="max-w-md text-body text-foreground-muted">{t('section.empty')}</p>
          )}

          <Button onClick={() => setOpen(true)} variant="outline">
            {t('section.cta')}
          </Button>
        </RevealOnScroll>
      </Container>

      <EvaluationModal open={open} onClose={() => setOpen(false)} />
    </Section>
  )
}
