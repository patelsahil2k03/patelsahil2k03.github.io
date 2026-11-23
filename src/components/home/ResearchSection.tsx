import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { CitedText } from '@/components/evidence/CitedText';
import { achievements, achievementsByCategory, personalInfo, type Achievement } from '@/data';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';

const MONTHS = ['january','february','march','april','may','june','july','august','september','october','november','december'];
/** Sort key from 'March 2026' or '2026' (a year-only date sorts after that year's dated entries' start, before the next year). */
const dateKey = (d: string) => {
  const [a, b] = d.toLowerCase().split(' ');
  return b ? Number(b) * 100 + MONTHS.indexOf(a) + 1 : Number(a) * 100;
};
const byCategoryNewest = (category: Achievement['category']) =>
  achievements.filter((a) => a.category === category).sort((x, y) => dateKey(y.date) - dateKey(x.date));
const SHOWN_PER_GROUP = 2;

const openGroups: { category: Achievement['category']; label: string }[] = [
  { category: 'award', label: 'Awards' },
  { category: 'hackathon', label: 'Hackathons' },
];
const foldedGroups: { category: Achievement['category']; label: string }[] = [
  { category: 'certification', label: 'Certifications' },
  { category: 'event', label: 'Talks and events' },
  { category: 'badge', label: 'Badges' },
];

function Entry({ a }: { a: Achievement }) {
  return (
    <li className="grid gap-1 py-5 sm:grid-cols-12 sm:gap-6">
      <span className="ev-num text-sm text-ev-muted sm:col-span-3 sm:pt-0.5">{a.date}</span>
      <div className="sm:col-span-9">
        <p className="font-sans text-base font-semibold text-ev-ink">
          {a.link ? (
            <a href={a.link} target="_blank" rel="noopener noreferrer" className="group inline-block py-1 hover:text-ev-accent">
              {a.title}
              <ArrowUpRight className="ev-arrow ml-1 inline h-3.5 w-3.5 align-baseline" strokeWidth={1.75} aria-hidden />
            </a>
          ) : (
            a.title
          )}
        </p>
        <p className="font-sans text-sm text-ev-ink2">
          {a.organization}
          {a.metrics ? <> · <CitedText text={a.metrics} /></> : ''}
        </p>
        <p className="ev-prose mt-1.5 max-w-[68ch] font-serif text-[0.97rem] leading-relaxed text-ev-ink2"><CitedText text={a.description} /></p>
      </div>
    </li>
  );
}

/** Papers first, then recognition: the main groups open, the long tail folded but present in the page. */
export function ResearchSection() {
  const papers = achievementsByCategory.publications;
  return (
    <section id="publications" aria-labelledby="publications-title" className="border-t border-ev-rule py-20 sm:py-28">
      <div className={column}>
        <SectionHeading id="publications" title="Research and recognition" />

        <ol className="space-y-12">
          {papers.map((p) => (
            <li key={p.id} className="grid gap-2 lg:grid-cols-12 lg:gap-12">
              <p className="ev-num text-sm text-ev-muted lg:col-span-3 lg:pt-1">{p.date}</p>
              <div className="max-w-[66ch] lg:col-span-9">
              <p className="font-sans text-sm text-ev-muted">
                {p.organization}
                {p.metrics ? ` · ${p.metrics}` : ''}
              </p>
              <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ev-ink sm:text-2xl">{p.title}</h3>
              <p className="ev-prose mt-3 font-serif text-base leading-relaxed text-ev-ink2">{p.description}</p>
              <p className="mt-3 flex flex-wrap gap-x-6">
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-[44px] items-center gap-1.5 font-sans text-base font-semibold text-ev-accent hover:underline underline-offset-4"
                  >
                    Read the paper
                    <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </a>
                )}
                {p.caseStudyId && (
                  <Link
                    href={`/case-studies/${p.caseStudyId}/`}
                    className="inline-flex min-h-[44px] items-center font-sans text-base font-semibold text-ev-accent hover:underline underline-offset-4"
                  >
                    Read the case study
                  </Link>
                )}
              </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[66ch] font-serif text-base leading-relaxed text-ev-ink2">
          <span className="font-sans font-semibold text-ev-ink">Research interests:</span>{' '}
          {personalInfo.researchInterests.join(', ')}.{' '}
          <a href={personalInfo.social.googleScholar} target="_blank" rel="noopener noreferrer" className="ev-link font-sans text-sm font-semibold">
            Google Scholar profile
          </a>
        </p>

        <div id="achievements" className="mt-20 scroll-mt-24">
          <h3 className="ev-display text-xl font-bold text-ev-ink sm:text-2xl">Recognition</h3>
          {openGroups.map((g) => (
            <div key={g.category} className="mt-8">
              <h4 className="font-sans text-base font-semibold text-ev-ink">{g.label}</h4>
              <ul className="divide-y divide-ev-rule border-b border-ev-rule">
                {byCategoryNewest(g.category).slice(0, SHOWN_PER_GROUP).map((a) => (
                  <Entry key={a.id} a={a} />
                ))}
              </ul>
              {byCategoryNewest(g.category).length > SHOWN_PER_GROUP && (
                <details className="group border-b border-ev-rule">
                  <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 font-sans text-sm font-semibold text-ev-accent">
                    <Plus aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
                    {byCategoryNewest(g.category).length - SHOWN_PER_GROUP} more
                  </summary>
                  <ul className="divide-y divide-ev-rule border-t border-ev-rule">
                    {byCategoryNewest(g.category).slice(SHOWN_PER_GROUP).map((a) => (
                      <Entry key={a.id} a={a} />
                    ))}
                  </ul>
                </details>
              )}
            </div>
          ))}
          {foldedGroups.map((g) => {
            const items = byCategoryNewest(g.category);
            return (
              <details key={g.category} className="group mt-6 border-b border-ev-rule">
                <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between font-sans text-base font-semibold text-ev-ink">
                  <span>
                    {g.label} <span className="ev-num font-normal text-ev-muted">({items.length})</span>
                  </span>
                  <Plus aria-hidden strokeWidth={1.75} className="h-5 w-5 text-ev-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
                </summary>
                <ul className="divide-y divide-ev-rule">
                  {items.map((a) => (
                    <Entry key={a.id} a={a} />
                  ))}
                </ul>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
