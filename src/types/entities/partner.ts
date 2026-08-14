import type { LocalizedText } from '@/types/entities/common'

export interface Partner {
  id: string
  name: string
  logoUrl: string
  description: LocalizedText
}
