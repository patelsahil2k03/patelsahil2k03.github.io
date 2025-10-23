'use client';

import React, { useState } from 'react';
import { experiences } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Timeline, TimelineItem } from '@/components/ui/Timeline';
import { Briefcase } from 'lucide-react';

export function Experience() {
  const [filter, setFilter] = useState<'all' | 'full-time' | 'internship' | 'training'>('all');

  const filteredExperiences = filter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === filter);

  return (
    <section id="experience" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="default" size="lg" className="mb-4">
            Experience
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Professional <span className="text-blue-600">Journey</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            1+ years of industry experience across AI/ML, Full Stack Development, and Cloud Computing
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              All Experience
            </button>
            <button
              onClick={() => setFilter('full-time')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'full-time'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Full-Time
            </button>
            <button
              onClick={() => setFilter('internship')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'internship'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Internships
            </button>
            <button
              onClick={() => setFilter('training')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'training'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              Training
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <Timeline>
            {filteredExperiences.map((exp, index) => (
              <TimelineItem
                key={exp.id}
                title={exp.role}
                subtitle={`${exp.company} • ${exp.location}`}
                date={exp.duration}
                description={exp.description}
                technologies={exp.technologies}
                icon={<Briefcase className="w-4 h-4" />}
                active={index === 0 && filter === 'all'}
              />
            ))}
          </Timeline>
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-blue-600 mb-2">5</div>
            <div className="text-sm text-slate-600 font-medium">
              Professional Positions
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-orange-600 mb-2">3</div>
            <div className="text-sm text-slate-600 font-medium">
              Top Companies
            </div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="text-4xl font-bold text-cyan-600 mb-2">1+</div>
            <div className="text-sm text-slate-600 font-medium">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
