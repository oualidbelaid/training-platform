import type { ArticleDTO } from '@/types/dto/article.dto'
import type { Article } from '@/types/entities/article'

export const ArticleMapper = {
  fromDTO(dto: ArticleDTO): Article {
    return {
      id: dto.id,
      slug: dto.slug,
      title: { fr: dto.title_fr, en: dto.title_en, ar: dto.title_ar },
      excerpt: { fr: dto.excerpt_fr, en: dto.excerpt_en, ar: dto.excerpt_ar },
      content: { fr: dto.content_fr, en: dto.content_en, ar: dto.content_ar },
      category: { fr: dto.category_fr, en: dto.category_en, ar: dto.category_ar },
      authorName: dto.author_name,
      publishedDate: dto.published_date,
      readingTimeMinutes: dto.reading_time_minutes,
      image: dto.image_url,
      featured: dto.is_featured,
    }
  },
}
