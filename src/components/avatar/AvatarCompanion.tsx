'use client';

import { useActiveSection } from '@/lib/hooks';
import { AvatarScene } from './AvatarScene';

const HOMEPAGE_SECTION_IDS = [
  'home',
  'about',
  'experience',
  'case-studies',
  'skills',
  'projects',
  'publications',
  'achievements',
  'contact',
];

// Per spec section 5's finalized mapping against KayKit's real clip
// names (Idle_A/Idle_B/Interact/PickUp/Throw/Use_Item/Spawn_Air) —
// anything not present falls back to Idle_A via AvatarScene's own
// fallback logic. Superseded by avatarNarration.ts in Task L4.2, which
// becomes the single source of truth for both pose and copy together.
const SECTION_POSES: Record<string, string> = {
  home: 'Idle_A',
  about: 'Idle_B',
  experience: 'Interact',
  'case-studies': 'Use_Item',
  skills: 'PickUp',
  projects: 'Throw',
  publications: 'Idle_A',
  achievements: 'Spawn_Air',
  contact: 'Idle_B',
};

export function AvatarCompanion() {
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS);
  const pose = SECTION_POSES[activeSection] ?? 'Idle_A';

  return (
    <AvatarScene
      className="fixed bottom-6 right-6 w-32 h-32 z-40 pointer-events-none"
      pose={pose}
    />
  );
}
