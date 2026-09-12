import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/cn'

interface EmptyStateProps {
  className?: string
  title?: string
  description?: string
}

export function EmptyState({ className, title, description }: EmptyStateProps) {
  const { t } = useTranslation()

  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-lg border border-dashed border-neutral-200 py-12 text-center',
        className,
      )}
    >
      <p className="text-lg font-medium text-neutral-900">{title ?? t('feedback.empty.title')}</p>
      <p className="max-w-prose text-sm text-neutral-500">
        {description ?? t('feedback.empty.description')}
      </p>
    </div>
  )
}
