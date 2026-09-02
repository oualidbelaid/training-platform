import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router-dom'
import { AnnouncementBar } from '@/components/layout/AnnouncementBar'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'

/**
 * Skip link + route-change focus management (M8 accessibility audit).
 * `<main>` is `tabIndex={-1}` so it's a valid programmatic focus target
 * without joining the normal Tab order. On every client-side navigation,
 * focus moves there so screen-reader users get positioned at the new
 * page's content instead of silently keeping focus wherever it was — the
 * standard SPA pattern for the context screen readers would otherwise
 * lose on route changes. Skipped on first mount so it doesn't steal focus
 * from the skip link (or anything else) on initial page load.
 */
export function MainLayout() {
  const { t } = useTranslation('common')
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus()
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-(--z-index-toast) focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-body font-semibold text-foreground focus:outline-2 focus:outline-primary-500"
      >
        {t('a11y.skipToContent')}
      </a>
      <AnnouncementBar />
      <Navbar />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="flex-1 outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
