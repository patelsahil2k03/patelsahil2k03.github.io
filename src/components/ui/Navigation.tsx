'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { personalInfo } from '@/data/personal';
import { ThemeToggle } from './ThemeToggle';
import { AvatarToggle } from '@/components/avatar/AvatarToggle';
import { AVATAR_ENABLED } from '@/lib/avatarConfig';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';
import { useActiveSection } from '@/lib/hooks';

type NavItem = { name: string; sectionId?: string; href?: string };

// Section ids are unchanged from the earlier design (analytics and old links still resolve); labels follow the new order.
const SPY_IDS = ['case-studies', 'experience', 'publications', 'projects', 'about'];

const navItems: NavItem[] = [
  { name: 'Work', sectionId: 'case-studies' },
  { name: 'Experience', sectionId: 'experience' },
  { name: 'Research', sectionId: 'publications' },
  { name: 'Projects', sectionId: 'projects' },
  { name: 'About', sectionId: 'about' },
];

/**
 * Light bar over paper; transparent over the ink band at the top of the homepage. The band check uses an
 * IntersectionObserver on #home rather than a scroll listener.
 */
export function Navigation() {
  const pathname = usePathname() ?? '/';
  const onHome = pathname === '/' || pathname === '';
  const [overBand, setOverBand] = useState(onHome);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!onHome) {
      setOverBand(false);
      return;
    }
    const hero = document.getElementById('home');
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setOverBand(entry.intersectionRatio > 0.08), {
      threshold: [0, 0.08, 0.2],
      rootMargin: '-64px 0px 0px 0px',
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [onHome]);

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setMenuOpen(false);
      document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const inView = useActiveSection(SPY_IDS, onHome);
  const hrefFor = (item: NavItem) => item.href ?? (onHome ? `#${item.sectionId}` : `/#${item.sectionId}`);
  // On the homepage the item for the section in view is marked; elsewhere "Work" covers /case-studies/.
  const isActive = (item: NavItem) =>
    onHome ? item.sectionId === inView : item.sectionId === 'case-studies' && pathname.startsWith('/case-studies');
  const currentKind = onHome ? 'location' : 'page';
  const dark = overBand && !menuOpen;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50',
        // Band and paper switch at once, both ways: an eased color change passes through an illegible grey (motion review, U-17).
        // Over the band the header carries the band color itself, so its text contrast never depends on what is behind it.
        dark
          ? 'bg-ev-band text-ev-band-ink'
          : menuOpen
            ? 'border-b border-ev-rule bg-ev-paper text-ev-ink'
            : 'border-b border-ev-rule bg-ev-paper/95 text-ev-ink backdrop-blur-sm'
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link href="/" className="inline-flex min-h-[44px] items-center font-sans text-lg font-bold tracking-tight" onClick={() => setMenuOpen(false)}>
          {personalInfo.name}
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={hrefFor(item)}
                aria-current={isActive(item) ? currentKind : undefined}
                className={cn(
                  'inline-flex min-h-[44px] items-center px-3 font-sans text-[0.95rem] font-medium underline-offset-[6px] hover:underline',
                  isActive(item) && 'underline decoration-ev-accent decoration-2'
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClarityEvent(CLARITY_EVENTS.RESUME_DOWNLOAD)}
              className="inline-flex min-h-[44px] items-center px-3 font-sans text-[0.95rem] font-medium underline-offset-[6px] hover:underline"
            >
              Resume
            </a>
          </li>
          <li>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA)}
              className={cn(
                'ml-3 inline-flex min-h-[40px] items-center px-4 font-sans text-[0.95rem] font-semibold',
                dark ? 'bg-ev-band-ink text-ev-band' : 'bg-ev-ink text-ev-paper'
              )}
            >
              Email
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-1">
          {AVATAR_ENABLED && <AvatarToggle />}
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center lg:hidden"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X className="h-6 w-6" strokeWidth={1.75} /> : <Menu className="h-6 w-6" strokeWidth={1.75} />}
          </button>
        </div>
      </nav>

      <div id="mobile-menu" hidden={!menuOpen} className="border-t border-ev-rule bg-ev-paper lg:hidden">
        <ul className="mx-auto max-w-[1200px] px-5 py-4 sm:px-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={hrefFor(item)}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[48px] items-center font-sans text-lg font-medium text-ev-ink"
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClarityEvent(CLARITY_EVENTS.RESUME_DOWNLOAD)}
              className="flex min-h-[48px] items-center font-sans text-lg font-medium text-ev-ink"
            >
              Resume (PDF)
            </a>
          </li>
          <li>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA)}
              className="mt-2 flex min-h-[48px] items-center justify-center bg-ev-ink font-sans text-lg font-semibold text-ev-paper"
            >
              Email
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
