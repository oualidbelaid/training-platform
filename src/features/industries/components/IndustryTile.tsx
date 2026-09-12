import { Icon, type IconName } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

interface IndustryTileProps {
  name: string
  description: string
  icon: IconName
  badgeClassName: string
}

/**
 * Non-interactive display tile (spec §9 — industries are content
 * categories, not a filter into the catalog, so unlike `CategoryTile` this
 * doesn't link anywhere). Same icon-badge + name + description visual
 * language as `CategoryTile`'s compact treatment, without borrowing the
 * component itself (it's tied to `/trainings?category=` navigation).
 */
export function IndustryTile({ name, description, icon, badgeClassName }: IndustryTileProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl border border-border bg-surface p-7 shadow-sm">
      <span
        className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', badgeClassName)}
      >
        <Icon name={icon} aria-hidden="true" className="text-2xl" />
      </span>
      <div>
        <p className="text-h3 font-semibold text-foreground">{name}</p>
        <p className="mt-2 text-body text-foreground-muted">{description}</p>
      </div>
    </div>
  )
}
