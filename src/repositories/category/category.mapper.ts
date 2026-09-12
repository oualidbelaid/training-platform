import type { CategoryDTO } from '@/types/dto/category.dto'
import type { Category } from '@/types/entities/category'

export const CategoryMapper = {
  fromDTO(dto: CategoryDTO): Category {
    return {
      id: dto.id,
      slug: dto.slug,
      name: { fr: dto.name_fr, en: dto.name_en, ar: dto.name_ar },
      description: { fr: dto.description_fr, en: dto.description_en, ar: dto.description_ar },
    }
  },
}
