import { useQuery } from '@tanstack/react-query'
import { FaqService } from '@/services/faq.service'

export function useFaqs() {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: () => FaqService.getAll(),
    staleTime: 10 * 60 * 1000,
  })
}
