import Image from 'next/image';
import { personalInfo, education } from '@/data';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';
import { CitedText } from '@/components/evidence/CitedText';
import { Cite } from '@/components/evidence/Cite';
import { noteNumber } from '@/lib/notes';

/** Who, in his own words, and the education behind it. */
export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-ev-rule py-20 sm:py-28">
      <div className={column}>
        <SectionHeading id="about" title="About" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/5] w-40 overflow-hidden bg-ev-figure sm:w-48 lg:w-full">
              <Image
                src="/images/hero/profile.jpg"
                alt={`Portrait of ${personalInfo.name}`}
                fill
                sizes="(max-width: 1024px) 12rem, 18rem"
                className="object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-9">
            <div className="ev-prose max-w-[66ch] space-y-5 font-serif text-lg leading-relaxed text-ev-ink2">
              {personalInfo.bio.map((p) => (
                <p key={p}>
                  <CitedText text={p} />
                </p>
              ))}
            </div>
            <div className="mt-12 max-w-[66ch] border-t border-ev-rule pt-8">
              <h3 className="ev-display text-xl font-bold text-ev-ink">{education.degree}</h3>
              <p className="mt-1 font-sans text-base text-ev-ink2">
                {education.university}, {education.location}, <span className="ev-num whitespace-nowrap">{education.duration}</span>. CGPA{' '}
                <Cite value={education.cgpa} label={`${education.cgpa}/10`} n={noteNumber(education.cgpa)} />
              </p>
              <ul className="ev-prose mt-4 list-disc space-y-1.5 pl-5 font-serif text-base leading-relaxed text-ev-ink2 marker:text-ev-accent">
                {education.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
