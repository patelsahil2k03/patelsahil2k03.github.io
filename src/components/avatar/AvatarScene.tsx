'use client';

import { Suspense, useEffect, useLayoutEffect, useRef } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Box3, LoopOnce, LoopRepeat, Vector3 } from 'three';
import type { AnimationAction, Group, PerspectiveCamera } from 'three';
import {
  AVATAR_ANIMATIONS_PATH,
  AVATAR_CHARACTER_PATH,
  AVATAR_FRAME_MARGIN,
  AVATAR_IDLE_POSE,
  AVATAR_ONE_SHOT_POSES,
} from '@/lib/avatarConfig';

const CROSSFADE_SECONDS = 0.4;

function Model({ pose }: { pose?: string }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  const { animations } = useGLTF(AVATAR_ANIMATIONS_PATH);
  // useAnimations binds these foreign clips to `group`'s own hierarchy by
  // matching bone/node names — this is the retargeting step verified
  // compatible in spec section 6c (24 matching bone names between the
  // character and the animation library).
  const { actions, names, mixer } = useAnimations(animations, group);
  const currentActionName = useRef<string | null>(null);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  // --- Framing ------------------------------------------------------------
  // Measure the model's real bounding box, centre it on the origin, and put
  // the camera at a distance derived from that measurement.
  //
  // This replaces drei's <Bounds fit>/<Center>, which produced a genuinely
  // broken frame here: measured on a 320x320 square canvas (the companion's
  // real 1:1 aspect), the character rendered with 0px of headroom, 113-146
  // character pixels bleeding through the top row (i.e. the head was being
  // sliced off by the canvas edge), and 155px of the 320px frame left empty
  // below the feet. The cause is that the camera ended up aimed at the
  // model's origin — which for this rig sits at the feet — instead of at the
  // body's centre, so the character extended upward out of frame.
  //
  // Measuring at runtime rather than hardcoding a camera is deliberate: it's
  // what keeps AVATAR_CHARACTER_PATH swappable, since a different character's
  // proportions re-derive their own framing with no manual re-tuning.
  useLayoutEffect(() => {
    const model = group.current;
    if (!model) return;

    // Measure from a known-neutral offset so re-runs don't compound.
    model.position.set(0, 0, 0);
    model.updateMatrixWorld(true);

    const box = new Box3().setFromObject(model);
    if (box.isEmpty()) return;

    const extent = box.getSize(new Vector3());
    const centre = box.getCenter(new Vector3());
    if (!Number.isFinite(extent.y) || extent.y <= 0) return;

    // Centre the body on the origin so the camera aims at the middle of the
    // character rather than at its feet.
    model.position.sub(centre);

    const perspective = camera as PerspectiveCamera;
    const verticalFov = (perspective.fov * Math.PI) / 180;
    // Fit whichever dimension is the binding constraint for this aspect
    // ratio, so a wide pose is contained just as well as a tall one.
    const fitExtent = Math.max(extent.y, extent.x / perspective.aspect);
    const distance =
      (fitExtent / 2 / Math.tan(verticalFov / 2)) * AVATAR_FRAME_MARGIN;

    perspective.position.set(0, 0, distance);
    perspective.lookAt(0, 0, 0);
    // Generous near/far around the fitted distance. Tight clipping planes
    // were a second, independent way geometry got cut here previously.
    const depth = extent.length();
    perspective.near = Math.max(0.01, distance - depth * 2);
    perspective.far = distance + depth * 4;
    perspective.updateProjectionMatrix();
    // Re-runs when the canvas is resized (the companion swaps between a
    // 64px mobile frame and a 128px desktop one).
  }, [scene, camera, size.width, size.height]);

  // --- Pose changes -------------------------------------------------------
  useEffect(() => {
    if (names.length === 0) return;
    // Falls back to the idle loop when an unmapped/unknown pose is passed.
    const targetName = pose && names.includes(pose) ? pose : AVATAR_IDLE_POSE;
    if (targetName === currentActionName.current) return;

    const nextAction = actions[targetName];
    if (!nextAction) return;
    const prevAction = currentActionName.current
      ? actions[currentActionName.current]
      : null;

    // One-shot gestures play through once and hold their last frame (the
    // 'finished' handler below then settles them back into idle). Looping
    // them instead would make a deliberate action read as a nervous tic.
    if (AVATAR_ONE_SHOT_POSES.includes(targetName)) {
      nextAction.setLoop(LoopOnce, 1);
      nextAction.clampWhenFinished = true;
    } else {
      nextAction.setLoop(LoopRepeat, Infinity);
      nextAction.clampWhenFinished = false;
    }

    nextAction.reset().fadeIn(CROSSFADE_SECONDS).play();
    prevAction?.fadeOut(CROSSFADE_SECONDS);
    currentActionName.current = targetName;
  }, [pose, actions, names]);

  // When a one-shot gesture ends, ease back into the idle loop rather than
  // freezing on its final frame.
  useEffect(() => {
    if (!mixer) return;

    const handleFinished = (event: { action: AnimationAction }) => {
      const idle = actions[AVATAR_IDLE_POSE];
      if (!idle || event.action === idle) return;

      idle.setLoop(LoopRepeat, Infinity);
      idle.clampWhenFinished = false;
      idle.reset().fadeIn(CROSSFADE_SECONDS).play();
      event.action.fadeOut(CROSSFADE_SECONDS);
      currentActionName.current = AVATAR_IDLE_POSE;
    };

    mixer.addEventListener('finished', handleFinished as never);
    return () => mixer.removeEventListener('finished', handleFinished as never);
  }, [mixer, actions]);

  return <primitive ref={group} object={scene} />;
}

export function AvatarScene({
  className,
  pose,
}: {
  className?: string;
  pose?: string;
}) {
  return (
    <div className={className}>
      <Canvas camera={{ fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          <Model pose={pose} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
