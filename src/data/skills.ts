export interface SkillCategory {
  category: string;
  icon?: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  proficiency?: number; // 1-100
  icon?: string;
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    skills: [
      { name: 'Python', proficiency: 90 },
      { name: 'JavaScript', proficiency: 85 },
      { name: 'TypeScript', proficiency: 85 },
      { name: 'C/C++', proficiency: 75 },
      { name: 'C#', proficiency: 70 },
      { name: 'SQL', proficiency: 80 },
      { name: 'HTML/CSS', proficiency: 90 },
    ]
  },
  {
    category: 'Frameworks & Libraries',
    skills: [
      { name: 'Next.js', proficiency: 85 },
      { name: 'React', proficiency: 85 },
      { name: 'Angular', proficiency: 75 },
      { name: 'Node.js', proficiency: 80 },
      { name: 'Express', proficiency: 80 },
      { name: 'LangChain', proficiency: 85 },
      { name: 'TensorFlow', proficiency: 80 },
      { name: 'Scikit-learn', proficiency: 85 },
      { name: 'Pandas', proficiency: 90 },
      { name: 'NumPy', proficiency: 90 },
      { name: 'Matplotlib', proficiency: 80 },
      { name: '.NET', proficiency: 70 },
      { name: 'ASP.NET MVC', proficiency: 70 },
      { name: 'Tailwind CSS', proficiency: 90 },
      { name: 'Material-UI', proficiency: 75 },
      { name: 'Framer Motion', proficiency: 80 },
    ]
  },
  {
    category: 'AI/ML & Data Science',
    skills: [
      { name: 'Machine Learning', proficiency: 90 },
      { name: 'Deep Learning', proficiency: 85 },
      { name: 'Natural Language Processing', proficiency: 85 },
      { name: 'Computer Vision', proficiency: 80 },
      { name: 'BERT', proficiency: 80 },
      { name: 'LSTM/Bi-LSTM', proficiency: 80 },
      { name: 'CNN', proficiency: 85 },
      { name: 'YOLOv8', proficiency: 75 },
      { name: 'Time Series Analysis', proficiency: 80 },
      { name: 'LLMs', proficiency: 85 },
      { name: 'OpenAI API', proficiency: 85 },
    ]
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS Sagemaker', proficiency: 80 },
      { name: 'AWS Lambda', proficiency: 75 },
      { name: 'DynamoDB', proficiency: 75 },
      { name: 'CloudWatch', proficiency: 70 },
      { name: 'Docker', proficiency: 80 },
      { name: 'Git', proficiency: 85 },
      { name: 'GitHub Actions', proficiency: 75 },
    ]
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MongoDB', proficiency: 85 },
      { name: 'PostgreSQL', proficiency: 80 },
      { name: 'SQL Server', proficiency: 75 },
      { name: 'Firebase', proficiency: 70 },
    ]
  },
  {
    category: 'Tools & Platforms',
    skills: [
      { name: 'VS Code', proficiency: 90 },
      { name: 'Jupyter Notebook', proficiency: 90 },
      { name: 'Power BI', proficiency: 75 },
      { name: 'Postman', proficiency: 80 },
      { name: 'Figma', proficiency: 65 },
    ]
  },
];

// For a simpler skills display
export const topSkills = [
  'Python',
  'JavaScript/TypeScript',
  'React/Next.js',
  'Machine Learning',
  'Deep Learning',
  'LangChain',
  'AWS',
  'Docker',
  'MongoDB',
  'TensorFlow',
  'Node.js',
  'SQL',
];
