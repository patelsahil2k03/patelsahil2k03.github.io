'use client';

export function AvatarNarration({ thought }: { thought: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="relative max-w-[160px] px-3 py-2 rounded-2xl bg-surface/95 backdrop-blur-sm border border-edge text-ink-primary text-xs shadow-md"
    >
      {thought}
      {/* Speech-bubble tail pointing toward the character below, so this
          reads as an in-scene speech bubble rather than a generic card. */}
      <span
        aria-hidden
        className="absolute -bottom-[4px] right-5 w-2 h-2 bg-surface border-b border-r border-edge rotate-45"
      />
    </div>
  );
}
