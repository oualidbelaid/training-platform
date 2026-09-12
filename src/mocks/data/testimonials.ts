import type { TestimonialDTO } from '@/types/dto/testimonial.dto'

export const mockTestimonialDTOs: TestimonialDTO[] = [
  {
    id: 'tst-sophie-martin',
    author_name: 'Sophie Martin',
    author_role_fr: 'Responsable RH, Groupe Meridia',
    author_role_en: 'HR Manager, Meridia Group',
    author_role_ar: 'مديرة الموارد البشرية، مجموعة ميريديا',
    quote_fr:
      'Nos managers ont gagné en confiance et en clarté dès les premières semaines suivant la formation. Une équipe pédagogique très professionnelle.',
    quote_en:
      'Our managers gained confidence and clarity within weeks of the training. A highly professional teaching team.',
    quote_ar:
      'اكتسب مديرونا الثقة والوضوح خلال الأسابيع الأولى بعد التدريب. فريق تعليمي محترف للغاية.',
    training_id: 'trg-leadership-new-managers',
  },
  {
    id: 'tst-youssef-benali',
    author_name: 'Youssef Benali',
    author_role_fr: 'Directeur de projets, Atlas Industries',
    author_role_en: 'Head of Projects, Atlas Industries',
    author_role_ar: 'مدير المشاريع، أطلس إندستريز',
    quote_fr:
      'La formation en gestion de projet nous a donné un cadre commun que toutes nos équipes utilisent désormais au quotidien.',
    quote_en:
      'The project management training gave our teams a shared framework they now use every day.',
    quote_ar: 'منحنا التدريب على إدارة المشاريع إطار عمل مشترك تستخدمه فرقنا الآن يوميًا.',
    training_id: 'trg-project-management-fundamentals',
  },
  {
    id: 'tst-elise-laurent',
    author_name: 'Élise Laurent',
    author_role_fr: 'Directrice financière, NovaCorp',
    author_role_en: 'CFO, NovaCorp',
    author_role_ar: 'المديرة المالية، نوفاكورب',
    quote_fr:
      'Un accompagnement sur mesure et des formateurs qui comprennent réellement les enjeux de nos équipes.',
    quote_en: 'A tailored approach with trainers who genuinely understand our teams’ challenges.',
    quote_ar: 'مرافقة مخصصة ومدربون يفهمون حقًا تحديات فرقنا.',
  },
  {
    id: 'tst-karim-idrissi',
    author_name: 'Karim Idrissi',
    author_role_fr: 'Responsable transformation digitale, Fedra Bank',
    author_role_en: 'Digital Transformation Lead, Fedra Bank',
    author_role_ar: 'مسؤول التحول الرقمي، فيدرا بنك',
    quote_fr:
      'Le programme a su rendre concrets des concepts qui restaient jusque-là très théoriques pour nos équipes métier.',
    quote_en:
      'The program made concepts that had stayed largely theoretical for our business teams genuinely concrete.',
    quote_ar:
      'جعل البرنامج مفاهيم كانت لا تزال نظرية إلى حد كبير بالنسبة لفرقنا التشغيلية ملموسة فعلاً.',
    training_id: 'trg-digital-transformation-essentials',
  },
  {
    id: 'tst-lea-dupont',
    author_name: 'Léa Dupont',
    author_role_fr: 'Contrôleuse de gestion, Horizon Retail Group',
    author_role_en: 'Financial Controller, Horizon Retail Group',
    author_role_ar: 'مراقبة مالية، هورايزن ريتيل غروب',
    quote_fr:
      'Formatrice disponible, exemples tirés de cas réels : exactement ce dont nos équipes finance avaient besoin.',
    quote_en:
      'An approachable trainer and real-world examples — exactly what our finance teams needed.',
    quote_ar: 'مدربة متاحة وأمثلة من حالات واقعية — بالضبط ما كانت تحتاجه فرقنا المالية.',
    training_id: 'trg-advanced-excel-financial-analysis',
  },
  {
    id: 'tst-marc-lefevre',
    author_name: 'Marc Lefèvre',
    author_role_fr: 'DRH, Cabinet Delacroix & Associés',
    author_role_en: 'HR Director, Cabinet Delacroix & Associés',
    author_role_ar: 'مدير الموارد البشرية، مكتب دولاكروا وشركاه',
    quote_fr:
      'Une formation qui a immédiatement changé la façon dont nos équipes RH mènent leurs entretiens.',
    quote_en: 'A training that immediately changed how our HR teams conduct their interviews.',
    quote_ar: 'تدريب غيّر فوراً طريقة إجراء فرق الموارد البشرية لمقابلاتها.',
    training_id: 'trg-hr-skills-development',
  },
  {
    id: 'tst-nadia-cherif',
    author_name: 'Nadia Cherif',
    author_role_fr: 'Chargée de communication, NovaTech Solutions',
    author_role_en: 'Communications Officer, NovaTech Solutions',
    author_role_ar: 'مسؤولة الاتصال، نوفاتك سوليوشنز',
    quote_fr:
      'Des outils simples et directement applicables pour nos prises de parole en interne comme en externe.',
    quote_en: 'Simple, directly applicable tools for both internal and external communication.',
    quote_ar: 'أدوات بسيطة وقابلة للتطبيق مباشرة في تواصلنا الداخلي والخارجي.',
    training_id: 'trg-professional-communication',
  },
]
