# Deployment Guide (GitHub Pages, Next.js 14)

This file summarizes the production deployment for the portfolio and replaces the older
`DEPLOYMENT_COMPLETE.md` and `DEPLOYMENT_SUMMARY.md`.

---

## Live deployment

- **Live URL:** `https://patelsahil2k03.github.io`  
- **Framework:** Next.js 14 (App Router, static export)  
- **Hosting:** GitHub Pages (via GitHub Actions)  
- **First production deploy:** 2026-03-06 (Version 2.0)
- **Case studies release:** 2026-05-29 (`838891a` → `main`; 12 static pages including `/case-studies/`)

Key build metrics from the first deploy:

- Main page size: **71.2 kB**
- First Load JS: **159 kB**
- Build time: ~90 seconds (Node 20 on GitHub Actions)

---

## What is deployed

All of the following are live and working in production:

- **Hero section**
  - Typing animation over multiple roles
  - Counter animations (experience, projects, publications, CGPA, etc.)
  - Impact statement (“Built and now own production systems serving 2M+ users”)
  - 3 CTAs: View My Work, Get in Touch, Download Resume
  - Social links: GitHub, LinkedIn, LeetCode, Email

- **Navigation**
  - Glassmorphism with backdrop blur
  - Smooth scroll to sections
  - Active section highlight
  - Mobile menu with animations

- **Sections**
  - About, Experience, Skills, Projects, Publications, Achievements, Contact
  - 1400px content width with improved padding/margins
  - Hover effects and responsive layouts

- **Achievements filtering**
  - Categories: Awards, Certifications, Hackathons, Events, Badges, Publications
  - “All Achievements” shows everything

- **Case studies** (2026-05-29)
  - Homepage teaser at `/#case-studies`
  - Listing at `/case-studies/` with type filters
  - Seven article pages at `/case-studies/[slug]/` (TOC, prev/next, related studies)
  - Cross-links from Experience and Projects sections

---

## Branch workflow (`dev` → `main`)

| Branch | Deploy? |
|--------|---------|
| `dev` (default) | No — CI runs `npm run build` + `npm run lint` (`.github/workflows/ci.yml`) |
| `main` | Yes — GitHub Pages via `.github/workflows/portfolio.yml` |

Release when ready:

```bash
git checkout main && git merge dev && git push origin main
git checkout dev
```

See `BRANCH_STRATEGY.md` at the repo root.

---

## Build configuration

**`next.config.js`**

- `output: 'export'` – static HTML export (GitHub Pages compatible)
- `images.unoptimized: true` – required for static image handling
- `trailingSlash: true` – exported URLs end with `/`

**GitHub Actions workflow** – `.github/workflows/portfolio.yml`:

1. Triggered on pushes to `main` (and manual `workflow_dispatch`)
2. Detects package manager (npm)
3. Installs dependencies (`npm install`)
4. Runs `npm run build`
5. Uploads `./out` as the Pages artifact
6. Deploys to the `github-pages` environment with `deploy-pages@v4`

---

## Local commands

From the project root (`patelsahil2k03.github.io`):

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Production build (static export into out/)
npm run build
```

Deployment is via **GitHub Actions → Pages** on every push to `main` — there is no manual deploy script (the old `npm run deploy`/`gh-pages` path was removed).

---

## Microsoft Clarity (analytics)

Session recordings and heatmaps use [@microsoft/clarity](https://www.npmjs.com/package/@microsoft/clarity), initialized in `src/components/analytics/ClarityAnalytics.tsx` from the root layout.

### Setup

1. Sign in at [clarity.microsoft.com](https://clarity.microsoft.com).
2. Open your project (or **Add new project** → enter `https://patelsahil2k03.github.io`).
3. Go to **Settings** (gear icon) → **Overview**.
4. Copy the **Project ID** (short alphanumeric string, e.g. `abcdefghij`).
3. **Local:** copy `.env.example` to `.env.local` and set:
   ```bash
   NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
   ```
   Clarity is disabled in `npm run dev` by default (production builds only).
4. **GitHub Pages:** add repository secret `NEXT_PUBLIC_CLARITY_PROJECT_ID` with the same value so the ID is inlined during CI `npm run build`.

### Verify

After deploy, open the live site, click a few sections, then in Clarity → **Recordings** confirm new sessions appear (may take a few minutes).

### Custom events tracked

| Event | When |
|-------|------|
| `view-projects` | Hero “View My Work” |
| `contact-cta` | Hero or nav “Get in Touch” |
| `resume-download` | Hero or Contact resume button |
| `case-study-view-{slug}` | Case study article page load |

View under Clarity → **Dashboard** / **Smart events** after traffic.

Contact uses **mailto** (no server-side form submit event).

---

## Deployment checklist

Before merging **`dev` → `main`** for a production deploy:

- [ ] All navigation tabs are clickable and scroll correctly
- [ ] Hero CTAs work (View My Work → Projects, Get in Touch → Contact, Download Resume)
- [ ] Social links open the correct profiles
- [ ] Achievements filters behave as expected
- [ ] Case studies listing + at least one article route load correctly
- [ ] No obvious layout issues (width/padding/margins on desktop + mobile)
- [ ] `npm run build` and `npm run lint` pass on `dev`

If all checks pass:

```bash
git checkout main && git merge dev && git push origin main
git checkout dev
```

GitHub Actions will build and deploy automatically.

---

## Historical notes

Full, narrative deployment reports from March 2026 are preserved in:

- `docs/archive/PHASE2_MILESTONE.md` – Phase 2 completion + roadmap  
- `docs/archive/DEBUG_PHASE2.md` – detailed issue diagnosis and fix logs

Those files are useful for deep dives; this page is the concise “how to deploy” reference.

