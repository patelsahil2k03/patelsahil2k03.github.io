'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// ssr: false is required, not optional — Canvas/useGLTF touch WebGL/DOM
// globals that don't exist during Next.js's server-side prerender pass.
// Without this, `npm run build`'s static export would fail here.
const AvatarScene = dynamic(
  () => import('@/components/avatar/AvatarScene').then((m) => m.AvatarScene),
  { ssr: false }
);

const POSES = ['Idle_A', 'Idle_B', 'Interact', 'Use_Item', 'PickUp', 'Throw', 'Spawn_Ground', 'Spawn_Air'];

export default function AvatarTestPage() {
  const [pose, setPose] = useState<string | undefined>('Idle_A');

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center gap-6 p-8">
      <div className="flex flex-wrap gap-2 justify-center">
        {POSES.map((p) => (
          <button
            key={p}
            onClick={() => setPose(p)}
            className={`px-3 py-2 border rounded text-sm ${pose === p ? 'bg-blue-600 text-white' : 'bg-white'}`}
          >
            {p}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-600">Current pose: {pose}</p>

      {/* NOTE: exactly ONE AvatarScene on this page. useGLTF(...).scene returns a
          single shared THREE.Object3D — mounting two of these makes the second
          steal the model out of the first, leaving one canvas empty. */}
      {/* Same 1:1 square aspect as the real companion, rendered large so the
          framing is measurable. Magenta = anywhere the character is NOT drawn,
          so cropping at any edge is unambiguous. */}
      <div className="flex flex-col items-center gap-2">
        <span className="text-xs text-slate-500">square 320x320 (real 1:1 aspect, scaled up)</span>
        <div id="probe-square" className="w-[320px] h-[320px] bg-fuchsia-500">
          <AvatarScene className="w-full h-full" pose={pose} />
        </div>
      </div>
    </main>
  );
}
