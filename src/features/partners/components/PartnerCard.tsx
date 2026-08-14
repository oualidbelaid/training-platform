import { Card, CardContent } from '@/components/ui/Card'
import type { SupportedLanguage } from '@/i18n'
import type { Partner } from '@/types/entities/partner'
import { getLocalizedText } from '@/utils/localized-text'

interface PartnerCardProps {
  partner: Partner
  language: SupportedLanguage
}

/**
 * Partners page card — logo treatment matches the Home Page's
 * `TrustLogosSection` (plain `<img>`, no `Image` aspect-ratio box; these are
 * small placeholder marks, not content photography) plus the name and a
 * short collaboration description, which the marquee has no room for.
 */
export function PartnerCard({ partner, language }: PartnerCardProps) {
  return (
    <Card className="h-full" hoverable={false}>
      <CardContent className="flex h-full flex-col gap-4">
        <img src={partner.logoUrl} alt={partner.name} loading="lazy" decoding="async" className="h-9 w-auto max-w-[9rem] object-contain" />
        <p className="text-body-lg font-semibold text-foreground">{partner.name}</p>
        <p className="flex-1 text-body text-foreground-muted">{getLocalizedText(partner.description, language)}</p>
      </CardContent>
    </Card>
  )
}
