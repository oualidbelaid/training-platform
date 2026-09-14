import { describe, expect, it } from 'vitest'
import type { Category } from '@/types/entities/category'
import type { TrainingDomain } from '@/types/entities/training-domain'
import { groupDomainsByCategory } from './group-domains-by-category'

const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'leadership',
    name: { fr: 'Leadership', en: 'Leadership', ar: 'القيادة' },
    description: { fr: '', en: '', ar: '' },
  },
  {
    id: 'cat-2',
    slug: 'digital',
    name: { fr: 'Digital', en: 'Digital', ar: 'رقمي' },
    description: { fr: '', en: '', ar: '' },
  },
  {
    id: 'cat-3',
    slug: 'empty-category',
    name: { fr: 'Vide', en: 'Empty', ar: 'فارغة' },
    description: { fr: '', en: '', ar: '' },
  },
]

const domains: TrainingDomain[] = [
  {
    id: 'dom-1',
    slug: 'management-equipe',
    categoryId: 'cat-1',
    name: { fr: "Management d'équipe", en: 'Team Management', ar: 'إدارة الفريق' },
    courses: [
      { name: { fr: 'Conduite du changement', en: 'Change Management', ar: 'إدارة التغيير' } },
    ],
  },
  {
    id: 'dom-2',
    slug: 'transformation-digitale',
    categoryId: 'cat-2',
    name: { fr: 'Transformation digitale', en: 'Digital Transformation', ar: 'التحول الرقمي' },
    courses: [{ name: { fr: 'Cybersécurité', en: 'Cybersecurity', ar: 'الأمن السيبراني' } }],
  },
]

describe('groupDomainsByCategory', () => {
  it('groups every domain under its category, in category order, with no search', () => {
    const groups = groupDomainsByCategory(categories, domains, '', 'fr')

    expect(groups).toHaveLength(2)
    expect(groups[0]?.category.slug).toBe('leadership')
    expect(groups[0]?.domains).toHaveLength(1)
    expect(groups[1]?.category.slug).toBe('digital')
  })

  it('drops a category with zero domains', () => {
    const groups = groupDomainsByCategory(categories, domains, '', 'fr')

    expect(groups.some((group) => group.category.slug === 'empty-category')).toBe(false)
  })

  it('matches a search query against a domain name', () => {
    const groups = groupDomainsByCategory(categories, domains, 'transformation', 'fr')

    expect(groups).toHaveLength(1)
    expect(groups[0]?.category.slug).toBe('digital')
  })

  it('matches a search query against a course name nested inside a domain', () => {
    const groups = groupDomainsByCategory(categories, domains, 'cybersécurité', 'fr')

    expect(groups).toHaveLength(1)
    expect(groups[0]?.domains[0]?.slug).toBe('transformation-digitale')
  })

  it('is case-insensitive', () => {
    const groups = groupDomainsByCategory(categories, domains, 'CYBERSÉCURITÉ', 'fr')

    expect(groups).toHaveLength(1)
  })

  it('excludes a whole category when nothing inside it matches the search', () => {
    const groups = groupDomainsByCategory(categories, domains, 'nonexistent-keyword', 'fr')

    expect(groups).toHaveLength(0)
  })

  it('searches using the localized text for the given language', () => {
    const groups = groupDomainsByCategory(categories, domains, 'team management', 'en')

    expect(groups).toHaveLength(1)
    expect(groups[0]?.category.slug).toBe('leadership')
  })
})
