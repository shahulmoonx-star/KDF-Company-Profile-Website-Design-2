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
    footprint: {
      eyebrow: "Business footprint",
      title: "Six decades of operating scale.",
      clients: [
        { id: "koc", name: "Kuwait Oil Company", logo: "/images/client-logo-1.webp" },
        {
          id: "kasco",
          name: "Kuwait Aviation Services Company",
          logo: "/images/client-logo-2.webp",
        },
        { id: "kotc", name: "Kuwait Oil Tanker Company", logo: "/images/client-logo-3.webp" },
        { id: "alghanim", name: "Alghanim Industries", logo: "/images/client-logo-4.webp" },
        {
          id: "knpc",
          name: "Kuwait National Petroleum Company",
          logo: "/images/client-logo-5.webp",
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
      title: "One supplier, every fluid discipline.",
      lead: "From the first metre drilled to the flow assurance that keeps a field producing, KDF formulates, manufactures and services the chemistry in between.",
      items: [
        {
          id: "drilling",
          title: "Drilling & Completion Fluids",
          strap: "Engineered customised solutions addressing drilling and completion challenges.",
          image: "/section-2-1.webp",
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
          image: "/section-2-2.webp",
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
          image: "/section-2-3.webp",
          imageAlt: "Cementing solutions equipment at a well site",
          capabilities: [
            "Cementing products & services",
            "Laboratory and technical support",
            "Product data sheets",
            "Field-proven case histories",
          ],
        },
        {
          id: "manufacturing",
          title: "Manufacturing & Supply",
          strap: "Local chemical manufacturing, blending facilities, logistics and distribution capabilities for oilfield operations.",
          image: "/section-2-4.webp",
          imageAlt: "Chemical manufacturing and blending facility",
          capabilities: [],
        },
        {
          id: "technical-services",
          title: "Technical Services",
          strap: "Laboratory services, technical consultation, field support and engineering-driven problem solving.",
          image: "/section-2-5.webp",
          imageAlt: "Technical services laboratory",
          capabilities: [],
        },
        {
          id: "water-treatment",
          title: "Water Treatment",
          strap: "Specialized water treatment support for industrial and energy-sector operations.",
          image: "/section-2-6.webp",
          imageAlt: "Water treatment facility",
          capabilities: [],
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
      image: "/section-5-background.webp",
      imageAlt: "KDF manufacturing facility at Shuaiba Port",
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
        { id: "assp-gold-2024", image: "/cert-assp-gold-2024.webp", imageAlt: "ASSP GCC Gold Award 2024 certificate, awarded to Kuwait Drilling Fluids & Oil Services for Management Excellence", imagePlaceholder: false, shortTitle: "ASSP Gold", year: "2024", title: "ASSP GCC Gold — Management Excellence" },
        { id: "assp-silver-2024", image: "/cert-assp-silver-2024.webp", imageAlt: "ASSP GCC Silver Award 2024 certificate, awarded to Kuwait Drilling Fluids & Oil Services for HSE Excellence", imagePlaceholder: false, shortTitle: "ASSP Silver", year: "2024", title: "ASSP GCC Silver — HSE Excellence" },
        {
          id: "amir-2023", image: "/cert-amir-2023.webp", imageAlt: "His Highness the Amir of Kuwait's Award for Outstanding Factories 2023 certificate, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "Amir’s Award",
          year: "2023",
          title: "His Highness the Amir of Kuwait's Award for Outstanding Factories",
        },
        {
          id: "stevie-2020", image: "/cert-stevie-2020.webp", imageAlt: "Stevie Awards Gold Winner 2020 certificate, awarded to Kuwait Drilling Fluids & Oil Services for Innovation in Technology Development", imagePlaceholder: false, shortTitle: "Stevie Gold",
          year: "2020",
          title: "Stevie Gold — Innovation in Technology Development (HPWBF)",
        },
        { id: "ehs-2018", image: "/cert-ehs-2018.webp", imageAlt: "EHS Outstanding Performance Award 2018 certificate, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "EHS Excellence", year: "2018", title: "EHS Outstanding Performance Award" },
        { id: "koc-2017", image: "/cert-koc-2017.webp", imageAlt: "KOC CEO Award 2017 certificate, awarded to Kuwait Drilling Fluids & Oil Services for the Gas Conditioning Project", imagePlaceholder: false, shortTitle: "KOC CEO Award", year: "2017", title: "KOC CEO Award — Gas Conditioning Project" },
        { id: "chesm-2017", image: "/cert-chesm-2017.webp", imageAlt: "CHESM A-Rating Certificate of Excellence 2017, awarded to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, shortTitle: "CHESM A-Rating", year: "2017", title: "CHESM Award for EHS A-Rating" },
      ],
      certifications: [
        { id: "iso-9001", image: "/cert-iso-9001.webp", imageAlt: "ISO 9001:2015 Certificate of Registration for Quality Management, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 9001:2015", label: "Quality management" },
        { id: "iso-14001", image: "/cert-iso-14001.webp", imageAlt: "ISO 14001:2015 Certificate of Registration for Environmental Management, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 14001:2015", label: "Environmental management" },
        { id: "iso-45001", image: "/cert-iso-45001.webp", imageAlt: "ISO 45001:2018 Certificate of Registration for Occupational Health & Safety, issued to Kuwait Drilling Fluids & Oil Services", imagePlaceholder: false, standard: "ISO 45001:2018", label: "Occupational health & safety" },
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
      title: "Engineering Disciplines",
      quote:
        "Six core disciplines carry every project from production chemistry through to the people and standards that keep it running responsibly.",
      attribution: "Message from the CEO, 2024 Sustainability Report",
      pillars: [
        {
          id: "treat", group: "Production Technologies", image: "/Treat.webp", imageAlt: "Chemical injection metering pump dosing production treatment fluid",
          title: "Treat",
          body: "Solutions designed to support production treatment and operational optimisation.",
          tags: ["Demulsifiers", "Water clarifiers", "Flow improvers"],
        },
        {
          id: "protect", group: "Production Technologies", image: "/protect.webp", imageAlt: "Coated steel pipelines running toward the horizon at sunset",
          title: "Protect",
          body: "Chemistry programs focused on asset protection, corrosion control and reliability.",
          tags: ["Scale & corrosion inhibitors", "Hydrate & asphaltene inhibitors"],
        },
        {
          id: "assure", group: "Production Technologies", image: "/assure.webp", imageAlt: "Illuminated wellhead valve assembly against a dusk sky",
          title: "Assure",
          body: "Flow assurance solutions to support continuous and efficient production.",
          tags: ["H₂S & oxygen scavengers", "Scale dissolvers", "Microbiocides", "Defoamers"],
        },
        {
          id: "emissions", group: "Sustainability", image: "/emissions.webp", imageAlt: "Elevated view across an industrial facility rooftop and stacks",
          title: "Emissions",
          body: "Reduction targets set across Scope 1, 2 and 3, reported openly rather than summarised.",
        },
        {
          id: "environment", group: "Sustainability", image: "/environment.webp", imageAlt: "Water treatment basin with a still reflective surface",
          title: "Environment",
          body: "Spill prevention, energy reduction, emissions control and responsible waste handling across every site.",
        },
        {
          id: "people", group: "Sustainability", image: "/people-local-content.webp", imageAlt: "Engineers reviewing a schematic together in a training room",
          title: "People & local content",
          body: "Kuwaitisation, training and a work environment held to certified occupational health and safety standards.",
        },
      ],
    },
    contact: {
      title: "Let's get to work.",
      image: "/footer-bg.webp",
      imageAlt: "Bright golden-hour photograph of a drilling rig and storage tanks at a Kuwaiti oilfield",
      subscribePlaceholder: "Enter your email",
      subscribeCta: "Subscribe",
      subscribeSuccess: "Thank you — you're on the list.",
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
    footprint: {
      eyebrow: "حضورنا",
      title: "ستة عقود من الخبرة التشغيلية.",
      clients: [
        { id: "koc", name: "شركة نفط الكويت", logo: "/images/client-logo-1.webp" },
        {
          id: "kasco",
          name: "الشركة الكويتية لخدمات الطيران",
          logo: "/images/client-logo-2.webp",
        },
        { id: "kotc", name: "شركة ناقلات النفط الكويتية", logo: "/images/client-logo-3.webp" },
        { id: "alghanim", name: "الغانم للصناعات", logo: "/images/client-logo-4.webp" },
        {
          id: "knpc",
          name: "شركة البترول الوطنية الكويتية",
          logo: "/images/client-logo-5.webp",
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
      title: "مورّد واحد لكل تخصصات السوائل.",
      lead: "من أول متر يتم حفره إلى ضمان التدفق الذي يُبقي الحقل منتجًا، تتولى KDF تركيب وتصنيع وخدمة الكيمياء في ما بينهما.",
      items: [
        {
          id: "drilling",
          title: "سوائل الحفر والإكمال",
          strap: "حلول مُصمّمة خصيصًا لمعالجة تحديات الحفر والإكمال.",
          image: "/section-2-1.webp",
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
          image: "/section-2-2.webp",
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
          image: "/section-2-3.webp",
          imageAlt: "معدات حلول الإسمنت في موقع بئر",
          capabilities: [
            "منتجات وخدمات الإسمنت",
            "الدعم المخبري والفني",
            "نشرات بيانات المنتجات",
            "دراسات حالة ميدانية مُثبتة",
          ],
        },
        {
          id: "manufacturing",
          title: "التصنيع والتوريد",
          strap: "تصنيع وخلط المواد الكيميائية محليًا، مع قدرات لوجستية وتوزيعية لعمليات حقول النفط.",
          image: "/section-2-4.webp",
          imageAlt: "منشأة تصنيع وخلط المواد الكيميائية",
          capabilities: [],
        },
        {
          id: "technical-services",
          title: "الخدمات الفنية",
          strap: "خدمات مختبرية واستشارات فنية ودعم ميداني وحلول هندسية للمشكلات.",
          image: "/section-2-5.webp",
          imageAlt: "مختبر الخدمات الفنية",
          capabilities: [],
        },
        {
          id: "water-treatment",
          title: "معالجة المياه",
          strap: "دعم متخصص لمعالجة المياه في العمليات الصناعية وقطاع الطاقة.",
          image: "/section-2-6.webp",
          imageAlt: "منشأة معالجة المياه",
          capabilities: [],
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
      image: "/section-5-background.webp",
      imageAlt: "منشأة KDF للتصنيع في ميناء الشعيبة",
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
        { id: "assp-gold-2024", image: "/cert-assp-gold-2024.webp", imageAlt: "شهادة جائزة ASSP الخليج الذهبية 2024 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للتميّز الإداري", imagePlaceholder: false, shortTitle: "ذهبية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الذهبية للتميّز الإداري" },
        { id: "assp-silver-2024", image: "/cert-assp-silver-2024.webp", imageAlt: "شهادة جائزة ASSP الخليج الفضية 2024 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للتميّز في الصحة والسلامة", imagePlaceholder: false, shortTitle: "فضية ASSP", year: "2024", title: "ASSP الخليج — الجائزة الفضية للتميّز في الصحة والسلامة" },
        {
          id: "amir-2023", image: "/cert-amir-2023.webp", imageAlt: "شهادة جائزة حضرة صاحب السمو أمير البلاد للمصانع المتميّزة 2023 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "جائزة سمو الأمير",
          year: "2023",
          title: "جائزة حضرة صاحب السمو أمير البلاد للمصانع المتميّزة",
        },
        {
          id: "stevie-2020", image: "/cert-stevie-2020.webp", imageAlt: "شهادة جائزة Stevie الذهبية 2020 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية للابتكار في تطوير التقنية", imagePlaceholder: false, shortTitle: "ذهبية Stevie",
          year: "2020",
          title: "جائزة Stevie الذهبية للابتكار في تطوير التقنية (HPWBF)",
        },
        { id: "ehs-2018", image: "/cert-ehs-2018.webp", imageAlt: "شهادة جائزة الأداء المتميّز في البيئة والصحة والسلامة 2018 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "التميّز في السلامة", year: "2018", title: "جائزة الأداء المتميّز في البيئة والصحة والسلامة" },
        { id: "koc-2017", image: "/cert-koc-2017.webp", imageAlt: "شهادة جائزة الرئيس التنفيذي لشركة نفط الكويت 2017 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية عن مشروع معالجة الغاز", imagePlaceholder: false, shortTitle: "جائزة الرئيس التنفيذي لشركة نفط الكويت", year: "2017", title: "جائزة الرئيس التنفيذي لشركة نفط الكويت — مشروع معالجة الغاز" },
        { id: "chesm-2017", image: "/cert-chesm-2017.webp", imageAlt: "شهادة جائزة CHESM لتصنيف A في البيئة والصحة والسلامة 2017 الممنوحة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, shortTitle: "تصنيف A من CHESM", year: "2017", title: "جائزة CHESM لتصنيف A في البيئة والصحة والسلامة" },
      ],
      certifications: [
        { id: "iso-9001", image: "/cert-iso-9001.webp", imageAlt: "شهادة تسجيل الأيزو 9001:2015 لإدارة الجودة، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 9001:2015", label: "إدارة الجودة" },
        { id: "iso-14001", image: "/cert-iso-14001.webp", imageAlt: "شهادة تسجيل الأيزو 14001:2015 للإدارة البيئية، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 14001:2015", label: "الإدارة البيئية" },
        { id: "iso-45001", image: "/cert-iso-45001.webp", imageAlt: "شهادة تسجيل الأيزو 45001:2018 للصحة والسلامة المهنية، صادرة للشركة الكويتية لسوائل الحفر والخدمات النفطية", imagePlaceholder: false, standard: "ISO 45001:2018", label: "الصحة والسلامة المهنية" },
      ],
    },
    sustainability: {
      eyebrow: "أسلوب عمل KDF",
      title: "التخصصات الهندسية",
      quote:
        "ستة تخصصات أساسية تواكب كل مشروع من كيمياء الإنتاج وصولًا إلى الكوادر والمعايير التي تضمن استمراره بمسؤولية.",
      attribution: "كلمة الرئيس التنفيذي، تقرير الاستدامة 2024",
      pillars: [
        {
          id: "treat", group: "تقنيات الإنتاج", image: "/Treat.webp", imageAlt: "مضخة جرعات لحقن مواد كيميائية لمعالجة الإنتاج",
          title: "Treat",
          body: "حلول مصمّمة لدعم معالجة الإنتاج وتحسين الكفاءة التشغيلية.",
          tags: ["كاسرات المستحلبات", "مروّقات المياه", "محسّنات التدفق"],
        },
        {
          id: "protect", group: "تقنيات الإنتاج", image: "/protect.webp", imageAlt: "أنابيب فولاذية مطلية تمتد نحو الأفق عند الغروب",
          title: "Protect",
          body: "برامج كيميائية تركّز على حماية الأصول ومكافحة التآكل والموثوقية.",
          tags: ["مثبطات الترسبات والتآكل", "مثبطات الهيدرات والأسفلتين"],
        },
        {
          id: "assure", group: "تقنيات الإنتاج", image: "/assure.webp", imageAlt: "تجميعة صمام رأس بئر مضاءة عند الغسق",
          title: "Assure",
          body: "حلول ضمان التدفق لدعم إنتاج مستمر وفعّال.",
          tags: ["كواسح كبريتيد الهيدروجين والأكسجين", "مذيبات الترسبات", "المبيدات الميكروبية", "مزيلات الرغوة"],
        },
        {
          id: "emissions", group: "الاستدامة", image: "/emissions.webp", imageAlt: "منظر علوي لسطح منشأة صناعية ومداخنها",
          title: "الانبعاثات",
          body: "أهداف خفض محددة عبر النطاقات الأول والثاني والثالث، مع إفصاح شفاف لا مجرد ملخّص.",
        },
        {
          id: "environment", group: "الاستدامة", image: "/environment.webp", imageAlt: "حوض معالجة مياه بسطح ساكن عاكس",
          title: "البيئة",
          body: "منع الانسكابات وخفض استهلاك الطاقة والتحكم في الانبعاثات وإدارة النفايات بمسؤولية في كل موقع.",
        },
        {
          id: "people", group: "الاستدامة", image: "/people-local-content.webp", imageAlt: "مهندسون يراجعون مخططًا معًا في قاعة تدريب",
          title: "الكوادر والمحتوى المحلي",
          body: "التكويت والتدريب وبيئة عمل تلتزم بمعايير معتمدة للصحة والسلامة المهنية.",
        },
      ],
    },
    contact: {
      title: "لنبدأ العمل معًا.",
      image: "/footer-bg.webp",
      imageAlt: "صورة مشرقة وقت الغروب لمنصة حفر وخزانات تخزين في حقل نفطي كويتي",
      subscribePlaceholder: "أدخل بريدك الإلكتروني",
      subscribeCta: "اشترك",
      subscribeSuccess: "شكرًا لك — تم تسجيل بريدك الإلكتروني.",
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
