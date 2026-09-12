import { cn } from '@/lib/cn'

interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * Horizontal uses a native <hr> (semantic, no ARIA needed). Vertical has no
 * native HTML equivalent, so it's a decorative, aria-hidden div — purely
 * visual separation between elements, never conveying document structure
 * (spec M1 §14/§15). Both rely on logical border properties: `border-t` is
 * direction-agnostic and `border-s` maps to `border-inline-start`, so
 * neither needs RTL-specific overrides.
 */
export function Divider({ orientation = 'horizontal', className }: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <div aria-hidden="true" className={cn('h-full w-px border-s border-border', className)} />
    )
  }

  return <hr className={cn('h-px w-full border-0 border-t border-border', className)} />
}
