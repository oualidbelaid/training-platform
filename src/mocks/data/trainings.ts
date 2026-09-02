import { MEDIA } from '@/config/media'
import type { TrainingDTO } from '@/types/dto/training.dto'

/**
 * Authored in the same shape as TrainingDTO (the anticipated Dolibarr
 * payload) rather than the clean Training entity, so MockTrainingRepository
 * exercises TrainingMapper.fromDTO exactly like DolibarrTrainingRepository
 * eventually will (see docs/DOLIBARR_GUIDE.md).
 */
export const mockTrainingDTOs: TrainingDTO[] = [
  {
    id: 'trg-leadership-new-managers',
    slug: 'leadership-nouveaux-managers',
    title_fr: 'Leadership : réussir sa prise de poste de manager',
    title_en: 'Leadership: Succeeding as a New Manager',
    title_ar: 'القيادة: النجاح في تولي منصب إداري جديد',
    summary_fr:
      'Développez les postures et les outils essentiels pour encadrer une équipe avec confiance dès les premiers mois.',
    summary_en:
      'Build the posture and practical tools needed to lead a team with confidence from day one.',
    summary_ar: 'طوّر السلوكيات والأدوات الأساسية لقيادة فريق بثقة منذ الأشهر الأولى.',
    description_fr:
      'Prendre son premier poste de manager implique un changement de posture profond : passer du faire au faire-faire, gagner en légitimité et construire la confiance de son équipe. Cette formation donne aux nouveaux managers les repères, les outils et la pratique nécessaires pour aborder cette transition avec sérénité et efficacité.',
    description_en:
      'Taking on a first management role means a deep shift in posture — from doing the work to enabling others to do it, building legitimacy and earning the trust of a team. This training gives new managers the frameworks, tools and practice they need to navigate that transition with confidence and effectiveness.',
    description_ar:
      'يتطلب تولي أول منصب إداري تحوّلًا عميقًا في السلوك: الانتقال من التنفيذ المباشر إلى تمكين الآخرين من التنفيذ، وبناء الشرعية وكسب ثقة الفريق. يمنح هذا التدريب المديرين الجدد الأطر والأدوات والممارسة اللازمة لاجتياز هذا التحول بثقة وفعالية.',
    objectives_fr: [
      "Identifier les fondamentaux d'une posture managériale efficace",
      'Développer sa confiance dans la prise de décision',
      'Mobiliser son équipe autour d’objectifs clairs',
    ],
    objectives_en: [
      'Identify the fundamentals of an effective management posture',
      'Build confidence in day-to-day decision-making',
      'Rally your team around clear objectives',
    ],
    objectives_ar: [
      'تحديد أسس الموقف الإداري الفعّال',
      'بناء الثقة في اتخاذ القرار اليومي',
      'تعبئة الفريق حول أهداف واضحة',
    ],
    target_audience_fr: [
      'Managers nouvellement nommés',
      'Futurs managers identifiés dans un parcours de succession',
    ],
    target_audience_en: [
      'Newly appointed managers',
      'Future managers identified through a succession plan',
    ],
    target_audience_ar: ['مديرون معيّنون حديثًا', 'مديرون مستقبليون ضمن خطة تعاقب وظيفي'],
    prerequisites_fr: ['Aucun prérequis particulier'],
    prerequisites_en: ['No specific prerequisites'],
    prerequisites_ar: ['لا توجد متطلبات مسبقة خاصة'],
    program: [
      {
        title_fr: 'Se positionner comme manager',
        title_en: 'Positioning yourself as a manager',
        title_ar: 'تموضعك كمدير',
        description_fr:
          'Clarifier son rôle, ses responsabilités et les attentes de sa hiérarchie et de son équipe.',
        description_en:
          'Clarify your role, responsibilities, and the expectations of your leadership and your team.',
        description_ar: 'توضيح دورك ومسؤولياتك وتوقعات إدارتك وفريقك.',
      },
      {
        title_fr: 'Communiquer et déléguer efficacement',
        title_en: 'Communicating and delegating effectively',
        title_ar: 'التواصل والتفويض بفعالية',
        description_fr:
          'Adapter sa communication et déléguer avec confiance selon la maturité de chaque collaborateur.',
        description_en:
          "Adapt your communication and delegate with confidence based on each team member's maturity.",
        description_ar: 'تكييف تواصلك وتفويض المهام بثقة حسب نضج كل موظف.',
      },
      {
        title_fr: 'Gérer les premières difficultés',
        title_en: 'Handling early challenges',
        title_ar: 'التعامل مع التحديات الأولى',
        description_fr: 'Anticiper et désamorcer les tensions, recadrer avec justesse.',
        description_en: 'Anticipate and defuse tension, and give feedback with the right tone.',
        description_ar: 'توقع التوترات ونزع فتيلها، وتقديم الملاحظات بالنبرة الصحيحة.',
      },
    ],
    methodology_fr:
      "Alternance d'apports théoriques, de mises en situation et de retours d'expérience entre pairs.",
    methodology_en: 'A mix of theoretical input, role-play scenarios, and peer feedback.',
    methodology_ar:
      'مزيج من المدخلات النظرية وسيناريوهات تمثيل الأدوار وتبادل الخبرات بين الأقران.',
    faq: [
      {
        question_fr: 'Cette formation est-elle adaptée si je manage déjà depuis plusieurs mois ?',
        question_en: "Is this training suitable if I've already been managing for a few months?",
        question_ar: 'هل هذا التدريب مناسب إذا كنت أدير فريقًا منذ عدة أشهر؟',
        answer_fr:
          'Oui, elle est conçue pour les managers en poste depuis moins de deux ans, quelle que soit leur ancienneté exacte.',
        answer_en:
          "Yes — it's designed for managers who have been in the role for under two years, regardless of exact tenure.",
        answer_ar:
          'نعم، هو مصمم للمديرين الذين توليوا مناصبهم منذ أقل من عامين، بغض النظر عن الأقدمية الدقيقة.',
      },
      {
        question_fr: 'La formation est-elle disponible en intra-entreprise ?',
        question_en: 'Is the training available as an in-company session?',
        question_ar: 'هل التدريب متاح كجلسة داخل الشركة؟',
        answer_fr: 'Oui, ISTAM propose cette formation en groupe intra-entreprise sur demande.',
        answer_en: 'Yes, ISTAM offers this training as an in-company group session on request.',
        answer_ar: 'نعم، تقدّم ISTAM هذا التدريب كجلسة جماعية داخل الشركة عند الطلب.',
      },
    ],
    sessions: [
      {
        start_date: '2026-10-12',
        location_fr: 'Alger, Algérie',
        location_en: 'Algiers, Algeria',
        location_ar: 'الجزائر العاصمة، الجزائر',
      },
    ],
    format: 'in-person',
    level: 'intermediate',
    duration_hours: 21,
    category_id: 'cat-leadership-people-development',
    trainer_ids: ['trn-claire-dubois'],
    is_featured: true,
    image_url: MEDIA.featuredTraining,
  },
  {
    id: 'trg-project-management-fundamentals',
    slug: 'fondamentaux-gestion-de-projet',
    title_fr: 'Fondamentaux de la gestion de projet',
    title_en: 'Project Management Fundamentals',
    title_ar: 'أساسيات إدارة المشاريع',
    summary_fr:
      'Maîtrisez les méthodes et les outils clés pour planifier, piloter et livrer vos projets dans les délais.',
    summary_en: 'Master the core methods and tools to plan, run and deliver projects on time.',
    summary_ar: 'أتقن الأساليب والأدوات الرئيسية لتخطيط مشاريعك وتنفيذها وتسليمها في الوقت المحدد.',
    description_fr:
      "Cette formation couvre l'intégralité du cycle de vie d'un projet, du cadrage initial à la clôture, en passant par la planification, le pilotage de l'exécution et la gestion des risques. Elle s'appuie sur des méthodes éprouvées et des outils concrets, directement transposables à vos projets.",
    description_en:
      'This training covers the full project lifecycle, from initial framing to closing, including planning, execution management and risk management. It relies on proven methods and practical tools you can apply directly to your own projects.',
    description_ar:
      'يغطي هذا التدريب دورة حياة المشروع بالكامل، من التأطير الأولي إلى الإغلاق، مرورًا بالتخطيط وقيادة التنفيذ وإدارة المخاطر. يعتمد على أساليب مثبتة وأدوات عملية قابلة للتطبيق مباشرة على مشاريعكم.',
    objectives_fr: [
      'Structurer un projet de A à Z',
      'Maîtriser les outils de planification et de suivi',
      'Anticiper et gérer les risques projet',
    ],
    objectives_en: [
      'Structure a project from A to Z',
      'Master planning and tracking tools',
      'Anticipate and manage project risk',
    ],
    objectives_ar: [
      'هيكلة مشروع من الألف إلى الياء',
      'إتقان أدوات التخطيط والمتابعة',
      'توقع مخاطر المشروع وإدارتها',
    ],
    target_audience_fr: [
      'Chefs de projet débutants',
      'Collaborateurs amenés à piloter des projets ponctuellement',
    ],
    target_audience_en: ['Beginner project managers', 'Employees who occasionally lead projects'],
    target_audience_ar: ['مديرو مشاريع مبتدئون', 'موظفون يقودون مشاريع بين الحين والآخر'],
    prerequisites_fr: ['Aucun prérequis'],
    prerequisites_en: ['No prerequisites'],
    prerequisites_ar: ['لا توجد متطلبات مسبقة'],
    program: [
      {
        title_fr: 'Cadrer le projet',
        title_en: 'Framing the project',
        title_ar: 'تأطير المشروع',
        description_fr: 'Définir les objectifs, le périmètre et les parties prenantes.',
        description_en: 'Define objectives, scope, and stakeholders.',
        description_ar: 'تحديد الأهداف والنطاق وأصحاب المصلحة.',
      },
      {
        title_fr: 'Planifier et budgétiser',
        title_en: 'Planning and budgeting',
        title_ar: 'التخطيط والميزنة',
        description_fr: 'Construire un planning réaliste et un budget maîtrisé.',
        description_en: 'Build a realistic schedule and a controlled budget.',
        description_ar: 'بناء جدول زمني واقعي وميزانية محكومة.',
      },
      {
        title_fr: "Piloter l'exécution",
        title_en: 'Steering execution',
        title_ar: 'قيادة التنفيذ',
        description_fr: "Suivre l'avancement, animer les points d'équipe, gérer les écarts.",
        description_en: 'Track progress, run team check-ins, manage deviations.',
        description_ar: 'متابعة التقدم وإدارة اجتماعات الفريق ومعالجة الانحرافات.',
      },
      {
        title_fr: 'Clôturer et capitaliser',
        title_en: 'Closing and capitalizing',
        title_ar: 'الإغلاق والاستفادة',
        description_fr: 'Livrer, évaluer et tirer les enseignements du projet.',
        description_en: 'Deliver, evaluate, and capture lessons learned.',
        description_ar: 'التسليم والتقييم واستخلاص الدروس المستفادة.',
      },
    ],
    methodology_fr:
      'Formation hybride combinant sessions à distance et ateliers pratiques sur cas réels.',
    methodology_en:
      'A hybrid format combining remote sessions and hands-on workshops using real cases.',
    methodology_ar: 'تدريب مختلط يجمع بين جلسات عن بُعد وورشات عملية على حالات حقيقية.',
    faq: [
      {
        question_fr: 'Dois-je avoir géré un projet avant de suivre cette formation ?',
        question_en: 'Do I need prior project management experience?',
        question_ar: 'هل أحتاج إلى خبرة سابقة في إدارة المشاريع؟',
        answer_fr: "Non, elle s'adresse aussi aux personnes qui pilotent leur premier projet.",
        answer_en: "No — it's also designed for people leading their first project.",
        answer_ar: 'لا، فهو موجه أيضًا لمن يقودون مشروعهم الأول.',
      },
      {
        question_fr: 'Un support de cours est-il fourni ?',
        question_en: 'Is course material provided?',
        question_ar: 'هل يتم توفير مواد تدريبية؟',
        answer_fr:
          'Oui, un support complet et des modèles réutilisables sont remis à chaque participant.',
        answer_en: 'Yes, each participant receives a complete handout and reusable templates.',
        answer_ar: 'نعم، يحصل كل مشارك على دليل شامل ونماذج قابلة لإعادة الاستخدام.',
      },
    ],
    sessions: [
      {
        start_date: '2026-09-28',
        location_fr: 'Alger, Algérie',
        location_en: 'Algiers, Algeria',
        location_ar: 'الجزائر العاصمة، الجزائر',
      },
    ],
    format: 'hybrid',
    level: 'beginner',
    duration_hours: 14,
    category_id: 'cat-business-functional-excellence',
    trainer_ids: ['trn-karim-el-amrani'],
    is_featured: true,
    image_url: MEDIA.management,
  },
  {
    id: 'trg-advanced-excel-financial-analysis',
    slug: 'excel-avance-analyse-financiere',
    title_fr: 'Excel avancé pour l’analyse financière',
    title_en: 'Advanced Excel for Financial Analysis',
    title_ar: 'إكسل المتقدم للتحليل المالي',
    summary_fr:
      "Exploitez les fonctions avancées d'Excel pour fiabiliser vos modèles et tableaux de bord financiers.",
    summary_en: "Use Excel's advanced functions to build reliable financial models and dashboards.",
    summary_ar: 'استخدم دوال إكسل المتقدمة لبناء نماذج ولوحات تحكم مالية موثوقة.',
    description_fr:
      "Une formation intensive pour aller au-delà des fonctions de base d'Excel et construire des modèles financiers robustes, des tableaux de bord dynamiques et des analyses fiables, directement applicables à votre environnement de travail.",
    description_en:
      "An intensive training to go beyond Excel's basic functions and build robust financial models, dynamic dashboards and reliable analyses, directly applicable to your own work environment.",
    description_ar:
      'تدريب مكثف لتجاوز وظائف إكسل الأساسية وبناء نماذج مالية قوية ولوحات تحكم ديناميكية وتحليلات موثوقة، قابلة للتطبيق مباشرة في بيئة عملكم.',
    objectives_fr: [
      'Construire des modèles financiers fiables sous Excel',
      'Exploiter les fonctions avancées (recherche, matricielles, financières)',
      'Automatiser la production de tableaux de bord',
    ],
    objectives_en: [
      'Build reliable financial models in Excel',
      'Leverage advanced functions (lookup, array, financial)',
      'Automate dashboard production',
    ],
    objectives_ar: [
      'بناء نماذج مالية موثوقة باستخدام إكسل',
      'استخدام الدوال المتقدمة (البحث، المصفوفات، المالية)',
      'أتمتة إنتاج لوحات التحكم',
    ],
    target_audience_fr: [
      'Contrôleurs de gestion et analystes financiers',
      "Comptables souhaitant approfondir leur maîtrise d'Excel",
    ],
    target_audience_en: [
      'Financial controllers and analysts',
      'Accountants looking to deepen their Excel expertise',
    ],
    target_audience_ar: [
      'مراقبو التسيير والمحللون الماليون',
      'محاسبون يرغبون في تعميق إتقانهم لإكسل',
    ],
    prerequisites_fr: ['Bonne maîtrise des fonctions de base d’Excel'],
    prerequisites_en: ['Solid command of basic Excel functions'],
    prerequisites_ar: ['إتقان جيد لوظائف إكسل الأساسية'],
    program: [
      {
        title_fr: 'Fonctions avancées et matricielles',
        title_en: 'Advanced and array functions',
        title_ar: 'الدوال المتقدمة والمصفوفية',
        description_fr: 'RECHERCHEX, INDEX/EQUIV, fonctions matricielles et conditionnelles.',
        description_en: 'XLOOKUP, INDEX/MATCH, array and conditional functions.',
        description_ar: 'XLOOKUP وINDEX/MATCH والدوال المصفوفية والشرطية.',
      },
      {
        title_fr: 'Modélisation financière',
        title_en: 'Financial modeling',
        title_ar: 'النمذجة المالية',
        description_fr: 'Construire un modèle de prévision et un business plan simplifié.',
        description_en: 'Build a forecasting model and a simplified business plan.',
        description_ar: 'بناء نموذج تنبؤي وخطة عمل مبسطة.',
      },
      {
        title_fr: 'Tableaux de bord dynamiques',
        title_en: 'Dynamic dashboards',
        title_ar: 'لوحات تحكم ديناميكية',
        description_fr:
          'Tableaux croisés dynamiques, mise en forme conditionnelle, automatisation simple.',
        description_en: 'Pivot tables, conditional formatting, simple automation.',
        description_ar: 'الجداول المحورية والتنسيق الشرطي والأتمتة البسيطة.',
      },
    ],
    methodology_fr:
      'Formation 100% à distance, en petit groupe, avec exercices sur des cas financiers réels.',
    methodology_en:
      'A fully remote, small-group training with exercises based on real financial cases.',
    methodology_ar:
      'تدريب عن بُعد بالكامل، ضمن مجموعة صغيرة، مع تمارين مبنية على حالات مالية حقيقية.',
    faq: [
      {
        question_fr: "Quelle version d'Excel est utilisée ?",
        question_en: 'Which version of Excel is used?',
        question_ar: 'ما إصدار إكسل المستخدم؟',
        answer_fr:
          'La formation s’appuie sur Excel 365, mais les techniques restent applicables aux versions récentes.',
        answer_en:
          'The training uses Excel 365, but the techniques apply to recent versions as well.',
        answer_ar:
          'يعتمد التدريب على إكسل 365، لكن التقنيات قابلة للتطبيق على الإصدارات الحديثة أيضًا.',
      },
      {
        question_fr: 'La formation est-elle enregistrée ?',
        question_en: 'Is the training recorded?',
        question_ar: 'هل يتم تسجيل التدريب؟',
        answer_fr:
          'Les sessions en ligne sont enregistrées et mises à disposition des participants pendant 30 jours.',
        answer_en: 'Online sessions are recorded and made available to participants for 30 days.',
        answer_ar: 'يتم تسجيل الجلسات عبر الإنترنت وإتاحتها للمشاركين لمدة 30 يومًا.',
      },
    ],
    sessions: [{ start_date: '2026-09-08' }],
    format: 'online',
    level: 'advanced',
    duration_hours: 10,
    category_id: 'cat-business-functional-excellence',
    trainer_ids: ['trn-karim-el-amrani'],
    is_featured: false,
    image_url: MEDIA.strategy,
  },
  {
    id: 'trg-digital-transformation-essentials',
    slug: 'essentiels-transformation-digitale',
    title_fr: 'Les essentiels de la transformation digitale',
    title_en: 'Digital Transformation Essentials',
    title_ar: 'أساسيات التحول الرقمي',
    summary_fr:
      "Comprenez les enjeux du numérique et accompagnez votre équipe dans l'adoption de nouveaux outils.",
    summary_en:
      'Understand the stakes of digital change and help your team adopt new tools with confidence.',
    summary_ar: 'افهم تحديات التحول الرقمي وساعد فريقك على تبني أدوات جديدة بثقة.',
    description_fr:
      "La transformation digitale n'est pas qu'une affaire d'outils : c'est avant tout un changement de pratiques et de culture. Cette formation donne aux managers et à leurs équipes les clés pour comprendre ces enjeux, choisir les bons outils et conduire le changement sereinement.",
    description_en:
      "Digital transformation isn't just about tools — it's first and foremost a shift in practices and culture. This training gives managers and their teams the keys to understand these stakes, choose the right tools, and lead change with confidence.",
    description_ar:
      'التحول الرقمي ليس مجرد مسألة أدوات، بل هو في الأساس تغيير في الممارسات والثقافة. يمنح هذا التدريب المديرين وفرقهم المفاتيح لفهم هذه التحديات واختيار الأدوات المناسبة وقيادة التغيير بثقة.',
    objectives_fr: [
      'Comprendre les grands enjeux de la transformation digitale',
      'Identifier les outils numériques pertinents pour son équipe',
      'Accompagner le changement auprès de ses collaborateurs',
    ],
    objectives_en: [
      'Understand the key stakes of digital transformation',
      'Identify the digital tools relevant to your team',
      'Support your team through change',
    ],
    objectives_ar: [
      'فهم التحديات الرئيسية للتحول الرقمي',
      'تحديد الأدوات الرقمية المناسبة لفريقك',
      'مرافقة فريقك في مسار التغيير',
    ],
    target_audience_fr: [
      'Managers et responsables d’équipe',
      'Collaborateurs impliqués dans un projet de digitalisation',
    ],
    target_audience_en: [
      'Managers and team leads',
      'Employees involved in a digitalization project',
    ],
    target_audience_ar: ['المديرون ورؤساء الفرق', 'الموظفون المشاركون في مشروع رقمنة'],
    prerequisites_fr: ['Aucun prérequis technique'],
    prerequisites_en: ['No technical prerequisites'],
    prerequisites_ar: ['لا توجد متطلبات تقنية مسبقة'],
    program: [
      {
        title_fr: 'Comprendre la transformation digitale',
        title_en: 'Understanding digital transformation',
        title_ar: 'فهم التحول الرقمي',
        description_fr: 'Panorama des tendances, enjeux et impacts sur les métiers.',
        description_en: 'Overview of trends, stakes, and impact on job roles.',
        description_ar: 'نظرة عامة على الاتجاهات والتحديات وتأثيرها على المهن.',
      },
      {
        title_fr: 'Choisir les bons outils',
        title_en: 'Choosing the right tools',
        title_ar: 'اختيار الأدوات المناسبة',
        description_fr: 'Panorama des outils collaboratifs et critères de choix adaptés.',
        description_en: 'Overview of collaborative tools and relevant selection criteria.',
        description_ar: 'نظرة عامة على أدوات التعاون ومعايير الاختيار المناسبة.',
      },
      {
        title_fr: 'Conduire le changement',
        title_en: 'Leading change',
        title_ar: 'قيادة التغيير',
        description_fr: 'Lever les résistances et embarquer les équipes dans la durée.',
        description_en: 'Overcome resistance and engage teams for the long run.',
        description_ar: 'تجاوز المقاومة وإشراك الفرق على المدى الطويل.',
      },
    ],
    methodology_fr:
      'Formation en ligne interactive, ponctuée d’ateliers collaboratifs et d’études de cas.',
    methodology_en:
      'An interactive online training punctuated by collaborative workshops and case studies.',
    methodology_ar: 'تدريب تفاعلي عبر الإنترنت يتضمن ورشات تعاونية ودراسات حالة.',
    faq: [
      {
        question_fr: 'Faut-il des compétences techniques particulières ?',
        question_en: 'Do I need specific technical skills?',
        question_ar: 'هل أحتاج إلى مهارات تقنية خاصة؟',
        answer_fr: 'Non, la formation s’adresse à un public non technique.',
        answer_en: 'No, the training is designed for a non-technical audience.',
        answer_ar: 'لا، التدريب موجه لجمهور غير تقني.',
      },
      {
        question_fr: "Peut-on adapter le contenu à notre secteur d'activité ?",
        question_en: 'Can the content be tailored to our industry?',
        question_ar: 'هل يمكن تكييف المحتوى مع قطاع نشاطنا؟',
        answer_fr:
          'Oui, les études de cas peuvent être adaptées sur demande pour un groupe intra-entreprise.',
        answer_en: 'Yes, case studies can be tailored on request for an in-company group.',
        answer_ar: 'نعم، يمكن تكييف دراسات الحالة عند الطلب لمجموعة داخل الشركة.',
      },
    ],
    sessions: [{ start_date: '2026-10-20' }],
    format: 'online',
    level: 'beginner',
    duration_hours: 12,
    category_id: 'cat-business-functional-excellence',
    trainer_ids: ['trn-lina-haddad'],
    is_featured: true,
    image_url: MEDIA.digitalTransformation,
  },
  {
    id: 'trg-hr-skills-development',
    slug: 'developpement-competences-rh',
    title_fr: 'Développer une politique de formation efficace',
    title_en: 'Building an Effective Training Policy',
    title_ar: 'بناء سياسة تدريب فعّالة',
    summary_fr:
      'Structurez le plan de développement des compétences de votre entreprise et mesurez son impact.',
    summary_en: "Structure your company's skills-development plan and measure its business impact.",
    summary_ar: 'نظّم خطة تطوير المهارات في شركتك وقِس أثرها على الأعمال.',
    description_fr:
      'Une politique de formation efficace repose sur un diagnostic précis des besoins, un plan structuré et des indicateurs de suivi pertinents. Cette formation outille les professionnels RH pour construire, piloter et valoriser leur politique de formation auprès de leur direction.',
    description_en:
      'An effective training policy relies on a precise needs diagnosis, a structured plan, and relevant tracking indicators. This training equips HR professionals to build, steer, and showcase their training policy to leadership.',
    description_ar:
      'تعتمد سياسة التدريب الفعّالة على تشخيص دقيق للاحتياجات وخطة منظمة ومؤشرات متابعة مناسبة. يزوّد هذا التدريب متخصصي الموارد البشرية بالأدوات اللازمة لبناء سياسة التدريب وقيادتها وإبرازها أمام الإدارة.',
    objectives_fr: [
      "Diagnostiquer les besoins de compétences de l'entreprise",
      'Construire un plan de développement des compétences',
      'Mesurer l’impact des actions de formation',
    ],
    objectives_en: [
      "Diagnose the company's skills needs",
      'Build a skills-development plan',
      'Measure the impact of training actions',
    ],
    objectives_ar: [
      'تشخيص احتياجات الشركة من المهارات',
      'بناء خطة لتطوير المهارات',
      'قياس أثر إجراءات التدريب',
    ],
    target_audience_fr: ['Responsables et gestionnaires RH', 'Chargés de formation'],
    target_audience_en: ['HR managers and officers', 'Training coordinators'],
    target_audience_ar: ['مسؤولو ومديرو الموارد البشرية', 'مكلفو التدريب'],
    prerequisites_fr: ['Une première expérience en RH est recommandée'],
    prerequisites_en: ['Some prior HR experience is recommended'],
    prerequisites_ar: ['يُفضّل وجود خبرة أولية في الموارد البشرية'],
    program: [
      {
        title_fr: 'Diagnostiquer les besoins',
        title_en: 'Diagnosing needs',
        title_ar: 'تشخيص الاحتياجات',
        description_fr: 'Méthodes de recueil des besoins et cartographie des compétences.',
        description_en: 'Needs-gathering methods and skills mapping.',
        description_ar: 'طرق جمع الاحتياجات ورسم خريطة المهارات.',
      },
      {
        title_fr: 'Construire le plan de formation',
        title_en: 'Building the training plan',
        title_ar: 'بناء خطة التدريب',
        description_fr: 'Prioriser les actions et bâtir un budget réaliste.',
        description_en: 'Prioritize actions and build a realistic budget.',
        description_ar: 'ترتيب أولويات الإجراءات وبناء ميزانية واقعية.',
      },
      {
        title_fr: 'Évaluer et ajuster',
        title_en: 'Evaluating and adjusting',
        title_ar: 'التقييم والتعديل',
        description_fr: 'Indicateurs de suivi et mesure du retour sur investissement formation.',
        description_en: 'Tracking indicators and measuring training ROI.',
        description_ar: 'مؤشرات المتابعة وقياس العائد على استثمار التدريب.',
      },
    ],
    methodology_fr:
      'Formation en présentiel, avec ateliers pratiques sur les outils RH de l’entreprise.',
    methodology_en:
      "An in-person training with hands-on workshops using the company's own HR tools.",
    methodology_ar: 'تدريب حضوري يتضمن ورشات عملية على أدوات الموارد البشرية الخاصة بالشركة.',
    faq: [
      {
        question_fr: 'Puis-je venir avec des données réelles de mon entreprise ?',
        question_en: 'Can I bring real data from my company?',
        question_ar: 'هل يمكنني إحضار بيانات حقيقية من شركتي؟',
        answer_fr: "Oui, c'est même recommandé pour rendre les ateliers directement opérationnels.",
        answer_en: "Yes — it's actually recommended, to make the workshops directly actionable.",
        answer_ar: 'نعم، بل يُنصح بذلك لجعل الورشات قابلة للتطبيق مباشرة.',
      },
      {
        question_fr: 'Un accompagnement post-formation est-il proposé ?',
        question_en: 'Is post-training support available?',
        question_ar: 'هل يتوفر مرافقة بعد التدريب؟',
        answer_fr: 'Un point de suivi à 30 jours peut être organisé sur demande.',
        answer_en: 'A 30-day follow-up session can be arranged on request.',
        answer_ar: 'يمكن تنظيم جلسة متابعة بعد 30 يومًا عند الطلب.',
      },
    ],
    sessions: [
      {
        start_date: '2026-11-16',
        location_fr: 'Alger, Algérie',
        location_en: 'Algiers, Algeria',
        location_ar: 'الجزائر العاصمة، الجزائر',
      },
    ],
    format: 'in-person',
    level: 'intermediate',
    duration_hours: 14,
    category_id: 'cat-leadership-people-development',
    trainer_ids: ['trn-claire-dubois'],
    is_featured: true,
    image_url: MEDIA.leadership,
  },
  {
    id: 'trg-professional-communication',
    slug: 'communication-professionnelle-impact',
    title_fr: 'Communication professionnelle à fort impact',
    title_en: 'High-Impact Professional Communication',
    title_ar: 'التواصل المهني عالي التأثير',
    summary_fr:
      "Gagnez en clarté et en aisance à l'oral pour convaincre vos équipes, vos clients et votre hiérarchie.",
    summary_en:
      'Communicate with clarity and confidence to convince your team, clients and leadership.',
    summary_ar: 'تواصل بوضوح وثقة لإقناع فريقك وعملائك وإدارتك.',
    description_fr:
      "Savoir communiquer avec impact est une compétence clé à tous les niveaux de l'entreprise. Cette formation, riche en mises en situation, permet à chacun de structurer son discours, d'adapter son message et de gagner en aisance face à un public, quel qu'il soit.",
    description_en:
      'Communicating with impact is a key skill at every level of an organization. Rich in role-play exercises, this training helps participants structure their message, adapt it to their audience, and build confidence speaking in front of any group.',
    description_ar:
      'التواصل المؤثر مهارة أساسية على جميع مستويات الشركة. يساعد هذا التدريب الغني بتمارين تمثيل الأدوار كل مشارك على هيكلة خطابه وتكييف رسالته واكتساب الثقة أمام أي جمهور.',
    objectives_fr: [
      'Structurer un message clair et percutant',
      'Adapter sa communication à ses interlocuteurs',
      'Gagner en aisance à l’oral',
    ],
    objectives_en: [
      'Structure a clear, impactful message',
      'Adapt communication to different audiences',
      'Build confidence speaking in public',
    ],
    objectives_ar: [
      'هيكلة رسالة واضحة ومؤثرة',
      'تكييف التواصل حسب المخاطبين',
      'اكتساب الثقة في التحدث أمام الجمهور',
    ],
    target_audience_fr: [
      'Tout professionnel amené à s’exprimer devant un groupe',
      'Collaborateurs en relation avec des clients',
    ],
    target_audience_en: [
      'Any professional who speaks in front of a group',
      'Client-facing employees',
    ],
    target_audience_ar: ['أي محترف يتحدث أمام مجموعة', 'الموظفون على تواصل مباشر مع العملاء'],
    prerequisites_fr: ['Aucun prérequis'],
    prerequisites_en: ['No prerequisites'],
    prerequisites_ar: ['لا توجد متطلبات مسبقة'],
    program: [
      {
        title_fr: 'Structurer son message',
        title_en: 'Structuring your message',
        title_ar: 'هيكلة رسالتك',
        description_fr: 'Méthodes pour clarifier et hiérarchiser ses idées.',
        description_en: 'Methods to clarify and prioritize your ideas.',
        description_ar: 'طرق لتوضيح أفكارك وترتيب أولوياتها.',
      },
      {
        title_fr: 'Convaincre et argumenter',
        title_en: 'Convincing and arguing your point',
        title_ar: 'الإقناع وعرض الحجج',
        description_fr: 'Techniques de conviction adaptées à chaque interlocuteur.',
        description_en: 'Persuasion techniques suited to each audience.',
        description_ar: 'تقنيات الإقناع المناسبة لكل مخاطب.',
      },
      {
        title_fr: 'Gérer sa prise de parole',
        title_en: 'Managing your delivery',
        title_ar: 'إدارة إلقائك',
        description_fr: 'Voix, posture et gestion du trac face à un public.',
        description_en: 'Voice, posture, and managing stage fright in front of an audience.',
        description_ar: 'الصوت والوضعية والتحكم في التوتر أمام الجمهور.',
      },
    ],
    methodology_fr:
      'Formation hybride avec de nombreuses mises en situation filmées et débriefées.',
    methodology_en: 'A hybrid training with numerous filmed, debriefed role-play exercises.',
    methodology_ar: 'تدريب مختلط يتضمن تمارين تمثيل أدوار مصوّرة ومناقشتها.',
    faq: [
      {
        question_fr: 'Vais-je devoir parler devant le groupe ?',
        question_en: 'Will I have to speak in front of the group?',
        question_ar: 'هل سأتحدث أمام المجموعة؟',
        answer_fr:
          'Oui, les mises en situation sont au cœur de la formation, dans un cadre bienveillant.',
        answer_en: 'Yes — role-play is central to the training, in a supportive environment.',
        answer_ar: 'نعم، تمثيل الأدوار هو جوهر التدريب، ضمن أجواء داعمة.',
      },
      {
        question_fr: 'La formation convient-elle aux personnes timides ?',
        question_en: 'Is the training suitable for shy people?',
        question_ar: 'هل التدريب مناسب للأشخاص الخجولين؟',
        answer_fr: 'Absolument, le rythme est adapté pour progresser à son propre pas.',
        answer_en: 'Absolutely — the pace is adapted so everyone can progress at their own speed.',
        answer_ar: 'بالتأكيد، الوتيرة مصممة للتقدم بالسرعة الخاصة بكل شخص.',
      },
    ],
    sessions: [
      {
        start_date: '2026-09-21',
        location_fr: 'Alger, Algérie',
        location_en: 'Algiers, Algeria',
        location_ar: 'الجزائر العاصمة، الجزائر',
      },
    ],
    format: 'hybrid',
    level: 'beginner',
    duration_hours: 7,
    category_id: 'cat-leadership-people-development',
    trainer_ids: ['trn-lina-haddad'],
    is_featured: false,
    image_url: MEDIA.communication,
  },
]
