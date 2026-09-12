import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    'text-button transition-colors duration-(--duration-fast) ease-(--ease-out)',
    'disabled:pointer-events-none disabled:opacity-50',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
  ],
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-neutral-0 hover:bg-primary-700 hover:shadow-brand',
        secondary: 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200',
        outline: 'border border-neutral-300 text-neutral-900 hover:bg-neutral-50',
        ghost: 'text-neutral-900 hover:bg-neutral-100',
        // M8 a11y audit: the shared base `focus-visible:outline-primary-500`
        // is only 2.75:1 against the neutral-900/950 backgrounds this
        // variant is used on (CompaniesSection, ProfessionalDevelopmentSection,
        // dark CtaBanner usages) — fails the 3:1 non-text contrast minimum.
        // Overridden here to a white ring (19.67:1 on neutral-900).
        inverse:
          'border border-neutral-0/40 text-neutral-0 hover:bg-neutral-0/10 focus-visible:outline-neutral-0',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, disabled, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    // Slot (Radix) requires exactly one React element child, so the loading
    // spinner can only be spliced in for the real <button> case — asChild
    // must forward `children` untouched, with no sibling node alongside it.
    const content =
      loading && !asChild ? (
        <>
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          />
          {children}
        </>
      ) : (
        children
      )

    return (
      <Comp
        ref={ref}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {content}
      </Comp>
    )
  },
)

Button.displayName = 'Button'
