'use client';

import { useEffect, useState } from 'react';
import { Sparkles, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';

const OPT_OUT_STORAGE_KEY = 'avatar-opt-out';
export const AVATAR_TOGGLE_EVENT = 'avatar-opt-out-changed';

export function AvatarToggle({ className }: { className?: string }) {
  const [optedOut, setOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem(OPT_OUT_STORAGE_KEY) === 'true');
    } catch {
      // ignore — default false
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !optedOut;
    setOptedOut(next);
    try {
      localStorage.setItem(OPT_OUT_STORAGE_KEY, String(next));
    } catch {
      // localStorage unavailable — toggle still applies for this session via state,
      // it just won't persist across reloads
    }
    window.dispatchEvent(new CustomEvent(AVATAR_TOGGLE_EVENT, { detail: { optedOut: next } }));
    trackClarityEvent(next ? CLARITY_EVENTS.AVATAR_OPT_OUT : CLARITY_EVENTS.AVATAR_OPT_IN);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'relative inline-flex items-center justify-center w-11 h-11 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-ink-secondary dark:hover:bg-surface-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-signal-blue',
        className
      )}
      aria-label={mounted ? (optedOut ? 'Show 3D companion' : 'Hide 3D companion') : 'Toggle 3D companion'}
      title={mounted ? (optedOut ? 'Show 3D companion' : 'Hide 3D companion') : undefined}
    >
      {mounted && optedOut ? <EyeOff className="w-5 h-5" aria-hidden /> : <Sparkles className="w-5 h-5" aria-hidden />}
    </button>
  );
}
