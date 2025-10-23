'use client';

import React from 'react';
import { personalInfo, social } from '@/data';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <button
              onClick={scrollToTop}
              className="text-2xl font-bold text-white mb-4 hover:text-blue-400 transition-colors"
            >
              {personalInfo.name}
            </button>
            <p className="text-sm text-slate-400 leading-relaxed">
              Building intelligent solutions at the intersection of sports and data science. 
              Footballer ⚽ turned Data Scientist 📊.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: 'About', href: '#about' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'Publications', href: '#publications' },
                { label: 'Contact', href: '#contact' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              <a
                href={social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={social.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2 bg-slate-800 rounded-lg hover:bg-blue-600 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-slate-400">
              <a href={`mailto:${personalInfo.email}`} className="hover:text-blue-400 transition-colors">
                {personalInfo.email}
              </a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
          <p className="text-slate-400">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-slate-400">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using Next.js & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
