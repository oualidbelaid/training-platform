import { lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorBoundary } from '@/core/ErrorBoundary'
import { Icon } from '@/components/ui/Icon'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/cn'

const LocationMap = lazy(() => import('@/components/map/LocationMap'))

interface MapProps {
  className?: string
}

/**
 * The only place a page mounts the map (mirrors `Scene3D`'s role for 3D):
 * `React.lazy` code-splits `leaflet`/`react-leaflet` into their own chunk,
 * `Suspense` shows a static placeholder while it loads, and `ErrorBoundary`
 * falls back to the same placeholder if tile loading or Leaflet itself
 * fails — the map never leaves a blank hole in the Location section. The
 * address/phone remain fully readable outside the map regardless.
 *
 * OpenStreetMap tiles are free and keyless — no API key/secret involved,
 * so there's nothing to gate on environment configuration here (unlike a
 * Google Maps integration would need).
 */
export function Map({ className }: MapProps) {
  const { t } = useTranslation('home')
  const prefersReducedMotion = useReducedMotion()

  const fallback = (
    <div
      className={cn(
        'flex items-center justify-center gap-2 bg-surface-subtle text-foreground-faint',
        className,
      )}
    >
      <Icon name="location-dot" aria-hidden="true" className="text-lg" />
      <span className="text-small">{t('location.mapUnavailable')}</span>
    </div>
  )

  return (
    <ErrorBoundary fallback={fallback}>
      <Suspense fallback={fallback}>
        <div className={className}>
          <LocationMap reducedMotion={prefersReducedMotion} />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
