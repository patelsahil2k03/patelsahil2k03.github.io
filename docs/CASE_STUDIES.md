# Case studies

How case studies are shaped, routed and planned. The studies themselves (titles, roles, dates, figures) live only in
`src/data/caseStudies.ts`; their figures in `docs/CLAIMS_LEDGER.md`. This file does not repeat them.

## Routes and code

| URL | What | Code |
|---|---|---|
| `/#case-studies` | Homepage "Selected work": four studies with role, figure and footnoted results, then the rest as a list | `src/components/home/SelectedWork.tsx` |
| `/case-studies/` | Every study, production first then newest, with type filters and its own notes | `src/components/case-studies/CaseStudyIndex.tsx` |
| `/case-studies/<slug>/` | One study read like a short paper | `src/components/case-studies/CaseStudyArticle.tsx` |

The homepage four are an explicit id list (`homepageFeaturedCaseStudies` in the data file), never array order. Slugs are stable URLs:
three keep older words (`fitness-microservice-platform`, `foodtech-meal-chatbot`, `healthtech-ops-platform`) so links do not break.

## Shape of a study

Hook (the outcome in one sentence) → role (one line, on the evidence ladder of `nextprompt.md` §6) → industry context → insight
(what was learned, grounded in what was built) → what I built → results (each figure in the ledger) → stack (only what the work used)
→ date (first commit or publisher record, never a guess).

Optional: `figure` (the real pipeline as ordered steps, no figures inside it), `architectureDiagram` (Mermaid, themed from the
design tokens) with `architectureCaption`, and `articleSections[]` for extra headings. The article footer shows Stack, and Topics
only where they add something the stack does not.

Types: `production`, `build`, `poc` (shown as "Proof of concept"), `research`; each has a filter on `/case-studies/`.

## Planned (waiting on the owner's scope and figures)

| Topic | Note |
|---|---|
| WhatsApp/Twilio ordering bot | Part of the FoodTech study today; its own study only if scope and figures arrive |
| MCP agentic RAG | A `deep-dive` from the monorepo demo |
| Screenshots | `image` field per study; assets are owner input B1 |

## Analytics

`case-study-view-{slug}` fires on each article load (`src/lib/clarity.ts`); listing and homepage links fire nothing extra.
