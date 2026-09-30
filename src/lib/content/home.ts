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
      slides: [
        {
          title: "Drilling fluids engineered for demanding wells.",
          caption: "Drilling & Completion",
          alt: "Drilling rig operating in the Kuwait desert at sunset",
        },
        {
          title: "Manufacturing built for regional scale.",
          caption: "Liquid Chemical Blending",
          alt: "Industrial liquid chemical blending and storage facility",
        },
        {
          title: "Chemistry tested before it reaches the field.",
          caption: "Laboratory & R&D",
          alt: "Laboratory specialist testing drilling fluid samples",
        },
        {
          title: "Mineral processing with reliable capacity.",
          caption: "Minerals Manufacturing",
          alt: "Industrial mineral grinding and powder processing facility",
        },
        {
          title: "Field expertise that keeps operations moving.",
          caption: "Field Engineering",
          alt: "Field engineers walking through an oilfield service facility",
        },
      ],
    },
    about: {
      eyebrow: "About KDF",
      title: "Six decades of engineering trust into every barrel.",
      description:
        "From a single Kuwaiti workshop to a regional chemistry and manufacturing base, the scale has changed but the standard never did. KDF partners with national and international operators from a fully Kuwaiti based manufacturing platform, combining in house chemistry, blending capacity and field support so every barrel produced meets the same certified standard, wherever in the region it is delivered.",
      image: "/images/about-manufacturing-facility.webp",
      imageAlt: "Technicians at KDF's manufacturing facility at Shuaiba Port",
      foundedYear: 1966,
      stats: [
        { id: "years", value: 60, suffix: "+", label: "Years Active" },
        { id: "kuwait-based", value: 100, display: "100%", label: "Kuwait Manufacturing" },
        { id: "chemical-programs", value: 25, suffix: "+", label: "Chemical Programs" },
        { id: "qhse", value: 0, display: "24/7", label: "QHSE Operations" },
        { id: "countries", value: 4, suffix: "+", label: "Countries Served" },
        { id: "employees", value: 450, suffix: "+", label: "Total Employees" },
        { id: "clients", value: 50, suffix: "+", label: "Client Partners" },
      ],
    },
    footprint: {
      eyebrow: "Who we work with",
      title: "Trusted across Kuwait's energy sector.",
      clients: [
        { id: "koc", name: "Kuwait Oil Company", logo: "/images/client-kuwait-oil-company.webp" },
        {
          id: "kasco",
          name: "Kuwait Aviation Services Company",
          logo: "/images/client-kuwait-aviation-services.webp",
        },
        { id: "kotc", name: "Kuwait Oil Tanker Company", logo: "/images/client-kuwait-oil-tanker-company.webp" },
        { id: "alghanim", name: "Alghanim Industries", logo: "/images/client-alghanim-industries.webp" },
        {
          id: "knpc",
          name: "Kuwait National Petroleum Company",
          logo: "/images/client-kuwait-national-petroleum.webp",
        },
      ],
    },
    solutions: {
      eyebrow: "Solutions & products",
      title: "One supplier, every fluid discipline.",
      lead: "From the first metre drilled to the flow assurance that keeps a field producing, KDF formulates, manufactures and services the chemistry in between.",
      items: [
        {
          id: "drilling",
          title: "Drilling & Completion Fluids",
          strap: "Engineered customised solutions addressing drilling and completion challenges.",
          image: "/images/solutions-drilling-completion-fluids.webp",
          imageAlt: "Drilling and completion fluids equipment on site",
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
          image: "/images/solutions-production-chemistry.webp",
          imageAlt: "Production chemistry facility",
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
          image: "/images/solutions-cementing.webp",
          imageAlt: "Cementing solutions equipment at a well site",
          capabilities: [
            "Cementing products & services",
            "Laboratory and technical support",
            "Product data sheets",
            "Field-proven case histories",
          ],
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
    recognition: {
      eyebrow: "Awards & certifications",
      title: "Excellence, recognised.",
      lead: "KDF's record is measured by the people who audit it — national awards, international safety bodies and certified management systems.",
      awards: [
        { id: "assp-gold-2024", image: "/images/award-assp-gold-2024.webp", imageAlt: "ASSP GCC Gold Award 2024 certificate, awarded to Kuwait Drilling Fluids & Oil Services for Management Excellence", imagePlaceholder: false, shortTitle: "ASSP Gold", year: "2024", title: "ASSP GCC Gold — Management Excellence" },
        { id: "assp-silver-2024", image: "/images/award-assp-silver-2024.webp", imageAlt: "ASSP GCC Silver Award 2024 certificate, awarded to Kuwait Drilling Fluids & Oil Services for HSE Excellence", imagePlaceholder: false, shortTitle: "ASSP Silver", year: "2024", title: "ASSP GCC Silver — HSE Excellence" },
        {
          id: "amir-2023", image: "/images/award-amir-outstanding-factories-2023.webp", imageAlt: "His Highness the Amir of Kuwait's Award for Outstanding Factories 2023 certificate, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "Amir’s Award",
          year: "2023",
          title: "His Highness the Amir of Kuwait's Award for Outstanding Factories",
        },
        {
          id: "stevie-2020", image: "/images/award-stevie-gold-2020.webp", imageAlt: "Stevie Awards Gold Winner 2020 certificate, awarded to Kuwait Drilling Fluids & Oil Services for Innovation in Technology Development", imagePlaceholder: false, shortTitle: "Stevie Gold",
          year: "2020",
          title: "Stevie Gold — Innovation in Technology Development (HPWBF)",
        },
        { id: "ehs-2018", image: "/images/award-ehs-outstanding-performance-2018.webp", imageAlt: "EHS Outstanding Performance Award 2018 certificate, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "EHS Excellence", year: "2018", title: "EHS Outstanding Performance Award" },
        { id: "koc-2017", image: "/images/award-koc-ceo-gas-conditioning-2017.webp", imageAlt: "KOC CEO Award 2017 certificate, awarded to Kuwait Drilling Fluids & Oil Services for the Gas Conditioning Project", imagePlaceholder: false, shortTitle: "KOC CEO Award", year: "2017", title: "KOC CEO Award — Gas Conditioning Project" },
        { id: "chesm-2017", image: "/images/award-chesm-ehs-a-rating-2017.webp", imageAlt: "CHESM A-Rating Certificate of Excellence 2017, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "CHESM A-Rating", year: "2017", title: "CHESM Award for EHS A-Rating" },
      ],
      certifications: [
        { id: "iso-9001", image: "/images/certification-iso-9001-2015.webp", imageAlt: "ISO 9001:2015 Certificate of Registration for Quality Management, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 9001:2015", label: "Quality management" },
        { id: "iso-14001", image: "/images/certification-iso-14001-2015.webp", imageAlt: "ISO 14001:2015 Certificate of Registration for Environmental Management, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 14001:2015", label: "Environmental management" },
        { id: "iso-45001", image: "/images/certification-iso-45001-2018.webp", imageAlt: "ISO 45001:2018 Certificate of Registration for Occupational Health & Safety, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 45001:2018", label: "Occupational health & safety" },
      ],
    },
    // "Engineering Disciplines" is the merged Production Technologies +
    // Sustainability stack: KDF's production-chemistry stages first, then
    // its sustainability pillars, as one continuous pinned scroll-stack —
    // see the HomePage.sustainability.pillars doc comment in types.ts for
    // why. The Treat/Protect/Assure tags are the same chemical categories
    // listed under "Production Chemistry" in solutions.items above, split
    // one per tag instead of run together in one clause.
    sustainability: {
      eyebrow: "How KDF operates",
      title: "Infrastructure & Capabilities",
      pillars: [
        // Order and titles mirror the Infrastructure & Capabilities menu
        // exactly, so the homepage section and the navbar name the same
        // five disciplines in the same sequence. QHSE is one card here
        // because it is one item there; it previously ran as two, split
        // into quality assurance and occupational health/safety.
        {
          id: "qhse", group: "Standards", image: "/images/operations-quality-assurance-control.webp", imageAlt: "Quality control inspector examining a product sample against a checklist",
          title: "HSE, Quality Assurance & Quality Control (QHSE)",
          body: "Safety and quality checked at every stage, intake through dispatch.",
        },
        {
          id: "labs", group: "Standards", image: "/images/operations-laboratories-testing.webp", imageAlt: "Rheology equipment measuring fluid viscosity in the laboratory",
          title: "Laboratories & Testing",
          body: "Every formulation tested before it leaves the facility.",
        },
        {
          id: "manufacturing", group: "Operations", image: "/images/operations-manufacturing-facilities.webp", imageAlt: "Workers in hard hats monitoring roller grinding mills on the plant floor",
          title: "Manufacturing Facilities",
          body: "Grinding, blending and formulating, all under one roof.",
        },
        {
          id: "warehousing", group: "Operations", image: "/images/operations-warehousing-logistics.webp", imageAlt: "Warehouse worker checking stacked pallets of raw materials beside a forklift",
          title: "Warehousing",
          body: "From the plant to the wellsite, never out of KDF's hands.",
        },
        {
          id: "rnd", group: "Operations", image: "/images/operations-research-development.webp", imageAlt: "Chemist testing fluid samples at a laboratory bench",
          title: "Research & Development",
          body: "Chemistry built around Kuwait's own reservoirs.",
        },
      ],
    },
    news: {
      eyebrow: "News & blogs",
      title: "What's happening at KDF.",
      items: [
        {
          id: "homeland-guardians-2026",
          year: "2026",
          title: "Homeland Guardians, Kuwait's Pride",
          excerpt: "A tribute to Kuwait's protectors, its security forces, military, firefighters and medics, kept safe and returned home to their families.",
          image: "/images/news-homeland-guardians-2026.webp",
          imageAlt: "KDF tribute graphic showing Kuwait's military, police, fire, and medical personnel facing the Kuwait City skyline beside the national flag",
        },
        {
          id: "project-peregrine-2026",
          year: "2026",
          title: "KPC Signs Project Peregrine",
          excerpt: "The largest foreign direct investment in Kuwait's history, a milestone that reflects KOC's asset quality and KPC's operational excellence.",
          image: "/images/news-project-peregrine-2026.webp",
          imageAlt: "KDF congratulatory graphic for KPC's Project Peregrine, the largest foreign direct investment in Kuwait's history",
        },
        {
          id: "national-memorial-day-2026",
          year: "2026",
          title: "36th Anniversary of the Iraqi Invasion",
          excerpt: "KDF honours Kuwait's resilience and the sacrifice of its martyrs, a nation kept free by the unity of its people.",
          image: "/images/news-national-memorial-day-2026.webp",
          imageAlt: "KDF tribute graphic for the 36th anniversary of the Iraqi invasion of Kuwait, 7 August 1990, with a map of Kuwait over portraits of martyrs",
        },
        {
          id: "water-energy-conservation-2026",
          year: "2026",
          title: "Water & Energy Conservation, Phase 1",
          excerpt: "21% of our people came forward with conservation ideas, backing Kuwait's Waffir initiative with a culture of smarter resource use.",
          image: "/images/news-water-energy-conservation-2026.webp",
          imageAlt: "KDF Water & Energy Conservation Campaign graphic: 30 days, one goal, 21% of people submitted conservation ideas in Phase 1",
        },
        {
          id: "mawlid-2026",
          year: "2026",
          title: "Mawlid al-Nabi al-Sharif greetings",
          excerpt: "Marking the Prophet's birthday, KDF wishes Kuwait and everyone a blessed occasion filled with security and prosperity.",
          image: "/images/news-mawlid-2026.webp",
          imageAlt: "KDF greeting card for Mawlid al-Nabi al-Sharif, featuring the Prophet's Mosque in Madinah",
        },
        {
          id: "adipec-2026",
          year: "2026",
          title: "KDF is Exhibiting at ADIPEC 2026",
          excerpt: "Visit Booth 16313, Hall 16 in Abu Dhabi, 2-5 November, to see our drilling and production expertise firsthand.",
          image: "/images/news-adipec-2026.webp",
          imageAlt: "KDF at ADIPEC 2026 announcement, Booth 16313 Hall 16, Abu Dhabi, 2-5 November 2026",
        },
      ],
    },
    contact: {
      title: "Let's get to work.",
      image: "/images/footer-oilfield-golden-hour.webp",
      imageAlt: "Bright golden-hour photograph of a drilling rig and storage tanks at a Kuwaiti oilfield",
      subscribePlaceholder: "Enter your email",
      subscribeCta: "Subscribe",
      subscribeSuccess: "Thank you for reaching out!",
      subscribeSuccessNote: "We're glad to have you with us and look forward to staying in touch.",
      emailLabel: "Email",
      phoneLabel: "Call",
      locationLabel: "Visit",
    },
  },
  ar: {
    hero: {
      slides: [
        {
          title: "سوائل حفر مصممة للآبار الصعبة.",
          caption: "الحفر والإكمال",
          alt: "برج حفر يعمل في صحراء الكويت وقت الغروب",
        },
        {
          title: "قدرات تصنيع مصممة لخدمة المنطقة.",
          caption: "مزج المواد الكيميائية السائلة",
          alt: "منشأة صناعية لمزج وتخزين المواد الكيميائية السائلة",
        },
        {
          title: "كيمياء مختبرة قبل وصولها إلى الحقل.",
          caption: "المختبر والبحث والتطوير",
          alt: "مختص في المختبر يختبر عينات سوائل الحفر",
        },
        {
          title: "معالجة معادن بقدرات إنتاجية موثوقة.",
          caption: "تصنيع المعادن",
          alt: "منشأة صناعية لطحن المعادن ومعالجة المساحيق",
        },
        {
          title: "خبرات ميدانية تحافظ على استمرارية العمليات.",
          caption: "الهندسة الميدانية",
          alt: "مهندسون ميدانيون داخل منشأة لخدمات حقول النفط",
        },
      ],
    },
    about: {
      eyebrow: "عن KDF",
      title: "ستة عقود من بناء الثقة الهندسية في كل برميل.",
      description:
        "من ورشة كويتية واحدة إلى قاعدة إقليمية للكيمياء والتصنيع، تغيّر الحجم ولم يتغيّر المعيار. تتعامل KDF مع شركات محلية وعالمية انطلاقًا من قاعدة تصنيع كويتية بالكامل، تجمع بين الكيمياء الداخلية وقدرات الخلط والدعم الميداني، بما يضمن التزام كل برميل يُنتَج بالمعيار المعتمد نفسه أينما جرى توريده في المنطقة.",
      image: "/images/about-manufacturing-facility.webp",
      imageAlt: "فنيون في منشأة KDF للتصنيع في ميناء الشعيبة",
      foundedYear: 1966,
      stats: [
        { id: "years", value: 60, suffix: "+", label: "سنوات النشاط" },
        { id: "kuwait-based", value: 100, display: "100%", label: "تصنيع كويتي" },
        { id: "chemical-programs", value: 25, suffix: "+", label: "برامج كيميائية" },
        { id: "qhse", value: 0, display: "24/7", label: "عمليات الجودة" },
        { id: "countries", value: 4, suffix: "+", label: "دول التغطية" },
        { id: "employees", value: 450, suffix: "+", label: "إجمالي الموظفين" },
        { id: "clients", value: 50, suffix: "+", label: "شركاء العملاء" },
      ],
    },
    footprint: {
      eyebrow: "من نتعامل معهم",
      title: "موثوقون في قطاع الطاقة الكويتي.",
      clients: [
        { id: "koc", name: "شركة نفط الكويت", logo: "/images/client-kuwait-oil-company.webp" },
        {
          id: "kasco",
          name: "الشركة الكويتية لخدمات الطيران",
          logo: "/images/client-kuwait-aviation-services.webp",
        },
        { id: "kotc", name: "شركة ناقلات النفط الكويتية", logo: "/images/client-kuwait-oil-tanker-company.webp" },
        { id: "alghanim", name: "الغانم للصناعات", logo: "/images/client-alghanim-industries.webp" },
        {
          id: "knpc",
          name: "شركة البترول الوطنية الكويتية",
          logo: "/images/client-kuwait-national-petroleum.webp",
        },
      ],
    },
    solutions: {
      eyebrow: "الحلول والمنتجات",
      title: "مورّد واحد لكل تخصصات السوائل.",
      lead: "من أول متر يتم حفره إلى ضمان التدفق الذي يُبقي الحقل منتجًا، تتولى KDF تركيب وتصنيع وخدمة الكيمياء في ما بينهما.",
      items: [
        {
          id: "drilling",
          title: "سوائل الحفر والإكمال",
          strap: "حلول مُصمّمة خصيصًا لمعالجة تحديات الحفر والإكمال.",
          image: "/images/solutions-drilling-completion-fluids.webp",
          imageAlt: "معدات سوائل الحفر والإكمال في الموقع",
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
          image: "/images/solutions-production-chemistry.webp",
          imageAlt: "منشأة كيمياء الإنتاج",
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
          image: "/images/solutions-cementing.webp",
          imageAlt: "معدات حلول الإسمنت في موقع بئر",
          capabilities: [
            "منتجات وخدمات الإسمنت",
            "الدعم المخبري والفني",
            "نشرات بيانات المنتجات",
            "دراسات حالة ميدانية مُثبتة",
          ],
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
    recognition: {
      eyebrow: "الجوائز والشهادات",
      title: "تميّز يستحق التقدير.",
      lead: "سجل KDF تقيسه الجهات التي تدقّقه: جوائز وطنية وهيئات سلامة دولية وأنظمة إدارة معتمدة.",
      awards: [
        { id: "assp-gold-2024", image: "/images/award-assp-gold-2024.webp", imageAlt: "شهادة جائزة ASSP الخليج الذهبية 2024 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للتميّز الإداري", imagePlaceholder: false, shortTitle: "ذهبية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الذهبية للتميّز الإداري" },
        { id: "assp-silver-2024", image: "/images/award-assp-silver-2024.webp", imageAlt: "شهادة جائزة ASSP الخليج الفضية 2024 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للتميّز في الصحة والسلامة", imagePlaceholder: false, shortTitle: "فضية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الفضية للتميّز في الصحة والسلامة" },
        {
          id: "amir-2023", image: "/images/award-amir-outstanding-factories-2023.webp", imageAlt: "شهادة جائزة حضرة صاحب السمو أمير البلاد للمصانع المتميّزة 2023 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "جائزة سمو الأمير",
          year: "2023",
          title: "جائزة حضرة صاحب السمو أمير البلاد للمصانع المتميّزة",
        },
        {
          id: "stevie-2020", image: "/images/award-stevie-gold-2020.webp", imageAlt: "شهادة جائزة Stevie الذهبية 2020 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للابتكار في تطوير التقنية", imagePlaceholder: false, shortTitle: "ذهبية Stevie",
          year: "2020",
          title: "جائزة Stevie الذهبية للابتكار في تطوير التقنية (HPWBF)",
        },
        { id: "ehs-2018", image: "/images/award-ehs-outstanding-performance-2018.webp", imageAlt: "شهادة جائزة الأداء المتميّز في البيئة والصحة والسلامة 2018 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "التميّز في السلامة", year: "2018", title: "جائزة الأداء المتميّز في البيئة والصحة والسلامة" },
        { id: "koc-2017", image: "/images/award-koc-ceo-gas-conditioning-2017.webp", imageAlt: "شهادة جائزة الرئيس التنفيذي لشركة نفط الكويت 2017 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية عن مشروع معالجة الغاز", imagePlaceholder: false, shortTitle: "جائزة الرئيس التنفيذي لشركة نفط الكويت", year: "2017", title: "جائزة الرئيس التنفيذي لشركة نفط الكويت — مشروع معالجة الغاز" },
        { id: "chesm-2017", image: "/images/award-chesm-ehs-a-rating-2017.webp", imageAlt: "شهادة جائزة CHESM لتصنيف A في البيئة والصحة والسلامة 2017 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "تصنيف A من CHESM", year: "2017", title: "جائزة CHESM لتصنيف A في البيئة والصحة والسلامة" },
      ],
      certifications: [
        { id: "iso-9001", image: "/images/certification-iso-9001-2015.webp", imageAlt: "شهادة تسجيل الأيزو 9001:2015 لإدارة الجودة، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 9001:2015", label: "إدارة الجودة" },
        { id: "iso-14001", image: "/images/certification-iso-14001-2015.webp", imageAlt: "شهادة تسجيل الأيزو 14001:2015 للإدارة البيئية، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 14001:2015", label: "الإدارة البيئية" },
        { id: "iso-45001", image: "/images/certification-iso-45001-2018.webp", imageAlt: "شهادة تسجيل الأيزو 45001:2018 للصحة والسلامة المهنية، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 45001:2018", label: "الصحة والسلامة المهنية" },
      ],
    },
    sustainability: {
      eyebrow: "أسلوب عمل KDF",
      title: "البنية التحتية والإمكانات",
      pillars: [
        {
          id: "qhse", group: "المعايير", image: "/images/operations-quality-assurance-control.webp", imageAlt: "مفتش ضمان الجودة يفحص عيّنة منتج مقابل قائمة تدقيق",
          title: "الصحة والسلامة والبيئة وضمان الجودة ومراقبتها (QHSE)",
          body: "السلامة والجودة تحت المراقبة في كل مرحلة، من الاستلام حتى الشحن.",
        },
        {
          id: "labs", group: "المعايير", image: "/images/operations-laboratories-testing.webp", imageAlt: "جهاز قياس الريولوجيا يقيس لزوجة السائل في المختبر",
          title: "المختبرات والفحوصات",
          body: "كل تركيبة تُختبر قبل مغادرة المنشأة.",
        },
        {
          id: "manufacturing", group: "العمليات", image: "/images/operations-manufacturing-facilities.webp", imageAlt: "عمال بخوذات صناعية يراقبون مطاحن الطحن الأسطوانية في أرض المصنع",
          title: "منشآت التصنيع",
          body: "طحن وخلط وتركيب، كل ذلك تحت سقف واحد.",
        },
        {
          id: "warehousing", group: "العمليات", image: "/images/operations-warehousing-logistics.webp", imageAlt: "عامل مستودع يتفقّد منصات المواد الخام المكدّسة بجانب رافعة شوكية",
          title: "التخزين",
          body: "من المصنع إلى موقع البئر، دون أن يغادر يد KDF.",
        },
        {
          id: "rnd", group: "العمليات", image: "/images/operations-research-development.webp", imageAlt: "كيميائي يختبر عينات السوائل على منضدة المختبر",
          title: "البحث والتطوير",
          body: "كيمياء مصمَمة خصيصًا لمكامن الكويت.",
        },
      ],
    },
    news: {
      eyebrow: "الأخبار والمقالات",
      title: "آخر مستجدات KDF.",
      items: [
        {
          id: "homeland-guardians-2026",
          year: "2026",
          title: "حماة الوطن .. فخر الكويت",
          excerpt: "دعاء لحماة الكويت من رجال الأمن والجيش والإطفاء والطب، أن يحفظهم الله ويردّهم إلى أهلهم سالمين.",
          image: "/images/news-homeland-guardians-2026.webp",
          imageAlt: "بطاقة تكريم KDF لحماة الكويت من رجال الجيش والشرطة والإطفاء والطب أمام أفق مدينة الكويت وعلَم البلاد",
        },
        {
          id: "project-peregrine-2026",
          year: "2026",
          title: "توقيع مشروع \"شاهين\"",
          excerpt: "أكبر استثمار أجنبي مباشر في تاريخ الكويت، إنجاز يعكس جودة أصول شركة نفط الكويت وكفاءة أداء المؤسسة.",
          image: "/images/news-project-peregrine-2026.webp",
          imageAlt: "بطاقة تهنئة KDF لمؤسسة البترول الكويتية بمشروع شاهين، أكبر استثمار أجنبي مباشر في تاريخ الكويت",
        },
        {
          id: "national-memorial-day-2026",
          year: "2026",
          title: "الذكرى ٣٦ للغزو العراقي الغاشم",
          excerpt: "نستذكر بفخر صمود ووحدة الكويتيين وتضحيات شهدائها الأبرار، حفظ الله الكويت حرة أبية شامخة.",
          image: "/images/news-national-memorial-day-2026.webp",
          imageAlt: "بطاقة KDF التذكارية للذكرى ٣٦ للغزو العراقي للكويت، ٧ أغسطس ١٩٩٠، خارطة الكويت فوق صور الشهداء",
        },
        {
          id: "water-energy-conservation-2026",
          year: "2026",
          title: "ترشيد المياه والطاقة - المرحلة الأولى",
          excerpt: "21% من موظفينا تقدّموا بأفكار للترشيد، دعمًا لمبادرة \"وفِّر\" الكويتية وترسيخًا لثقافة الاستخدام الأمثل للموارد.",
          image: "/images/news-water-energy-conservation-2026.webp",
          imageAlt: "رسم توضيحي لحملة KDF لترشيد المياه والطاقة: 30 يومًا وهدف واحد، 21% من الموظفين قدّموا أفكارًا في المرحلة الأولى",
        },
        {
          id: "mawlid-2026",
          year: "2026",
          title: "تهنئة بمناسبة المولد النبوي الشريف",
          excerpt: "بمناسبة ذكرى المولد النبوي الشريف، تتقدم KDF بأطيب التهاني لدولة الكويت وشعبها، سائلين الله أن يديم عليها الأمن والاستقرار.",
          image: "/images/news-mawlid-2026.webp",
          imageAlt: "بطاقة تهنئة KDF بمناسبة المولد النبوي الشريف، تظهر فيها المسجد النبوي الشريف بالمدينة المنورة",
        },
        {
          id: "adipec-2026",
          year: "2026",
          title: "KDF تشارك في معرض ADIPEC 2026",
          excerpt: "زوروا جناحنا رقم 16313 في القاعة 16 بأبوظبي، من 2 إلى 5 نوفمبر، للتعرّف على خبرتنا في سوائل الحفر.",
          image: "/images/news-adipec-2026.webp",
          imageAlt: "إعلان مشاركة KDF في معرض ADIPEC 2026، الجناح 16313 القاعة 16، أبوظبي، 2-5 نوفمبر 2026",
        },
      ],
    },
    contact: {
      title: "لنبدأ العمل معًا.",
      image: "/images/footer-oilfield-golden-hour.webp",
      imageAlt: "صورة مشرقة وقت الغروب لمنصة حفر وخزانات تخزين في حقل نفطي كويتي",
      subscribePlaceholder: "أدخل بريدك الإلكتروني",
      subscribeCta: "اشترك",
      subscribeSuccess: "شكرًا لتواصلك معنا!",
      subscribeSuccessNote: "يسعدنا انضمامك إلينا، ونتطلع للبقاء على تواصل دائم معك.",
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
