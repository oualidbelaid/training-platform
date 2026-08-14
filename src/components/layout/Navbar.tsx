import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link as RouterLink, NavLink } from 'react-router-dom'
import { Container } from '@/components/layout/Container'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'
import { Button } from '@/components/ui/Button'
import { Drawer } from '@/components/ui/Drawer'
import { Icon } from '@/components/ui/Icon'
import { IconButton } from '@/components/ui/IconButton'
import { Link } from '@/components/ui/Link'
import { BRAND } from '@/config/brand'
import { useScrolled } from '@/hooks/useScrolled'
import { cn } from '@/lib/cn'

const NAV_ITEMS = [
  { key: 'training', href: '/trainings' },
  { key: 'solutions', href: '/solutions-for-companies' },
  { key: 'about', href: '/about' },
  { key: 'resources', href: '/resources' },
  { key: 'contact', href: '/contact' },
] as const

/**
 * Active-route styling for the desktop nav (spec "Navigation — Active Link
 * State"). `NavLink` (not the shared `Link` primitive) so React Router's
 * own location matching drives `isActive`/`aria-current="page"` — no
 * manual `window.location` checks, no second routing system. Deliberately
 * no `end` prop: every item's target is either a single page or a parent
 * of routes like `/trainings/:slug` and `/resources/:slug`, so React
 * Router's default prefix matching is exactly "stay active on nested
 * routes" — and since none of the 5 targets prefix-match each other,
 * exactly one item is ever active. A permanent, transparent-when-inactive
 * `border-b-2` avoids a layout shift when the active item changes; the
 * combination of brand color *and* weight *and* the border means the
 * state isn't conveyed by color alone.
 */
function desktopNavLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'border-b-2 text-nav no-underline transition-colors duration-(--duration-fast) ease-(--ease-out)',
    isActive ? 'border-brand font-semibold text-brand' : 'border-transparent text-foreground-muted hover:text-foreground',
  )
}

/** Same active contract as `desktopNavLinkClassName`, styled for the mobile drawer's block rows. `border-s-2` (logical, not `border-l-2`) keeps the accent on the correct edge in RTL. */
function mobileNavLinkClassName({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-md border-s-2 px-3 py-3 text-body no-underline transition-colors duration-(--duration-fast) ease-(--ease-out)',
    isActive
      ? 'border-brand bg-primary-50 font-semibold text-brand'
      : 'border-transparent text-foreground-muted hover:bg-neutral-50 hover:text-foreground',
  )
}

function Wordmark({ className }: { className?: string }) {
  const { t } = useTranslation('common')
  return (
    <Link href="/" variant="subtle" className={cn('flex items-center', className)}>
      <img src={BRAND.logo} alt={t('app.name')} className="h-9 w-auto" />
    </Link>
  )
}

/**
 * Premium responsive navigation (spec M2 §3, redesigned for visual
 * quality). Transparent at the top of the page, solid + blurred once
 * scrolled (`useScrolled`), with a fully-accessible slide-in `Drawer` on
 * mobile — see docs/COMPONENT_GUIDE.md for why the mobile panel uses the
 * M1 Drawer primitive instead of a one-off implementation.
 */
export function Navbar() {
  const { t } = useTranslation('home')
  const scrolled = useScrolled()
  const [mobileOpen, setMobileOpen] = useState(false)
  const drawerTitleId = useId()

  return (
    <header
      className={cn(
        'sticky top-0 z-(--z-index-header) border-b transition-colors duration-(--duration-base)',
        scrolled
          ? 'border-border bg-surface/90 shadow-sm backdrop-blur-md'
          : 'border-transparent bg-transparent',
      )}
    >
      <Container className="flex h-18 items-center justify-between">
        <Wordmark />

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.key} to={item.href} className={desktopNavLinkClassName}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Button asChild size="sm">
            <RouterLink to="/request-information" className="group">
              {t('nav.cta')}
              <Icon
                name="arrow-right"
                aria-hidden="true"
                className="text-base transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </RouterLink>
          </Button>
        </div>

        <IconButton
          aria-label={t('nav.openMenu')}
          variant="ghost"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Icon name="bars" aria-hidden="true" className="text-xl" />
        </IconButton>
      </Container>

      <Drawer open={mobileOpen} onClose={() => setMobileOpen(false)} titleId={drawerTitleId} title={t('nav.openMenu')}>
        <div className="flex items-center justify-between border-b border-border p-4">
          <Wordmark />
          <IconButton aria-label={t('nav.closeMenu')} variant="ghost" onClick={() => setMobileOpen(false)}>
            <Icon name="xmark" aria-hidden="true" className="text-xl" />
          </IconButton>
        </div>

        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1 p-4">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={item.href}
              className={mobileNavLinkClassName}
              onClick={() => setMobileOpen(false)}
            >
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        <div className="flex flex-col gap-4 border-t border-border p-4">
          <LanguageSwitcher />
          <Button asChild onClick={() => setMobileOpen(false)}>
            <RouterLink to="/request-information">{t('nav.cta')}</RouterLink>
          </Button>
        </div>
      </Drawer>
    </header>
  )
}
