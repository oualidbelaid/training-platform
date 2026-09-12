import { type AnchorHTMLAttributes, forwardRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { cn } from '@/lib/cn'

const variantClasses = {
  default: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline',
  subtle: 'text-foreground-muted hover:text-foreground',
} as const

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  variant?: keyof typeof variantClasses
}

/**
 * Single Link primitive for both internal routes and external URLs — an
 * internal `href` (starting with "/") renders a React Router Link so
 * navigation stays client-side; anything else renders a real <a> with safe
 * `target`/`rel` defaults (spec M1 §5).
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, variant = 'default', className, children, ...props }, ref) => {
    const isHashLink = href.startsWith('#')
    const isInternal = href.startsWith('/')
    const sharedClassName = cn(
      'transition-colors duration-(--duration-fast) ease-(--ease-out)',
      variantClasses[variant],
      className,
    )

    if (isHashLink) {
      // Same-page anchor — a plain <a> lets the browser's native smooth
      // scroll (globals.css) handle it; React Router's <Link> would try to
      // treat it as a route change instead.
      return (
        <a ref={ref} href={href} className={sharedClassName} {...props}>
          {children}
        </a>
      )
    }

    if (isInternal) {
      return (
        <RouterLink ref={ref} to={href} className={sharedClassName} {...props}>
          {children}
        </RouterLink>
      )
    }

    return (
      <a
        ref={ref}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={sharedClassName}
        {...props}
      >
        {children}
      </a>
    )
  },
)

Link.displayName = 'Link'
