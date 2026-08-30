'use client';

import Link from 'next/link';
import { homepageFeaturedCaseStudies } from '@/data/caseStudies';
import { Badge } from '@/components/ui/Badge';
import { CaseStudyTeaserCard } from '@/components/case-studies/CaseStudyTeaserCard';
import { ArrowRight } from 'lucide-react';

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 lg:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="default" size="lg" className="mb-4">
            Case Studies
          </Badge>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Problems, <span className="text-signal-blue">patterns</span> & delivery
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Selected production and research write-ups—each with industry context, a practical insight,
            and what I shipped.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {homepageFeaturedCaseStudies.map((study) => (
            <CaseStudyTeaserCard key={study.id} study={study} compact />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/case-studies/"
            className="inline-flex items-center justify-center gap-2 h-13 px-8 py-3 text-lg font-medium rounded-lg bg-signal-blue text-white hover:bg-signal-blue-hover transition-colors cursor-pointer"
          >
            View all case studies
            <ArrowRight className="w-5 h-5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
