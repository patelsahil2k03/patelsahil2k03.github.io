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

/**
 * How much room to leave around the character when framing it.
 * 1.0 = the model exactly fills the frame (head flush against the top
 * edge); 1.35 leaves ~35% breathing room so raised arms and head-height
 * gesture poses stay fully inside a small companion frame.
 *
 * This is applied to a bounding box measured from the loaded model at
 * runtime, not to hardcoded dimensions — that's what keeps
 * AVATAR_CHARACTER_PATH swappable without re-tuning a camera by hand.
 */
export const AVATAR_FRAME_MARGIN = 1.35;

/**
 * The looping resting animation. Gestures fade back to this when they end.
 */
export const AVATAR_IDLE_POSE = 'Idle_A';

/**
 * Gestures that are a single action rather than a loop — these play once
 * and then settle back into AVATAR_IDLE_POSE instead of repeating on a
 * loop, which is what makes them read as a reaction rather than a tic.
 *
 * Spawn_Air belongs here specifically: its root bone starts 2 units above
 * the ground and falls to 0 over the first ~0.73s (verified by reading the
 * clip's own keyframes), so it plays as "drop in from above and land".
 * Entering from off-frame is the intended effect, not clipping.
 */
export const AVATAR_ONE_SHOT_POSES = [
  'Interact',
  'Use_Item',
  'PickUp',
  'Throw',
  'Spawn_Air',
  'Spawn_Ground',
];

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
