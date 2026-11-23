'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { claims, claimAliases, claimStatusLabel } from '@/data/claims';
import { citeButton, citeMarker, noteAction } from './citeStyles';
import { rememberNoteReturn } from './NoteReturn';

/**
 * A figure with its footnote. The marker opens an inline note saying what the number counts, where it comes from and
 * whether it is verified (the signature interaction of the Evidence design). Without a note, the value renders plain.
 */
/** `label` is the text shown (defaults to `value`), e.g. "9.35/10" for the note on 9.35. */
export function Cite({ value, n, label = value }: { value: string; n?: number; label?: string }) {
  const claim = claims[claimAliases[value] ?? value];
  const [open, setOpen] = useState(false);
  const noteId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes an open note and returns focus to its marker.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (!claim || !n) return <span className="ev-num">{label}</span>;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={noteId}
        aria-label={`Note ${n}: where ${value} comes from`}
        onClick={() => setOpen((o) => !o)}
        className={citeButton}
      >
        <span className="ev-num">{label}</span>
        <span className={citeMarker}>{n}</span>
      </button>
      <span
        id={noteId}
        role="note"
        className={`${open ? 'ev-reveal block' : 'hidden'} mt-3 max-w-[46ch] border-l border-ev-accent pl-4 font-serif text-sm font-normal leading-relaxed text-ev-ink2`}
      >
        <span className="block">{claim.counts}</span>
        <span className="mt-1 block text-ev-muted">{claim.source}</span>
        <span className="mt-1 block font-sans text-xs text-ev-muted">
          {claimStatusLabel[claim.status]} ·{' '}
          <a href={`#note-${n}`} onClick={rememberNoteReturn} className={noteAction}>
            note {n}
          </a>{' '}
          ·{' '}
          <button type="button" onClick={() => { setOpen(false); buttonRef.current?.focus(); }} className={noteAction}>
            close
          </button>
        </span>
      </span>
    </>
  );
}
