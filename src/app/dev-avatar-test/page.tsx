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

export default function AvatarTestPage() {
  const [pose, setPose] = useState<string | undefined>(undefined);

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4">
      <AvatarScene className="w-[400px] h-[500px] border-2 border-slate-300 rounded-xl bg-white" pose={pose} />
      <div className="flex gap-2">
        <button onClick={() => setPose('Idle_A')} className="px-4 py-2 bg-white border rounded">Idle</button>
        <button onClick={() => setPose('Interact')} className="px-4 py-2 bg-white border rounded">Interact</button>
      </div>
    </main>
  );
}
