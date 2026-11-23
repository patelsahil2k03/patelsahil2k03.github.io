import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PageShell } from '@/components/layout/PageShell';

// The site-wide 404 (GitHub Pages serves out/404.html for any unknown path). Not indexed, no canonical.
export const metadata: Metadata = { title: 'Page not found | Sahil Patel', robots: { index: false }, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <PageShell>
      <div className="mx-auto flex min-h-[60vh] max-w-[760px] flex-col justify-center px-5 sm:px-8">
        <h1 className="ev-display text-[2.5rem] font-bold leading-[1.02] text-ev-ink sm:text-[3.25rem]">Page not found</h1>
        <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-ev-ink2">
          That page does not exist, or the link is out of date. The work is one click away.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/"
            className="inline-flex min-h-[48px] w-fit items-center gap-2 bg-ev-ink px-6 font-sans text-base font-semibold text-ev-paper"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden />
            Back to the portfolio
          </Link>
          <Link href="/case-studies/" className="ev-link inline-flex min-h-[48px] items-center font-sans text-base font-semibold">
            Browse all case studies
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
