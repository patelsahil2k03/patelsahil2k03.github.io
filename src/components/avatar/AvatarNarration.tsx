'use client';

export function AvatarNarration({ thought }: { thought: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-[180px] px-3 py-2 rounded-lg bg-surface border border-edge text-ink-primary text-xs shadow-md"
    >
      {thought}
    </div>
  );
}
