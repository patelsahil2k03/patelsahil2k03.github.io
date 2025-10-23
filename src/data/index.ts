// Central export point for all data

export { personalInfo } from './personal';
export { experiences, education, highSchool } from './experience';
export type { Experience } from './experience';
export { skillCategories, topSkills } from './skills';
export type { SkillCategory, Skill } from './skills';
export { projects, featuredProjects, projectCategories } from './projects';
export type { Project } from './projects';
export { 
  achievements, 
  achievementsByCategory, 
  highlightedAchievements 
} from './achievements';
export type { Achievement } from './achievements';
export { testimonials, quotes, milestones } from './testimonials';
export type { Testimonial } from './testimonials';

// Statistics for hero/about section
export const stats = {
  experience: '1+ Years',
  projects: '6+',
  publications: '2',
  cgpa: '9.35',
  certifications: '5+',
  hackathons: '3',
  leetcodeProblems: '100+',
};

// Contact information
export const contact = {
  email: 'patelsahil2k03@gmail.com',
  phone: '+91 7874337475',
  location: 'Vadodara, Gujarat, India',
  availability: 'Open to opportunities',
};

// Social links
export const social = {
  github: {
    url: 'https://github.com/patelsahil2k03',
    username: '@patelsahil2k03',
  },
  linkedin: {
    url: 'https://linkedin.com/in/sahil-patel-581226205',
    username: 'sahil-patel',
  },
  leetcode: {
    url: 'https://leetcode.com/patelsahil2k03',
    username: '@patelsahil2k03',
  },
  twitter: {
    url: '#',
    username: '@sahilpatel',
  },
  email: {
    url: 'mailto:patelsahil2k03@gmail.com',
    display: 'patelsahil2k03@gmail.com',
  },
};

// SEO metadata
export const seo = {
  title: 'Sahil Patel | AI/ML Engineer & Full Stack Developer',
  description: 'Associate Software Engineer specializing in AI/ML, Full Stack Development, and Cloud Computing. Published researcher with 9.35 CGPA from CHARUSAT. Passionate footballer and data scientist.',
  keywords: [
    'Sahil Patel',
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Data Scientist',
    'React',
    'Next.js',
    'Python',
    'CHARUSAT',
    'Digiflux Technologies',
    'Research',
    'Football',
  ],
  og: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Sahil Patel Portfolio',
  },
};
