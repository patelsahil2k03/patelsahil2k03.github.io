# Resume Improvement Notes

> Source: `resume/main.tex` (LaTeX, 298 lines) — matches `public/resume.pdf` exactly, confirmed by reading both.
> This doc is a menu, not a mandate — **you decide what to change.** Every item below cites the exact `main.tex` line(s) so you can jump straight there. Facts are cross-checked against `~/Sahil/career-growth/TIMELINE_ANALYSIS.md` (a git-history-verified career timeline built earlier this session) and this repo's `src/data/experience.ts` / `src/data/achievements.ts`.

---

## Critical — factual errors (same two the portfolio website had, now fixed there)

### 1. Team Star Award date is wrong
**Line 199:**
```latex
{\textbf{Digiflux Technologies Pvt Ltd} $|$ \footnotesize\emph{Associate Software Engineer (\textbf{Team Star Award}, June 2024)}}{Jan 2024 -- Present}
```
`June 2024` → should be **March 2025** (First Annual Townhall — verified via git-history-cross-checked career timeline).

### 2. AI-Manthan / ForeSight date is wrong, in two places
**Line 233:**
```latex
{\href{...}{\textbf{ForeSight - IT Project Risk Prediction} \faExternalLink*} $|$ \emph{...}}{Jan 2025}
```
**Line 278:**
```latex
\resumeBulletedProjectHeading{Top 10 Finalist - AI-Manthan Hackathon by AtliQ Technologies among 70+ teams (January 2025)}
```
Both `January 2025` → should be **October 2025** (confirmed via the hackathon repo's git init timestamp: `2025-10-11`).

---

## Critical — the resume reads ~14 months stale

Every number currently *on* the resume checks out accurately (2M+ users, 125K+ customers, 93.17%, 44K+ workers, 40% reduction, 90%+, 98.04% — all verified). The problem is what's missing: the resume stops at roughly early-2025 and doesn't reflect anything since.

### 3. Missing: AI Catalyst 2026 (your most recent, most senior recognition)
Nothing in `main.tex` mentions this at all. Second Annual Townhall, March 2026, Special Recognition for advancing AI-driven solutions — one year after Team Star.

**Option A — inline next to the job title** (mirrors how Team Star is currently shown on line 199):
```latex
{\textbf{Digiflux Technologies Pvt Ltd} $|$ \footnotesize\emph{Associate Software Engineer (\textbf{Team Star Award} Mar 2025, \textbf{AI Catalyst 2026} Mar 2026)}}{Jul 2024 -- Present}
```
**Option B — its own bullet in Publications & Achievements**, next to line 278:
```latex
\resumeBulletedProjectHeading{AI Catalyst 2026 - Special Recognition, Second Annual Townhall, Digiflux Technologies (March 2026)}
```

### 4. Missing: MIXA (your single most senior-scope project right now)
517K+ products across 29 marketplaces (EN+AR), gRPC semantic search API with Pinecone (5,109 category mappings), PostgreSQL→MongoDB sync, Cloudflare R2 image processing — full platform ownership since Jan 2026. Not mentioned anywhere.

**Suggested new Experience bullet**, to add after line 205 (the "AI SaaS" bullet):
```latex
\resumeItem{\textbf{MIXA (Creator-Commerce Platform):} Architected and own a platform indexing \textbf{517K+ products across 29 marketplaces} (EN+AR); Built \textbf{gRPC semantic search API} with Pinecone vector search (5,109 category mappings); Engineered PostgreSQL$\to$MongoDB sync pipeline and Cloudflare R2 image processing}
```

### 5. Missing: MOLT
NestJS microservice mesh (auth/coach/fitness/meal-logging/user) powering Delicut's fitness ecosystem, plus a standalone React Native app with Fitbit/Garmin/Oura integrations — Feb 2026 onward.

**Suggested new Experience bullet**, same location:
```latex
\resumeItem{\textbf{MOLT:} Designed \textbf{NestJS microservice mesh} (gRPC) powering a fitness ecosystem; Built standalone \textbf{React Native app} with Fitbit/Garmin/Oura wearable integrations}
```

### 6. Underrepresented: Zikhara
Currently just "Created Adobe Photoshop plugin (React)" on line 205 — doesn't name the project, doesn't mention the SaaS follow-on (catalog data pipelines, serverless image compression). If you want to keep this brief, consider at minimum naming it:
```latex
\resumeItem{\textbf{Zikhara:} Built \textbf{Adobe Photoshop UXP plugin} (React) used by production designers; Engineered \textbf{SaaS catalog pipelines} and serverless image compression}
```

### 7. Not mentioned at all: Delicut WhatsApp bot, LangGraph Redmine agents, decodeU BLE printer
Smaller in scope than MIXA/MOLT — your call on whether any of these are worth a line, or better left out to keep the resume tight. Listed here for completeness, not urged.

---

## Worth reconsidering (not wrong, just a judgment call)

### 8. "Jan 2024 – Present" merges your internship and full-time role
**Line 199**, the date range `{Jan 2024 -- Present}`. Verified actual timeline: internship **Jan 16 – Jun 16, 2024**, full-time from **Jul 8, 2024**. The current merged line slightly overstates full-time tenure by ~6 months, and it hides a genuinely good signal — you were hired full-time after the internship. Two ways to handle it:
- Simplest fix: change to `{Jul 2024 -- Present}` and don't mention the internship separately (slightly understates total time at the company, but is accurate for the "Associate Software Engineer" title specifically).
- More complete: add a second, smaller entry for the internship period above or below, the way `src/data/experience.ts` now does it (two separate rows, `digiflux-ase` and `digiflux-intern`).

### 9. Generic opening bullet
**Line 201:**
```latex
\resumeItem{Developing and integrating AI models; Built responsive UIs using React.js; Deployed ML applications with LangChain, OpenAI, Docker}
```
This reads as filler next to the specific, scoped bullets right below it (FinTech/FoodTech/HealthTech). Consider cutting it, or replacing with something that states scope/seniority up front (e.g., "Own production AI/full-stack systems across FinTech, FoodTech, and HealthTech, serving 2M+ users at scale").

### 10. No opening summary line
The resume goes straight from name/contact to Education. A tight 1-2 line summary before Education (or replacing the generic bullet above) could establish seniority and domain breadth before a recruiter reaches the Experience section — optional, stylistic.

### 11. Skills section doesn't reflect the newer stack
**Lines 182-190.** No mention of gRPC, Pinecone/vector search, or NestJS — all now real, current parts of your stack via MIXA/MOLT. Worth adding to the `Frameworks`/`AI/ML`/`Cloud & Tools` lines if you add the MIXA/MOLT bullets above.

---

## Summary checklist

- [ ] Fix Team Star date (line 199): June 2024 → March 2025
- [ ] Fix ForeSight/AI-Manthan date (lines 233, 278): January 2025 → October 2025
- [ ] Add AI Catalyst 2026 (pick Option A or B above)
- [ ] Add MIXA bullet
- [ ] Add MOLT bullet
- [ ] Decide on Zikhara naming/detail
- [ ] Decide on Delicut WhatsApp bot / Redmine agents / decodeU (include or skip)
- [ ] Decide on the Jan 2024 vs Jul 2024 date range question
- [ ] Decide on the generic opening bullet / summary line
- [ ] Update Skills section if MIXA/MOLT bullets are added
