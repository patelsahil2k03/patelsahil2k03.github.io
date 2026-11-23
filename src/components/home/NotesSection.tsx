import { claims, claimStatusTag } from '@/data/claims';
import { homeNoteOrder } from '@/lib/notes';
import { cn } from '@/lib/utils';
import { NoteReturn } from '@/components/evidence/NoteReturn';
import { column } from '@/components/evidence/SectionHeading';

/** The page's footnotes, all in one place: what each number counts, its source and its status. */
export function NotesSection({ order = homeNoteOrder, inset = true }: { order?: string[]; inset?: boolean }) {
  return (
    <section id="notes" aria-labelledby="notes-title" className="border-t border-ev-rule py-16 sm:py-20">
      <div className={cn(inset && column)}>
        <h2 id="notes-title" className="ev-display text-xl font-bold text-ev-ink">
          Sources
        </h2>
        <NoteReturn />
        <p className="mt-2 max-w-[66ch] font-serif text-base leading-relaxed text-ev-ink2">
          Where the figures that make the case come from. <span className="font-sans text-sm">verified</span>: checked against
          a primary source. <span className="font-sans text-sm">project records</span>: from my own project records, with no
          independent measurement yet. <span className="font-sans text-sm">published paper</span>: from
          the publication; the full text was not re-read for this site.
        </p>
        <ol className="mt-8 grid gap-x-12 gap-y-5 font-serif text-sm leading-relaxed text-ev-ink2 md:grid-cols-2">
          {order.map((value, i) => {
            const c = claims[value];
            return (
              <li key={value} id={`note-${i + 1}`} tabIndex={-1} className="grid scroll-mt-24 grid-cols-[2.25rem_1fr]">
                <span className="ev-num text-ev-accent">{i + 1}</span>
                <span>
                  {/* The kind of evidence comes first, at the size of the note, so a reader sees it before the detail. */}
                  <span className="block font-sans text-sm text-ev-ink">
                    <span className="ev-num font-semibold">{value}</span> · {claimStatusTag[c.status]}
                  </span>
                  <span className="mt-0.5 block">
                    {c.counts} {c.source}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
