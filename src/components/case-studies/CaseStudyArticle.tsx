import Link from 'next/link';
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  Github,
  Lightbulb,
  Target,
} from 'lucide-react';
import type { CaseStudy } from '@/data/caseStudies';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyTeaserCard } from './CaseStudyTeaserCard';
import { CaseStudyViewTracker } from './CaseStudyViewTracker';
import { CaseStudyTableOfContents } from './CaseStudyTableOfContents';
import { CaseStudyPrevNext } from './CaseStudyPrevNext';
import {
  caseStudyTypeLabels,
  formatPublishedDate,
  getAdjacentCaseStudies,
  getArticleSections,
  getRelatedCaseStudies,
  getTypeVariant,
  slugToSectionId,
} from '@/lib/caseStudyUtils';

export function CaseStudyArticle({ study }: { study: CaseStudy }) {
  const sections = getArticleSections(study);
  const related = getRelatedCaseStudies(study);
  const { prev, next } = getAdjacentCaseStudies(study.id);

  return (
    <article className="py-12 lg:py-20 bg-white">
      <CaseStudyViewTracker slug={study.id} />

      <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/case-studies/" className="hover:text-blue-600 transition-colors">
            Case Studies
          </Link>
          <span aria-hidden>/</span>
          <span className="text-slate-700 truncate">{study.title}</span>
        </nav>

        <Link
          href="/case-studies/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          All case studies
        </Link>

        <header className="mb-12 pb-10 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant={getTypeVariant(study.type)} size="sm">
              {caseStudyTypeLabels[study.type]}
            </Badge>
            <Badge variant="outline" size="sm">
              {study.industry}
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-slate-900 leading-tight tracking-tight mb-4">
            {study.title}
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed mb-6">{study.hook}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            {study.company && (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="w-4 h-4" aria-hidden />
                {study.company}
                {study.period ? ` · ${study.period}` : ''}
              </span>
            )}
            {study.publishedAt && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" aria-hidden />
                {formatPublishedDate(study.publishedAt)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" aria-hidden />
              {study.readTime} read
            </span>
          </div>

          {(study.github || study.paper) && (
            <div className="flex flex-wrap gap-3 mt-6">
              {study.github && (
                <a
                  href={study.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  <Github className="w-4 h-4 mr-2" aria-hidden />
                  View code
                </a>
              )}
              {study.paper && (
                <a
                  href={study.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 mr-2" aria-hidden />
                  Read paper
                </a>
              )}
            </div>
          )}
        </header>

        {study.metrics.length > 0 && (
          <aside className="mb-12 p-6 rounded-xl bg-slate-50 border border-slate-200">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-4">
              Results at a glance
            </h2>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-xs text-slate-500 mb-1">{metric.label}</dt>
                  <dd className="text-lg font-bold text-slate-900">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}

        <CaseStudyTableOfContents sections={sections} />

        <div className="case-study-prose space-y-10">
          {sections.map((section, index) => (
            <section key={section.title} id={slugToSectionId(section.title)} className="scroll-mt-24">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                {index === 0 && <Building2 className="w-5 h-5 text-blue-600 shrink-0" aria-hidden />}
                {index === 1 && <Lightbulb className="w-5 h-5 text-amber-600 shrink-0" aria-hidden />}
                {index === 2 && <Target className="w-5 h-5 text-emerald-600 shrink-0" aria-hidden />}
                {section.title}
              </h2>
              <p className="text-slate-600 leading-[1.8] text-[1.0625rem]">{section.content}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500 mb-3">
            Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {study.topics.map((topic) => (
              <Badge key={topic} variant="outline" size="sm">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        <CaseStudyPrevNext prev={prev} next={next} />
      </div>

      {related.length > 0 && (
        <div className="mt-20 pt-16 border-t border-slate-200 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Related case studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <CaseStudyTeaserCard key={item.id} study={item} compact />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
