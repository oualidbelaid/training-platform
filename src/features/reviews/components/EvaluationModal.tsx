import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { RatingInput } from '@/components/ui/RatingInput'
import { Textarea } from '@/components/ui/Textarea'
import { useSubmitReview } from '@/features/reviews/hooks/useSubmitReview'
import { buildReviewSchema, type ReviewFormValues } from '@/features/reviews/schemas/review.schema'

interface EvaluationModalProps {
  open: boolean
  onClose: () => void
}

const TITLE_ID = 'evaluation-modal-title'
const DESCRIPTION_ID = 'evaluation-modal-description'

/**
 * Only two fields, per spec — no name/training-selection field. `rating`
 * isn't a native form control, so it's wired through RHF via `Controller`
 * rather than `register`. Success is rendered in place of the form (the
 * modal itself stays open) so the visitor sees confirmation before choosing
 * to close it — no auto-close, matching `LeadFormSuccess`'s "never an
 * unexpected redirect" precedent for the full-page lead forms.
 */
export function EvaluationModal({ open, onClose }: EvaluationModalProps) {
  const { t } = useTranslation('reviews')
  const mutation = useSubmitReview()

  const schema = useMemo(() => buildReviewSchema(t), [t])
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: { rating: 0, comment: '' },
  })

  function handleClose() {
    onClose()
    // Reset after the exit animation finishes so the form/success content
    // doesn't visibly change while the modal is still fading out.
    window.setTimeout(() => {
      reset()
      mutation.reset()
    }, 200)
  }

  function onSubmit(values: ReviewFormValues) {
    mutation.mutate(values)
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      titleId={TITLE_ID}
      title={t('modal.title')}
      descriptionId={DESCRIPTION_ID}
      description={mutation.isSuccess ? undefined : t('modal.description')}
      closeLabel={t('modal.close')}
    >
      {mutation.isSuccess ? (
        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-success-50 text-success-700">
            <Icon name="check" aria-hidden="true" className="text-xl" />
          </span>
          <p className="text-body-lg font-semibold text-foreground">{t('modal.success.title')}</p>
          <p className="text-body text-foreground-muted">{t('modal.success.description')}</p>
          <Button onClick={handleClose}>{t('modal.success.cta')}</Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <RatingInput
                value={field.value}
                onChange={field.onChange}
                label={t('modal.fields.rating.label')}
                starLabel={(value, max) => t('modal.fields.rating.starLabel', { value, max })}
                error={errors.rating?.message}
              />
            )}
          />
          <Textarea
            label={t('modal.fields.comment.label')}
            placeholder={t('modal.fields.comment.placeholder')}
            required
            error={errors.comment?.message}
            {...register('comment')}
          />
          {mutation.isError ? (
            <p role="alert" className="text-small text-error-600">
              {t('modal.error')}
            </p>
          ) : null}
          <Button type="submit" size="lg" loading={mutation.isPending} disabled={!isValid}>
            {mutation.isPending ? t('modal.actions.submitting') : t('modal.actions.submit')}
          </Button>
        </form>
      )}
    </Modal>
  )
}
