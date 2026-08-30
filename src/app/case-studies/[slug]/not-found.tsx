import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';

export default function CaseStudyNotFound() {
  return (
    <PageShell>
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Case study not found</h1>
        <p className="text-slate-600 mb-8 max-w-md">
          That write-up doesn&apos;t exist yet—or the link may be outdated.
        </p>
        <Link
          href="/case-studies/"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-signal-blue text-white font-medium hover:bg-signal-blue-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden />
          Browse all case studies
        </Link>
      </div>
    </PageShell>
  );
}
