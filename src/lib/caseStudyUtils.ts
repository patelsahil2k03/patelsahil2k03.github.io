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

  const stack: ArticleSection = {
    title: 'Technical approach',
    content: `Stack and tooling for this work: ${study.technologies.join(', ')}. Topics covered: ${study.topics.join(', ')}.`,
  };

  return [...core, ...(study.articleSections ?? []), stack];
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

export function getTypeVariant(
  type: CaseStudyType
): 'default' | 'secondary' | 'success' | 'cyan' {
  const map: Record<CaseStudyType, 'default' | 'secondary' | 'success' | 'cyan'> = {
    production: 'default',
    poc: 'cyan',
    research: 'success',
    'deep-dive': 'secondary',
    build: 'secondary',
  };
  return map[type] ?? 'default';
}

export function formatPublishedDate(isoDate?: string): string {
  if (!isoDate) return '';
  return new Date(isoDate).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
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
