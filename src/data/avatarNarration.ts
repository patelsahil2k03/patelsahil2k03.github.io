export interface AvatarNarrationEntry {
  sectionId: string;
  pose: string;
  thought: string;
}

// Pose values match spec section 5's finalized mapping against KayKit's
// real animation clip names, not a placeholder — Idle_A/Idle_B/Interact/
// Use_Item/PickUp/Throw/Spawn_Air, deliberately never Hit_*/Death_*.
export const avatarNarration: AvatarNarrationEntry[] = [
  {
    sectionId: 'home',
    pose: 'Idle_A',
    thought: "Hi — I'm the 3D-sized version of Sahil. Scroll on, I'll keep up.",
  },
  {
    sectionId: 'about',
    pose: 'Idle_B',
    thought: "Production AI/ML systems, not slideware — that's the actual story here.",
  },
  {
    sectionId: 'experience',
    pose: 'Interact',
    thought: 'Two years in, already the person other teams ping when something breaks.',
  },
  {
    sectionId: 'case-studies',
    pose: 'Use_Item',
    thought: 'These are real systems at real scale, not demos — worth a proper look.',
  },
  {
    sectionId: 'skills',
    pose: 'PickUp',
    thought: "50+ technologies — still figuring out how to hold all of them at once.",
  },
  {
    sectionId: 'projects',
    pose: 'Throw',
    thought: 'Side projects that occasionally out-ambition the day job.',
  },
  {
    sectionId: 'publications',
    pose: 'Idle_A',
    thought: 'Actual peer review, actual publication — this part took real work.',
  },
  {
    sectionId: 'achievements',
    pose: 'Spawn_Air',
    thought: 'A few wins worth mentioning — on the field and off it.',
  },
  {
    sectionId: 'contact',
    pose: 'Idle_B',
    thought: "Go ahead, say hi — I'll be right here.",
  },
];

const FALLBACK_ENTRY = avatarNarration[0];

export function getNarrationForSection(sectionId: string): AvatarNarrationEntry {
  return avatarNarration.find((entry) => entry.sectionId === sectionId) ?? FALLBACK_ENTRY;
}
