# Portfolio Scope Checklist

> **Project:** `patelsahil2k03.github.io`  
> **Last updated:** 2026-08-21  
> **Deploy:** Live on GitHub Pages (2026-08-20, `main@4329a4f` — production-readiness pass: dead code removal, doc consolidation, a11y fixes, SEO/sitemap, tooling cleanup; see `docs/superpowers/plans/2026-08-19-portfolio-production-readiness.md` for the full task-by-task record)  
> **Git rules:** `UNIVERSAL_GIT_RULES.md` (Conventional Commits, no secrets, no Co-authored-by)

---

## What affects the live website vs local-only tooling

| In git / deploy | Affects https://patelsahil2k03.github.io? |
|-----------------|----------------------------------------|
| `src/` (Next.js app, case studies, components) | **Yes** — this is the site |
| `public/` (images, resume) | **Yes** |
| `.cursor/skills/` (UI UX Pro Max + CSVs) | **No** — Cursor IDE only, never deployed |
| `.env.local` / GitHub secrets (Clarity ID) | **Build-time only** — not in repo |

**You do not push LLM/Cursor skills.** They are dev helpers. The GitHub Pages build runs `npm run build` on app code only.

---

## Verification gate (before every commit)

| Check | Command / action | Status |
|-------|------------------|--------|
| Production build | `npm run build` | Pass (12 static pages) |
| Lint | `npm run lint` | Pass |
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
| 3 | Fonts: Inter (site-wide; matches live Phase 2) | Done — Archivo/Space Grotesk deferred (see `PORTFOLIO_REFERENCE.md`) |
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
| 3 | Design system persisted | **Removed** | Unused Cursor-generated boilerplate, deleted 2026-08-20; design tokens now documented in `PORTFOLIO_REFERENCE.md` |
| 4 | Page override case-studies | **Removed** | Deleted 2026-08-20 (never adapted to the real `/case-studies/` feature) |

### Install UI skill locally (optional, for Cursor UX work)

```bash
cd patelsahil2k03.github.io
npx uipro-cli init --ai cursor
```

Restart Cursor after install. Skill + CSVs stay on your machine; **do not commit `.cursor/`**.

The skill's `--design-system --persist` output is no longer used — the generated boilerplate never matched the live site and was deleted (see row 3 above). Design tokens are now documented and manually maintained in `PORTFOLIO_REFERENCE.md` instead.

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
| Lighthouse audit post-deploy | After push |
| Monorepo other 19 repos | `REPO_IMPROVEMENT_PLAN.md` |

---

## Commit log

**Case studies milestone (through 2026-05-29):** `838891a` (routes + cross-links + polish), `96da8f9` (design system + scope checklist), `5b27962` (record commit SHAs), `901ce48` (stop tracking `.cursor/` skill), `7e71be5` (restore Inter typography), `d377b20` (mark deploy complete), `6adbffc` (`dev`/`main` branch strategy + CI).

**Production-readiness pass (2026-08-19 – 2026-08-20, 26 commits):** dead-code removal, doc consolidation, content accuracy fixes, git-history remediation, asset optimization, accessibility fixes, SEO/sitemap, tooling cleanup — full task-by-task record with commit SHAs in `docs/superpowers/plans/2026-08-19-portfolio-production-readiness.md`, not duplicated here.

---

## Related docs

- `docs/CASE_STUDIES.md` — content inventory per slug
- `PORTFOLIO_REFERENCE.md` — inspiration, long-term roadmap, and design tokens
- `docs/DEPLOYMENT.md` — build, deploy, Clarity, `dev` → `main` release flow
- `BRANCH_STRATEGY.md` — default branch `dev`, production `main`
- `docs/superpowers/plans/2026-08-19-portfolio-production-readiness.md` — the full production-readiness plan and task-by-task execution ledger
- `resume/main.tex` + `resume/RESUME_IMPROVEMENTS.md` — resume LaTeX source and pending review notes (not yet applied)
