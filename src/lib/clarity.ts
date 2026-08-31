import Clarity from '@microsoft/clarity';

/** Clarity Smart event names (keep lowercase, hyphenated). */
export const CLARITY_EVENTS = {
  VIEW_PROJECTS: 'view-projects',
  CONTACT_CTA: 'contact-cta',
  RESUME_DOWNLOAD: 'resume-download',
  CONTACT_FORM_SUBMIT: 'contact-form-submit',
  AVATAR_SHOWN: 'avatar-shown',
  AVATAR_OPT_OUT: 'avatar-opt-out',
  AVATAR_OPT_IN: 'avatar-opt-in',
} as const;

const isEnabled =
  process.env.NODE_ENV === 'production' &&
  Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim());

/** Fire a Clarity custom event in production when analytics is configured. */
export function trackClarityEvent(eventName: string) {
  if (!isEnabled) return;

  try {
    Clarity.event(eventName);
  } catch (error) {
    console.error('[Clarity] Failed to track event:', eventName, error);
  }
}
