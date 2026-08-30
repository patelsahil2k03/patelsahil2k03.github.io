'use client';

import { useEffect, useState } from 'react';
import { useActiveSection, usePrefersReducedMotion } from '@/lib/hooks';
import { getNarrationForSection } from '@/data/avatarNarration';
import { AVATAR_ENABLED, detectWebGLSupport } from '@/lib/avatarConfig';
import { AvatarScene } from './AvatarScene';
import { AvatarNarration } from './AvatarNarration';

const HOMEPAGE_SECTION_IDS = [
  'home', 'about', 'experience', 'case-studies',
  'skills', 'projects', 'publications', 'achievements', 'contact',
];

const OPT_OUT_STORAGE_KEY = 'avatar-opt-out';
const MOBILE_BREAKPOINT_PX = 768; // matches this codebase's existing Tailwind `md` breakpoint

type Mode = 'full' | 'simplified' | 'hidden';

function useAvatarMode(): Mode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>('hidden');

  useEffect(() => {
    if (!AVATAR_ENABLED) {
      setMode('hidden');
      return;
    }

    let optedOut = false;
    try {
      optedOut = localStorage.getItem(OPT_OUT_STORAGE_KEY) === 'true';
    } catch {
      // localStorage unavailable — treat as not opted out
    }

    if (optedOut || prefersReducedMotion || !detectWebGLSupport()) {
      setMode('hidden');
      return;
    }

    setMode(window.innerWidth < MOBILE_BREAKPOINT_PX ? 'simplified' : 'full');
  }, [prefersReducedMotion]);

  return mode;
}

export function AvatarCompanion() {
  const mode = useAvatarMode();
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS, mode !== 'hidden');
  const { pose, thought } = getNarrationForSection(activeSection);

  if (mode === 'hidden') return null;

  const sizeClass = mode === 'simplified' ? 'w-20 h-20' : 'w-32 h-32';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <AvatarNarration thought={thought} />
      <AvatarScene className={sizeClass} pose={pose} />
    </div>
  );
}
