'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Bounds, Center, useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  const { animations } = useGLTF(AVATAR_ANIMATIONS_PATH);
  // useAnimations binds these foreign clips to `group`'s own hierarchy by
  // matching bone/node names — this is the retargeting step verified
  // compatible in spec section 6c (24 matching bone names between the
  // character and the animation library).
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions['Idle_A'];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions]);

  return <primitive ref={group} object={scene} />;
}

export function AvatarScene({ className }: { className?: string }) {
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
              <Model />
            </Center>
          </Bounds>
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
