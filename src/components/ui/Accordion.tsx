import type { ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'

export interface AccordionItemData {
  id: string
  question: ReactNode
  answer: ReactNode
}

interface AccordionProps {
  items: AccordionItemData[]
  className?: string
}

/**
 * FAQ accordion built on native `<details>`/`<summary>` rather than a
 * custom ARIA-accordion widget — full keyboard support (Enter/Space to
 * toggle, native Tab order), no JS state, and screen readers announce the
 * expanded/collapsed state for free. The chevron rotation is a pure CSS
 * `group-open:` transform, so it costs nothing extra either.
 */
export function Accordion({ items, className }: AccordionProps) {
  return (
    <div
      className={cn(
        'flex flex-col divide-y divide-border rounded-2xl border border-border bg-surface',
        className,
      )}
    >
      {items.map((item) => (
        <details key={item.id} className="group p-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-body-lg font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
            {item.question}
            <Icon
              name="chevron-down"
              aria-hidden="true"
              className="shrink-0 text-small text-foreground-faint transition-transform duration-(--duration-base) group-open:rotate-180"
            />
          </summary>
          <div className="pt-3 text-body text-foreground-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  )
}
