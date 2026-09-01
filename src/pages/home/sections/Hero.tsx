import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { GlassPanel } from '@/components/ui/GlassPanel'
import { Icon } from '@/components/ui/Icon'
import { Image } from '@/components/ui/Image'
import { Rating } from '@/components/ui/Rating'
import { TiltCard } from '@/components/motion/TiltCard'
import { Scene3D } from '@/components/three/Scene3D'
import { MEDIA } from '@/config/media'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ensureGsapRegistered } from '@/lib/gsap'
import { fadeInUp, staggerContainer } from '@/lib/motion'

/**
 * The most important section on the page (spec §4/§5, redesigned, then
 * refined in the "final premium UX" pass — spec §10/§11/§15B "HERO IMAGE").
 * The visual is one system, not "photo + random 3D object": the 3D orb
 * (HeroScene) sits as an ambient backdrop, a framed editorial photograph is
 * layered on top of it, and floating GlassPanel info cards complete the
 * composition — all three sharing depth/light language. Headline uses
 * `text-h1`, not `text-display` (branding-refinement §6 — the Hero no
 * longer takes up most of the viewport with oversized type).
 */
export function Hero() {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !backgroundRef.current) return

    const gsap = ensureGsapRegistered()
    const tween = gsap.to(backgroundRef.current, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
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
    <section ref={sectionRef} className="relative overflow-hidden">
      <div ref={backgroundRef} aria-hidden="true" className="bg-gradient-hero absolute inset-0 -top-24" />

      <Container className="relative grid gap-16 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <motion.div
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
          variants={staggerContainer}
          className="flex flex-col gap-6"
        >
          <motion.p
            variants={fadeInUp}
            className="text-caption font-semibold uppercase tracking-wide text-brand"
          >
            {t('hero.eyebrow')}
          </motion.p>

          <motion.h1 variants={fadeInUp} className="text-h1 font-extrabold text-foreground">
            <span className="block">{t('hero.headline.line1')}</span>
            <span className="block">{t('hero.headline.line2')}</span>
            <span className="block">
              {t('hero.headline.prefix') ? `${t('hero.headline.prefix')} ` : ''}
              <span className="text-gradient-brand">{t('hero.headline.accent')}</span>{' '}
              {t('hero.headline.suffix')}
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="max-w-xl text-body-lg text-foreground-muted">
            {t('hero.subheadline')}
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
            <Button asChild size="lg">
              <RouterLink to="/trainings" className="group">
                {t('hero.primaryCta')}
                <Icon
                  name="arrow-right"
                  aria-hidden="true"
                  className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </RouterLink>
            </Button>
            <Button asChild size="lg" variant="ghost">
              <a href="#companies" className="group">
                {t('hero.secondaryCta')}
                <Icon
                  name="arrow-right"
                  aria-hidden="true"
                  className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                />
              </a>
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex items-center gap-3 pt-3">
            <Rating value={4.8} />
            <p className="text-small text-foreground-muted">
              {t('hero.trustLabel', { rating: '4.8', count: '2,000' })}
            </p>
          </motion.div>
        </motion.div>

        <div className="relative h-[26rem] sm:h-[30rem] lg:h-[38rem]">
          {/* Ambient 3D backdrop — the orb reads as light/depth behind the
              photo rather than a separate decoration (spec §15B "Everything
              must belong to the same visual system"). */}
          <div aria-hidden="true" className="absolute inset-0 scale-125">
            <Scene3D className="h-full w-full" />
          </div>

          <TiltCard className="absolute inset-8 sm:inset-12 lg:inset-14" maxTilt={3}>
            <div className="h-full w-full overflow-hidden rounded-[1.75rem] border border-neutral-0/60 shadow-xl ring-1 ring-neutral-900/5">
              <Image src={MEDIA.heroTraining} alt="" className="h-full" loading="eager" fetchPriority="high" />
            </div>
          </TiltCard>

          <TiltCard className="absolute start-0 top-2 sm:start-0" maxTilt={5}>
            <GlassPanel tone="light" className="flex w-56 items-start gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 text-neutral-0">
                <Icon name="arrow-trend-up" aria-hidden="true" className="text-base" />
              </span>
              <span>
                <span className="block text-small font-semibold text-foreground">
                  {t('hero.cards.impactTitle')}
                </span>
                <span className="block text-caption text-foreground-muted">
                  {t('hero.cards.impactDescription')}
                </span>
              </span>
            </GlassPanel>
          </TiltCard>

          <TiltCard className="absolute bottom-2 end-0 sm:end-0" maxTilt={5}>
            <GlassPanel tone="light" className="flex w-56 items-start gap-3 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-500 text-neutral-0">
                <Icon name="users" aria-hidden="true" className="text-base" />
              </span>
              <span>
                <span className="block text-small font-semibold text-foreground">
                  {t('hero.cards.expertsTitle')}
                </span>
                <span className="block text-caption text-foreground-muted">
                  {t('hero.cards.expertsDescription')}
                </span>
              </span>
            </GlassPanel>
          </TiltCard>

          <span
            aria-hidden="true"
            className="absolute -top-2 end-6 flex h-8 w-8 items-center justify-center rounded-full bg-neutral-0 shadow-md sm:end-10"
          >
            <Icon name="award" className="text-base text-accent-500" />
          </span>
        </div>
      </Container>
    </section>
  )
}
