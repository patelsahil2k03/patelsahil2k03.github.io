'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { personalInfo, education, stats } from '@/data';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { Trophy, BookOpen, Briefcase, Award, Code, Target } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';
import { useScrollAnimation } from '@/lib/hooks';

export function About() {
  const { ref, inView } = useScrollAnimation({ threshold: 0.1 });
  
  const highlights = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Top 10 Finalist',
      description: 'AI-Manthan Hackathon among 70+ teams',
      color: 'text-orange-600 bg-orange-100',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '2 Publications',
      description: 'Springer ICTIS & AIP ICRAIC 2024',
      color: 'text-blue-600 bg-blue-100',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Team Star Award',
      description: 'Digiflux Technologies 2024',
      color: 'text-cyan-600 bg-cyan-100',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'National Athlete',
      description: 'CHARUSAT Football Team',
      color: 'text-green-600 bg-green-100',
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white">
      <motion.div 
        ref={ref}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        {/* Section Header */}
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <Badge variant="default" size="lg" className="mb-4">
            About Me
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Where <span className="text-blue-600">Data Science</span> Meets{' '}
            <span className="text-orange-500">Determination</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            A unique blend of athletic discipline and technical expertise
          </p>
        </motion.div>

        <motion.div className="grid lg:grid-cols-2 gap-12 items-start" variants={staggerContainer}>
          {/* Left Column - Story */}
          <motion.div className="space-y-6" variants={staggerItem}>
            <Card className="border-2 border-blue-100 hover:border-blue-300 transition-colors">
              <CardContent className="p-8">
                <div className="space-y-4 text-slate-700 leading-relaxed">
                  <p className="text-lg">
                    I&apos;m a <strong className="text-blue-600">passionate technologist</strong> who believes 
                    that the best solutions come from understanding both the problem and the people it affects. 
                    My journey spans from the football field to cutting-edge AI research, proving that 
                    <strong className="text-orange-500"> discipline and determination</strong> transcend domains.
                  </p>
                  
                  <p>
                    With a <strong className="text-blue-600">{education.cgpa} CGPA</strong> from {education.university}, 
                    I&apos;ve published <strong>{stats.publications} research papers</strong> in renowned conferences while 
                    gaining hands-on industry experience at companies like <strong>Digiflux Technologies</strong>, 
                    <strong> L&T</strong>, and <strong>Motorola Solutions</strong>.
                  </p>

                  <p>
                    What sets me apart is my ability to <strong className="text-cyan-600">bridge multiple worlds</strong>:
                  </p>

                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">▹</span>
                      <span>
                        <strong>Technical Excellence</strong>: From building production-grade ML systems with 
                        LangChain and AWS to creating NLP models with 98%+ accuracy
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">▹</span>
                      <span>
                        <strong>Athletic Discipline</strong>: National-level football player, balancing 
                        sports and academics with equal commitment
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2 mt-1">▹</span>
                      <span>
                        <strong>Research Mindset</strong>: Published researcher with papers indexed in 
                        SCOPUS and Web of Science
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">▹</span>
                      <span>
                        <strong>Problem Solving</strong>: 100+ LeetCode problems solved, hackathon winner, 
                        and continuous learner
                      </span>
                    </li>
                  </ul>

                  <div className="pt-4 border-t border-slate-200">
                    <p className="text-base italic text-slate-600">
                      &quot;Technical excellence without business intelligence is just an expensive hobby. 
                      Understanding the <strong>why</strong> behind what you&apos;re building transforms 
                      engineers into problem-solvers.&quot;
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {stats.certifications}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Certifications
                  </div>
                </CardContent>
              </Card>
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {stats.hackathons}
                  </div>
                  <div className="text-sm text-slate-600 font-medium">
                    Hackathons
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Right Column - Highlights & Education */}
          <motion.div className="space-y-8" variants={staggerItem}>
            {/* Key Highlights */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Key Highlights
              </h3>
              <motion.div className="grid sm:grid-cols-2 gap-4" variants={staggerContainer}>
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-300 h-full">
                      <CardContent className="p-6">
                        <div className={`inline-flex p-3 rounded-lg ${highlight.color} mb-4`}>
                          {highlight.icon}
                        </div>
                        <h4 className="font-bold text-slate-900 mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {highlight.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Education */}
            <Card className="border-2 border-slate-100 hover:border-blue-200 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {education.degree}
                    </h3>
                    <p className="text-slate-600 mb-2">
                      {education.university}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="default">{education.duration}</Badge>
                      <Badge variant="success">CGPA: {education.cgpa}/10</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900 mb-3">
                    Academic Highlights:
                  </h4>
                  <ul className="space-y-2">
                    {education.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start text-sm text-slate-700">
                        <span className="text-blue-500 mr-2 mt-0.5">✓</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Current Focus */}
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-100">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">
                      Currently Building
                    </h4>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      Working on production-grade AI/ML systems at <strong>Digiflux Technologies</strong>, 
                      integrating LLMs, deploying scalable solutions on AWS, and exploring the 
                      intersection of AI with real-world business problems.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
