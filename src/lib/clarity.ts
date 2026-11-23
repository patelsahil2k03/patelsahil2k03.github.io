import Clarity from '@microsoft/clarity';

/** Clarity Smart event names (keep lowercase, hyphenated). */
export const CLARITY_EVENTS = {
  VIEW_PROJECTS: 'view-projects',
  CONTACT_CTA: 'contact-cta',
  RESUME_DOWNLOAD: 'resume-download',
  AVATAR_SHOWN: 'avatar-shown',
  AVATAR_OPT_OUT: 'avatar-opt-out',
  AVATAR_OPT_IN: 'avatar-opt-in',
} as const;

const isEnabled =
  process.env.NODE_ENV === 'production' &&
  Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim());

type ClarityQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

/**
 * Create Clarity's call queue if the script has not loaded yet (it is injected after load and idle, see
 * ClarityAnalytics.tsx). Calls made now are kept in `window.clarity.q` and replayed by the script when it arrives.
 */
export function ensureClarityQueue() {
  const w = window as unknown as { clarity?: ClarityQueue };
  if (w.clarity) return;
  const queue: ClarityQueue = (...args: unknown[]) => {
    (queue.q = queue.q || []).push(args);
  };
  w.clarity = queue;
}

/** Fire a Clarity custom event in production when analytics is configured. */
export function trackClarityEvent(eventName: string) {
  if (!isEnabled) return;

  try {
    ensureClarityQueue();
    Clarity.event(eventName);
  } catch (error) {
    console.error('[Clarity] Failed to track event:', eventName, error);
  }
}
