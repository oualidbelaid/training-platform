import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Grid } from '@/components/layout/Grid'
import { Section } from '@/components/layout/Section'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

const ITEM_KEYS = ['experts', 'practical', 'impact', 'flexible'] as const

/**
 * The 4 "Pourquoi nous choisir" principles, promoted to the top of the Home
 * page (Home refinement pass) — directly under the Hero, in the position
 * its subheadline used to occupy, rather than as their own section further
 * down. Content is reused verbatim from the former `ValuePropositionSection`
 * (`valueProposition.items.*`, unchanged); only the layout changes, from a
 * vertical stack beside a sticky image to a 4-up grid, reusing the exact
 * numbered-badge markup (`01`–`04` in `text-h2 font-extrabold
 * text-primary-200`) already established in `SolutionsForCompaniesPage.tsx`.
 */
export function KeyPrinciplesSection() {
  const { t } = useTranslation('home')

  return (
    <Section spacing="sm">
      <Container>
        <Grid cols={4} gap="lg">
          {ITEM_KEYS.map((key, index) => (
            <RevealOnScroll key={key}>
              <div className="flex flex-col gap-3">
                <span className="text-h2 font-extrabold text-primary-200" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="text-body-lg font-semibold text-foreground">
                  {t(`valueProposition.items.${key}.title`)}
                </p>
                <p className="text-body text-foreground-muted">
                  {t(`valueProposition.items.${key}.description`)}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
