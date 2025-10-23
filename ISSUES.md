# 🚨 Issues & Requirements Documentation

## Current Status
- **Current Setup**: React (Create React App)
- **Target**: Next.js with Static Export for GitHub Pages
- **Deployment**: GitHub Pages (requires fully static site)

---

## 📝 Content Issues to Address

### 1. Missing Images
- [ ] **Profile/Hero Image**: Need a professional headshot for hero section
- [ ] **Project Screenshots**: Images for all projects mentioned in resume
  - Lip Reading Word Classification app
  - Fruit & Vegetable Detection app
  - VCC Point (Tuition Management) app
  - Question Paper Quality Test screenshots
  - Meal Subscription Chatbot interface
  - Sales Prediction dashboard
- [ ] **Hackathon Images**: ForeSight project (AI-Manthan Hackathon)
- [ ] **Award/Recognition Images**: Team Star Award from Digiflux
- [ ] **Football Images**: As you're a footballer, need action shots
- [ ] **University/Event Images**: CHARUSAT convocation, conferences, etc.

### 2. Links to Verify/Add
- [ ] **Research Papers**:
  - Springer ICTIS 2024: https://lnkd.in/dwVVjngv
  - AIP ICRAIC 2024: https://lnkd.in/dNa4QXkW
  - Kudos Research Story: https://lnkd.in/dGeFxVpm
- [ ] **Project Repositories**: GitHub links for all projects
- [ ] **Certificates**: Google Cloud, AWS, NPTEL, LeetCode badges
- [ ] **Social Links**:
  - GitHub: github.com/patelsahil2k03
  - LinkedIn: linkedin.com/in/sahil-patel-581226205
  - LeetCode: leetcode.com/patelsahil2k03
  - Email: patelsahil2k03@gmail.com
  - Google Cloud Profile: https://lnkd.in/da4jrMCc

### 3. Content Highlights from LinkedIn Posts
- ✅ AI-Manthan Hackathon - Top 10 Finalist (Team Innovatrix)
- ✅ Team Star Award at Digiflux Technologies
- ✅ Published Research Papers (2 Springer + AIP)
- ✅ CHARUSAT Convocation - 9.35 CGPA
- ✅ Multiple Internships (Digiflux, L&T, Motorola)
- ✅ Google Cloud Certifications & Swags
- ✅ LeetCode 100 Days Badge
- ✅ NPTEL Cloud Computing (Elite Certificate)
- ✅ IndoML 2022 Participation
- ✅ National Hackathon Participation
- ✅ CLDC AI-ML Core Team Member
- ✅ CHARUSAT Football Team Player

---

## 🎨 Design Requirements

### Sections Needed
1. **Hero Section**: With 3D football/data visualization element
2. **About Section**: Data Scientist + Footballer story
3. **Experience Timeline**: Interactive timeline with company logos
4. **Skills Section**: Modern bento grid layout
5. **Projects Showcase**: Card-based with hover effects
6. **Research Publications**: Academic achievements
7. **Achievements**: Awards, hackathons, certifications
8. **Testimonials/Recognition**: From LinkedIn posts
9. **Contact Section**: With social links

### 3D Elements Ideas
- ⚽ **Rotating Football** in hero section (represents sports passion)
- 📊 **Data Visualization Globe** (represents data science)
- 🎓 **Floating Certificates/Badges**
- 🌐 **Interactive Network Graph** for skills/tech stack
- 🏆 **Trophy/Award 3D Model** for achievements section

---

## 🛠️ Technical Setup

### Required Dependencies
```json
{
  "next": "^14.0.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.88.0",
  "three": "^0.158.0",
  "framer-motion": "^10.16.0",
  "tailwindcss": "^3.3.0",
  "lucide-react": "^0.292.0"
}
```

### GitHub Pages Configuration
- Static export using `next.config.js` with `output: 'export'`
- Proper base path configuration
- Image optimization disabled (GitHub Pages limitation)
- Custom 404.html handling

---

## 📦 Assets Needed

### Icons & Illustrations
- [ ] Tech stack icons (React, Python, TensorFlow, etc.)
- [ ] Company logos (Digiflux, L&T, Motorola, CHARUSAT)
- [ ] University/Conference logos

### Data Files
- [ ] Resume PDF (downloadable)
- [ ] Project data (JSON format)
- [ ] Skills/tech stack data
- [ ] Experience timeline data
- [ ] Publications metadata

---

## 🎯 Priority Order

### Phase 1: Setup & Structure ✅ (We'll do this first)
- Initialize Next.js with TypeScript
- Configure Tailwind CSS
- Setup static export for GitHub Pages
- Create basic layout and navigation

### Phase 2: Core Sections (Next)
- Hero section with animations
- About section
- Experience timeline
- Skills grid

### Phase 3: Projects & Research (After Phase 2)
- Projects showcase
- Research publications
- Achievements section

### Phase 4: 3D Elements (Final Polish)
- Add Three.js 3D elements
- Interactive animations
- Performance optimization

---

## 📝 Notes for Implementation

### Important Considerations
1. **Image Optimization**: For static export, use `unoptimized` flag
2. **Dynamic Routes**: Avoid if possible, or pre-generate all routes
3. **API Routes**: Not supported in static export
4. **Base Path**: Set to repository name for GitHub Pages
5. **404 Handling**: Create custom 404 page

### Content Strategy
- Pull data from LinkedIn posts for testimonials/story
- Use resume for structured experience/education data
- Highlight both technical skills AND sports achievements
- Show personality through unique combinations (footballer + data scientist)

---

## 🎨 Color Palette Suggestions
- Primary: Deep Blue (#1e40af) - Professional, Tech
- Secondary: Orange (#f97316) - Energy, Football
- Accent: Cyan (#06b6d4) - Data, Modern
- Dark: Slate (#0f172a)
- Light: White (#ffffff)

---

## ✨ Unique Features to Implement
- [ ] Interactive skill graph showing tech proficiency
- [ ] Animated statistics (publications count, projects, etc.)
- [ ] Timeline with smooth scroll animations
- [ ] Project filter by technology
- [ ] Dark/Light mode toggle
- [ ] Downloadable resume button
- [ ] Email contact form (using FormSpree or similar)
- [ ] Scroll progress indicator
- [ ] Smooth page transitions

---

*This document will be updated as we progress through the implementation.*
