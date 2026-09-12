import { type CSSProperties, type ImgHTMLAttributes, useState } from 'react'
import { cn } from '@/lib/cn'

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string
  aspectRatio?: string
  /** CSS `object-position` (e.g. `'center top'`) — for editorial crops where the subject isn't centered. */
  objectPosition?: string
}

/**
 * Image primitive establishing the performance/CLS pattern every image goes
 * through (spec §46, M1 §5, redesign §15B "IMAGE LOADING"/"IMAGE FALLBACK"):
 * lazy by default, async decoding, a reserved aspect-ratio box to avoid
 * layout shift, a subtle fade-in once loaded, and — new in the redesign —
 * a branded gradient fallback (never a broken-image icon) if the source
 * 404s, which still preserves the aspect ratio and layout.
 */
export function Image({
  alt,
  aspectRatio,
  objectPosition,
  loading = 'lazy',
  decoding = 'async',
  className,
  style,
  onError,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const boxStyle: CSSProperties = { aspectRatio, ...style }

  if (errored || !props.src) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        style={boxStyle}
        className={cn(
          'flex w-full items-center justify-center bg-gradient-to-br from-primary-100 via-neutral-50 to-primary-50',
          className,
        )}
      />
    )
  }

  return (
    <img
      alt={alt}
      loading={loading}
      decoding={decoding}
      onLoad={() => setLoaded(true)}
      onError={(event) => {
        setErrored(true)
        onError?.(event)
      }}
      style={{ ...boxStyle, objectPosition }}
      className={cn(
        'w-full object-cover transition-opacity duration-(--duration-slow) ease-(--ease-out)',
        loaded ? 'opacity-100' : 'opacity-0',
        className,
      )}
      {...props}
    />
  )
}
