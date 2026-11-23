# Personal Agent Skills Directory & Catalog

A curated directory of best-in-class agent skills for rapid onboarding, design engineering, web automation, intelligence, and discovery.

---

## ⚡ Quick Start: One-Click Batch Installation

To install all curated skills and CLI dependencies across all AI agents (Antigravity, Cursor, Claude Code, etc.), run:

```bash
# 1. Install agent skills globally
npx -y skills add "https://github.com/obra/superpowers" --skill "brainstorming" -g -y
npx -y skills add "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" --skill "ui-ux-pro-max" -g -y
npx -y skills add "https://github.com/vercel-labs/skills" --skill "find-skills" -g -y
npx -y skills add "https://github.com/anthropics/skills" --skill "frontend-design" -g -y
npx -y skills add "https://github.com/vercel-labs/agent-browser" --skill "agent-browser" -g -y
npx -y skills add "https://github.com/leonxlnx/taste-skill" --skill "design-taste-frontend" -g -y
npx -y skills add "https://github.com/firecrawl/cli" --skill "firecrawl" -g -y

# 2. Install native CLI companion packages
npm install -g agent-browser firecrawl-cli
```

---

## 🚀 Ephemeral / On-Demand Invocation (`npx skills use`)

If you want an agent to pull and execute a skill ephemerally for a single session without permanent installation:

```bash
# Brainstorming
npx -y skills use "https://github.com/obra/superpowers" --skill "brainstorming"

# UI/UX Pro Max
npx -y skills use "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" --skill "ui-ux-pro-max"

# Find Skills
npx -y skills use "https://github.com/vercel-labs/skills" --skill "find-skills"

# Anthropic Frontend Design
npx -y skills use "https://github.com/anthropics/skills" --skill "frontend-design"

# Agent Browser
npx -y skills use "https://github.com/vercel-labs/agent-browser" --skill "agent-browser"

# Design Taste Frontend (Anti-Slop)
npx -y skills use "https://github.com/leonxlnx/taste-skill" --skill "design-taste-frontend"

# Firecrawl Web Scraping & Research
npx -y skills use "https://github.com/firecrawl/cli" --skill "firecrawl"
```

---

## 📚 Curated Skills Catalog

### 1. `brainstorming`
* **Source:** [https://github.com/obra/superpowers](https://github.com/obra/superpowers)
* **Install:** `npx -y skills add "https://github.com/obra/superpowers" --skill "brainstorming" -g -y`
* **Domain:** Feature discovery, architecture design, intent refinement.
* **When to use:** Before any creative work, building features, designing components, adding functionality, or modifying behavior.
* **Core Workflow:**
  * Classifies work into 3 paths: **Spike** (feasibility/question), **Bounded** (scoped changes in existing code), or **Architectural** (new systems/interfaces).
  * Enforces **Hard-Gate approval** with the user before touching implementation.
  * Optional visual companion for browser-based diagrams/mockups.

---

### 2. `ui-ux-pro-max`
* **Source:** [https://github.com/nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)
* **Install:** `npx -y skills add "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill" --skill "ui-ux-pro-max" -g -y`
* **Domain:** Searchable UI/UX design intelligence database (79 styles, 192 palettes, 74 font pairings, 119 UX guidelines, 22 stacks).
* **When to use:** Designing pages, creating/refactoring UI components, choosing palettes/typography/spacing, reviewing UX & accessibility.
* **CLI / Script Usage:**
  ```bash
  # Generate full design system for a project
  python3 ~/.agents/skills/ui-ux-pro-max/scripts/search.py "modern luxury fashion e-commerce" --design-system -p "BrandName"

  # Search specific UX guideline or stack
  python3 ~/.agents/skills/ui-ux-pro-max/scripts/search.py "accessibility contrast focus" --domain ux
  python3 ~/.agents/skills/ui-ux-pro-max/scripts/search.py "responsive navbar" --stack nextjs
  ```

---

### 3. `find-skills`
* **Source:** [https://github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)
* **Install:** `npx -y skills add "https://github.com/vercel-labs/skills" --skill "find-skills" -g -y`
* **Domain:** Skills ecosystem discovery and package management.
* **When to use:** When the user or agent needs a specialized capability, tool, workflow, or asks "how do I do X" or "is there a skill for X".
* **CLI Usage:**
  ```bash
  # Search skills across skills.sh directory
  npx skills find <query>
  npx skills find react performance
  npx skills find changelog
  ```

---

### 4. `frontend-design`
* **Source:** [https://github.com/anthropics/skills](https://github.com/anthropics/skills)
* **Install:** `npx -y skills add "https://github.com/anthropics/skills" --skill "frontend-design" -g -y`
* **Domain:** Distinctive visual identity, intentional layout, anti-AI boilerplate.
* **When to use:** Shaping visual identity for pages, designing bespoke layouts, avoiding repetitive AI clichés (cream backgrounds, terracotta accents, generic card grids).
* **Core Philosophy:**
  * Ground design deeply in the brief's real domain and content.
  * Pick 1 memorable visual feature; keep everything else quiet and disciplined.
  * Two-pass process: define compact tokens (Color, Type, Layout, Principles), critique against generic defaults, then implement.

---

### 5. `agent-browser`
* **Source:** [https://github.com/vercel-labs/agent-browser](https://github.com/vercel-labs/agent-browser)
* **Install:** `npx -y skills add "https://github.com/vercel-labs/agent-browser" --skill "agent-browser" -g -y`
* **Companion CLI:** `npm install -g agent-browser`
* **Domain:** Fast headless/interactive browser automation CLI built for AI agents via CDP.
* **When to use:** Programmatic web interaction, form filling, clicking, screenshotting, QA/exploratory testing, Electron desktop automation, Slack automation.
* **CLI Usage:**
  ```bash
  # Check skills and workflows built into the CLI
  agent-browser skills get core --full
  agent-browser skills get dogfood    # QA testing
  agent-browser skills list
  ```

---

### 6. `design-taste-frontend`
* **Source:** [https://github.com/leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill)
* **Install:** `npx -y skills add "https://github.com/leonxlnx/taste-skill" --skill "design-taste-frontend" -g -y`
* **Domain:** Anti-slop frontend engineering for landing pages, marketing sites, portfolios, and redesigns.
* **When to use:** Building modern web surfaces that need real taste and avoid generic LLM patterns.
* **Core Mechanics:**
  * **Design Read (0.B):** Analyzes page kind, audience, vibe words, and brand assets before writing any code.
  * **Three Dials:** `DESIGN_VARIANCE` (1-10), `MOTION_INTENSITY` (1-10), `VISUAL_DENSITY` (1-10) — baseline `8 / 6 / 4`.
  * **Official Design Systems:** Matches corporate/enterprise briefs to official packages (`@fluentui`, `@carbon`, `govuk-frontend`, `@radix-ui/themes`, `shadcn/ui`, Tailwind v4).
  * Strict bans on AI tell defaults (Inter + slate-900, Fraunces display serif, purple button glow, warm beige + brass).

---

### 7. `firecrawl`
* **Source:** [https://github.com/firecrawl/cli](https://github.com/firecrawl/cli)
* **Install:** `npx -y skills add "https://github.com/firecrawl/cli" --skill "firecrawl" -g -y`
* **Companion CLI:** `npm install -g firecrawl-cli` (provides `firecrawl` command)
* **Domain:** Live-web research, LLM-optimized clean markdown scraping, crawling, site mapping, and monitoring.
* **When to use:** Extracting live web documentation, scraping JS-rendered web pages, full site crawling, parsing PDFs/documents, tracking website updates.
* **CLI Usage:**
  ```bash
  # Scrape URL into markdown
  firecrawl scrape "https://example.com" -o .firecrawl/page.md

  # Search web and retrieve content
  firecrawl search "query" -o .firecrawl/search.json --json

  # Map site URLs
  firecrawl map "https://example.com"

  # Parse local document (PDF/DOCX/XLSX)
  firecrawl parse document.pdf
  ```

---

### 8. `impeccable` (primary design skill for this portfolio, adopted 2026-11-23)
* **Source:** [https://github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable.style](https://impeccable.style/)
* **Install:** `npx -y skills add "https://github.com/pbakaus/impeccable" --skill impeccable -g -y` (installed to `~/.agents/skills/impeccable`, linked for Claude Code, Cursor and Antigravity)
* **Domain:** Design direction and review with a working vocabulary: `init` (PRODUCT.md), `document` (DESIGN.md), `critique`, `audit`, `polish`, `typeset`, `layout`, `animate`, `distill`, `bolder`/`quieter`, and new-work for a replacement visual world. A mechanical `detect` command flags slop patterns (gradient text and others) in source files.
* **How it is used here:** reads `PRODUCT.md` and `DESIGN.md` at the repo root. Run `~/.agents/skills/impeccable/scripts/impeccable context --target <file>` once per session, `detect --json <paths>` before calling UI work done. Reviewed before use: a launcher plus reference playbooks, no install hooks.
* **Alongside:** `design-taste-frontend` (taste-skill) for the anti-slop pre-flight checklist; `emil-design-eng` for motion polish.

---

## 🗂️ Complementary Best-Practice Skills

Other battle-tested skills installed in the global environment (`~/.agents/skills/`):

| Skill | Source | Purpose |
|---|---|---|
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | React & Next.js performance and bundle optimization from Vercel Engineering |
| `web-design-guidelines` | `vercel-labs/agent-skills` | Foundational web design and accessibility checklists |
| `code-review` | `mattpocock/skills` | Comprehensive, structured PR and code review guidelines |
| `domain-modeling` | `mattpocock/skills` | Entity relationship, DDD, and schema modeling |
| `webapp-testing` | `anthropics/skills` | End-to-end and integration web application testing |
| `pptx` | `anthropics/skills` | Parsing and manipulating PowerPoint presentations |
| `emil-design-eng` | Emil Kowalski's design-engineering notes | Motion and interaction polish decisions |
| `context-engineering` | community | Session context setup for agents |

**Design galleries for reference (not skills):** godly.website (now redirects to recent.design), awwwards.com, thefwa.com, cssdesignawards.com, minimal.gallery, siteinspire.com, mindsparklemag.com, bentogrids.com, mobbin.com, pageflows.com, lapa.ninja, saaspo.com, designspells.com, darkmodedesign.com. Most render client-side, so read them with a real browser (`tools/ui/capture.py` pattern), not a text scrape. Findings from them live in `design/PORTFOLIO_REFERENCE.md`.

---

## 🛠️ Verification & Directory Layout

### Skill Storage Locations
* **Global User Skills:** `~/.agents/skills/<skill-name>`
* **Global Lockfile:** `~/.agents/.skill-lock.json`
* **Project Override:** `.agents/skills/<skill-name>` or `.cursor/skills/`

### Health Check Commands
```bash
# List all installed global skills
npx skills list -g

# Verify CLI binaries
agent-browser --version
firecrawl --version
python3 ~/.agents/skills/ui-ux-pro-max/scripts/search.py --help
```
