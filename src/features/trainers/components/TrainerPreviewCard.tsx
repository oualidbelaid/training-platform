import { Card, CardContent } from '@/components/ui/Card'
import { Image } from '@/components/ui/Image'
import type { SupportedLanguage } from '@/i18n'
import type { Trainer } from '@/types/entities/trainer'
import { getLocalizedText } from '@/utils/localized-text'

interface TrainerPreviewCardProps {
  trainer: Trainer
  language: SupportedLanguage
}

/**
 * Compact professional-directory card (branding refinement §5, shrunk
 * further in the trainer-roster update §1 — same card design/radius/
 * shadow/hover/typography style, smaller footprint: a shorter 3:4 portrait
 * instead of 4:5, tighter padding, and the name stepped down one type-scale
 * token). Small portrait, name, role — nothing else — so 5+ fit per row on
 * large desktop without feeling cramped.
 *
 * Alt text is meaningful ("<name> — <role>"), not decorative, since the
 * photo is the primary identifying visual for a specific named person. A
 * subtle hover scale (1 → 1.03, CSS-only — respects the global
 * prefers-reduced-motion kill-switch in globals.css without extra JS) is
 * unchanged from before.
 */
export function TrainerPreviewCard({ trainer, language }: TrainerPreviewCardProps) {
  const role = getLocalizedText(trainer.jobTitle, language)

  return (
    <Card className="group h-full overflow-hidden" hoverable>
      <Image
        src={trainer.photoUrl}
        alt={`${trainer.name} — ${role}`}
        aspectRatio="3 / 4"
        objectPosition="center top"
        className="transition duration-(--duration-slow) ease-(--ease-out) group-hover:scale-[1.03]"
      />
      <CardContent className="flex flex-col gap-0.5 p-3">
        <p className="text-caption font-semibold text-foreground">{trainer.name}</p>
        <p className="text-caption text-brand">{role}</p>
      </CardContent>
    </Card>
  )
}
