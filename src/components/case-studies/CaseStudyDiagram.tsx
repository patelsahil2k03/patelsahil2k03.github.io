'use client';

import { useEffect, useId, useRef, useState } from 'react';

/**
 * Renders a Mermaid architecture diagram client-side. Mermaid needs a real
 * DOM (no SSR), so this is a client component lazily initialized on mount —
 * it never blocks the article's core content (text renders immediately from
 * the static export regardless of whether this hydrates).
 */
export function CaseStudyDiagram({ definition }: { definition: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const diagramId = useId().replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        const isDark = document.documentElement.classList.contains('dark');

        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? 'dark' : 'default',
          securityLevel: 'strict',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        });

        // Mermaid caches rendered IDs internally — vary the id per theme so
        // toggling dark mode re-renders instead of reusing a stale SVG.
        const { svg } = await mermaid.render(
          `case-study-diagram-${diagramId}-${isDark ? 'dark' : 'light'}`,
          definition
        );
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled) setError(true);
      }
    }

    render();

    // Re-render if the user toggles the theme while this diagram is visible.
    const observer = new MutationObserver(render);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [definition, diagramId]);

  if (error) {
    // Fail quietly to a hidden state rather than show a broken diagram —
    // the surrounding prose already describes the architecture in text.
    return null;
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="System architecture diagram"
      className="my-8 p-6 rounded-xl bg-slate-50 dark:bg-page border border-slate-200 dark:border-edge overflow-x-auto [&_svg]:mx-auto [&_svg]:max-w-full"
    />
  );
}
