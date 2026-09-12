import { forwardRef } from 'react'
import { Select, type SelectProps } from '@/components/ui/Select'
import { useTrainings } from '@/features/trainings/hooks/useTrainings'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

interface TrainingSelectFieldProps extends Omit<SelectProps, 'options'> {
  language: SupportedLanguage
}

/**
 * Training/program picker shared by Request Information, Request a Quote
 * and Register Interest — each needs the exact same "fetch every training,
 * show it in the active language" list, keyed by `training.id` (matching
 * `Lead.trainingId`, an id — not a slug, unlike the `?training=` URL param
 * the Training Details page's CTAs already pass, which is a slug; the
 * pages resolve slug → id once trainings load, see each page's `useEffect`).
 */
export const TrainingSelectField = forwardRef<HTMLSelectElement, TrainingSelectFieldProps>(
  ({ language, ...props }, ref) => {
    const trainingsQuery = useTrainings({ pageSize: 100 })
    const options = (trainingsQuery.data?.items ?? []).map((training) => ({
      value: training.id,
      label: getLocalizedText(training.title, language),
    }))

    return <Select ref={ref} options={options} {...props} />
  },
)

TrainingSelectField.displayName = 'TrainingSelectField'
