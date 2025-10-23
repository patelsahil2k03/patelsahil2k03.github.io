'use client';

import React, { useState } from 'react';
import { projects, projectCategories } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Github, ExternalLink, BookOpen, TrendingUp } from 'lucide-react';

export function Projects() {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="default" size="lg" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Featured <span className="text-blue-600">Work</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            A showcase of AI/ML, Full Stack, and Research projects with real-world impact
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {projectCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === category.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <CardHeader>
                {/* Project Badge */}
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={getCategoryVariant(project.category)}>
                    {getCategoryLabel(project.category)}
                  </Badge>
                  {project.featured && (
                    <Badge variant="secondary" className="animate-pulse">
                      Featured
                    </Badge>
                  )}
                </div>

                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow">
                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {project.metrics.slice(0, 4).map((metric, index) => (
                      <div
                        key={index}
                        className="p-3 bg-slate-50 rounded-lg border border-slate-100"
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <TrendingUp className="w-3 h-3 text-blue-600" />
                          <span className="text-xs text-slate-600">{metric.label}</span>
                        </div>
                        <div className="text-sm font-bold text-slate-900">
                          {metric.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 6).map((tech) => (
                    <Badge key={tech} variant="outline" size="sm">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 6 && (
                    <Badge variant="outline" size="sm">
                      +{project.technologies.length - 6}
                    </Badge>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.github, '_blank')}
                    leftIcon={<Github className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Code
                  </Button>
                )}
                {project.demo && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(project.demo, '_blank')}
                    leftIcon={<ExternalLink className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Demo
                  </Button>
                )}
                {project.paper && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => window.open(project.paper, '_blank')}
                    leftIcon={<BookOpen className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Paper
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Projects CTA */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 mb-4">No projects found in this category.</p>
            <Button onClick={() => setFilter('all')}>View All Projects</Button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-white rounded-full shadow-md">
                  <Github className="w-8 h-8 text-slate-700" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                More Projects on GitHub
              </h3>
              <p className="text-slate-600 mb-6">
                Explore my complete portfolio of open-source projects, contributions, and experiments
              </p>
              <Button
                size="lg"
                variant="primary"
                onClick={() => window.open('https://github.com/patelsahil2k03', '_blank')}
                rightIcon={<ExternalLink className="w-5 h-5" />}
              >
                Visit GitHub Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Helper functions
function getCategoryVariant(category: string): 'default' | 'secondary' | 'success' | 'cyan' {
  const variants: Record<string, any> = {
    ml: 'default',
    web: 'cyan',
    mobile: 'secondary',
    research: 'success',
  };
  return variants[category] || 'default';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    ml: '🤖 ML/AI',
    web: '🌐 Web',
    mobile: '📱 Mobile',
    research: '📚 Research',
  };
  return labels[category] || category;
}
