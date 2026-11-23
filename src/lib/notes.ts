import { claims, claimAliases } from '@/data/claims';
import { caseStudies, homepageFeaturedCaseStudies, type CaseStudy } from '@/data/caseStudies';
import { indexOrder } from '@/lib/caseStudyUtils';
import { projects } from '@/data/projects';
import { experiences, education, personalInfo } from '@/data';
import { achievements } from '@/data/achievements';

/** Research-section text (papers and recognition), which renders after Experience. */
const achievementsForNotes = achievements.flatMap((a) => [a.metrics ?? '', a.description]);

/** Figures that can be found safely inside running text: they carry a +, % or thousands comma (never a bare small number). */
const textKeys = [...Object.keys(claims), ...Object.keys(claimAliases)]
  .filter((k) => (/[+%,]/.test(k) || /^\d{3,}$/.test(k)) && k.length >= 3 && !k.includes(' '))
  .sort((a, b) => b.length - a.length);
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const textPattern = new RegExp(`(?<![\\w.,])(${textKeys.map(escape).join('|')})(?![\\w+%])`, 'g');

/** The note key a figure in text refers to (resolving aliases), or undefined. */
function claimKey(value: string): string | undefined {
  const key = claimAliases[value] ?? value;
  return claims[key] ? key : undefined;
}

/** Split running text into plain parts and footnotable figures. */
export function splitFigures(text: string): { text: string; figure: boolean }[] {
  const parts: { text: string; figure: boolean }[] = [];
  let last = 0;
  for (const m of text.matchAll(textPattern)) {
    if (m.index! > last) parts.push({ text: text.slice(last, m.index), figure: false });
    parts.push({ text: m[0], figure: true });
    last = m.index! + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), figure: false });
  return parts;
}

/** One thing a page renders, in reading order: running text (its figures are found) or a single metric value. */
type Item = { text: string } | { value: string };

/** Note keys for a page, in the order the reader meets them. A figure gets a number only when claims.ts has a note for it. */
export function noteOrder(items: Item[]): string[] {
  const seen: string[] = [];
  const add = (value: string) => {
    const key = claimKey(value);
    if (key && !seen.includes(key)) seen.push(key);
  };
  for (const item of items) {
    if ('value' in item) add(item.value);
    else splitFigures(item.text).forEach((p) => p.figure && add(p.text));
  }
  return seen;
}

const caseStudyItems = (cs: CaseStudy): Item[] => [{ text: cs.hook }, ...cs.metrics.map((m) => ({ value: m.value }))];

/**
 * Footnote numbers for the homepage, in reading order: selected work (each study's hook, then its results), the list of
 * more case studies, experience, research, projects (description, then results), about.
 */
export const homeNoteOrder: string[] = (() => {
  const featured = new Set(homepageFeaturedCaseStudies.map((cs) => cs.id));
  return noteOrder([
    ...homepageFeaturedCaseStudies.flatMap(caseStudyItems),
    ...caseStudies.filter((cs) => !featured.has(cs.id)).map((cs) => ({ text: cs.hook })),
    ...experiences.flatMap((e) => e.description.map((text) => ({ text }))),
    ...achievementsForNotes.map((text) => ({ text })),
    ...projects.flatMap((p) => [{ text: p.description }, ...(p.metrics ?? []).map((m) => ({ value: m.value }))]),
    ...personalInfo.bio.map((text) => ({ text })),
    { value: education.cgpa },
  ]);
})();

/** Footnote numbers for /case-studies/: each study's hook, then its results, in the index's default order. */
export const indexNoteOrder: string[] = noteOrder([...caseStudies].sort(indexOrder).flatMap(caseStudyItems));

/** Footnote numbers for one article: lede, results, the sections, then the related studies listed under it. */
export function articleNoteOrder(study: CaseStudy, sections: { content: string }[], related: CaseStudy[]): string[] {
  return noteOrder([
    { text: study.hook },
    ...study.metrics.map((m) => ({ value: m.value })),
    ...sections.map((s) => ({ text: s.content })),
    ...related.flatMap(caseStudyItems),
  ]);
}

export function noteNumber(value: string, order: string[] = homeNoteOrder): number | undefined {
  const key = claimKey(value);
  const i = key ? order.indexOf(key) : -1;
  return i < 0 ? undefined : i + 1;
}
