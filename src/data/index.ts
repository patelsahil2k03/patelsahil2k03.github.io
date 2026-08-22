// Central export point for all data

import { personalInfo } from './personal';

export { personalInfo };
export { experiences, education } from './experience';
export type { Experience } from './experience';
export { skillCategories, topSkills } from './skills';
export type { SkillCategory, Skill } from './skills';
export { projects, featuredProjects, projectCategories } from './projects';
export type { Project } from './projects';
export {
  caseStudies,
  featuredCaseStudies,
  homepageFeaturedCaseStudies,
  caseStudyFilters,
  caseStudyTypeLabels,
} from './caseStudies';
export type { CaseStudy, CaseStudyType, CaseStudyArticleSection } from './caseStudies';
export { 
  achievements, 
  achievementsByCategory, 
  highlightedAchievements 
} from './achievements';
export type { Achievement } from './achievements';

// Statistics for hero/about section
export const stats = {
  experience: '2+ Years',
  projects: '6+',
  publications: '2',
  cgpa: '9.35',
  certifications: '5+',
  hackathons: '3',
  leetcodeProblems: '100+',
  // Impact metrics
  usersServed: '2M+',
  accuracy: '93%+',
  technologiesUsed: '50+',
  customersSupported: '125K+',
};

// Contact information
export const contact = {
  email: 'patelsahil2k03@gmail.com',
  phone: '+91 7874337475',
  location: 'Vadodara, Gujarat, India',
  availability: 'Open to opportunities',
};

// Social links (aligned with personalInfo.social)
export const social = {
  github: {
    url: personalInfo.social.github,
    username: '@patelsahil2k03',
  },
  linkedin: {
    url: personalInfo.social.linkedin,
    username: 'sahil-patel',
  },
  leetcode: {
    url: personalInfo.social.leetcode,
    username: '@patelsahil2k03',
  },
  medium: {
    url: personalInfo.social.medium,
    username: '@patelsahil2k03',
  },
  googleScholar: {
    url: personalInfo.social.googleScholar,
    username: 'Google Scholar',
  },
  email: {
    url: `mailto:${personalInfo.email}`,
    display: personalInfo.email,
  },
};

// SEO metadata
export const seo = {
  title: 'Sahil Patel | AI/ML Engineer & Full Stack Developer',
  description: "Associate Software Engineer building production AI and full-stack systems across FinTech, FoodTech, and HealthTech — 2M+ users served. Published researcher, CHARUSAT '24.",
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
