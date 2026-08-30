export type CaseStudyType = 'production' | 'poc' | 'research' | 'deep-dive' | 'build';

export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudyArticleSection {
  title: string;
  content: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  type: CaseStudyType;
  industry: string;
  hook: string;
  industryContext: string;
  insight: string;
  contribution: string;
  topics: string[];
  metrics: CaseStudyMetric[];
  technologies: string[];
  relatedExperienceId?: string;
  relatedProjectId?: string;
  company?: string;
  period?: string;
  publishedAt?: string;
  featured: boolean;
  readTime: string;
  /** Extra long-form sections for article pages (MDX migration path) */
  articleSections?: CaseStudyArticleSection[];
  /** Optional hero/screenshot — add manually when assets are ready */
  image?: string;
  github?: string;
  paper?: string;
  /** Optional Mermaid diagram definition, rendered on the article page when set */
  architectureDiagram?: string;
}

export const caseStudyTypeLabels: Record<CaseStudyType, string> = {
  production: 'Production',
  poc: 'Proof of Concept',
  research: 'Research',
  'deep-dive': 'Deep Dive',
  build: 'Build & Learn',
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-lambda-scrapers',
    title: 'FinTech Data Pipeline at Scale',
    type: 'production',
    industry: 'FinTech',
    hook: 'How 50+ serverless scrapers keep market and compliance data flowing for millions of users.',
    industryContext:
      'Regulated financial products depend on timely, accurate external data—rates, filings, partner feeds, and market signals. Manual collection does not scale; missed updates create compliance risk and stale customer experiences. Teams typically adopt event-driven, serverless pipelines to isolate failures, control cost per run, and ship new sources without redeploying monoliths.',
    insight:
      'Treat each data source as an independent contract: input schema, retry policy, dead-letter handling, and observability tags. Lambda fits bursty, parallel workloads when cold-start latency is acceptable and payloads stay within service limits. The real engineering win is operational—idempotent writes, structured logs, and alerts on freshness SLAs—not raw scrape count.',
    contribution:
      'Designed and deployed 50+ AWS Lambda scrapers for a FinTech platform, automating collection and normalization across sources. Built resilient scheduling, error handling, and downstream handoff so product teams could trust fresh data without manual ops. Contributed to systems serving 2M+ users alongside broader AI and full-stack work at Digiflux.',
    topics: ['AWS Lambda', 'Serverless', 'Data Engineering', 'FinTech'],
    metrics: [
      { label: 'Lambda functions', value: '50+' },
      { label: 'Users served', value: '2M+' },
      { label: 'Domain', value: 'FinTech' },
    ],
    technologies: ['Python', 'AWS Lambda', 'Docker', 'MongoDB'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – Present',
    publishedAt: '2024-06-01',
    featured: true,
    readTime: '4 min',
  },
  {
    id: 'foodtech-meal-chatbot',
    title: 'Conversational AI for Meal Subscriptions',
    type: 'production',
    industry: 'FoodTech',
    hook: 'LangChain + LLMs powering subscription support for 125K+ customers with 90%+ intent accuracy.',
    industryContext:
      'Meal subscription businesses face high support volume: plan changes, delivery windows, dietary preferences, and billing questions. Rule-based bots break on paraphrases; pure LLM demos hallucinate policies. Production FoodTech stacks combine retrieval, tool calling, and guardrails so answers stay on-brand and auditable.',
    insight:
      'RAG and agent patterns shine when you ground every answer in policy docs and order APIs—not when the model improvises. Measure success on resolution rate and escalation quality, not chat novelty. LangChain helps orchestrate tools, memory, and prompts, but the product boundary (what the bot may never say) matters more than the framework choice.',
    contribution:
      'Engineered a meal subscription chatbot using LangChain and OpenAI, integrated with business workflows and deployed via AWS SageMaker. Tuned prompts, retrieval, and evaluation loops to reach 90%+ accuracy on core customer intents. Supported 125K+ customers while reducing repetitive support load for operations teams.',
    topics: ['LangChain', 'LLMs', 'RAG', 'Customer Support'],
    metrics: [
      { label: 'Customers', value: '125K+' },
      { label: 'AI accuracy', value: '90%+' },
      { label: 'Stack', value: 'LangChain + OpenAI' },
    ],
    technologies: ['Python', 'LangChain', 'OpenAI', 'AWS SageMaker', 'Next.js', 'MongoDB'],
    relatedExperienceId: 'digiflux-ase',
    relatedProjectId: 'meal-chatbot-sales-prediction',
    company: 'Digiflux Technologies',
    period: '2024 – Present',
    publishedAt: '2024-06-01',
    featured: true,
    readTime: '5 min',
  },
  {
    id: 'healthtech-ops-platform',
    title: 'HealthTech Workforce Operations Platform',
    type: 'production',
    industry: 'HealthTech',
    hook: 'A management layer that cut operational friction by 40% for 44K+ healthcare workers.',
    industryContext:
      'Large health programs coordinate field workers, shifts, compliance checklists, and reporting across regions. Spreadsheets and ad-hoc apps create duplicate entry, slow approvals, and weak audit trails. HealthTech platforms need role-based access, offline-tolerant mobile UX, and dashboards leadership can trust.',
    insight:
      'Efficiency gains in ops software come from removing handoffs—single source of truth for tasks, status, and attachments—not from adding features. Mobile-first React Native with a clear API boundary lets you iterate UI while backend rules enforce policy. Measure impact in time-to-complete workflows and error rates, not screen count.',
    contribution:
      'Built a HealthTech management platform improving operational efficiency by 40% for 44K+ workers. Delivered responsive web and React Native experiences, backend integrations, and reporting views aligned with real field workflows. Part of multi-domain production delivery (FinTech, FoodTech, HealthTech) at Digiflux.',
    topics: ['HealthTech', 'React Native', 'Operations', 'Full Stack'],
    metrics: [
      { label: 'Workers supported', value: '44K+' },
      { label: 'Efficiency gain', value: '40%' },
      { label: 'Delivery', value: 'Web + Mobile' },
    ],
    technologies: ['React.js', 'React Native', 'Python', 'MongoDB', 'Docker'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – Present',
    publishedAt: '2024-06-01',
    featured: true,
    readTime: '4 min',
  },
  {
    id: 'sales-forecasting-cnn-lstm',
    title: 'Hybrid CNN+LSTM Sales Forecasting',
    type: 'production',
    industry: 'FoodTech / Analytics',
    hook: 'When classical time-series models plateau, hybrid deep learning can capture complex demand patterns.',
    industryContext:
      'Subscription and QSR businesses forecast demand for inventory, staffing, and promotions. ARIMA and SARIMAX excel on smooth series; sudden campaigns, weather, and holidays introduce non-linear spikes. Teams often ensemble statistical baselines with neural models and validate on hold-out weeks, not just RMSE on training data.',
    insight:
      'CNN layers extract local temporal patterns; LSTM layers model longer dependencies. Comparing Random Forest, ARIMA, SARIMAX, and hybrid nets on the same splits avoids "winner by default." Production forecasting needs reproducible pipelines (SageMaker, versioned features) and stakeholder-readable error bands—not a single leaderboard number.',
    contribution:
      'Implemented a sales forecasting system achieving 93.17% accuracy using a CNN+LSTM hybrid, benchmarked against Random Forest, ARIMA, and SARIMAX. Packaged training and inference for AWS SageMaker deployment alongside the meal subscription product stack.',
    topics: ['Time Series', 'CNN', 'LSTM', 'MLOps'],
    metrics: [
      { label: 'Forecast accuracy', value: '93.17%' },
      { label: 'Models compared', value: '4+' },
      { label: 'Deployment', value: 'AWS SageMaker' },
    ],
    technologies: ['Python', 'CNN', 'LSTM', 'Random Forest', 'ARIMA', 'SARIMAX', 'AWS SageMaker'],
    relatedExperienceId: 'digiflux-ase',
    relatedProjectId: 'meal-chatbot-sales-prediction',
    company: 'Digiflux Technologies',
    period: '2024 – Present',
    publishedAt: '2024-06-01',
    featured: true,
    readTime: '5 min',
  },
  {
    id: 'ecommerce-marketplace-content-platform',
    title: 'AI-Powered Marketplace Content & Search Platform',
    type: 'production',
    industry: 'E-commerce / Creator Commerce',
    hook: 'Owning a two-service platform — 602K+ searchable listings across 36 marketplaces — with multi-modal semantic search (text and photo, EN + AR) built for how creators actually search.',
    industryContext:
      'Creator-commerce platforms sit between influencers and marketplace catalogs spanning dozens of regional and international storefronts. Product data arrives inconsistent — mismatched categories, duplicate listings, multilingual titles — and creators need to find relevant items by intent, not just keyword match. Systems that can\'t reconcile catalog scale with search relevance either drown in stale data or return irrelevant results.',
    insight:
      'At this scale, the hard problem isn\'t scraping — it\'s reconciliation and retrieval. A category taxonomy that\'s 80% automated still needs the remaining 20% to be right, because a wrong mapping breaks discovery for every product under it. Vector search earns its complexity only when keyword search demonstrably fails on real creator queries — semantic search on top of a shaky data foundation just returns confidently wrong results faster. The two services stay deliberately decoupled — search reads a database snapshot, never live Postgres or the scrapers directly — so acquisition-side slowness or failure never shows up as a slow search response.',
    contribution:
      'Own an AI-powered marketplace content and search platform end-to-end, split into two deliberately decoupled services sharing only a database. The acquisition side extracts and categorizes products from 36 marketplaces (EN + AR) into PostgreSQL, processes imagery through Cloudflare R2, and writes a clean catalog to MongoDB — 602K+ searchable listings today, run via a FastAPI orchestrator and ops dashboard. The discovery side reads that MongoDB snapshot and embeds every product across 5 Pinecone vector indexes — English text, Arabic text, product photos, and colour/style intent — so a creator\'s query, typed or an uploaded photo, resolves to real, in-stock, regionally-correct results (a product with no presence in a region correctly returns nothing there, rather than something unbuyable).',
    topics: ['Vector Search', 'Data Engineering', 'gRPC', 'E-commerce'],
    metrics: [
      { label: 'Products indexed', value: '602K+' },
      { label: 'Marketplaces', value: '36' },
      { label: 'Search vector indexes', value: '5' },
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Pinecone', 'gRPC', 'Cloudflare R2'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2026 – Present',
    publishedAt: '2026-01-12',
    featured: true,
    readTime: '5 min',
    architectureDiagram: `flowchart TB
    subgraph ACQ["Acquisition — writes MongoDB"]
        direction TB
        MKT["36 Marketplaces (EN + AR)"]
        PIPE["Extraction & Categorization Pipeline"]
        PG[("PostgreSQL — Product & Taxonomy Data")]
        IMG["Imagery Processing"]
        R2["Cloudflare R2 / CDN"]
        OPS["FastAPI Orchestrator + Ops Dashboard"]

        MKT --> PIPE
        PIPE --> PG
        PIPE --> IMG --> R2
        OPS -.controls.-> PIPE
    end

    PG --> MONGO[("MongoDB — 602K+ Searchable Listings")]

    subgraph DISC["Discovery — reads MongoDB, owns search"]
        direction TB
        MONGO -- "snapshot read, never live" --> EMBED["gRPC Embedding Service"]
        EMBED --> P1[("Pinecone — EN Text")]
        EMBED --> P2[("Pinecone — AR Text")]
        EMBED --> P3[("Pinecone — Product Photos")]
        EMBED --> P4[("Pinecone — Colour / Style Intent")]
        P1 & P2 & P3 & P4 --> MATCH["Semantic Match + Regional Resolution"]
    end

    QUERY["Creator Query — text or photo"] --> MATCH
    MATCH --> RESULT["In-Stock, Regionally-Correct Results"]`,
  },
  {
    id: 'fitness-microservice-platform',
    title: 'Microservice Mesh for a Fitness & Wellness Platform',
    type: 'production',
    industry: 'HealthTech / Fitness',
    hook: 'Designing a gRPC microservice mesh and a standalone mobile app for a fitness brand built on wearable data.',
    industryContext:
      'Fitness platforms live or die on how well they merge data from wearables (Fitbit, Garmin, Oura) with coaching logic, meal logging, and user state — each a separate concern that still needs to feel like one coherent app. Monolithic builds tend to buckle here: a bug in meal-logging shouldn\'t be able to take down auth, but the services still need to share user context constantly.',
    insight:
      'Splitting by domain (auth, coach, fitness, meal-logging, user) only pays off if the service boundaries mirror how the product team actually reasons about the app — otherwise you\'ve traded one kind of coupling for another, just spread across gRPC calls instead of function calls. The wearable integrations are the real complexity: three different vendor APIs, three different data shapes, one consistent internal model.',
    contribution:
      'Designed and built a NestJS microservice mesh (auth, coach, fitness, meal-logging, user services) communicating over gRPC, powering a fitness and wellness platform. Built a standalone React Native app with Fitbit, Garmin, and Oura wearable integrations, unifying three vendor data models into one coaching experience.',
    topics: ['Microservices', 'NestJS', 'gRPC', 'Mobile'],
    metrics: [
      { label: 'Services', value: '5-service mesh' },
      { label: 'Wearable integrations', value: '3' },
      { label: 'Platform', value: 'iOS + Android' },
    ],
    technologies: ['NestJS', 'gRPC', 'React Native', 'MongoDB', 'TypeScript'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2026 – Present',
    publishedAt: '2026-02-01',
    featured: true,
    readTime: '4 min',
  },
  {
    id: 'adobe-uxp-catalog-plugin',
    title: 'An Adobe Photoshop Plugin Real Designers Use',
    type: 'build',
    industry: 'E-commerce / Creative Tooling',
    hook: 'Shipping a UXP plugin inside Photoshop itself — a different kind of UI problem than a web app.',
    industryContext:
      'Catalog and creative teams often bounce between Photoshop and a separate web app to build product infographics for e-commerce listings — design there, export, re-import, repeat. A plugin that lives inside Photoshop removes that context-switch entirely, but Adobe\'s UXP environment is a genuinely different platform: no browser DOM, a constrained runtime, and UI conventions dictated by the host app, not by React defaults.',
    insight:
      'Building for a host application means the plugin succeeds by disappearing into Photoshop\'s own conventions, not by looking like a web app bolted on. The real product decision is less "what can this do" and more "what would a designer expect to already exist here."',
    contribution:
      'Built a React-based Adobe Photoshop UXP plugin — one of two engineers on the project — bringing an e-commerce SaaS\'s infographic-creation tooling directly into Photoshop, so production designers no longer needed to build infographics through the product\'s separate website. Followed on with SaaS catalog data pipelines (multi-marketplace format conversion, scraper-result cleaning) and a serverless image compression service.',
    topics: ['UXP', 'Adobe', 'Developer Tooling', 'E-commerce'],
    metrics: [
      { label: 'Team size', value: '2 engineers' },
      { label: 'Platform', value: 'Adobe UXP' },
      { label: 'Stack', value: 'React + serverless' },
    ],
    technologies: ['React', 'Adobe UXP', 'AWS Lambda', 'Cloudflare R2'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – 2025',
    publishedAt: '2024-08-01',
    featured: false,
    readTime: '3 min',
  },
  {
    id: 'foresight-risk-prediction',
    title: 'ForeSight — IT Project Risk Prediction (Hackathon)',
    type: 'poc',
    industry: 'Enterprise IT / PMO',
    hook: 'A 24-hour build: ML risk signals, dashboards, and a deployable monorepo—Top 10 at AI-Manthan.',
    industryContext:
      'IT portfolios leak budget and timeline risk when early warning signals sit in spreadsheets. PMOs want unified views: anomaly flags, cost overrun probability, and drill-down by squad. Hackathon constraints force ruthless scope—one vertical slice that demos end-to-end value beats a slide deck.',
    insight:
      'Risk platforms win on trustworthy data plumbing first (dbt-transformed Postgres, clear metrics definitions) and ML second. FastAPI + Next.js + Docker gives judges a live path from ingestion to dashboard. Monorepos help small teams move fast when boundaries (API vs UI vs analytics) stay explicit.',
    contribution:
      'Co-built ForeSight in 24 hours: FastAPI backend, Next.js 15 frontend, PostgreSQL with dbt, Dockerized monorepo, and ML-driven risk dashboards. Reached Top 10 among 70+ teams at AI-Manthan (AtliQ Technologies). Demonstrated full-stack delivery under extreme time pressure.',
    topics: ['Hackathon', 'FastAPI', 'Predictive Analytics', 'dbt'],
    metrics: [
      { label: 'Build time', value: '24 hours' },
      { label: 'Rank', value: 'Top 10 / 70+' },
      { label: 'Stack', value: 'FastAPI + Next.js 15' },
    ],
    technologies: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'dbt', 'Docker'],
    relatedProjectId: 'foresight-hackathon',
    company: 'AI-Manthan Hackathon',
    period: '2025',
    publishedAt: '2025-10-11',
    featured: true,
    readTime: '4 min',
    github: 'https://github.com/patelsahil2k03/foresight',
  },
  {
    id: 'edtech-question-paper-nlp',
    title: 'AI-Driven Exam Paper Quality Assessment',
    type: 'research',
    industry: 'EdTech / Assessment',
    hook: 'NLP that scores question-paper quality against Bloom\'s taxonomy—98.04% accuracy, Springer ICTIS 2024.',
    industryContext:
      'Institutions struggle to ensure exams balance cognitive levels, difficulty, and syllabus coverage before administration. Manual review is slow and subjective. EdTech research increasingly uses NLP to classify items, detect bias patterns, and align assessments with learning outcomes—if models are explainable to faculty.',
    insight:
      'BERT and Bi-LSTM ensembles capture semantic structure better than bag-of-words alone for pedagogical labels. Quality is not one score—it is multi-criteria (difficulty spread, taxonomy coverage, redundancy). Publishing demands rigorous datasets (2,809 labeled instances here) and honest limitation discussion.',
    contribution:
      'Developed an AI system to categorize and score pre-exam question papers using BERT, LSTM, and Bi-LSTM, reaching 98.04% accuracy. Co-authored publication at Springer ICTIS 2024. Open-sourced implementation for reproducibility and classroom adoption discussions.',
    topics: ['NLP', 'BERT', 'Education', 'Research'],
    metrics: [
      { label: 'Accuracy', value: '98.04%' },
      { label: 'Dataset', value: '2,809 instances' },
      { label: 'Publication', value: 'Springer ICTIS 2024' },
    ],
    technologies: ['Python', 'BERT', 'LSTM', 'Bi-LSTM', 'NLP', 'GloVe'],
    relatedProjectId: 'question-paper-quality',
    company: 'CHARUSAT Research',
    period: '2023 – 2024',
    publishedAt: '2024-02-01',
    featured: true,
    readTime: '5 min',
    github: 'https://github.com/patelsahil2k03/question-paper-analysis',
    paper: 'https://lnkd.in/dwVVjngv',
  },
  {
    id: 'bird-detection-aerial',
    title: 'Small Object Detection in Aerial Imagery',
    type: 'research',
    industry: 'Ecology / Computer Vision',
    hook: 'YOLOv8 variants for tiny birds in drone frames—benchmarked for real-world ecology and surveillance use cases.',
    industryContext:
      'Aerial imagery makes objects appear small and dense; generic detectors tuned on COCO underperform on birds, drones, and wildlife monitoring. Researchers compare anchor-free detectors (YOLOv8 family) on domain-specific datasets and report precision-recall tradeoffs per model size (nano vs medium vs extra-large).',
    insight:
      'Small-object detection is a scale and resolution problem before it is an architecture fad. Choosing yolov8n vs yolov8x is a deployment decision (edge drone vs server batch), not only a leaderboard exercise. Cross-domain papers should document failure modes—occlusion, motion blur, class imbalance.',
    contribution:
      'Benchmarked YOLOv8n, yolov8m, and yolov8x for small bird detection in aerial imagery. Published at AIP ICRAIC 2024 (Scopus-indexed). Highlighted practical implications for avian ecology and surveillance pipelines.',
    topics: ['YOLOv8', 'Computer Vision', 'Aerial Imagery', 'Research'],
    metrics: [
      { label: 'Publication', value: 'AIP ICRAIC 2024' },
      { label: 'Models tested', value: '3 YOLOv8 variants' },
      { label: 'Indexing', value: 'Scopus' },
    ],
    technologies: ['Python', 'YOLOv8', 'Deep Learning', 'Object Detection'],
    relatedProjectId: 'bird-detection-yolo',
    company: 'CHARUSAT Research',
    period: '2023 – 2024',
    publishedAt: '2024-01-15',
    featured: false,
    readTime: '4 min',
    github: 'https://github.com/patelsahil2k03/bird-detection-yolo',
    paper: 'https://lnkd.in/dNa4QXkW',
  },
];

export const featuredCaseStudies = caseStudies.filter((cs) => cs.featured);

/**
 * Top featured studies on homepage teaser section — explicit picks, not
 * array-order slicing, so this stays intentional as new studies are added.
 */
export const homepageFeaturedCaseStudies = [
  'ecommerce-marketplace-content-platform',
  'fitness-microservice-platform',
  'fintech-lambda-scrapers',
]
  .map((id) => caseStudies.find((cs) => cs.id === id))
  .filter((cs): cs is CaseStudy => Boolean(cs));

export const caseStudyFilters: { id: CaseStudyType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'production', label: 'Production' },
  { id: 'poc', label: 'POC' },
  { id: 'research', label: 'Research' },
];
