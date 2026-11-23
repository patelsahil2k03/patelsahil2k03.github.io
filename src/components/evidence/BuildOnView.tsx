'use client';

import { useEffect, useRef } from 'react';

/**
 * Plays a figure's build (steps in pipeline order) once, the first time it is mostly in view. Content is visible by default:
 * the hidden "pending" state is set only from here, only when motion is allowed and IntersectionObserver exists, so a failed
 * script or reduced motion leaves the figure fully drawn. The choreography itself is CSS (`[data-build]` in globals.css).
 */
export function BuildOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Already on screen at load (e.g. a deep link): leave it drawn rather than flash it out and back in.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    el.dataset.build = 'pending';
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.build = 'play';
        io.disconnect();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
