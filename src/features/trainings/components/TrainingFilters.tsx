import { useTranslation } from 'react-i18next'
import { FilterSelect } from '@/components/ui/FilterSelect'
import { SearchBar } from '@/components/ui/SearchBar'
import type { Category } from '@/types/entities/category'
import type { SupportedLanguage } from '@/i18n'
import { getLocalizedText } from '@/utils/localized-text'

export interface TrainingFiltersValue {
  search: string
  categorySlug: string
  format: string
  level: string
  sortBy: string
}

interface TrainingFiltersProps {
  value: TrainingFiltersValue
  onChange: (patch: Partial<TrainingFiltersValue>) => void
  categories: Category[]
  language: SupportedLanguage
}

/**
 * Catalog search + filter toolbar (spec §18 "Make filtering intuitive").
 * Category/Format/Level/Sort use `FilterSelect` — a custom accessible
 * listbox popover, not a native `<select>` (M3 filter-refinement pass): a
 * native select's closed box is stylable, but its open dropdown is
 * rendered by the OS/browser and can't be, which is what a filter drawer
 * or multi-select wouldn't fix either. Not a custom multi-select or a
 * drawer beyond that — the catalog is a few dozen programs, not thousands,
 * so a simple single-select toolbar beats a more elaborate filter UI here.
 * State is owned by the caller (`TrainingCatalogPage`, synced to the URL)
 * so filters stay shareable/bookmarkable.
 */
export function TrainingFilters({ value, onChange, categories, language }: TrainingFiltersProps) {
  const { t } = useTranslation('catalog')
  const { t: tTrainings } = useTranslation('trainings')

  return (
    <div className="flex flex-col gap-4">
      <SearchBar
        label={t('filters.searchLabel')}
        placeholder={t('filters.searchPlaceholder')}
        clearLabel={t('filters.clearSearch')}
        value={value.search}
        onChange={(event) => onChange({ search: event.target.value })}
        onClear={() => onChange({ search: '' })}
        className="max-w-md"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <FilterSelect
          label={t('filters.categoryLabel')}
          placeholder={t('filters.allCategories')}
          value={value.categorySlug}
          onChange={(categorySlug) => onChange({ categorySlug })}
          options={[
            { value: '', label: t('filters.allCategories') },
            ...categories.map((category) => ({
              value: category.slug,
              label: getLocalizedText(category.name, language),
            })),
          ]}
        />
        <FilterSelect
          label={t('filters.formatLabel')}
          placeholder={t('filters.allFormats')}
          value={value.format}
          onChange={(format) => onChange({ format })}
          options={[
            { value: '', label: t('filters.allFormats') },
            { value: 'in-person', label: tTrainings('format.in-person') },
            { value: 'online', label: tTrainings('format.online') },
            { value: 'hybrid', label: tTrainings('format.hybrid') },
          ]}
        />
        <FilterSelect
          label={t('filters.levelLabel')}
          placeholder={t('filters.allLevels')}
          value={value.level}
          onChange={(level) => onChange({ level })}
          options={[
            { value: '', label: t('filters.allLevels') },
            { value: 'beginner', label: tTrainings('level.beginner') },
            { value: 'intermediate', label: tTrainings('level.intermediate') },
            { value: 'advanced', label: tTrainings('level.advanced') },
          ]}
        />
        <FilterSelect
          label={t('filters.sortLabel')}
          placeholder={t('filters.sort.relevance')}
          value={value.sortBy}
          onChange={(sortBy) => onChange({ sortBy })}
          options={[
            { value: 'relevance', label: t('filters.sort.relevance') },
            { value: 'duration-asc', label: t('filters.sort.durationAsc') },
            { value: 'duration-desc', label: t('filters.sort.durationDesc') },
          ]}
        />
      </div>
    </div>
  )
}
