import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';

export function CaseStudyPrevNext({ prev, next }: { prev: CaseStudy | null; next: CaseStudy | null }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="Case study navigation" className="mt-14 grid grid-cols-1 gap-6 border-t border-ev-rule pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={`/case-studies/${prev.id}/`} className="group block">
          <span className="inline-flex items-center gap-1.5 font-sans text-sm text-ev-muted">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Previous
          </span>
          <span className="mt-1 block font-sans text-base font-semibold text-ev-ink group-hover:text-ev-accent">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link href={`/case-studies/${next.id}/`} className="group block text-right sm:col-start-2">
          <span className="inline-flex items-center gap-1.5 font-sans text-sm text-ev-muted">
            Next
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          </span>
          <span className="mt-1 block font-sans text-base font-semibold text-ev-ink group-hover:text-ev-accent">{next.title}</span>
        </Link>
      ) : null}
    </nav>
  );
}
