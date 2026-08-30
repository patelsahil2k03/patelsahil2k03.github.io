'use client';

import dynamic from 'next/dynamic';

// ssr: false is required, not optional — Canvas/useGLTF touch WebGL/DOM
// globals that don't exist during Next.js's server-side prerender pass.
// Without this, `npm run build`'s static export would fail here.
const AvatarScene = dynamic(
  () => import('@/components/avatar/AvatarScene').then((m) => m.AvatarScene),
  { ssr: false }
);

export default function AvatarTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <AvatarScene className="w-[400px] h-[500px] border-2 border-slate-300 rounded-xl bg-white" />
    </main>
  );
}
