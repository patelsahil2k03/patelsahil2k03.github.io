import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { CaseStudyIndex } from '@/components/case-studies/CaseStudyIndex';
import { seo } from '@/data';

export const metadata: Metadata = {
  title: 'Case Studies | Sahil Patel',
  description:
    'Case studies from production AI systems, a hackathon build and published research: the problem, the approach, and what I built.',
  alternates: { canonical: '/case-studies/' },
  openGraph: {
    title: 'Case Studies | Sahil Patel',
    description: 'Case studies from production AI systems, a hackathon build and published research: the problem, the approach, and what I built.',
    url: 'https://patelsahil2k03.github.io/case-studies/',
    type: 'website',
    images: [seo.og.image],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Studies | Sahil Patel',
    description: 'Case studies from production AI systems, a hackathon build and published research: the problem, the approach, and what I built.',
    images: [seo.og.image.url],
  },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CaseStudyIndex />
    </PageShell>
  );
}
