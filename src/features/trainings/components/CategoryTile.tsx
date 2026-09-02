import { useTranslation } from 'react-i18next'
import { TiltCard } from '@/components/motion/TiltCard'
import { Icon, type IconName } from '@/components/ui/Icon'
import { Link } from '@/components/ui/Link'
import { cn } from '@/lib/cn'
import type { Category } from '@/types/entities/category'

interface CategoryTileProps {
  category: Category
  name: string
  description: string
  programCount: number
  icon: IconName
  badgeClassName: string
  /**
   * `featured` — the single dominant panel (large typography, full
   * description, tilt depth). `compact` — a slim list row for the
   * supporting categories, deliberately not a second card shape, so the
   * section reads as "one large panel + a list" rather than a repeated
   * grid (redesign §12).
   */
  variant?: 'featured' | 'compact'
}

export function CategoryTile({
  category,
  name,
  description,
  programCount,
  icon,
  badgeClassName,
  variant = 'featured',
}: CategoryTileProps) {
  const { t } = useTranslation('trainings')

  if (variant === 'compact') {
    return (
      <Link
        href={`/trainings?category=${category.slug}`}
        variant="subtle"
        className="group flex items-center gap-4 border-b border-border py-5 no-underline transition-colors duration-(--duration-base) first:pt-0 last:border-b-0 last:pb-0 hover:px-3 hover:bg-surface-subtle"
      >
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-(--duration-base) group-hover:scale-110',
            badgeClassName,
          )}
        >
          <Icon name={icon} aria-hidden="true" className="text-xl" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-body-lg font-semibold text-foreground">{name}</span>
          <span className="block text-caption text-foreground-faint">
            {t('programCount', { count: programCount })}
          </span>
        </span>
        <Icon
          name="arrow-right"
          aria-hidden="true"
          className="text-base shrink-0 text-foreground-faint transition-all duration-(--duration-fast) group-hover:translate-x-1 group-hover:text-brand rtl:rotate-180 rtl:group-hover:-translate-x-1"
        />
      </Link>
    )
  }

  return (
    <TiltCard maxTilt={3} className="h-full">
      <Link
        href={`/trainings?category=${category.slug}`}
        variant="subtle"
        className="group relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-7 no-underline shadow-sm transition-all duration-(--duration-base) hover:-translate-y-0.5 hover:shadow-lg sm:p-9"
      >
        <div
          aria-hidden="true"
          className={cn(
            'absolute -end-16 -top-16 h-56 w-56 rounded-full opacity-[0.07] transition-transform duration-(--duration-slow) group-hover:scale-110',
            badgeClassName.split(' ')[0],
          )}
        />

        <div className="relative flex flex-col gap-4">
          <span
            className={cn(
              'flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-(--duration-base) group-hover:scale-110',
              badgeClassName,
            )}
          >
            <Icon name={icon} aria-hidden="true" className="text-2xl" />
          </span>
          <div>
            <p className="text-h2 font-extrabold text-foreground">{name}</p>
            <p className="mt-2 max-w-md text-body text-foreground-muted">{description}</p>
          </div>
        </div>

        <div className="relative flex items-center justify-between gap-2 pt-6">
          <span className="text-small font-medium text-foreground-faint">
            {t('programCount', { count: programCount })}
          </span>
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-surface-subtle text-foreground-faint transition-all duration-(--duration-fast) group-hover:bg-primary-600 group-hover:text-neutral-0"
          >
            <Icon name="arrow-right" className="text-base rtl:rotate-180" />
          </span>
        </div>
      </Link>
    </TiltCard>
  )
}
