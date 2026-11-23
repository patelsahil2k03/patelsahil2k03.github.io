import Link from 'next/link';
import type { CaseStudy } from '@/data/caseStudies';
import { caseStudyTypeLabels, formatPublishedDate } from '@/lib/caseStudyUtils';
import { indexNoteOrder, noteNumber } from '@/lib/notes';
import { Cite } from '@/components/evidence/Cite';
import { CitedText } from '@/components/evidence/CitedText';

/** One case study as an index row: kind and date, title, hook, its results and topics. Replaces the card grid. */
/** `order` is the note order of the page the row sits on (the index, or the article listing it as related). */
export function CaseStudyRow({ study, level = 3, order = indexNoteOrder }: { study: CaseStudy; level?: 2 | 3; order?: string[] }) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <li className="grid gap-2 py-8 lg:grid-cols-12 lg:gap-12">
      <p className="font-sans text-sm text-ev-muted lg:col-span-3 lg:pt-1">
        {caseStudyTypeLabels[study.type]} · {study.industry}
        <span className="mt-1 block ev-num">
          {study.publishedAt ? formatPublishedDate(study.publishedAt) : ''} · {study.readTime}
        </span>
      </p>
      <div className="lg:col-span-9">
        <Heading className="ev-display text-xl font-bold leading-snug text-ev-ink sm:text-2xl">
          <Link href={`/case-studies/${study.id}/`} className="inline-block py-1 hover:text-ev-accent">
            {study.title}
          </Link>
        </Heading>
        <p className="mt-1 font-sans text-sm text-ev-muted">
          {study.company}
          {study.period ? `, ${study.period}` : ''}
        </p>
        <p className="ev-prose mt-3 max-w-[68ch] font-serif text-base leading-relaxed text-ev-ink2">
          <CitedText text={study.hook} order={order} />
        </p>
        {study.metrics.length > 0 && (
          <p className="mt-3 font-sans text-sm text-ev-ink2">
            {study.metrics.map((m, i) => (
              <span key={m.label}>
                {i > 0 && <span className="text-ev-muted">; </span>}
                {m.label}{' '}
                <span className="font-semibold text-ev-ink">
                  <Cite value={m.value} n={noteNumber(m.value, order)} />
                </span>
              </span>
            ))}
          </p>
        )}
        <p className="mt-2 font-mono text-xs text-ev-muted">{study.topics.join(' · ')}</p>
      </div>
    </li>
  );
}
