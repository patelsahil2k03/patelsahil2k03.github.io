export interface AvatarNarrationEntry {
  sectionId: string;
  pose: string;
  thought: string;
}

// Pose values match docs/design/avatar-companion-spec.md section 5's finalized mapping against KayKit's
// real animation clip names, not a placeholder — Idle_A/Idle_B/Interact/
// Use_Item/PickUp/Throw/Spawn_Air, deliberately never Hit_*/Death_*.
//
// Spawn_Air on `achievements` is intentional: its root bone starts 2 units
// up and falls to 0 over the first ~0.73s, so it plays as "drop in from
// above and land" — an arrival, which suits the section. It's declared in
// AVATAR_ONE_SHOT_POSES so it plays once and then settles into the idle
// loop instead of repeating. Starting off-frame above is the intended
// effect of the animation, not clipping.
export const avatarNarration: AvatarNarrationEntry[] = [
  {
    sectionId: 'home',
    pose: 'Idle_A',
    thought: "Hey there. I'll be your guide through what Sahil's built.",
  },
  {
    sectionId: 'about',
    pose: 'Idle_B',
    thought: 'The short version: he builds AI systems that make it to production.',
  },
  {
    sectionId: 'experience',
    pose: 'Interact',
    thought: 'Almost three years in, across FinTech, FoodTech, HealthTech and e-commerce.',
  },
  {
    sectionId: 'case-studies',
    pose: 'Use_Item',
    thought: 'Production systems first, then a hackathon build and two papers.',
  },
  {
    sectionId: 'skills',
    pose: 'PickUp',
    thought: '50+ technologies. I can barely carry them all.',
  },
  {
    sectionId: 'projects',
    pose: 'Throw',
    thought: 'University research, hackathon builds and side projects.',
  },
  {
    sectionId: 'publications',
    pose: 'Idle_A',
    thought: 'Two papers, peer-reviewed and published.',
  },
  {
    sectionId: 'achievements',
    pose: 'Spawn_Air',
    thought: 'A few wins worth mentioning, on the field and off it.',
  },
  {
    sectionId: 'contact',
    pose: 'Idle_B',
    thought: "Go ahead, say hi. I'll be right here.",
  },
];

const FALLBACK_ENTRY = avatarNarration[0];

export function getNarrationForSection(sectionId: string): AvatarNarrationEntry {
  return avatarNarration.find((entry) => entry.sectionId === sectionId) ?? FALLBACK_ENTRY;
}
