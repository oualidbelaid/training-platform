import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/seo/Seo'

export default function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <>
      <Seo title={t('notFound.title')} description={t('notFound.description')} noIndex />
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-sm font-medium tracking-wide text-primary-600">404</p>
        <h1 className="text-3xl font-semibold text-neutral-900">{t('notFound.title')}</h1>
        <p className="max-w-prose text-neutral-500">{t('notFound.description')}</p>
        <Button asChild>
          <Link to="/">{t('notFound.cta')}</Link>
        </Button>
      </div>
    </>
  )
}
