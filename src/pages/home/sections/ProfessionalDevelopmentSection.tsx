import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { TiltCard } from '@/components/motion/TiltCard'
import { Icon } from '@/components/ui/Icon'
import { DEVELOPMENT_STAGES } from '@/features/trainings/config/development-stages'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { ensureGsapRegistered, ScrollTrigger } from '@/lib/gsap'
import { cn } from '@/lib/cn'

const STAGE_COUNT = DEVELOPMENT_STAGES.length
const VH_PER_STAGE = 80

/**
 * The signature interaction of the Home Page (redesign §2/§3/§25): a
 * pinned, scroll-driven "moment" communicating that professional
 * development is a progression, not a single session. Five stages
 * (Leadership → Management → Digital Transformation → Communication →
 * Strategy) replace one another as the user scrolls — the scroll position
 * itself is the only control surface, never a click/carousel (spec §6).
 *
 * Architecture (spec §26 "avoid continuously updating React state on every
 * animation frame"):
 *   - GSAP ScrollTrigger owns the *continuous* scroll-position math: it
 *     drives the progress rail's fill directly via a ref (imperative DOM
 *     write, every frame) and only touches React state when the discrete
 *     active stage actually changes (at most 4 times per scroll-through).
 *   - Framer Motion owns the resulting *state transitions* — the text and
 *     image crossfade when `stageIndex` changes — which is exactly the
 *     "component-state-driven transition" case the project's own
 *     tool-selection table assigns to Framer, not GSAP.
 */
export function ProfessionalDevelopmentSection() {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const usePinnedExperience = isDesktop && !prefersReducedMotion

  const outerRef = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const [stageIndex, setStageIndex] = useState(0)
  const stageIndexRef = useRef(0)

  useEffect(() => {
    if (!usePinnedExperience || !outerRef.current) return

    ensureGsapRegistered()
    const trigger = ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleY(${self.progress})`
        }
        const nextStage = Math.min(STAGE_COUNT - 1, Math.floor(self.progress * STAGE_COUNT))
        if (nextStage !== stageIndexRef.current) {
          stageIndexRef.current = nextStage
          setStageIndex(nextStage)
        }
      },
    })

    return () => {
      trigger.kill()
      stageIndexRef.current = 0
      setStageIndex(0)
    }
  }, [usePinnedExperience])

  const activeStage = DEVELOPMENT_STAGES[stageIndex]!

  const header = (
    <div className="flex max-w-xl flex-col gap-4">
      <p className="text-caption font-semibold uppercase tracking-wide text-accent-400">
        {t('professionalDevelopment.eyebrow')}
      </p>
      <h2 className="text-h2 font-extrabold text-neutral-0">
        {t('professionalDevelopment.title')}
      </h2>
      <p className="text-body-lg text-neutral-0/70">{t('professionalDevelopment.description')}</p>
    </div>
  )

  const progressRail = (
    <ol className="flex shrink-0 flex-col gap-5">
      {DEVELOPMENT_STAGES.map((stage, index) => {
        const isActive = index === stageIndex
        return (
          <li
            key={stage.key}
            className={cn(
              'flex items-center gap-3 transition-opacity duration-(--duration-base)',
              isActive ? 'opacity-100' : 'opacity-40',
            )}
          >
            <span
              className={cn(
                'text-caption font-semibold tabular-nums',
                isActive ? 'text-accent-400' : 'text-neutral-0/60',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className={cn(
                'text-small font-medium uppercase tracking-wide',
                isActive ? 'text-neutral-0' : 'text-neutral-0/60',
              )}
            >
              {t(`professionalDevelopment.stages.${stage.key}.label`)}
            </span>
          </li>
        )
      })}
    </ol>
  )

  if (!usePinnedExperience) {
    return (
      <section className="bg-neutral-950 py-20 text-neutral-0 sm:py-28">
        <Container className="flex flex-col gap-14">
          {header}
          <div className="flex flex-col gap-12">
            {DEVELOPMENT_STAGES.map((stage, index) => {
              return (
                <div
                  key={stage.key}
                  className="grid gap-6 sm:grid-cols-2 sm:items-center sm:gap-10"
                >
                  <div className="overflow-hidden rounded-2xl border border-neutral-0/10">
                    <img
                      src={stage.image}
                      alt=""
                      className="h-56 w-full object-cover sm:h-64"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl',
                        stage.badgeClassName,
                      )}
                    >
                      <Icon name={stage.icon} aria-hidden="true" className="text-xl" />
                    </span>
                    <p className="text-caption font-semibold uppercase tracking-wide text-accent-400">
                      {t('professionalDevelopment.stepLabel', {
                        number: String(index + 1).padStart(2, '0'),
                      })}
                    </p>
                    <h3 className="text-h3 font-semibold text-neutral-0">
                      {t(`professionalDevelopment.stages.${stage.key}.title`)}
                    </h3>
                    <p className="text-body text-neutral-0/70">
                      {t(`professionalDevelopment.stages.${stage.key}.description`)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section
      ref={outerRef}
      className="relative bg-neutral-950"
      style={{ height: `${STAGE_COUNT * VH_PER_STAGE}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16 text-neutral-0 sm:pt-20 lg:pt-24">
        <Container className="flex w-full flex-col gap-10 lg:gap-14">
          {header}

          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
            <div className="flex flex-col gap-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-4"
                >
                  <span
                    className={cn(
                      'flex h-11 w-11 items-center justify-center rounded-xl',
                      activeStage.badgeClassName,
                    )}
                  >
                    <Icon name={activeStage.icon} aria-hidden="true" className="text-xl" />
                  </span>
                  <p className="text-caption font-semibold uppercase tracking-wide text-accent-400">
                    {t('professionalDevelopment.stepLabel', {
                      number: String(stageIndex + 1).padStart(2, '0'),
                    })}
                  </p>
                  <h3 className="text-h2 font-extrabold text-neutral-0">
                    {t(`professionalDevelopment.stages.${activeStage.key}.title`)}
                  </h3>
                  <p className="max-w-md text-body-lg text-neutral-0/75">
                    {t(`professionalDevelopment.stages.${activeStage.key}.description`)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-stretch gap-4">
              <div className="relative w-px bg-neutral-0/15">
                <div
                  ref={progressFillRef}
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-full origin-top bg-accent-400"
                  style={{ transform: 'scaleY(0)' }}
                />
              </div>
              {progressRail}
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-sm">
              <TiltCard maxTilt={4} className="h-full w-full">
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-neutral-0/10 shadow-xl">
                  <AnimatePresence>
                    <motion.img
                      key={activeStage.key}
                      src={activeStage.image}
                      alt={t(`professionalDevelopment.stages.${activeStage.key}.title`)}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </AnimatePresence>
                </div>
              </TiltCard>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}
