import type { CaseStudyFigure } from '@/data/caseStudies';
import { BuildOnView } from './BuildOnView';

/**
 * A system drawn as its real pipeline: each step in order, top to bottom, joined by a tab:blue line; the final step
 * (the outcome) carries the figure's one tab:orange mark. Plain markup, so it reads without JavaScript and at any width.
 * The first time it scrolls into view it builds in step order (BuildOnView + `[data-build]` CSS), the one authored motion
 * after the hero: it shows the order of the pipeline, which is the figure's argument.
 */
export function SystemFigure({ figure, number }: { figure: CaseStudyFigure; number: number }) {
  const last = figure.steps.length - 1;
  return (
    <figure className="bg-ev-figure px-5 py-7 sm:px-8 sm:py-9">
      <BuildOnView>
      <ol className="relative" aria-label={`Figure ${number}: system pipeline, in order`}>
        {figure.steps.map((step, i) => (
          <li
            key={step}
            className="ev-step relative grid grid-cols-[2.5rem_1fr] items-stretch"
            style={{ '--i': i } as React.CSSProperties}
          >
            <span aria-hidden className="relative flex justify-center">
              {i < last && <span className="ev-spine absolute top-1/2 h-full w-px bg-ev-accent" />}
              <span
                className={`relative z-10 mt-[1.05rem] h-2.5 w-2.5 rounded-full ${
                  i === last ? 'bg-ev-accent2' : 'bg-ev-accent'
                }`}
              />
            </span>
            <span
              className={`my-1.5 block border bg-ev-paper px-4 py-2.5 font-mono text-[0.8rem] leading-snug text-ev-ink ${
                i === last ? 'border-ev-accent2' : 'border-ev-rule'
              }`}
            >
              {step}
            </span>
          </li>
        ))}
      </ol>
      </BuildOnView>
      <figcaption className="mt-6 max-w-[62ch] font-serif text-sm leading-relaxed text-ev-ink2">
        <span className="font-sans font-semibold text-ev-ink">Figure {number}.</span> {figure.caption}
      </figcaption>
    </figure>
  );
}
