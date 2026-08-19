'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

/**
 * Initializes Microsoft Clarity once per browser session.
 * Requires NEXT_PUBLIC_CLARITY_PROJECT_ID (inlined at build time for static export).
 * Skips when the ID is missing or in local development.
 */
export function ClarityAnalytics() {
  useEffect(() => {
    if (!projectId) {
      if (process.env.NODE_ENV === 'development') {
        console.info(
          '[Clarity] Skipped: set NEXT_PUBLIC_CLARITY_PROJECT_ID in .env.local to enable locally.'
        );
      }
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      return;
    }

    try {
      Clarity.init(projectId);
    } catch (error) {
      console.error('[Clarity] Failed to initialize:', error);
    }
  }, []);

  return null;
}
