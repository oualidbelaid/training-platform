import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Image } from '@/components/ui/Image'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { MEDIA } from '@/config/media'

const ITEM_KEYS = ['experts', 'practical', 'impact', 'flexible'] as const

const principleVariant = {
  hidden: { opacity: 0.35, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const } },
}

/**
 * "From learning to impact" (redesign §16) — a large sticky visual on one
 * side, four principles that gain prominence as they individually enter the
 * viewport on the other (each RevealOnScroll'd independently rather than as
 * one staggered group), instead of a four-up icon grid.
 */
export function ValuePropositionSection() {
  const { t } = useTranslation('home')

  return (
    <Section spacing="md" className="bg-surface-subtle">
      <Container>
        <RevealOnScroll>
          <SectionHeading
            eyebrow={t('valueProposition.eyebrow')}
            title={t('valueProposition.title')}
          />
        </RevealOnScroll>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <RevealOnScroll className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-3xl shadow-lg">
              <Image src={MEDIA.strategy} alt="" aspectRatio="4 / 5" />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-12 py-2">
            {ITEM_KEYS.map((key, index) => (
              <RevealOnScroll key={key} variants={principleVariant}>
                <div className="flex gap-5 border-s-2 border-primary-600 ps-6">
                  <span className="text-h1 font-extrabold text-primary-200" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="flex flex-col gap-2 pt-1">
                    <p className="text-h3 font-semibold text-foreground">
                      {t(`valueProposition.items.${key}.title`)}
                    </p>
                    <p className="max-w-md text-body text-foreground-muted">
                      {t(`valueProposition.items.${key}.description`)}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}
