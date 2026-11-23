'use client';

import { useEffect, useState } from 'react';

/**
 * Hook to detect reduced motion preference
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Which of the given section ids is in view: the one crossing a thin line 40% down the viewport (sections are stacked,
 * so at most one crosses it).
 * IntersectionObserver, not a scroll listener. Returns '' until a section reaches that line; pass enabled=false to skip.
 * Used by the nav's active-section marker and by the (hidden) avatar companion.
 */
export function useActiveSection(sectionIds: string[], enabled: boolean = true) {
  const [activeSection, setActiveSection] = useState('');
  const key = sectionIds.join('|');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActiveSection(sectionIds.find((id) => visible.has(id)) ?? '');
      },
      { rootMargin: '-40% 0px -59% 0px' }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // key carries sectionIds' content, so a new array with the same ids does not re-subscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, key]);

  return activeSection;
}
