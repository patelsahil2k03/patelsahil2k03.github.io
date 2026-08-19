'use client';

import { useEffect } from 'react';
import { trackClarityEvent } from '@/lib/clarity';

export function CaseStudyViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackClarityEvent(`case-study-view-${slug}`);
  }, [slug]);

  return null;
}
