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
  Learning: "/learn",
};

export interface LearningPillarFaq {
  q: string;
  a: string;
}

/**
 * One learning pillar groups existing pages into a unique topical cluster.
 * Invariants enforced at build time by validateLearningClusters():
 *  - every pageSlug resolves to a page in src/data/pages
 *  - a page slug appears in at most one pillar
 *  - every content page (non-utility) appears in exactly one pillar
 */
export interface LearningPillar {
  /** URL segment under /learn/. */
  slug: string;
  /** Short display name. */
  name: string;
  title: string;
  description: string;
  /** Body prose shown at the top of the pillar page. */
  intro: string;
  faqs: LearningPillarFaq[];
  /** Member page slugs, ordered: service pages first, blog posts last. */
  pageSlugs: string[];
}

export const learningPillars: LearningPillar[] = [
  {
    slug: "starting-a-business",
    name: "Starting a Business",
    title: "Starting a Business in India: Registration & Structure Guides",
    description:
      "Every guide on starting a business in India: choosing between a company, LLP, OPC or partnership, registration walkthroughs, DPIIT and Udyam recognition.",
    intro:
      "Everything a founder reads before the first filing: comparing the private limited company, LLP, OPC, partnership and proprietorship, reserving a name, incorporating, and adding the registrations — DPIIT, Udyam, GST, trust or society — that the model demands. Start with the structure comparisons, then follow the registration walkthrough for the entity you choose.",
    faqs: [
      {
        q: "Which structure should a new business choose?",
        a: "Funded startups and subsidiaries suit a private limited company; professional firms and family businesses suit an LLP; solo founders can begin with an OPC; micro-traders often start as a proprietorship and convert later. The comparison guides above score each option on compliance load, taxation and funding access.",
      },
      {
        q: "How long does registration take?",
        a: "A private limited company or LLP typically incorporates in one to three weeks once documents and digital signatures are ready. Registrations that ride on the incorporation — GST, EPFO, ESIC, professional tax — come through the same linked application.",
      },
      {
        q: "Do startups need DPIIT recognition?",
        a: "Not to operate, but recognition unlocks income-tax exemption under Section 80-IAC, tax freedom on investments above fair value, self-certification under labour laws and access to government schemes. It is free, online and granted for entities under ten years old meeting the innovation test.",
      },
    ],
    pageSlugs: [
      "/company-registration",
      "/{city}/company-registration",
      "/llp-registration",
      "/partnership-proprietorship-registration",
      "/startup-registration-dpiit",
      "/msme-udyam-registration",
      "/trust-society-registration",
      "/business-plan-guide",
      "/state-startup-incentives",
      "/guides",
      "/blog/startup-msme",
    ],
  },
  {
    slug: "company-law-compliance",
    name: "Company Law & ROC Compliance",
    title: "Company Law & ROC Compliance Guides: Forms, Filings, Calendars",
    description:
      "Companies Act and LLP Act guides: ROC annual filings, the MCA form map, director KYC, CSR, dematerialisation of shares and company closure routes.",
    intro:
      "Once an entity exists, the Companies Act and LLP Act set its filing rhythm: annual returns and financial statements, director KYC, event-based MCA forms, beneficial ownership registers and CSR reporting. These guides map every form to its due date and consequence, and cover both the routine calendar and the exit routes when an entity must be closed.",
    faqs: [
      {
        q: "Where do I find which MCA form applies to my event?",
        a: "The ROC compliance guide carries the annual filing calendar and an event-to-form map covering charges, auditor changes, approvals and dormant status; the forms and checklists reference lists every form by regulator.",
      },
      {
        q: "What happens if annual filings are missed?",
        a: "Additional fees of Rs 100 per day apply on annual forms, penalties fall on the company and its officers, and five consecutive years of missed annual returns disqualify the directors. DINs also deactivate when DIR-3 KYC lapses.",
      },
      {
        q: "Can an inactive company simply be abandoned?",
        a: "No — the entity stays on the register and defaults accumulate. The clean options are dormant status for companies that may restart, or strike off under Section 248 for companies and LLP Form 24 for LLPs.",
      },
    ],
    pageSlugs: [
      "/roc-compliance",
      "/directors-kyc-sbo",
      "/csr-compliance",
      "/dematerialisation-shares",
      "/company-strike-off",
      "/forms-checklists",
      "/blog/corporate-law",
    ],
  },
  {
    slug: "income-tax-compliance",
    name: "Income Tax & Compliance",
    title: "Income Tax Guides: ITR Filing, Notices, Capital Gains & Planning",
    description:
      "Income tax guides for businesses and individuals: ITR selection, advance tax, capital gains, scrutiny notices, presumptive taxation and dispute resolution.",
    intro:
      "The income tax shelf runs from return selection and advance tax through capital gains, presumptive schemes and deductions to the sharp end — scrutiny notices, unexplained credits and dispute resolution. Individual and HNI planning, real estate transactions and startup exemptions sit alongside the business compliance guides.",
    faqs: [
      {
        q: "Which ITR form applies to a company or firm?",
        a: "Companies file ITR-6 unless claiming exemption as a charitable institution, in which case ITR-7 applies. Firms, LLPs and AOPs file ITR-5. Individuals choose ITR-1 through ITR-4 based on income heads and whether presumptive taxation applies.",
      },
      {
        q: "I received an income tax notice — where do I start?",
        a: "Identify the section: intimation under 143(1), scrutiny under 143(2), or information-based notices referencing AIS data. Reconcile Form 26AS, AIS and TIS against books before responding — the scrutiny and notices guide walks through each response route and its deadlines.",
      },
      {
        q: "When is advance tax due?",
        a: "At 15, 45, 75 and 100 per cent of the assessed liability by 15 June, 15 September, 15 December and 15 March respectively. Interest under sections 234B and 234C applies on shortfalls.",
      },
    ],
    pageSlugs: [
      "/income-tax",
      "/itr-filing",
      "/ais-sft-guide",
      "/capital-gains-section-54-54f",
      "/individual-tax-planning",
      "/presumptive-corporate-tax",
      "/income-tax-scrutiny-notices",
      "/section-68-unexplained-credits",
      "/startup-tax-exemptions",
      "/tax-dispute-resolution",
      "/rera-jda-real-estate",
      "/budget-policy-hub",
      "/blog/budget-tax-updates",
      "/blog/tax-updates",
    ],
  },
  {
    slug: "international-nri-tax",
    name: "International & NRI Tax",
    title: "International & NRI Tax Guides: Transfer Pricing, DTAA, FEMA",
    description:
      "Cross-border tax guides: transfer pricing, NRI taxation, DTAA and foreign tax credits, foreign subsidiary planning and international tax updates.",
    intro:
      "Cross-border work turns on a handful of questions: who is a resident, which country taxes what, and how treaties and credit mechanisms prevent double taxation. These guides cover transfer pricing and its documentation, NRI asset and return strategy, DTAA relief and advance rulings, foreign subsidiary structures, and the FEMA overlay that governs the money's movement.",
    faqs: [
      {
        q: "When does transfer pricing apply?",
        a: "To international transactions between associated enterprises above the prescribed threshold, covering goods, services, loans, guarantees, intangibles and shareholding. Compliance means contemporaneous documentation, an accountant's report in Form 3CEB and pricing consistent with the arm's length principle.",
      },
      {
        q: "How does an NRI avoid double taxation?",
        a: "Through the DTAA between India and the country of residence: tie-breaker rules fix one residence, taxing rights are allocated article by article, and residual tax is relieved through a foreign tax credit. TRC and Form 10F documentation must be in place before claiming treaty benefits.",
      },
      {
        q: "Do foreign subsidiaries of Indian companies need separate planning?",
        a: "Yes. Controlled foreign corporation concepts, POEM rules, withholding on repatriations, and exit taxation all interact. The foreign subsidiary tax planning guide covers structure choices and repatriation sequencing.",
      },
    ],
    pageSlugs: [
      "/transfer-pricing",
      "/international-taxation",
      "/nri-taxation",
      "/dtaa-foreign-tax-credit",
      "/foreign-subsidiary-tax-planning",
      "/blog/international-tax",
    ],
  },
  {
    slug: "gst",
    name: "GST",
    title: "GST Guides: Registration, Returns, ITC, Refunds & Notices",
    description:
      "Complete GST guide set: registration, return filing, input tax credit, e-invoicing, refunds, audits, TDS and TCS, sector issues and monthly updates.",
    intro:
      "GST is a monthly operating discipline, not an annual event. These guides follow the tax through its life cycle: registration, the return cycle from GSTR-1 to GSTR-9, input credit and its reversals, e-invoicing and e-way bills, refunds, audits and departmental notices — plus the sector quirks for real estate, e-commerce and exports, and the running tracker of rate changes and circulars.",
    faqs: [
      {
        q: "Which GST registrations are mandatory?",
        a: "Registration is required once aggregate turnover crosses the prescribed threshold — with lower limits for inter-state suppliers — and in full for e-commerce sellers, casual taxable persons and non-resident suppliers regardless of turnover.",
      },
      {
        q: "Why is my input tax credit being reversed?",
        a: "The common causes are invoices missing from GSTR-2B, blocked credits under section 17(5), credit tied to exempt supplies requiring the Rule 42/43 allocation, and suppliers whose filings are overdue. The ITC guide maps each reversal to its fix.",
      },
      {
        q: "How long do GST refunds take?",
        a: "Provisional refund of 90 per cent applies within seven days for zero-rated supplies where risk parameters permit; full sanction is targeted within 60 days of a complete application, with interest on delays beyond that.",
      },
    ],
    pageSlugs: [
      "/gst-services",
      "/gst-registration",
      "/gst-return-filing",
      "/gst-itc-rcm",
      "/gst-e-invoicing-eway-bill",
      "/gst-rates-notifications",
      "/gst-refund",
      "/gst-audit",
      "/gst-advisory-notices",
      "/gst-exports",
      "/gst-tds-tcs-ecommerce",
      "/gst-real-estate",
      "/gst-sector-issues",
      "/blog/gst-updates",
    ],
  },
  {
    slug: "audit-assurance",
    name: "Audit & Assurance",
    title: "Audit Guides: Statutory, Internal, Tax & Stock Audits Explained",
    description:
      "Audit guides covering statutory audit, internal audit, tax audit under 44AB, IT and stock audits, public sector audit, due diligence and audit quality.",
    intro:
      "Audits answer a simple question — can the numbers be trusted — through several statutory lenses. These guides separate the regimes: statutory audit under the Companies Act, tax audit under section 44AB, internal and management audits, IT and stock audits for system-reliant businesses, public sector engagements, and the transaction audits that due diligence demands.",
    faqs: [
      {
        q: "When does the tax audit under section 44AB apply?",
        a: "When business turnover exceeds Rs 1 crore — relaxed to Rs 10 crore where 95 per cent or more of transactions are digital — or professional receipts exceed Rs 50 lakh. The report in Forms 3CA/3CB and 3CD is due by 30 September of the assessment year.",
      },
      {
        q: "Who must appoint a statutory auditor, and by when?",
        a: "Every company appoints its first auditor within 30 days of incorporation and reappoints annually at the AGM, filing Form ADT-1 within 15 days. LLPs need an audit only above Rs 40 lakh turnover or Rs 25 lakh contribution.",
      },
      {
        q: "What does due diligence actually test?",
        a: "Financial, tax, legal and operational records are verified against filings, registers and third-party confirmations — with particular attention to contingent liabilities, related-party dealings and compliance gaps that survive into the transaction.",
      },
    ],
    pageSlugs: [
      "/statutory-audit",
      "/internal-audit",
      "/tax-audit",
      "/it-stock-audit",
      "/public-sector-audit",
      "/due-diligence",
      "/blog/nfra-audit",
      "/blog/audit-quality",
    ],
  },
  {
    slug: "cfo-finance-function",
    name: "CFO & Finance Function",
    title: "CFO & Finance Function Guides: Outsourcing, Payroll, MIS & Deals",
    description:
      "Finance function guides: virtual CFO services, accounting outsourcing, payroll and labour law, MIS reporting, valuations, IPO readiness and restructuring.",
    intro:
      "The finance function beyond compliance: bookkeeping and accounting standards that keep books audit-ready, payroll and labour law filings, MIS and cost control, fundraising models and valuations, transaction support for mergers and IPOs, and the outsourced CFO arrangements that pull it together for growing companies.",
    faqs: [
      {
        q: "What does a virtual CFO actually do?",
        a: "Runs the finance function at a fraction of a full-time hire: accounting oversight, MIS and board reporting, cash flow and working capital control, compliance calendars, investor reporting and transaction support — scoped by the hour, month or outcome.",
      },
      {
        q: "Is outsourcing payroll safe for statutory compliance?",
        a: "Yes — professional payroll runs PF, ESI, professional tax, gratuity and salary TDS on one calendar with proof of filing for each cycle, which is where in-house teams most often slip.",
      },
      {
        q: "When is a valuation report mandatory?",
        a: "For issue and transfer of shares at other than fair value under the Companies Act, FEMA pricing guidelines, ESOP grants, merchant banking work and NCLT schemes — each prescribing who may sign and which method applies.",
      },
    ],
    pageSlugs: [
      "/cfo-services",
      "/accounting-outsourcing",
      "/finance-controller-mis",
      "/payroll-services",
      "/labour-law-compliance",
      "/financial-model-pitch-deck-valuation",
      "/startup-funding-angel-vc",
      "/mergers-restructuring",
      "/ipo-sme-ipo",
      "/accounting-software-audit-trail",
      "/ind-as-accounting-standards",
      "/blog/startup-finance",
      "/blog/labour-law",
    ],
  },
  {
    slug: "doing-business-in-india",
    name: "Doing Business in India",
    title: "Doing Business in India: FDI, Subsidiaries, FEMA & Entry Guides",
    description:
      "India entry guides: FDI routes and sectoral caps, subsidiary and branch office setup, FEMA and RBI reporting, and foreign company compliance.",
    intro:
      "Entering India is a sequence: choose the vehicle — subsidiary, branch, liaison or LLP — clear the FDI route and sectoral caps for the activity, price the investment within FEMA guidelines, then run the reporting spine of FC-GPR, FLA and annual ROC filings. These guides cover the full sequence plus the tax overlays for foreign-owned entities.",
    faqs: [
      {
        q: "Which entry structure is fastest?",
        a: "A private limited subsidiary through the automatic route is the standard choice: 100 per cent ownership in most sectors, incorporation in a few weeks, and clean downstream reporting. Branch and liaison offices need RBI approval first and suit representative or project-specific presence.",
      },
      {
        q: "What are the first reporting deadlines after FDI comes in?",
        a: "Advance reporting of the inward remittance to the RBI within 30 days, FC-GPR filing the allotment within 30 days of issue, and the annual FLA return by 15 July. Missing these triggers FEMA compounding.",
      },
      {
        q: "Are any sectors closed to foreign investment?",
        a: "Yes — atomic energy, railway operations outside permitted construction, lottery, gambling, chit funds, nidhi companies, transferable development rights, real estate business other than construction development, and cigarette manufacture. Land-border countries face additional approval requirements under Press Note 3.",
      },
    ],
    pageSlugs: [
      "/invest-in-india",
      "/subsidiary-entity",
      "/branch-liaison-office",
      "/fdi-in-company-llp",
      "/fema-RBI-reporting",
      "/foreign-company-entry-india",
    ],
  },
  {
    slug: "by-industry",
    name: "Tax & Compliance by Industry",
    title: "Industry Guides: IT, Manufacturing, Real Estate, Fintech, GCC, SEZ",
    description:
      "Industry-specific tax and compliance guides: IT and SaaS, manufacturing and semiconductors, real estate, fintech and VDA, GCCs, and SEZ-STPI regimes.",
    intro:
      "Compliance changes shape with the industry: SaaS businesses wrestle with export-of-services classification and VDA rules, manufacturers with semiconductor incentives and energy levies, developers with RERA and GST on construction, fintechs with payment regulation, GCCs with expatriate and withholding questions, and SEZ units with the specialised regime that keeps their exemptions intact.",
    faqs: [
      {
        q: "Is export of services taxable under GST?",
        a: "Exports of services are zero-rated where the conditions on recipient location and consideration in convertible exchange are met — allowing refunds of unutilised input credit or supply under a Letter of Undertaking without paying IGST.",
      },
      {
        q: "What makes the SEZ regime attractive?",
        a: "IT/ITES units in SEZs and STPI-registered units can claim income tax benefits under Section 10AA or the STPI sunset scheme, GST zero-rating on authorised operations, and single-window compliance — provided the unit keeps its export obligations and separate books.",
      },
      {
        q: "Do global capability centres need special tax structuring?",
        a: "Yes. Captive GCCs must manage permanent establishment risk for the parent, transfer pricing on intra-group services, expatriate taxation and SEZ or incentive eligibility — the GCC guide covers the checklist.",
      },
    ],
    pageSlugs: [
      "/it-saas-ecommerce",
      "/manufacturing-energy-semiconductor",
      "/real-estate-construction",
      "/fintech-vda-metaverse",
      "/gcc-global-capability-centres",
      "/sez-stpi",
    ],
  },
  {
    slug: "local-services",
    name: "CA Services in Your City",
    title: "CA Services in Your City: Local Audit, Tax, GST & Payroll Support",
    description:
      "Location guides for hands-on support: CA firm, audit, income tax, GST, company registration, payroll, transfer pricing and virtual CFO services in your city.",
    intro:
      "National rules, local execution. These pages describe how each service runs on the ground in your city — the jurisdictional registrar, the practical timelines, and the team that attends matters in person. Pick your service; the same standards apply wherever the entity sits.",
    faqs: [
      {
        q: "Does the location of my CA firm matter for compliance?",
        a: "Filings are online, but jurisdiction matters for the practical work: RoC jurisdiction for filings and hearings, GST and income tax ranges for assessments, and physical attendance at registrations and verifications. A local team shortens each of those loops.",
      },
      {
        q: "Which services can be fully remote?",
        a: "Annual ROC filings, return preparation, payroll and advisory run entirely remote with scanned documents. Registrations, audits, assessments and verifications mix remote preparation with on-ground presence — which is where city coverage counts.",
      },
      {
        q: "How do I engage a CA firm in my city?",
        a: "Start with a scope call covering the entity list, filing status and pain points; a written engagement letter follows with deliverables and the compliance calendar. The city pages list contacts and the services desk for each location.",
      },
    ],
    pageSlugs: [
      "/ca-firm-in-{city}",
      "/{city}/income-tax-services",
      "/{city}/gst-registration",
      "/{city}/audit-services",
      "/{city}/internal-audit",
      "/{city}/tax-consultants",
      "/{city}/transfer-pricing",
      "/{city}/payroll-company",
      "/{city}/virtual-cfo",
    ],
  },
];

export interface NavLink {
  label: string;
  href: string;
}

export const headerNav: NavLink[] = [
  { label: "About", href: "/about-us" },
  { label: "FAQ", href: "/faq" },
  { label: "Learn", href: "/learn" },
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
      { label: "Learning Hub", href: "/learn" },
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
