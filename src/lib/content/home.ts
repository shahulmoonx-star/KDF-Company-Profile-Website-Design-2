import type { Locale } from "@/lib/i18n/config";
import type { HomePage } from "./types";

/**
 * Mock homepage content, one document per locale.
 *
 * Every figure and claim here is sourced from the client's own published
 * material — see docs/website-content-source.md, which records the verbatim
 * text this was written from. Where that source contradicts itself (it says
 * both "450" and "500+" employees), the homepage figure is used, since this
 * is the homepage; the discrepancy is logged in that document for KDF to
 * settle.
 *
 * The Arabic is a first-pass translation pending KDF's review — see
 * docs/i18n.md. It is written to be read, not transliterated: industry terms
 * follow standard Arabic technical usage, and the three product-line brand
 * names (Treat / Protect / Assure) stay in Latin script.
 *
 * This is temporary content. Once the .NET API is live, replace the body of
 * getHomePage() below with a real fetch — no component changes, since every
 * section already consumes this typed shape.
 */
const homePageByLocale: Record<Locale, HomePage> = {
  en: {
    hero: {
      eyebrow: "Serving Kuwait & the GCC",
      eyebrowHighlight: "since 1966",
      title: "Precision fluids for the Gulf's toughest wells.",
      strapline: "Precision engineered. Field proven.",
      primaryCta: "Explore our solutions",
      secondaryCta: "Talk to our engineers",
    },
    footprint: {
      eyebrow: "Business footprint",
      title: "Six decades of operating scale.",
      clientsLead:
        "Trusted by Kuwait's national energy operators and the region's largest industrial groups.",
      clients: [
        { id: "koc", name: "Kuwait Oil Company", logo: "/images/client-logo-1.png" },
        {
          id: "kasco",
          name: "Kuwait Aviation Services Company",
          logo: "/images/client-logo-2.png",
        },
        { id: "kotc", name: "Kuwait Oil Tanker Company", logo: "/images/client-logo-3.png" },
        { id: "alghanim", name: "Alghanim Industries", logo: "/images/client-logo-4.png" },
        {
          id: "knpc",
          name: "Kuwait National Petroleum Company",
          logo: "/images/client-logo-5.png",
        },
      ],
      stats: [
        { id: "countries", value: 4, label: "Countries" },
        { id: "employees", value: 450, label: "Employees" },
        { id: "years", value: 60, label: "Years" },
        { id: "clients", value: 50, label: "Clients" },
      ],
    },
    solutions: {
      eyebrow: "Solutions & products",
      title: "Three engineering disciplines, one integrated supplier.",
      lead: "From the first metre drilled to the flow assurance that keeps a field producing, KDF formulates, manufactures and services the chemistry in between.",
      items: [
        {
          id: "drilling",
          title: "Drilling & Completion Fluids",
          strap: "Engineered customised solutions addressing drilling and completion challenges.",
          image: "/images/home-drilling-1.jpg",
          capabilities: [
            "Shale stabilisers & inhibitors",
            "Filtration control agents",
            "Lost circulation materials",
            "Wellbore strengthening",
            "Weighting agents",
            "Reservoir drill-in fluids",
            "Brines & packer fluids",
            "Lubricants & surfactants",
          ],
        },
        {
          id: "production",
          title: "Production Chemistry",
          strap: "Tailored chemistries for maximising production, asset protection and flow assurance — from reservoir to refinery.",
          image: "/images/home-chemistry-1.jpg",
          capabilities: [
            "Treat — demulsifiers, water clarifiers, flow improvers",
            "Protect — scale, corrosion, hydrate & asphaltene inhibitors",
            "Assure — H₂S and oxygen scavengers, scale dissolvers",
            "Microbiocides",
            "Defoamers",
          ],
        },
        {
          id: "cementing",
          title: "Cementing Solutions",
          strap: "Products, services and laboratory support for well integrity across the life of the asset.",
          image: "/images/home-cementing-1.jpg",
          capabilities: [
            "Cementing products & services",
            "Laboratory and technical support",
            "Product data sheets",
            "Field-proven case histories",
          ],
        },
      ],
    },
    // The three stage descriptions are the reference build's own tagline
    // for each (design/kdf-kuwait-fluid-spark-main); the tags under each
    // are the same chemical categories already listed under "Production
    // Chemistry" in solutions.items above, just split out one per tag
    // instead of run together in one clause.
    production: {
      eyebrow: "Production Technologies",
      lead: "Production chemistry programs that help improve operational efficiency, asset integrity and flow assurance.",
      pillars: [
        {
          id: "treat",
          title: "Treat",
          description: "Solutions designed to support production treatment and operational optimisation.",
          tags: ["Demulsifiers", "Water clarifiers", "Flow improvers"],
          image: "/images/home-treat-1.jpg",
        },
        {
          id: "protect",
          title: "Protect",
          description: "Chemistry programs focused on asset protection, corrosion control and reliability.",
          tags: ["Scale & corrosion inhibitors", "Hydrate & asphaltene inhibitors"],
          image: "/images/home-protect-1.jpg",
        },
        {
          id: "assure",
          title: "Assure",
          description: "Flow assurance solutions to support continuous and efficient production.",
          tags: ["H₂S & oxygen scavengers", "Scale dissolvers", "Microbiocides", "Defoamers"],
          image: "/images/home-assure-1.jpg",
        },
      ],
    },
    // NOTE: this section's location list (6 countries) comes from the same
    // client-supplied brief as footprint.stats above, whose "Countries"
    // figure says 4. Both are reproduced as given rather than reconciled —
    // see the file-level note on the KOC/employee-count discrepancy.
    presence: {
      eyebrow: "Regional Presence",
      title: "Kuwait-Based.",
      titleHighlight: "Regionally Connected.",
      lead: "KDF combines local expertise with regional service capability to support energy-sector clients across Kuwait and the GCC.",
      hqSublabel: "Headquarters",
      coordinatesLabel: "29.3°N 47.9°E",
      regionLabel: "GCC / MENA",
      networkLabel: "KDF · Regional network",
      distanceUnit: "km",
      hq: { id: "kuwait", name: "Kuwait HQ", coordinates: [47.9774, 29.3759] },
      locations: [
        { id: "saudi", name: "Saudi Arabia", coordinates: [45.0792, 23.8859] },
        { id: "uae", name: "UAE", coordinates: [53.8478, 23.4241] },
        { id: "oman", name: "Oman", coordinates: [55.9754, 21.4735] },
        { id: "bahrain", name: "Bahrain", coordinates: [50.5577, 26.0667] },
        { id: "iraq", name: "Iraq", coordinates: [43.6793, 33.2232] },
      ],
    },
    capability: {
      eyebrow: "Infrastructure & capabilities",
      title: "A 70,000 m² manufacturing base inside Shuaiba Port.",
      lead: "Three state-of-the-art roller grinding mills and semi-automated blending lines — unrivalled by any comparable service provider in Kuwait, and the reason KDF supplies the region rather than importing into it.",
      image: "/images/home-chemistry-1.jpg",
      items: [
        {
          id: "site",
          value: 70000,
          unit: "m²",
          label: "Secured manufacturing site at Shuaiba Port",
          fill: 0.62,
        },
        {
          id: "dry",
          value: 250000,
          unit: "MT / year",
          label: "Barite, bentonite, calcium carbonate & marble",
          fill: 0.88,
        },
        {
          id: "liquid",
          value: 28800000,
          unit: "litres / year",
          label: "Water- and solvent-based liquid chemical blending",
          fill: 1,
        },
        {
          id: "mills",
          value: 3,
          unit: "mills",
          label: "Roller grinding mill facilities, locally operated",
          fill: 0.3,
        },
      ],
    },
    recognition: {
      eyebrow: "Awards & certifications",
      title: "Excellence, recognised.",
      lead: "KDF's record is measured by the people who audit it — national awards, international safety bodies and certified management systems.",
      awards: [
        { id: "assp-gold-2024", image: "/images/home-people.jpg", imageAlt: "Field engineering team — placeholder image", imagePlaceholder: true, shortTitle: "ASSP Gold", year: "2024", title: "ASSP GCC Gold — Management Excellence" },
        { id: "assp-silver-2024", image: "/images/home-protect-1.jpg", imageAlt: "Technical operations — placeholder image", imagePlaceholder: true, shortTitle: "ASSP Silver", year: "2024", title: "ASSP GCC Silver — HSE Excellence" },
        {
          id: "amir-2023", image: "/images/hero/hero-banner-2.jpg", imageAlt: "Manufacturing facility — placeholder image", imagePlaceholder: true, shortTitle: "Amir’s Award",
          year: "2023",
          title: "His Highness the Amir of Kuwait's Award for Outstanding Factories",
        },
        {
          id: "stevie-2020", image: "/images/home-chemistry-1.jpg", imageAlt: "Fluid chemistry research — placeholder image", imagePlaceholder: true, shortTitle: "Stevie Gold",
          year: "2020",
          title: "Stevie Gold — Innovation in Technology Development (HPWBF)",
        },
        { id: "ehs-2018", image: "/images/home-people.jpg", imageAlt: "Engineering team at work — placeholder image", imagePlaceholder: true, shortTitle: "EHS Excellence", year: "2018", title: "EHS Outstanding Performance Award" },
        { id: "koc-2017", image: "/images/home-treat-1.jpg", imageAlt: "Production facility — placeholder image", imagePlaceholder: true, shortTitle: "KOC CEO Award", year: "2017", title: "KOC CEO Award — Gas Conditioning Project" },
        { id: "chesm-2017", image: "/images/home-drilling-1.jpg", imageAlt: "Drilling operations — placeholder image", imagePlaceholder: true, shortTitle: "CHESM A-Rating", year: "2017", title: "CHESM Award for EHS A-Rating" },
      ],
      certifications: [
        { id: "iso-9001", image: "/images/home-chemistry-1.jpg", imageAlt: "Laboratory quality testing — placeholder image", imagePlaceholder: true, standard: "ISO 9001:2015", label: "Quality management" },
        { id: "iso-14001", image: "/images/home-sustainability.jpg", imageAlt: "Industrial facility in a desert landscape — placeholder image", imagePlaceholder: true, standard: "ISO 14001:2015", label: "Environmental management" },
        { id: "iso-45001", image: "/images/home-people.jpg", imageAlt: "Engineers wearing safety equipment — placeholder image", imagePlaceholder: true, standard: "ISO 45001:2018", label: "Occupational health & safety" },
      ],
    },
    sustainability: {
      eyebrow: "Sustainability",
      title: "For a better tomorrow.",
      quote:
        "Our ambition is clear: to reduce emissions across Scope 1, 2 and 3, advance net-zero goals, and foster a balanced, synergised relationship with our planet.",
      attribution: "Message from the CEO, 2024 Sustainability Report",
      pillars: [
        {
          id: "emissions", image: "/images/home-sustainability.jpg", imageAlt: "Industrial facility surrounded by desert vegetation",
          title: "Emissions",
          body: "Reduction targets set across Scope 1, 2 and 3, reported openly rather than summarised.",
        },
        {
          id: "environment", image: "/images/home-assure-1.jpg", imageAlt: "Water treatment equipment",
          title: "Environment",
          body: "Spill prevention, energy reduction, emissions control and responsible waste handling across every site.",
        },
        {
          id: "people", image: "/images/home-people.jpg", imageAlt: "Engineers at an industrial facility",
          title: "People & local content",
          body: "Kuwaitisation, training and a work environment held to certified occupational health and safety standards.",
        },
      ],
    },
    news: {
      eyebrow: "Latest news",
      title: "What's happening at KDF.",
      items: [
        {
          id: "assp-2024",
          year: "2024",
          category: "Award",
          title: "KDF secures Gold for driving management excellence at the ASSP GCC Awards",
        },
        {
          id: "assp-silver-2024",
          year: "2024",
          category: "Award",
          title: "KDF secures Silver for HSE excellence at the ASSP GCC Awards",
        },
        {
          id: "report-2024",
          year: "2024",
          category: "Sustainability",
          title: "KDF publishes its first Sustainability Report, aligned with Kuwait's Vision 2035",
        },
        {
          id: "stevie-2020",
          year: "2020",
          category: "Technology",
          title:
            "Stevie Gold Award for high-performance water-base fluid — an environmentally friendly alternative to oil-base systems",
        },
      ],
    },
    contact: {
      title: "Let's get to work.",
      image: "/images/hero/hero-banner-1.jpg",
      imageAlt: "Drilling rig in a desert oilfield at sunset",
      cta: "Talk to KDF",
      emailLabel: "Email",
      phoneLabel: "Call",
      locationLabel: "Visit",
    },
  },
  ar: {
    hero: {
      eyebrow: "نخدم الكويت ودول الخليج",
      eyebrowHighlight: "منذ عام 1966",
      title: "سوائل دقيقة لأصعب آبار الخليج.",
      strapline: "دقة هندسية. أداء ميداني مثبت.",
      primaryCta: "استكشف حلولنا",
      secondaryCta: "تحدث مع مهندسينا",
    },
    footprint: {
      eyebrow: "حضورنا",
      title: "ستة عقود من الخبرة التشغيلية.",
      clientsLead:
        "موضع ثقة كبرى شركات الطاقة الوطنية في الكويت وأكبر المجموعات الصناعية في المنطقة.",
      clients: [
        { id: "koc", name: "شركة نفط الكويت", logo: "/images/client-logo-1.png" },
        {
          id: "kasco",
          name: "الشركة الكويتية لخدمات الطيران",
          logo: "/images/client-logo-2.png",
        },
        { id: "kotc", name: "شركة ناقلات النفط الكويتية", logo: "/images/client-logo-3.png" },
        { id: "alghanim", name: "الغانم للصناعات", logo: "/images/client-logo-4.png" },
        {
          id: "knpc",
          name: "شركة البترول الوطنية الكويتية",
          logo: "/images/client-logo-5.png",
        },
      ],
      stats: [
        { id: "countries", value: 4, label: "الدول" },
        { id: "employees", value: 450, label: "الموظفون" },
        { id: "years", value: 60, label: "السنوات" },
        { id: "clients", value: 50, label: "العملاء" },
      ],
    },
    solutions: {
      eyebrow: "الحلول والمنتجات",
      title: "ثلاثة تخصصات هندسية لدى مورّد متكامل واحد.",
      lead: "من أول متر يتم حفره إلى ضمان التدفق الذي يُبقي الحقل منتجًا، تتولى KDF تركيب وتصنيع وخدمة الكيمياء في ما بينهما.",
      items: [
        {
          id: "drilling",
          title: "سوائل الحفر والإكمال",
          strap: "حلول مُصمّمة خصيصًا لمعالجة تحديات الحفر والإكمال.",
          image: "/images/home-drilling-1.jpg",
          capabilities: [
            "مثبّتات ومثبطات الصخور الطفلية",
            "عوامل التحكم في الترشيح",
            "مواد منع فقد الدوران",
            "تقوية جدار البئر",
            "مواد الترجيح",
            "سوائل الحفر داخل المكمن",
            "المحاليل الملحية وسوائل الحشوات",
            "مواد التزليق والمواد الخافضة للتوتر السطحي",
          ],
        },
        {
          id: "production",
          title: "كيمياء الإنتاج",
          strap: "كيمياء مُصمّمة لرفع الإنتاج وحماية الأصول وضمان التدفق، من المكمن إلى المصفاة.",
          image: "/images/home-chemistry-1.jpg",
          capabilities: [
            "Treat — كاسرات المستحلبات ومروّقات المياه ومحسّنات التدفق",
            "Protect — مثبطات الترسبات والتآكل والهيدرات والأسفلتين",
            "Assure — كواسح كبريتيد الهيدروجين والأكسجين ومذيبات الترسبات",
            "المبيدات الميكروبية",
            "مزيلات الرغوة",
          ],
        },
        {
          id: "cementing",
          title: "حلول الإسمنت",
          strap: "منتجات وخدمات ودعم مخبري لسلامة الآبار على امتداد عمر الأصل.",
          image: "/images/home-cementing-1.jpg",
          capabilities: [
            "منتجات وخدمات الإسمنت",
            "الدعم المخبري والفني",
            "نشرات بيانات المنتجات",
            "دراسات حالة ميدانية مُثبتة",
          ],
        },
      ],
    },
    production: {
      eyebrow: "تقنيات الإنتاج",
      lead: "برامج كيمياء الإنتاج التي تساعد على تحسين الكفاءة التشغيلية وسلامة الأصول وضمان التدفق.",
      pillars: [
        {
          id: "treat",
          title: "Treat",
          description: "حلول مصمّمة لدعم معالجة الإنتاج وتحسين الكفاءة التشغيلية.",
          tags: ["كاسرات المستحلبات", "مروّقات المياه", "محسّنات التدفق"],
          image: "/images/home-treat-1.jpg",
        },
        {
          id: "protect",
          title: "Protect",
          description: "برامج كيميائية تركّز على حماية الأصول ومكافحة التآكل والموثوقية.",
          tags: ["مثبطات الترسبات والتآكل", "مثبطات الهيدرات والأسفلتين"],
          image: "/images/home-protect-1.jpg",
        },
        {
          id: "assure",
          title: "Assure",
          description: "حلول ضمان التدفق لدعم إنتاج مستمر وفعّال.",
          tags: ["كواسح كبريتيد الهيدروجين والأكسجين", "مذيبات الترسبات", "المبيدات الميكروبية", "مزيلات الرغوة"],
          image: "/images/home-assure-1.jpg",
        },
      ],
    },
    presence: {
      eyebrow: "الحضور الإقليمي",
      title: "مقرّها الكويت.",
      titleHighlight: "متصلة إقليميًا.",
      lead: "تجمع KDF بين الخبرة المحلية والقدرة على تقديم الخدمات الإقليمية لدعم عملاء قطاع الطاقة في الكويت ودول مجلس التعاون الخليجي.",
      hqSublabel: "المقر الرئيسي",
      coordinatesLabel: "29.3°N 47.9°E",
      regionLabel: "GCC / MENA",
      networkLabel: "KDF · الشبكة الإقليمية",
      distanceUnit: "كم",
      hq: { id: "kuwait", name: "مقر الكويت الرئيسي", coordinates: [47.9774, 29.3759] },
      locations: [
        { id: "saudi", name: "السعودية", coordinates: [45.0792, 23.8859] },
        { id: "uae", name: "الإمارات", coordinates: [53.8478, 23.4241] },
        { id: "oman", name: "عُمان", coordinates: [55.9754, 21.4735] },
        { id: "bahrain", name: "البحرين", coordinates: [50.5577, 26.0667] },
        { id: "iraq", name: "العراق", coordinates: [43.6793, 33.2232] },
      ],
    },
    capability: {
      eyebrow: "البنية التحتية والإمكانات",
      title: "قاعدة تصنيع على مساحة 70,000 م² داخل ميناء الشعيبة.",
      lead: "ثلاثة مصانع طحن دوّارة بأحدث التقنيات وخطوط خلط شبه آلية، لا يضاهيها أي مزوّد خدمات مماثل في الكويت، وهي سبب قدرة KDF على تزويد المنطقة بدل الاستيراد إليها.",
      image: "/images/home-chemistry-1.jpg",
      items: [
        {
          id: "site",
          value: 70000,
          unit: "م²",
          label: "موقع تصنيع مؤمَّن في ميناء الشعيبة",
          fill: 0.62,
        },
        {
          id: "dry",
          value: 250000,
          unit: "طن متري / سنويًا",
          label: "الباريت والبنتونيت وكربونات الكالسيوم والرخام",
          fill: 0.88,
        },
        {
          id: "liquid",
          value: 28800000,
          unit: "لتر / سنويًا",
          label: "خلط الكيماويات السائلة ذات الأساس المائي أو المذيب",
          fill: 1,
        },
        {
          id: "mills",
          value: 3,
          unit: "مطاحن",
          label: "مطاحن أسطوانية تُدار محليًا",
          fill: 0.3,
        },
      ],
    },
    recognition: {
      eyebrow: "الجوائز والشهادات",
      title: "تميّز يستحق التقدير.",
      lead: "سجل KDF تقيسه الجهات التي تدقّقه: جوائز وطنية وهيئات سلامة دولية وأنظمة إدارة معتمدة.",
      awards: [
        { id: "assp-gold-2024", image: "/images/home-people.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "ذهبية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الذهبية للتميّز الإداري" },
        { id: "assp-silver-2024", image: "/images/home-protect-1.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "فضية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الفضية للتميّز في الصحة والسلامة" },
        {
          id: "amir-2023", image: "/images/hero/hero-banner-2.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "جائزة سمو الأمير",
          year: "2023",
          title: "جائزة حضرة صاحب السمو أمير البلاد للمصانع المتميّزة",
        },
        {
          id: "stevie-2020", image: "/images/home-chemistry-1.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "ذهبية Stevie",
          year: "2020",
          title: "جائزة Stevie الذهبية للابتكار في تطوير التقنية (HPWBF)",
        },
        { id: "ehs-2018", image: "/images/home-people.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "التميّز في السلامة", year: "2018", title: "جائزة الأداء المتميّز في البيئة والصحة والسلامة" },
        { id: "koc-2017", image: "/images/home-treat-1.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "جائزة الرئيس التنفيذي لشركة نفط الكويت", year: "2017", title: "جائزة الرئيس التنفيذي لشركة نفط الكويت — مشروع معالجة الغاز" },
        { id: "chesm-2017", image: "/images/home-drilling-1.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, shortTitle: "تصنيف A من CHESM", year: "2017", title: "جائزة CHESM لتصنيف A في البيئة والصحة والسلامة" },
      ],
      certifications: [
        { id: "iso-9001", image: "/images/home-chemistry-1.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, standard: "ISO 9001:2015", label: "إدارة الجودة" },
        { id: "iso-14001", image: "/images/home-sustainability.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, standard: "ISO 14001:2015", label: "الإدارة البيئية" },
        { id: "iso-45001", image: "/images/home-people.jpg", imageAlt: "صورة توضيحية مؤقتة", imagePlaceholder: true, standard: "ISO 45001:2018", label: "الصحة والسلامة المهنية" },
      ],
    },
    sustainability: {
      eyebrow: "الاستدامة",
      title: "من أجل غدٍ أفضل.",
      quote:
        "طموحنا واضح: خفض الانبعاثات في النطاقات الأول والثاني والثالث، والمضي نحو الحياد الصفري، وبناء علاقة متوازنة مع كوكبنا.",
      attribution: "كلمة الرئيس التنفيذي، تقرير الاستدامة 2024",
      pillars: [
        {
          id: "emissions", image: "/images/home-sustainability.jpg", imageAlt: "منشأة صناعية وسط نباتات الصحراء",
          title: "الانبعاثات",
          body: "أهداف خفض محددة عبر النطاقات الأول والثاني والثالث، مع إفصاح شفاف لا مجرد ملخّص.",
        },
        {
          id: "environment", image: "/images/home-assure-1.jpg", imageAlt: "معدات معالجة المياه",
          title: "البيئة",
          body: "منع الانسكابات وخفض استهلاك الطاقة والتحكم في الانبعاثات وإدارة النفايات بمسؤولية في كل موقع.",
        },
        {
          id: "people", image: "/images/home-people.jpg", imageAlt: "مهندسون في منشأة صناعية",
          title: "الكوادر والمحتوى المحلي",
          body: "التكويت والتدريب وبيئة عمل تلتزم بمعايير معتمدة للصحة والسلامة المهنية.",
        },
      ],
    },
    news: {
      eyebrow: "آخر الأخبار",
      title: "مستجدات KDF.",
      items: [
        {
          id: "assp-2024",
          year: "2024",
          category: "جائزة",
          title: "KDF تحصد الجائزة الذهبية للتميّز الإداري في جوائز ASSP الخليج",
        },
        {
          id: "assp-silver-2024",
          year: "2024",
          category: "جائزة",
          title: "KDF تحصد الجائزة الفضية للتميّز في الصحة والسلامة في جوائز ASSP الخليج",
        },
        {
          id: "report-2024",
          year: "2024",
          category: "استدامة",
          title: "KDF تصدر أول تقرير استدامة لها، منسجمًا مع رؤية الكويت 2035",
        },
        {
          id: "stevie-2020",
          year: "2020",
          category: "تقنية",
          title: "جائزة Stevie الذهبية لسائل حفر مائي عالي الأداء، بديل صديق للبيئة عن الأنظمة الزيتية",
        },
      ],
    },
    contact: {
      title: "لنبدأ العمل معًا.",
      image: "/images/hero/hero-banner-1.jpg",
      imageAlt: "منصة حفر في حقل نفطي صحراوي عند الغروب",
      cta: "تواصل مع KDF",
      emailLabel: "راسلنا",
      phoneLabel: "اتصل بنا",
      locationLabel: "زرنا",
    },
  },
};

export async function getHomePage(locale: Locale): Promise<HomePage> {
  // TODO(backend): once the .NET API is live, replace this with:
  //   const res = await fetch(`${process.env.API_BASE_URL}/home?locale=${locale}`, {
  //     next: { revalidate: 300 },
  //   });
  //   return res.json();
  return homePageByLocale[locale];
}
