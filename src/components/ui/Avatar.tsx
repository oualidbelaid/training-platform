import { useState } from 'react'
import { cn } from '@/lib/cn'

const sizeClasses = {
  sm: 'h-8 w-8 text-caption',
  md: 'h-11 w-11 text-small',
  lg: 'h-16 w-16 text-body',
} as const

interface AvatarProps {
  name: string
  src?: string
  size?: keyof typeof sizeClasses
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : ''
  return (first + last).toUpperCase()
}

/** Circular avatar with an initials fallback when no image is provided or the image fails to load. */
export function Avatar({ name, src, size = 'md', className }: AvatarProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const showImage = Boolean(src) && !imageFailed

  return (
    // A real <img> can't also render the text-initials fallback state, so
    // this composite container intentionally takes role="img" — the
    // standard pattern for an image-with-fallback (spec M1 §15). Suppressed
    // in .oxlintrc.json overrides for this file.
    <span
      role="img"
      aria-label={name}
      className={cn(
        'inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 font-medium text-primary-700',
        sizeClasses[size],
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span aria-hidden="true">{getInitials(name)}</span>
      )}
    </span>
  )
}
