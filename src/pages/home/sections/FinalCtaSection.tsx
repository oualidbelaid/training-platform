import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ensureGsapRegistered } from '@/lib/gsap'

/**
 * Closing lead-generation CTA. The panel's entrance is a scroll-linked
 * scale/opacity reveal driven by GSAP ScrollTrigger (continuously tied to
 * scroll position as the panel crosses the viewport) rather than Framer's
 * boolean whileInView — a case ScrollTrigger genuinely suits better
 * (redesign §8/§19 "clip/scale reveal").
 */
export function FinalCtaSection() {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !panelRef.current) return

    const gsap = ensureGsapRegistered()
    const tween = gsap.fromTo(
      panelRef.current,
      { scale: 0.94, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'top 90%',
          end: 'top 55%',
          scrub: true,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [prefersReducedMotion])

  return (
    <Section spacing="sm">
      <Container>
        <div
          ref={panelRef}
          className="bg-gradient-brand flex flex-col items-center gap-6 rounded-2xl px-6 py-16 text-center sm:px-16"
        >
          <h2 className="max-w-2xl text-h2 font-extrabold text-neutral-0">{t('finalCta.title')}</h2>
          <p className="max-w-xl text-body-lg text-neutral-0/85">{t('finalCta.description')}</p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button asChild size="lg" variant="secondary">
              <RouterLink to="/request-quote">{t('finalCta.primaryCta')}</RouterLink>
            </Button>
            <Button asChild size="lg" variant="inverse">
              <RouterLink to="/contact">{t('finalCta.secondaryCta')}</RouterLink>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
