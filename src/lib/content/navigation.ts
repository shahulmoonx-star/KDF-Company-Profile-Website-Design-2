import type { NavItem } from "./types";

/**
 * Mock main navigation, matching docs/navigation-structure.md exactly.
 *
 * This is temporary content. Once the .NET API is available, replace the
 * body of getMainNavigation() below with a real fetch — nothing else in the
 * app needs to change, since every consumer already goes through that one
 * function and the generic NavItem shape. See docs/backend-integration-plan.md.
 */
const mainNavigation: NavItem[] = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About KDF",
    children: [
      { id: "about-who-we-are", label: "Who We Are" },
      { id: "about-company-overview", label: "Company Overview" },
      { id: "about-history", label: "History since 1966" },
      { id: "about-slb-partnership", label: "KDF–SLB Partnership" },
      { id: "about-vision-mission-values", label: "Vision, Mission & Values" },
      { id: "about-leadership", label: "Our Leadership" },
      {
        id: "about-governance",
        label: "Governance",
        children: [
          { id: "about-governance-board", label: "Board of Directors" },
          { id: "about-governance-chairman", label: "Chairman's Message" },
          {
            id: "about-governance-code-of-conduct",
            label: "Code of Conduct / Business Integrity",
          },
        ],
      },
      { id: "about-milestones", label: "Milestones" },
      { id: "about-awards", label: "Awards & Certifications" },
      { id: "about-facilities", label: "Our Facilities" },
    ],
  },
  {
    id: "solutions",
    label: "Solutions & Products",
    children: [
      {
        id: "solutions-drilling-completion-fluids",
        label: "Drilling & Completion Fluids",
        children: [
          { id: "solutions-dcf-overview", label: "Overview" },
          { id: "solutions-dcf-catalogue", label: "Download Product Catalogue" },
          { id: "solutions-dcf-drilling-fluid-solutions", label: "Drilling Fluid Solutions" },
          { id: "solutions-dcf-completion-fluid-solutions", label: "Completion Fluid Solutions" },
          { id: "solutions-dcf-products", label: "Products" },
          { id: "sol  utions-dcf-data-sheets", label: "Product Data Sheets" },
          { id: "solutions-dcf-success-stories", label: "Success Stories" },
        ],
      },
      {
        id: "solutions-production-chemistry",
        label: "Production Chemistry",
        children: [
          { id: "solutions-pc-overview", label: "Overview" },
          { id: "solutions-pc-catalogue", label: "Download Product Catalogue" },
          { id: "solutions-pc-treat-chemistry", label: "Treat Chemistry" },
          { id: "solutions-pc-protect-chemistry", label: "Protect Chemistry" },
          { id: "solutions-pc-assure-chemistry", label: "Assure Chemistry" },
          { id: "solutions-pc-data-sheets", label: "Product Data Sheets" },
          { id: "solutions-pc-success-stories", label: "Success Stories" },
        ],
      },
      {
        id: "solutions-cementing",
        label: "Cementing Solutions",
        children: [
          { id: "solutions-cem-overview", label: "Overview" },
          { id: "solutions-cem-catalogue", label: "Download Product Catalogue" },
          { id: "solutions-cem-products-services", label: "Products & Services" },
          { id: "solutions-cem-lab-support", label: "Laboratory and Technical Support" },
          { id: "solutions-cem-data-sheets", label: "Product Data Sheets" },
          { id: "solutions-cem-success-stories", label: "Success Stories" },
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure & Capabilities",
    children: [
      { id: "infrastructure-manufacturing", label: "Manufacturing Facilities" },
      { id: "infrastructure-warehousing-logistics", label: "Warehousing & Logistics" },
      { id: "infrastructure-rnd", label: "Research & Development" },
      { id: "infrastructure-labs-testing", label: "Laboratories & Testing" },
      { id: "infrastructure-qa-qc", label: "Quality Assurance & Quality Control" },
      { id: "infrastructure-ohse", label: "Occupational Health, Safety & Environment" },
    ],
  },
  {
    id: "sustainability",
    label: "Sustainability",
    children: [
      { id: "sustainability-strategy", label: "Sustainability Strategy" },
      {
        id: "sustainability-esg",
        label: "ESG Approach",
        children: [
          { id: "sustainability-esg-environmental", label: "Environmental" },
          { id: "sustainability-esg-social", label: "Social" },
          { id: "sustainability-esg-governance", label: "Governance" },
        ],
      },
      { id: "sustainability-local-content", label: "Local Content & Kuwaitisation" },
      { id: "sustainability-ceo-message", label: "CEO Sustainability Message" },
      { id: "sustainability-reports", label: "Sustainability Reports" },
    ],
  },
  {
    id: "media",
    label: "Media & Engagement",
    children: [
      {
        id: "media-latest-news",
        label: "Latest News",
        children: [
          { id: "media-news-corporate-announcements", label: "Corporate announcements" },
          { id: "media-news-product-tech-updates", label: "Product and technology updates" },
          { id: "media-news-awards-achievements", label: "Awards and achievements" },
          { id: "media-news-events-exhibitions", label: "Events and exhibitions" },
        ],
      },
      {
        id: "media-photo-gallery",
        label: "Photo Gallery",
        children: [
          { id: "media-gallery-facilities", label: "Facilities" },
          { id: "media-gallery-operations", label: "Operations" },
          { id: "media-gallery-corporate-events", label: "Corporate events" },
          { id: "media-gallery-awards-exhibitions", label: "Awards and exhibitions" },
        ],
      },
      {
        id: "media-partners-clients",
        label: "Partners & Clients",
        children: [
          { id: "media-partners-technology", label: "Technology partners" },
          { id: "media-partners-business", label: "Business partners" },
          { id: "media-partners-key-clients", label: "Key clients" },
          { id: "media-partners-industries-served", label: "Industries served" },
        ],
      },
    ],
  },
  {
    id: "careers-section",
    label: "Work With Us",
    children: [
      { id: "work-tendering-supplier-registration", label: "Tendering / Supplier Registration" },
      {
        id: "work-careers",
        label: "Careers",
        children: [
          { id: "work-careers-working-at-kdf", label: "Working at KDF" },
          { id: "work-careers-current-vacancies", label: "Current Vacancies" },
          { id: "work-careers-submit-cv", label: "Submit Your CV" },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact Us",
    children: [
      { id: "contact-general-enquiry", label: "General Enquiry" },
      { id: "contact-technical-query", label: "Technical Query" },
      {
        id: "contact-locations",
        label: "Locations & Contact Information",
        children: [
          { id: "contact-locations-head-office", label: "Head office" },
          { id: "contact-locations-manufacturing", label: "Manufacturing facilities" },
          { id: "contact-locations-warehousing", label: "Warehousing locations" },
          { id: "contact-locations-regional-offices", label: "Regional offices" },
          { id: "contact-locations-phone-email", label: "Telephone and email" },
          { id: "contact-locations-map", label: "Location map" },
        ],
      },
    ],
  },
];

export async function getMainNavigation(): Promise<NavItem[]> {
  // TODO(backend): once the .NET API is live, replace this with:
  //   const res = await fetch(`${process.env.API_BASE_URL}/navigation`, {
  //     next: { revalidate: 300 },
  //   });
  //   return res.json();
  return mainNavigation;
}
