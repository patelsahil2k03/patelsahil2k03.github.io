'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';

type SectionNavItem = { name: string; kind: 'section'; sectionId: string };
type RouteNavItem = { name: string; kind: 'route'; href: string };
type NavItem = SectionNavItem | RouteNavItem;

const navItems: NavItem[] = [
  { name: 'Home', kind: 'section', sectionId: 'home' },
  { name: 'About', kind: 'section', sectionId: 'about' },
  { name: 'Experience', kind: 'section', sectionId: 'experience' },
  { name: 'Case Studies', kind: 'route', href: '/case-studies/' },
  { name: 'Skills', kind: 'section', sectionId: 'skills' },
  { name: 'Projects', kind: 'section', sectionId: 'projects' },
  { name: 'Publications', kind: 'section', sectionId: 'publications' },
  { name: 'Achievements', kind: 'section', sectionId: 'achievements' },
  { name: 'Contact', kind: 'section', sectionId: 'contact' },
];

function isOnHome(pathname: string) {
  return pathname === '/' || pathname === '';
}

export function Navigation() {
  const pathname = usePathname();
  const onHome = isOnHome(pathname ?? '/');

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (!onHome) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = navItems
        .filter((item): item is SectionNavItem => item.kind === 'section')
        .map((item) => item.sectionId);
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
  }, [onHome]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const sectionHref = (sectionId: string) => `/#${sectionId}`;

  const isNavActive = (item: NavItem) => {
    if (item.kind === 'route') {
      return pathname?.startsWith('/case-studies') ?? false;
    }
    return onHome && activeSection === item.sectionId;
  };

  const renderNavControl = (item: NavItem, className: string) => {
    if (item.kind === 'route') {
      return (
        <Link href={item.href} className={className} onClick={() => setIsMobileMenuOpen(false)}>
          {item.name}
        </Link>
      );
    }

    if (onHome) {
      return (
        <button type="button" onClick={() => scrollToSection(item.sectionId)} className={className}>
          {item.name}
        </button>
      );
    }

    return (
      <Link href={sectionHref(item.sectionId)} className={className} onClick={() => setIsMobileMenuOpen(false)}>
        {item.name}
      </Link>
    );
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled || !onHome
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50'
          : 'bg-white/40 backdrop-blur-sm'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {onHome ? (
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/images/hero/profile.jpg"
                  alt="Profile Picture"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-full object-cover border-2 border-blue-500 transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:block">Sahil Patel</span>
            </button>
          ) : (
            <Link href="/" className="flex items-center space-x-2 group cursor-pointer">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/hero/profile.jpg"
                  alt="Profile Picture"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="rounded-full object-cover border-2 border-blue-500 transition-transform group-hover:scale-110"
                />
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:block">Sahil Patel</span>
            </Link>
          )}

          <div className="hidden md:flex items-center space-x-1 relative z-10">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {renderNavControl(
                  item,
                  cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer z-10 block',
                    isNavActive(item) ? 'text-blue-600' : 'text-slate-700 hover:text-slate-900'
                  )
                )}
                {isNavActive(item) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50 -z-10 pointer-events-none"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4 relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {onHome ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA);
                    scrollToSection('contact');
                  }}
                  className="backdrop-blur-sm bg-white/50 hover:bg-white/80 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  Get in Touch
                </Button>
              ) : (
                <Link href="/#contact">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA)}
                    className="backdrop-blur-sm bg-white/50 hover:bg-white/80 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Get in Touch
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 relative z-10 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200/50 shadow-lg"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {renderNavControl(
                    item,
                    cn(
                      'block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all cursor-pointer',
                      isNavActive(item)
                        ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200/50 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    )
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                {onHome ? (
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA);
                      scrollToSection('contact');
                    }}
                  >
                    Get in Touch
                  </Button>
                ) : (
                  <Link href="/#contact" className="block" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => trackClarityEvent(CLARITY_EVENTS.CONTACT_CTA)}
                    >
                      Get in Touch
                    </Button>
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
