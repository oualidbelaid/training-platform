import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { Icon, type IconName } from '@/components/ui/Icon'
import { useCountUp } from '@/hooks/useCountUp'
import type { SupportedLanguage } from '@/i18n'

interface StatConfig {
  key: 'learners' | 'programs' | 'companies' | 'countries' | 'satisfaction'
  value: number
  icon: IconName
  badgeClassName: string
}

const STATS: StatConfig[] = [
  { key: 'learners', value: 25000, icon: 'users', badgeClassName: 'bg-primary-100 text-primary-600' },
  { key: 'programs', value: 300, icon: 'award', badgeClassName: 'bg-warning-50 text-warning-700' },
  { key: 'companies', value: 1200, icon: 'building', badgeClassName: 'bg-success-50 text-success-700' },
  { key: 'countries', value: 15, icon: 'globe', badgeClassName: 'bg-primary-100 text-primary-600' },
  { key: 'satisfaction', value: 98, icon: 'shield', badgeClassName: 'bg-success-50 text-success-700' },
]

const NUMERAL_LOCALE: Record<SupportedLanguage, string> = {
  fr: 'fr-FR',
  en: 'en-GB',
  // Force Western digits even in Arabic — matches the numeral convention
  // used throughout the rest of this professional/corporate UI.
  ar: 'ar-u-nu-latn',
}

function Metric({ stat, language }: { stat: StatConfig; language: SupportedLanguage }) {
  const { t } = useTranslation('home')
  const { ref, value } = useCountUp<HTMLParagraphElement>(stat.value)
  const formatted = new Intl.NumberFormat(NUMERAL_LOCALE[language]).format(value)

  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.badgeClassName}`}>
        <Icon name={stat.icon} aria-hidden="true" className="text-xl" />
      </span>
      <div>
        <p ref={ref} className="text-h3 font-extrabold text-foreground">
          {formatted}
          {t(`trust.stats.${stat.key}.suffix`)}
        </p>
        <p className="text-caption text-foreground-muted">{t(`trust.stats.${stat.key}.label`)}</p>
      </div>
    </div>
  )
}

/**
 * Floating credibility bar overlapping the Hero's bottom edge (redesign
 * §10). Figures are explicitly marked as demonstration data in the UI
 * itself (see the disclaimer below), never presented as verified fact.
 */
export function TrustSection() {
  const { t, i18n } = useTranslation('home')
  const language = i18n.language as SupportedLanguage

  return (
    <div className="relative z-10 -mt-12 pb-16 sm:-mt-16 sm:pb-20">
      <Container>
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-xl sm:p-8">
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {STATS.map((stat) => (
              <Metric key={stat.key} stat={stat} language={language} />
            ))}
          </div>
        </div>
        <p className="mt-3 text-center text-caption text-foreground-faint">{t('trust.disclaimer')}</p>
      </Container>
    </div>
  )
}
