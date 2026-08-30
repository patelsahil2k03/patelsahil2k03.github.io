# 📦 Complete Assets Guide

**Purpose:** Single canonical reference for every image, link, and content asset the portfolio can use — organized by priority.  
**Status:** Portfolio works WITHOUT these assets (has fallbacks)  
**Add When:** Convenient - no pressure!  
**Last updated:** 2026-08-22 (consolidated the remaining unique content from `docs/archive/ASSET_PLAN.md`, `ASSETS_NEEDED.md`, `CRITICAL_ASSETS_CHECKLIST.md` — those 3 archived docs are historical only now, this is the one place to check)

---

## 🎯 QUICK PRIORITY GUIDE

### ✅ Done:
1. Profile photo (`public/images/hero/profile.jpg`, compressed to 55.8KB)
2. Resume PDF (`public/resume.pdf`)
3. Company-logo / achievement-photo **display code** — `TimelineItem`/`Achievement` cards render these when set (Task 20a); only the actual image *files* are still missing (see below)

### 🔴 Optional but High Impact:
1. Case study hero images (**field exists on `CaseStudy.image` but nothing renders it yet** — needs the same display-wiring work Task 20a did for logos/achievement photos before this is even worth collecting; see note below)
2. Project screenshots (2-3 most impressive projects)
3. Research paper DOI/links (2 links)
4. GitHub repository links for projects (6 links)

### 🟡 Nice to Have:
1. Company logos (4 image files — display code is ready, just needs the files)
2. Achievement photos (2-3 photos — display code is ready, just needs the files)
3. Football team photos (2-3 photos)
4. Certification badges (4 image files)

### 🟢 Future Enhancement:
1. Research paper PDFs (optional, only if you have hosting permission)
2. Additional social links
3. Blog posts/articles
4. Testimonials

---

## 📂 ASSET ORGANIZATION

### Where Assets Go:

```
public/
├── images/
│   ├── hero/
│   │   └── profile.jpg ✅ DONE
│   ├── projects/
│   │   ├── foresight-dashboard.png ⏳
│   │   ├── lip-reading-demo.png ⏳
│   │   ├── fruit-detection-app.png ⏳
│   │   ├── meal-chatbot-ui.png ⏳
│   │   ├── sales-forecast-graph.png ⏳
│   │   ├── question-paper-analyzer.png ⏳
│   │   ├── bird-detection-results.png ⏳
│   │   └── vcc-point-dashboard.png ⏳
│   ├── achievements/
│   │   ├── team-star-award.jpg ⏳
│   │   ├── ai-manthan-team.jpg ⏳
│   │   └── convocation-2025.jpg ⏳
│   ├── football/
│   │   ├── charusat-team.jpg ⏳
│   │   ├── tournament-action.jpg ⏳
│   │   └── national-tournament-2023.jpg ⏳
│   ├── logos/
│   │   ├── digiflux.png ⏳
│   │   ├── lnt.png ⏳
│   │   ├── motorola.png ⏳
│   │   └── charusat.png ⏳
│   ├── certifications/
│   │   ├── nvidia-badge.png ⏳
│   │   ├── google-cloud-badges.png ⏳ (covers both the 2022 and 2023 Google Cloud entries)
│   │   ├── aws-practitioner.png ⏳
│   │   └── nptel-elite.png ⏳
│   └── case-studies/ ⏳ (doesn't exist yet — create when case-study hero images are wired up, see note above)
│       └── {slug}.png — one per case study you want a hero image for (10 slugs currently, see docs/CASE_STUDIES.md)
├── papers/ ⏳ (optional, only if you have hosting permission)
│   ├── springer-ictis-2024.pdf
│   └── aip-icraic-2024.pdf
└── resume.pdf ✅ DONE
```

---

## 📸 IMAGE SPECIFICATIONS

### Profile Photo (DONE ✅):
- **Current:** `public/images/hero/profile.jpg`
- **Size:** 500x500px (square)
- **Format:** JPG, PNG, or WebP
- **Max File Size:** 200KB

### Project Screenshots:
- **Size:** 1200x675px (16:9 aspect ratio)
- **Format:** PNG (for clarity)
- **Max File Size:** 300KB each
- **What to Show:** 
  - Dashboard views
  - App interfaces
  - Detection results
  - Key features
  - Or: Architecture diagrams if no screenshots

### Achievement Photos:
- **Size:** 800x600px (landscape) or 600x800px (portrait)
- **Format:** JPG
- **Max File Size:** 200KB each
- **What to Include:**
  - Award certificates
  - Team photos
  - Trophy photos
  - Presentation moments

### Company Logos:
- **Size:** 200x200px, ideally square-ish (the display code uses `object-contain` in a 48px badge, so non-square logos won't be cropped — but square/near-square looks best)
- **Format:** PNG with transparent background
- **Max File Size:** 50KB each
- **Where to Get:** Company websites or LinkedIn
- **Display code:** already wired (Task 20a) — drop the file in `public/images/logos/`, then add `logo: '/images/logos/digiflux.png'` to the matching entry in `src/data/experience.ts`, and it renders automatically next to that role in the Experience timeline. No other code changes needed.

### Certification Badges:
- **Size:** 200x200px (square)
- **Format:** PNG, transparent background preferred
- **Max File Size:** 50KB each
- **Where to Get:** Your certificate's official badge (NVIDIA, Google Cloud, AWS, NPTEL all provide downloadable badge images)
- **Files needed:** `nvidia-badge.png`, `google-cloud-badges.png` (one image covering both the 2022 Cloud Engineer Path and 2023 Study Jam entries), `aws-practitioner.png`, `nptel-elite.png`
- **Display code:** **not yet wired** — `Achievement.image` (Task 20a's addition) renders in the general achievement-card grid, but there's no dedicated "certification badge" treatment distinct from that yet. Using the same `image` field on the 5 certification entries in `src/data/achievements.ts` will work with the current 56px inline-thumbnail treatment; a larger/different badge-specific display would be a separate small design task if wanted later.

### Case Study Hero Images:
- **Size:** 1200x630px (matches the OG-image aspect ratio convention already used elsewhere on the site) or 1200x675px (16:9, matches project screenshots)
- **Format:** PNG or JPG
- **Max File Size:** 300KB each
- **Where they'd go:** `public/images/case-studies/{slug}.png` — folder doesn't exist yet, create it when this gets wired up
- **⚠️ Not wired to any component yet.** `CaseStudy.image` is defined on the interface (`src/data/caseStudies.ts`) but neither `CaseStudyTeaserCard.tsx` nor `CaseStudyArticle.tsx` currently render it — this needs the same kind of display-wiring work Task 20a did for `Experience.logo`/`Achievement.image` before collecting these images is worth doing. Flagged as a candidate for a future task, not started.

### Research Paper PDFs (optional):
- **Only if you have hosting permission** from the publisher/co-authors — check your publishing agreement first.
- **Destination:** `public/papers/springer-ictis-2024.pdf`, `public/papers/aip-icraic-2024.pdf`
- **Display code:** not currently wired to anything — `achievements.ts`'s publication entries already link out to the real DOI/publisher pages via the `link` field, which is the primary way papers are surfaced today. Self-hosting the PDF would need its own small addition if wanted (e.g. a "Download PDF" button alongside the existing "View Details" link).

---

## 🔗 LINKS TO UPDATE

### Research Papers (2 needed):

**File to Edit:** `src/data/achievements.ts` (publications are `Achievement` entries with `category: 'publication'`)

**What You Need:**
```javascript
// Example:
{
  title: "Your Paper Title",
  organization: "Springer ICTIS 2024",
  date: "April 2024",
  category: 'publication',
  link: "https://doi.org/10.1007/xxxxx",  // ← Add real DOI here
  // OR
  link: "https://link.springer.com/...",  // ← Direct link
  // OR  
  link: "https://www.researchgate.net/...", // ← ResearchGate
}
```

**How to Find:**
1. Search your paper title on Google Scholar
2. Click "DOI" link
3. Copy the DOI URL
4. Or get link from publisher email

---

### Project GitHub Links (6 needed):

**File to Edit:** `src/data/projects.ts`

**Current Status:** Some projects have placeholder links

**What to Update:**
```javascript
{
  title: "ForeSight",
  github: "https://github.com/yourusername/foresight",  // ← Add real repo
  live: "https://foresight-demo.com",  // ← If deployed
  // OR
  github: undefined,  // ← If repo is private
  demo: "https://youtube.com/demo-video",  // ← Alternative
}
```

**For Private Repos:**
- Option 1: Make public (if allowed)
- Option 2: Remove GitHub link, add demo video
- Option 3: Add "Private Repository" badge
- Option 4: Create public demo version

---

### Additional Social Links (Optional):

**File to Edit:** `src/data/personal.ts`

**Current Links (Already Added):**
- ✅ GitHub
- ✅ LinkedIn
- ✅ LeetCode
- ✅ Email

**You Can Add:**
```javascript
social: {
  // ... existing links
  twitter: "https://twitter.com/yourhandle",  // Optional
  medium: "https://medium.com/@yourusername",  // Optional
  kaggle: "https://kaggle.com/yourprofile",  // Optional
  youtube: "https://youtube.com/@yourchannel",  // Optional
}
```

---

## 🚀 HOW TO ADD ASSETS (Step-by-Step)

### Adding Project Screenshots:

**⚠️ Field not wired yet:** `Project.image` exists on the interface but `src/components/sections/Projects.tsx` doesn't render it currently (confirmed 2026-08-22) — this needs the same display-wiring work Task 20a did for `Experience.logo`/`Achievement.image` before screenshots would actually show up. The steps below prepare/place the files and set the data field correctly, but step 4's visual verification will show nothing changed until that wiring task happens.

**Step 1: Prepare Images**
1. Take screenshot or create diagram
2. Resize to 1200x675px
3. Optimize (use tinypng.com)
4. Name correctly (e.g., `foresight-dashboard.png`)

**Step 2: Add to Project**
```bash
# Copy image to the repo (adjust the source path to wherever your image actually is)
cp /path/to/your/image.png public/images/projects/
# Verify it's there
ls -la public/images/projects/
```

**Step 3: Update Code**
**File:** `src/data/projects.ts`
```typescript
{
  title: "ForeSight",
  image: "/images/projects/foresight-dashboard.png",  // sets the data, doesn't render yet — see warning above
  // ... rest of project data
}
```

**Step 4: Test**
```bash
npm run dev
# Open http://localhost:3000, scroll to Projects section
```

**Step 5: Commit**
```bash
git add public/images/projects/foresight-dashboard.png src/data/projects.ts
git commit -m "content: add ForeSight project screenshot"
git push origin dev   # this repo's workflow: dev is where daily work lands, main deploys via fast-forward after review
```

---

### Adding Research Paper Links:

**Step 1: Get Links**
- Find your paper on Google Scholar
- Get DOI link or publisher link
- Or upload PDF to ResearchGate and get link

**Step 2: Update Code**
**File:** `src/data/achievements.ts` (find the entry with `category: 'publication'`)
```typescript
{
  title: "Your Paper Title",
  link: "https://doi.org/10.1007/your-doi",  // update this — already wired and clickable
}
```

**Step 3: Test**
```bash
npm run dev
# Scroll to Achievements/Publications section, click link, verify it opens correctly
```

**Step 4: Commit**
```bash
git add src/data/achievements.ts
git commit -m "content: add research paper DOI links"
git push origin dev
```

---

### Adding Company Logos:

**Step 1: Get Logos**
- Download from company website
- Or search "[Company Name] logo PNG transparent"
- Resize to 200x200px

**Step 2: Add to Project**
```bash
cp /path/to/digiflux-logo.png public/images/logos/digiflux.png
```

**Step 3: Update Code**
**File:** `src/data/experience.ts` — the `logo` field and its display code already exist (Task 20a), just set it:
```typescript
{
  company: "Digiflux Technologies",
  logo: "/images/logos/digiflux.png",  // renders automatically in the Experience timeline
}
```

**Step 4: Test & Commit**
```bash
npm run dev
git add public/images/logos/digiflux.png src/data/experience.ts
git commit -m "feat(content): add Digiflux company logo"
git push origin dev   # this repo's workflow: dev is where daily work lands, main deploys via fast-forward after review
```

---

## 📅 PHASED COLLECTION PLAN

### Week 1 (Optional):
- [ ] Add 2 most impressive project screenshots
- [ ] Update research paper links

### Week 2 (Optional):
- [ ] Add 2-3 more project screenshots
- [ ] Add 1-2 achievement photos

### Week 3 (Optional):
- [ ] Add remaining project screenshots
- [ ] Add company logos
- [ ] Add football photos

### Ongoing:
- [ ] Collect as you find files
- [ ] No pressure, no deadlines
- [ ] Portfolio already looks great!

---

## 🛠️ IMAGE OPTIMIZATION TOOLS

### Online Tools (Free):
1. **TinyPNG** - https://tinypng.com
   - Compress PNG/JPG files
   - Reduces file size 50-70%
   
2. **Squoosh** - https://squoosh.app
   - Convert to WebP
   - Advanced compression options
   
3. **Remove.bg** - https://remove.bg
   - Remove background (for logos)
   - Make PNG transparent

### Command Line (Linux):
```bash
# Install ImageMagick
sudo apt install imagemagick

# Resize image
convert input.png -resize 1200x675 output.png

# Compress image
convert input.png -quality 85 output.png
```

---

## 🎨 CONTENT ENHANCEMENT IDEAS

### Project Descriptions:
**Make them more impactful:**

❌ Before:
```
"A machine learning model for predicting sales"
```

✅ After:
```
"ML forecasting system achieving 93.17% accuracy,
helping retailers optimize inventory and reduce 
waste by 30%"
```

### Achievement Details:
**Add context and scale:**

❌ Before:
```
"Top 10 Finalist - AI-Manthan Hackathon"
```

✅ After:
```
"Top 10 Finalist among 500+ teams - AI-Manthan 
National Hackathon, developed AI-powered solution
for healthcare diagnostics"
```

---

## ❓ WHAT IF I DON'T HAVE SOMETHING?

### No Project Screenshots?
**Options:**
1. Create architecture diagrams (use draw.io)
2. Use code snippets (highlight key algorithms)
3. Create simple mockups (use Canva)
4. Use placeholder graphics temporarily
5. Focus on descriptions without images

### No Award Photos?
**Options:**
1. Use icons/badges (already in place)
2. Request from organization
3. Use generic trophy icons
4. Focus on text descriptions

### Private GitHub Repos?
**Options:**
1. Remove GitHub links
2. Add "Private Repository" badge
3. Add demo video instead
4. Create simplified public version

### No Company Logos?
**Options:**
1. Use text only (already works)
2. Use company initials
3. Use industry icons

---

## 🏁 REMEMBER

### Your Portfolio is COMPLETE Without These:
- ✅ All sections work
- ✅ Professional animations
- ✅ Responsive design
- ✅ Fast performance
- ✅ Fallbacks for missing content

### Assets Are ENHANCEMENT Only:
- Make it more visual
- Add personal touch
- Show real work
- But NOT required!

### Add Incrementally:
- No rush
- One asset at a time
- Test after each addition
- Commit and deploy

---

## 📞 NEED HELP?

### Common Issues:

**Image not showing?**
```bash
# Check file exists
ls -la public/images/projects/your-image.png

# Check file path in code
grep -r "your-image.png" src/
```

**Image too large?**
```bash
# Check file size
du -h public/images/projects/your-image.png

# If > 500KB, compress it
```

**Link not working?**
```bash
# Test link in browser first
# Check for typos in URL
# Ensure HTTPS (not HTTP)
```

---

## ✅ ASSET CHECKLIST

### Needs display-wiring before collecting (small dev task, not just a file drop):
- [ ] Wire `Project.image` into `Projects.tsx` (currently unrendered)
- [ ] Wire `CaseStudy.image` into `CaseStudyTeaserCard.tsx`/`CaseStudyArticle.tsx` (currently unrendered)

### Ready to collect now (display code already works):
- [ ] Company logos (4 files → `src/data/experience.ts`'s `logo` field)
- [ ] Achievement photos (`src/data/achievements.ts`'s `image` field)
- [ ] Certification badges (4 files, same `image` field as achievement photos)
- [ ] Research paper DOI links (2 links, already-wired `link` field)
- [ ] Project GitHub URLs (6 links, already-wired `github` field)

### Nice to have, no code changes needed either way:
- [ ] Football photos (no dedicated section renders these yet — would need its own small feature, not just an asset drop; see `PORTFOLIO_REFERENCE.md`'s "Beyond Tech" idea)

### Future / optional:
- [ ] Research paper PDFs (self-hosted, only with publisher permission)
- [ ] Blog posts
- [ ] Testimonials (data exists in git history, deleted in Task 3 — would need fresh content if revisited)
- [ ] Video demos

---

**Status:** Consolidated single reference (2026-08-22) — supersedes `docs/archive/ASSET_PLAN.md`, `ASSETS_NEEDED.md`, `CRITICAL_ASSETS_CHECKLIST.md`, which are historical only now.  
**Portfolio Status:** 100% functional without assets  
**Add Assets:** At your convenience, no pressure!

**Your portfolio is READY to go LIVE today! 🚀**
