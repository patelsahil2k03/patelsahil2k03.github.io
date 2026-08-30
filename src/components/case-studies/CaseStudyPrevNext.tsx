import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';

export function CaseStudyPrevNext({
  prev,
  next,
}: {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}) {
  if (!prev && !next) return null;

  return (
    <nav
      className="mt-16 pt-10 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4"
      aria-label="Case study navigation"
    >
      {prev ? (
        <Link
          href={`/case-studies/${prev.id}/`}
          className="group p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-signal-blue/25 hover:bg-signal-blue/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-blue"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
            Previous
          </span>
          <span className="block text-sm font-semibold text-slate-900 group-hover:text-signal-blue transition-colors line-clamp-2">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link
          href={`/case-studies/${next.id}/`}
          className="group p-5 rounded-xl border border-slate-200 bg-slate-50/50 hover:border-signal-blue/25 hover:bg-signal-blue/10 transition-all duration-200 cursor-pointer text-right sm:col-start-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-blue"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2 justify-end w-full">
            Next
            <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </span>
          <span className="block text-sm font-semibold text-slate-900 group-hover:text-signal-blue transition-colors line-clamp-2">
            {next.title}
          </span>
        </Link>
      ) : null}
    </nav>
  );
}
