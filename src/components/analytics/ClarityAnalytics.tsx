'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';
import { ensureClarityQueue } from '@/lib/clarity';

const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID?.trim();

/**
 * Initializes Microsoft Clarity once per browser session.
 * Requires NEXT_PUBLIC_CLARITY_PROJECT_ID (inlined at build time for static export).
 * Skips when the ID is missing or in local development.
 *
 * The Clarity script is injected only after the page has loaded and the browser is idle: on a mid-range phone it costs
 * about 0.6 s of main-thread time, which otherwise competes with the page becoming interactive (Lighthouse, U-08).
 * Its call queue (`window.clarity`) is created at once, so events fired before the script arrives are kept and replayed.
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

    ensureClarityQueue();
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const start = () => {
      try {
        Clarity.init(projectId);
      } catch (error) {
        console.error('[Clarity] Failed to initialize:', error);
      }
    };
    const whenIdle = () => {
      if ('requestIdleCallback' in window) idleHandle = window.requestIdleCallback(start, { timeout: 4000 });
      else timer = setTimeout(start, 1500);
    };

    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    return () => {
      window.removeEventListener('load', whenIdle);
      if (idleHandle !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleHandle);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, []);

  return null;
}
