import Link from 'next/link';
import { Plus } from 'lucide-react';
import { experiences, type Experience } from '@/data';
import { getCaseStudiesForExperience } from '@/lib/caseStudyUtils';
import { CitedText } from '@/components/evidence/CitedText';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';

const SHOWN_BULLETS = 3;
const CURRENT_ROLES = 2;

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="ev-prose mt-5 max-w-[66ch] list-disc space-y-2 pl-5 font-serif text-base leading-relaxed text-ev-ink2 marker:text-ev-accent">
      {items.map((d) => (
        <li key={d}>
          <CitedText text={d} />
        </li>
      ))}
    </ul>
  );
}

function Role({ exp }: { exp: Experience }) {
  const studies = getCaseStudiesForExperience(exp.id);
  const shown = exp.description.slice(0, SHOWN_BULLETS);
  const rest = exp.description.slice(SHOWN_BULLETS);
  return (
    <li className="grid gap-3 py-9 lg:grid-cols-12 lg:gap-12">
      <div className="relative lg:col-span-3 lg:pt-1.5 lg:pl-6">
        {/* The rail: one hairline through every role, a dot per role, accent for the roles still running. */}
        <span aria-hidden className="absolute -bottom-9 -top-9 left-[3px] hidden w-px bg-ev-rule lg:block" />
        <span
          aria-hidden
          className={`absolute left-0 top-[0.7rem] hidden h-[7px] w-[7px] rounded-full lg:block ${
            exp.endDate === 'Present' ? 'bg-ev-accent' : 'border border-ev-muted bg-ev-paper'
          }`}
        />
        <p className="ev-num text-sm text-ev-muted">{exp.duration}</p>
      </div>
      <div className="lg:col-span-9">
        <h3 className="ev-display text-xl font-bold text-ev-ink sm:text-2xl">{exp.role}</h3>
        <p className="mt-1 max-w-[66ch] font-sans text-base text-ev-ink2">
          {exp.company}, {exp.location}
        </p>
        <Bullets items={shown} />
        {rest.length > 0 && (
          <details className="group mt-2 max-w-[66ch]">
            <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 font-sans text-sm font-semibold text-ev-accent">
              <Plus aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
              {rest.length} more from this role
            </summary>
            <Bullets items={rest} />
          </details>
        )}
        <p className="mt-5 max-w-[66ch] font-mono text-xs leading-relaxed text-ev-muted">{exp.technologies.join(' · ')}</p>
        {studies.length > 0 && (
          <p className="mt-4 max-w-[66ch] font-sans text-sm text-ev-muted">
            Case studies:{' '}
            {studies.map((cs, i) => (
              <span key={cs.id}>
                {i > 0 && ', '}
                <Link href={`/case-studies/${cs.id}/`} className="ev-link">
                  {cs.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

/** Current roles open with their three strongest points; earlier internships and training folded, all content kept. */
export function ExperienceSection() {
  const current = experiences.slice(0, CURRENT_ROLES);
  const earlier = experiences.slice(CURRENT_ROLES);
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-t border-ev-rule py-20 sm:py-28">
      <div className={column}>
        <SectionHeading id="experience" title="Experience" />
        <ol className="divide-y divide-ev-rule border-y border-ev-rule">
          {current.map((exp) => (
            <Role key={exp.id} exp={exp} />
          ))}
        </ol>
        {earlier.length > 0 && (
          <details className="group border-b border-ev-rule">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-sans text-base font-semibold text-ev-ink">
              <span>
                Earlier: internships and training, {earlier[earlier.length - 1].startDate.slice(0, 4)} to{' '}
                {earlier[0].endDate.slice(0, 4)} <span className="ev-num font-normal text-ev-muted">({earlier.length})</span>
              </span>
              <Plus aria-hidden strokeWidth={1.75} className="h-5 w-5 text-ev-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
            </summary>
            <ol className="divide-y divide-ev-rule border-t border-ev-rule">
              {earlier.map((exp) => (
                <Role key={exp.id} exp={exp} />
              ))}
            </ol>
          </details>
        )}
      </div>
    </section>
  );
}
