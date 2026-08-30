# 🚀 Sahil Patel - Modern Portfolio

> **Associate Software Engineer | AI/ML Specialist | Published Researcher | Footballer**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Live](https://img.shields.io/badge/Live-patelsahil2k03.github.io-success)](https://patelsahil2k03.github.io)

## 🌐 Live Portfolio
**Visit:** [https://patelsahil2k03.github.io](https://patelsahil2k03.github.io)

**Status:** ✅ **LIVE & 100% FUNCTIONAL** (Deployed: March 6, 2026)

---

## 📖 About This Project

This is a **modern, minimalistic, and feature-rich portfolio** built with Next.js 14, showcasing the unique journey of a **Footballer ⚽ turned Data Scientist 📊**.

### ✨ Highlights
- 🎓 **9.35 CGPA** from CHARUSAT
- 📚 **2 Published Research Papers** (Springer + AIP)
- 🏆 **Top 10 Finalist** - AI-Manthan Hackathon
- ⭐ **Team Star Award** - Digiflux Technologies
- ⚽ **National Football Player** - CHARUSAT Team
- 💻 **2+ Years Industry Experience**
- 🎯 **6+ Major Projects** with AI/ML, Full Stack, Research

---

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js

### Features
- ⚡ Static Site Generation (SSG) for blazing-fast performance
- 📱 Fully responsive design
- 🎨 Modern UI with smooth animations
- 🌙 Clean, minimalistic design
- 🚀 Optimized for GitHub Pages deployment
- ♿ Accessible (WCAG compliant)
- 🔍 SEO optimized

---

## 📂 Project Structure

A Next.js 14 App Router site: `src/app/` (routes), `src/components/` (UI + page sections),
`src/data/` (all content, e.g. `personal.ts`, `experience.ts`, `projects.ts`, `achievements.ts`),
`src/lib/` (utils, animations, hooks), and `public/` (images, resume).

For the full, current file-by-file inventory and build/scope status, see
**[docs/PORTFOLIO_SCOPE_CHECKLIST.md](./docs/PORTFOLIO_SCOPE_CHECKLIST.md)** — the single
source of truth for what's shipped vs pending.

---

## 🎯 Features

The single-page portfolio covers Hero, About, Experience, Skills, Projects, Research
Publications, Achievements, Football Highlights, Testimonials, and Contact — plus a
`/case-studies/` section with in-depth write-ups on select projects.

For the full, current inventory of sections, project details, and status per item, see
**[docs/PORTFOLIO_SCOPE_CHECKLIST.md](./docs/PORTFOLIO_SCOPE_CHECKLIST.md)** and
**[docs/CASE_STUDIES.md](./docs/CASE_STUDIES.md)** rather than a second copy of the list here.

---

## 📊 Content Summary

### Professional Experience
- **Current**: Associate Software Engineer @ Digiflux Technologies
- **Duration**: 2+ years (5 internships/positions)
- **Tech Focus**: AI/ML, Full Stack, Cloud Computing

### Education
- **Degree**: B.Tech Computer Engineering
- **University**: CHARUSAT, Gujarat, India
- **CGPA**: 9.35/10 (2020-2024)

### Publications
1. **Springer ICTIS 2024** - Educational Assessment using Deep Learning
2. **AIP ICRAIC 2024** - Small Object Detection with YOLOv8

### Key Achievements
- 🏆 Top 10 Finalist - AI-Manthan Hackathon (70+ teams)
- ⭐ Team Star Award - Digiflux Technologies
- 📚 2 Published Research Papers (SCOPUS indexed)
- ☁️ 5+ Cloud & AI Certifications
- ⚽ National Football Tournament Player (2022, 2023)
- 💻 100+ LeetCode Problems Solved

### Technical Skills
- **Languages**: Python, JavaScript/TypeScript, C/C++, C#, SQL
- **AI/ML**: TensorFlow, PyTorch, LangChain, BERT, LSTM, YOLOv8
- **Web**: Next.js, React, Angular, Node.js, Express
- **Cloud**: AWS (Sagemaker, Lambda, DynamoDB), Docker
- **Databases**: MongoDB, PostgreSQL, SQL Server

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/patelsahil2k03/patelsahil2k03.github.io.git
cd patelsahil2k03.github.io
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
Navigate to `http://localhost:3000`

### Analytics (Microsoft Clarity)

Optional behavioral analytics (heatmaps, session recordings):

1. Copy `.env.example` → `.env.local`
2. Set `NEXT_PUBLIC_CLARITY_PROJECT_ID` from [Clarity](https://clarity.microsoft.com) → Project → Settings → Overview
3. For production, add the same variable as GitHub Actions secret `NEXT_PUBLIC_CLARITY_PROJECT_ID`

See `docs/DEPLOYMENT.md` for details.

### Build and Deploy

1. **Build for Production**
```bash
# Build static site
npm run build

# The static files will be in the 'out' directory
```

2. **Deploy to GitHub Pages**

The site deploys automatically via GitHub Actions on every push to `main`
(see **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** for the full build/deploy flow and
the `dev` → `main` release process).

---

## 🎨 Customization

### Update Personal Information
Edit `src/data/personal.ts`:
```typescript
export const personalInfo = {
  name: "Your Name",
  title: "Your Title",
  email: "your.email@example.com",
  // ... more fields
};
```

### Add Projects
Edit `src/data/projects.ts`:
```typescript
export const projects = [
  {
    id: 'project-id',
    title: 'Project Title',
    description: '...',
    technologies: ['Tech1', 'Tech2'],
    // ... more fields
  },
];
```

### Modify Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: '#1e40af',  // Your primary color
  secondary: '#f97316', // Your secondary color
  // ...
}
```

---

## 📝 Development Roadmap

### ✅ Phase 1: Foundation (COMPLETE - Jan 2026)
- [x] Next.js setup with TypeScript
- [x] Tailwind CSS configuration
- [x] Directory structure
- [x] Data layer with all content
- [x] Profile README integration

### ✅ Phase 2: Production Deployment (COMPLETE - Mar 2026)
- [x] Enhanced Hero section with typing animation
- [x] Counter animations for stats
- [x] Navigation component (fully clickable)
- [x] All section components optimized
- [x] Achievements category filtering
- [x] Layout optimization (1400px width)
- [x] Repository cleanup and organization
- [x] Production build and deployment
- [x] **LIVE at https://patelsahil2k03.github.io**

### ✅ Phase 3B: Case Studies (COMPLETE - May 2026)
- [x] `/case-studies/` blog-style listing + seven article pages
- [x] Homepage teaser, Experience/Projects cross-links
- [x] Deployed on GitHub Pages; work on `dev`, release via `main`
- [ ] Draft copy refinement + hero images (see `docs/CASE_STUDIES.md`)

### 🟡 Phase 3: Asset Collection (PENDING USER)
Full current checklist, priorities, and specs: **[ASSETS_GUIDE.md](./ASSETS_GUIDE.md)** — this file no longer keeps a second copy that can drift out of sync.

### ⚪ Phase 4: Advanced Features (PLANNED)
- [ ] 3D Football model (React Three Fiber)
- [ ] Particle background effects
- [ ] Testimonials carousel
- [ ] Sitewide scroll reveals
- [x] Project case studies (blog architecture — not MDX yet)
- [x] Analytics (Microsoft Clarity)
- [ ] Performance optimization (Lighthouse)

**Current Status:** ✅ Portfolio is live with case studies. Phase 3 assets + copy polish are optional next steps.

---

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

**Branching:** Daily work happens on `dev`; `main` is production (GitHub Pages). See **[BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md)** for the full workflow.

1. Fork the repository and clone
2. `git checkout dev && git pull origin dev`
3. Create a feature branch (`git checkout -b feature/my-change`)
4. Commit with [Conventional Commits](#commit-conventions)
5. Open a Pull Request **into `dev`**
6. When ready for production, merge `dev` → `main` (deploys the live site)

### Commit Conventions

Use conventional commits format:

```bash
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code restructuring
- `perf:` - Performance improvement
- `test:` - Adding tests
- `chore:` - Maintenance tasks
- `config:` - Configuration changes

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Sahil Patel**
- 📧 Email: [patelsahil2k03@gmail.com](mailto:patelsahil2k03@gmail.com)
- 💼 LinkedIn: [linkedin.com/in/sahil-patel-581226205](https://linkedin.com/in/sahil-patel-581226205)
- 🐙 GitHub: [@patelsahil2k03](https://github.com/patelsahil2k03)
- 🏆 LeetCode: [@patelsahil2k03](https://leetcode.com/patelsahil2k03)
- 📱 Phone: +91 7874337475
- 📍 Location: Vadodara, Gujarat, India

---

## 🙏 Acknowledgments

- **CHARUSAT** for excellent education and opportunities
- **Digiflux Technologies** for professional growth
- **L&T** and **Motorola** for valuable internship experiences
- **Research mentors** for guidance in publications
- **CHARUSAT Football Team** for sports achievements
- All **professors, mentors, and colleagues** who supported the journey

---

## 📊 Project Stats

- ✅ **Live Website**: https://patelsahil2k03.github.io
- 🚀 **Deployment**: GitHub Pages (Auto-deployed via GitHub Actions)
- ⭐ **Components**: 23 functional components
- 📝 **Total Lines**: ~4,900 lines of code (`src/`)
- 🎨 **Data Files**: 7 TypeScript files with structured content
- 🖼️ **Sections**: 9 major sections (Hero, About, Experience, Case Studies, Skills, Projects, Publications, Achievements, Contact)
- 📚 **Projects**: 6 showcased projects
- 🏆 **Achievements**: 20 documented achievements
- 💼 **Experience**: 5 professional positions (2+ years at current role)
- 🎓 **Education**: CHARUSAT with 9.35 CGPA
- 📄 **Publications**: 2 SCOPUS-indexed research papers
- ⚡ **Performance**: 17.5 kB main page, 178 kB First Load JS

---

## 📋 Documentation

Full index: **[docs/README.md](./docs/README.md)**. Active docs:

- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - How the site is built and deployed (GitHub Actions, static export)
- **[docs/PORTFOLIO_SCOPE_CHECKLIST.md](./docs/PORTFOLIO_SCOPE_CHECKLIST.md)** - Master scope tracker (build gates, done/pending)
- **[docs/CASE_STUDIES.md](./docs/CASE_STUDIES.md)** - Case study inventory, routes, refinement checklist
- **[BRANCH_STRATEGY.md](./BRANCH_STRATEGY.md)** - `dev` / `main` workflow, feature branches, CI vs deploy
- **[ASSETS_GUIDE.md](./ASSETS_GUIDE.md)** - Where to put images/logos and which are still pending
- **[docs/COMPETITIVE_DESIGN_RESEARCH.md](./docs/COMPETITIVE_DESIGN_RESEARCH.md)** - Competitive design research (21 sites, live-site + GitHub-repo verified) and prioritized next-design-pass recommendations
- **[PORTFOLIO_REFERENCE.md](./PORTFOLIO_REFERENCE.md)** - Historical design notes (superseded by the doc above for inspiration/patterns)

### Archived Documentation
See `docs/archive/` for historical documentation and planning files.

---

## 🎯 Design Philosophy

### Minimalism
Clean, uncluttered design focusing on content and usability.

### Performance
Optimized for speed with static generation and efficient asset loading.

### Accessibility
Built with WCAG guidelines to ensure everyone can access the content.

### Storytelling
Each section tells part of the unique journey from football to data science.

### Professional
Modern, polished look suitable for career opportunities and networking.

---

## 🔮 Future Enhancements

- [ ] Blog section for technical articles
- [ ] Dark/Light theme toggle
- [ ] Interactive project demos
- [ ] Video introductions
- [ ] Animated infographics
- [ ] Multi-language support
- [ ] Advanced 3D visualizations
- [ ] AI-powered chatbot for Q&A

---

**Made with ❤️ by Sahil Patel**

*"Building intelligent solutions at the intersection of sports and data science"* ⚽📊

---

**Last Updated**: August 20, 2026
