import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

const iconButtonVariants = cva(
  [
    'inline-flex shrink-0 items-center justify-center rounded-md',
    'transition-colors duration-(--duration-fast) ease-(--ease-out)',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-neutral-0 hover:bg-primary-700',
        outline: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
        ghost: 'text-neutral-700 hover:bg-neutral-100',
        // M8 a11y audit: see the matching comment in Button.tsx — the
        // shared base focus ring isn't visible enough on dark backgrounds.
        inverse: 'text-neutral-0 hover:bg-neutral-0/10 focus-visible:outline-neutral-0',
      },
      size: {
        sm: 'h-9 w-9',
        md: 'h-11 w-11',
      },
    },
    defaultVariants: {
      variant: 'ghost',
      size: 'md',
    },
  },
)

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /** Required — an icon-only button has no accessible name without it. */
  'aria-label': string
}

/**
 * Icon-only action button. `aria-label` is required at the type level
 * because there is no visible text to give the control an accessible name
 * (spec M1 §15).
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(iconButtonVariants({ variant, size }), className)}
        {...props}
      />
    )
  },
)

IconButton.displayName = 'IconButton'
