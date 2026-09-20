import type { Locale } from "@/lib/i18n/config";
import type { NavItem } from "./types";

/**
 * Internal, locale-keyed source shape. This is NOT what components consume
 * (see NavItem in types.ts) — it exists only inside this file, because the
 * mock data has to hold both languages at once. A real API response would
 * already be localized (it takes a `locale` param and returns plain
 * strings), so getMainNavigation() below projects this down to that shape
 * before returning it.
 */
interface NavItemSource {
  id: string;
  label: Record<Locale, string>;
  href?: string;
  children?: NavItemSource[];
}

/**
 * Mock main navigation, matching docs/navigation-structure.md exactly.
 * Arabic labels are a first-pass professional translation pending KDF's
 * review before launch — see docs/i18n.md. Industry terms (e.g. "Cementing"
 * -> "الإسمنت") follow standard Arabic technical terminology used across
 * technical literature rather than a literal dictionary translation.
 *
 * Every top-level item's tree stays at most two levels deep (group ->
 * leaf). That is not a style choice, it is a hard constraint: the desktop
 * mega-menu (src/components/nav/MegaMenu.tsx, via menu-utils.buildColumns)
 * only ever renders a column heading and its direct leaf items — a
 * grandchild of a column item is invisible there, even though the mobile
 * drawer would still recurse into it. Solutions & Products already sits at
 * that limit (each product line is itself a headed column), which is why
 * it keeps its original flat item lists rather than gaining a "Resources"
 * sub-group the way About KDF gained "Who We Are".
 *
 * This is temporary content. Once the .NET API is available, replace the
 * body of getMainNavigation() below with a real fetch — nothing else in the
 * app needs to change, since every consumer already goes through that one
 * function and the generic NavItem shape. See docs/backend-integration-plan.md.
 */
const mainNavigationSource: NavItemSource[] = [
  {
    id: "about",
    label: { en: "About KDF", ar: "عن الشركة" },
    children: [
      {
        id: "about-who-we-are",
        label: { en: "Who We Are", ar: "من نحن" },
        children: [
          {
            id: "about-company-overview",
            label: { en: "Company Overview", ar: "نبذة عن الشركة" },
          },
          { id: "about-history", label: { en: "History since 1966", ar: "تاريخنا منذ 1966" } },
          {
            id: "about-slb-partnership",
            label: { en: "KDF–SLB Partnership", ar: "شراكة KDF مع SLB" },
          },
        ],
      },
      {
        id: "about-vision-mission-values",
        label: { en: "Vision, Mission & Values", ar: "الرؤية والرسالة والقيم" },
      },
      { id: "about-leadership", label: { en: "Our Leadership", ar: "قيادتنا" } },
      {
        id: "about-governance",
        label: { en: "Governance", ar: "الحوكمة" },
        children: [
          {
            id: "about-governance-board",
            label: { en: "Board of Directors", ar: "مجلس الإدارة" },
          },
          {
            id: "about-governance-chairman",
            label: { en: "Chairman's Message", ar: "كلمة رئيس مجلس الإدارة" },
          },
          {
            id: "about-governance-code-of-conduct",
            label: {
              en: "Code of Conduct / Business Integrity",
              ar: "مدونة السلوك ونزاهة الأعمال",
            },
          },
        ],
      },
      { id: "about-milestones", label: { en: "Milestones", ar: "أبرز المحطات" } },
      {
        id: "about-awards",
        label: { en: "Awards & Certifications", ar: "الجوائز والشهادات" },
      },
      { id: "about-facilities", label: { en: "Our Facilities", ar: "منشآتنا" } },
    ],
  },
  {
    id: "solutions",
    label: { en: "Solutions & Products", ar: "الحلول والمنتجات" },
    children: [
      {
        id: "solutions-drilling-completion-fluids",
        label: { en: "Drilling & Completion Fluids", ar: "سوائل الحفر والإكمال" },
        children: [
          { id: "solutions-dcf-overview", label: { en: "Overview", ar: "نظرة عامة" } },
          {
            id: "solutions-dcf-catalogue",
            label: { en: "Download Product Catalogue", ar: "تحميل كتالوج المنتجات" },
          },
          {
            id: "solutions-dcf-drilling-fluid-solutions",
            label: { en: "Drilling Fluid Solutions", ar: "حلول سوائل الحفر" },
          },
          {
            id: "solutions-dcf-completion-fluid-solutions",
            label: { en: "Completion Fluid Solutions", ar: "حلول سوائل الإكمال" },
          },
          { id: "solutions-dcf-products", label: { en: "Products", ar: "المنتجات" } },
          {
            id: "solutions-dcf-data-sheets",
            label: { en: "Product Data Sheets", ar: "نشرات بيانات المنتجات" },
          },
          {
            id: "solutions-dcf-success-stories",
            label: { en: "Success Stories", ar: "قصص النجاح" },
          },
        ],
      },
      {
        id: "solutions-production-chemistry",
        label: { en: "Production Chemistry", ar: "كيمياء الإنتاج" },
        children: [
          { id: "solutions-pc-overview", label: { en: "Overview", ar: "نظرة عامة" } },
          {
            id: "solutions-pc-catalogue",
            label: { en: "Download Product Catalogue", ar: "تحميل كتالوج المنتجات" },
          },
          {
            id: "solutions-pc-treat-chemistry",
            label: { en: "Treat Chemistry", ar: "كيمياء Treat" },
          },
          {
            id: "solutions-pc-protect-chemistry",
            label: { en: "Protect Chemistry", ar: "كيمياء Protect" },
          },
          {
            id: "solutions-pc-assure-chemistry",
            label: { en: "Assure Chemistry", ar: "كيمياء Assure" },
          },
          {
            id: "solutions-pc-data-sheets",
            label: { en: "Product Data Sheets", ar: "نشرات بيانات المنتجات" },
          },
          {
            id: "solutions-pc-success-stories",
            label: { en: "Success Stories", ar: "قصص النجاح" },
          },
        ],
      },
      {
        id: "solutions-cementing",
        label: { en: "Cementing Solutions", ar: "حلول الإسمنت" },
        children: [
          { id: "solutions-cem-overview", label: { en: "Overview", ar: "نظرة عامة" } },
          {
            id: "solutions-cem-catalogue",
            label: { en: "Download Product Catalogue", ar: "تحميل كتالوج المنتجات" },
          },
          {
            id: "solutions-cem-products-services",
            label: { en: "Products & Services", ar: "المنتجات والخدمات" },
          },
          {
            id: "solutions-cem-lab-support",
            label: { en: "Laboratory and Technical Support", ar: "الدعم المخبري والفني" },
          },
          {
            id: "solutions-cem-data-sheets",
            label: { en: "Product Data Sheets", ar: "نشرات بيانات المنتجات" },
          },
          {
            id: "solutions-cem-success-stories",
            label: { en: "Success Stories", ar: "قصص النجاح" },
          },
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    label: { en: "Infrastructure & Capabilities", ar: "البنية التحتية والإمكانات" },
    children: [
      {
        id: "infrastructure-operations",
        label: { en: "Operations", ar: "العمليات" },
        children: [
          {
            id: "infrastructure-manufacturing",
            label: { en: "Manufacturing Facilities", ar: "منشآت التصنيع" },
          },
          {
            id: "infrastructure-warehousing-logistics",
            label: { en: "Warehousing & Logistics", ar: "التخزين والخدمات اللوجستية" },
          },
        ],
      },
      {
        id: "infrastructure-rnd",
        label: { en: "Research & Development", ar: "البحث والتطوير" },
      },
      {
        id: "infrastructure-quality-safety",
        label: { en: "Quality & Safety", ar: "الجودة والسلامة" },
        children: [
          {
            id: "infrastructure-labs-testing",
            label: { en: "Laboratories & Testing", ar: "المختبرات والفحوصات" },
          },
          {
            id: "infrastructure-qa-qc",
            label: {
              en: "Quality Assurance & Quality Control",
              ar: "ضمان الجودة ومراقبة الجودة",
            },
          },
          {
            id: "infrastructure-ohse",
            label: {
              en: "Occupational Health, Safety & Environment",
              ar: "الصحة والسلامة المهنية والبيئة",
            },
          },
        ],
      },
    ],
  },
  {
    id: "sustainability",
    label: { en: "Sustainability", ar: "الاستدامة" },
    children: [
      {
        id: "sustainability-strategy",
        label: { en: "Sustainability Strategy", ar: "استراتيجية الاستدامة" },
      },
      {
        id: "sustainability-esg",
        label: { en: "ESG Approach", ar: "نهج الحوكمة البيئية والاجتماعية (ESG)" },
        children: [
          {
            id: "sustainability-esg-environmental",
            label: { en: "Environmental", ar: "البيئة" },
          },
          { id: "sustainability-esg-social", label: { en: "Social", ar: "المجتمع" } },
          {
            id: "sustainability-esg-governance",
            label: { en: "Governance", ar: "الحوكمة" },
          },
        ],
      },
      {
        id: "sustainability-local-content",
        label: { en: "Local Content & Kuwaitisation", ar: "المحتوى المحلي والتكويت" },
      },
      {
        id: "sustainability-reporting",
        label: { en: "Reporting", ar: "التقارير" },
        children: [
          {
            id: "sustainability-ceo-message",
            label: {
              en: "CEO Sustainability Message",
              ar: "كلمة الرئيس التنفيذي حول الاستدامة",
            },
          },
          {
            id: "sustainability-reports",
            label: { en: "Sustainability Reports", ar: "تقارير الاستدامة" },
          },
        ],
      },
    ],
  },
  {
    id: "media",
    label: { en: "Media & Engagement", ar: "الإعلام والتواصل" },
    children: [
      {
        id: "media-latest-news",
        label: { en: "Latest News", ar: "آخر الأخبار" },
        children: [
          {
            id: "media-news-corporate-announcements",
            label: { en: "Corporate announcements", ar: "إعلانات الشركة" },
          },
          {
            id: "media-news-product-tech-updates",
            label: { en: "Product and technology updates", ar: "مستجدات المنتجات والتقنيات" },
          },
          {
            id: "media-news-awards-achievements",
            label: { en: "Awards and achievements", ar: "الجوائز والإنجازات" },
          },
          {
            id: "media-news-events-exhibitions",
            label: { en: "Events and exhibitions", ar: "الفعاليات والمعارض" },
          },
          {
            id: "work-tendering-supplier-registration",
            label: {
              en: "Tendering / Supplier Registration",
              ar: "المناقصات وتسجيل الموردين",
            },
          },
          {
            id: "work-careers-working-at-kdf",
            label: { en: "Working at KDF", ar: "العمل في KDF" },
          },
          {
            id: "work-careers-current-vacancies",
            label: { en: "Current Vacancies", ar: "الوظائف الشاغرة" },
          },
          {
            id: "work-careers-submit-cv",
            label: { en: "Submit Your CV", ar: "إرسال سيرتك الذاتية" },
          },
        ],
      },
      {
        id: "media-photo-gallery",
        label: { en: "Photo Gallery", ar: "معرض الصور" },
        children: [
          { id: "media-gallery-facilities", label: { en: "Facilities", ar: "المنشآت" } },
          { id: "media-gallery-operations", label: { en: "Operations", ar: "العمليات" } },
          {
            id: "media-gallery-corporate-events",
            label: { en: "Corporate events", ar: "فعاليات الشركة" },
          },
          {
            id: "media-gallery-awards-exhibitions",
            label: { en: "Awards and exhibitions", ar: "الجوائز والمعارض" },
          },
        ],
      },
      {
        id: "media-partners-clients",
        label: { en: "Partners & Clients", ar: "الشركاء والعملاء" },
        children: [
          {
            id: "media-partners-technology",
            label: { en: "Technology partners", ar: "شركاء التقنية" },
          },
          {
            id: "media-partners-business",
            label: { en: "Business partners", ar: "شركاء الأعمال" },
          },
          {
            id: "media-partners-key-clients",
            label: { en: "Key clients", ar: "العملاء الرئيسيون" },
          },
          {
            id: "media-partners-industries-served",
            label: { en: "Industries served", ar: "القطاعات التي نخدمها" },
          },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: { en: "Contact Us", ar: "اتصل بنا" },
    children: [
      {
        id: "contact-general-enquiry",
        label: { en: "General Enquiry", ar: "استفسار عام" },
      },
      {
        id: "contact-technical-query",
        label: { en: "Technical Query", ar: "استفسار فني" },
      },
      {
        id: "contact-locations",
        label: {
          en: "Locations & Contact Information",
          ar: "المواقع ومعلومات الاتصال",
        },
        children: [
          {
            id: "contact-locations-head-office",
            label: { en: "Head office", ar: "المكتب الرئيسي" },
          },
          {
            id: "contact-locations-manufacturing",
            label: { en: "Manufacturing facilities", ar: "منشآت التصنيع" },
          },
          {
            id: "contact-locations-warehousing",
            label: { en: "Warehousing locations", ar: "مواقع التخزين" },
          },
          {
            id: "contact-locations-regional-offices",
            label: { en: "Regional offices", ar: "المكاتب الإقليمية" },
          },
          {
            id: "contact-locations-phone-email",
            label: { en: "Telephone and email", ar: "الهاتف والبريد الإلكتروني" },
          },
          {
            id: "contact-locations-map",
            label: { en: "Location map", ar: "خريطة الموقع" },
          },
        ],
      },
    ],
  },
];

function localize(items: NavItemSource[], locale: Locale): NavItem[] {
  return items.map((item) => ({
    id: item.id,
    label: item.label[locale],
    href: item.href,
    children: item.children ? localize(item.children, locale) : undefined,
  }));
}

export async function getMainNavigation(locale: Locale): Promise<NavItem[]> {
  // TODO(backend): once the .NET API is live, replace this with:
  //   const res = await fetch(`${process.env.API_BASE_URL}/navigation?locale=${locale}`, {
  //     next: { revalidate: 300 },
  //   });
  //   return res.json();
  return localize(mainNavigationSource, locale);
}
