import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { MEDIA } from '@/config/media'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ensureGsapRegistered } from '@/lib/gsap'

const POINT_KEYS = ['needs', 'teams', 'skills', 'transformation'] as const

/**
 * The B2B "solutions for companies" moment, elevated per redesign §18: a
 * large headline on one side and a large photographic composition on the
 * other, rather than headline + bullet list. The four selling points move
 * into compact chips so the image can carry real visual weight. The ambient
 * glow keeps drifting via GSAP ScrollTrigger exactly as before (spec §8/§9).
 */
export function CompaniesSection() {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !glowRef.current) return

    const gsap = ensureGsapRegistered()
    const tween = gsap.to(glowRef.current, {
      xPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [prefersReducedMotion])

  return (
    <Section
      id="companies"
      ref={sectionRef}
      spacing="md"
      className="relative overflow-hidden bg-neutral-900 text-neutral-0"
    >
      <div
        ref={glowRef}
        aria-hidden="true"
        className="absolute -top-1/2 end-0 h-[140%] w-1/2 rounded-full bg-primary-600/30 blur-3xl"
      />

      <Container className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
        <RevealOnScroll className="flex flex-col gap-6">
          <p className="text-caption font-semibold uppercase tracking-wide text-accent-400">
            {t('companies.eyebrow')}
          </p>
          <h2 className="text-h2 font-extrabold">{t('companies.title')}</h2>
          <p className="max-w-lg text-body-lg text-neutral-0/80">{t('companies.description')}</p>

          <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {POINT_KEYS.map((key) => (
              <li key={key} className="flex items-start gap-2 border-s-2 border-accent-400 ps-3">
                <span className="text-small text-neutral-0/90">{t(`companies.points.${key}`)}</span>
              </li>
            ))}
          </ul>

          <div className="pt-3">
            <Button asChild variant="inverse" size="lg">
              <RouterLink to="/solutions-for-companies">{t('companies.cta')}</RouterLink>
            </Button>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="relative">
          <div className="overflow-hidden rounded-3xl ring-1 ring-neutral-0/10">
            <Image src={MEDIA.companyTraining} alt="" aspectRatio="4 / 5" />
          </div>
          <GlassPanel
            tone="dark"
            className="absolute bottom-5 start-5 flex w-52 items-center gap-3 p-4"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-neutral-0">
              <Icon name="building" aria-hidden="true" className="text-base" />
            </span>
            <span className="text-small font-medium text-neutral-0">{t('companies.imageCaption')}</span>
          </GlassPanel>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
