# Case Studies — Content Inventory & Status

**Last updated:** 2026-08-22  
**Architecture:** Blog-style routes + homepage teaser  
**Scope status:** Shipped on GitHub Pages; 10 studies live (7 original + 3 added 2026-08-21 covering more recent senior-scope work); copy/images still draft

---

## Routes

| URL | Purpose |
|-----|---------|
| `/#case-studies` | Homepage teaser (3 featured cards + CTA) |
| `/case-studies/` | Full listing with type filters |
| `/case-studies/[slug]/` | Article page (context → insight → contribution) |

**Data:** `src/data/caseStudies.ts`  
**Listing UI:** `src/components/case-studies/CaseStudyIndex.tsx`  
**Article UI:** `src/components/case-studies/CaseStudyArticle.tsx`  
**Homepage teaser:** `src/components/sections/CaseStudies.tsx`

---

## Content model (3 layers + article)

| Layer | Article heading |
|-------|-----------------|
| Industry context | Problem & industry context |
| Insight | Insight |
| Contribution | What I built |
| (auto) | Technical approach (from `technologies` + `topics`) |

Optional later: `articleSections[]` in data, then MDX under `content/case-studies/`.

---

## Inventory

| Slug | Title | Type | Featured (home) | Status |
|------|-------|------|-----------------|--------|
| `ecommerce-marketplace-content-platform` | AI-Powered Marketplace Content & Search Platform | production | **yes (teaser)** | Draft |
| `fitness-microservice-platform` | Microservice Mesh for a Fitness & Wellness Platform | production | **yes (teaser)** | Draft |
| `fintech-lambda-scrapers` | FinTech Data Pipeline at Scale | production | **yes (teaser)** | Draft |
| `foodtech-meal-chatbot` | Conversational AI for Meal Subscriptions | production | listing only | Draft |
| `healthtech-ops-platform` | HealthTech Workforce Operations Platform | production | listing only | Draft |
| `sales-forecasting-cnn-lstm` | Hybrid CNN+LSTM Sales Forecasting | production | listing only | Draft |
| `adobe-uxp-catalog-plugin` | An Adobe Photoshop Plugin Real Designers Use | build | listing only | Draft |
| `foresight-risk-prediction` | ForeSight — IT Project Risk Prediction | poc | listing only | Draft |
| `edtech-question-paper-nlp` | AI-Driven Exam Paper Quality Assessment | research | listing only | Draft |
| `bird-detection-aerial` | Small Object Detection in Aerial Imagery | research | listing only | Draft |

Homepage teaser (`homepageFeaturedCaseStudies`) is an **explicit id-based pick**, not array-order slicing (fixed 2026-08-22 — the 2 newest studies were marked `featured: true` but weren't actually appearing on the homepage because of array-order side effects). Currently: marketplace platform, fitness microservices, FinTech pipeline.

Note: `adobe-uxp-catalog-plugin` is `type: 'build'`, which has no dedicated filter button on `/case-studies/` yet (`caseStudyFilters` only has All/Production/POC/Research) — it still shows under "All". Single-item filter category not added yet; revisit if more `build`-type studies are added.

---

## Planned (manual / assets later)

| Topic | Notes |
|-------|--------|
| Twilio chatbot | Add slug when you share scope & metrics |
| MCP agentic RAG | `deep-dive` from monorepo demo |
| Screenshots | `public/case-studies/{slug}.png` + `image` field |
| MDX migration | Long-form sections when copy stabilizes |

---

## Refinement checklist (when you send pointers)

- [ ] Tone (technical vs business)
- [ ] Metrics (NDA-safe)
- [ ] Swap homepage featured 3 (`homepageFeaturedCaseStudies` order in data)
- [ ] Add `articleSections` for extra headings
- [ ] GitHub / paper / DOI URLs

---

## Analytics (Clarity)

- `case-study-view-{slug}` — article page load
- Listing and homepage use link navigation (no expand events)

---

## Cross-links (wired)

- **Experience:** `relatedExperienceId` → timeline “Related case studies” links
- **Projects:** `relatedProjectId` → “Case study: …” under project card
- **Articles:** TOC, prev/next by `publishedAt`, related studies by type

---

## Also completed (portfolio polish)

- Nav: **Publications** added
- Achievements summary labels fixed
- SEO metadata unified via `seo` + `personalInfo` in `layout.tsx`
- Hero: **Medium** + **Google Scholar** social links
- Contact → **mailto** with pre-filled body (honest UX)
- Fonts: **Inter** site-wide (live); Archivo/Space Grotesk deferred (see `PORTFOLIO_REFERENCE.md`)
- Design system: tokens documented in `PORTFOLIO_REFERENCE.md` (unused Cursor-generated boilerplate removed 2026-08-20)
- **Deploy:** `main` → GitHub Actions; daily work on `dev` (see `BRANCH_STRATEGY.md`)

---

## UI tooling (local only — not deployed)

UI UX Pro Max is **optional Cursor dev tooling**. It does not ship with the site.

```bash
cd patelsahil2k03.github.io
npx uipro-cli init --ai cursor   # installs .cursor/skills/ locally — do not commit
```

Restart Cursor after install. The skill's persisted design-system output is no longer used — the generated boilerplate never matched the live site and was deleted 2026-08-20; design tokens are documented and manually maintained in `PORTFOLIO_REFERENCE.md` instead.
