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
    id: 'client-sde2',
    company: 'Digiflux Technologies Pvt Ltd · client engagement (creator-commerce marketplace platform)',
    role: 'Software Development Engineer II',
    location: 'Remote',
    duration: 'Nov 2025 – Present',
    startDate: '2025-11',
    endDate: 'Present',
    type: 'full-time',
    description: [
      'Founding member of the three-person team: primary developer of the extractor and core services covering 500K+ unique products from 85+ marketplace storefronts in English and Arabic',
      'Built multi-modal semantic search (text and photo) over 6 vector indexes, served by a gRPC service decoupled from the acquisition pipeline',
      'Built the FastAPI orchestrator and operations dashboard that run extraction, categorization and image processing (Cloudflare R2) into PostgreSQL and a MongoDB catalog',
    ],
    technologies: ['Python', 'FastAPI', 'gRPC', 'PostgreSQL', 'MongoDB', 'Pinecone', 'Cloudflare R2'],
  },
  {
    id: 'digiflux-ase',
    company: 'Digiflux Technologies Pvt Ltd',
    role: 'Associate Software Engineer',
    location: 'Vadodara, India',
    duration: 'Jul 2024 – Present',
    startDate: '2024-07',
    endDate: 'Present',
    type: 'full-time',
    description: [
      'Delivered production AI and full-stack systems across FinTech (2M+ users), FoodTech (125K+ customers), HealthTech and e-commerce',
      'Primary developer of the nutrition-scanning service (90%+ accuracy) for a meal-subscription business; migrated its AI Coach from GPT-4 to Gemini after benchmarking',
      'Co-developed the content-automation pipeline for a public-health platform supporting 44,500+ health workers, reducing manual intervention by 40%',
      'Primary developer of the Python gRPC meal-logging service (Google Gemini) and the coach, admin and monitoring dashboards for a fitness and wellness platform, released as a production test launch',
      'Primary developer of the 50+ AWS Lambda scrapers and the market open/close analysis pipeline for a FinTech platform',
      'Developed a LangChain retrieval-augmented assistant for the same public-health platform, taking it from prototype to production (2025)',
      'Received Team Star Award (March 2025) and AI Catalyst 2026 Special Recognition (March 2026) at Digiflux annual townhalls',
      'Built a BLE-integrated React Native app for cafe POS thermal-printer control, handling device pairing and ESC/POS command sequences',
      'Shipped a WhatsApp ordering bot (FastAPI + Supabase + Twilio) for a meal subscription platform',
      'Built LangGraph ReAct agents automating internal Redmine-based workflows'
    ],
    technologies: ['Python', 'FastAPI', 'gRPC', 'Google Gemini', 'OpenAI', 'LangChain', 'AWS Lambda', 'PostgreSQL', 'MongoDB', 'Pinecone', 'TypeScript', 'React', 'Next.js', 'Docker'],
  },
  {
    id: 'digiflux-intern',
    company: 'Digiflux Technologies Pvt Ltd',
    role: 'Python Developer (AI-ML) Intern',
    location: 'Vadodara, India',
    duration: 'Jan 2024 – Jun 2024',
    startDate: '2024-01',
    endDate: '2024-06',
    type: 'internship',
    description: [
      'Developed a CNN+LSTM sales-forecasting model reaching 93.17% accuracy on live sales data, benchmarked against Random Forest, ARIMA and SARIMAX',
      'Gained hands-on experience with Python, LLMs, LangChain, OpenAI, SageMaker (experimentation) and Docker'
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'AWS Sagemaker', 'Docker', 'Machine Learning'],
  },
  {
    id: 'lt-web-intern',
    company: 'L&T Technology Services',
    role: 'C# Developer Intern',
    location: 'Vadodara, India',
    duration: 'May 2023 – July 2023',
    startDate: '2023-05',
    endDate: '2023-07',
    type: 'internship',
    description: [
      'Built web request forms in C# and JavaScript on ASP.NET MVC and ASP.NET Core to streamline client data collection'
    ],
    technologies: ['C#', 'JavaScript', 'ASP.NET MVC', 'ASP.NET Core', 'SQL', 'HTML/CSS'],
  },
  {
    id: 'lt-ml-intern',
    company: 'Larsen & Toubro (L&T Power)',
    role: 'Machine Learning Intern',
    location: 'Vadodara, India',
    duration: 'May 2022 – June 2022',
    startDate: '2022-05',
    endDate: '2022-06',
    type: 'internship',
    description: [
      'Built machine-learning chatbots with the RASA framework (Python, NLP)',
      'Developed web features in ASP.NET'
    ],
    technologies: ['Python', 'RASA', 'NLP', 'Machine Learning', 'ASP.NET'],
  },
  {
    id: 'motorola',
    company: 'Motorola Solutions',
    role: 'Web Development Intern',
    location: 'Bengaluru, India',
    duration: 'May 2022 – Dec 2022',
    startDate: '2022-05',
    endDate: '2022-12',
    type: 'internship',
    description: [
      'Built MEAN-stack applications (MongoDB, Express, Angular, Node.js) with SQL, across front end and back end',
      'Took part in design reviews and team projects'
    ],
    technologies: ['Angular', 'Node.js', 'Express', 'SQL', 'MongoDB', 'JavaScript', 'TypeScript'],
  },
];

export const education = {
  degree: 'B.Tech Computer Engineering',
  university: 'Charotar University of Science and Technology (CHARUSAT)',
  location: 'Gujarat, India',
  duration: '2020 – 2024',
  cgpa: '9.35',
  highlights: [
    'Published 2 research papers in Springer and AIP conferences',
    'Member of CHARUSAT Football Team (2022, 2023)',
    'Core Team Member - CLDC AI/ML Division',
    'Played in the West Zone Inter-University Football Tournament',
    'Presented papers at ICTIS 2024 and ICRAIC 2024 conferences'
  ]
};
