import {
  caseStudies,
  caseStudyTypeLabels,
  type CaseStudy,
  type CaseStudyType,
} from '@/data/caseStudies';

export type { CaseStudy, CaseStudyType };

export interface ArticleSection {
  title: string;
  content: string;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === slug);
}

export function getAllCaseStudySlugs(): string[] {
  return caseStudies.map((cs) => cs.id);
}

export function getArticleSections(study: CaseStudy): ArticleSection[] {
  const core: ArticleSection[] = [
    { title: 'Problem & industry context', content: study.industryContext },
    { title: 'Insight', content: study.insight },
    { title: 'What I built', content: study.contribution },
  ];

  return [...core, ...(study.articleSections ?? [])];
}

export function getRelatedCaseStudies(study: CaseStudy, limit = 3): CaseStudy[] {
  return caseStudies
    .filter((cs) => cs.id !== study.id)
    .sort((a, b) => {
      const typeMatchA = a.type === study.type ? 0 : 1;
      const typeMatchB = b.type === study.type ? 0 : 1;
      if (typeMatchA !== typeMatchB) return typeMatchA - typeMatchB;
      return (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');
    })
    .slice(0, limit);
}

const TYPE_ORDER: Record<string, number> = { production: 0, build: 1, poc: 2, research: 3, 'deep-dive': 4 };

/** Index order: production first, then builds, proofs of concept and research; newest first within each. */
export function indexOrder(a: CaseStudy, b: CaseStudy): number {
  return (TYPE_ORDER[a.type] ?? 9) - (TYPE_ORDER[b.type] ?? 9) || (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '');
}

export function formatPublishedDate(isoDate?: string): string {
  if (!isoDate) return '';
  // Year-only values (e.g. '2025') are shown as-is rather than as a guessed month.
  if (/^\d{4}$/.test(isoDate)) return isoDate;
  // Format in UTC: a bare ISO date is UTC midnight, so a local time zone west of UTC would show the previous month
  // (and disagree with the server render).
  return new Date(isoDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function getCaseStudiesForExperience(experienceId: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.relatedExperienceId === experienceId);
}

export function getCaseStudiesForProject(projectId: string): CaseStudy[] {
  return caseStudies.filter((cs) => cs.relatedProjectId === projectId);
}

export function getSortedCaseStudies(): CaseStudy[] {
  return [...caseStudies].sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
  );
}

export function getAdjacentCaseStudies(slug: string): {
  prev: CaseStudy | null;
  next: CaseStudy | null;
} {
  const sorted = getSortedCaseStudies();
  const index = sorted.findIndex((cs) => cs.id === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export function slugToSectionId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export { caseStudyTypeLabels };
