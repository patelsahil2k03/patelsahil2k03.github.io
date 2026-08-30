'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Hook to detect when an element is in viewport
 * Used for triggering scroll animations
 */
export function useScrollAnimation(options = {}) {
  const defaultOptions = {
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    ...options
  };

  const { ref, inView } = useInView(defaultOptions);

  return { ref, inView };
}

/**
 * Hook to detect reduced motion preference
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

/**
 * Tracks which of the given section ids is currently scrolled into view,
 * using the same offset-based scroll-position check as Navigation.tsx's
 * nav-highlighting (not IntersectionObserver). Returns sectionIds[0] until
 * the first scroll event fires. Pass enabled=false to skip entirely (e.g.
 * on a route where these sections don't exist).
 */
export function useActiveSection(sectionIds: string[], enabled: boolean = true) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, sectionIds]);

  return activeSection;
}

/**
 * Hook for mouse parallax effect
 */
export function useMouseParallax(strength: number = 20) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return position;
}
