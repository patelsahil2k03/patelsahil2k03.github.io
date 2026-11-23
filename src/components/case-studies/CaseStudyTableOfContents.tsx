import type { ArticleSection } from '@/lib/caseStudyUtils';
import { slugToSectionId } from '@/lib/caseStudyUtils';

export function CaseStudyTableOfContents({
  sections,
  extra = [],
}: {
  sections: ArticleSection[];
  extra?: { id: string; title: string }[];
}) {
  return (
    <nav aria-labelledby="toc-heading" className="mt-10">
      <h2 id="toc-heading" className="font-sans text-base font-semibold text-ev-ink">
        On this page
      </h2>
      <ol className="mt-2 list-decimal pl-5 font-sans text-sm text-ev-ink2 marker:text-ev-muted">
        {[...extra, ...sections.map((s) => ({ id: slugToSectionId(s.title), title: s.title }))].map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="inline-flex min-h-[32px] items-center hover:text-ev-accent hover:underline underline-offset-4">
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
