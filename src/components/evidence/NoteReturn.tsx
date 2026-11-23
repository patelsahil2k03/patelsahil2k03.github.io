'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

/** Where the reader was when they followed a "note n" link to the sources list. Kept in memory for this page view only. */
let returnY: number | null = null;
const listeners = new Set<() => void>();

/** Call from a "note n" link before the jump, so the sources list can offer the way back. */
export function rememberNoteReturn() {
  returnY = window.scrollY;
  listeners.forEach((l) => l());
}

/**
 * "Back to where you were reading": shown in the sources heading only after a note link was followed, so it can never
 * send the reader off the site (unlike the browser's Back). Restores the scroll position and then hides again.
 */
export function NoteReturn() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => setVisible(returnY !== null);
    listeners.add(update);
    return () => {
      listeners.delete(update);
    };
  }, []);

  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={() => {
        const y = returnY ?? 0;
        returnY = null;
        setVisible(false);
        window.scrollTo({ top: y });
      }}
      className="inline-flex min-h-[44px] items-center gap-1.5 font-sans text-sm font-semibold text-ev-accent hover:underline underline-offset-4"
    >
      <ArrowUp className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      Back to where you were reading
    </button>
  );
}
