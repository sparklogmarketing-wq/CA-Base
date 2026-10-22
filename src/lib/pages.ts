import matter from 'gray-matter';

export interface PageLink {
  slug: string;
  anchor: string;
  rel: string;
}

export interface PageFaq {
  q: string;
  a: string;
}

export interface PageFrontmatter {
  slug: string;
  cluster: string;
  pageName: string;
  pageType: string;
  intent: string;
  priority: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  title: string;
  description: string;
  h1: string;
  links: PageLink[];
  faqs: PageFaq[];
  isCityTemplate?: boolean;
}

export interface Page {
  fm: PageFrontmatter;
  content: string;
}

const files = import.meta.glob('../data/pages/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export const pages: Page[] = Object.entries(files).map(([path, raw]) => {
  const { data, content } = matter(raw);
  return { fm: data as PageFrontmatter, content };
});

/** Replace {token} occurrences with values from the vars map. */
export function fill(str: string, vars: Record<string, string>): string {
  return str.replace(/\{(\w+)\}/g, (match, key: string) => vars[key] ?? match);
}

/**
 * Resolve a page for one route instance.
 * displayVars fill prose (e.g. {city} -> "Bangalore");
 * slugVars fill URLs and route slugs (e.g. {city} -> "bangalore").
 */
export function fillPage(page: Page, displayVars: Record<string, string>, slugVars: Record<string, string>): Page {
  const hrefVars = { ...displayVars };
  for (const [k, v] of Object.entries(slugVars)) hrefVars[k] = v;
  return {
    fm: {
      ...page.fm,
      slug: fill(page.fm.slug, hrefVars),
      title: fill(page.fm.title, displayVars),
      description: fill(page.fm.description, displayVars),
      h1: fill(page.fm.h1, displayVars),
      primaryKeyword: fill(page.fm.primaryKeyword, displayVars),
      links: page.fm.links.map((l) => ({ ...l, slug: fill(l.slug, hrefVars), anchor: fill(l.anchor, displayVars) })),
      faqs: page.fm.faqs.map((f) => ({ q: fill(f.q, displayVars), a: fill(f.a, displayVars) })),
      secondaryKeywords: page.fm.secondaryKeywords.map((k) => fill(k, displayVars)),
    },
    content: fill(fillHrefs(page.content, hrefVars), displayVars),
  };
}

/** Fill tokens inside markdown link targets with URL-safe vars, leaving prose for the display pass. */
function fillHrefs(content: string, hrefVars: Record<string, string>): string {
  return content.replace(/\]\(([^)\s]*)\)/g, (m, href: string) => `](${fill(href, hrefVars)})`);
}

/** Strip {tokens} for display contexts (nav labels, breadcrumbs). */
export function cleanLabel(str: string, vars: Record<string, string>): string {
  return fill(str, vars)
    .replace(/\{[^}]+\}/g, '')
    .replace(/\s+-\s+$/, '')
    .replace(/\s+in\s+$/, '')
    .replace(/\s+/g, ' ')
    .trim();
}
