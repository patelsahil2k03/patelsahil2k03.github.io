import Link from 'next/link';
import { personalInfo } from '@/data/personal';

const profiles = [
  { label: 'GitHub', href: personalInfo.social.github },
  { label: 'LinkedIn', href: personalInfo.social.linkedin },
  { label: 'Google Scholar', href: personalInfo.social.googleScholar },
];

/** The quiet end of every page, on the ink band. */
export function Footer() {
  return (
    <footer className="border-t border-ev-band-ink/10 bg-ev-band text-ev-band-muted">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-3 px-5 py-8 font-sans text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          <Link href="/" className="font-semibold text-ev-band-ink hover:underline underline-offset-4">
            {personalInfo.name}
          </Link>
          <span className="ml-2">{personalInfo.tagline}</span>
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {profiles.map((p) => (
            <li key={p.label}>
              <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[32px] items-center hover:text-ev-band-ink hover:underline underline-offset-4">
                {p.label}
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${personalInfo.email}`} className="inline-flex min-h-[32px] items-center hover:text-ev-band-ink hover:underline underline-offset-4">
              Email
            </a>
          </li>
        </ul>
        <p>
          <span className="ev-num">{new Date().getFullYear()}</span> ·{' '}
          <Link href="/#notes" className="hover:text-ev-band-ink hover:underline underline-offset-4">
            Sources
          </Link>
        </p>
      </div>
    </footer>
  );
}
