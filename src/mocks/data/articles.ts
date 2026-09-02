import { MEDIA } from '@/config/media'
import type { ArticleDTO } from '@/types/dto/article.dto'

/**
 * Demo article/resource content (M4, spec §7 "Articles / Ressources").
 * `content_*` is a single plain-text field with blank-line paragraph
 * breaks (rendered via `whitespace-pre-line` on the details page) rather
 * than a rich structured body — CLAUDE.md §7 "Do not create an
 * unnecessary CMS." Images reuse the existing `MEDIA` photo set assigned
 * by topic, not new assets.
 */
export const mockArticleDTOs: ArticleDTO[] = [
  {
    id: 'art-first-year-management',
    slug: 'reussir-sa-premiere-annee-de-management',
    title_fr: '5 leviers pour réussir sa première année de management',
    title_en: '5 levers for succeeding in your first year as a manager',
    title_ar: '5 روافع للنجاح في أول سنة كمدير',
    excerpt_fr:
      'Passer de collègue à manager change plus de choses qu’il n’y paraît. Voici les repères qui font la différence la première année.',
    excerpt_en:
      'Moving from peer to manager changes more than it seems. Here are the reference points that make a difference in the first year.',
    excerpt_ar:
      'الانتقال من زميل إلى مدير يغيّر أكثر مما يبدو. إليك المعايير التي تُحدث الفرق في السنة الأولى.',
    content_fr:
      'Devenir manager pour la première fois est rarement une simple formalité : la posture, la légitimité et les repères changent d’un coup, souvent sans préparation.\n\nLe premier levier est la clarté : fixer des attentes explicites avec chaque membre de l’équipe évite la plupart des malentendus des premières semaines.\n\nLe deuxième est la régularité des points individuels, même courts — ils valent mieux qu’un seul entretien annuel.\n\nEnfin, accepter de ne pas tout savoir immédiatement, et le dire, construit davantage de confiance qu’une posture d’expert forcée.',
    content_en:
      'Becoming a manager for the first time is rarely a simple formality: posture, legitimacy and reference points all shift at once, often without preparation.\n\nThe first lever is clarity: setting explicit expectations with each team member avoids most of the early misunderstandings.\n\nThe second is the regularity of one-on-ones, even short ones — they matter more than a single annual review.\n\nFinally, accepting you don’t know everything yet, and saying so, builds more trust than a forced expert posture.',
    content_ar:
      'أن تصبح مديراً لأول مرة نادراً ما يكون مجرد إجراء شكلي: يتغير الموقف والشرعية والمرجعية دفعة واحدة، وغالباً دون تحضير مسبق.\n\nالرافعة الأولى هي الوضوح: تحديد توقعات صريحة مع كل عضو في الفريق يتجنب معظم سوء الفهم في الأسابيع الأولى.\n\nالرافعة الثانية هي انتظام اللقاءات الفردية، حتى لو كانت قصيرة — فهي أهم من مقابلة سنوية واحدة.\n\nأخيراً، تقبّل عدم معرفة كل شيء فوراً، والتعبير عن ذلك، يبني ثقة أكبر من موقف الخبير المصطنع.',
    category_fr: 'Leadership & Management',
    category_en: 'Leadership & Management',
    category_ar: 'القيادة والإدارة',
    author_name: 'Karim Benali',
    published_date: '2026-06-18',
    reading_time_minutes: 6,
    image_url: MEDIA.leadership,
    is_featured: true,
  },
  {
    id: 'art-digital-transformation-teams',
    slug: 'piloter-la-transformation-digitale-sans-perdre-ses-equipes',
    title_fr: 'Piloter la transformation digitale sans perdre ses équipes en route',
    title_en: 'Leading digital transformation without losing your teams along the way',
    title_ar: 'قيادة التحول الرقمي دون فقدان الفرق في الطريق',
    excerpt_fr:
      'Un nouvel outil ne suffit jamais à transformer une organisation. Ce qui fait vraiment la différence, c’est l’accompagnement des équipes.',
    excerpt_en:
      'A new tool is never enough to transform an organization on its own. What really makes the difference is how teams are supported.',
    excerpt_ar:
      'أداة جديدة وحدها لا تكفي أبداً لتحويل مؤسسة. ما يُحدث الفرق الحقيقي هو مرافقة الفرق.',
    content_fr:
      'La plupart des projets de transformation digitale échouent moins pour des raisons techniques que pour des raisons humaines.\n\nImpliquer des relais internes dès la phase de test permet de repérer les points de friction avant le déploiement général.\n\nCommuniquer sur le pourquoi, pas seulement sur le comment, aide les équipes à comprendre l’intérêt du changement plutôt que de le subir.\n\nEnfin, prévoir un accompagnement après le lancement — pas seulement avant — évite que l’adoption ne retombe après les premières semaines.',
    content_en:
      'Most digital transformation projects fail less for technical reasons than for human ones.\n\nInvolving internal champions from the testing phase helps surface friction points before the wider rollout.\n\nCommunicating the why, not just the how, helps teams understand the change rather than simply endure it.\n\nFinally, planning support after launch — not only before — prevents adoption from fading after the first few weeks.',
    content_ar:
      'معظم مشاريع التحول الرقمي تفشل لأسباب بشرية أكثر منها تقنية.\n\nإشراك نقاط اتصال داخلية منذ مرحلة الاختبار يساعد على رصد نقاط الاحتكاك قبل النشر الواسع.\n\nالتواصل حول "لماذا" وليس فقط "كيف" يساعد الفرق على فهم جدوى التغيير بدل تحمّله فحسب.\n\nأخيراً، التخطيط للمرافقة بعد الإطلاق — وليس فقط قبله — يمنع تراجع التبني بعد الأسابيع الأولى.',
    category_fr: 'IT & Digital',
    category_en: 'IT & Digital',
    category_ar: 'تكنولوجيا المعلومات والرقمنة',
    author_name: 'Julie Fontaine',
    published_date: '2026-07-25',
    reading_time_minutes: 7,
    image_url: MEDIA.digitalTransformation,
    is_featured: false,
  },
  {
    id: 'art-effective-team-meetings',
    slug: 'structurer-une-reunion-dequipe-efficace',
    title_fr: 'Structurer une réunion d’équipe vraiment efficace',
    title_en: 'Structuring a genuinely effective team meeting',
    title_ar: 'هيكلة اجتماع فريق فعّال حقاً',
    excerpt_fr:
      'Trop de réunions, pas assez de décisions. Quelques principes simples suffisent à changer la donne.',
    excerpt_en:
      'Too many meetings, not enough decisions. A few simple principles are enough to change that.',
    excerpt_ar: 'اجتماعات كثيرة وقرارات قليلة. بضعة مبادئ بسيطة كافية لتغيير الوضع.',
    content_fr:
      'Une réunion sans objectif clair produit rarement une décision claire.\n\nCommencer chaque réunion en rappelant sa finalité — informer, décider ou co-construire — évite qu’elle ne dérive.\n\nLimiter le nombre de participants aux personnes réellement concernées accélère les échanges et les décisions.\n\nTerminer systématiquement par un récapitulatif des actions et des responsables évite les réunions qui se répètent sans avancer.',
    content_en:
      'A meeting without a clear objective rarely produces a clear decision.\n\nOpening every meeting by restating its purpose — inform, decide, or co-build — keeps it from drifting.\n\nLimiting attendees to those genuinely concerned speeds up both discussion and decisions.\n\nAlways closing with a recap of actions and owners prevents meetings that repeat themselves without progress.',
    content_ar:
      'الاجتماع بلا هدف واضح نادراً ما ينتج قراراً واضحاً.\n\nبدء كل اجتماع بتذكير بغايته — إعلام أو قرار أو بناء مشترك — يمنعه من الانحراف.\n\nتحديد الحضور بمن يعنيهم الأمر فعلاً يسرّع النقاش والقرارات.\n\nالختم دائماً بملخص للإجراءات والمسؤولين يمنع تكرار الاجتماعات دون تقدم.',
    category_fr: 'Leadership & Management',
    category_en: 'Leadership & Management',
    category_ar: 'القيادة والإدارة',
    author_name: 'Karim Benali',
    published_date: '2026-04-15',
    reading_time_minutes: 4,
    image_url: MEDIA.management,
    is_featured: false,
  },
  {
    id: 'art-communicating-through-change',
    slug: 'communiquer-efficacement-en-periode-de-changement',
    title_fr: 'Communiquer efficacement en période de changement',
    title_en: 'Communicating effectively during periods of change',
    title_ar: 'التواصل الفعّال في فترات التغيير',
    excerpt_fr:
      'Le silence est souvent perçu comme un signal négatif. Ce que les équipes attendent vraiment pendant une période de transition.',
    excerpt_en:
      'Silence is often read as a bad sign. What teams really need to hear during a period of transition.',
    excerpt_ar:
      'الصمت غالباً ما يُفهم كإشارة سلبية. ما تحتاج الفرق فعلاً سماعه خلال فترة انتقالية.',
    content_fr:
      'En période de changement, l’absence d’information est presque toujours interprétée négativement.\n\nCommuniquer régulièrement, même sans nouvelle majeure, rassure davantage qu’un long silence suivi d’une grande annonce.\n\nReconnaître les incertitudes plutôt que les masquer renforce la crédibilité du message.\n\nEnfin, donner un espace pour les questions — et y répondre réellement — fait la différence entre une communication descendante et un vrai dialogue.',
    content_en:
      'During periods of change, a lack of information is almost always read negatively.\n\nCommunicating regularly, even without major news, reassures far more than a long silence followed by one big announcement.\n\nAcknowledging uncertainty rather than hiding it strengthens the credibility of the message.\n\nFinally, making room for questions — and genuinely answering them — is what separates top-down messaging from real dialogue.',
    content_ar:
      'في فترات التغيير، يُفهم غياب المعلومة سلباً في أغلب الأحيان.\n\nالتواصل المنتظم، حتى دون أخبار كبرى، يطمئن أكثر من صمت طويل يتبعه إعلان كبير.\n\nالاعتراف بأوجه عدم اليقين بدل إخفائها يعزز مصداقية الرسالة.\n\nأخيراً، إتاحة مجال للأسئلة — والإجابة عنها فعلاً — هو ما يميز التواصل الأحادي عن الحوار الحقيقي.',
    category_fr: 'Communication',
    category_en: 'Communication',
    category_ar: 'التواصل',
    author_name: 'Yasmine Haddad',
    published_date: '2026-05-30',
    reading_time_minutes: 5,
    image_url: MEDIA.communication,
    is_featured: false,
  },
  {
    id: 'art-hr-strategy-alignment',
    slug: 'aligner-la-strategie-rh-sur-la-strategie-dentreprise',
    title_fr: 'Aligner la stratégie RH sur la stratégie d’entreprise',
    title_en: 'Aligning HR strategy with business strategy',
    title_ar: 'مواءمة استراتيجية الموارد البشرية مع استراتيجية المؤسسة',
    excerpt_fr:
      'La formation n’a d’impact réel que lorsqu’elle sert directement les priorités de l’entreprise. Comment faire le lien.',
    excerpt_en:
      'Training only has real impact when it directly serves business priorities. How to make that connection.',
    excerpt_ar:
      'التدريب له أثر حقيقي فقط عندما يخدم أولويات المؤسسة مباشرة. كيفية إقامة هذا الرابط.',
    content_fr:
      'Un plan de formation déconnecté des priorités business reste, au mieux, un investissement isolé.\n\nPartir des objectifs stratégiques de l’entreprise pour identifier les compétences critiques évite de disperser le budget formation.\n\nImpliquer les responsables métiers dans la construction du plan de formation en renforce l’adhésion et la pertinence.\n\nMesurer l’impact sur des indicateurs business — pas uniquement sur la satisfaction des participants — permet de justifier l’investissement dans la durée.',
    content_en:
      'A training plan disconnected from business priorities remains, at best, an isolated investment.\n\nStarting from the company’s strategic goals to identify critical skills prevents the training budget from being spread too thin.\n\nInvolving business leaders in building the training plan strengthens both buy-in and relevance.\n\nMeasuring impact against business indicators — not only participant satisfaction — helps justify the investment over time.',
    content_ar:
      'خطة تدريب منفصلة عن أولويات العمل تبقى، في أفضل الأحوال، استثماراً معزولاً.\n\nالانطلاق من الأهداف الاستراتيجية للمؤسسة لتحديد المهارات الحرجة يمنع تشتت ميزانية التدريب.\n\nإشراك مسؤولي الأعمال في بناء خطة التدريب يعزز الالتزام والملاءمة.\n\nقياس الأثر على مؤشرات العمل — وليس فقط رضا المشاركين — يساعد على تبرير الاستثمار على المدى الطويل.',
    category_fr: 'Ressources humaines',
    category_en: 'Human Resources',
    category_ar: 'الموارد البشرية',
    author_name: 'Julie Fontaine',
    published_date: '2026-03-22',
    reading_time_minutes: 6,
    image_url: MEDIA.strategy,
    is_featured: false,
  },
  {
    id: 'art-where-to-start-corporate-training',
    slug: 'former-ses-equipes-en-entreprise-par-ou-commencer',
    title_fr: 'Former ses équipes en entreprise : par où commencer ?',
    title_en: 'Training your teams in-house: where to start',
    title_ar: 'تدريب فرق شركتك: من أين تبدأ؟',
    excerpt_fr:
      'Un premier programme de formation d’entreprise réussi commence toujours par un diagnostic honnête des besoins réels.',
    excerpt_en:
      'A successful first corporate training program always starts with an honest diagnosis of real needs.',
    excerpt_ar: 'أول برنامج تدريب ناجح للمؤسسة يبدأ دائماً بتشخيص صادق للاحتياجات الفعلية.',
    content_fr:
      'Se lancer dans la formation d’entreprise sans diagnostic préalable mène souvent à des programmes génériques, peu suivis.\n\nCommencer par des entretiens courts avec quelques managers et collaborateurs permet d’identifier les besoins réels, souvent différents des besoins supposés.\n\nPrivilégier un premier programme pilote sur une équipe restreinte permet d’ajuster l’approche avant un déploiement plus large.\n\nEnfin, prévoir dès le départ un moyen simple de mesurer l’impact évite de devoir le justifier a posteriori.',
    content_en:
      'Launching corporate training without prior diagnosis often leads to generic programs with weak follow-through.\n\nStarting with short interviews with a few managers and employees helps identify real needs, often different from assumed ones.\n\nRunning a first pilot program with a small team allows the approach to be adjusted before a wider rollout.\n\nFinally, planning a simple way to measure impact from the start avoids having to justify it after the fact.',
    content_ar:
      'إطلاق برنامج تدريب مؤسسي دون تشخيص مسبق يؤدي غالباً إلى برامج عامة وضعيفة المتابعة.\n\nالبدء بمقابلات قصيرة مع بعض المديرين والموظفين يساعد على تحديد الاحتياجات الفعلية، التي غالباً ما تختلف عن الاحتياجات المفترضة.\n\nتفضيل برنامج تجريبي أول على فريق محدود يتيح تعديل المقاربة قبل النشر الأوسع.\n\nأخيراً، التخطيط منذ البداية لطريقة بسيطة لقياس الأثر يمنع الحاجة لتبريره لاحقاً.',
    category_fr: 'Formation en entreprise',
    category_en: 'Corporate training',
    category_ar: 'التدريب المؤسسي',
    author_name: 'Karim Benali',
    published_date: '2026-02-10',
    reading_time_minutes: 5,
    image_url: MEDIA.companyTraining,
    is_featured: false,
  },
]
