'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { caseStudies, caseStudyFilters, type CaseStudyType } from '@/data/caseStudies';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyTeaserCard } from './CaseStudyTeaserCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export function CaseStudyIndex() {
  const [filter, setFilter] = useState<CaseStudyType | 'all'>('all');

  const sorted = [...caseStudies].sort((a, b) =>
    (b.publishedAt ?? '').localeCompare(a.publishedAt ?? '')
  );

  const filtered =
    filter === 'all' ? sorted : sorted.filter((cs) => cs.type === filter);

  return (
    <div className="py-16 lg:py-24 bg-slate-50 min-h-[calc(100vh-4rem)]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Back to portfolio
        </Link>

        <div className="max-w-3xl mb-12">
          <Badge variant="default" size="lg" className="mb-4">
            Case Studies
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Engineering notes from production & research
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Problem context, patterns learned, and what shipped—written like an internal tech blog.
            Drafts mapped from real work; depth and visuals will grow over time.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {caseStudyFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                filter === item.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((study) => (
            <CaseStudyTeaserCard key={study.id} study={study} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-600 mb-4">No case studies in this category yet.</p>
            <Button onClick={() => setFilter('all')}>View all</Button>
          </div>
        )}
      </div>
    </div>
  );
}
