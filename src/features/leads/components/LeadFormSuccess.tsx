import { Link as RouterLink } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { RevealOnScroll } from '@/components/motion/RevealOnScroll'

export interface LeadFormSuccessAction {
  label: string
  href: string
}

interface LeadFormSuccessProps {
  title: string
  description: string
  primaryAction: LeadFormSuccessAction
  secondaryAction?: LeadFormSuccessAction
}

/**
 * Shared post-submission confirmation (spec M5 §"Success Experience") — a
 * native `<output>` (implicit ARIA role "status") so assistive tech
 * announces it the moment it replaces the form, with no manual focus
 * management needed. Never an unexpected redirect: the form's own page
 * swaps to this panel in place.
 */
export function LeadFormSuccess({
  title,
  description,
  primaryAction,
  secondaryAction,
}: LeadFormSuccessProps) {
  return (
    <RevealOnScroll>
      <output className="flex flex-col items-center gap-6 rounded-2xl border border-border bg-surface p-10 text-center sm:p-14">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-700">
          <Icon name="check" aria-hidden="true" className="text-2xl" />
        </span>
        <div>
          <h1 className="text-h2 font-bold text-foreground">{title}</h1>
          <p className="mx-auto mt-2 max-w-md text-body-lg text-foreground-muted">{description}</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <RouterLink to={primaryAction.href}>{primaryAction.label}</RouterLink>
          </Button>
          {secondaryAction ? (
            <Button asChild size="lg" variant="outline">
              <RouterLink to={secondaryAction.href}>{secondaryAction.label}</RouterLink>
            </Button>
          ) : null}
        </div>
      </output>
    </RevealOnScroll>
  )
}
