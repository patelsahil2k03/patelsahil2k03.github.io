'use client';

import type { AnchorHTMLAttributes } from 'react';
import { trackClarityEvent } from '@/lib/clarity';

/** A plain anchor that also records a Clarity event (keeps the analytics events of the earlier design). */
export function TrackedLink({ event, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { event: string }) {
  return (
    <a
      {...props}
      onClick={(e) => {
        trackClarityEvent(event);
        onClick?.(e);
      }}
    />
  );
}
