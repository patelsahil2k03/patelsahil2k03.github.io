# 🧪 Manual Testing Commands & Checklist

**Purpose:** Step-by-step commands to test the portfolio locally before deployment  
**Date:** 2026-03-06

---

## 🚀 PHASE 1: INITIAL SETUP & DEPENDENCY CHECK

### Step 1: Navigate to Project
```bash
cd /home/lenovo/Sahil/sahil-personal-projects/patelsahil2k03.github.io
```

### Step 2: Check Node & NPM Versions
```bash
node --version
npm --version
```
**Expected:** Node v18+ and NPM v9+

### Step 3: Install/Update Dependencies (if needed)
```bash
npm install
```
**Expected:** All dependencies installed without errors

### Step 4: Check Installed Packages
```bash
npm list --depth=0
```
**Verify these key packages exist:**
- ✅ next@^14.0.4
- ✅ framer-motion@^10.18.0
- ✅ @react-three/fiber@^8.15.12
- ✅ react-hot-toast@^2.6.0

---

## 🧹 PHASE 2: PRE-TEST CHECKS

### Step 1: Check Git Status
```bash
git status
```
**Review:** What files are modified/untracked

### Step 2: View Uncommitted Changes
```bash
git diff src/app/page.tsx
git diff src/components/ui/Navigation.tsx
git diff src/components/ui/Card.tsx
git diff src/data/personal.ts
git diff src/data/index.ts
git diff src/data/experience.ts
```
**Action:** Review each diff, understand what changed

### Step 3: Check for Build Errors (Quick)
```bash
npm run build 2>&1 | head -50
```
**Expected:** Build starts without immediate errors
**Stop with:** Ctrl+C after verification

---

## 💻 PHASE 3: LOCAL DEVELOPMENT SERVER

### Step 1: Start Development Server
```bash
npm run dev
```
**Expected Output:**
```
  ▲ Next.js 14.0.4
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

### Step 2: Open in Browser
**Manual Action:**
1. Open browser
2. Navigate to: `http://localhost:3000`
3. Keep terminal visible to watch for errors

---

## ✅ PHASE 4: VISUAL TESTING CHECKLIST

### 🎭 Hero Section Testing

#### Visual Checks:
- [ ] Profile photo displays (or "SP" initials fallback)
- [ ] Name appears with correct styling
- [ ] Typing animation works (rotates through roles)
- [ ] Stats display with correct numbers
- [ ] Stats counter animation works (counts up)
- [ ] Impact statement visible with proper styling
- [ ] CTA buttons visible and styled correctly
- [ ] Social links display properly

#### Interaction Checks:
- [ ] Hover over CTA buttons (see hover effect)
- [ ] Click "Download Resume" (downloads PDF)
- [ ] Click "Contact Me" (scrolls to contact section)
- [ ] Click social icons (open in new tab)
- [ ] Scroll indicator animates on hover

#### Console Check:
```
F12 → Console Tab
Look for: No errors or warnings
```

---

### 🧭 Navigation Testing

#### Visual Checks:
- [ ] Navigation bar appears at top
- [ ] Glassmorphism effect (blur background)
- [ ] All menu items visible
- [ ] Active section indicator shows
- [ ] Mobile menu icon appears on small screens

#### Interaction Checks:
- [ ] Click "About" link (smooth scroll to About section)
- [ ] Click "Experience" link (smooth scroll to Experience)
- [ ] Click "Skills" link (smooth scroll to Skills)
- [ ] Click "Projects" link (smooth scroll to Projects)
- [ ] Click "Achievements" link (smooth scroll to Achievements)
- [ ] Click "Contact" link (smooth scroll to Contact)
- [ ] Active indicator animates to clicked section

#### Scroll Check:
- [ ] Scroll down page
- [ ] Navigation stays at top (sticky)
- [ ] Active indicator updates as you scroll through sections

---

### 📖 About Section Testing

#### Visual Checks:
- [ ] Section title displays
- [ ] Content loads properly
- [ ] Stats/highlights display
- [ ] Layout is clean and readable

#### Animation Checks:
- [ ] Content fades in on scroll
- [ ] Stats animate when visible

---

### 💼 Experience Section Testing

#### Visual Checks:
- [ ] All job entries display
- [ ] Company names visible
- [ ] Dates shown correctly
- [ ] Descriptions readable
- [ ] Tech stack badges appear

#### Interaction Checks:
- [ ] Hover over experience cards (see lift effect)
- [ ] Hover border glow appears
- [ ] Click any links (if present)

---

### 🛠️ Skills Section Testing

#### Visual Checks:
- [ ] Category tabs/filters display
- [ ] Skill cards appear
- [ ] Icons/badges load correctly
- [ ] All technologies listed

#### Interaction Checks:
- [ ] Click category filters (filter skills)
- [ ] Hover over skill cards (see animations)
- [ ] Verify correct skills show per category

---

### 🚀 Projects Section Testing

#### Visual Checks:
- [ ] All 6+ projects display
- [ ] Project titles visible
- [ ] Descriptions readable
- [ ] Tech stack badges show
- [ ] Project images/placeholders display

#### Interaction Checks:
- [ ] Hover over project cards (lift + glow effect)
- [ ] Click "View Project" buttons (if enabled)
- [ ] Click "GitHub" links (open repos)
- [ ] Filter by category (if implemented)

---

### 🏆 Achievements Section Testing

#### Visual Checks:
- [ ] Awards/certifications display
- [ ] Achievement cards visible
- [ ] Icons/badges load
- [ ] Dates shown correctly

#### Interaction Checks:
- [ ] Hover over cards (see effects)
- [ ] Click any links (certificates, awards)
- [ ] Filter works (if implemented)

---

### 📚 Publications Section Testing

#### Visual Checks:
- [ ] Both research papers display
- [ ] Titles, venues, years visible
- [ ] Paper links present
- [ ] Metrics show (if added)

#### Interaction Checks:
- [ ] Click paper links (open in new tab)
- [ ] Hover effects work

---

### 📧 Contact Section Testing

#### Visual Checks:
- [ ] Contact form displays
- [ ] All fields visible (Name, Email, Message)
- [ ] Submit button appears
- [ ] Social links show

#### Interaction Checks:
- [ ] Click in Name field (focus effect)
- [ ] Type in Name field (input works)
- [ ] Click in Email field (focus effect)
- [ ] Type in Email field (input works)
- [ ] Click in Message field (focus effect)
- [ ] Type in Message field (textarea works)
- [ ] Click Submit button (see response/toast)
- [ ] Form validation works (try empty submit)

---

### 📱 Responsive Testing

#### Desktop (Full Width):
```
F12 → Responsive Design Mode → 1920x1080
```
- [ ] All sections full width
- [ ] Navigation horizontal
- [ ] Proper spacing
- [ ] Images not stretched

#### Tablet (768px):
```
F12 → Responsive Design Mode → 768x1024
```
- [ ] Sections stack properly
- [ ] Navigation adapts
- [ ] Cards resize correctly
- [ ] Text readable

#### Mobile (375px):
```
F12 → Responsive Design Mode → 375x667
```
- [ ] Single column layout
- [ ] Hamburger menu appears
- [ ] Touch targets adequate
- [ ] No horizontal scroll
- [ ] Text not too small

---

### ⚡ Performance Testing

#### Lighthouse Audit:
```
F12 → Lighthouse Tab → Generate Report
```
**Target Scores:**
- [ ] Performance: 80+
- [ ] Accessibility: 90+
- [ ] Best Practices: 90+
- [ ] SEO: 90+

#### Load Time Check:
```
F12 → Network Tab → Reload Page
```
- [ ] DOMContentLoaded: < 2s
- [ ] Load complete: < 4s
- [ ] No failed requests (all green/blue)

---

## 🚨 PHASE 5: ERROR CHECKING

### Console Errors:
```
F12 → Console
```
**Check for:**
- [ ] No red errors
- [ ] No yellow warnings (or only minor)
- [ ] No 404s (missing images/files)

### Network Errors:
```
F12 → Network Tab
```
**Check for:**
- [ ] All requests successful (green)
- [ ] Images load (check status 200)
- [ ] No CORS errors
- [ ] Resume.pdf loads (when clicked)

---

## 🎨 PHASE 6: ANIMATION TESTING

### Scroll Animations:
1. **Scroll to top** (`Home` key)
2. **Slowly scroll down** through each section
3. **Observe:**
   - [ ] Content fades in as you scroll
   - [ ] Cards stagger in (appear one by one)
   - [ ] Smooth transitions
   - [ ] No jumpy animations

### Hover Animations:
- [ ] Buttons: Hover effect works
- [ ] Cards: Lift and glow on hover
- [ ] Links: Color change on hover
- [ ] Icons: Scale/color on hover

### Interactive Animations:
- [ ] Navigation active indicator slides smoothly
- [ ] Hero typing animation loops correctly
- [ ] Counter animations count up smoothly
- [ ] Form fields animate on focus

---

## 📋 PHASE 7: CONTENT VERIFICATION

### Data Accuracy:
- [ ] Personal info correct (name, tagline, location)
- [ ] Experience dates and companies accurate
- [ ] Project descriptions match reality
- [ ] Skills list is current
- [ ] Achievements/awards are real
- [ ] Links go to correct destinations

### Text Check:
- [ ] No typos in headings
- [ ] No grammatical errors in descriptions
- [ ] Numbers are accurate (2M+ users, 98%+ accuracy)
- [ ] Dates are correct

---

## 🏁 PHASE 8: FINAL CHECKS BEFORE BUILD

### Cleanup Check:
```bash
# Stop dev server first (Ctrl+C in terminal)

# Check for console.log statements
grep -r "console.log" src/ | grep -v "node_modules"
```
**Expected:** Only intentional logs (or none)

### Git Status:
```bash
git status
```
**Review:** All changes we want to commit

---

## 🔧 TROUBLESHOOTING COMMANDS

### If Dev Server Won't Start:
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

### If Images Don't Load:
```bash
# Check file exists
ls -la public/images/hero/profile.jpg
ls -la public/resume.pdf
```

### If Build Fails:
```bash
# Full rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

### If Port 3000 Busy:
```bash
# Find process using port 3000
lsof -i :3000

# Kill process (replace PID)
kill -9 <PID>

# Or use different port
PORT=3001 npm run dev
```

---

## ✅ TESTING SUMMARY CHECKLIST

After completing all phases above:

- [ ] All sections display correctly
- [ ] All animations work smoothly
- [ ] No console errors
- [ ] Navigation works perfectly
- [ ] Forms function properly
- [ ] Responsive on all screen sizes
- [ ] All links work
- [ ] Images load (or fallbacks work)
- [ ] Performance is good (80+ Lighthouse)
- [ ] Content is accurate

---

## 🚀 READY FOR NEXT PHASE

Once all checks pass:
1. ✅ Testing complete
2. ✅ Ready to commit changes
3. ✅ Ready for production build
4. ✅ Ready to deploy

**Next Document:** Review `REPO_CLEANUP_PLAN.md` for cleanup steps
**Then:** Proceed with final deployment

---

**Status:** Ready for Testing  
**Estimated Time:** 30-45 minutes for thorough testing
