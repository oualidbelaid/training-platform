import { Link as RouterLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Button } from '@/components/ui/Button'

export interface CtaBannerAction {
  label: string
  href: string
}

interface CtaBannerProps {
  title: string
  description: string
  primaryAction: CtaBannerAction
  secondaryAction?: CtaBannerAction
}

/**
 * Reusable page-ending CTA panel (M4) — the "CTA (standalone)" gap flagged
 * in `docs/COMPONENT_GUIDE.md`'s "Not built yet" list. Reuses the exact
 * gradient-panel visual language `FinalCtaSection` established on the Home
 * Page (`bg-gradient-brand`, `text-neutral-0`, `secondary`/`inverse`
 * buttons) so every M4 content page closes on the same premium note — but
 * with a plain `RevealOnScroll` fade/rise instead of `FinalCtaSection`'s
 * GSAP ScrollTrigger scale reveal: M4 is scoped to "subtle existing motion
 * only" (advanced scroll choreography is M6). Content (title/description/
 * labels) is always supplied by the caller's own i18n namespace — this
 * component holds no copy of its own.
 */
export function CtaBanner({ title, description, primaryAction, secondaryAction }: CtaBannerProps) {
  return (
    <Section spacing="sm">
      <Container>
        <RevealOnScroll>
          <div className="bg-gradient-brand flex flex-col items-center gap-6 rounded-2xl px-6 py-16 text-center sm:px-16">
            <h2 className="max-w-2xl text-h2 font-extrabold text-neutral-0">{title}</h2>
            <p className="max-w-xl text-body-lg text-neutral-0/85">{description}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button asChild size="lg" variant="secondary">
                <RouterLink to={primaryAction.href}>{primaryAction.label}</RouterLink>
              </Button>
              {secondaryAction ? (
                <Button asChild size="lg" variant="inverse">
                  <RouterLink to={secondaryAction.href}>{secondaryAction.label}</RouterLink>
                </Button>
              ) : null}
            </div>
          </div>
        </RevealOnScroll>
      </Container>
    </Section>
  )
}
