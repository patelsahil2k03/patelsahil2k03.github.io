import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/layout/PageShell';
import { CaseStudyArticle } from '@/components/case-studies/CaseStudyArticle';
import { getAllCaseStudySlugs, getCaseStudyBySlug } from '@/lib/caseStudyUtils';

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    return { title: 'Case Study Not Found | Sahil Patel' };
  }

  return {
    title: `${study.title} | Case Study | Sahil Patel`,
    description: study.hook,
    openGraph: {
      title: study.title,
      description: study.hook,
      url: `https://patelsahil2k03.github.io/case-studies/${study.id}/`,
      type: 'article',
    },
  };
}

export default function CaseStudyDetailPage({ params }: PageProps) {
  const study = getCaseStudyBySlug(params.slug);

  if (!study) {
    notFound();
  }

  return (
    <PageShell>
      <CaseStudyArticle study={study} />
    </PageShell>
  );
}
