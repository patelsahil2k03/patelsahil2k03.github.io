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
          reads as an in-scene speech bubble rather than a generic card.
          right-7 lines the tail up with the centre of the character's frame
          (the companion's canvas is 32px narrower than this bubble and
          right-aligned with it), so it points at the character rather than
          off to one side of them. */}
      <span
        aria-hidden
        className="absolute -bottom-[5px] right-7 w-2.5 h-2.5 bg-surface border-b border-r border-edge rotate-45"
      />
    </div>
  );
}
