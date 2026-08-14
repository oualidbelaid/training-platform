import type { SuccessStoryDTO } from '@/types/dto/success-story.dto'

/**
 * Demo case studies (M4, spec §16). Client names/results are fictional
 * illustrations of the intervention pattern, not real client data — see
 * CLAUDE.md §16 "If real client cases are unavailable, clearly structure
 * them as mock content that can later be replaced." Each maps to an
 * existing training category via `category_id` where relevant.
 */
export const mockSuccessStoryDTOs: SuccessStoryDTO[] = [
  {
    id: 'ssc-vaillant-leadership',
    client_name: 'Cabinet Vaillant',
    industry_fr: 'Services professionnels',
    industry_en: 'Professional services',
    industry_ar: 'الخدمات المهنية',
    challenge_fr:
      'Une vague de promotions internes avait placé une dizaine de collaborateurs en position de management sans formation préalable, avec un risque de turnover dans les équipes.',
    challenge_en:
      'A wave of internal promotions had put a dozen employees into management roles with no prior training, creating turnover risk within their teams.',
    challenge_ar:
      'أدت موجة من الترقيات الداخلية إلى تعيين عشرة موظفين في مناصب إدارية دون تدريب مسبق، مما شكل خطر تسرب داخل الفرق.',
    approach_fr:
      'Un parcours de leadership de 6 mois combinant ateliers pratiques, mises en situation et suivi individuel avec un formateur référent.',
    approach_en:
      'A 6-month leadership pathway combining hands-on workshops, role-play scenarios and one-on-one follow-up with a dedicated trainer.',
    approach_ar:
      'مسار قيادي مدته 6 أشهر يجمع بين ورش عمل تطبيقية وتمارين محاكاة ومتابعة فردية مع مدرب مرجعي.',
    results: [
      { value: '92 %', label_fr: 'taux de satisfaction des participants', label_en: 'participant satisfaction rate', label_ar: 'معدل رضا المشاركين' },
      { value: '-40 %', label_fr: 'turnover dans les équipes concernées', label_en: 'turnover in the affected teams', label_ar: 'تسرب الموظفين في الفرق المعنية' },
      { value: '11/12', label_fr: 'managers toujours en poste un an après', label_en: 'managers still in role one year later', label_ar: 'مديرون ما زالوا في مناصبهم بعد عام' },
    ],
    category_id: 'cat-leadership-management',
  },
  {
    id: 'ssc-norda-digital',
    client_name: 'Norda Industries',
    industry_fr: 'Industrie',
    industry_en: 'Manufacturing',
    industry_ar: 'الصناعة',
    challenge_fr:
      'Le déploiement d’un nouvel ERP se heurtait à une forte résistance au changement sur les sites de production.',
    challenge_en:
      'The rollout of a new ERP system was meeting strong resistance to change on the production sites.',
    challenge_ar:
      'واجه نشر نظام تخطيط موارد المؤسسات (ERP) الجديد مقاومة قوية للتغيير في مواقع الإنتاج.',
    approach_fr:
      'Formation en présentiel des équipes site par site, avec des relais internes formés pour assurer le support après le déploiement.',
    approach_en:
      'In-person, site-by-site team training, with internal champions trained to provide support after go-live.',
    approach_ar:
      'تدريب حضوري للفرق موقعاً بموقع، مع تكوين نقاط اتصال داخلية لضمان الدعم بعد الإطلاق.',
    results: [
      { value: '+65 %', label_fr: 'adoption de l’outil dans les 3 premiers mois', label_en: 'tool adoption within the first 3 months', label_ar: 'اعتماد الأداة خلال الأشهر الثلاثة الأولى' },
      { value: '8 sites', label_fr: 'accompagnés sur l’ensemble du déploiement', label_en: 'supported across the full rollout', label_ar: 'مواقع تمت مرافقتها خلال النشر الكامل' },
    ],
    category_id: 'cat-it-digital',
  },
  {
    id: 'ssc-techbridge-project',
    client_name: 'TechBridge SA',
    industry_fr: 'Technologie',
    industry_en: 'Technology',
    industry_ar: 'التكنولوجيا',
    challenge_fr:
      'Des retards récurrents sur les projets clients faute d’une méthodologie de gestion de projet partagée entre les équipes.',
    challenge_en:
      'Recurring delays on client projects due to the lack of a project management methodology shared across teams.',
    challenge_ar:
      'تأخيرات متكررة في مشاريع العملاء بسبب غياب منهجية موحدة لإدارة المشاريع بين الفرق.',
    approach_fr:
      'Certification de 20 chefs de projet à une méthodologie commune, complétée par des ateliers de mise en pratique sur des projets réels.',
    approach_en:
      'Certified 20 project managers in a shared methodology, reinforced with hands-on workshops applied to real projects.',
    approach_ar:
      'اعتماد 20 مدير مشروع على منهجية موحدة، مدعومة بورش عمل تطبيقية على مشاريع حقيقية.',
    results: [
      { value: '-25 %', label_fr: 'de retards sur les livrables projet', label_en: 'reduction in project deliverable delays', label_ar: 'انخفاض في تأخيرات مخرجات المشاريع' },
      { value: '20', label_fr: 'chefs de projet certifiés', label_en: 'certified project managers', label_ar: 'مديرو مشاريع معتمدون' },
    ],
    category_id: 'cat-project-management',
  },
  {
    id: 'ssc-clarte-communication',
    client_name: 'Clarté Assurances',
    industry_fr: 'Banque & Finance',
    industry_en: 'Banking & Finance',
    industry_ar: 'البنوك والتمويل',
    challenge_fr:
      'Une refonte de la relation client exigeait une communication plus claire et plus homogène de la part des conseillers en agence.',
    challenge_en:
      'A customer-relationship overhaul required clearer, more consistent communication from branch advisors.',
    challenge_ar:
      'تطلب إعادة تصميم علاقة العملاء تواصلاً أوضح وأكثر تجانساً من قبل مستشاري الفروع.',
    approach_fr:
      'Ateliers de communication professionnelle et de gestion des situations délicates, déployés dans 30 agences.',
    approach_en:
      'Professional communication and difficult-conversation workshops, rolled out across 30 branches.',
    approach_ar:
      'ورش عمل في التواصل المهني وإدارة المواقف الصعبة، تم تنفيذها في 30 فرعاً.',
    results: [
      { value: '+18 pts', label_fr: 'de score de satisfaction client', label_en: 'increase in customer satisfaction score', label_ar: 'نقاط زيادة في درجة رضا العملاء' },
      { value: '30', label_fr: 'agences formées en 4 mois', label_en: 'branches trained in 4 months', label_ar: 'فروع تم تدريبها خلال 4 أشهر' },
    ],
    category_id: 'cat-communication',
  },
]
