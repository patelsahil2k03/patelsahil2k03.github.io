import { skillCategories } from '@/data';
import { SectionHeading, column } from '@/components/evidence/SectionHeading';

/** Every skill, grouped, as plain text. No self-rating bars (owner input C3, default: drop). */
export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-t border-ev-rule py-20 sm:py-28">
      <div className={column}>
        <SectionHeading id="skills" title="Skills" />
        <dl className="divide-y divide-ev-rule border-y border-ev-rule">
          {[...skillCategories].sort((a, b) => Number(b.category.startsWith('AI')) - Number(a.category.startsWith('AI'))).map((c) => (
            <div key={c.category} className="grid gap-2 py-6 sm:grid-cols-12 sm:gap-12">
              <dt className="font-sans text-base font-semibold text-ev-ink sm:col-span-3">{c.category}</dt>
              <dd className="max-w-[70ch] font-serif text-base leading-relaxed text-ev-ink2 sm:col-span-9">
                {c.skills.map((s) => s.name).join(', ')}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
