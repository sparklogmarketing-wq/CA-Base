# CA Website

Static SEO site for a chartered accountant firm, built with **Astro 5 + React (react-markdown) + Tailwind CSS v4**.

Every page is a markdown file in `src/data/pages/` (frontmatter + body), rendered by a single dynamic route. 104 routes are generated at build time - including per-city pages (Bangalore seed).

## Quick start

```bash
npm install
npm run dev       # local dev at http://localhost:4321
npm run build     # static build to dist/
npm run preview   # preview the production build
node verify.mjs   # QA: h1 counts, token leaks, broken internal links (run after build)
```

## Project structure

```
CA-Website/
├── astro.config.mjs          # site URL, React + Tailwind + sitemap integrations
├── verify.mjs                # post-build QA script
├── scripts/
│   └── generate-checklist.mjs    # regenerates ../placeholder-checklist.md
├── src/
│   ├── config/site.ts        # ALL configuration: brand, cities, tokens, nav, cluster hubs
│   ├── styles/global.css     # Tailwind v4 theme tokens (brand colors, typography plugin)
│   ├── lib/pages.ts          # loads *.md, parses frontmatter, fills {tokens} (display vs URL vars)
│   ├── layouts/BaseLayout.astro
│   ├── components/
│   │   ├── MarkdownContent.tsx   # react-markdown + remark-gfm renderer
│   │   ├── Seo.astro             # title/description/canonical/OG + JSON-LD
│   │   ├── Header.astro / Footer.astro / Breadcrumbs.astro
│   ├── data/pages/*.md       # 104 page content files (frontmatter + body)
│   └── pages/
│       ├── [...slug].astro   # renders every markdown page (incl. city expansion)
│       └── 404.astro
└── public/
```

## Configuration (src/config/site.ts)

| Setting | What it controls |
|---|---|
| `site.name` / `shortName` / `tagline` | Brand tokens rendered via `{brand}` in all markdown |
| `site.url` | Canonical URLs, OG URLs, sitemap origin - **must match the deploy URL** |
| `site.phone` / `email` / `address` | Header/footer contact block; also fill `{contact_phone}` / `{contact_email}` / `{office_address}` in content |
| `cities` | City page expansion. Each entry generates `/ca-firm-in-<slug>` + `/<slug>/<service>` routes |
| `placeholders` | Regulatory/brand tokens replaced at build: `{country}` -> India, `{audit_regulator}` -> NFRA, `{corporate_affairs_authority}` -> MCA, `{contact_email}`, `{contact_phone}`, `{office_address}`, etc. |
| `clusterHubs` | Cluster -> hub page mapping used for breadcrumbs |
| `headerNav` / `footerNav` | Navigation links |

### Placeholder tokens in content

All identifying content in the markdown files has been replaced with tokens:

| Category | Tokens | Resolved? |
|---|---|---|
| Brand | `{brand}`, `{company_name}` | Yes - `site.name` |
| Contact | `{contact_email}`, `{contact_phone}`, `{office_address}` | Yes - `site.email` / `site.phone` / `site.address` |
| Location | `{city}`, `{state}` | Yes - per-route city (seed: Bangalore) / Karnataka |
| Regulatory | `{audit_regulator}`, `{corporate_affairs_authority}`, `{indirect_tax_authority}`, `{direct_tax_authority}`, `{company_law_tribunal}`, `{supreme_court}`, `{international_policy_body}`, `{funding_program}`, `{country}`, `{country_1..3}` | Yes - `placeholders` map |
| Other cities | `{city_1}` ... `{city_10}` | **No** - renders as a visible TODO |
| Localities | `{locality_1}` ... `{locality_4}` | **No** - renders as a visible TODO |
| People | `{person_1}` ... `{person_12}` | **No** - renders as a visible TODO |
| Third-party firms | `{company_1}` ... `{company_27}` | **No** - renders as a visible TODO |

Unfilled tokens intentionally render literally (e.g. `{person_1}`) so they are impossible to miss before launch. To resolve one, add an entry to `placeholders` in `src/config/site.ts`:

```ts
export const placeholders: Record<string, string> = {
  // ...
  person_1: 'Rama Shetty',      // founding partner
  person_2: 'Ankith Rao',       // partner
  company_7: 'a Big Four firm', // or the real name, if citing is intended
};
```

The full **page x placeholder matrix** (every token, its count per page, and fill status) lives in [`placeholder-checklist.md`](../placeholder-checklist.md) at the repo root. Regenerate it after editing content:

```bash
node scripts/generate-checklist.mjs
```

### Colors

Brand palette is defined once as Tailwind v4 theme tokens in `src/styles/global.css` (`--color-brand-50` ... `--color-brand-950`, `--color-accent-*`). Components reference them as `text-brand-700`, `bg-brand-600`, etc. Change the hex values and the whole site re-themes.

## Adding a city

Add one entry to `cities` in `src/config/site.ts` and rebuild:

```ts
export const cities = [
  { slug: 'bangalore', name: 'Bangalore', state: 'Karnataka' },
  { slug: 'mumbai', name: 'Mumbai', state: 'Maharashtra' },
];
```

All 10 city service pages plus `/ca-firm-in-mumbai` are generated automatically. Markdown uses `{city}` for display text (resolves to `name`) and the same token in link targets (resolves to `slug`).

## Editing / adding pages

Each `src/data/pages/*.md` has this frontmatter (parsed with gray-matter):

```yaml
---
slug: /gst-registration          # route (may contain {city} for city templates)
cluster: GST
pageName: GST Registration
pageType: Service                # Service | Service Hub | Guide | Location Service | ...
intent: Commercial
priority: P0
primaryKeyword: "gst registration services bangalore"
secondaryKeywords: ["...", "..."]
title: "..."                     # <title> tag
description: "..."               # meta description
h1: "..."                        # the single H1 rendered above the body
links: [{ slug: "/gst-services", anchor: "All GST Hub Services", rel: "hub" }]
faqs: [{ q: "...", a: "..." }]   # rendered into FAQPage JSON-LD
isCityTemplate: true             # only on {city} pages
---

> Citable definition paragraph.

## Section heading

Body content...
```

Drop a new `.md` file in `src/data/pages/` with valid frontmatter and it becomes a route on the next build - no route registration needed. Keep exactly one `h1` in frontmatter and start the body with the definition blockquote.

**Tokens usable anywhere in content:** `{brand}`, `{city}`, `{state}`, `{country}`, `{contact_email}`, `{contact_phone}`, `{office_address}` and the full set listed in the placeholder table above (see `placeholder-checklist.md` for the complete page x placeholder matrix).

## SEO features (per page)

- Unique title, meta description, canonical URL, Open Graph + Twitter cards
- JSON-LD: `WebPage`/`Article`, `BreadcrumbList`, and `FAQPage` (from frontmatter `faqs`)
- `@astrojs/sitemap` generates `sitemap-index.xml` at build
- Internal links from markdown are validated by `node verify.mjs` after build

## Deploy

`.github/workflows/deploy.yml` builds and deploys to GitHub Pages on push to `main`.

1. Set `site.url` in `src/config/site.ts` (and `SITE_URL` in `astro.config.mjs`) to the final URL, e.g. `https://<user>.github.io/<repo>`.
2. In GitHub repo settings, set Pages source to "GitHub Actions".
3. Push to `main`.
