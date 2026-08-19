import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { CaseStudyIndex } from '@/components/case-studies/CaseStudyIndex';

export const metadata: Metadata = {
  title: 'Case Studies | Sahil Patel',
  description:
    'Engineering case studies from production AI systems, hackathons, and research—problem context, insights, and delivery notes.',
  openGraph: {
    title: 'Case Studies | Sahil Patel',
    description: 'Production systems, POCs, and research—written like an internal tech blog.',
    url: 'https://patelsahil2k03.github.io/case-studies/',
    type: 'website',
  },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <CaseStudyIndex />
    </PageShell>
  );
}
