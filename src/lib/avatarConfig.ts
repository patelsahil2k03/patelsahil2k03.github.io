// src/lib/avatarConfig.ts

/**
 * Swap these two paths to change which character the companion uses.
 * Any character from the KayKit Adventurers pack works here as long as
 * it shares the animation library's skeleton bone names (verified true
 * for every character in the pack — see spec section 6c). A future
 * personal-likeness model (e.g. from Meshy) would also work here, as
 * long as it's rigged with a compatible skeleton.
 */
export const AVATAR_CHARACTER_PATH = '/models/character-ranger.glb';
export const AVATAR_ANIMATIONS_PATH = '/models/animations-general.glb';
