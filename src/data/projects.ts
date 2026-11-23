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
    description: 'Developed a CNN-based lip-reading model (53% validation, 93% training accuracy) and built an on-device Flutter app that classifies 36 fruit and vegetable classes (78.56% validation accuracy).',
    longDescription: 'This project combines computer vision and deep learning to create two applications. The lip-reading model uses CNN architecture trained on the MIRACL-VC1 dataset, while the fruit detection app (MobileNetV2 transfer learning, TensorFlow Lite) helps users identify and classify fruits and vegetables on-device through a mobile interface.',
    technologies: ['Python', 'CNN', 'Flutter', 'TensorFlow Lite', 'MobileNetV2', 'Deep Learning', 'Computer Vision', 'Mobile Development'],
    github: 'https://github.com/patelsahil2k03/Fruit-Detection-App',
    category: 'ml',
    featured: true,
    metrics: [
      { label: 'Fruit model validation accuracy', value: '78.56%' },
      { label: 'Lip-reading dataset', value: '3,115 images' },
      { label: 'Lip-reading training accuracy', value: '93%' },
      { label: 'Lip-reading validation accuracy', value: '53%' },
    ],
  },
  {
    id: 'meal-chatbot-sales-prediction',
    title: 'Meal Subscription Chatbot & Sales Forecasting',
    description: 'Designed an AI chatbot for meal subscriptions using LangChain and built a sales forecasting model with 93.17% accuracy using CNN+LSTM.',
    longDescription: 'An intelligent meal subscription system powered by LangChain and OpenAI that automates customer interactions. Combined with advanced time series forecasting using hybrid CNN+LSTM, Random Forest, ARIMA, and SARIMAX models to predict sales with high accuracy.',
    technologies: ['Next.js', 'LangChain', 'OpenAI', 'Python', 'MongoDB', 'CNN', 'LSTM', 'Time Series', 'AWS Sagemaker', 'MRKL Systems', 'Random Forest', 'ARIMA', 'SARIMAX'],
    category: 'ml',
    featured: true,
    metrics: [
      { label: 'Forecast Accuracy', value: '93.17%' },
      { label: 'Models Used', value: '4+' },
      { label: 'Experimentation', value: 'AWS Sagemaker' },
    ],
  },
  {
    id: 'question-paper-quality',
    title: 'Pre-Exam Question Paper Quality Test',
    description: 'Developed an AI-driven system to categorize and score exam papers, achieving 98.04% accuracy with BERT, LSTM and Bi-LSTM models.',
    longDescription: 'AI system for educational assessment that evaluates the quality of question papers based on various parameters including Bloom\'s Taxonomy levels, difficulty distribution, and cognitive skills assessment. Published in Springer ICTIS 2024.',
    technologies: ['Python', 'BERT', 'LSTM', 'Bi-LSTM', 'NLP', 'Deep Learning', 'GloVe', 'SkipGram', 'Bag of Words', 'RNN', 'Bi-RNN'],
    paper: 'https://doi.org/10.1007/978-981-97-6681-9_11',
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
    description: 'Built a MEAN-stack web app for student, faculty and admin management, with authentication and role-based workflows.',
    longDescription: 'Full-stack MEAN application designed to digitize and streamline tuition class operations. Features include student enrollment, attendance tracking, fee management, assignment submission, and reporting for administrators.',
    technologies: ['TypeScript', 'Angular', 'Node.js', 'MongoDB', 'Express', 'CSS', 'Git', 'Authentication', 'JWT'],
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
    paper: 'https://doi.org/10.1063/5.0254155',
    category: 'research',
    featured: true,
    metrics: [
      { label: 'Publication', value: 'AIP ICRAIC 2024' },
      { label: 'Models Tested', value: '3 YOLOv8 variants' },
      { label: 'Indexing', value: 'Scopus' },
    ],
  },
  {
    id: 'foresight-hackathon',
    title: 'ForeSight - IT Project Risk Prediction',
    description: 'Built an ML platform that predicts operational risk in IT projects in 24 hours; Top 10 at the AI-Manthan Hackathon by AtliQ Technologies.',
    longDescription: 'Built in 24 hours at the AI-Manthan Hackathon: risk-prediction dashboards, anomaly detection, cost-overrun forecasting and automated reporting, with a FastAPI backend, Next.js 15 frontend, PostgreSQL with dbt transformations, and Docker.',
    technologies: ['Python', 'FastAPI', 'Next.js 15', 'PostgreSQL', 'dbt', 'Docker', 'Machine Learning', 'Predictive Analytics', 'Monorepo'],
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
