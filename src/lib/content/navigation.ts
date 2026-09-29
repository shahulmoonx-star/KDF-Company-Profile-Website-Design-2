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
 * Mock main navigation, matching the KDF Website Sitemap review (29 Sep
 * 2026) exactly — 8 top-level sections, "Home" itself is the logo link
 * (see Navbar.tsx) rather than a menu entry. Arabic labels are a first-pass
 * professional translation pending KDF's review before launch — see
 * docs/i18n.md. Industry terms (e.g. "Cementing" -> "الإسمنت") follow
 * standard Arabic technical terminology used across technical literature
 * rather than a literal dictionary translation.
 *
 * Every top-level item's tree stays at most two levels deep (group ->
 * leaf). That is not a style choice, it is a hard constraint: the desktop
 * mega-menu (src/components/nav/MegaMenu.tsx, via menu-utils.buildColumns)
 * only ever renders a column heading and its direct leaf items — a
 * grandchild of a column item is invisible there, even though the mobile
 * drawer would still recurse into it. Solutions & Products already sits at
 * that limit (each product line is itself a headed column), which is why
 * "Success Stories" and "Video on product / service pages" — both listed
 * per-category in the sitemap review — collapse into that same category's
 * flat leaf list rather than gaining their own sub-group.
 *
 * "Work With Us" is its own top-level item here, matching the sitemap
 * review's structure, rather than nested under Media & Engagement.
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
      },
      {
        id: "about-company-overview",
        label: { en: "Company Overview", ar: "نبذة عن الشركة" },
      },
      { id: "about-history", label: { en: "History since 1966", ar: "تاريخنا منذ 1966" } },
      {
        id: "about-slb-partnership",
        label: { en: "KDF–SLB Partnership", ar: "شراكة KDF مع SLB" },
      },
      {
        id: "about-vision-mission-values",
        label: { en: "Vision, Mission & Values", ar: "الرؤية والرسالة والقيم" },
      },
      { id: "about-leadership", label: { en: "Our Leadership", ar: "قيادتنا" } },
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
            label: { en: "Laboratory & Technical Support", ar: "الدعم المخبري والفني" },
          },
          {
            id: "solutions-cem-success-stories",
            label: { en: "Success Stories", ar: "قصص النجاح" },
          },
        ],
      },
      {
        id: "solutions-logistics",
        label: { en: "Logistics · Phase 2", ar: "الخدمات اللوجستية · المرحلة 2" },
        children: [
          { id: "solutions-log-overview", label: { en: "Overview", ar: "نظرة عامة" } },
          {
            id: "solutions-log-fleet-distribution",
            label: { en: "Fleet & Distribution", ar: "الأسطول والتوزيع" },
          },
          {
            id: "solutions-log-delivery-scheduling",
            label: { en: "Delivery & Scheduling", ar: "التسليم والجدولة" },
          },
          {
            id: "solutions-log-success-stories",
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
        id: "infrastructure-qhse",
        label: {
          en: "HSE, Quality Assurance & Quality Control (QHSE)",
          ar: "الصحة والسلامة والبيئة وضمان الجودة ومراقبتها (QHSE)",
        },
      },
      {
        id: "infrastructure-labs-testing",
        label: { en: "Laboratories & Testing", ar: "المختبرات والفحوصات" },
      },
      {
        id: "infrastructure-manufacturing",
        label: { en: "Manufacturing Facilities", ar: "منشآت التصنيع" },
      },
      {
        id: "infrastructure-warehousing",
        label: { en: "Warehousing", ar: "التخزين" },
      },
      {
        id: "infrastructure-rnd",
        label: { en: "Research & Development", ar: "البحث والتطوير" },
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
  {
    id: "media",
    label: { en: "Media & Engagement", ar: "الإعلام والتواصل" },
    children: [
      {
        id: "media-latest-news",
        label: { en: "Latest News", ar: "آخر الأخبار" },
        children: [
          {
            id: "media-news-announcements-updates",
            label: {
              en: "Announcements & product updates",
              ar: "إعلانات ومستجدات المنتجات",
            },
          },
          {
            id: "media-news-awards-events",
            label: {
              en: "Awards, events & exhibitions",
              ar: "الجوائز والفعاليات والمعارض",
            },
          },
        ],
      },
      {
        id: "media-photo-gallery",
        label: { en: "Photo Gallery", ar: "معرض الصور" },
        children: [
          {
            id: "media-gallery-facilities-operations",
            label: { en: "Facilities & operations", ar: "المنشآت والعمليات" },
          },
          {
            id: "media-gallery-corporate-events",
            label: {
              en: "Corporate events & exhibitions",
              ar: "فعاليات الشركة والمعارض",
            },
          },
        ],
      },
      {
        id: "media-partners-clients",
        label: { en: "Partners & Clients", ar: "الشركاء والعملاء" },
        children: [
          {
            id: "media-partners-technology-business",
            label: { en: "Technology & business partners", ar: "شركاء التقنية والأعمال" },
          },
          {
            id: "media-partners-key-clients-industries",
            label: {
              en: "Key clients & industries served",
              ar: "العملاء الرئيسيون والقطاعات التي نخدمها",
            },
          },
        ],
      },
    ],
  },
  {
    id: "work-with-us",
    label: { en: "Work With Us", ar: "اعمل معنا" },
    children: [
      {
        id: "work-supplier-registration",
        label: { en: "Supplier Registration", ar: "تسجيل الموردين" },
      },
      {
        id: "work-careers",
        label: { en: "Careers", ar: "الوظائف" },
        children: [
          {
            id: "work-careers-working-at-kdf",
            label: { en: "Working at KDF", ar: "العمل في KDF" },
          },
          {
            id: "work-careers-current-vacancies",
            label: { en: "Current Vacancies", ar: "الوظائف الشاغرة" },
          },
          {
            id: "work-careers-paths-progression",
            label: { en: "Career paths & progression", ar: "المسارات الوظيفية والتطور" },
          },
          {
            id: "work-careers-employee-testimonials",
            label: { en: "Employee testimonials", ar: "آراء الموظفين" },
          },
          {
            id: "work-careers-submit-cv",
            label: { en: "Submit Your CV", ar: "إرسال سيرتك الذاتية" },
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
