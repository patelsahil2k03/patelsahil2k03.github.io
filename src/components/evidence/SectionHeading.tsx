/** One heading per section, left-aligned, with an optional one-sentence lede under it (no label above it). */
export function SectionHeading({ id, title, lede }: { id: string; title: string; lede?: string }) {
  return (
    <header className="mb-10 max-w-[62ch] sm:mb-14">
      <h2 id={`${id}-title`} className="ev-display text-[2rem] font-bold leading-[1.05] text-ev-ink sm:text-[2.75rem]">
        {title}
      </h2>
      {lede && <p className="mt-4 font-serif text-lg leading-relaxed text-ev-ink2">{lede}</p>}
    </header>
  );
}

/** Page column shared by every section. */
export const column = 'mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-12';
