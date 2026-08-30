import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CaseStudyLink {
  id: string;
  title: string;
}

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

export function Timeline({ children, className }: TimelineProps) {
  return (
    <div className={cn('relative space-y-8', className)}>
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-signal-blue via-status-teal-icon to-signal-blue" />
      {children}
    </div>
  );
}

interface TimelineItemProps {
  title: string;
  subtitle?: string;
  date: string;
  description?: string | string[];
  icon?: React.ReactNode;
  technologies?: string[];
  caseStudyLinks?: CaseStudyLink[];
  className?: string;
  active?: boolean;
  /** Company/org logo — square-ish source recommended, rendered with object-contain, never cropped to a circle */
  logo?: string;
  logoAlt?: string;
}

export function TimelineItem({
  title,
  subtitle,
  date,
  description,
  icon,
  technologies,
  caseStudyLinks,
  className,
  active = false,
  logo,
  logoAlt,
}: TimelineItemProps) {
  return (
    <div className={cn('relative pl-12 pb-8', className)}>
      {/* Icon/Dot */}
      <div
        className={cn(
          'absolute left-0 flex items-center justify-center w-8 h-8 rounded-full border-4 border-white transition-all duration-300',
          active
            ? 'bg-signal-blue shadow-lg shadow-signal-blue/20 scale-110'
            : 'bg-slate-200 hover:bg-signal-blue/10'
        )}
      >
        {icon ? (
          <span className="text-white text-xs">{icon}</span>
        ) : (
          <span className="w-2 h-2 bg-white rounded-full" />
        )}
      </div>

      {/* Content Card */}
      <div className="group">
        <div
          className={cn(
            'p-6 rounded-xl border-2 transition-all duration-300',
            active
              ? 'bg-signal-blue/5 border-signal-blue/20 shadow-md'
              : 'bg-white border-slate-200 hover:border-signal-blue/40 hover:shadow-md'
          )}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
            <div className="flex items-start gap-3">
              {logo && (
                <div className="shrink-0 w-12 h-12 rounded-lg border border-slate-200 bg-white p-1.5 flex items-center justify-center">
                  <Image
                    src={logo}
                    alt={logoAlt ?? `${subtitle ?? title} logo`}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-signal-blue transition-colors">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
                )}
              </div>
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-signal-blue/10 text-signal-blue whitespace-nowrap">
              {date}
            </span>
          </div>

          {/* Description */}
          {description && (
            <div className="text-slate-700 space-y-2 mb-4">
              {Array.isArray(description) ? (
                <ul className="space-y-1.5">
                  {description.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-signal-blue mr-2 mt-1">▹</span>
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm">{description}</p>
              )}
            </div>
          )}

          {/* Technologies */}
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-signal-blue/10 hover:text-signal-blue-hover transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {caseStudyLinks && caseStudyLinks.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Related case studies
              </p>
              <ul className="space-y-2">
                {caseStudyLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={`/case-studies/${link.id}/`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-signal-blue hover:text-signal-blue-hover transition-colors duration-200 cursor-pointer"
                    >
                      <FileText className="w-4 h-4 shrink-0" aria-hidden />
                      <span className="line-clamp-1">{link.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
