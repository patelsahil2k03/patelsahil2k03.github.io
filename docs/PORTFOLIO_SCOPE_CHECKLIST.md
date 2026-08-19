# Portfolio Scope Checklist

> **Project:** `patelsahil2k03.github.io`  
> **Last updated:** 2026-05-29  
> **Deploy:** Live on GitHub Pages (2026-05-29, includes case studies + Inter revert `7e71be5`)  
> **Git rules:** `UNIVERSAL_GIT_RULES.md` (Conventional Commits, no secrets, no Co-authored-by)

---

## What affects the live website vs local-only tooling

| In git / deploy | Affects https://patelsahil2k03.github.io? |
|-----------------|----------------------------------------|
| `src/` (Next.js app, case studies, components) | **Yes** — this is the site |
| `public/` (images, resume) | **Yes** |
| `design-system/` (persisted tokens — already applied in CSS/fonts) | **No at runtime** — reference for future edits; site uses baked-in styles |
| `.cursor/skills/` (UI UX Pro Max + CSVs) | **No** — Cursor IDE only, never deployed |
| `.env.local` / GitHub secrets (Clarity ID) | **Build-time only** — not in repo |

**You do not push LLM/Cursor skills.** They are dev helpers. The GitHub Pages build runs `npm run build` on app code only.

---

## Verification gate (before every commit)

| Check | Command / action | Status |
|-------|------------------|--------|
| Production build | `npm run build` | Pass (12 static pages) |
| Lint | `npm run lint` | Pass (legacy `src/comps/` img warnings only) |
| No `.env` staged | `git ls-files \| grep env` | `.env.local` gitignored |
| No `.cursor/` staged | `git ls-files .cursor` should be empty | `.cursor/` gitignored |
| No secrets in diff | manual / grep | OK |
| Clarity ID not in committed files | only `.env.local` + GH secret | OK |

---

## Phase 3B — Case studies (blog architecture)

| # | Item | Status | Notes |
|---|------|--------|-------|
| 1 | Data model `src/data/caseStudies.ts` | Done | 7 studies, `publishedAt`, `articleSections` hook |
| 2 | Utils `src/lib/caseStudyUtils.ts` | Done | TOC ids, prev/next, cross-link helpers |
| 3 | `/case-studies/` listing + filters | Done | |
| 4 | `/case-studies/[slug]/` articles | Done | 7 static routes |
| 5 | Homepage teaser (3 featured + CTA) | Done | `#case-studies` |
| 6 | Article TOC | Done | |
| 7 | Article prev / next | Done | By `publishedAt` |
| 8 | Related case studies block | Done | |
| 9 | Clarity `case-study-view-{slug}` | Done | |
| 10 | Content refinement (user pointers) | Pending | Draft copy OK for now |
| 11 | Hero images per study | Pending | Phase 3 assets |
| 12 | MDX migration | Pending | Optional later |
| 13 | **Deploy to GitHub Pages** | Done | Auto-deploy on push to `main` |

---

## Cross-links & navigation

| # | Item | Status |
|---|------|--------|
| 1 | Nav → `/case-studies/` | Done |
| 2 | Nav → Publications `/#publications` | Done |
| 3 | Footer quick links (incl. case studies) | Done |
| 4 | Experience → case studies (`relatedExperienceId`) | Done |
| 5 | Projects → case studies (`relatedProjectId`) | Done |
| 6 | Subpages → `/#section` hash links | Done |

---

## Portfolio polish (same scope batch)

| # | Item | Status |
|---|------|--------|
| 1 | Achievements summary labels fix | Done |
| 2 | SEO metadata ← `seo.ts` in `layout.tsx` | Done |
| 3 | Fonts: Inter (site-wide; matches live Phase 2) | Done — Archivo/Space Grotesk deferred (see design-system/) |
| 4 | Hero: Medium + Google Scholar | Done |
| 5 | Contact → mailto pre-fill | Done |
| 6 | `prefers-reduced-motion` in CSS | Done |
| 7 | Remove erroneous `html.dark` | Done |

---

## Tooling & design system

| # | Item | In git? | Notes |
|---|------|--------|-------|
| 1 | UI UX Pro Max skill | **No** — local only | `.cursor/skills/ui-ux-pro-max/` (gitignored) |
| 2 | Skill CSV datasets (24 files) | **No** — local only | Bundled with skill; not portfolio code |
| 3 | Design system persisted | **Yes** | `design-system/sahil-patel-portfolio/` |
| 4 | Page override case-studies | **Yes** | `pages/case-studies.md` |

### Install UI skill locally (optional, for Cursor UX work)

```bash
cd patelsahil2k03.github.io
npx uipro-cli init --ai cursor
```

Restart Cursor after install. Skill + CSVs stay on your machine; **do not commit `.cursor/`**.

To regenerate design hints (optional):

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "portfolio case studies" --design-system --persist -p "Sahil Patel Portfolio"
```

Commit only the updated `design-system/` output if tokens change — not the skill folder.

---

## Git branching (2026-05-29)

| Branch | Role |
|--------|------|
| `dev` | Default — daily work, CI on push |
| `main` | Production — deploy to GitHub Pages |
| `feature/*` etc. | Branch from `dev` → merge to `dev` → release merge to `main` |

See `BRANCH_STRATEGY.md` at repo root.

---

## Deferred (out of current scope)

| Item | Track in |
|------|----------|
| Project screenshots | `ASSETS_GUIDE.md` / Phase 3 |
| Sitewide scroll reveals | `PORTFOLIO_REFERENCE.md` P3 |
| Skills: all 50+ technologies | `PORTFOLIO_REFERENCE.md` |
| About “Beyond Tech” | `PORTFOLIO_REFERENCE.md` |
| Legacy `src/comps/` cleanup | Tech debt |
| Lighthouse audit post-deploy | After push |
| Monorepo other 19 repos | `REPO_IMPROVEMENT_PLAN.md` |

---

## Commit log (this milestone)

| Commit | Type | Summary |
|--------|------|---------|
| `838891a` | `feat(portfolio)` | Case studies routes + cross-links + polish |
| `96da8f9` | `chore(tooling)` | Design system + scope checklist (skill was tracked here — later removed) |
| `5b27962` | `docs` | Record commit SHAs in checklist |
| `901ce48` | `chore` | Stop tracking `.cursor/` skill |
| `7e71be5` | `fix` | Restore Inter typography on live site |
| `d377b20` | `docs` | Mark deploy complete on checklist |
| `6adbffc` | `docs` | `dev`/`main` branch strategy + CI workflow |

---

## Related docs

- `docs/CASE_STUDIES.md` — content inventory per slug
- `PORTFOLIO_REFERENCE.md` — inspiration & long-term roadmap
- `docs/DEPLOYMENT.md` — build, deploy, Clarity, `dev` → `main` release flow
- `BRANCH_STRATEGY.md` — default branch `dev`, production `main`
- `design-system/sahil-patel-portfolio/MASTER.md` — design tokens (committed)
