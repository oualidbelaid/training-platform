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
 * small marks, not content photography) plus the name and a short
 * description, which the marquee has no room for.
 *
 * `partner.logoUrl` is optional: some real ISTAM clients from the official
 * presentation have no rights-appropriate logo file sourced yet (see
 * `mocks/data/partners.ts`). Rather than pair a real company name with an
 * unrelated placeholder mark, those render as a plain text wordmark tile —
 * honest incompleteness instead of a fabricated logo.
 */
export function PartnerCard({ partner, language }: PartnerCardProps) {
  return (
    <Card className="h-full" hoverable={false}>
      <CardContent className="flex h-full flex-col gap-4">
        {partner.logoUrl ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            loading="lazy"
            decoding="async"
            className="h-9 w-auto max-w-[9rem] object-contain"
          />
        ) : (
          <span className="flex h-9 w-fit max-w-[9rem] items-center rounded-md border border-border px-2.5 text-small font-semibold text-foreground-muted">
            {partner.name}
          </span>
        )}
        <p className="text-body-lg font-semibold text-foreground">{partner.name}</p>
        <p className="flex-1 text-body text-foreground-muted">
          {getLocalizedText(partner.description, language)}
        </p>
      </CardContent>
    </Card>
  )
}
