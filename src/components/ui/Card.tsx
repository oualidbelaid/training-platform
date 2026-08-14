import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { Image, type ImageProps } from '@/components/ui/Image'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

/**
 * Card primitive (spec M1 §7). Provides surface/border/radius/shadow and an
 * optional hover-depth transition — business cards (TrainingCard,
 * TrainerCard, etc., built in later milestones) compose this with
 * CardImage/CardContent/CardFooter rather than reimplementing the surface.
 */
export function Card({ hoverable = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-sm',
        hoverable &&
          'transition-shadow duration-(--duration-base) ease-(--ease-premium) hover:shadow-lg',
        className,
      )}
      {...props}
    />
  )
}

interface CardImageProps extends Omit<ImageProps, 'aspectRatio'> {
  aspectRatio?: string
}

export function CardImage({ className, aspectRatio = '16 / 9', ...props }: CardImageProps) {
  return (
    <div className="w-full overflow-hidden bg-neutral-100">
      <Image aspectRatio={aspectRatio} className={cn('h-full', className)} {...props} />
    </div>
  )
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex-1 p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('border-t border-border p-6 pt-4', className)} {...props} />
}
