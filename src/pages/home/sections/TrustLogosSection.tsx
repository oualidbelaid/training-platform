import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { MEDIA } from '@/config/media'
import { useDirection } from '@/hooks/useDirection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

const PARTNER_LOGOS = [MEDIA.partner1, MEDIA.partner2, MEDIA.partner3, MEDIA.partner4, MEDIA.partner5, MEDIA.partner6]

const LOGO_CLASSNAME =
  'h-7 w-auto shrink-0 opacity-50 transition-opacity duration-(--duration-base) hover:opacity-100'

/**
 * "Ils nous font confiance" (branding refinement §4, marquee fix pass) — a
 * restrained credibility moment right after the numeric TrustSection: a
 * short label, one supporting line, and a logo row.
 *
 * The logo row is a true seamless CSS marquee: the track renders the logo
 * list twice back-to-back (`aria-hidden` on the second copy so screen
 * readers don't hear every partner twice) and animates
 * `translateX(0) → translateX(-50%)` linearly forever — since the two
 * copies are identical, the moment the animation "resets" from -50% back
 * to 0% is visually indistinguishable from mid-loop, so there's no jump.
 * Direction mirrors for RTL (`marquee-reverse`, `+50%`) via `useDirection()`,
 * consistent with how every other directional element in the app adapts
 * (see `docs/ANIMATION_GUIDE.md`). Pure CSS `transform`/`animation` — no
 * `requestAnimationFrame`, no React state during the animation.
 *
 * `prefers-reduced-motion` renders the original static, wrapped, centered
 * row instead (no duplication, no animation) — the section stays fully
 * readable without motion.
 */
export function TrustLogosSection() {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()
  const direction = useDirection()

  return (
    <Section spacing="sm">
      <Container>
        <RevealOnScroll className="flex flex-col items-center gap-2 text-center">
          <p className="text-caption font-semibold uppercase tracking-wide text-brand">{t('trustLogos.eyebrow')}</p>
          <p className="text-body text-foreground-muted">{t('trustLogos.description')}</p>
          <RouterLink
            to="/partners"
            className="text-caption font-semibold text-brand underline-offset-4 hover:underline"
          >
            {t('trustLogos.cta')}
          </RouterLink>
        </RevealOnScroll>

        <RevealOnScroll>
          {prefersReducedMotion ? (
            <div className="mt-8 flex flex-wrap justify-center gap-10">
              {PARTNER_LOGOS.map((src, index) => (
                <img key={index} src={src} alt="" className={LOGO_CLASSNAME} />
              ))}
            </div>
          ) : (
            <div className="mt-8 overflow-hidden">
              <div
                className={cn(
                  'flex w-max gap-10 hover:[animation-play-state:paused]',
                  direction === 'rtl' ? 'animate-marquee-reverse' : 'animate-marquee',
                )}
              >
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex shrink-0 gap-10" aria-hidden={copy === 1 || undefined}>
                    {PARTNER_LOGOS.map((src, index) => (
                      <img key={index} src={src} alt="" className={LOGO_CLASSNAME} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </RevealOnScroll>

        <p className="mt-6 text-center text-caption text-foreground-faint">{t('trustLogos.disclaimer')}</p>
      </Container>
    </Section>
  )
}
