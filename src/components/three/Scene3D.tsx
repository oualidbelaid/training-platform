import { lazy, Suspense } from 'react'
import { ErrorBoundary } from '@/core/ErrorBoundary'
import { useCanRender3D } from '@/hooks/useCanRender3D'
import { cn } from '@/lib/cn'

const HeroScene = lazy(() => import('@/components/three/HeroScene'))

interface Scene3DProps {
  className?: string
  fallback?: React.ReactNode
}

/**
 * The only place a page ever mounts 3D content (spec §10). Handles the
 * full gating pipeline in one component so pages don't need to know about
 * lazy-loading, reduced-motion or capability checks:
 *   1. useCanRender3D() decides whether to even attempt the R3F chunk.
 *   2. React.lazy code-splits three/@react-three/fiber/drei into their own
 *      chunk — never downloaded on a page that doesn't render this.
 *   3. Suspense shows a static fallback while that chunk loads.
 *   4. ErrorBoundary catches WebGL/context failures and falls back to the
 *      same static visual instead of leaving a blank region.
 */
export function Scene3D({ className, fallback }: Scene3DProps) {
  const canRender3D = useCanRender3D()

  const staticFallback = fallback ?? (
    <div
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center bg-gradient-to-br from-primary-50 via-neutral-0 to-neutral-50',
        className,
      )}
    >
      <div className="h-2/3 w-2/3 rounded-full bg-gradient-to-br from-primary-200/70 via-primary-100/50 to-transparent blur-2xl" />
    </div>
  )

  if (!canRender3D) {
    return staticFallback
  }

  return (
    <ErrorBoundary fallback={staticFallback}>
      <Suspense fallback={staticFallback}>
        <div className={className}>
          <HeroScene />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}
