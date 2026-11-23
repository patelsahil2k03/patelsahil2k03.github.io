import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { personalInfo } from '@/data';
import { articleNoteOrder, noteNumber } from '@/lib/notes';
import { CitedText } from '@/components/evidence/CitedText';

import { claims, claimStatusTag } from '@/data/claims';
import { Cite } from '@/components/evidence/Cite';
import { SystemFigure } from '@/components/evidence/SystemFigure';
import { CaseStudyDiagram } from './CaseStudyDiagram';
import { CaseStudyRow } from './CaseStudyRow';
import { CaseStudyViewTracker } from './CaseStudyViewTracker';
import { CaseStudyTableOfContents } from './CaseStudyTableOfContents';
import { CaseStudyPrevNext } from './CaseStudyPrevNext';
import {
  caseStudyTypeLabels,
  formatPublishedDate,
  getAdjacentCaseStudies,
  getArticleSections,
  getRelatedCaseStudies,
  slugToSectionId,
} from '@/lib/caseStudyUtils';

/** A case study read like a short paper: claim, figure, footnoted results, sections, notes. */
export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const sections = getArticleSections(study);
  const { prev, next } = getAdjacentCaseStudies(study.id);
  const related = getRelatedCaseStudies(study, 6)
    .filter((cs) => cs.id !== prev?.id && cs.id !== next?.id)
    .slice(0, 3);
  const notes = articleNoteOrder(study, sections, related);
  const noteN = (v: string) => noteNumber(v, notes);
  // Results rows hold counted or measured values; word values (stack, venue, status) read as one line under them.
  const figureMetrics = study.metrics.filter((m) => /\d/.test(m.value));
  const factMetrics = study.metrics.filter((m) => !/\d/.test(m.value));

  return (
    <article className="pb-24 pt-12 lg:pt-16">
      <CaseStudyViewTracker slug={study.id} />

      <div className="mx-auto max-w-[760px] px-5 sm:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-sans text-sm text-ev-muted">
          <Link href="/case-studies/" className="inline-flex min-h-[44px] items-center gap-1.5 hover:text-ev-accent">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Case studies
          </Link>
          <span aria-hidden>/</span>
          <span className="truncate text-ev-ink2">{study.title}</span>
        </nav>

        <header className="mt-8 border-b border-ev-rule pb-10">
          <p className="font-sans text-sm text-ev-muted">
            {caseStudyTypeLabels[study.type]}, {study.industry}
          </p>
          <h1 className="ev-display mt-3 text-[2.5rem] font-bold leading-[1.02] text-ev-ink sm:text-[3.25rem]">{study.title}</h1>
          {study.role && <p className="mt-4 font-sans text-base font-semibold text-ev-ink">{study.role}</p>}
          <p className="ev-prose mt-4 font-serif text-xl leading-relaxed text-ev-ink2">
            <CitedText text={study.hook} order={notes} />
          </p>
          <p className="mt-6 font-sans text-sm text-ev-muted">
            {study.company}
            {study.period ? `, ${study.period}` : ''}
            {study.publishedAt ? ` · ${formatPublishedDate(study.publishedAt)}` : ''} · {study.readTime} read
          </p>
          {(study.github || study.paper) && (
            <p className="mt-4 flex flex-wrap gap-x-6 font-sans text-base font-semibold">
              {study.github && (
                <a href={study.github} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-1 text-ev-accent hover:underline underline-offset-4">
                  View code
                  <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
                </a>
              )}
              {study.paper && (
                <a href={study.paper} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-1 text-ev-accent hover:underline underline-offset-4">
                  Read paper
                  <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
                </a>
              )}
            </p>
          )}
        </header>

        {study.figure && (
          <div className="mt-10">
            <SystemFigure figure={study.figure} number={1} />
          </div>
        )}

        {study.metrics.length > 0 && (
          <section aria-labelledby="results-heading" className="mt-10">
            <h2 id="results-heading" className="font-sans text-base font-semibold text-ev-ink">
              {figureMetrics.length > 0 ? 'Results at a glance' : 'At a glance'}
            </h2>
            {figureMetrics.length > 0 && (
            <dl className="mt-4 grid grid-cols-1 gap-x-8 gap-y-5 border-y border-ev-rule py-6 sm:grid-cols-3">
              {figureMetrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="font-sans text-xs text-ev-muted">{metric.label}</dt>
                  <dd className="mt-1 text-lg font-semibold text-ev-ink">
                    <Cite value={metric.value} n={noteN(metric.value)} />
                  </dd>
                </div>
              ))}
            </dl>
            )}
            {factMetrics.length > 0 && (
              <p className="mt-4 font-sans text-sm text-ev-muted">
                {factMetrics.map((m, i) => (
                  <span key={m.label}>
                    {i > 0 && ' · '}
                    {m.label}: <span className="text-ev-ink2">{m.value}</span>
                  </span>
                ))}
              </p>
            )}
          </section>
        )}

        <CaseStudyTableOfContents
          sections={sections}
          extra={study.architectureDiagram ? [{ id: 'architecture', title: 'System architecture (Figure 2)' }] : []}
        />

        {study.architectureDiagram && (
          <section id="architecture" className="mt-12 scroll-mt-24" aria-labelledby="architecture-diagram-heading">
            <h2 id="architecture-diagram-heading" className="ev-display text-2xl font-bold text-ev-ink">
              System architecture
            </h2>
            <figure>
              <CaseStudyDiagram definition={study.architectureDiagram} description={study.architectureCaption} />
              <figcaption className="mt-4 max-w-[62ch] font-serif text-sm leading-relaxed text-ev-ink2">
                <span className="font-sans font-semibold text-ev-ink">Figure {study.figure ? 2 : 1}.</span>{' '}
                {study.architectureCaption ?? 'The full system architecture.'}
              </figcaption>
            </figure>
          </section>
        )}

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.title} id={slugToSectionId(section.title)} className="scroll-mt-24">
              <h2 className="ev-display text-2xl font-bold text-ev-ink">{section.title}</h2>
              <p className="ev-prose mt-4 font-serif text-[1.125rem] leading-[1.75] text-ev-ink2">
                <CitedText text={section.content} order={notes} />
              </p>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-ev-rule pt-6 font-sans text-sm text-ev-muted">
          Stack: <span className="text-ev-ink2">{study.technologies.join(', ')}</span>
          {study.topics.some((t) => !study.technologies.includes(t)) && (
            <span className="mt-1 block">
              Topics:{' '}
              <span className="text-ev-ink2">{study.topics.filter((t) => !study.technologies.includes(t)).join(', ')}</span>
            </span>
          )}
        </p>

        {notes.length > 0 && (
          <section aria-labelledby="article-notes" className="mt-10">
            <h2 id="article-notes" className="font-sans text-base font-semibold text-ev-ink">
              Notes
            </h2>
            <p className="mt-1 font-serif text-sm text-ev-muted">
              verified: checked against a primary source · project records: from my own records, no independent measurement yet ·
              published paper: from the publication
            </p>
            <ol className="mt-3 space-y-3 font-serif text-sm leading-relaxed text-ev-ink2">
              {notes.map((v, i) => (
                <li key={v} id={`note-${i + 1}`} tabIndex={-1} className="grid scroll-mt-24 grid-cols-[2rem_1fr]">
                  <span className="ev-num text-ev-accent">{i + 1}</span>
                  <span>
                    <span className="ev-num font-semibold text-ev-ink">{v}</span>: {claims[v].counts} {claims[v].source}{' '}
                    <span className="font-sans text-xs text-ev-muted">({claimStatusTag[claims[v].status]})</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section aria-labelledby="article-contact" className="mt-12 border-t border-ev-rule pt-8">
          <h2 id="article-contact" className="ev-display text-2xl font-bold text-ev-ink">
            Questions about this system?
          </h2>
          <p className="mt-3 font-serif text-lg text-ev-ink2">
            Email is the fastest way to reach me:{' '}
            <a href={`mailto:${personalInfo.email}`} className="ev-link font-sans font-semibold">
              {personalInfo.email}
            </a>
          </p>
        </section>

        <CaseStudyPrevNext prev={prev} next={next} />
      </div>

      {related.length > 0 && (
        <div className="mx-auto mt-20 max-w-[1200px] border-t border-ev-rule px-5 pt-12 sm:px-8 lg:px-12">
          <h2 className="ev-display text-2xl font-bold text-ev-ink">Related case studies</h2>
          <ul className="mt-6 divide-y divide-ev-rule border-b border-ev-rule">
            {related.map((item) => (
              <CaseStudyRow key={item.id} study={item} order={notes} />
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
