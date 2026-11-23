'use client';

import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Sun/moon toggle that flips the `.dark` class on <html> and persists the
 * choice to localStorage. The initial (pre-hydration) class is already set
 * by the blocking inline script in `layout.tsx` — this component just reads
 * that state back on mount so its icon matches without a flash, then owns
 * every subsequent toggle.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // localStorage unavailable (private browsing, etc.) — theme still
      // applies for this session, it just won't persist.
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-11 w-11 cursor-pointer items-center justify-center text-current transition-opacity hover:opacity-70',
        className
      )}
      aria-label={mounted ? (isDark ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle theme'}
    >
      {/* Reserve mounted's icon only after mount to avoid guessing wrong on SSR/hydration; the inline script already prevents a full-page flash. */}
      {mounted && isDark ? (
        <Sun className="w-5 h-5" strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
