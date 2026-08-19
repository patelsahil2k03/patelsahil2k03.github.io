export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  paper?: string;
  image?: string;
  category: 'ml' | 'web' | 'mobile' | 'research';
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'lip-reading-fruit-detection',
    title: 'Lip Reading Word Classification & Fruit Detection',
    description: 'Developed a CNN-based lip-reading model achieving 93% training accuracy and built a mobile app for fruit & vegetable classification with 88% accuracy.',
    longDescription: 'This project combines computer vision and deep learning to create two powerful applications. The lip-reading model uses CNN architecture trained on the MIRACL-VC1 dataset, while the fruit detection app helps users identify and classify fruits and vegetables using a mobile interface.',
    technologies: ['Python', 'CNN', 'Flutter', 'Deep Learning', 'TensorFlow', 'Computer Vision', 'Mobile Development'],
    github: 'https://github.com/patelsahil2k03/lip-reading-project',
    category: 'ml',
    featured: true,
    metrics: [
      { label: 'Training Accuracy', value: '93%' },
      { label: 'Validation Accuracy', value: '53%' },
      { label: 'Fruit Detection Accuracy', value: '88%' },
      { label: 'Dataset Size', value: '3,115 images' },
    ],
  },
  {
    id: 'meal-chatbot-sales-prediction',
    title: 'Meal Subscription Chatbot & Sales Forecasting',
    description: 'Designed an AI chatbot for meal subscriptions using LangChain and built a sales forecasting model with 93.17% accuracy using CNN+LSTM.',
    longDescription: 'An intelligent meal subscription system powered by LangChain and OpenAI that automates customer interactions. Combined with advanced time series forecasting using hybrid CNN+LSTM, Random Forest, ARIMA, and SARIMAX models to predict sales with high accuracy.',
    technologies: ['Next.js', 'LangChain', 'OpenAI', 'Python', 'MongoDB', 'CNN', 'LSTM', 'Time Series', 'AWS Sagemaker', 'MRKL Systems', 'Random Forest', 'ARIMA', 'SARIMAX'],
    github: 'https://github.com/patelsahil2k03/meal-chatbot',
    category: 'ml',
    featured: true,
    metrics: [
      { label: 'Forecast Accuracy', value: '93.17%' },
      { label: 'Models Used', value: '4+' },
      { label: 'Deployment', value: 'AWS Sagemaker' },
    ],
  },
  {
    id: 'question-paper-quality',
    title: 'Pre-Exam Question Paper Quality Test',
    description: 'Developed an AI-driven system to categorize and score exam papers, achieving 98.04% accuracy using advanced NLP techniques.',
    longDescription: 'Revolutionary AI system for educational assessment that automatically evaluates the quality of question papers based on various parameters including Bloom\'s Taxonomy levels, difficulty distribution, and cognitive skills assessment. Published in Springer ICTIS 2024.',
    technologies: ['Python', 'BERT', 'LSTM', 'Bi-LSTM', 'NLP', 'Deep Learning', 'GloVe', 'SkipGram', 'Bag of Words', 'RNN', 'Bi-RNN'],
    github: 'https://github.com/patelsahil2k03/question-paper-analysis',
    paper: 'https://lnkd.in/dwVVjngv',
    category: 'research',
    featured: true,
    metrics: [
      { label: 'Accuracy', value: '98.04%' },
      { label: 'Dataset Size', value: '2,809 instances' },
      { label: 'Publication', value: 'Springer ICTIS 2024' },
    ],
  },
  {
    id: 'vcc-point',
    title: 'Tuition Classes Management System (VCC POINT)',
    description: 'Engineered a comprehensive web app for student, faculty, and admin management with secure authentication and optimized workflows.',
    longDescription: 'Full-stack MEAN application designed to digitize and streamline tuition class operations. Features include student enrollment, attendance tracking, fee management, assignment submission, and comprehensive reporting for administrators.',
    technologies: ['TypeScript', 'Angular', 'Node.js', 'MongoDB', 'Express', 'CSS', 'Git', 'Authentication', 'JWT'],
    github: 'https://github.com/patelsahil2k03/vcc-point',
    category: 'web',
    featured: false,
    metrics: [
      { label: 'User Roles', value: '3' },
      { label: 'Features', value: '15+' },
    ],
  },
  {
    id: 'bird-detection-yolo',
    title: 'Small Bird Detection in Aerial Imagery',
    description: 'Enhanced small object detection using YOLOv8 architecture for aerial imagery, published in AIP ICRAIC 2024 conference.',
    longDescription: 'Research project addressing the challenging problem of detecting small objects in aerial imagery, specifically focusing on small bird detection. Benchmarked multiple YOLOv8 variants (yolov8n, yolov8m, yolov8x) to identify the optimal model for real-world applications in avian ecology and drone surveillance.',
    technologies: ['Python', 'YOLOv8', 'Computer Vision', 'Deep Learning', 'Object Detection', 'Research', 'Aerial Imagery'],
    github: 'https://github.com/patelsahil2k03/bird-detection-yolo',
    paper: 'https://lnkd.in/dNa4QXkW',
    category: 'research',
    featured: true,
    metrics: [
      { label: 'Publication', value: 'AIP ICRAIC 2024' },
      { label: 'Models Tested', value: '3 YOLOv8 variants' },
      { label: 'Indexing', value: 'Scopus, Web of Science' },
    ],
  },
  {
    id: 'foresight-hackathon',
    title: 'ForeSight - IT Project Risk Prediction',
    description: 'Built an enterprise-grade ML-powered platform for predicting operational risks in IT projects. Top 10 finalist at AI-Manthan Hackathon by AtliQ Technologies.',
    longDescription: 'Developed in 24 hours at AI-Manthan Hackathon. ForeSight is a production-ready platform featuring real-time risk prediction dashboards, anomaly detection, cost overrun forecasting, and automated reporting. Built with FastAPI backend, Next.js 15 frontend, PostgreSQL with dbt transformations, all containerized with Docker.',
    technologies: ['Python', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'dbt', 'Docker', 'Machine Learning', 'Predictive Analytics', 'Monorepo'],
    github: 'https://github.com/patelsahil2k03/foresight',
    category: 'ml',
    featured: true,
    metrics: [
      { label: 'Development Time', value: '24 hours' },
      { label: 'Achievement', value: 'Top 10/70+' },
      { label: 'Team', value: 'Team Innovatrix' },
    ],
  },
];

export const featuredProjects = projects.filter(p => p.featured);

export const projectCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'ml', label: 'Machine Learning' },
  { id: 'web', label: 'Web Development' },
  { id: 'mobile', label: 'Mobile Apps' },
  { id: 'research', label: 'Research' },
];
