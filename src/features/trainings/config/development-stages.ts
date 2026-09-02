import type { IconName } from '@/components/ui/Icon'
import { MEDIA } from '@/config/media'

export interface DevelopmentStage {
  /** i18n key under home.json → professionalDevelopment.stages.<key> */
  key: 'leadership' | 'management' | 'digitalTransformation' | 'communication' | 'strategy'
  icon: IconName
  image: string
  badgeClassName: string
}

/**
 * The five stages of the signature scroll-driven "Professional Development"
 * section (redesign §2–§8). Each stage pairs conceptually with its own
 * abstract visual (see media.ts / assets/images/placeholders) — the icon and
 * image are presentation, not domain data, so this lives here rather than on
 * any entity (same reasoning as category-visuals.ts).
 */
export const DEVELOPMENT_STAGES: DevelopmentStage[] = [
  {
    key: 'leadership',
    icon: 'user-group',
    image: MEDIA.leadership,
    badgeClassName: 'bg-primary-100 text-primary-600',
  },
  {
    key: 'management',
    icon: 'diagram-project',
    image: MEDIA.management,
    badgeClassName: 'bg-warning-50 text-warning-700',
  },
  {
    key: 'digitalTransformation',
    icon: 'network-wired',
    image: MEDIA.digitalTransformation,
    badgeClassName: 'bg-success-50 text-success-700',
  },
  {
    key: 'communication',
    icon: 'compass',
    image: MEDIA.communication,
    badgeClassName: 'bg-accent-400/20 text-accent-600',
  },
  {
    key: 'strategy',
    icon: 'rocket',
    image: MEDIA.strategy,
    badgeClassName: 'bg-primary-100 text-primary-600',
  },
]
