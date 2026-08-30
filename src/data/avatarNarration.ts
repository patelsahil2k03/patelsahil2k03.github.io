export interface AvatarNarrationEntry {
  sectionId: string;
  pose: string;
  thought: string;
}

// Pose values match spec section 5's finalized mapping against KayKit's
// real animation clip names, not a placeholder — Idle_A/Idle_B/Interact/
// Use_Item/PickUp/Throw, deliberately never Hit_*/Death_*/Spawn_*.
// Neither Spawn_Air nor Spawn_Ground is used: parsing the GLB's own
// animation data showed Spawn_Air bakes in ~2 units of vertical root-bone
// motion (flies in from off-frame) and Spawn_Ground — despite no root
// motion — still swings its `hips` bone across ~0.98 units on its own
// (0.28 to 1.26, versus ~0.01-0.10 for every other pose here) as part of
// its own crouch-then-rise landing animation. Both blow well past what a
// small fixed camera frame can hold, so achievements uses Idle_A instead —
// confirmed stable across repeated pose transitions.
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
    pose: 'Idle_A',
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
