import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'
import { Map } from '@/components/map/Map'
import { LOCATION } from '@/config/location'

/**
 * Location / contact section (branding refinement §7) — ISTAM's details
 * stay in real, selectable text outside the map (never image/canvas-only
 * information), with the interactive map as a supporting visual on a
 * two-column desktop layout that stacks on mobile.
 */
export function LocationSection() {
  const { t } = useTranslation('home')

  return (
    <Section spacing="md" className="bg-surface-subtle">
      <Container>
        <RevealOnScroll>
          <SectionHeading eyebrow={t('location.eyebrow')} title={t('location.title')} />
        </RevealOnScroll>

        <div className="mt-10 grid gap-8 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm lg:grid-cols-2">
          <RevealOnScroll className="flex flex-col justify-center gap-6 p-8 sm:p-10">
            <div>
              <p className="text-h3 font-semibold text-foreground">{t('location.companyName')}</p>
              <p className="mt-1 text-body text-foreground-muted">{t('location.description')}</p>
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Icon
                  name="location-dot"
                  aria-hidden="true"
                  className="mt-0.5 text-lg text-brand"
                />
                <span className="text-body text-foreground">{LOCATION.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="phone" aria-hidden="true" className="text-lg text-brand" />
                <a
                  href={`tel:${LOCATION.phone.replace(/\s+/g, '')}`}
                  className="text-body text-foreground hover:text-brand"
                >
                  {LOCATION.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="envelope" aria-hidden="true" className="text-lg text-brand" />
                <a
                  href={`mailto:${LOCATION.email}`}
                  className="text-body text-foreground hover:text-brand"
                >
                  {LOCATION.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Icon name="clock" aria-hidden="true" className="mt-0.5 text-lg text-brand" />
                <span className="flex flex-col gap-0.5 text-body text-foreground">
                  {LOCATION.hours.map((entry) => (
                    <span key={entry.day}>
                      {t(`location.hours.${entry.day}`)} — {entry.value}
                    </span>
                  ))}
                </span>
              </li>
            </ul>

            <div className="pt-2">
              <Button asChild size="lg">
                <a
                  href={`https://www.openstreetmap.org/?mlat=${LOCATION.latitude}&mlon=${LOCATION.longitude}#map=16/${LOCATION.latitude}/${LOCATION.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  {t('location.cta')}
                  <Icon
                    name="arrow-right"
                    aria-hidden="true"
                    className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
                  />
                </a>
              </Button>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="min-h-80 lg:min-h-0">
            <Map className="h-full min-h-80 w-full" />
          </RevealOnScroll>
        </div>
      </Container>
    </Section>
  )
}
