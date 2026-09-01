import { useTranslation } from 'react-i18next'
import { Container } from '@/components/layout/Container'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Link } from '@/components/ui/Link'
import { Divider } from '@/components/ui/Divider'
import { BRAND } from '@/config/brand'
import { useCategories } from '@/features/categories/hooks/useCategories'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

/**
 * Production-ready footer foundation (spec M2 §16). Category links come
 * from `useCategories()` — never hardcoded — so the footer stays correct
 * as the catalog grows in later milestones (spec M2 §22).
 */
export function Footer() {
  const { t, i18n } = useTranslation(['common', 'home'])
  const language = i18n.language as SupportedLanguage
  const { data: categories } = useCategories()

  return (
    <footer className="border-t border-border bg-surface-subtle">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <img
              src={BRAND.logo}
              alt={t('app.name', { ns: 'common' })}
              className="h-9 w-auto max-w-full mix-blend-multiply"
            />
            <p className="max-w-xs text-body text-foreground-muted">{t('footer.tagline', { ns: 'home' })}</p>
            <LanguageSwitcher />
          </div>

          <nav aria-label={t('footer.columns.training.title', { ns: 'home' })} className="flex flex-col gap-3">
            <p className="text-small font-semibold text-neutral-900">
              {t('footer.columns.training.title', { ns: 'home' })}
            </p>
            {categories?.slice(0, 4).map((category) => (
              <Link key={category.id} href={`/trainings?category=${category.slug}`} variant="subtle">
                {getLocalizedText(category.name, language)}
              </Link>
            ))}
            <Link href="/trainings" variant="subtle">
              {t('footer.columns.training.allTrainings', { ns: 'home' })}
            </Link>
          </nav>

          <nav aria-label={t('footer.columns.company.title', { ns: 'home' })} className="flex flex-col gap-3">
            <p className="text-small font-semibold text-neutral-900">
              {t('footer.columns.company.title', { ns: 'home' })}
            </p>
            <Link href="/about" variant="subtle">
              {t('footer.columns.company.about', { ns: 'home' })}
            </Link>
            <Link href="/events" variant="subtle">
              {t('footer.columns.company.events', { ns: 'home' })}
            </Link>
          </nav>

          <nav aria-label={t('footer.columns.contact.title', { ns: 'home' })} className="flex flex-col gap-3">
            <p className="text-small font-semibold text-neutral-900">
              {t('footer.columns.contact.title', { ns: 'home' })}
            </p>
            <Link href="/request-information" variant="subtle">
              {t('footer.columns.contact.requestInfo', { ns: 'home' })}
            </Link>
            <Link href="/request-quote" variant="subtle">
              {t('footer.columns.contact.requestQuote', { ns: 'home' })}
            </Link>
            <Link href="/contact" variant="subtle">
              {t('footer.columns.contact.contactUs', { ns: 'home' })}
            </Link>
          </nav>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col gap-4 text-small text-foreground-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('app.name', { ns: 'common' })} — {t('footer.copyright', { ns: 'home' })}
          </p>
          <div className="flex gap-6">
            <Link href="/legal" variant="subtle">
              {t('footer.legal.legalNotice', { ns: 'home' })}
            </Link>
            <Link href="/privacy" variant="subtle">
              {t('footer.legal.privacyPolicy', { ns: 'home' })}
            </Link>
            <Link href="/cookies" variant="subtle">
              {t('footer.legal.cookiePolicy', { ns: 'home' })}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}
