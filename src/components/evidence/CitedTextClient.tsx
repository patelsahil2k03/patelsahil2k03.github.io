'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { claims, claimAliases, claimStatusLabel } from '@/data/claims';
import { citeButton, citeMarker, noteAction } from './citeStyles';
import { rememberNoteReturn } from './NoteReturn';

export interface TextPart {
  text: string;
  /** Note number when this part is a footnoted figure. */
  n?: number;
}

/**
 * Running text with footnoted figures. A marker opens its note *after* the sentence (at the end of the paragraph or list
 * item), so the sentence never splits around a note block. One note is open at a time; Escape or "close" shuts it.
 */
export function CitedTextClient({ parts }: { parts: TextPart[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  const markers = useRef<(HTMLButtonElement | null)[]>([]);

  const close = () => {
    if (open !== null) markers.current[open]?.focus();
    setOpen(null);
  };

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // close reads `open`, which is this effect's dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const active = open !== null ? parts[open] : undefined;
  const claim = active ? claims[claimAliases[active.text] ?? active.text] : undefined;

  return (
    <>
      {parts.map((part, i) =>
        part.n ? (
            <button
              key={i}
              ref={(el) => {
                markers.current[i] = el;
              }}
              type="button"
              aria-expanded={open === i}
              aria-controls={`${baseId}-note`}
              aria-label={`Note ${part.n}: where ${part.text} comes from`}
              onClick={() => setOpen((o) => (o === i ? null : i))}
              className={citeButton}
            >
              <span className="ev-num">{part.text}</span>
              <span className={citeMarker}>{part.n}</span>
            </button>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
      <span
        id={`${baseId}-note`}
        role="note"
        aria-live="polite"
        className={claim && active ? 'ev-reveal mt-3 block max-w-[52ch] border-l border-ev-accent pl-4 font-serif text-sm font-normal leading-relaxed text-ev-ink2' : 'hidden'}
      >
        {claim && active && (
          <>
            <span className="block">
              <span className="ev-num font-semibold text-ev-ink">{active.text}</span>: {claim.counts}
            </span>
            <span className="mt-1 block text-ev-muted">{claim.source}</span>
            <span className="mt-1 block font-sans text-xs text-ev-muted">
              {claimStatusLabel[claim.status]} ·{' '}
              <a href={`#note-${active.n}`} onClick={rememberNoteReturn} className={noteAction}>
                note {active.n}
              </a>{' '}
              ·{' '}
              <button type="button" onClick={close} className={noteAction}>
                close
              </button>
            </span>
          </>
        )}
      </span>
    </>
  );
}
