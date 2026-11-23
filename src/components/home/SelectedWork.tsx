import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { caseStudies, homepageFeaturedCaseStudies, caseStudyTypeLabels } from '@/data';
import type { CaseStudy } from '@/data/caseStudies';
import { noteNumber } from '@/lib/notes';
import { CitedText } from '@/components/evidence/CitedText';
import { MetricList } from '@/components/evidence/MetricList';
import { SystemFigure } from '@/components/evidence/SystemFigure';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';

/** Results of a study not already stated in its hook ('-40%' counts as stated when the hook says '40%'). */
const newResults = (cs: CaseStudy) => cs.metrics.filter((m) => !cs.hook.includes(m.value.replace(/^-/, '')));

/** The proof: four production systems as figures with role and scale, then every other case study in one list. */
export function SelectedWork() {
  const featuredIds = new Set(homepageFeaturedCaseStudies.map((cs) => cs.id));
  const more = caseStudies.filter((cs) => !featuredIds.has(cs.id));

  return (
    <section id="case-studies" aria-labelledby="case-studies-title" className="py-20 sm:py-28">
      <div className={column}>
        <SectionHeading
          id="case-studies"
          title="Selected work"
          lede="Four production systems. Each figure is the real pipeline, and each number links to a note on where it comes from."
        />

        <div className="space-y-20 sm:space-y-28">
          {homepageFeaturedCaseStudies.map((cs, i) => (
            <article key={cs.id} aria-labelledby={`cs-${cs.id}`} className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-sans text-sm text-ev-muted">
                  {cs.industry} · {cs.period}
                </p>
                <h3 id={`cs-${cs.id}`} className="ev-display mt-2 text-2xl font-bold leading-tight text-ev-ink sm:text-[2rem]">
                  {cs.title}
                </h3>
                {cs.role && <p className="mt-3 font-sans text-base font-semibold text-ev-ink">{cs.role}</p>}
                <p className="ev-prose mt-3 max-w-[60ch] font-serif text-lg leading-relaxed text-ev-ink2">
                  <CitedText text={cs.hook} />
                </p>
                {/* The results row adds only what the line above does not already say (no figure shown twice). */}
                {newResults(cs).length > 0 && (
                  <MetricList
                    className="mt-6 border-t border-ev-rule pt-5"
                    items={newResults(cs).map((m) => ({ ...m, n: noteNumber(m.value) }))}
                  />
                )}
                <p className="mt-5 font-mono text-xs leading-relaxed text-ev-muted">{cs.technologies.join(' · ')}</p>
                <Link
                  href={`/case-studies/${cs.id}/`}
                  className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-sans text-base font-semibold text-ev-accent hover:underline underline-offset-4"
                >
                  Read the case study
                  <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
                </Link>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                {cs.figure && <SystemFigure figure={cs.figure} number={i + 1} />}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 border-t border-ev-rule pt-10">
          <h3 className="ev-display text-xl font-bold text-ev-ink">More case studies</h3>
          <ul className="mt-6 divide-y divide-ev-rule">
            {more.map((cs) => (
              <li key={cs.id} className="grid gap-1 py-5 sm:grid-cols-12 sm:gap-6">
                <span className="font-sans text-sm text-ev-muted sm:col-span-3">
                  {caseStudyTypeLabels[cs.type]} · {cs.industry}
                </span>
                <span className="sm:col-span-9">
                  <Link href={`/case-studies/${cs.id}/`} className="font-sans text-lg font-semibold text-ev-ink hover:text-ev-accent">
                    {cs.title}
                  </Link>
                  <span className="mt-1 block font-serif text-base leading-relaxed text-ev-ink2">
                    <CitedText text={cs.hook} />
                  </span>
                </span>
              </li>
            ))}
          </ul>
          <Link
            href="/case-studies/"
            className="group mt-6 inline-flex min-h-[44px] items-center gap-1.5 font-sans text-base font-semibold text-ev-accent hover:underline underline-offset-4"
          >
            All case studies, with filters
            <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
