import { MetadataRoute } from 'next';
import { getAllCaseStudySlugs } from '@/lib/caseStudyUtils';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://patelsahil2k03.github.io';
  const slugs = getAllCaseStudySlugs();

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/case-studies/`, lastModified: new Date() },
    ...slugs.map((slug) => ({
      url: `${base}/case-studies/${slug}/`,
      lastModified: new Date(),
    })),
  ];
}
