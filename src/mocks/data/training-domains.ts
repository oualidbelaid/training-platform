import type { TrainingDomainDTO } from '@/types/dto/training-domain.dto'

/**
 * The real ISTAM catalogue — 51 skill domains under the 4 real pillars
 * (`categories.ts`), each with the 4 real course titles from the official
 * ISTAM 2026 institutional presentation (pages 10–13). Every domain name
 * and every course title is transcribed verbatim from the source (French,
 * the authoritative language there); English/Arabic are direct, faithful
 * translations of these short skill/topic names.
 *
 * Deliberately NOT `TrainingDTO` records: the source gives titles only —
 * no description/objectives/program/prerequisites/sessions, the fields a
 * real bookable `Training` needs — so representing these as `Training`
 * would mean inventing ~90% of each record, which is explicitly out of
 * scope. See `types/dto/training-domain.dto.ts` for the reasoning.
 */
export const mockTrainingDomainDTOs: TrainingDomainDTO[] = [
  // ---- Pillar 1: Business & Functional Excellence ----
  {
    id: 'dom-achats',
    slug: 'achats',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Achats',
    name_en: 'Procurement',
    name_ar: 'المشتريات',
    courses: [
      {
        name_fr: 'Fondamentaux des achats',
        name_en: 'Procurement fundamentals',
        name_ar: 'أساسيات المشتريات',
      },
      {
        name_fr: 'Achats import & Incoterms',
        name_en: 'Import purchasing & Incoterms',
        name_ar: 'الاستيراد وشروط التجارة الدولية (Incoterms)',
      },
      { name_fr: 'Marchés publics', name_en: 'Public procurement', name_ar: 'الصفقات العمومية' },
      {
        name_fr: 'Sourcing & relation fournisseurs',
        name_en: 'Sourcing & supplier relations',
        name_ar: 'التوريد وإدارة علاقات الموردين',
      },
    ],
  },
  {
    id: 'dom-finance-tresorerie',
    slug: 'finance-tresorerie',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Finance & Trésorerie',
    name_en: 'Finance & Treasury',
    name_ar: 'المالية والخزينة',
    courses: [
      {
        name_fr: 'Gestion de trésorerie',
        name_en: 'Treasury management',
        name_ar: 'إدارة الخزينة',
      },
      { name_fr: 'Analyse financière', name_en: 'Financial analysis', name_ar: 'التحليل المالي' },
      {
        name_fr: 'Financement & crédits bancaires',
        name_en: 'Financing & bank credit',
        name_ar: 'التمويل والقروض البنكية',
      },
      {
        name_fr: 'Risques de change et de taux',
        name_en: 'Currency and interest rate risk',
        name_ar: 'مخاطر الصرف وأسعار الفائدة',
      },
    ],
  },
  {
    id: 'dom-comptabilite-fiscalite',
    slug: 'comptabilite-fiscalite',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Comptabilité & Fiscalité',
    name_en: 'Accounting & Taxation',
    name_ar: 'المحاسبة والجباية',
    courses: [
      {
        name_fr: 'Comptabilité générale (SCF)',
        name_en: 'General accounting (SCF)',
        name_ar: 'المحاسبة العامة (SCF)',
      },
      {
        name_fr: "Fiscalité d'entreprise",
        name_en: 'Corporate taxation',
        name_ar: 'الجباية المؤسساتية',
      },
      {
        name_fr: 'Clôture & liasse fiscale',
        name_en: 'Year-end closing & tax return',
        name_ar: 'الإقفال المحاسبي والحصيلة الجبائية',
      },
      {
        name_fr: 'Comptabilité analytique',
        name_en: 'Cost accounting',
        name_ar: 'المحاسبة التحليلية',
      },
    ],
  },
  {
    id: 'dom-banque',
    slug: 'banque',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Banque',
    name_en: 'Banking',
    name_ar: 'البنوك',
    courses: [
      {
        name_fr: 'Techniques bancaires',
        name_en: 'Banking techniques',
        name_ar: 'التقنيات البنكية',
      },
      {
        name_fr: 'Crédit documentaire & import/export',
        name_en: 'Documentary credit & import/export',
        name_ar: 'الاعتماد المستندي والاستيراد/التصدير',
      },
      {
        name_fr: 'Analyse du risque de crédit',
        name_en: 'Credit risk analysis',
        name_ar: 'تحليل مخاطر الائتمان',
      },
      {
        name_fr: 'Moyens de paiement bancaires',
        name_en: 'Banking payment methods',
        name_ar: 'وسائل الدفع البنكية',
      },
    ],
  },
  {
    id: 'dom-controle-de-gestion',
    slug: 'controle-de-gestion',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Contrôle de gestion',
    name_en: 'Management Control',
    name_ar: 'مراقبة التسيير',
    courses: [
      {
        name_fr: 'Fondamentaux & tableaux de bord',
        name_en: 'Fundamentals & dashboards',
        name_ar: 'الأساسيات ولوحات القيادة',
      },
      {
        name_fr: 'Construction budgétaire',
        name_en: 'Budget construction',
        name_ar: 'بناء الميزانية',
      },
      {
        name_fr: 'Reporting & indicateurs (KPI)',
        name_en: 'Reporting & KPIs',
        name_ar: 'التقارير والمؤشرات (KPI)',
      },
      {
        name_fr: 'Contrôle de gestion industriel',
        name_en: 'Industrial management control',
        name_ar: 'مراقبة التسيير الصناعي',
      },
    ],
  },
  {
    id: 'dom-supply-chain-logistique',
    slug: 'supply-chain-logistique',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Supply Chain & Logistique',
    name_en: 'Supply Chain & Logistics',
    name_ar: 'سلسلة التوريد واللوجستيك',
    courses: [
      {
        name_fr: 'Fondamentaux supply chain',
        name_en: 'Supply chain fundamentals',
        name_ar: 'أساسيات سلسلة التوريد',
      },
      { name_fr: 'Gestion des stocks', name_en: 'Inventory management', name_ar: 'إدارة المخزون' },
      { name_fr: 'Transport & douane', name_en: 'Transport & customs', name_ar: 'النقل والجمارك' },
      {
        name_fr: 'Optimisation logistique (S&OP)',
        name_en: 'Logistics optimization (S&OP)',
        name_ar: 'تحسين اللوجستيك (S&OP)',
      },
    ],
  },
  {
    id: 'dom-qualite',
    slug: 'qualite',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Qualité',
    name_en: 'Quality',
    name_ar: 'الجودة',
    courses: [
      { name_fr: 'ISO 9001', name_en: 'ISO 9001', name_ar: 'ISO 9001' },
      {
        name_fr: 'Audit qualité interne',
        name_en: 'Internal quality audit',
        name_ar: 'التدقيق الداخلي للجودة',
      },
      {
        name_fr: '5S, PDCA, Ishikawa',
        name_en: '5S, PDCA, Ishikawa',
        name_ar: '5S وPDCA وإيشيكاوا',
      },
      { name_fr: 'AMDEC', name_en: 'FMEA', name_ar: 'AMDEC' },
    ],
  },
  {
    id: 'dom-bureautique-ms-office',
    slug: 'bureautique-ms-office',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Bureautique et MS Office',
    name_en: 'Office Tools & MS Office',
    name_ar: 'المكتبية وMS Office',
    courses: [
      {
        name_fr: 'Excel initiation',
        name_en: 'Excel — getting started',
        name_ar: 'إكسل — الانطلاقة',
      },
      {
        name_fr: 'Excel perfectionnement & TCD',
        name_en: 'Excel advanced & pivot tables',
        name_ar: 'إكسل المتقدم والجداول التفاعلية',
      },
      {
        name_fr: 'PowerPoint impactant',
        name_en: 'Impactful PowerPoint',
        name_ar: 'بوربوينت مؤثر',
      },
      {
        name_fr: 'Power BI initiation',
        name_en: 'Power BI — getting started',
        name_ar: 'Power BI — الانطلاقة',
      },
    ],
  },
  {
    id: 'dom-droit-des-affaires',
    slug: 'droit-des-affaires',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Droit des affaires',
    name_en: 'Business Law',
    name_ar: 'قانون الأعمال',
    courses: [
      { name_fr: 'Droit des sociétés', name_en: 'Corporate law', name_ar: 'قانون الشركات' },
      {
        name_fr: 'Droit du travail algérien',
        name_en: 'Algerian labor law',
        name_ar: 'قانون العمل الجزائري',
      },
      {
        name_fr: 'Contrats commerciaux',
        name_en: 'Commercial contracts',
        name_ar: 'العقود التجارية',
      },
      {
        name_fr: 'Droit des affaires internationales',
        name_en: 'International business law',
        name_ar: 'قانون الأعمال الدولي',
      },
    ],
  },
  {
    id: 'dom-organisation-audit',
    slug: 'organisation-audit',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Organisation & Audit',
    name_en: 'Organization & Audit',
    name_ar: 'التنظيم والتدقيق',
    courses: [
      { name_fr: 'Audit interne', name_en: 'Internal audit', name_ar: 'التدقيق الداخلي' },
      {
        name_fr: 'Cartographie des processus',
        name_en: 'Process mapping',
        name_ar: 'رسم خرائط العمليات',
      },
      {
        name_fr: 'Contrôle interne (COSO)',
        name_en: 'Internal control (COSO)',
        name_ar: 'الرقابة الداخلية (COSO)',
      },
      {
        name_fr: 'Audit social et RH',
        name_en: 'Social and HR audit',
        name_ar: 'التدقيق الاجتماعي والموارد البشرية',
      },
    ],
  },
  {
    id: 'dom-gestion-de-projet',
    slug: 'gestion-de-projet',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Gestion de projet',
    name_en: 'Project Management',
    name_ar: 'إدارة المشاريع',
    courses: [
      {
        name_fr: 'Fondamentaux gestion de projet',
        name_en: 'Project management fundamentals',
        name_ar: 'أساسيات إدارة المشاريع',
      },
      {
        name_fr: 'Planification (MS Project)',
        name_en: 'Planning (MS Project)',
        name_ar: 'التخطيط (MS Project)',
      },
      {
        name_fr: 'Méthodes agiles Scrum/Kanban',
        name_en: 'Agile methods (Scrum/Kanban)',
        name_ar: 'المنهجيات الرشيقة Scrum/Kanban',
      },
      {
        name_fr: 'Gestion des risques projet',
        name_en: 'Project risk management',
        name_ar: 'إدارة مخاطر المشاريع',
      },
    ],
  },
  {
    id: 'dom-marketing',
    slug: 'marketing',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Marketing',
    name_en: 'Marketing',
    name_ar: 'التسويق',
    courses: [
      {
        name_fr: 'Marketing fondamental',
        name_en: 'Marketing fundamentals',
        name_ar: 'أساسيات التسويق',
      },
      { name_fr: 'Marketing digital', name_en: 'Digital marketing', name_ar: 'التسويق الرقمي' },
      { name_fr: 'Étude de marché', name_en: 'Market research', name_ar: 'دراسة السوق' },
      {
        name_fr: 'Stratégie de marque',
        name_en: 'Brand strategy',
        name_ar: 'استراتيجية العلامة التجارية',
      },
    ],
  },
  {
    id: 'dom-digital',
    slug: 'digital',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Digital',
    name_en: 'Digital',
    name_ar: 'الرقمنة',
    courses: [
      {
        name_fr: 'Transformation digitale',
        name_en: 'Digital transformation',
        name_ar: 'التحول الرقمي',
      },
      {
        name_fr: 'Cybersécurité — sensibilisation',
        name_en: 'Cybersecurity awareness',
        name_ar: 'التحسيس بالأمن السيبراني',
      },
      {
        name_fr: 'Gestion de projets digitaux',
        name_en: 'Managing digital projects',
        name_ar: 'إدارة المشاريع الرقمية',
      },
      {
        name_fr: 'Outils collaboratifs',
        name_en: 'Collaborative tools',
        name_ar: 'أدوات العمل التعاوني',
      },
    ],
  },
  {
    id: 'dom-intelligence-artificielle',
    slug: 'intelligence-artificielle',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'IA – Intelligence Artificielle',
    name_en: 'AI – Artificial Intelligence',
    name_ar: 'الذكاء الاصطناعي',
    courses: [
      {
        name_fr: "Initiation à l'IA",
        name_en: 'Introduction to AI',
        name_ar: 'مبادئ الذكاء الاصطناعي',
      },
      {
        name_fr: 'IA générative en entreprise',
        name_en: 'Generative AI in business',
        name_ar: 'الذكاء الاصطناعي التوليدي في المؤسسة',
      },
      {
        name_fr: "Automatisation par l'IA",
        name_en: 'Automation through AI',
        name_ar: 'الأتمتة عبر الذكاء الاصطناعي',
      },
      {
        name_fr: 'Data & IA pour managers',
        name_en: 'Data & AI for managers',
        name_ar: 'البيانات والذكاء الاصطناعي للمدراء',
      },
    ],
  },
  {
    id: 'dom-web-development',
    slug: 'web-development',
    category_id: 'cat-business-functional-excellence',
    name_fr: 'Web Development',
    name_en: 'Web Development',
    name_ar: 'تطوير الويب',
    courses: [
      {
        name_fr: 'Initiation HTML/CSS/JS',
        name_en: 'Introduction to HTML/CSS/JS',
        name_ar: 'مبادئ HTML/CSS/JS',
      },
      {
        name_fr: 'Front-end avec React',
        name_en: 'Front-end with React',
        name_ar: 'الواجهة الأمامية بـ React',
      },
      {
        name_fr: 'Back-end & bases de données',
        name_en: 'Back-end & databases',
        name_ar: 'الواجهة الخلفية وقواعد البيانات',
      },
      {
        name_fr: 'Création de site WordPress',
        name_en: 'Building a WordPress site',
        name_ar: 'إنشاء موقع بـ WordPress',
      },
    ],
  },
  {
    id: 'dom-creation-entreprise',
    slug: 'creation-entreprise',
    category_id: 'cat-business-functional-excellence',
    name_fr: "Création d'entreprise",
    name_en: 'Business Creation',
    name_ar: 'إنشاء المؤسسات',
    courses: [
      {
        name_fr: "De l'idée au business plan",
        name_en: 'From idea to business plan',
        name_ar: 'من الفكرة إلى مخطط الأعمال',
      },
      {
        name_fr: 'Statuts juridiques & formalités',
        name_en: 'Legal structures & formalities',
        name_ar: 'الأشكال القانونية والإجراءات',
      },
      {
        name_fr: 'Financement de la création',
        name_en: 'Start-up financing',
        name_ar: 'تمويل الإنشاء',
      },
      {
        name_fr: 'Business plan & étude de faisabilité',
        name_en: 'Business plan & feasibility study',
        name_ar: 'مخطط الأعمال ودراسة الجدوى',
      },
    ],
  },

  // ---- Pillar 2: Sales, Customer & Growth ----
  {
    id: 'dom-commercial-ventes',
    slug: 'commercial-ventes',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Commercial & Ventes',
    name_en: 'Sales',
    name_ar: 'التجارة والمبيعات',
    courses: [
      {
        name_fr: 'Techniques de vente fondamentales',
        name_en: 'Sales technique fundamentals',
        name_ar: 'أساسيات تقنيات البيع',
      },
      {
        name_fr: 'Prospection commerciale',
        name_en: 'Sales prospecting',
        name_ar: 'التنقيب التجاري',
      },
      {
        name_fr: 'Argumentaire et traitement des objections',
        name_en: 'Pitching & objection handling',
        name_ar: 'الحجج التجارية ومعالجة الاعتراضات',
      },
      {
        name_fr: "Plan d'action commercial",
        name_en: 'Sales action plan',
        name_ar: 'خطة العمل التجارية',
      },
    ],
  },
  {
    id: 'dom-sales-academie',
    slug: 'sales-academie',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Sales Académie',
    name_en: 'Sales Academy',
    name_ar: 'أكاديمية المبيعات',
    courses: [
      {
        name_fr: "Parcours d'intégration commerciale",
        name_en: 'Sales onboarding pathway',
        name_ar: 'مسار الإدماج التجاري',
      },
      {
        name_fr: 'Posture et savoir-être commercial',
        name_en: 'Sales posture and mindset',
        name_ar: 'السلوك التجاري وحسن التصرف',
      },
      {
        name_fr: 'Outils du commercial terrain',
        name_en: 'Field sales tools',
        name_ar: 'أدوات المندوب الميداني',
      },
      {
        name_fr: 'Coaching commercial',
        name_en: 'Sales coaching',
        name_ar: 'التدريب التوجيهي التجاري',
      },
    ],
  },
  {
    id: 'dom-relation-client',
    slug: 'relation-client',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Relation Client',
    name_en: 'Customer Relations',
    name_ar: 'علاقات العملاء',
    courses: [
      {
        name_fr: 'Fondamentaux de la relation client',
        name_en: 'Customer relations fundamentals',
        name_ar: 'أساسيات علاقة العملاء',
      },
      {
        name_fr: 'Écoute active et empathie',
        name_en: 'Active listening & empathy',
        name_ar: 'الإصغاء الفعّال والتعاطف',
      },
      {
        name_fr: 'Gestion des attentes client',
        name_en: 'Managing customer expectations',
        name_ar: 'إدارة توقعات العملاء',
      },
      {
        name_fr: 'Suivi et satisfaction client',
        name_en: 'Customer follow-up & satisfaction',
        name_ar: 'متابعة العملاء ورضاهم',
      },
    ],
  },
  {
    id: 'dom-communication-sales',
    slug: 'communication',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Communication',
    name_en: 'Communication',
    name_ar: 'التواصل',
    courses: [
      {
        name_fr: 'Communication interpersonnelle',
        name_en: 'Interpersonal communication',
        name_ar: 'التواصل بين الأفراد',
      },
      {
        name_fr: 'Prise de parole en public',
        name_en: 'Public speaking',
        name_ar: 'التحدث أمام الجمهور',
      },
      {
        name_fr: 'Communication écrite professionnelle',
        name_en: 'Professional written communication',
        name_ar: 'التواصل الكتابي المهني',
      },
      {
        name_fr: 'Communication non verbale',
        name_en: 'Non-verbal communication',
        name_ar: 'التواصل غير اللفظي',
      },
    ],
  },
  {
    id: 'dom-negociation',
    slug: 'negociation',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Négociation',
    name_en: 'Negotiation',
    name_ar: 'التفاوض',
    courses: [
      {
        name_fr: 'Techniques de négociation',
        name_en: 'Negotiation techniques',
        name_ar: 'تقنيات التفاوض',
      },
      {
        name_fr: 'Négociation commerciale avancée',
        name_en: 'Advanced sales negotiation',
        name_ar: 'التفاوض التجاري المتقدم',
      },
      {
        name_fr: 'Négociation multiculturelle',
        name_en: 'Cross-cultural negotiation',
        name_ar: 'التفاوض متعدد الثقافات',
      },
      {
        name_fr: 'Gestion des objections prix',
        name_en: 'Handling price objections',
        name_ar: 'معالجة الاعتراضات على السعر',
      },
    ],
  },
  {
    id: 'dom-merchandising',
    slug: 'merchandising',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Merchandising',
    name_en: 'Merchandising',
    name_ar: 'ميرشاندايزينغ',
    courses: [
      {
        name_fr: 'Fondamentaux du merchandising',
        name_en: 'Merchandising fundamentals',
        name_ar: 'أساسيات الميرشاندايزينغ',
      },
      {
        name_fr: 'Merchandising visuel',
        name_en: 'Visual merchandising',
        name_ar: 'الميرشاندايزينغ البصري',
      },
      {
        name_fr: 'Théâtralisation du point de vente',
        name_en: 'Point-of-sale staging',
        name_ar: 'تنسيق نقطة البيع',
      },
      {
        name_fr: 'Merchandising digital',
        name_en: 'Digital merchandising',
        name_ar: 'الميرشاندايزينغ الرقمي',
      },
    ],
  },
  {
    id: 'dom-key-account-management',
    slug: 'key-account-management',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Key Account Management',
    name_en: 'Key Account Management',
    name_ar: 'إدارة الحسابات الرئيسية',
    courses: [
      {
        name_fr: 'Fondamentaux du KAM',
        name_en: 'KAM fundamentals',
        name_ar: 'أساسيات إدارة الحسابات الرئيسية',
      },
      {
        name_fr: 'Plan de compte stratégique',
        name_en: 'Strategic account planning',
        name_ar: 'خطة الحساب الاستراتيجي',
      },
      {
        name_fr: 'Fidélisation grands comptes',
        name_en: 'Key account retention',
        name_ar: 'الحفاظ على العملاء الكبار',
      },
      {
        name_fr: 'Négociation grands comptes',
        name_en: 'Key account negotiation',
        name_ar: 'التفاوض مع الحسابات الكبرى',
      },
    ],
  },
  {
    id: 'dom-vente-b2b',
    slug: 'vente-b2b',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Vente B2B',
    name_en: 'B2B Sales',
    name_ar: 'البيع بين الشركات (B2B)',
    courses: [
      {
        name_fr: 'Cycle de vente B2B',
        name_en: 'B2B sales cycle',
        name_ar: 'دورة البيع بين الشركات',
      },
      {
        name_fr: 'Vente complexe et solution selling',
        name_en: 'Complex sales & solution selling',
        name_ar: 'البيع المعقد وحلول البيع',
      },
      {
        name_fr: 'Social selling B2B',
        name_en: 'B2B social selling',
        name_ar: 'البيع الاجتماعي بين الشركات',
      },
      {
        name_fr: 'Pilotage du pipeline commercial',
        name_en: 'Sales pipeline management',
        name_ar: 'قيادة خط أنابيب المبيعات',
      },
    ],
  },
  {
    id: 'dom-vente-b2c',
    slug: 'vente-b2c',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Vente B2C',
    name_en: 'B2C Sales',
    name_ar: 'البيع للمستهلك (B2C)',
    courses: [
      {
        name_fr: 'Techniques de vente en magasin',
        name_en: 'In-store sales techniques',
        name_ar: 'تقنيات البيع في المتجر',
      },
      {
        name_fr: 'Vente en ligne et e-commerce',
        name_en: 'Online sales & e-commerce',
        name_ar: 'البيع عبر الإنترنت والتجارة الإلكترونية',
      },
      {
        name_fr: 'Techniques de closing',
        name_en: 'Closing techniques',
        name_ar: 'تقنيات إغلاق الصفقة',
      },
      {
        name_fr: "Gestion du parcours d'achat",
        name_en: 'Managing the buying journey',
        name_ar: 'إدارة مسار الشراء',
      },
    ],
  },
  {
    id: 'dom-upselling',
    slug: 'upselling',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Upselling',
    name_en: 'Upselling',
    name_ar: 'البيع بالارتقاء',
    courses: [
      {
        name_fr: 'Techniques de vente additionnelle',
        name_en: 'Add-on selling techniques',
        name_ar: 'تقنيات البيع الإضافي',
      },
      {
        name_fr: 'Identification des besoins complémentaires',
        name_en: 'Identifying complementary needs',
        name_ar: 'تحديد الاحتياجات التكميلية',
      },
      {
        name_fr: 'Argumentation de montée en gamme',
        name_en: 'Upgrade sales pitching',
        name_ar: 'حجج الارتقاء بالمنتج',
      },
      {
        name_fr: 'Upselling en ligne',
        name_en: 'Online upselling',
        name_ar: 'البيع بالارتقاء عبر الإنترنت',
      },
    ],
  },
  {
    id: 'dom-cross-selling',
    slug: 'cross-selling',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Cross-selling',
    name_en: 'Cross-selling',
    name_ar: 'البيع المتقاطع',
    courses: [
      {
        name_fr: 'Techniques de vente croisée',
        name_en: 'Cross-selling techniques',
        name_ar: 'تقنيات البيع المتقاطع',
      },
      {
        name_fr: "Construction d'offres complémentaires",
        name_en: 'Building complementary offers',
        name_ar: 'بناء العروض التكميلية',
      },
      {
        name_fr: 'Cross-selling en point de vente',
        name_en: 'In-store cross-selling',
        name_ar: 'البيع المتقاطع في نقطة البيع',
      },
      {
        name_fr: 'Cross-selling digital',
        name_en: 'Digital cross-selling',
        name_ar: 'البيع المتقاطع الرقمي',
      },
    ],
  },
  {
    id: 'dom-customer-experience',
    slug: 'customer-experience',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Customer Experience',
    name_en: 'Customer Experience',
    name_ar: 'تجربة العميل',
    courses: [
      {
        name_fr: 'Fondamentaux du Customer Experience',
        name_en: 'Customer Experience fundamentals',
        name_ar: 'أساسيات تجربة العميل',
      },
      {
        name_fr: 'Cartographie du parcours client',
        name_en: 'Customer journey mapping',
        name_ar: 'رسم خريطة مسار العميل',
      },
      {
        name_fr: "Design de l'expérience client",
        name_en: 'Customer experience design',
        name_ar: 'تصميم تجربة العميل',
      },
      {
        name_fr: 'Mesure de la satisfaction (NPS/CSAT)',
        name_en: 'Measuring satisfaction (NPS/CSAT)',
        name_ar: 'قياس الرضا (NPS/CSAT)',
      },
    ],
  },
  {
    id: 'dom-fidelisation',
    slug: 'fidelisation',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'Fidélisation',
    name_en: 'Loyalty',
    name_ar: 'ولاء العملاء',
    courses: [
      {
        name_fr: 'Programmes de fidélisation',
        name_en: 'Loyalty programs',
        name_ar: 'برامج الولاء',
      },
      {
        name_fr: 'Stratégies de rétention client',
        name_en: 'Customer retention strategies',
        name_ar: 'استراتيجيات الاحتفاظ بالعملاء',
      },
      {
        name_fr: 'Marketing relationnel',
        name_en: 'Relationship marketing',
        name_ar: 'التسويق العلائقي',
      },
      { name_fr: 'Fidélité digitale', name_en: 'Digital loyalty', name_ar: 'الولاء الرقمي' },
    ],
  },
  {
    id: 'dom-crm',
    slug: 'crm',
    category_id: 'cat-sales-customer-growth',
    name_fr: 'CRM',
    name_en: 'CRM',
    name_ar: 'إدارة علاقات العملاء (CRM)',
    courses: [
      { name_fr: 'Fondamentaux du CRM', name_en: 'CRM fundamentals', name_ar: 'أساسيات CRM' },
      {
        name_fr: "Paramétrage et utilisation d'un CRM",
        name_en: 'Setting up and using a CRM',
        name_ar: 'إعداد واستخدام نظام CRM',
      },
      {
        name_fr: 'Exploitation des données client',
        name_en: 'Leveraging customer data',
        name_ar: 'استغلال بيانات العملاء',
      },
      {
        name_fr: 'Pilotage commercial par le CRM',
        name_en: 'CRM-driven sales management',
        name_ar: 'القيادة التجارية عبر CRM',
      },
    ],
  },

  // ---- Pillar 3: Leadership & People Development ----
  {
    id: 'dom-management',
    slug: 'management',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Management',
    name_en: 'Management',
    name_ar: 'الإدارة',
    courses: [
      {
        name_fr: 'Fondamentaux du management',
        name_en: 'Management fundamentals',
        name_ar: 'أساسيات الإدارة',
      },
      { name_fr: "Management d'équipe", name_en: 'Team management', name_ar: 'إدارة الفريق' },
      {
        name_fr: 'Techniques de délégation',
        name_en: 'Delegation techniques',
        name_ar: 'تقنيات التفويض',
      },
      { name_fr: 'Management à distance', name_en: 'Remote management', name_ar: 'الإدارة عن بعد' },
    ],
  },
  {
    id: 'dom-leadership',
    slug: 'leadership',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Leadership',
    name_en: 'Leadership',
    name_ar: 'القيادة',
    courses: [
      {
        name_fr: 'Fondamentaux du leadership',
        name_en: 'Leadership fundamentals',
        name_ar: 'أساسيات القيادة',
      },
      {
        name_fr: 'Leadership situationnel',
        name_en: 'Situational leadership',
        name_ar: 'القيادة الظرفية',
      },
      {
        name_fr: 'Leadership et prise de décision',
        name_en: 'Leadership & decision-making',
        name_ar: 'القيادة واتخاذ القرار',
      },
      {
        name_fr: 'Développer son leadership personnel',
        name_en: 'Developing your personal leadership',
        name_ar: 'تطوير قيادتك الشخصية',
      },
    ],
  },
  {
    id: 'dom-coaching',
    slug: 'coaching',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Coaching',
    name_en: 'Coaching',
    name_ar: 'التدريب التوجيهي',
    courses: [
      {
        name_fr: 'Fondamentaux du coaching',
        name_en: 'Coaching fundamentals',
        name_ar: 'أساسيات التدريب التوجيهي',
      },
      { name_fr: "Coaching d'équipe", name_en: 'Team coaching', name_ar: 'تدريب الفريق' },
      {
        name_fr: 'Techniques de coaching individuel',
        name_en: 'Individual coaching techniques',
        name_ar: 'تقنيات التدريب الفردي',
      },
      {
        name_fr: 'Posture de coach managérial',
        name_en: 'Managerial coaching posture',
        name_ar: 'سلوك المدرب الإداري',
      },
    ],
  },
  {
    id: 'dom-developpement-personnel',
    slug: 'developpement-personnel',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Développement personnel',
    name_en: 'Personal Development',
    name_ar: 'التطوير الشخصي',
    courses: [
      {
        name_fr: 'Confiance et affirmation de soi',
        name_en: 'Confidence & self-assertion',
        name_ar: 'الثقة وتأكيد الذات',
      },
      { name_fr: 'Gestion du stress', name_en: 'Stress management', name_ar: 'إدارة التوتر' },
      {
        name_fr: 'Gestion des émotions',
        name_en: 'Managing emotions',
        name_ar: 'إدارة الانفعالات',
      },
      {
        name_fr: 'Posture professionnelle',
        name_en: 'Professional posture',
        name_ar: 'السلوك المهني',
      },
    ],
  },
  {
    id: 'dom-efficacite-professionnelle',
    slug: 'efficacite-professionnelle',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Efficacité professionnelle',
    name_en: 'Professional Effectiveness',
    name_ar: 'الفعالية المهنية',
    courses: [
      {
        name_fr: 'Organisation et productivité personnelle',
        name_en: 'Personal organization & productivity',
        name_ar: 'التنظيم والإنتاجية الشخصية',
      },
      {
        name_fr: 'Priorisation des tâches',
        name_en: 'Task prioritization',
        name_ar: 'ترتيب أولويات المهام',
      },
      {
        name_fr: 'Prise de notes et synthèse',
        name_en: 'Note-taking & synthesis',
        name_ar: 'تدوين الملاحظات والتلخيص',
      },
      {
        name_fr: 'Efficacité en réunion',
        name_en: 'Meeting effectiveness',
        name_ar: 'فعالية الاجتماعات',
      },
    ],
  },
  {
    id: 'dom-gestion-du-temps',
    slug: 'gestion-du-temps',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Gestion du temps',
    name_en: 'Time Management',
    name_ar: 'إدارة الوقت',
    courses: [
      {
        name_fr: 'Fondamentaux de la gestion du temps',
        name_en: 'Time management fundamentals',
        name_ar: 'أساسيات إدارة الوقت',
      },
      {
        name_fr: 'Planification et priorisation',
        name_en: 'Planning & prioritization',
        name_ar: 'التخطيط وترتيب الأولويات',
      },
      {
        name_fr: 'Lutte contre la procrastination',
        name_en: 'Overcoming procrastination',
        name_ar: 'مكافحة التسويف',
      },
      {
        name_fr: 'Gestion des interruptions',
        name_en: 'Managing interruptions',
        name_ar: 'إدارة المقاطعات',
      },
    ],
  },
  {
    id: 'dom-ressources-humaines',
    slug: 'ressources-humaines',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Ressources Humaines',
    name_en: 'Human Resources',
    name_ar: 'الموارد البشرية',
    courses: [
      {
        name_fr: 'Fondamentaux de la fonction RH',
        name_en: 'HR function fundamentals',
        name_ar: 'أساسيات وظيفة الموارد البشرية',
      },
      {
        name_fr: 'Recrutement et intégration',
        name_en: 'Recruitment & onboarding',
        name_ar: 'التوظيف والإدماج',
      },
      { name_fr: 'Gestion des talents', name_en: 'Talent management', name_ar: 'إدارة المواهب' },
      {
        name_fr: 'Droit social et RH',
        name_en: 'Employment & HR law',
        name_ar: 'القانون الاجتماعي وقانون العمل',
      },
    ],
  },
  {
    id: 'dom-formation-de-formateurs',
    slug: 'formation-de-formateurs',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Formation de formateurs',
    name_en: 'Train-the-Trainer',
    name_ar: 'تكوين المكوّنين',
    courses: [
      {
        name_fr: 'Fondamentaux de la pédagogie',
        name_en: 'Pedagogy fundamentals',
        name_ar: 'أساسيات البيداغوجيا',
      },
      {
        name_fr: "Conception d'un programme de formation",
        name_en: 'Designing a training program',
        name_ar: 'تصميم برنامج تدريبي',
      },
      {
        name_fr: 'Animation de formation',
        name_en: 'Facilitating training',
        name_ar: 'تقديم التدريب',
      },
      {
        name_fr: 'Évaluation des acquis',
        name_en: 'Assessing learning outcomes',
        name_ar: 'تقييم المكتسبات',
      },
    ],
  },
  {
    id: 'dom-conduite-du-changement',
    slug: 'conduite-du-changement',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Conduite du changement',
    name_en: 'Change Management',
    name_ar: 'قيادة التغيير',
    courses: [
      {
        name_fr: 'Fondamentaux de la conduite du changement',
        name_en: 'Change management fundamentals',
        name_ar: 'أساسيات قيادة التغيير',
      },
      {
        name_fr: 'Communication du changement',
        name_en: 'Communicating change',
        name_ar: 'التواصل حول التغيير',
      },
      {
        name_fr: 'Gestion des résistances',
        name_en: 'Managing resistance',
        name_ar: 'إدارة المقاومة',
      },
      {
        name_fr: 'Accompagnement des équipes',
        name_en: 'Supporting teams through change',
        name_ar: 'مرافقة الفرق',
      },
    ],
  },
  {
    id: 'dom-communication-manageriale',
    slug: 'communication-manageriale',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Communication managériale',
    name_en: 'Managerial Communication',
    name_ar: 'التواصل الإداري',
    courses: [
      {
        name_fr: 'Communication managériale efficace',
        name_en: 'Effective managerial communication',
        name_ar: 'التواصل الإداري الفعّال',
      },
      {
        name_fr: 'Feedback et entretiens managériaux',
        name_en: 'Feedback & appraisal interviews',
        name_ar: 'التغذية الراجعة والمقابلات الإدارية',
      },
      {
        name_fr: 'Communication en situation difficile',
        name_en: 'Communicating in difficult situations',
        name_ar: 'التواصل في المواقف الصعبة',
      },
      { name_fr: "Communication d'équipe", name_en: 'Team communication', name_ar: 'تواصل الفريق' },
    ],
  },
  {
    id: 'dom-intelligence-emotionnelle',
    slug: 'intelligence-emotionnelle',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Intelligence émotionnelle',
    name_en: 'Emotional Intelligence',
    name_ar: 'الذكاء العاطفي',
    courses: [
      {
        name_fr: "Fondamentaux de l'intelligence émotionnelle",
        name_en: 'Emotional intelligence fundamentals',
        name_ar: 'أساسيات الذكاء العاطفي',
      },
      {
        name_fr: 'Gestion de ses émotions',
        name_en: 'Managing your emotions',
        name_ar: 'إدارة الانفعالات',
      },
      {
        name_fr: 'Empathie et relations interpersonnelles',
        name_en: 'Empathy & interpersonal relations',
        name_ar: 'التعاطف والعلاقات بين الأفراد',
      },
      {
        name_fr: 'IE et management',
        name_en: 'EI and management',
        name_ar: 'الذكاء العاطفي والإدارة',
      },
    ],
  },
  {
    id: 'dom-travail-en-equipe',
    slug: 'travail-en-equipe',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Travail en équipe',
    name_en: 'Teamwork',
    name_ar: 'العمل الجماعي',
    courses: [
      {
        name_fr: "Fondamentaux du travail d'équipe",
        name_en: 'Teamwork fundamentals',
        name_ar: 'أساسيات العمل الجماعي',
      },
      {
        name_fr: 'Cohésion et dynamique de groupe',
        name_en: 'Group cohesion & dynamics',
        name_ar: 'التماسك والديناميكية الجماعية',
      },
      {
        name_fr: "Gestion des conflits d'équipe",
        name_en: 'Managing team conflict',
        name_ar: 'إدارة نزاعات الفريق',
      },
      {
        name_fr: 'Collaboration interservices',
        name_en: 'Cross-department collaboration',
        name_ar: 'التعاون بين المصالح',
      },
    ],
  },
  {
    id: 'dom-formations-en-anglais',
    slug: 'formations-en-anglais',
    category_id: 'cat-leadership-people-development',
    name_fr: 'Formations en anglais',
    name_en: 'English Training',
    name_ar: 'تدريبات اللغة الإنجليزية',
    courses: [
      {
        name_fr: 'Anglais professionnel général',
        name_en: 'General professional English',
        name_ar: 'الإنجليزية المهنية العامة',
      },
      { name_fr: 'Anglais des affaires', name_en: 'Business English', name_ar: 'إنجليزية الأعمال' },
      {
        name_fr: 'Anglais pour réunions et négociations',
        name_en: 'English for meetings & negotiations',
        name_ar: 'الإنجليزية للاجتماعات والمفاوضات',
      },
      {
        name_fr: 'Préparation aux certifications',
        name_en: 'Certification preparation',
        name_ar: 'التحضير للشهادات',
      },
    ],
  },

  // ---- Pillar 4: Culture, Compliance & Sustainability ----
  {
    id: 'dom-onboarding',
    slug: 'onboarding',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Onboarding',
    name_en: 'Onboarding',
    name_ar: 'الإدماج الوظيفي',
    courses: [
      {
        name_fr: "Parcours d'intégration collaborateur",
        name_en: 'Employee onboarding pathway',
        name_ar: 'مسار إدماج الموظف',
      },
      { name_fr: 'Onboarding manager', name_en: 'Manager onboarding', name_ar: 'إدماج المدير' },
      {
        name_fr: "Livret d'accueil et outils d'intégration",
        name_en: 'Welcome pack & onboarding tools',
        name_ar: 'كتيب الاستقبال وأدوات الإدماج',
      },
      {
        name_fr: "Suivi de la période d'essai",
        name_en: 'Probation period follow-up',
        name_ar: 'متابعة فترة التجربة',
      },
    ],
  },
  {
    id: 'dom-qhse',
    slug: 'qhse',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Santé – Sécurité – Environnement (QHSE)',
    name_en: 'Health, Safety & Environment (HSE)',
    name_ar: 'الصحة والسلامة والبيئة',
    courses: [
      {
        name_fr: 'Fondamentaux QHSE',
        name_en: 'HSE fundamentals',
        name_ar: 'أساسيات الصحة والسلامة والبيئة',
      },
      {
        name_fr: 'Prévention des risques professionnels',
        name_en: 'Occupational risk prevention',
        name_ar: 'الوقاية من المخاطر المهنية',
      },
      {
        name_fr: 'Système de management QHSE',
        name_en: 'HSE management system',
        name_ar: 'نظام إدارة الصحة والسلامة والبيئة',
      },
      {
        name_fr: "Gestion des situations d'urgence",
        name_en: 'Emergency situation management',
        name_ar: 'إدارة حالات الطوارئ',
      },
    ],
  },
  {
    id: 'dom-rse-developpement-durable',
    slug: 'rse-developpement-durable',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'RSE & Développement durable',
    name_en: 'CSR & Sustainability',
    name_ar: 'المسؤولية المجتمعية والتنمية المستدامة',
    courses: [
      {
        name_fr: 'Fondamentaux de la RSE',
        name_en: 'CSR fundamentals',
        name_ar: 'أساسيات المسؤولية المجتمعية',
      },
      {
        name_fr: 'Stratégie RSE et reporting extra-financier',
        name_en: 'CSR strategy & non-financial reporting',
        name_ar: 'استراتيجية المسؤولية المجتمعية والتقارير غير المالية',
      },
      {
        name_fr: 'Bilan carbone et transition écologique',
        name_en: 'Carbon footprint & ecological transition',
        name_ar: 'البصمة الكربونية والانتقال البيئي',
      },
      {
        name_fr: 'Achats responsables',
        name_en: 'Responsible purchasing',
        name_ar: 'المشتريات المسؤولة',
      },
    ],
  },
  {
    id: 'dom-ethique-compliance',
    slug: 'ethique-compliance',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Éthique & Compliance',
    name_en: 'Ethics & Compliance',
    name_ar: 'الأخلاقيات والامتثال',
    courses: [
      {
        name_fr: 'Fondamentaux de la compliance',
        name_en: 'Compliance fundamentals',
        name_ar: 'أساسيات الامتثال',
      },
      {
        name_fr: 'Prévention de la corruption',
        name_en: 'Anti-corruption prevention',
        name_ar: 'الوقاية من الفساد',
      },
      {
        name_fr: 'Protection des données (RGPD)',
        name_en: 'Data protection (GDPR)',
        name_ar: 'حماية البيانات (RGPD)',
      },
      {
        name_fr: 'Code de conduite et lanceurs d’alerte',
        name_en: 'Code of conduct & whistleblowing',
        name_ar: 'مدونة السلوك والإبلاغ عن المخالفات',
      },
    ],
  },
  {
    id: 'dom-innovation',
    slug: 'innovation',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Innovation',
    name_en: 'Innovation',
    name_ar: 'الابتكار',
    courses: [
      {
        name_fr: "Culture de l'innovation",
        name_en: 'Innovation culture',
        name_ar: 'ثقافة الابتكار',
      },
      {
        name_fr: 'Méthodes de créativité (design thinking)',
        name_en: 'Creativity methods (design thinking)',
        name_ar: 'أساليب الإبداع (التفكير التصميمي)',
      },
      {
        name_fr: 'Gestion de projets innovants',
        name_en: 'Managing innovative projects',
        name_ar: 'إدارة المشاريع المبتكرة',
      },
      {
        name_fr: 'Innovation ouverte (open innovation)',
        name_en: 'Open innovation',
        name_ar: 'الابتكار المفتوح',
      },
    ],
  },
  {
    id: 'dom-culture-entreprise',
    slug: 'culture-entreprise',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: "Culture d'entreprise",
    name_en: 'Corporate Culture',
    name_ar: 'ثقافة المؤسسة',
    courses: [
      {
        name_fr: "Fondamentaux de la culture d'entreprise",
        name_en: 'Corporate culture fundamentals',
        name_ar: 'أساسيات ثقافة المؤسسة',
      },
      {
        name_fr: 'Valeurs et engagement collaborateur',
        name_en: 'Values & employee engagement',
        name_ar: 'القيم والتزام الموظفين',
      },
      { name_fr: 'Marque employeur', name_en: 'Employer branding', name_ar: 'العلامة كصاحب عمل' },
      {
        name_fr: 'Diversité, équité et inclusion',
        name_en: 'Diversity, equity & inclusion',
        name_ar: 'التنوع والإنصاف والشمول',
      },
    ],
  },
  {
    id: 'dom-gouvernance',
    slug: 'gouvernance',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Gouvernance',
    name_en: 'Governance',
    name_ar: 'الحوكمة',
    courses: [
      {
        name_fr: "Fondamentaux de la gouvernance d'entreprise",
        name_en: 'Corporate governance fundamentals',
        name_ar: 'أساسيات حوكمة الشركات',
      },
      {
        name_fr: 'Fonctionnement du conseil d’administration',
        name_en: 'How the board of directors works',
        name_ar: 'سير عمل مجلس الإدارة',
      },
      {
        name_fr: 'Gestion des risques et conformité',
        name_en: 'Risk & compliance management',
        name_ar: 'إدارة المخاطر والامتثال',
      },
      {
        name_fr: 'Responsabilité des dirigeants',
        name_en: 'Executive accountability',
        name_ar: 'مسؤولية المسيّرين',
      },
    ],
  },
  {
    id: 'dom-organisation',
    slug: 'organisation',
    category_id: 'cat-culture-compliance-sustainability',
    name_fr: 'Organisation',
    name_en: 'Organization',
    name_ar: 'التنظيم',
    courses: [
      {
        name_fr: 'Conception organisationnelle',
        name_en: 'Organizational design',
        name_ar: 'التصميم التنظيمي',
      },
      {
        name_fr: 'Fiches de poste et organigrammes',
        name_en: 'Job descriptions & org charts',
        name_ar: 'بطاقات الوظائف والهياكل التنظيمية',
      },
      {
        name_fr: 'Conduite de réunions efficaces',
        name_en: 'Running effective meetings',
        name_ar: 'قيادة اجتماعات فعالة',
      },
      {
        name_fr: 'Amélioration continue des processus',
        name_en: 'Continuous process improvement',
        name_ar: 'التحسين المستمر للعمليات',
      },
    ],
  },
]
