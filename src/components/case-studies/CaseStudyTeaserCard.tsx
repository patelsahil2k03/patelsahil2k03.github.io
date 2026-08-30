'use client';

import Link from 'next/link';
import { Building2, ArrowRight, TrendingUp, Calendar } from 'lucide-react';
import { formatPublishedDate } from '@/lib/caseStudyUtils';
import type { CaseStudy } from '@/data/caseStudies';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { caseStudyTypeLabels, getTypeVariant } from '@/lib/caseStudyUtils';

interface CaseStudyTeaserCardProps {
  study: CaseStudy;
  /** Compact layout for homepage */
  compact?: boolean;
}

export function CaseStudyTeaserCard({ study, compact = false }: CaseStudyTeaserCardProps) {
  const href = `/case-studies/${study.id}/`;

  return (
    <Link href={href} className="block h-full group cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-signal-blue">
      <Card hoverGlow className="h-full flex flex-col">
        <CardHeader className={compact ? 'pb-3' : 'pb-4'}>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant={getTypeVariant(study.type)} size="sm">
              {caseStudyTypeLabels[study.type]}
            </Badge>
            <Badge variant="outline" size="sm">
              {study.industry}
            </Badge>
            <span className="text-xs text-slate-500 ml-auto flex items-center gap-2">
              {study.publishedAt && (
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3 h-3" aria-hidden />
                  {formatPublishedDate(study.publishedAt)}
                </span>
              )}
              <span>{study.readTime}</span>
            </span>
          </div>
          <CardTitle className="text-xl sm:text-2xl leading-snug group-hover:text-signal-blue transition-colors duration-200">
            {study.title}
          </CardTitle>
          {study.company && (
            <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-2">
              <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden />
              {study.company}
              {study.period ? ` · ${study.period}` : ''}
            </p>
          )}
          <p className="text-slate-600 mt-3 leading-relaxed line-clamp-3">{study.hook}</p>
        </CardHeader>

        <CardContent className="flex-grow pt-0 flex flex-col">
          {!compact && study.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
              {study.metrics.slice(0, 3).map((metric) => (
                <div
                  key={metric.label}
                  className="p-3 bg-slate-50 rounded-lg border border-slate-100"
                >
                  <div className="flex items-center gap-1 mb-1">
                    <TrendingUp className="w-3 h-3 text-signal-blue" aria-hidden />
                    <span className="text-xs text-slate-600">{metric.label}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">{metric.value}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {study.topics.slice(0, compact ? 3 : 4).map((topic) => (
              <Badge key={topic} variant="outline" size="sm">
                {topic}
              </Badge>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-signal-blue group-hover:gap-2.5 transition-all">
            Read case study
            <ArrowRight className="w-4 h-4" aria-hidden />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
