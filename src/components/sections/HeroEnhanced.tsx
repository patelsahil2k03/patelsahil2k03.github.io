'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { personalInfo, stats, social } from '@/data';
import { Github, Linkedin, Mail, Download, ExternalLink, Sparkles } from 'lucide-react';
import { 
  fadeInUp, 
  fadeInDown, 
  staggerContainer, 
  staggerItem,
  scaleIn 
} from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';

// Custom counter hook with animation
function useCounter(end: number, duration: number = 2000, start: number = 0) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      const currentCount = Math.floor(start + (end - start) * easeOutQuart);
      
      setCount(currentCount);

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);

  return count;
}

// Typing animation component
function TypingAnimation({ roles }: { roles: string[] }) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseBeforeDelete = 2000;
    const pauseBeforeType = 500;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          // Finished deleting, move to next role
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTimeout(() => {}, pauseBeforeType);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRoleIndex, roles]);

  return (
    <span className="inline-flex items-center">
      <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent font-bold">
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="ml-1 w-0.5 h-8 bg-blue-600 inline-block"
      />
    </span>
  );
}

// Enhanced stats card with counter
function StatCard({ icon, label, value, delay = 0, isCounter = false }: {
  icon: string;
  label: string;
  value: string;
  delay?: number;
  isCounter?: boolean;
}) {
  const controls = useAnimation();
  const [shouldCount, setShouldCount] = useState(false);
  
  // Extract number from value for counter
  const numericValue = isCounter ? parseInt(value.replace(/[^0-9]/g, '')) || 0 : 0;
  const counter = useCounter(numericValue, 2000);
  const suffix = isCounter ? value.replace(/[0-9]/g, '') : '';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldCount(true);
      controls.start({
        scale: [1, 1.1, 1],
        transition: { duration: 0.5 }
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [delay, controls]);

  return (
    <motion.div
      className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-blue-300 cursor-pointer overflow-hidden"
      variants={scaleIn}
      whileHover={{ scale: 1.05, y: -8 }}
      whileTap={{ scale: 0.98 }}
      animate={controls}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:via-cyan-400/10 group-hover:to-blue-400/10 transition-all duration-500" />
      
      <motion.div 
        className="text-4xl mb-3 relative z-10"
        whileHover={{ scale: 1.2, rotate: 10 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {icon}
      </motion.div>
      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-2 relative z-10">
        {isCounter && shouldCount ? `${counter}${suffix}` : value}
      </div>
      <div className="text-sm text-slate-600 font-medium relative z-10">
        {label}
      </div>
    </motion.div>
  );
}

export function HeroEnhanced() {
  const { ref, inView } = useScrollAnimation({ triggerOnce: true, threshold: 0.05 });
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Enhanced animated background - CRITICAL: pointer-events-none to allow clicks through */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <motion.div 
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-orange-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <motion.div 
        ref={ref}
        className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-20 relative z-10"
        initial="visible"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="text-center space-y-8">
          {/* Enhanced availability badge */}
          <motion.div 
            className="flex justify-center"
            variants={fadeInDown}
          >
            <Badge variant="secondary" size="lg" className="relative overflow-hidden group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-orange-600/20"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
              <span className="flex items-center gap-2 relative z-10">
                <motion.span 
                  className="w-2 h-2 bg-orange-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                Available for opportunities
                <Sparkles className="w-4 h-4 ml-1" />
              </span>
            </Badge>
          </motion.div>

          {/* Name & Typing Animation */}
          <motion.div className="space-y-6" variants={staggerItem}>
            <motion.h1 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight"
              variants={fadeInUp}
            >
              Hi, I&apos;m{' '}
              <motion.span 
                className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent inline-block"
                style={{
                  backgroundSize: '200% 100%',
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {personalInfo.name}
              </motion.span>
            </motion.h1>
            
            {/* Typing animation for roles */}
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-700 min-h-[3rem]"
              variants={fadeInUp}
            >
              <TypingAnimation roles={personalInfo.roles || [
                'AI/ML Engineer',
                'Full Stack Developer',
                'Data Scientist',
                'Published Researcher',
                'National Footballer'
              ]} />
            </motion.div>

            {/* Impact Statement */}
            <motion.div 
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border-2 border-blue-200 max-w-2xl mx-auto"
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <p className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {personalInfo.impactStatement || 'Built systems serving 2M+ users with 98%+ AI accuracy'}
              </p>
              <Sparkles className="w-5 h-5 text-cyan-600" />
            </motion.div>
          </motion.div>

          {/* Enhanced Stats Grid with Counters */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto pt-8"
            variants={staggerContainer}
          >
            <StatCard icon="💼" label="Experience" value={stats.experience} delay={200} />
            <StatCard icon="🚀" label="Projects" value={stats.projects} delay={400} />
            <StatCard icon="📚" label="Publications" value={stats.publications} delay={600} isCounter={true} />
            <StatCard icon="🎓" label="CGPA" value={stats.cgpa} delay={800} />
          </motion.div>

          {/* Impact Metrics Row */}
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
            variants={staggerContainer}
          >
            <StatCard icon="👥" label="Users Served" value={stats.usersServed} delay={1000} isCounter={true} />
            <StatCard icon="🎯" label="AI Accuracy" value={stats.accuracy} delay={1200} />
            <StatCard icon="⚙️" label="Technologies" value={stats.technologiesUsed} delay={1400} isCounter={true} />
            <StatCard icon="🏢" label="Customers" value={stats.customersSupported} delay={1600} isCounter={true} />
          </motion.div>

          {/* Enhanced CTAs - CRITICAL: relative z-20 for clickability */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 relative z-20"
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="relative z-20">
              <Button
                size="lg"
                variant="primary"
                onClick={() => scrollToSection('projects')}
                rightIcon={<ExternalLink className="w-5 h-5" />}
                className="relative overflow-hidden group cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 pointer-events-none"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
            <motion.div variants={staggerItem} className="relative z-20">
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contact')}
                leftIcon={<Mail className="w-5 h-5" />}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Get in Touch
              </Button>
            </motion.div>
            <motion.div variants={staggerItem} className="relative z-20">
              <Button
                size="lg"
                variant="ghost"
                onClick={() => window.open('/resume.pdf', '_blank')}
                leftIcon={<Download className="w-5 h-5" />}
                className="hover:bg-slate-100 cursor-pointer"
                style={{ pointerEvents: 'auto' }}
              >
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Social Links - CRITICAL: z-20 for clickability */}
          <motion.div 
            className="flex items-center justify-center gap-4 pt-8 relative z-20"
            variants={staggerContainer}
          >
            {[
              { icon: <Github className="w-6 h-6" />, url: social.github.url, label: 'GitHub', color: 'hover:text-slate-900 hover:border-slate-900' },
              { icon: <Linkedin className="w-6 h-6" />, url: social.linkedin.url, label: 'LinkedIn', color: 'hover:text-blue-600 hover:border-blue-600' },
              { 
                icon: <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-2.365-1.914-5.766-1.649-7.974.632L5.304 8.16l-3.853 4.126c-.184.198-.35.417-.495.652a5.266 5.266 0 0 0-.653 1.379 5.376 5.376 0 0 0-.233 1.64 5.527 5.527 0 0 0 .062 1.062c.058.362.153.72.282 1.068.13.348.296.682.495 1l.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019" /></svg>,
                url: social.leetcode.url, 
                label: 'LeetCode',
                color: 'hover:text-orange-600 hover:border-orange-600'
              },
              { icon: <Mail className="w-6 h-6" />, url: `mailto:${personalInfo.email}`, label: 'Email', color: 'hover:text-cyan-600 hover:border-cyan-600' },
            ].map((link, index) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-md border-2 border-slate-100 text-slate-700 transition-all duration-300 cursor-pointer relative z-20 ${link.color}`}
                aria-label={link.label}
                variants={scaleIn}
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ pointerEvents: 'auto' }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Animated scroll indicator - FIXED: Removed text to eliminate empty space */}
          <motion.div 
            className="pt-12 relative z-20"
            variants={fadeInUp}
          >
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-slate-400 hover:text-slate-600 transition-colors group cursor-pointer"
              aria-label="Scroll to about section"
              style={{ pointerEvents: 'auto' }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg
                  className="w-8 h-8 mx-auto group-hover:text-blue-600 transition-colors"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
