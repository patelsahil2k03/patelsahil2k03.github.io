'use client';

import { useEffect, useId, useState } from 'react';
import { claims, claimAliases, claimStatusLabel } from '@/data/claims';
import { cn } from '@/lib/utils';
import { citeButton, citeMarker, noteAction } from './citeStyles';
import { rememberNoteReturn } from './NoteReturn';

export interface MetricItem {
  label: string;
  value: string;
  n?: number;
}

/**
 * A row of results whose footnote opens as a full-width note under the row (not inside a narrow column), so the signature
 * interaction reads at a comfortable measure on every width.
 */
export function MetricList({ items, className }: { items: MetricItem[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  const active = items.find((m) => m.label === open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);
  const claim = active ? claims[claimAliases[active.value] ?? active.value] : undefined;

  // A results row holds counted or measured values only; word values (stack, status, venue) read as one caption line.
  const figures = items.filter((m) => /\d/.test(m.value));
  const facts = items.filter((m) => !/\d/.test(m.value));

  return (
    <div className={className}>
      {figures.length > 0 && (
      <dl className="flex flex-wrap gap-x-10 gap-y-4">
        {figures.map((m) => {
          const noted = Boolean(claims[claimAliases[m.value] ?? m.value] && m.n);
          return (
            <div key={m.label}>
              <dt className="font-sans text-xs text-ev-muted">{m.label}</dt>
              <dd className="mt-1 whitespace-nowrap text-lg font-semibold text-ev-ink">
                {/* The data face is for figures; a word-valued slot (a tool, a status) uses the UI face. */}
                {noted ? (
                  <button
                    type="button"
                    aria-expanded={open === m.label}
                    aria-controls={`${baseId}-note`}
                    aria-label={`Note ${m.n}: where ${m.value} comes from`}
                    onClick={() => setOpen((o) => (o === m.label ? null : m.label))}
                    className={cn(citeButton, open === m.label && 'decoration-solid')}
                  >
                    <span className="ev-num">{m.value}</span>
                    <span className={citeMarker}>{m.n}</span>
                  </button>
                ) : (
                  <span className="ev-num">{m.value}</span>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
      )}
      {facts.length > 0 && (
        <p className={cn('font-sans text-sm text-ev-muted', figures.length > 0 && 'mt-3')}>
          {facts.map((m, i) => (
            <span key={m.label}>
              {i > 0 && ' · '}
              {m.label}: <span className="text-ev-ink2">{m.value}</span>
            </span>
          ))}
        </p>
      )}
      {/* Always rendered (empty when closed) so screen readers announce the note when it fills. */}
      <div id={`${baseId}-note`} role="note" aria-live="polite" className={cn(claim && 'mt-4')}>
        {claim && active && (
          <div key={active.label} className="ev-reveal max-w-[62ch] border-l border-ev-accent pl-4 font-serif text-sm leading-relaxed text-ev-ink2">
            <p>
              <span className="ev-num font-semibold text-ev-ink">{active.value}</span>: {claim.counts}
            </p>
            <p className="mt-1 text-ev-muted">{claim.source}</p>
            <p className="mt-1 font-sans text-xs text-ev-muted">
              {claimStatusLabel[claim.status]} ·{' '}
              <a href={`#note-${active.n}`} onClick={rememberNoteReturn} className={noteAction}>
                note {active.n}
              </a>{' '}
              ·{' '}
              <button type="button" onClick={() => setOpen(null)} className={noteAction}>
                close
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
