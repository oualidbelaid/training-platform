import type { SupportedLanguage } from '@/i18n'
import type { Category } from '@/types/entities/category'
import type { TrainingDomain } from '@/types/entities/training-domain'
import { getLocalizedText } from '@/utils/localized-text'

export interface CategoryDomainsGroup {
  category: Category
  domains: TrainingDomain[]
}

function matchesSearch(
  domain: TrainingDomain,
  query: string,
  language: SupportedLanguage,
): boolean {
  if (getLocalizedText(domain.name, language).toLowerCase().includes(query)) return true
  return domain.courses.some((course) =>
    getLocalizedText(course.name, language).toLowerCase().includes(query),
  )
}

/**
 * Groups every `TrainingDomain` under its `Category`, in `categories`' own
 * order, optionally narrowed by a case-insensitive search over domain and
 * course names. A category whose domain list ends up empty (no domains at
 * all, or none matching the search) is dropped entirely — the Catalog page
 * only ever renders a section for a category that actually has content to
 * show, same rule the single-category accordion block used before this.
 */
export function groupDomainsByCategory(
  categories: Category[],
  domains: TrainingDomain[],
  searchQuery: string,
  language: SupportedLanguage,
): CategoryDomainsGroup[] {
  const query = searchQuery.trim().toLowerCase()
  const matchingDomains = query
    ? domains.filter((domain) => matchesSearch(domain, query, language))
    : domains

  return categories
    .map((category) => ({
      category,
      domains: matchingDomains.filter((domain) => domain.categoryId === category.id),
    }))
    .filter((group) => group.domains.length > 0)
}
