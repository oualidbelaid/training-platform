import { Fragment } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/cn'

export interface BreadcrumbItem {
  label: string
  /** Omit on the last (current-page) item. */
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

/**
 * Semantic breadcrumb trail (CLAUDE.md §48 "Where am I?", spec §22
 * navigation). `nav` + `aria-label="Breadcrumb"` + `aria-current="page"` on
 * the final (non-link) item is the standard accessible pattern — also
 * lays the groundwork for the BreadcrumbList structured-data pass in M7.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex flex-wrap items-center gap-2 text-small', className)}
    >
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <Fragment key={item.label}>
              {index > 0 ? (
                <Icon
                  name="chevron-right"
                  aria-hidden="true"
                  className="text-caption text-foreground-faint rtl:rotate-180"
                />
              ) : null}
              <li>
                {item.href && !isLast ? (
                  <Link href={item.href} variant="subtle" className="no-underline">
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className="text-foreground-muted"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
