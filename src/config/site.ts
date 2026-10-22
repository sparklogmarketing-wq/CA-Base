/**
 * Single source of truth for brand, tokens, cities, nav and placeholders.
 * Change values here and the whole site updates at build time.
 */

export const site = {
  name: "Your Site",
  shortName: "YS",
  tagline: "Chartered Accountants in Your City",
  url: "https://example.github.io",
  phone: "+91 00000 00000",
  email: "info@example.com",
  address: "Your City, Karnataka, India",
  description:
    "Chartered accountant firm in Your City providing audit, tax, GST, company registration and CFO services.",
};

/** City pages expand per entry. Add a city -> routes are generated on next build. */
export const cities = [{ slug: "cityname", name: "City", state: "State" }];

/** Tokens replaced in markdown content and frontmatter at build time. */
export const placeholders: Record<string, string> = {
  brand: site.name,
  company_name: site.name,
  country: "India",
  state: "State",
  audit_regulator: "NFRA",
  corporate_affairs_authority: "MCA",
  indirect_tax_authority: "CBIC",
  direct_tax_authority: "CBDT",
  company_law_tribunal: "NCLT",
  supreme_court: "Supreme Court of India",
  international_policy_body: "OECD",
  funding_program: "Startup India Seed Fund Scheme",
  country_1: "the US",
  country_2: "the UK",
  country_3: "Singapore",
  contact_email: site.email,
  contact_phone: site.phone,
  office_address: site.address,
};

/**
 * Tokens that intentionally have NO configured value yet render literally as
 * visible TODOs ({person_1}, {company_1}, {city_1}, {locality_1}, ...).
 * To resolve one, add an entry above, e.g. person_2: 'Asha Rao'.
 * See placeholder-checklist.md at the repo root for the full page x placeholder matrix.
 */

/** Cluster -> hub page used for breadcrumbs + footer grouping. */
export const clusterHubs: Record<string, string> = {
  Core: "/",
  Location: "/ca-firm-in-{city}",
  "{country} Entry / FDI": "/invest-in-india",
  "Audit & Assurance": "/statutory-audit",
  "Corporate / Registration": "/company-registration",
  Tax: "/income-tax",
  GST: "/gst-services",
  "CFO / Outsourcing": "/cfo-services",
  Industry: "/guides",
  "Blog Hub": "/guides",
  Resource: "/guides",
};

export interface NavLink {
  label: string;
  href: string;
}

export const headerNav: NavLink[] = [
  { label: "About", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Guides", href: "/guides" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact-us" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Services",
    links: [
      { label: "Statutory Audit", href: "/statutory-audit" },
      { label: "Internal Audit", href: "/internal-audit" },
      { label: "Income Tax", href: "/income-tax" },
      { label: "GST Services", href: "/gst-services" },
      { label: "Company Registration", href: "/company-registration" },
      { label: "Virtual CFO", href: "/cfo-services" },
      { label: "Payroll", href: "/payroll-services" },
      { label: "Accounting Outsourcing", href: "/accounting-outsourcing" },
    ],
  },
  {
    title: "Global & Industry",
    links: [
      { label: "Invest in India", href: "/invest-in-india" },
      { label: "International Taxation", href: "/international-taxation" },
      { label: "Subsidiary Incorporation", href: "/subsidiary-entity" },
      { label: "Branch / Liaison Office", href: "/branch-liaison-office" },
      { label: "FEMA / RBI Reporting", href: "/fema-RBI-reporting" },
      { label: "IT / SaaS / E-Commerce", href: "/it-saas-ecommerce" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Guides & Comparisons", href: "/guides" },
      { label: "Forms & Checklists", href: "/forms-checklists" },
      { label: "Tax Updates", href: "/blog/tax-updates" },
      { label: "GST Updates", href: "/blog/gst-updates" },
      { label: "Corporate Law", href: "/blog/corporate-law" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about-us" },
      { label: "Contact", href: "/contact-us" },
      { label: "Apply Online", href: "/apply-online" },
      { label: "Payments", href: "/payments" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];
