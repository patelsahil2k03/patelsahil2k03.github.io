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

/**
 * Site-wide kill switch. Flip to false to hide the avatar companion
 * entirely without a code revert, if something looks wrong in
 * production that wasn't caught in testing (spec section 6b).
 */
export const AVATAR_ENABLED = true;

export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
