export interface AvatarNarrationEntry {
  sectionId: string;
  pose: string;
  thought: string;
}

// Pose values match spec section 5's finalized mapping against KayKit's
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
    thought: "Hey there — I'll be your guide through what Sahil's built.",
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
