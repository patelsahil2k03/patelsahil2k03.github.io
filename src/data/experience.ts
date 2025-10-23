export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  startDate: string;
  endDate: string;
  description: string[];
  technologies: string[];
  logo?: string;
  type: 'full-time' | 'internship' | 'training';
}

export const experiences: Experience[] = [
  {
    id: 'digiflux-ase',
    company: 'Digiflux Technologies Pvt Ltd',
    role: 'Associate Software Engineer',
    location: 'Vadodara, India',
    duration: 'Jan 2024 – Present',
    startDate: '2024-01',
    endDate: 'Present',
    type: 'full-time',
    description: [
      'Developing and integrating AI models for production-grade applications',
      'Built responsive UIs using React.js, ensuring seamless user experience',
      'Collaborating with cross-functional teams to deliver high-quality software',
      'Deployed & managed ML applications with LangChain, OpenAI, AWS Sagemaker, Docker',
      'Received Team Star Award for outstanding contribution and performance'
    ],
    technologies: ['Python', 'React.js', 'LangChain', 'OpenAI', 'AWS Sagemaker', 'Docker', 'MongoDB', 'Next.js'],
  },
  {
    id: 'digiflux-intern',
    company: 'Digiflux Technologies Pvt Ltd',
    role: 'Python Developer (AI-ML) Intern',
    location: 'Vadodara, India',
    duration: 'Aug 2023 – Dec 2023',
    startDate: '2023-08',
    endDate: '2023-12',
    type: 'internship',
    description: [
      'Focused on learning and implementing end-to-end ML applications',
      'Gained hands-on experience with Python, LLMs, Langchain, OpenAI, Sagemaker, Docker',
      'Deepened understanding of AI-ML workflows and contributed to real-world projects',
      'Adapted to corporate culture and collaborated with experienced professionals'
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'AWS Sagemaker', 'Docker', 'Machine Learning'],
  },
  {
    id: 'lt-web-intern',
    company: 'Larson & Toubro Technology Services',
    role: 'Web Development Intern',
    location: 'Vadodara, India',
    duration: 'May 2023 – July 2023',
    startDate: '2023-05',
    endDate: '2023-07',
    type: 'internship',
    description: [
      'Designed and implemented web request forms for client interactions',
      'Streamlined client interactions and data collection using C# and JavaScript',
      'Worked with ASP.NET MVC and ASP.NET Core frameworks',
      'Collaborated with skilled professionals and gained practical industry insights'
    ],
    technologies: ['C#', 'JavaScript', 'ASP.NET MVC', 'ASP.NET Core', 'SQL', 'HTML/CSS'],
  },
  {
    id: 'lt-ml-intern',
    company: 'Larson & Toubro Energy-Power',
    role: 'Machine Learning Intern',
    location: 'Vadodara, India',
    duration: 'May 2022 – June 2022',
    startDate: '2022-05',
    endDate: '2022-06',
    type: 'internship',
    description: [
      'Developed AI Chatbots using RASA framework',
      'Worked on NLP and conversational AI projects',
      'Applied machine learning concepts to real-world problems',
      'Gained experience in Python and NLP libraries'
    ],
    technologies: ['Python', 'RASA', 'NLP', 'Machine Learning', 'ASP.NET'],
  },
  {
    id: 'motorola',
    company: 'Motorola Solutions',
    role: 'Internship Trainee',
    location: 'Bangalore, India',
    duration: 'May 2022 – Nov 2022',
    startDate: '2022-05',
    endDate: '2022-11',
    type: 'training',
    description: [
      'MEAN Stack Developer Role and Elective Course Proficiency',
      'Specialized in Node, Express, Angular, SQL',
      'Covered wide range of technologies in front-end and back-end development',
      'Participated in design reviews, group discussions, and collaborative projects'
    ],
    technologies: ['Angular', 'Node.js', 'Express', 'SQL', 'MongoDB', 'JavaScript', 'TypeScript'],
  },
];

export const education = {
  degree: 'B.Tech Computer Engineering',
  university: 'Charotar University of Science and Technology (CHARUSAT)',
  location: 'Gujarat, India',
  duration: '2020 - 2024',
  cgpa: '9.35',
  highlights: [
    'Published 2 research papers in Springer and AIP conferences',
    'Member of CHARUSAT Football Team (2022, 2023)',
    'Core Team Member - CLDC AI/ML Division',
    'Participated in National West Zone Inter-University Football Tournament',
    'Presented papers at ICTIS 2024 and ICRAIC 2024 conferences'
  ]
};

export const highSchool = {
  school: 'Parth School of Science and Competition',
  board: 'HSC - GSEB',
  location: 'Vadodara, India',
  duration: '2018 - 2020',
  percentage: '82.09'
};
