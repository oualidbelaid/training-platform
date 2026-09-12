import type { EventDTO } from '@/types/dto/event.dto'
import type { Event } from '@/types/entities/event'

export const EventMapper = {
  fromDTO(dto: EventDTO): Event {
    return {
      id: dto.id,
      slug: dto.slug,
      title: { fr: dto.title_fr, en: dto.title_en, ar: dto.title_ar },
      description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
      startDate: dto.start_date,
      format: dto.format,
      location:
        dto.location_fr && dto.location_en && dto.location_ar
          ? { fr: dto.location_fr, en: dto.location_en, ar: dto.location_ar }
          : undefined,
      image: dto.image_url,
    }
  },
}
