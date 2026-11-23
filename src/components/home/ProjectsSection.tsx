import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';
import { projects, projectCategories, personalInfo, type Project } from '@/data';
import { getCaseStudiesForProject } from '@/lib/caseStudyUtils';
import { noteNumber } from '@/lib/notes';
import { CitedText } from '@/components/evidence/CitedText';
import { MetricList } from '@/components/evidence/MetricList';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';

const categoryLabel = Object.fromEntries(projectCategories.map((c) => [c.id, c.label]));

/** One project as a record: category, title, summary, two results, stack, and the rest one click away. */
function ProjectRecord({ p }: { p: Project }) {
  const studies = getCaseStudiesForProject(p.id);
  const links = [
    p.github && { href: p.github, label: 'Code' },
    p.paper && { href: p.paper, label: 'Paper' },
    p.demo && { href: p.demo, label: 'Demo' },
  ].filter(Boolean) as { href: string; label: string }[];
  return (
    <li className="grid gap-4 py-9 lg:grid-cols-12 lg:gap-12">
      <p className="font-sans text-sm text-ev-muted lg:col-span-3 lg:pt-1.5">{categoryLabel[p.category] ?? p.category}</p>
      <div className="lg:col-span-9">
        <h3 className="ev-display text-xl font-bold text-ev-ink sm:text-2xl">{p.title}</h3>
        <p className="ev-prose mt-3 max-w-[66ch] font-serif text-base leading-relaxed text-ev-ink2">
          <CitedText text={p.description} />
        </p>
        {p.metrics && p.metrics.length > 0 && (
          <MetricList
            className="mt-5"
            items={p.metrics.slice(0, 2).map((m) => ({ ...m, n: noteNumber(m.value) }))}
          />
        )}
        <p className="mt-5 max-w-[70ch] font-mono text-xs leading-relaxed text-ev-muted">{p.technologies.join(' · ')}</p>
        {(p.longDescription || (p.metrics && p.metrics.length > 2)) && (
          <details className="group mt-3 max-w-[70ch]">
            <summary className="inline-flex min-h-[44px] cursor-pointer list-none items-center gap-1.5 font-sans text-sm font-semibold text-ev-accent">
              <Plus aria-hidden strokeWidth={1.75} className="h-4 w-4 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
              More detail
            </summary>
            {p.metrics && p.metrics.length > 2 && (
              <MetricList
                className="mb-4"
                items={p.metrics.slice(2).map((m) => ({ ...m, n: noteNumber(m.value) }))}
              />
            )}
            {p.longDescription && (
              <p className="ev-prose pb-2 font-serif text-base leading-relaxed text-ev-ink2">{p.longDescription}</p>
            )}
          </details>
        )}
        {(links.length > 0 || studies.length > 0) && (
          <p className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm font-semibold">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-1 text-ev-accent hover:underline underline-offset-4"
              >
                {l.label}
                <ArrowUpRight className="ev-arrow h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              </a>
            ))}
            {studies.map((cs) => (
              <Link
                key={cs.id}
                href={`/case-studies/${cs.id}/`}
                className="inline-flex min-h-[44px] items-center text-ev-accent hover:underline underline-offset-4"
              >
                Case study: {cs.title}
              </Link>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}

// Projects that already have a full case study are folded so the page does not repeat Selected work; all detail is kept.
const standalone = projects.filter((p) => getCaseStudiesForProject(p.id).length === 0);
const writtenUp = projects.filter((p) => getCaseStudiesForProject(p.id).length > 0);

/** Smaller builds and research code: every project with its full detail one click away. */
export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="border-t border-ev-rule py-20 sm:py-28">
      <div className={column}>
        <SectionHeading
id="projects"
title="Projects and research builds"
lede="University research, hackathon builds and side projects. The production work is in Selected work."
        />
        <ul className="divide-y divide-ev-rule border-y border-ev-rule">
          {standalone.map((p) => (
            <ProjectRecord key={p.id} p={p} />
          ))}
        </ul>
        {writtenUp.length > 0 && (
          <details className="group border-b border-ev-rule">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between font-sans text-base font-semibold text-ev-ink">
              <span>
                Also written up as case studies <span className="ev-num font-normal text-ev-muted">({writtenUp.length})</span>
              </span>
              <Plus aria-hidden strokeWidth={1.75} className="h-5 w-5 text-ev-accent transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] group-open:rotate-45" />
            </summary>
            <ul className="divide-y divide-ev-rule border-t border-ev-rule">
              {writtenUp.map((p) => (
                <ProjectRecord key={p.id} p={p} />
              ))}
            </ul>
          </details>
        )}
        <a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 inline-flex min-h-[44px] items-center gap-1.5 font-sans text-base font-semibold text-ev-accent hover:underline underline-offset-4"
        >
          All repositories on GitHub
          <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
        </a>
      </div>
    </section>
  );
}
