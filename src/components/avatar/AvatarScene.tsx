'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model({ pose }: { pose?: string }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  const { animations } = useGLTF(AVATAR_ANIMATIONS_PATH);
  // useAnimations binds these foreign clips to `group`'s own hierarchy by
  // matching bone/node names — this is the retargeting step verified
  // compatible in spec section 6c (24 matching bone names between the
  // character and the animation library).
  const { actions, names } = useAnimations(animations, group);
  const currentActionName = useRef<string | null>(null);

  useEffect(() => {
    if (names.length === 0) return;
    // Falls back to the literal 'Idle_A' (not names[0]) now that the real
    // clip names are known — this is the defensive fallback Task L3.2
    // will rely on when an unmapped/unknown pose name is passed in.
    const targetName = pose && names.includes(pose) ? pose : 'Idle_A';
    if (targetName === currentActionName.current) return;

    const nextAction = actions[targetName];
    const prevAction = currentActionName.current ? actions[currentActionName.current] : null;

    nextAction?.reset().fadeIn(0.4).play();
    prevAction?.fadeOut(0.4);
    currentActionName.current = targetName;
  }, [pose, actions, names]);

  return <primitive ref={group} object={scene} />;
}

export function AvatarScene({ className, pose }: { className?: string; pose?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          {/* Bounds auto-fits the camera to whatever Model actually
              renders, instead of a hardcoded camera position tuned for
              one specific character's dimensions — this is the fix for
              the head-cropping issue Task L2.1's review flagged, and it
              means swapping to a different KayKit character (per the
              swappable AVATAR_CHARACTER_PATH design) never needs a
              re-tuned camera. Center avoids the model's own pivot/origin
              being off-center within its bounding box. */}
          <Bounds fit clip observe margin={1.2}>
            <Center>
              <Model pose={pose} />
            </Center>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
