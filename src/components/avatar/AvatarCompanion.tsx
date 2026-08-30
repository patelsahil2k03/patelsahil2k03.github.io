'use client';

import { useActiveSection } from '@/lib/hooks';
import { getNarrationForSection } from '@/data/avatarNarration';
import { AvatarScene } from './AvatarScene';
import { AvatarNarration } from './AvatarNarration';

const HOMEPAGE_SECTION_IDS = [
  'home', 'about', 'experience', 'case-studies',
  'skills', 'projects', 'publications', 'achievements', 'contact',
];

export function AvatarCompanion() {
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS);
  const { pose, thought } = getNarrationForSection(activeSection);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <AvatarNarration thought={thought} />
      <AvatarScene className="w-32 h-32" pose={pose} />
    </div>
  );
}
