import { Component, type ErrorInfo, type ReactNode } from 'react'
import { ErrorState } from '@/components/feedback/ErrorState'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Global error boundary (spec §30) — the last line of defense so an
 * unexpected render error never leaves the visitor with a blank screen.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary] Unhandled render error:', error, info.componentStack)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorState />
    }
    return this.props.children
  }
}
