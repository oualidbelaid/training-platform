import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

interface ErrorStateProps {
  className?: string
  title?: string
  description?: string
  onRetry?: () => void
}

export function ErrorState({ className, title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation()

  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-3 rounded-lg border border-neutral-200 py-12 text-center',
        className,
      )}
    >
      <p className="text-lg font-medium text-neutral-900">{title ?? t('feedback.error.title')}</p>
      <p className="max-w-prose text-sm text-neutral-500">
        {description ?? t('feedback.error.description')}
      </p>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          {t('feedback.error.retry')}
        </Button>
      ) : null}
    </div>
  )
}
