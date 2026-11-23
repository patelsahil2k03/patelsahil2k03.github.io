export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  category: 'award' | 'publication' | 'certification' | 'hackathon' | 'event' | 'badge';
  icon?: string;
  link?: string;
  /** Case study that explains this work (publications), by id in caseStudies.ts. */
  caseStudyId?: string;
  image?: string;
  metrics?: string;
}

export const achievements: Achievement[] = [
  // Awards & Recognition
  {
    id: 'ai-catalyst-2026',
    title: 'AI Catalyst 2026, Special Recognition',
    organization: 'Digiflux Technologies',
    date: 'March 2026',
    description: 'Special Recognition at the Second Annual Townhall for advancing AI-driven solutions, one year after Team Star, reflecting the shift from learning the ropes to building AI systems that run in production.',
    category: 'award',
    metrics: 'Second Annual Townhall',
  },
  {
    id: 'team-star-award',
    title: 'Team Star Award',
    organization: 'Digiflux Technologies',
    date: 'March 2025',
    description: 'Recognized at the first Annual Townhall for work across multiple projects in my first nine months.',
    category: 'award',
    metrics: 'First Annual Townhall',
  },
  {
    id: 'ai-manthan-top10',
    title: 'Top 10 Finalist - AI-Manthan Hackathon',
    organization: 'AtliQ Technologies',
    date: 'October 2025',
    description: 'Top 10 of 70+ proposals with ForeSight, an ML system that predicts operational risk in IT projects.',
    category: 'hackathon',
    metrics: 'Top 10 out of 70+ proposals',
  },
  {
    id: 'odoo-hackathon-2026',
    title: 'Finalist - Odoo Hackathon 2026',
    organization: 'Odoo',
    date: '2026',
    description: 'Team Innovatrix reached the finals (857 teams advanced from 20,000+ registered) through an 8-hour virtual round, then built through a 22-hour on-site finale in Gandhinagar.',
    category: 'hackathon',
    metrics: 'Finals: 857 of 20,000+ teams',
  },
  {
    id: 'kanad-shield-2026',
    title: 'Kanad S.H.I.E.L.D. 2026 Hackathon',
    organization: 'Ahmedabad City Police Cyber Crime Branch and i-Hub Gujarat',
    date: '2026',
    description: 'Built an early-warning system for burnout among police personnel working long, high-stress shifts.',
    category: 'hackathon',
  },
  {
    id: 'charusat-convocation',
    title: 'B.Tech Graduation with 9.35 CGPA',
    organization: 'CHARUSAT - 14th Convocation',
    date: 'January 2025',
    description: 'Graduated in Computer Engineering from Charotar University of Science and Technology with a 9.35 CGPA (14th Convocation, 4 January 2025).',
    category: 'award',
    metrics: 'CGPA: 9.35/10',
  },

  // Research Publications
  {
    id: 'springer-ictis-2024',
    title: 'Revolutionizing Educational Assessment: Deep Learning for Question Paper Quality Evaluation',
    organization: 'Springer Nature - ICTIS 2024',
    date: 'November 2024',
    description: 'Published 13 November 2024 in ICT for Intelligent Systems (ICTIS 2024), Lecture Notes in Networks and Systems, pp. 119–129; presented at ICTIS 2024, Ahmedabad, April 2024. First of six authors. The LNNS series is indexed in Scopus.',
    category: 'publication',
    link: 'https://doi.org/10.1007/978-981-97-6681-9_11',
    caseStudyId: 'edtech-question-paper-nlp',
    metrics: 'First author | Scopus-indexed series',
  },
  {
    id: 'aip-icraic-2024',
    title: 'Enhancing Small Object Detection in Aerial Imagery Using YOLOv8 Architecture: A Study on Small Birds Detection',
    organization: 'AIP Conference Proceedings - ICRAIC 2024',
    date: '2025',
    description: 'Published in AIP Conference Proceedings 3255, 030001 (2025); presented at the International Conference on Robotics, Automation, and Intelligent Computing (ICRAIC 2024, online) in May 2024. Fourth of four authors.',
    category: 'publication',
    link: 'https://doi.org/10.1063/5.0254155',
    caseStudyId: 'bird-detection-aerial',
    metrics: 'Co-author | AIP Conf. Proc. 3255',
  },

  // Certifications
  {
    id: 'nvidia-certified',
    title: 'NVIDIA Certified: AI & Deep Learning',
    organization: 'NVIDIA',
    date: '2024',
    description: 'Certified in AI and Deep Learning fundamentals by NVIDIA.',
    category: 'certification',
    metrics: '1x NVIDIA Certified',
  },
  {
    id: 'google-cloud-2023',
    title: 'Google Cloud Computing Foundations',
    organization: 'Google Cloud Study Jam 2023',
    date: 'November 2023',
    description: 'Completed 8 badges covering infrastructure, networking, data, ML, security, storage, and cloud resource management on Google Cloud Platform.',
    category: 'certification',
    link: 'https://www.cloudskillsboost.google/public_profiles/eeec0586-9c5b-4617-aef1-93c8b11d6907',
    metrics: '8 Badges Earned',
  },
  {
    id: 'google-cloud-2022',
    title: 'Cloud Engineer Learning Path',
    organization: 'Google Cloud Career Practitioners 2022',
    date: 'December 2022',
    description: 'Completed Cloud Engineer Learning Path with hands-on labs covering Google Cloud infrastructure, storage, and networking.',
    category: 'certification',
    link: 'https://www.cloudskillsboost.google/public_profiles/a5a49bb3-65ef-4a80-9143-71e70da46006',
  },
  {
    id: 'nptel-cloud',
    title: 'NPTEL Cloud Computing (Elite Certificate)',
    organization: 'IIT Kharagpur',
    date: 'December 2023',
    description: 'Completed 12-week Cloud Computing course with 66% score (Elite Certificate). Covered cloud architecture, service management, security, and cutting-edge research including Fog Computing.',
    category: 'certification',
    metrics: 'Elite Certificate | 66% Score',
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner',
    organization: 'CHARUSAT - AWS Academy',
    date: 'October 2023',
    description: 'Completed the AWS Cloud Practitioner course delivered through AWS Academy at CHARUSAT and passed the university-level exam covering cloud fundamentals.',
    category: 'certification',
  },

  // Competitive Programming & Badges
  {
    id: 'leetcode-100days',
    title: 'LeetCode 100 Days Badge',
    organization: 'LeetCode',
    date: '2023',
    description: 'Achieved 100 Days Badge by solving problems consistently for 100+ days in 2023.',
    category: 'badge',
    link: 'https://leetcode.com/patelsahil2k03',
    metrics: '100+ Days Streak',
  },

  // Events & Conferences
  {
    id: 'indoml-2022',
    title: 'Indian Symposium on Machine Learning (IndoML)',
    organization: 'IIT Gandhinagar',
    date: 'December 2022',
    description: 'Attended the third edition of IndoML hosted by IIT Gandhinagar. Met research groups and heard current ML research from the people doing it.',
    category: 'event',
  },
  {
    id: 'ictis-2024-presentation',
    title: 'Paper Presentation at ICTIS 2024',
    organization: 'ICTIS 2024, Ahmedabad',
    date: 'April 2024',
    description: 'Presented research paper on "Deep Learning for Question Paper Quality Evaluation" at the 8th International Conference on Information and Communication Technology for Intelligent Systems.',
    category: 'event',
  },
  {
    id: 'icraic-2024-presentation',
    title: 'Paper Presentation at ICRAIC 2024',
    organization: 'RAME (Online)',
    date: 'May 2024',
    description: 'Presented research on "Small Bird Detection using YOLOv8" at the Second International Conference on Robotics, Automation, and Intelligent Computing.',
    category: 'event',
  },
  {
    id: 'azadi-hackathon-2022',
    title: 'Azadi Ka Amrit Mahotsav Hackathon',
    organization: 'Education Department, Govt. of Gujarat',
    date: 'March 2022',
    description: 'Took part in the regional round of the Gujarat Education Department’s hackathon, hosted by CHARUSAT. Built a chatbot for GTU with RASA, Flutter and Firebase in 36 hours.',
    category: 'hackathon',
    metrics: '36-hour Hackathon',
  },
  {
    id: 'maker-fest-2023',
    title: 'Maker Fest Vadodara 2023',
    organization: 'Yuvalay MakerSpace & Vadodara Innovation Council',
    date: 'January 2023',
    description: 'Volunteered as content writer, interviewing and documenting innovations by makers and enthusiasts. Co-hosted by The Maharaja Sayajirao University of Baroda.',
    category: 'event',
  },

  // Student Organizations
  {
    id: 'cldc-core-team',
    title: 'AI/ML Core Team Member',
    organization: 'CLDC - CHARUSAT Learning And Development Club',
    date: '2023',
    description: 'Selected for the AI/ML core team of the university’s student-led learning and development club (March to November 2023).',
    category: 'award',
  },

  // Sports Achievements
  {
    id: 'football-team-2023',
    title: 'CHARUSAT Football Team, West Zone Inter-University Tournament',
    organization: 'West Zone Inter-University Football Tournament',
    date: '2023',
    description: 'Represented CHARUSAT at the West Zone Inter-University Football Tournament 2023.',
    category: 'award',
    metrics: 'University team',
  },
  {
    id: 'football-team-2022',
    title: 'CHARUSAT Football Team, West Zone Inter-University Tournament',
    organization: 'West Zone Inter-University Football Tournament',
    date: '2022',
    description: 'Represented CHARUSAT at the West Zone Inter-University Football Tournament 2022.',
    category: 'award',
    metrics: 'University team',
  },
];

export const achievementsByCategory = {
  awards: achievements.filter(a => a.category === 'award'),
  publications: achievements.filter(a => a.category === 'publication'),
  certifications: achievements.filter(a => a.category === 'certification'),
  hackathons: achievements.filter(a => a.category === 'hackathon'),
  events: achievements.filter(a => a.category === 'event'),
  badges: achievements.filter(a => a.category === 'badge'),
};

export const highlightedAchievements = [
  achievements.find(a => a.id === 'ai-catalyst-2026'),
  achievements.find(a => a.id === 'ai-manthan-top10'),
  achievements.find(a => a.id === 'team-star-award'),
  achievements.find(a => a.id === 'springer-ictis-2024'),
  achievements.find(a => a.id === 'aip-icraic-2024'),
  achievements.find(a => a.id === 'charusat-convocation'),
  achievements.find(a => a.id === 'leetcode-100days'),
].filter(Boolean);
