import { MEDIA } from '@/config/media'
import type { TrainerDTO } from '@/types/dto/trainer.dto'

export const mockTrainerDTOs: TrainerDTO[] = [
  {
    id: 'trn-claire-dubois',
    slug: 'claire-dubois',
    name: 'Claire Dubois',
    job_title_fr: 'Formatrice senior en management',
    job_title_en: 'Senior Management Trainer',
    job_title_ar: 'مدربة أولى في الإدارة',
    bio_fr:
      "Claire accompagne depuis quinze ans des managers et des équipes dirigeantes dans le développement de leurs compétences en leadership.",
    bio_en:
      'Claire has spent fifteen years helping managers and leadership teams develop their leadership skills.',
    bio_ar: 'تُرافق كلير منذ خمسة عشر عامًا المديرين وفرق القيادة في تطوير مهاراتهم القيادية.',
    photo_url: MEDIA.trainer1,
    is_featured: true,
  },
  {
    id: 'trn-karim-el-amrani',
    slug: 'karim-el-amrani',
    name: 'Karim El Amrani',
    job_title_fr: 'Expert en gestion de projet',
    job_title_en: 'Project Management Expert',
    job_title_ar: 'خبير في إدارة المشاريع',
    bio_fr:
      "Karim est certifié PMP et intervient auprès d'entreprises de tous secteurs pour structurer leurs pratiques de gestion de projet.",
    bio_en:
      'Karim is PMP-certified and works with companies across sectors to structure their project management practices.',
    bio_ar: 'كريم حاصل على شهادة PMP ويعمل مع شركات من مختلف القطاعات لتنظيم ممارساتها في إدارة المشاريع.',
    photo_url: MEDIA.trainer2,
    is_featured: true,
  },
  {
    id: 'trn-lina-haddad',
    slug: 'lina-haddad',
    name: 'Lina Haddad',
    job_title_fr: 'Consultante en transformation digitale',
    job_title_en: 'Digital Transformation Consultant',
    job_title_ar: 'مستشارة التحول الرقمي',
    bio_fr:
      "Lina conçoit des parcours de formation sur mesure pour aider les équipes à adopter les outils numériques et les nouvelles méthodes de travail.",
    bio_en:
      'Lina designs tailored learning journeys that help teams adopt digital tools and new ways of working.',
    bio_ar: 'تصمم لينا مسارات تدريبية مخصصة لمساعدة الفرق على تبني الأدوات الرقمية وأساليب العمل الجديدة.',
    photo_url: MEDIA.trainer3,
    is_featured: true,
  },
  {
    id: 'trn-sophie-laurent',
    slug: 'sophie-laurent',
    name: 'Sophie Laurent',
    job_title_fr: 'Formatrice en leadership et développement managérial',
    job_title_en: 'Leadership & Management Development Trainer',
    job_title_ar: 'مدربة في القيادة وتطوير الإدارة',
    bio_fr:
      'Sophie accompagne les cadres et futurs managers dans le développement de leur posture de leader et de leur impact au sein des équipes.',
    bio_en:
      'Sophie helps executives and emerging managers develop their leadership presence and their impact within their teams.',
    bio_ar: 'ترافق صوفي الكوادر والمديرين الجدد في تطوير حضورهم القيادي وتأثيرهم داخل فرقهم.',
    photo_url: MEDIA.trainer4,
    is_featured: true,
  },
  {
    id: 'trn-nadia-cherif',
    slug: 'nadia-cherif',
    name: 'Nadia Cherif',
    job_title_fr: "Formatrice en finance d'entreprise",
    job_title_en: 'Corporate Finance Trainer',
    job_title_ar: 'مدربة في مالية الشركات',
    bio_fr:
      'Nadia forme les équipes financières et les managers non-financiers à la lecture des indicateurs clés et à la prise de décision budgétaire.',
    bio_en:
      'Nadia trains finance teams and non-financial managers to read key indicators and make sound budgeting decisions.',
    bio_ar: 'تدرّب نادية الفرق المالية والمديرين غير الماليين على قراءة المؤشرات الرئيسية واتخاذ قرارات الميزانية.',
    photo_url: MEDIA.trainer5,
    is_featured: true,
  },
  {
    id: 'trn-amel-rahmouni',
    slug: 'amel-rahmouni',
    name: 'Amel Rahmouni',
    job_title_fr: 'Formatrice en communication professionnelle',
    job_title_en: 'Professional Communication Trainer',
    job_title_ar: 'مدربة في التواصل المهني',
    bio_fr:
      "Amel aide les professionnels à gagner en clarté et en impact à l'oral, que ce soit face à une équipe, un client ou un comité de direction.",
    bio_en:
      'Amel helps professionals communicate with clarity and impact, whether addressing a team, a client, or an executive committee.',
    bio_ar: 'تساعد أمل المحترفين على التواصل بوضوح وتأثير، سواء أمام فريق أو عميل أو لجنة تنفيذية.',
    photo_url: MEDIA.trainer6,
    is_featured: true,
  },
  {
    id: 'trn-yacine-boukhalfa',
    slug: 'yacine-boukhalfa',
    name: 'Yacine Boukhalfa',
    job_title_fr: 'Consultant en ressources humaines',
    job_title_en: 'Human Resources Consultant',
    job_title_ar: 'استشاري في الموارد البشرية',
    bio_fr:
      'Yacine accompagne les entreprises dans la structuration de leurs politiques RH et le développement de leurs talents.',
    bio_en: 'Yacine helps companies structure their HR policies and develop their talent.',
    bio_ar: 'يرافق ياسين الشركات في هيكلة سياساتها الخاصة بالموارد البشرية وتطوير كفاءاتها.',
    photo_url: MEDIA.trainer7,
    is_featured: true,
  },
  {
    id: 'trn-thomas-girard',
    slug: 'thomas-girard',
    name: 'Thomas Girard',
    job_title_fr: "Formateur en technologies de l'information",
    job_title_en: 'IT & Technology Trainer',
    job_title_ar: 'مدرب في تقنية المعلومات',
    bio_fr:
      'Thomas initie les équipes aux outils numériques et aux bonnes pratiques technologiques adaptées à leur métier.',
    bio_en:
      "Thomas introduces teams to digital tools and the technology practices best suited to their day-to-day work.",
    bio_ar: 'يعرّف توماس الفرق بالأدوات الرقمية وأفضل الممارسات التقنية المناسبة لعملهم.',
    photo_url: MEDIA.trainer8,
    is_featured: true,
  },
  {
    id: 'trn-julien-moreau',
    slug: 'julien-moreau',
    name: 'Julien Moreau',
    job_title_fr: 'Formateur en techniques de vente',
    job_title_en: 'Sales Techniques Trainer',
    job_title_ar: 'مدرب في تقنيات البيع',
    bio_fr:
      'Julien forme les équipes commerciales aux techniques de vente et de négociation qui font la différence sur le terrain.',
    bio_en:
      'Julien trains sales teams in the selling and negotiation techniques that make a real difference in the field.',
    bio_ar: 'يدرّب جوليان فرق المبيعات على تقنيات البيع والتفاوض التي تصنع الفارق ميدانيًا.',
    photo_url: MEDIA.trainer9,
    is_featured: true,
  },
  {
    id: 'trn-nicolas-petit',
    slug: 'nicolas-petit',
    name: 'Nicolas Petit',
    job_title_fr: 'Coach en développement professionnel',
    job_title_en: 'Professional Development Coach',
    job_title_ar: 'مدرب في التطوير المهني',
    bio_fr:
      'Nicolas accompagne les professionnels dans la définition de leurs objectifs de carrière et le développement de leurs compétences clés.',
    bio_en:
      'Nicolas helps professionals define their career goals and develop the key skills to reach them.',
    bio_ar: 'يرافق نيكولا المحترفين في تحديد أهدافهم المهنية وتطوير مهاراتهم الأساسية.',
    photo_url: MEDIA.trainer10,
    is_featured: true,
  },
]
