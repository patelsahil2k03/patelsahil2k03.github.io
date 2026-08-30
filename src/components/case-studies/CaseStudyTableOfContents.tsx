'use client';

import type { ArticleSection } from '@/lib/caseStudyUtils';
import { slugToSectionId } from '@/lib/caseStudyUtils';

export function CaseStudyTableOfContents({ sections }: { sections: ArticleSection[] }) {
  return (
    <nav
      aria-label="Table of contents"
      className="mb-10 p-5 rounded-xl border border-slate-200 bg-slate-50/80"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">
        On this page
      </p>
      <ol className="space-y-2">
        {sections.map((section) => {
          const id = slugToSectionId(section.title);
          return (
            <li key={section.title}>
              <a
                href={`#${id}`}
                className="text-sm text-slate-700 hover:text-signal-blue transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-blue rounded"
              >
                {section.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
