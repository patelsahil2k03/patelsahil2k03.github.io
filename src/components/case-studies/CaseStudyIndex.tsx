'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { caseStudies, caseStudyFilters, type CaseStudyType } from '@/data/caseStudies';
import { cn } from '@/lib/utils';
import { CaseStudyRow } from './CaseStudyRow';
import { indexOrder } from '@/lib/caseStudyUtils';
import { NotesSection } from '@/components/home/NotesSection';
import { indexNoteOrder } from '@/lib/notes';

/** Every case study, newest first, with a type filter. */
export function CaseStudyIndex() {
  const [filter, setFilter] = useState<CaseStudyType | 'all'>('all');
  const sorted = [...caseStudies].sort(indexOrder);
  const filtered = filter === 'all' ? sorted : sorted.filter((cs) => cs.type === filter);

  return (
    <div className="pb-24 pt-12 lg:pt-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        <Link href="/" className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-sm text-ev-muted hover:text-ev-accent">
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
          Back to portfolio
        </Link>

        <header className="mt-6 max-w-[62ch]">
          <h1 className="ev-display text-[2.5rem] font-bold leading-[1.02] text-ev-ink sm:text-[3.25rem]">Case studies</h1>
          <p className="ev-prose mt-4 font-serif text-lg leading-relaxed text-ev-ink2">
            Engineering notes from production systems, hackathons and research: the problem, what was learned, and what I
            built. The figures that make the case are footnoted to their source.
          </p>
        </header>

        <div role="group" aria-label="Filter by type" className="mt-10 flex flex-wrap gap-2 border-b border-ev-rule pb-6">
          {caseStudyFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                'min-h-[44px] border px-4 font-sans text-sm font-semibold transition-colors',
                filter === item.id ? 'border-ev-ink bg-ev-ink text-ev-paper' : 'border-ev-rule text-ev-ink hover:border-ev-ink'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p aria-live="polite" className="pt-4 font-sans text-sm text-ev-muted">
          {filtered.length} {filtered.length === 1 ? 'case study' : 'case studies'}
        </p>

        {filtered.length > 0 ? (
          <ul className="divide-y divide-ev-rule border-b border-ev-rule">
            {filtered.map((study) => (
              <CaseStudyRow key={study.id} study={study} level={2} />
            ))}
          </ul>
        ) : (
          <p className="py-16 font-serif text-lg text-ev-ink2">
            No case studies of this type yet.{' '}
            <button type="button" className="ev-link font-sans font-semibold" onClick={() => setFilter('all')}>
              Show all
            </button>
          </p>
        )}
        <NotesSection order={indexNoteOrder} inset={false} />
      </div>
    </div>
  );
}
