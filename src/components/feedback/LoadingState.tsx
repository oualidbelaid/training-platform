import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

interface LoadingStateProps {
  className?: string
  label?: string
}

export function LoadingState({ className, label }: LoadingStateProps) {
  const { t } = useTranslation()

  return (
    <output
      aria-live="polite"
      className={cn('flex items-center justify-center gap-3 py-12 text-neutral-500', className)}
    >
      <span
        aria-hidden="true"
        className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary-600"
      />
      <span>{label ?? t('feedback.loading')}</span>
    </output>
  )
}
