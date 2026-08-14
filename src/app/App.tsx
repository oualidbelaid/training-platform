import { Suspense } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { ErrorBoundary } from '@/core/ErrorBoundary'
import { LoadingState } from '@/components/feedback/LoadingState'
import { DirectionProvider } from '@/providers/DirectionProvider'
import { QueryProvider } from '@/providers/QueryProvider'
import { router } from '@/routes'
import '@/i18n'

export function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <QueryProvider>
          <DirectionProvider>
            <Suspense fallback={<LoadingState />}>
              <RouterProvider router={router} />
            </Suspense>
          </DirectionProvider>
        </QueryProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}
