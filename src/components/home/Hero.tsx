import { personalInfo } from '@/data';
import { CLARITY_EVENTS } from '@/lib/clarity';
import { TrackedLink } from '@/components/evidence/TrackedLink';
import { column } from '@/components/evidence/SectionHeading';

const textLink =
  'inline-flex min-h-[48px] items-center text-base font-semibold text-ev-band-ink underline decoration-ev-accent-band decoration-2 underline-offset-[6px] hover:decoration-ev-band-ink';

/** First viewport: the claim on the ink band, who is making it, and the actions. Type only, by decision (U-15). */
export function Hero() {
  return (
    <section id="home" aria-labelledby="home-title" className="ev-band-edge-b bg-ev-band text-ev-band-ink">
      <div className={`${column} flex min-h-[78dvh] flex-col justify-end pb-14 pt-28 sm:min-h-[86dvh] sm:pb-20 sm:pt-32`}>
        <h1
          id="home-title"
          className="ev-poster ev-rise text-[clamp(3.4rem,15vw,4.75rem)] sm:text-[clamp(3.1rem,9.4vw,10.25rem)]"
        >
          Systems that make it
          <br />
          to production.
        </h1>
        <p className="ev-rise ev-rise-2 mt-8 font-sans text-base text-ev-band-ink sm:text-lg">
          {personalInfo.name} · {personalInfo.title.replace('Engineer II', 'Engineer\u00a0II')}
        </p>
        <p className="ev-rise ev-rise-2 mt-3 max-w-[52ch] font-serif text-lg leading-relaxed text-ev-band-muted sm:text-xl">
          I build AI and full-stack systems that run in production. The figures that make the case are footnoted to their source.
        </p>
        <div className="ev-rise ev-rise-3 mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 font-sans">
          <TrackedLink
            href="#case-studies"
            event={CLARITY_EVENTS.VIEW_PROJECTS}
            className="inline-flex min-h-[48px] items-center bg-ev-band-ink px-6 text-base font-semibold text-ev-band transition-transform duration-200 active:translate-y-0"
          >
            Selected work
          </TrackedLink>
          <TrackedLink href={`mailto:${personalInfo.email}`} event={CLARITY_EVENTS.CONTACT_CTA} className={textLink}>
            Email
          </TrackedLink>
          <TrackedLink
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            event={CLARITY_EVENTS.RESUME_DOWNLOAD}
            className={textLink}
          >
            Resume (PDF)
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
