'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-slate-200/50'
          : 'bg-white/40 backdrop-blur-sm'
      )}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center space-x-2 group"
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
            <span className="text-xl font-bold text-slate-900 hidden sm:block">
              Sahil Patel
            </span>
          </button>

          {/* Desktop Navigation - FIXED: Added z-10 and cursor-pointer for clickability */}
          <div className="hidden md:flex items-center space-x-1 relative z-10">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer z-10',
                  activeSection === item.href.slice(1)
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-slate-900'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ pointerEvents: 'auto' }}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSection === item.href.slice(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200/50 -z-10"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* CTA Button (Desktop) - FIXED: Added z-10 for clickability */}
          <div className="hidden md:flex items-center space-x-4 relative z-10">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => scrollToSection('#contact')}
                className="backdrop-blur-sm bg-white/50 hover:bg-white/80 border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md transition-all cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Get in Touch
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button - FIXED: Added z-10 and cursor-pointer */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 relative z-10 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ pointerEvents: 'auto' }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
                <motion.button
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all',
                    activeSection === item.href.slice(1)
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-200/50 shadow-sm'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => scrollToSection('#contact')}
                >
                  Get in Touch
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
