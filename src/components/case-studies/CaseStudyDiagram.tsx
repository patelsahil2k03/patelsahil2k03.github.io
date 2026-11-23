'use client';

import { useEffect, useId, useRef, useState } from 'react';

/** Reads an `--ev-*` token (space-separated RGB) as a hex colour: Mermaid's base theme derives shades from hex values. */
function tokenHex(name: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim().split(/\s+/).map(Number);
  return '#' + raw.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

/**
 * Renders a Mermaid architecture diagram client-side (Mermaid needs a real DOM). The library (about 800 kB) is loaded only
 * when the diagram comes within a screen of the viewport, so it never competes with the article becoming interactive
 * (Lighthouse, U-08); the article text never depends on it.
 */
export function CaseStudyDiagram({ definition, description }: { definition: string; description?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  const diagramId = useId().replace(/:/g, '');

  useEffect(() => {
    let cancelled = false;
    // Each render gets a token; only the latest one may write the SVG (a fast theme toggle cannot be overwritten late).
    let latest = 0;
    let renderedDark: boolean | null = null;

    async function render() {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark === renderedDark) return;
      renderedDark = isDark;
      const token = ++latest;
      try {
        const mermaid = (await import('mermaid')).default;

        // Themed from the Evidence tokens (DESIGN.md): paper nodes, rule borders, tab:blue edges, ink text, 13px mono labels.
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          // Natural size (no shrink-to-fit, so labels stay at 13px) and SVG text labels, so the mono font measures correctly.
          flowchart: { useMaxWidth: false, htmlLabels: false },
          fontFamily: 'var(--font-mono), ui-monospace, monospace',
          themeVariables: {
            darkMode: isDark,
            fontSize: '13px',
            background: tokenHex('--ev-figure'),
            primaryColor: tokenHex('--ev-paper'),
            primaryTextColor: tokenHex('--ev-ink'),
            primaryBorderColor: tokenHex('--ev-accent'),
            secondaryColor: tokenHex('--ev-paper'),
            tertiaryColor: tokenHex('--ev-figure'),
            lineColor: tokenHex('--ev-accent'),
            textColor: tokenHex('--ev-ink'),
            clusterBkg: tokenHex('--ev-figure'),
            clusterBorder: tokenHex('--ev-rule'),
            titleColor: tokenHex('--ev-ink2'),
            edgeLabelBackground: tokenHex('--ev-paper'),
          },
        });

        // Mermaid caches rendered IDs internally — vary the id per theme so
        // toggling dark mode re-renders instead of reusing a stale SVG.
        const { svg } = await mermaid.render(
          `case-study-diagram-${diagramId}-${isDark ? 'dark' : 'light'}`,
          definition
        );
        if (!cancelled && token === latest && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelled && token === latest) setError(true);
      }
    }

    // Re-render if the user toggles the theme after the diagram has been drawn.
    const observer = new MutationObserver(() => void render());
    const start = () => {
      void render();
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    };

    // Load and draw only when the diagram is within one viewport of the screen.
    const el = containerRef.current;
    let near: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== 'undefined') {
      near = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          near?.disconnect();
          start();
        },
        { rootMargin: '100% 0px' }
      );
      near.observe(el);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      near?.disconnect();
      observer.disconnect();
    };
  }, [definition, diagramId]);

  if (error) {
    return (
      <p className="mt-5 bg-ev-figure p-5 font-serif text-base text-ev-ink2">
        The full architecture diagram could not load here. The same pipeline is drawn in Figure 1 above and described in the
        sections below.
      </p>
    );
  }

  return (
    <>
    <div
      ref={containerRef}
      role="img"
      aria-label={description ? `System architecture diagram. ${description}` : 'System architecture diagram'}
      tabIndex={0}
      className="mt-5 min-h-[12rem] overflow-x-auto bg-ev-figure p-5 sm:p-7 [&_svg]:mx-auto [&_svg]:max-w-none"
    />
    <p className="mt-2 font-sans text-xs text-ev-muted sm:hidden">Scroll sideways to see the whole diagram.</p>
    </>
  );
}
