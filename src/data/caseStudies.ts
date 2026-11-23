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
  /** System figure for the homepage and article lead: the real pipeline in order, plus a caption. No client names, no figures. */
  figure?: CaseStudyFigure;
  /** Caption under the full architecture diagram (Figure 2 when a system figure leads the article). */
  architectureCaption?: string;
  /** The owner's role in one line, on the evidence ladder (nextprompt.md §6). Shown with the study on the homepage and article. */
  role?: string;
}

export interface CaseStudyFigure {
  caption: string;
  steps: string[];
}

export const caseStudyTypeLabels: Record<CaseStudyType, string> = {
  production: 'Production',
  poc: 'Proof of concept',
  research: 'Research',
  'deep-dive': 'Deep dive',
  build: 'Build',
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'fintech-lambda-scrapers',
    role: 'Primary developer of the scraper fleet and the market open/close pipeline',
    title: 'FinTech Data Pipeline at Scale',
    type: 'production',
    industry: 'FinTech',
    hook: 'How 50+ serverless scrapers keep market data flowing for a platform with 2M+ users.',
    industryContext:
      'Regulated financial products depend on timely, accurate external data: rates, filings, partner feeds and market signals. Manual collection does not scale; missed updates create compliance risk and stale customer experiences. Teams typically adopt event-driven, serverless pipelines to isolate failures, control cost per run, and ship new sources without redeploying monoliths.',
    insight:
      'Treat each data source as an independent contract: input schema, retry policy, dead-letter handling, and observability tags. Lambda fits bursty, parallel workloads when cold-start latency is acceptable and payloads stay within service limits. The real engineering win is operational (idempotent writes, structured logs, alerts on freshness SLAs), not raw scrape count.',
    contribution:
      'Primary developer of the AWS Lambda scraper fleet for a FinTech platform, from the first handler in October 2024 to 50+ production functions covering market movers, sector analysis, indices, IPO insights and options data. Also built the market open/close analysis pipeline (TradingView session management, OpenAI-generated analysis, Slack alerts on failure), kept the pipelines running in production, and wrote the handover documentation. Integrated the AppsFlyer SDK into the platform\'s React Native app. The platform serves 2M+ users.',
    topics: ['AWS Lambda', 'Serverless', 'Data Engineering', 'FinTech'],
    metrics: [
      { label: 'Lambda functions', value: '50+' },
      { label: 'Users served', value: '2M+' },
      { label: 'Domain', value: 'FinTech' },
    ],
    technologies: ['Python', 'AWS Lambda', 'DynamoDB', 'Selenium', 'OpenAI'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – 2026',
    publishedAt: '2024-10-01',
    featured: true,
    readTime: '4 min',
    figure: {
      caption: 'Scrapers run as independent serverless functions; the open/close pipeline adds OpenAI analysis and Slack alerts on failure.',
      steps: ['Market data sources', 'AWS Lambda scraper fleet', 'Normalized market data', 'Open/close analysis with OpenAI', 'Platform users'],
    },
  },
  {
    id: 'foodtech-meal-chatbot',
    role: 'Primary developer of nutrition scanning; built the WhatsApp ordering bot; migrated the AI Coach',
    title: 'AI Services for a Meal-Subscription Business',
    type: 'production',
    industry: 'FoodTech',
    hook: 'Nutrition scanning, an AI coach and a WhatsApp ordering bot for a business serving 125K+ customers.',
    industryContext:
      'Meal subscription businesses carry high support volume (plan changes, delivery windows, dietary preferences) and a customer base that expects personalized nutrition guidance. Rule-based bots break on paraphrases, and pure LLM demos improvise policies. Production FoodTech stacks combine retrieval, structured data and guardrails so answers stay accurate, affordable to run and auditable.',
    insight:
      'Model choice is an engineering decision, not a default. The AI Coach started on GPT-4 and moved to Gemini only after candidate models were benchmarked on the same tasks. In nutrition scanning, results are grounded in the USDA nutritional database and refined with tiered prompting, caching and a two-stage analysis, reaching 90%+ accuracy. The WhatsApp ordering bot is rule-based, with live cart pricing and a validated payment hand-off.',
    contribution:
      'Primary developer of the nutrition-scanning service and its food-classification pipeline (USDA data plus Google Gemini, reaching 90%+ accuracy). Benchmarked candidate models and migrated the AI Coach from GPT-4 to Gemini. Contributed to the meal-subscription chatbot (LangChain and OpenAI), notification and weight-logging services, and built and shipped the WhatsApp ordering bot (FastAPI, Supabase, Twilio) with live cart pricing and a validated payment hand-off. The platform serves 125K+ customers.',
    topics: ['Google Gemini', 'LangChain', 'Nutrition AI', 'WhatsApp'],
    metrics: [
      { label: 'Customers', value: '125K+' },
      { label: 'Nutrition-scan accuracy', value: '90%+' },
      { label: 'Stack', value: 'Gemini + OpenAI' },
    ],
    technologies: ['Python', 'FastAPI', 'Google Gemini', 'OpenAI', 'LangChain', 'PostgreSQL', 'Supabase', 'Twilio'],
    relatedExperienceId: 'digiflux-ase',
    relatedProjectId: 'meal-chatbot-sales-prediction',
    company: 'Digiflux Technologies',
    period: '2025 – 2026',
    publishedAt: '2025-05-16',
    featured: true,
    readTime: '5 min',
    figure: {
      caption: 'Nutrition scanning grounds each result in the USDA database before the model refines it in two stages.',
      steps: ['Meal photo or text', 'USDA nutritional database', 'Gemini with tiered prompting and caching', 'Two-stage analysis', 'Result for the AI Coach and app'],
    },
  },
  {
    id: 'healthtech-ops-platform',
    role: 'Developed the RAG assistant; co-developed the content-automation pipeline',
    figure: {
      caption: 'The content pipeline turns program pages and news into blog posts in queued batches, so far less is done by hand; a separate assistant answers from curated program sources.',
      steps: ['Program web pages and news articles', 'Scraping', 'LLM post-processing', 'S3 image storage and queued batch processing', 'Blog posts on the platform'],
    },
    title: 'HealthTech Public-Health Knowledge Platform',
    type: 'production',
    industry: 'HealthTech',
    hook: 'A retrieval-augmented assistant and a content pipeline that cut manual intervention by 40% on a platform supporting 44,500+ health workers.',
    industryContext:
      'Public-health programs reach tens of thousands of field workers across many states, and the guidance they need changes constantly across program pages and news. Keeping a knowledge platform current by hand is slow, and a chatbot that is not grounded in the program\'s own sources is a liability in a health setting.',
    insight:
      'In a health setting an assistant earns trust by answering from curated sources rather than from the model alone. For content, the leverage is automation: scrape, post-process with an LLM, store assets and queue the work in batches, so far less has to be done by hand. Production hardening mattered more than the first prototype.',
    contribution:
      'Developed a LangChain retrieval-augmented assistant for public-health program information from prototype to production. Co-developed the content-automation pipeline that converts program web pages and news articles into platform blog posts (scraping, LLM post-processing, S3 image storage, queued batch processing), including its production hardening, and maintained it as a production service. The platform supports 44,500+ health workers across 35 states and union territories; the pipeline reduced manual intervention by 40%.',
    topics: ['RAG', 'LangChain', 'Content Automation', 'HealthTech'],
    metrics: [
      { label: 'Health workers supported', value: '44,500+' },
      { label: 'Manual intervention', value: '-40%' },
      { label: 'Coverage', value: '35 states & UTs' },
    ],
    technologies: ['Python', 'LangChain', 'RAG', 'MongoDB', 'AWS S3'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – 2025',
    publishedAt: '2024-12-01',
    featured: true,
    readTime: '4 min',
  },
  {
    id: 'sales-forecasting-cnn-lstm',
    role: 'Developed the forecasting model and its baselines (internship)',
    figure: {
      caption: 'Every model is compared on the same splits, so the hybrid wins on evidence rather than by default.',
      steps: ['Sales history of a meal-subscription business', 'Same train and test splits for every model', 'Random Forest, ARIMA and SARIMAX baselines', 'CNN for local patterns, LSTM for longer dependencies', 'Forecast judged against the baselines'],
    },
    title: 'Hybrid CNN+LSTM Sales Forecasting',
    type: 'poc',
    industry: 'FoodTech / Analytics',
    hook: 'A CNN+LSTM forecasting proof of concept benchmarked against Random Forest, ARIMA and SARIMAX on a subscription business’s sales.',
    industryContext:
      'Subscription and QSR businesses forecast demand for inventory, staffing, and promotions. ARIMA and SARIMAX excel on smooth series; sudden campaigns, weather, and holidays introduce non-linear spikes. Teams often ensemble statistical baselines with neural models and validate on hold-out weeks, not just RMSE on training data.',
    insight:
      'CNN layers extract local temporal patterns; LSTM layers model longer dependencies. Comparing Random Forest, ARIMA, SARIMAX, and hybrid nets on the same splits avoids "winner by default." Production forecasting needs reproducible pipelines and stakeholder-readable error bands, not a single leaderboard number.',
    contribution:
      'Built a proof-of-concept CNN+LSTM sales-forecasting model during the internship, reaching 93.17% accuracy and benchmarked against Random Forest, ARIMA and SARIMAX on a meal-subscription business\'s sales data; AWS SageMaker was used for experimentation.',
    topics: ['Time Series', 'CNN', 'LSTM', 'Forecasting'],
    metrics: [
      { label: 'Forecast accuracy', value: '93.17%' },
      { label: 'Models compared', value: '4+' },
      { label: 'Experimentation', value: 'AWS SageMaker' },
    ],
    technologies: ['Python', 'CNN', 'LSTM', 'Random Forest', 'ARIMA', 'SARIMAX', 'AWS SageMaker'],
    relatedExperienceId: 'digiflux-intern',
    relatedProjectId: 'meal-chatbot-sales-prediction',
    company: 'Digiflux Technologies',
    period: '2024',
    publishedAt: '2024-03-01',
    featured: true,
    readTime: '5 min',
  },
  {
    id: 'ecommerce-marketplace-content-platform',
    role: 'Founding member of a three-person team; primary developer of the extractor and core services',
    title: 'AI-Powered Marketplace Content & Search Platform',
    type: 'production',
    industry: 'E-commerce / Creator Commerce',
    hook: 'A two-service platform covering 500K+ unique products across 85+ marketplaces, with multi-modal semantic search (text and photo, EN + AR) built for how creators actually search.',
    industryContext:
      'Creator-commerce platforms sit between influencers and marketplace catalogs spanning dozens of regional and international storefronts. Product data arrives inconsistent (mismatched categories, duplicate listings, multilingual titles), and creators need to find relevant items by intent, not just keyword match. Systems that can\'t reconcile catalog scale with search relevance either drown in stale data or return irrelevant results.',
    insight:
      'At this scale, the hard problem isn\'t scraping; it\'s reconciliation and retrieval. A category taxonomy that is mostly automated still needs the remainder to be right, because a wrong mapping breaks discovery for every product under it. Vector search earns its complexity only when keyword search demonstrably fails on real creator queries. Semantic search on top of a shaky data foundation just returns confidently wrong results faster. The two services stay deliberately decoupled: search reads a database snapshot, never live Postgres or the scrapers directly, so acquisition-side slowness or failure never shows up as a slow search response.',
    contribution:
      'Founding member of the three-person team behind an AI-powered marketplace content and search platform, and primary developer of the extractor and core services. The platform is split into two deliberately decoupled services sharing only a database. The acquisition side extracts and categorizes products from 85+ marketplaces (EN + AR) into PostgreSQL, processes imagery through Cloudflare R2, and writes a clean catalog to MongoDB (500K+ unique products today), run via a FastAPI orchestrator and ops dashboard. The discovery side reads that MongoDB snapshot and embeds every product across 6 Pinecone vector indexes, covering English text, Arabic text, product photos, and color/style intent, so a creator\'s query, typed or an uploaded photo, resolves to real, in-stock, regionally-correct results (a product with no presence in a region correctly returns nothing there, rather than something unbuyable).',
    topics: ['Vector Search', 'Data Engineering', 'gRPC', 'E-commerce'],
    metrics: [
      { label: 'Unique products', value: '500K+' },
      { label: 'Marketplaces', value: '85+' },
      { label: 'Search vector indexes', value: '6' },
    ],
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Pinecone', 'gRPC', 'Cloudflare R2'],
    relatedExperienceId: 'client-sde2',
    company: 'Digiflux Technologies · client engagement',
    period: '2026 – Present',
    publishedAt: '2026-01-12',
    featured: true,
    readTime: '5 min',
    figure: {
      caption: 'Two decoupled services share only a database snapshot, so slowness on the acquisition side never reaches search.',
      steps: ['Marketplace storefronts, English and Arabic', 'Extraction and categorization', 'PostgreSQL product and taxonomy data', 'MongoDB snapshot of unique products', 'gRPC embedding service and vector indexes', 'Text or photo query, regionally correct results'],
    },
    architectureCaption:
      'The full architecture: the acquisition service writes the catalog; the discovery service reads a snapshot of it and owns search.',
    architectureDiagram: `flowchart TB
    subgraph ACQ["Acquisition: writes the catalog"]
        direction TB
        MKT["Marketplace storefronts<br/>English and Arabic"] --> PIPE["Extraction and<br/>categorization pipeline"]
        OPS["FastAPI orchestrator<br/>and ops dashboard"] -. controls .-> PIPE
        PIPE --> PG[("PostgreSQL<br/>products and taxonomy")]
        PIPE --> IMG["Image processing<br/>to Cloudflare R2"]
    end

    PG --> MONGO[("MongoDB catalog<br/>of unique products")]

    subgraph DISC["Discovery: reads a snapshot, owns search"]
        direction TB
        EMBED["gRPC embedding service"] --> VEC[("Pinecone vector indexes<br/>text, photos, color and style")]
        VEC --> MATCH["Semantic match and<br/>regional resolution"]
        QUERY["Creator query<br/>text or photo"] --> MATCH
        MATCH --> RESULT["In-stock, regionally<br/>correct results"]
    end

    MONGO -- "snapshot read, never live" --> EMBED`,
  },
  {
    id: 'fitness-microservice-platform',
    role: 'Primary developer of the meal-logging service and the coach, admin and monitoring dashboards',
    title: 'AI Meal Logging & Coach Tooling for a Fitness Platform',
    type: 'production',
    industry: 'HealthTech / Fitness',
    hook: 'A Python gRPC service that turns meal photos and text into nutrition data with Gemini, plus the coach and monitoring dashboards around it.',
    industryContext:
      'Fitness platforms built on wearable data live or die on the daily habit loop: logging a meal has to take seconds, and the nutrition numbers have to be believable, or users stop. Coaches, in turn, need to see client data and reasoning in one place. The platform is built as gRPC microservices.',
    insight:
      'With a hosted model behind the service, reliability is the engineering problem. Routing requests through a chain of models with automatic fallback, rotating API keys and caching by image hash keep the service available. Accuracy came from iterative fixes (how ingredient calories are apportioned, how cooked density is handled) rather than from a single prompt. The service ships with its own monitoring: daily Slack digests, monthly scan reports and provider alerts.',
    contribution:
      'Primary developer of the AI meal-logging service (Python, gRPC, Google Gemini), from first commit to production: nutritional analysis from text and up to five images, meal refinement, activity analysis, nutrition notes and AI workout-program generation. Built its monitoring and alerting and developed the coach, admin and service-monitoring dashboards (React, TypeScript), refining the coach dashboard through coach feedback. Contributed gRPC contracts and features to the shared NestJS services and to the mobile app. Released to production as a test launch with real users.',
    topics: ['gRPC', 'Google Gemini', 'Nutrition AI', 'Dashboards'],
    metrics: [
      { label: 'Core service', value: 'Python + gRPC + Gemini' },
      { label: 'Dashboards built', value: '3' },
      { label: 'Status', value: 'Production test launch' },
    ],
    technologies: ['Python', 'gRPC', 'Google Gemini', 'TypeScript', 'React', 'MongoDB', 'AWS S3', 'CloudWatch'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2026',
    publishedAt: '2026-03-17',
    featured: true,
    readTime: '4 min',
    figure: {
      caption: 'The meal-logging service routes every request through a chain of models with automatic fallback, key rotation and image-hash caching.',
      steps: ['Meal text and up to five photos', 'Python gRPC meal-logging service', 'Gemini model chain with fallback', 'Nutrition analysis and notes', 'Coach, admin and monitoring dashboards'],
    },
  },
  {
    id: 'adobe-uxp-catalog-plugin',
    role: 'Co-developer of the plugin (two-engineer team); built the catalog pipelines and image service',
    figure: {
      caption: 'The plugin brings the SaaS tooling into the designer\'s own application, instead of a separate website.',
      steps: ['Catalog data from multiple marketplaces', 'Format conversion and cleaning pipelines', 'The SaaS infographic tooling', 'React UXP plugin inside Photoshop', 'Infographics built without leaving Photoshop'],
    },
    title: 'A Photoshop Plugin for E-commerce Catalog Designers',
    type: 'build',
    industry: 'E-commerce / Creative Tooling',
    hook: 'Shipping a UXP plugin inside Photoshop itself: a different kind of UI problem than a web app.',
    industryContext:
      'Catalog and creative teams often bounce between Photoshop and a separate web app to build product infographics for e-commerce listings: design there, export, re-import, repeat. A plugin that lives inside Photoshop removes that context switch, but Adobe\'s UXP environment is a different platform: no browser DOM, a constrained runtime, and UI conventions dictated by the host app, not by React defaults.',
    insight:
      'Building for a host application means the plugin succeeds by disappearing into Photoshop\'s own conventions, not by looking like a web app bolted on. The real product decision is less "what can this do" and more "what would a designer expect to already exist here."',
    contribution:
      'Built a React-based Adobe Photoshop UXP plugin as one of two engineers on the project, bringing an e-commerce SaaS\'s infographic-creation tooling directly into Photoshop, so production designers no longer needed to build infographics through the product\'s separate website. Followed on with SaaS catalog data pipelines (multi-marketplace format conversion, scraper-result cleaning) and a serverless image compression service.',
    topics: ['UXP', 'Adobe', 'Developer Tooling', 'E-commerce'],
    metrics: [
      { label: 'Team size', value: '2 engineers' },
      { label: 'Platform', value: 'Adobe UXP' },
      { label: 'Stack', value: 'React + serverless' },
    ],
    technologies: ['React', 'Adobe UXP', 'AWS Lambda', 'AWS S3'],
    relatedExperienceId: 'digiflux-ase',
    company: 'Digiflux Technologies',
    period: '2024 – 2025',
    publishedAt: '2024-08-01',
    featured: false,
    readTime: '3 min',
  },
  {
    id: 'foresight-risk-prediction',
    role: 'Co-built the platform as part of Team Innovatrix',
    figure: {
      caption: 'Trustworthy data plumbing first, machine learning second, in one Dockerized monorepo built at a hackathon.',
      steps: ['Project portfolio data', 'PostgreSQL with dbt transformations', 'ML risk models', 'FastAPI backend', 'Next.js risk dashboards'],
    },
    title: 'ForeSight: IT Project Risk Prediction (Hackathon)',
    type: 'poc',
    industry: 'Enterprise IT / PMO',
    hook: 'A 24-hour build: ML risk signals, dashboards, and a deployable monorepo. Top 10 at AI-Manthan.',
    industryContext:
      'IT portfolios leak budget and timeline risk when early warning signals sit in spreadsheets. PMOs want unified views: anomaly flags, cost overrun probability, and drill-down by squad. Hackathon constraints force tight scope: one vertical slice that demos end-to-end value beats a slide deck.',
    insight:
      'Risk platforms win on trustworthy data plumbing first (dbt-transformed Postgres, clear metrics definitions) and ML second. FastAPI + Next.js + Docker gives judges a live path from ingestion to dashboard. Monorepos help small teams move fast when boundaries (API vs UI vs analytics) stay explicit.',
    contribution:
      'Co-built ForeSight in 24 hours: FastAPI backend, Next.js 15 frontend, PostgreSQL with dbt, Dockerized monorepo, and ML-driven risk dashboards. Reached Top 10 of 70+ proposals at AI-Manthan (AtliQ Technologies).',
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
  },
  {
    id: 'edtech-question-paper-nlp',
    role: 'First author; built the classification models',
    figure: {
      caption: 'Quality is multi-criteria: taxonomy coverage, difficulty spread and redundancy, not one score.',
      steps: ['Pre-exam question papers', 'Labeled question instances', 'BERT, LSTM and Bi-LSTM models', 'Bloom\'s taxonomy, difficulty and redundancy criteria', 'A quality assessment for each paper'],
    },
    title: 'AI-Driven Exam Paper Quality Assessment',
    type: 'research',
    industry: 'EdTech / Assessment',
    hook: 'NLP that scores question-paper quality against Bloom\'s taxonomy, with 98.04% accuracy, Springer ICTIS 2024.',
    industryContext:
      'Institutions struggle to ensure exams balance cognitive levels, difficulty, and syllabus coverage before administration. Manual review is slow and subjective. EdTech research increasingly uses NLP to classify items, detect bias patterns, and align assessments with learning outcomes, if models are explainable to faculty.',
    insight:
      'BERT and Bi-LSTM models capture semantic structure better than bag-of-words alone for pedagogical labels. Quality is not one score; it is multi-criteria (difficulty spread, taxonomy coverage, redundancy). Publishing demands rigorous datasets (2,809 labeled instances here) and honest limitation discussion.',
    contribution:
      'Developed an AI system to categorize and score pre-exam question papers using BERT, LSTM, and Bi-LSTM, reaching 98.04% accuracy. First author of the publication at Springer ICTIS 2024 (Lecture Notes in Networks and Systems, a Scopus-indexed series).',
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
    publishedAt: '2024-11-13',
    featured: true,
    readTime: '5 min',
    paper: 'https://doi.org/10.1007/978-981-97-6681-9_11',
  },
  {
    id: 'bird-detection-aerial',
    role: 'Co-author of the study',
    figure: {
      caption: 'Model size is a deployment decision: the smallest variant suits an edge drone, the largest a server batch.',
      steps: ['Aerial imagery with small birds', 'YOLOv8n, YOLOv8m and YOLOv8x', 'One benchmark across the three variants', 'Model chosen by deployment: edge drone or server batch'],
    },
    title: 'Small Object Detection in Aerial Imagery',
    type: 'research',
    industry: 'Ecology / Computer Vision',
    hook: 'YOLOv8 variants for tiny birds in drone frames, benchmarked for real-world ecology and surveillance use cases.',
    industryContext:
      'Aerial imagery makes objects appear small and dense; generic detectors tuned on COCO underperform on birds, drones, and wildlife monitoring. Researchers compare anchor-free detectors (YOLOv8 family) on domain-specific datasets and report precision-recall tradeoffs per model size (nano vs medium vs extra-large).',
    insight:
      'Small-object detection is a scale and resolution problem before it is an architecture fad. Choosing YOLOv8n vs YOLOv8x is a deployment decision (edge drone vs server batch), not only a leaderboard exercise. Cross-domain papers should document failure modes: occlusion, motion blur, class imbalance.',
    contribution:
      'Co-authored a study benchmarking YOLOv8n, YOLOv8m and YOLOv8x for small bird detection in aerial imagery. Presented at ICRAIC 2024 and published in AIP Conference Proceedings 3255. Highlighted practical implications for avian ecology and surveillance pipelines.',
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
    publishedAt: '2025',
    featured: false,
    readTime: '4 min',
    paper: 'https://doi.org/10.1063/5.0254155',
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
  'foodtech-meal-chatbot',
]
  .map((id) => caseStudies.find((cs) => cs.id === id))
  .filter((cs): cs is CaseStudy => Boolean(cs));

export const caseStudyFilters: { id: CaseStudyType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'production', label: 'Production' },
  { id: 'poc', label: 'Proof of concept' },
  { id: 'build', label: 'Builds' },
  { id: 'research', label: 'Research' },
];
