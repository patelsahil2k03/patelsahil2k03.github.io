'use client';

import { useEffect, useRef, useState } from 'react';
import { useActiveSection, usePrefersReducedMotion } from '@/lib/hooks';
import { getNarrationForSection } from '@/data/avatarNarration';
import { AVATAR_ENABLED, detectWebGLSupport } from '@/lib/avatarConfig';
import { AvatarScene } from './AvatarScene';
import { AvatarNarration } from './AvatarNarration';
import { AVATAR_TOGGLE_EVENT } from './AvatarToggle';

const HOMEPAGE_SECTION_IDS = [
  'home', 'about', 'experience', 'case-studies',
  'skills', 'projects', 'publications', 'achievements', 'contact',
];

const OPT_OUT_STORAGE_KEY = 'avatar-opt-out';
const MOBILE_BREAKPOINT_PX = 768; // matches this codebase's existing Tailwind `md` breakpoint
// A real-device test found the narration bubble sitting persistently over
// body text on every mobile section — this content-dense single-column
// layout has no dedicated empty gutter for a fixed overlay to live in
// without covering something. On mobile the bubble now shows briefly on
// each section change, then fades, leaving only the small character; on
// desktop there's room for it to stay up the whole time, matching how this
// feature was originally designed and tested (no complaints there).
const NARRATION_VISIBLE_MS = 4000;

type Mode = 'full' | 'simplified' | 'hidden';

function widthToMode(): Mode {
  return window.innerWidth < MOBILE_BREAKPOINT_PX ? 'simplified' : 'full';
}

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
    } else {
      setMode(widthToMode());
    }

    const handleToggle = (event: Event) => {
      const optedOut = (event as CustomEvent<{ optedOut: boolean }>).detail.optedOut;
      if (optedOut) {
        setMode('hidden');
      } else if (!prefersReducedMotion && detectWebGLSupport()) {
        setMode(widthToMode());
      }
    };

    const handleResize = () => {
      // Resize never undoes an opt-out, reduced-motion preference, or missing
      // WebGL support — it only re-checks the width-based full/simplified
      // split, and only while the avatar is already visible.
      setMode((current) => (current === 'hidden' ? current : widthToMode()));
    };

    window.addEventListener(AVATAR_TOGGLE_EVENT, handleToggle);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener(AVATAR_TOGGLE_EVENT, handleToggle);
      window.removeEventListener('resize', handleResize);
    };
  }, [prefersReducedMotion]);

  return mode;
}

export function AvatarCompanion() {
  const mode = useAvatarMode();
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS, mode !== 'hidden');
  const { pose, thought } = getNarrationForSection(activeSection);

  // See NARRATION_VISIBLE_MS above: on mobile the bubble is transient
  // (shows on section change, fades after a few seconds); on desktop it
  // stays up the whole time a section is active.
  const [showNarration, setShowNarration] = useState(true);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode !== 'simplified') {
      setShowNarration(true);
      return;
    }
    setShowNarration(true);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => setShowNarration(false), NARRATION_VISIBLE_MS);
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [mode, activeSection]);

  if (mode === 'hidden') return null;

  const sizeClass = mode === 'simplified' ? 'w-16 h-16' : 'w-32 h-32';

  return (
    <div
      className="fixed right-6 z-40 flex flex-col items-end gap-2 pointer-events-none"
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}
    >
      <div className={`transition-opacity duration-500 ${showNarration ? 'opacity-100' : 'opacity-0'}`}>
        <AvatarNarration thought={thought} />
      </div>
      {/* No card/border here on purpose — the canvas background stays
          transparent and a drop-shadow follows the character's own
          silhouette instead of boxing it in a rectangle, so it reads as a
          small figure standing in the page rather than a separate floating
          UI widget. */}
      <AvatarScene className={`${sizeClass} drop-shadow-lg`} pose={pose} />
    </div>
  );
}
