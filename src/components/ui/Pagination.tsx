import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export interface PaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** i18n label, e.g. "Page {{page}} of {{pageCount}}" — rendered for screen readers only. */
  statusLabel: string
  previousLabel: string
  nextLabel: string
  className?: string
}

/**
 * Minimal previous/next + page-number pagination — no ellipsis-collapsing
 * logic since catalog result sets are small (spec §18 "Make filtering
 * intuitive", not "build a data-grid pager"). `nav`/`aria-current="page"` is
 * the standard accessible pagination pattern.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  statusLabel,
  previousLabel,
  nextLabel,
  className,
}: PaginationProps) {
  if (pageCount <= 1) return null

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1)

  return (
    <nav aria-label={statusLabel} className={cn('flex items-center justify-center gap-2', className)}>
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={previousLabel}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors duration-(--duration-fast) hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40"
      >
        <Icon name="chevron-left" aria-hidden="true" className="text-small rtl:rotate-180" />
      </button>

      <ol className="flex items-center gap-1">
        {pages.map((pageNumber) => {
          const isActive = pageNumber === page
          return (
            <li key={pageNumber}>
              <button
                type="button"
                onClick={() => onPageChange(pageNumber)}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex h-9 w-9 items-center justify-center rounded-full text-small font-medium transition-colors duration-(--duration-fast)',
                  isActive
                    ? 'bg-primary-600 text-neutral-0'
                    : 'text-foreground-muted hover:bg-neutral-100',
                )}
              >
                {pageNumber}
              </button>
            </li>
          )
        })}
      </ol>

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label={nextLabel}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-muted transition-colors duration-(--duration-fast) hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-40"
      >
        <Icon name="chevron-right" aria-hidden="true" className="text-small rtl:rotate-180" />
      </button>
    </nav>
  )
}
