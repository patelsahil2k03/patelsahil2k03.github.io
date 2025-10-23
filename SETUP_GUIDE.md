# 🚀 Modern Next.js Portfolio - Setup Guide

## 📋 Prerequisites

Ensure you have the following installed:
- **Node.js** (v18 or higher): [Download](https://nodejs.org/)
- **Git**: [Download](https://git-scm.com/)
- **Code Editor**: VS Code recommended

---

## 🛠️ Installation Steps

### Step 1: Clone & Navigate
```bash
cd "D:\SAHIL Projects\sahilpatel.dev"
```

### Step 2: Backup Current Setup (Optional but Recommended)
```bash
git checkout -b backup-react-version
git push origin backup-react-version
git checkout main
```

### Step 3: Install Dependencies
We'll keep the existing structure and add Next.js dependencies:

```bash
npm install
```

### Step 4: Install New Dependencies for Next.js
```bash
npm install next@latest react@latest react-dom@latest
npm install --save-dev typescript @types/react @types/node
npm install tailwindcss postcss autoprefixer
npm install @react-three/fiber @react-three/drei three
npm install framer-motion
npm install lucide-react
npm install class-variance-authority clsx tailwind-merge
```

---

## 📁 Project Structure

```
sahilpatel.dev/
├── public/                 # Static assets
│   ├── images/            # Images (add your photos here)
│   ├── models/            # 3D models
│   └── ...
├── src/
│   ├── app/               # Next.js 14 App Router
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── ui/           # UI components
│   │   ├── sections/     # Page sections
│   │   └── 3d/           # 3D components
│   ├── data/             # Data files (JSON)
│   ├── lib/              # Utility functions
│   └── styles/           # Additional styles
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── ISSUES.md             # Known issues & requirements
└── SETUP_GUIDE.md        # This file
```

---

## ⚙️ Configuration for GitHub Pages

### 1. Create `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
}

module.exports = nextConfig
```

### 2. Update `package.json` scripts
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "export": "next build",
    "deploy": "next build && touch out/.nojekyll && git add -f out && git commit -m \"Deploy\" && git subtree push --prefix out origin gh-pages"
  }
}
```

### 3. Create GitHub Pages branch
```bash
git checkout --orphan gh-pages
git reset --hard
git commit --allow-empty -m "Init gh-pages"
git push origin gh-pages
git checkout main
```

---

## 🎨 Running the Project

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Build for Production
```bash
npm run build
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

---

## 🎯 Development Workflow

### Phase 1: Basic Setup ✅
- [x] Initialize Next.js
- [x] Configure Tailwind CSS
- [x] Setup TypeScript
- [ ] Create basic layout

### Phase 2: Core Sections
- [ ] Hero section with animations
- [ ] About section (Data Scientist + Footballer)
- [ ] Experience timeline
- [ ] Skills grid (Bento layout)

### Phase 3: Content Sections
- [ ] Projects showcase
- [ ] Research publications
- [ ] Achievements & certifications
- [ ] Contact section

### Phase 4: 3D Elements
- [ ] Football 3D model in hero
- [ ] Data visualization globe
- [ ] Interactive elements

### Phase 5: Polish & Deploy
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Final testing
- [ ] Deploy to GitHub Pages

---

## 📦 Adding Images

Place your images in the following structure:
```
public/
├── images/
│   ├── hero/
│   │   └── profile.jpg          # Your professional photo
│   ├── projects/
│   │   ├── lip-reading.png
│   │   ├── fruit-detection.png
│   │   ├── vcc-point.png
│   │   └── ...
│   ├── achievements/
│   │   ├── team-star-award.jpg
│   │   ├── convocation.jpg
│   │   └── ...
│   ├── football/
│   │   └── action-shots.jpg
│   └── logos/
│       ├── digiflux.png
│       ├── larson-toubro.png
│       └── ...
```

---

## 🐛 Troubleshooting

### Issue: Build fails
**Solution**: Check for any syntax errors in TypeScript files

### Issue: Images not loading
**Solution**: Ensure images are in `public/` folder and use correct paths

### Issue: 3D elements not rendering
**Solution**: Check Three.js peer dependencies are installed

### Issue: GitHub Pages shows 404
**Solution**: 
1. Ensure `gh-pages` branch exists
2. Check repository settings → Pages → Source is set to `gh-pages` branch

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

## 🤝 Need Help?

1. Check **ISSUES.md** for known issues
2. Review error messages carefully
3. Ensure all dependencies are installed
4. Check Node.js version (should be 18+)

---

## 🎉 Next Steps

After setup is complete:
1. Start development server: `npm run dev`
2. Begin customizing content in `src/data/`
3. Add your images to `public/images/`
4. Follow the development workflow phases

---

**Last Updated**: 2025-01-23
**Status**: Phase 1 - In Progress
