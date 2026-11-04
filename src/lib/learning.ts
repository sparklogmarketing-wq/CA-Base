import { pages, fillPage, cleanLabel, type Page } from './pages';
import { learningPillars, placeholders, cities, type LearningPillar } from '../config/site';

/** Utility pages that intentionally belong to no learning pillar (Core cluster + standalone utilities). */
export const utilitySlugs = new Set<string>([
  '/faq',
  '/video-gallery',
  '/learn',
]);

function findPage(slug: string): Page | undefined {
  return pages.find((p) => p.fm.slug === slug);
}

/**
 * Build-time guard for the learning taxonomy. Throws on:
 *  - duplicate pillar slugs
 *  - member slugs that do not resolve to a page
 *  - a page assigned to more than one pillar
 *  - a non-utility page assigned to no pillar
 */
export function validateLearningClusters(): void {
  const seenPillarSlugs = new Set<string>();
  const assignment = new Map<string, string>();

  for (const pillar of learningPillars) {
    if (seenPillarSlugs.has(pillar.slug)) {
      throw new Error(`[learning] Duplicate pillar slug: /learn/${pillar.slug}`);
    }
    seenPillarSlugs.add(pillar.slug);

    for (const pageSlug of pillar.pageSlugs) {
      if (!findPage(pageSlug)) {
        throw new Error(
          `[learning] Pillar "/learn/${pillar.slug}" references unknown page slug: ${pageSlug}`
        );
      }
      if (assignment.has(pageSlug)) {
        throw new Error(
          `[learning] Page ${pageSlug} is clustered in both "/learn/${assignment.get(
            pageSlug
          )}" and "/learn/${pillar.slug}"; each page must appear in exactly one pillar.`
        );
      }
      assignment.set(pageSlug, pillar.slug);
    }
  }

  const unassigned = pages
    .filter((p) => !utilitySlugs.has(p.fm.slug) && p.fm.cluster !== 'Core')
    .filter((p) => !assignment.has(p.fm.slug))
    .map((p) => p.fm.slug);

  if (unassigned.length) {
    throw new Error(
      `[learning] ${unassigned.length} page(s) are not clustered into any learning pillar: ${unassigned.join(
        ', '
      )}`
    );
  }
}

/** Resolve one pillar by URL slug, or undefined. */
export function getPillarBySlug(slug: string): LearningPillar | undefined {
  return learningPillars.find((p) => p.slug === slug);
}

export interface PillarMember {
  title: string;
  description: string;
  href: string;
}

/** Resolve a pillar's member pages into display-ready cards (seed-city vars for {city} templates). */
export function getPillarMembers(
  pillar: LearningPillar,
  displayVars: Record<string, string>,
  slugVars: Record<string, string>
): PillarMember[] {
  return pillar.pageSlugs.flatMap((slug) => {
    const page = findPage(slug);
    if (!page) return [];
    const resolved = fillPage(page, displayVars, slugVars);
    return [
      {
        title: cleanLabel(resolved.fm.pageName, displayVars) || resolved.fm.pageName,
        description: resolved.fm.description,
        href: resolved.fm.slug,
      },
    ];
  });
}

/** Seed vars used for non-templated renders of {city}-templated member pages (mirrors [...slug].astro). */
export function seedVars(): { displayVars: Record<string, string>; slugVars: Record<string, string> } {
  const seed = cities[0];
  return {
    displayVars: { ...placeholders, city: seed.name },
    slugVars: {
      ...Object.fromEntries(Object.entries(placeholders).map(([k, v]) => [k, v.toLowerCase()])),
      city: seed.slug,
    },
  };
}

/** Learning hub entry point describing the taxonomy itself. */
export const learningHub = {
  slug: '/learn',
  get pillars() {
    return learningPillars;
  },
};

export const totalClusteredPages = learningPillars.reduce((n, p) => n + p.pageSlugs.length, 0);
