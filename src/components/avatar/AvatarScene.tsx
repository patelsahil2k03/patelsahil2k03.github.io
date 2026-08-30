'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model() {
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  // Loaded here only to confirm it resolves — its own animations/scene
  // are used starting in Task L2.2, not yet in this step.
  useGLTF(AVATAR_ANIMATIONS_PATH);
  return <primitive object={scene} />;
}

export function AvatarScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
