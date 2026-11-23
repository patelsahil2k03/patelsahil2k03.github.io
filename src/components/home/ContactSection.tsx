import { ArrowUpRight } from 'lucide-react';
import { personalInfo, contact } from '@/data';
import { CLARITY_EVENTS } from '@/lib/clarity';
import { TrackedLink } from '@/components/evidence/TrackedLink';
import { column } from '@/components/evidence/SectionHeading';

const profiles = [
  { label: 'LinkedIn', href: personalInfo.social.linkedin },
  { label: 'GitHub', href: personalInfo.social.github },
  { label: 'Google Scholar', href: personalInfo.social.googleScholar },
  { label: 'LeetCode', href: personalInfo.social.leetcode },
  { label: 'Medium', href: personalInfo.social.medium },
];

/** The close, back on the ink band: one way to reach him, stated plainly. */
export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="ev-band-edge-t bg-ev-band text-ev-band-ink">
      <div className={`${column} py-24 sm:py-32`}>
        <h2 id="contact-title" className="ev-poster text-[clamp(2.6rem,6.4vw,6.25rem)]">
          Email is the fastest way to reach me.
        </h2>
        <TrackedLink
          href={`mailto:${contact.email}`}
          event={CLARITY_EVENTS.CONTACT_CTA}
          className="mt-10 inline-block break-all py-2 font-sans text-2xl font-semibold text-ev-band-ink underline decoration-ev-accent-band decoration-2 underline-offset-[8px] hover:decoration-ev-band-ink sm:text-4xl"
        >
          {contact.email}
        </TrackedLink>
        <p className="mt-6 font-serif text-lg text-ev-band-muted">
          {contact.availability} · {contact.location}
        </p>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-2 font-sans text-base">
          {profiles.map((p) => (
            <li key={p.label}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-1 text-ev-band-ink hover:text-ev-accent-band"
              >
                {p.label}
                <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
              </a>
            </li>
          ))}
          <li>
            <TrackedLink
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              event={CLARITY_EVENTS.RESUME_DOWNLOAD}
              className="group inline-flex min-h-[44px] items-center gap-1 text-ev-band-ink hover:text-ev-accent-band"
            >
              Resume (PDF)
              <ArrowUpRight className="ev-arrow h-4 w-4" strokeWidth={1.75} aria-hidden />
            </TrackedLink>
          </li>
        </ul>
      </div>
    </section>
  );
}
