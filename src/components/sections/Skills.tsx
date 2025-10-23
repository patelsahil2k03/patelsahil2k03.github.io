'use client';

import React, { useState } from 'react';
import { skillCategories } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const displayedCategories = selectedCategory
    ? skillCategories.filter(cat => cat.category === selectedCategory)
    : skillCategories;

  return (
    <section id="skills" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="default" size="lg" className="mb-4">
            Skills & Technologies
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Tech <span className="text-blue-600">Stack</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            50+ technologies across AI/ML, Full Stack Development, Cloud, and more
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Skills
            </button>
            {skillCategories.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category.category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category, index) => {
            // Alternate card sizes for bento layout
            const isLarge = index % 5 === 0;
            const isMedium = index % 3 === 0 && !isLarge;
            
            return (
              <Card
                key={category.category}
                className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  isLarge ? 'md:col-span-2' : isMedium ? 'md:row-span-2' : ''
                }`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                      <div className="w-6 h-6 text-blue-600 font-bold flex items-center justify-center">
                        {getCategoryIcon(category.category)}
                      </div>
                    </div>
                    <span className="text-xl">{category.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group/skill relative">
                        <Badge
                          variant={getSkillVariant(skill.proficiency)}
                          className="cursor-pointer hover:scale-110 transition-transform"
                        >
                          {skill.name}
                        </Badge>
                        {/* Proficiency tooltip */}
                        {skill.proficiency && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover/skill:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Proficiency: {skill.proficiency}%
                            <div className="w-full h-1 bg-slate-700 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-blue-400 rounded-full"
                                style={{ width: `${skill.proficiency}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Proficiency Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-slate-600">Expert (90%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-slate-600">Advanced (80-89%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
            <span className="text-slate-600">Intermediate (70-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span className="text-slate-600">Developing (60-69%)</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper functions
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'Languages': '🔤',
    'Frameworks & Libraries': '⚛️',
    'AI/ML & Data Science': '🤖',
    'Cloud & DevOps': '☁️',
    'Databases': '💾',
    'Tools & Platforms': '🛠️',
  };
  return icons[category] || '💻';
}

function getSkillVariant(proficiency?: number): 'default' | 'success' | 'secondary' | 'cyan' | 'outline' {
  if (!proficiency) return 'default';
  if (proficiency >= 90) return 'success';
  if (proficiency >= 80) return 'default';
  if (proficiency >= 70) return 'cyan';
  return 'secondary';
}
