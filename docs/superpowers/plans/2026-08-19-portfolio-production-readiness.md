# Portfolio Production-Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring `patelsahil2k03.github.io` (Sahil Patel's personal portfolio) to a fully production-clean, accurate, and polished state — removing dead code, consolidating documentation, fixing content/asset gaps, and closing frontend/performance/SEO gaps — worked through one task at a time with explicit approval gates.

**Architecture:** No new subsystem is being built. This plan operates on an existing Next.js 14 App Router static-export site. Each task is a self-contained cleanup/fix/improvement unit against the current codebase, ordered so structural cleanup (dead code, docs) happens before content/asset work, which happens before the frontend/performance polish pass that depends on a clean base.

**Tech Stack:** Next.js 14 (App Router, `output: 'export'`), TypeScript 5.9 (non-strict), Tailwind CSS 3.4, Framer Motion, React Three Fiber/Drei/Three.js (currently unused), `@microsoft/clarity`, GitHub Actions → GitHub Pages.

**Spec:** This plan's spec is the recon report delivered in-conversation on 2026-08-19 (full read-only pass over every source file, doc, config, and content file in the repo). No separate spec file exists; findings are inlined into each task below.

## Global Constraints

These apply to every task in this plan (from `ai_guidelines/UNIVERSAL_AI_RULES.md`, `UNIVERSAL_CLEANUP_REORGANIZATION_RULES.md`, `UNIVERSAL_GIT_RULES.md` — already read in full this session):

- **Propose, then wait for explicit approval** before any delete, structural change, config change, or commit. Each task below ends with a proposal step — do not proceed past it without a "yes"/"proceed" from the user.
- **Never bare `rm -rf`.** Tracked files → `git rm` (recoverable via git history). Untracked files → `gio trash` or move to `.trash/`. Permanent delete only if the user explicitly says so.
- **No commit trailers** (`Co-Authored-By:`, `Signed-off-by:`, etc.) and no AI/vendor mentions in commit text — this project's git rules override the harness default template.
- **Conventional Commits**: `type(scope): subject`, imperative mood, ≤50 char subject.
- **Read the full file before editing it** — every task that touches a file assumes a fresh full read first, even if it was read during recon (recon summarized; edits need the literal current bytes).
- **One commit per logical change** (atomic) — don't bundle unrelated tasks into one commit even if approved back-to-back.
- **Branch discipline**: work happens on `dev` (direct push allowed); `main` only via reviewed merge, matching `BRANCH_STRATEGY.md`.
- **Re-sweep after every move/delete**: re-grep for old paths/names until a clean pass returns zero hits, then state that explicitly.
- **Ambiguous decisions get surfaced as a question, not silently resolved** — several tasks below have an explicit "Decision gate" step for exactly this reason (e.g., which resume file is authoritative). Don't guess.

---

## Phase A — Dead Code & Repo Hygiene

### Task 1: Remove the legacy CRA-era application tree

**Files:**
- Delete (tracked, use `git rm`): `src/App.js`, `src/App.css`, `src/index.js`, `src/index.css`, `src/comps/about.js`, `src/comps/contact.js`, `src/comps/experience.js`, `src/comps/hero.js`, `src/comps/loader.js`, `src/comps/nav.js`, `src/comps/otherWorks.js`, `src/comps/works.js`, `src/styles/about.css`, `src/styles/bgAnimation.css`, `src/styles/contact.css`, `src/styles/experience.css`, `src/styles/loader.css`, `src/styles/menu.css`, `src/styles/otherWork.css`, `src/styles/work.css`, `public/index.html`, `public/manifest.json`, `src/data/works.json`, `src/data/otherWorks.json`
- Delete (tracked images, only consumed by the above): `src/assets/images/bash-scripting.png`, `src/assets/images/django-todo-app.png`, `src/assets/images/argocd-canary-deployment.png`, `src/assets/images/devsecops.png`, `src/assets/images/go-web-app.png`, `src/assets/images/otherWorks/mern-todo-app.png`, `src/assets/images/otherWorks/react-portfolio.png`, `src/assets/images/otherWorks/web-designing.png`
- Modify: `tailwind.config.ts` — remove the now-unnecessary `"!./src/comps/**/*.{js,jsx}"` exclusion line once `src/comps/` no longer exists (keep the rest of the `content` array intact).

**Interfaces:** None — this is pure deletion of an already-confirmed-dead, self-contained island (recon report §3: zero incoming references from any live file).

- [ ] **Step 1: Re-confirm zero live references (defense in depth before deleting)**

Run:
```bash
grep -rln "src/comps\|App\.js\|src/index\.js\|works\.json\|otherWorks\.json" \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" --include="*.json" \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude-dir=.git \
  --exclude-dir=comps .
```
Expected: no hits outside the files being deleted themselves (i.e., `src/comps/*.js` referencing `works.json`/`otherWorks.json` internally is fine — nothing *outside* the delete-set should reference them).

- [ ] **Step 2: Propose the deletion batch to the user**

Present the full file list above (30 files) as a `📋 PROPOSED ACTION` per `UNIVERSAL_AI_RULES.md` §1, noting all are `git rm` (recoverable from history), and wait for explicit approval.

- [ ] **Step 3: Execute the deletion (only after approval)**

```bash
git rm src/App.js src/App.css src/index.js src/index.css \
  src/comps/about.js src/comps/contact.js src/comps/experience.js src/comps/hero.js \
  src/comps/loader.js src/comps/nav.js src/comps/otherWorks.js src/comps/works.js \
  src/styles/about.css src/styles/bgAnimation.css src/styles/contact.css \
  src/styles/experience.css src/styles/loader.css src/styles/menu.css \
  src/styles/otherWork.css src/styles/work.css \
  public/index.html public/manifest.json \
  src/data/works.json src/data/otherWorks.json \
  src/assets/images/bash-scripting.png src/assets/images/django-todo-app.png \
  src/assets/images/argocd-canary-deployment.png src/assets/images/devsecops.png \
  src/assets/images/go-web-app.png \
  src/assets/images/otherWorks/mern-todo-app.png src/assets/images/otherWorks/react-portfolio.png \
  src/assets/images/otherWorks/web-designing.png
```

- [ ] **Step 4: Edit `tailwind.config.ts`** to drop the `src/comps` exclusion line (read the file first, then remove only that one array entry from `content`).

- [ ] **Step 5: Verify the build still succeeds**

```bash
npm run build
```
Expected: build completes with no import errors, no reference to any deleted path in the output.

- [ ] **Step 6: Re-sweep for stragglers**

```bash
grep -rln "comps/\|works\.json\|otherWorks\.json" --include="*.md" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out .
```
Fix any doc reference found (e.g. `docs/archive/REPO_CLEANUP_PLAN.md` may mention these — that's fine, it's historical archive; live docs should not).

- [ ] **Step 7: Commit**

```bash
git commit -m "chore: remove legacy CRA-era app tree

Removes the pre-Next.js Create React App files (App.js, index.js,
src/comps/*, src/styles/*, works.json/otherWorks.json, and their
associated images) that were fully superseded by the Next.js App
Router migration and confirmed to have zero live references."
```

---

### Task 2: Resolve the Hero.tsx vs HeroEnhanced.tsx duplication

**Files:**
- Read fully first: `src/components/sections/Hero.tsx`, `src/components/sections/HeroEnhanced.tsx`, `src/lib/animations.ts`, `src/lib/hooks.ts`
- Delete if confirmed dead: `src/components/sections/Hero.tsx`
- Modify (only if `Hero.tsx` deletion makes them fully unused): remove `useCountAnimation` from `src/lib/hooks.ts` and `fadeInDown` from `src/lib/animations.ts` — but only after confirming via grep that nothing else uses them.

**Interfaces:** None consumed. Produces: `page.tsx` continues importing `HeroEnhanced` as `Hero`, unchanged.

- [ ] **Step 1: Decision gate — ask the user directly**

Since `Hero.tsx` was flagged as an unresolved to-do in the archived `REPO_CLEANUP_PLAN.md` and never actioned, confirm explicitly: *"Delete `Hero.tsx` (confirmed unused — `page.tsx` only imports `HeroEnhanced`), or keep it intentionally as a fallback/reference component?"* Do not proceed without an answer.

- [ ] **Step 2: If delete approved — confirm `useCountAnimation`/`fadeInDown` become fully unused**

```bash
grep -rn "useCountAnimation\|fadeInDown" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out .
```
Expected after Hero.tsx is gone: only the definition sites in `hooks.ts`/`animations.ts` remain — no consumers.

- [ ] **Step 3: Execute**

```bash
git rm src/components/sections/Hero.tsx
```
Then edit `src/lib/hooks.ts` and `src/lib/animations.ts` to remove the now-fully-unused exports (read each file fully first, remove only those two exports, leave everything else untouched).

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: remove unused Hero.tsx and its exclusive dependencies

HeroEnhanced.tsx (imported as Hero in page.tsx) is the only hero
component actually rendered. Hero.tsx was superseded but never
removed; useCountAnimation and fadeInDown were used only by it."
```

---

### Task 3: Triage unused exports across `src/lib/*` and `src/data/*`

**Files:**
- Read fully: `src/lib/animations.ts`, `src/lib/hooks.ts`, `src/lib/utils.ts`, `src/data/testimonials.ts`, `src/data/index.ts`

**Unused symbols identified by recon (verify each with grep before touching):**
- `lib/animations.ts`: `fadeInLeft`, `fadeInRight`, `staggerContainerFast`, `hoverScale`, `hoverLift`, `buttonTap`, `slideInUp`, `rotateIn`, `countUpAnimation`, `pageTransition`, `scrollAnimationViewport`, `getMotionProps`
- `lib/hooks.ts`: `usePrefersReducedMotion`, `useMouseParallax`
- `lib/utils.ts`: `formatDate` (duplicated by `caseStudyUtils.formatPublishedDate`)
- `data/testimonials.ts`: `testimonials`, `quotes`, `milestones` (all three exports)
- `data/index.ts` re-exports: `highSchool`, `topSkills`, `featuredProjects`, `highlightedAchievements`

**Interfaces:** None — pure removal of unconsumed exports, or explicit "keep, flagged as intentional" decision per symbol group.

- [ ] **Step 1: Decision gate — ask the user per group, not per symbol**

Present three groups and ask which apply:
1. *Animation/hook variants* (12 in `animations.ts` + 2 in `hooks.ts`) — likely safe to delete now, easy to re-add from Framer Motion docs if a future section needs them.
2. *`testimonials.ts`* — README.md already self-flags this as "currently unused." Ask: delete entirely, or is there a plan to surface testimonials/milestones in the UI (e.g., an About or Achievements sub-section)? If the latter, this becomes a new task in Phase E instead of a deletion.
3. *`data/index.ts` unused re-exports* (`highSchool`, `topSkills`, `featuredProjects`, `highlightedAchievements`) — confirm these aren't placeholders for near-term UI work before deleting.

- [ ] **Step 2: For each group approved for deletion, re-verify zero consumers**

```bash
grep -rn "<exact export name>" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out .
```

- [ ] **Step 3: Execute approved removals** (read each file fully, remove only the approved exports, keep the rest of each file's structure/comments intact).

- [ ] **Step 4: Verify build**

```bash
npm run build
```

- [ ] **Step 5: Commit** (one commit per file touched, or one combined commit if the user approved the whole batch together — per Global Constraints, ask which before committing).

---

### Task 4: Clear the `.trash/` folder once Task 1 is executed

**Files:**
- Delete: `.trash/file_list.txt`, `.trash/output.txt` (both gitignored, untracked — this is a `gio trash`/permanent-delete decision, not `git rm`, since they were never tracked)

- [ ] **Step 1: Confirm Task 1 (legacy tree removal) is complete and committed** — `.trash/`'s contents are only meaningful as a record of that pending cleanup; don't clear it before the real deletion happens.

- [ ] **Step 2: Propose to the user**: since these are untracked files documenting a now-completed cleanup, ask whether to `gio trash` them (recoverable via system trash) or leave them as a historical record. Default recommendation: `gio trash`, since the actual deletion is now in git history and searchable there instead.

- [ ] **Step 3: Execute if approved**

```bash
gio trash .trash/file_list.txt .trash/output.txt
```

---

## Phase B — Documentation Consolidation

### Task 5: Fix root `README.md` staleness

**Files:**
- Modify: `README.md` (read in full first — it's 15,731 bytes)

**Specific fixes needed (from recon):**
- Footer says `**Last Updated**: October 23, 2025`, predating the body's own Phase 3B / May 2026 content — update to the actual current date at time of edit.
- "Documentation" section lists 6 files that don't exist in the repo (`DEPLOYMENT_COMPLETE.md`, `PHASE1_COMPLETE_SUMMARY.md`, `PHASE2_COMPLETE.md`, `DEPLOYMENT_SUMMARY.md`, `FIXES_APPLIED_TEST_NOW.md`, `ISSUES_FOUND_AND_FIXES.md`) — replace with links to the real active docs listed in `docs/README.md` (`docs/DEPLOYMENT.md`, `docs/PORTFOLIO_SCOPE_CHECKLIST.md`, `docs/CASE_STUDIES.md`, `BRANCH_STRATEGY.md`, `ASSETS_GUIDE.md`, `PORTFOLIO_REFERENCE.md`).
- Clone instructions reference `sahilpatel.dev.git` — wrong repo name; correct to `patelsahil2k03.github.io.git`.
- Deploy instructions describe `npm run deploy` (gh-pages branch) as *the* deploy path; per `docs/DEPLOYMENT.md`, GitHub Actions is the real path now. Reframe `npm run deploy` as a legacy/manual fallback, not the primary method, and link to `docs/DEPLOYMENT.md` for the real flow.
- "Project Structure" / "Features" sections duplicate `docs/PORTFOLIO_SCOPE_CHECKLIST.md` and `docs/CASE_STUDIES.md` — trim to a short summary + link, don't maintain the same list twice (per `UNIVERSAL_AI_RULES.md` §6, one canonical source per topic).

- [ ] **Step 1: Read the full current `README.md`.**
- [ ] **Step 2: Draft the corrected version** addressing all five points above; propose the diff to the user before writing (this is a doc content change, still covered by the general "significant change" approval gate given how much of the file changes).
- [ ] **Step 3: Apply edits.**
- [ ] **Step 4: Cross-check**: re-read the edited file top to bottom, confirm no remaining stale claims and no broken relative links.
- [ ] **Step 5: Commit**

```bash
git commit -m "docs: fix stale dates, broken doc links, and wrong repo url in README"
```

---

### Task 6: Triage the two orphaned root docs

**Files:**
- `ACTION_PLAN_SUMMARY.md`, `TESTING_COMMANDS.md` — both stale March-2026 artifacts, neither listed in `docs/README.md`'s active or archive index.
- Modify: `docs/README.md` (to reflect whatever decision is made)

- [ ] **Step 1: Decision gate — ask the user**: for each of the two files, "archive to `docs/archive/` (preserves history) or trash it (content is fully superseded by `docs/PORTFOLIO_SCOPE_CHECKLIST.md`)?"

- [ ] **Step 2a: If archiving** — `git mv ACTION_PLAN_SUMMARY.md docs/archive/ACTION_PLAN_SUMMARY.md` (same for `TESTING_COMMANDS.md`), then add one line each to `docs/archive/`'s listing in `docs/README.md`.

- [ ] **Step 2b: If trashing** — `git rm ACTION_PLAN_SUMMARY.md` / `git rm TESTING_COMMANDS.md` (tracked, recoverable via git history).

- [ ] **Step 3: Re-sweep**

```bash
grep -rln "ACTION_PLAN_SUMMARY\|TESTING_COMMANDS" --include="*.md" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out .
```
Fix any dangling reference found in other active docs.

- [ ] **Step 4: Commit**

```bash
git commit -m "docs: archive/remove stale March-2026 planning docs from repo root"
```

---

### Task 7: Reconcile `PORTFOLIO_REFERENCE.md` with current reality

**Files:** `PORTFOLIO_REFERENCE.md` (read in full — 29,492 bytes)

- [ ] **Step 1: Read in full**, identify every claim that's now stale (e.g., describes `Hero.tsx` as live, describes CaseStudies as in-progress when shipped) versus durable reference content (design-inspiration sources, color tokens that match the live theme, long-term backlog).

- [ ] **Step 2: Propose a split**: update the stale "current state" claims in place; if a large chunk (e.g., a "Phase tracking checklist") is now fully redundant with `docs/PORTFOLIO_SCOPE_CHECKLIST.md`, propose trimming it to a link instead of a duplicate list. Present the specific before/after sections to the user before editing (per §2.6 of the cleanup rules — this is both an intra-file *and* a purpose-overlap check).

- [ ] **Step 3: Apply approved edits.**

- [ ] **Step 4: Commit**

```bash
git commit -m "docs: reconcile PORTFOLIO_REFERENCE.md with shipped state"
```

---

### Task 8: Correct or clearly label `design-system/sahil-patel-portfolio/MASTER.md`

**Files:** `design-system/sahil-patel-portfolio/MASTER.md`, `design-system/sahil-patel-portfolio/pages/case-studies.md`

- [ ] **Step 1: Decision gate — ask the user**: this file is unedited tool-generated boilerplate (pink/black "Marketplace" theme, "Become a host/seller" CTA) that has never matched the live blue/orange/cyan site. Options: (a) regenerate it properly against the real live design tokens, (b) delete it since it's misleading and not load-bearing for any doc reader, (c) keep as-is but add a prominent header note ("⚠️ Generated boilerplate, not representative of the live site — see `PORTFOLIO_REFERENCE.md` for actual tokens").

- [ ] **Step 2: Execute the chosen option.**

- [ ] **Step 3: If kept or regenerated**, update `docs/README.md`'s active-docs listing description accordingly.

- [ ] **Step 4: Commit**

```bash
git commit -m "docs: correct design-system MASTER.md theme mismatch"
```

---

### Task 9: Fix `ASSETS_GUIDE.md`'s stale `publications.ts` reference

**Files:** `ASSETS_GUIDE.md`

- [ ] **Step 1: Read in full**, locate the reference to `src/data/publications.ts` (doesn't exist — publications actually live inside `src/data/achievements.ts`).
- [ ] **Step 2: Edit** the reference to point at the correct file/field.
- [ ] **Step 3: Commit**

```bash
git commit -m "docs: fix ASSETS_GUIDE.md reference to nonexistent publications.ts"
```

---

## Phase C — Content & Data Accuracy

### Task 10: Resolve the resume.pdf duplication

**Files:** `public/resume.pdf` (140,697 bytes, served — 3 call sites), `src/assets/Resume.pdf` (130,356 bytes, unreferenced)

- [ ] **Step 1: Decision gate — ask the user directly**: "Which resume is current — the one being served (`public/resume.pdf`) or the unreferenced copy in `src/assets/`? Are they meant to be the same file (in which case one is stale) or genuinely different versions?" Do not assume; the byte-size difference means they are not identical copies.

- [ ] **Step 2a: If `public/resume.pdf` is correct and `src/assets/Resume.pdf` is just a stale leftover** — `git rm src/assets/Resume.pdf`.

- [ ] **Step 2b: If `src/assets/Resume.pdf` is actually the newer/correct one** — replace `public/resume.pdf` with it (`git rm public/resume.pdf` + `git mv src/assets/Resume.pdf public/resume.pdf`, or overwrite in place — confirm exact desired filename/path with the user first since 3 call sites hardcode `/resume.pdf`).

- [ ] **Step 3: Verify all 3 call sites** (`Hero.tsx`/`HeroEnhanced.tsx`/`Contact.tsx` — re-grep for `resume.pdf` post-change) still resolve correctly.

```bash
grep -rn "resume.pdf" --include="*.tsx" --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out .
```

- [ ] **Step 4: Commit**

```bash
git commit -m "chore: resolve duplicate resume.pdf, keep single authoritative copy"
```

---

### Task 11: Decide the fate of `src/assets/linkedin_posts_text.txt`

**Files:** `src/assets/linkedin_posts_text.txt` (currently the one uncommitted change in the working tree)

- [ ] **Step 1: Decision gate — ask the user**: this is raw scraped LinkedIn export data (1,027 lines) used as content-mining source material for `testimonials.ts` milestones/quotes and `PORTFOLIO_REFERENCE.md` storytelling ideas — it is not consumed programmatically by any code. Options: (a) commit it as-is (it's already tracked, just modified — confirm the update is intentional content, not accidental), (b) move it to a `docs/content-sources/` or similar non-`src/assets` location since it's reference material, not a build asset, (c) gitignore future changes to it if it's meant to stay a personal local scratch file that shouldn't keep generating diffs.

- [ ] **Step 2: Show the actual diff** (`git diff src/assets/linkedin_posts_text.txt`) to the user before deciding — confirm what specifically changed since the last commit.

- [ ] **Step 3: Execute the chosen option and commit** (or explicitly leave uncommitted if the user wants it to stay a working scratch file — state that decision plainly, don't silently commit personal content).

---

### Task 12: Decide `testimonials.ts`'s fate (cross-reference with Task 3, group 2)

This is the same decision as Task 3 Step 1, group 2 — do not re-litigate separately. If the user chose "surface it in the UI" during Task 3, this task becomes: **design and implement a Testimonials/Milestones UI section** (new task to be written once that direction is chosen — out of scope for this plan's initial task list; add as Task 12a when reached). If the user chose "delete," it's already handled in Task 3.

---

## Phase D — Assets & Media Production-Readiness

### Task 13: Optimize `public/images/hero/profile.jpg`

**Files:** `public/images/hero/profile.jpg` (currently 6.3 MB)

- [ ] **Step 1: Check current dimensions and format**

```bash
file public/images/hero/profile.jpg
identify public/images/hero/profile.jpg 2>/dev/null || python3 -c "from PIL import Image; im=Image.open('public/images/hero/profile.jpg'); print(im.size, im.mode)"
```

- [ ] **Step 2: Propose target spec to the user**: since `next.config.js` has `images.unoptimized: true` (required for static export — Next.js's automatic image optimization doesn't run), the source file itself must be pre-optimized. Recommend re-exporting at a sane max dimension (e.g., 1200px on the long edge is plenty for any hero display size) and re-compressing (target <300 KB at good visual quality, WebP if the codebase's `<Image>` usage supports a fallback, otherwise optimized JPEG).

- [ ] **Step 3: Wait for the user to provide the optimized file** (this is image content, not something to auto-generate blindly — confirm they're happy with the visual result) or, if they ask me to do it, use available image tooling:

```bash
python3 -c "
from PIL import Image
im = Image.open('public/images/hero/profile.jpg')
im.thumbnail((1200, 1200))
im.save('public/images/hero/profile.jpg', 'JPEG', quality=85, optimize=True)
"
```

- [ ] **Step 4: Verify new size and visual result** (view the file), report before/after byte size.

- [ ] **Step 5: Commit**

```bash
git commit -m "perf: compress hero profile image for faster page load"
```

---

### Task 14: Wire up a social preview (Open Graph) image

**Files:**
- Modify: `src/app/layout.tsx` (read in full first)
- Verify/use: `public/preview.png` (139 KB, exists but currently unwired)

- [ ] **Step 1: Read `layout.tsx`'s full `metadata` export**, confirm the current `openGraph` block has no `images` field (per recon).

- [ ] **Step 2: Check `preview.png`'s dimensions** against OG best-practice (1200×630):

```bash
python3 -c "from PIL import Image; print(Image.open('public/preview.png').size)"
```
If it doesn't match, propose regenerating it at 1200×630 before wiring it in — a wrong-aspect-ratio OG image crops badly on most platforms.

- [ ] **Step 3: Add the `images` field** to both `openGraph` and `twitter` metadata blocks in `layout.tsx`:

```ts
openGraph: {
  // ...existing fields...
  images: [
    {
      url: '/preview.png',
      width: 1200,
      height: 630,
      alt: 'Sahil Patel — Portfolio',
    },
  ],
},
twitter: {
  card: 'summary_large_image',
  images: ['/preview.png'],
  // ...existing fields...
},
```
(Exact merge point depends on the file's current structure — read it fully before editing; don't overwrite existing fields.)

- [ ] **Step 4: Verify** by building and checking the generated `<head>` output includes `og:image` and `twitter:image` tags:

```bash
npm run build
grep -o 'property="og:image"[^>]*' out/index.html
grep -o 'name="twitter:image"[^>]*' out/index.html
```

- [ ] **Step 5: Commit**

```bash
git commit -m "feat(seo): add social preview image to Open Graph and Twitter metadata"
```

---

### Task 15: Fill in placeholder asset folders

**Files:** `public/images/{achievements,certifications,football,logos,projects}/`, `src/assets/images/{achievements,backgrounds,companies,profile,projects}/`

- [ ] **Step 1: Decision gate — ask the user**: these folders currently contain only `_ADD_X_HERE.txt` placeholders or instructional READMEs, with zero real assets. This is a content-collection task, not something I can do blindly. Ask: which of these does the user want to actually fill now (has the source images ready), versus which should stay deferred/placeholder for later? Prioritize by page impact — `achievements/` and `logos/` (company logos in Experience section) are likely highest-visibility.

- [ ] **Step 2: For each folder the user provides images for** — read the corresponding README's naming/sizing spec (e.g., `src/assets/images/companies/README.md`) fully, confirm the provided files match spec, place them, remove the now-obsolete `_ADD_X_HERE.txt`/adjust the README if needed.

- [ ] **Step 3: Wire each new asset into its consuming component** (this will differ per asset type — e.g., logos into `Experience.tsx`, achievement photos into `Achievements.tsx`) — read the consuming component fully first to find the correct integration point.

- [ ] **Step 4: Verify visually** — build and view the affected section.

- [ ] **Step 5: Commit** (one commit per asset category, not one giant commit — keeps this atomic per category).

---

### Task 16: Audit favicon/manifest wiring

**Files:** `public/site.webmanifest`, `public/avatar.png`, `src/app/layout.tsx`

- [ ] **Step 1: Confirm whether `site.webmanifest` is actually linked.** Next.js App Router auto-detects `icon.png`/`favicon.ico` by file convention, but a PWA manifest needs an explicit `<link rel="manifest">` — check `layout.tsx`'s metadata for a `manifest` field.

```bash
grep -n "manifest" src/app/layout.tsx
```

- [ ] **Step 2: Decision gate**: if unlinked, ask whether PWA manifest support is wanted (adds "add to home screen" capability) — if yes, add `manifest: '/site.webmanifest'` to the metadata export; if no, the file (and possibly the unused `android-chrome-*.png` set it references) can be removed as dead weight.

- [ ] **Step 3: Execute the chosen direction, verify build, commit.**

---

## Phase E — Frontend/UX Production-Quality Pass

### Task 17: Accessibility audit pass

**Files:** All of `src/components/**` (read each fully during audit — this is a review task, not a blind edit)

- [ ] **Step 1: Check every `<img>`/`next/image` usage has meaningful `alt` text** (not empty, not filename-derived).

```bash
grep -rn "alt=" --include="*.tsx" src/components/ | grep -v 'alt="[a-zA-Z].*[a-zA-Z]"'
```

- [ ] **Step 2: Check interactive elements** (buttons, links acting as buttons) have accessible names and visible focus states — read `Button.tsx`, `Navigation.tsx`, `Card.tsx` fully, confirm focus-visible styling exists (Tailwind `focus-visible:` classes) on every clickable element.

- [ ] **Step 3: Check color contrast** of the live blue/orange/cyan palette against backgrounds — spot-check the Tailwind config's defined colors against WCAG AA (4.5:1 for text) using a contrast checker; flag any combination that fails.

- [ ] **Step 4: Check heading hierarchy** across the page (`page.tsx` render order) — confirm no skipped levels (h1 → h3 without h2).

- [ ] **Step 5: Report findings to the user as a list**, propose fixes per finding, wait for approval before editing each.

- [ ] **Step 6: Apply approved fixes, verify visually, commit** (group related fixes, e.g., all alt-text fixes in one commit, all focus-state fixes in another).

---

### Task 18: Responsive/visual QA pass

**Files:** N/A — this is a verification task using the `run` skill, not a code-touching task on its own; findings become follow-up tasks.

- [ ] **Step 1: Load the `run` skill** to launch the dev server and view the site.
- [ ] **Step 2: Screenshot at mobile (375px), tablet (768px), and desktop (1440px) widths** for the home page and one case-study page.
- [ ] **Step 3: Report visual issues found** (overflow, cramped spacing, illegible text, broken layout) to the user as a numbered list with screenshots.
- [ ] **Step 4: For each approved fix, treat as its own bite-sized task** (read the specific component, propose the CSS/layout change, apply, re-screenshot to confirm, commit).

---

### Task 19: Decide the fate of unused Three.js/React Three Fiber/Drei dependencies

**Files:** `package.json`

- [ ] **Step 1: Decision gate — ask the user**: `three`, `@react-three/fiber`, `@react-three/drei` are installed but have zero usage in any current component (per recon; `docs/PORTFOLIO_SCOPE_CHECKLIST.md` lists a 3D feature as "deferred"). **Update (2026-08-20): Phase L (3D AI Avatar Companion research) now gives these a concrete planned use — the recommendation is KEEP, not remove.** Still ask before finalizing in case priorities shifted since Phase L was researched, but don't default to removal without checking Phase L's status first.

- [ ] **Step 2: If removing** —

```bash
npm uninstall three @react-three/fiber @react-three/drei
```
(confirm exact package names against `package.json` first — read it fully).

- [ ] **Step 3: Verify build still succeeds, commit**

```bash
git commit -m "chore: remove unused three.js dependencies (no current 3D feature)"
```

---

### Task 20: Dead CSS cleanup in `globals.css`

**Files:** `src/app/globals.css`

- [ ] **Step 1: Read the full file**, confirm via grep which custom utility classes (`.text-gradient`, `.glass-effect`, `.card-hover` per recon) are actually used in any `.tsx`:

```bash
grep -rn "text-gradient\|glass-effect\|card-hover" --include="*.tsx" src/
```

- [ ] **Step 2: For any confirmed-unused class, propose removal** to the user (low priority — this is harmless dead CSS, not urgent, but worth clearing as part of the general hygiene pass).

- [ ] **Step 3: Apply approved removals, verify build, commit.**

---

## Phase F — Performance & SEO

### Task 21: Bundle size and Core Web Vitals check

**Files:** N/A — analysis task

- [ ] **Step 1: Run the production build and inspect output size**

```bash
npm run build
du -sh out/_next/static/chunks/*.js | sort -rh | head -20
```

- [ ] **Step 2: Identify the largest chunks**, cross-reference against which components/deps they correspond to (e.g., if Three.js is still installed per Task 19's outcome and somehow tree-shaken in, confirm it isn't bloating the bundle).

- [ ] **Step 3: Report findings to the user** with concrete byte sizes — flag anything unusually large for a static portfolio site (a reasonable total JS budget for a site like this is well under 300 KB gzipped for the main bundle).

- [ ] **Step 4: For each flagged issue, propose a specific fix** (code-split, lazy-load, remove) as its own approved task.

---

### Task 22: SEO/metadata audit

**Files:** `src/app/layout.tsx`, `src/app/case-studies/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `public/robots.txt`

- [ ] **Step 1: Read all metadata exports fully.** Confirm every route exports a proper `title`/`description` (case-study `[slug]` pages should have per-article dynamic metadata, not a static fallback — check `generateMetadata` exists and pulls from `caseStudyUtils`).

```bash
grep -rn "generateMetadata\|export const metadata" src/app/
```

- [ ] **Step 2: Check `public/robots.txt`** content — confirm it correctly allows crawling and references a sitemap if one exists; check whether a `sitemap.xml`/`sitemap.ts` exists at all (recon didn't find one — flag as a gap if confirmed absent).

```bash
cat public/robots.txt
find src/app -iname "sitemap*"
```

- [ ] **Step 3: If no sitemap exists, propose adding one** — Next.js App Router supports a `src/app/sitemap.ts` that generates `sitemap.xml` at build time, listing the home page and every case-study slug from `getAllCaseStudySlugs()`.

- [ ] **Step 4: If approved, implement**:

```ts
// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllCaseStudySlugs } from '@/lib/caseStudyUtils' // exact import path — verify against actual export during implementation

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://patelsahil2k03.github.io'
  const slugs = getAllCaseStudySlugs()
  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/case-studies`, lastModified: new Date() },
    ...slugs.map((slug) => ({
      url: `${base}/case-studies/${slug}`,
      lastModified: new Date(),
    })),
  ]
}
```
(Verify the exact export name/shape of `getAllCaseStudySlugs` by reading `src/lib/caseStudyUtils.ts` fully before writing this — don't assume the signature.)

- [ ] **Step 5: Build and verify** `out/sitemap.xml` is generated and lists all expected URLs.

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(seo): add sitemap.xml generation for all routes"
```

---

## Phase G — Config & Tooling Cleanup

### Task 23: `package.json` script cleanup

**Files:** `package.json`

- [ ] **Step 1: Read `package.json` fully.** Identify redundant script (`export` duplicates `build` given `output: 'export'` is already set in `next.config.js`) and the Windows-only `deploy` script (references `gh-pages` package, superseded by the GitHub Actions workflow per `docs/DEPLOYMENT.md`).

- [ ] **Step 2: Decision gate — ask the user**: remove the redundant `export` script? Keep `deploy` as a documented manual-fallback path (label it clearly in a comment/README) or remove it entirely since GitHub Actions is the real path now?

- [ ] **Step 3: Apply approved changes, verify `npm run build` still works, commit.**

```bash
git commit -m "chore: clean up redundant/stale npm scripts"
```

---

### Task 24: TypeScript strict-mode evaluation

**Files:** `tsconfig.json`

- [ ] **Step 1: Read `tsconfig.json` fully**, confirm `"strict": false`.

- [ ] **Step 2: Decision gate — ask the user**: enabling `strict: true` on an existing non-strict codebase will surface new type errors that need fixing one file at a time — this is a meaningful scope decision, not a quick flip. Ask whether this is wanted for this pass, or deferred to a dedicated future effort.

- [ ] **Step 3: If yes** — flip the flag, run `tsc --noEmit`, and treat the resulting error list as a new set of bite-sized tasks (one per file or logical group) to be added to this plan at that point — do not attempt to fix all errors in one giant task.

---

## Phase H — Final Verification

### Task 25: Full build, cross-reference sweep, and session close-out

**Files:** N/A — verification only

- [ ] **Step 1: Full production build**

```bash
npm run build
```
Expected: zero errors, zero warnings introduced by this plan's changes.

- [ ] **Step 2: Final cross-reference sweep** for every path touched across all executed tasks — re-run the specific greps from each task's own sweep step, confirm all return clean.

- [ ] **Step 3: `git status --porcelain` review** — confirm every remaining change is intentional; nothing unexpected staged or modified.

- [ ] **Step 4: Visual smoke test** via the `run` skill — load the home page and one case-study page, confirm nothing visibly broke across all the changes in this plan.

- [ ] **Step 5: Summarize to the user**: what was changed across all executed tasks, what's still deferred/open (e.g., placeholder asset folders not yet filled, strict-mode not yet enabled), and flag total uncommitted scope if anything remains pending commit per `UNIVERSAL_GIT_RULES.md` §13.

---

## Phase I — Content Repositioning: Digiflux Growth Sync

> Added 2026-08-19, after a deep read of `~/Sahil/career-growth/` (a fact-checked, git-verified career narrative: `TIMELINE_ANALYSIS.md` + `career-growth.html`, generated 2026-06-08, cross-checked against ~20 local work repos). This phase closes the gap between that verified source and the live portfolio's `src/data/*`. All dates/metrics below are taken verbatim from `TIMELINE_ANALYSIS.md`'s "Verified metrics" and "Discrepancy register" sections — treat them as the authoritative source over whatever the portfolio currently says.

### Task 26: Fix incorrect employment dates in `experience.ts`

**Files:** Modify `src/data/experience.ts` (read fully first)

- [ ] **Step 1: Fix the `digiflux-intern` entry** (currently lines 37-53) — change `duration: 'Aug 2023 – Dec 2023'` → `duration: 'Jan 2024 – Jun 2024'`, `startDate: '2023-08'` → `startDate: '2024-01'`, `endDate: '2023-12'` → `endDate: '2024-06'`. Verified: internship ran Jan 16 – Jun 16, 2024 (career-growth.html hero eyebrow + Phase 1 section).

- [ ] **Step 2: Fix the `digiflux-ase` entry** (currently lines 16-36) — change `duration: 'Jan 2024 – Present'` → `duration: 'Jul 2024 – Present'`, `startDate: '2024-01'` → `startDate: '2024-07'`. Verified: full-time started Jul 8, 2024, immediately after the internship ended Jun 16, 2024.

- [ ] **Step 3: Fix `stats.experience` in `src/data/index.ts:31`** — currently `experience: '1+ Years'`. This is LIVE and rendered directly on the homepage hero (`HeroEnhanced.tsx:298`: `<StatCard icon="💼" label="Experience" value={stats.experience} delay={200} />`) — a real, user-visible wrong number today. Update it to accurately reflect the corrected Jul 2024 start date (verified: 29 months at Digiflux as of Jun 2026 per career-growth.html footer — pick a phrasing consistent with whatever "as of" framing the rest of the site uses; confirm exact wording with the user before committing since it's a visible homepage number, not a background data fix).

- [ ] **Step 4: Check for any other computed "years of experience" or tenure string elsewhere** that derives from these dates:

```bash
grep -rn "2024-01\|Jan 2024\|years.*experience\|experience.*years" --include="*.tsx" --include="*.ts" src/
```
Fix any other hardcoded tenure claim found to match the corrected Jul 2024 start.

- [ ] **Step 5: Verify build**, `npm run build`.

- [ ] **Step 6: Propose to user, then commit**

```bash
git commit -m "fix(content): correct Digiflux employment dates

Internship was Jan 16 - Jun 16 2024 (not Aug-Dec 2023); full-time
start was Jul 8 2024 (not Jan 2024) - verified against git history
in ~/Sahil/career-growth/TIMELINE_ANALYSIS.md."
```

---

### Task 27: Fix Team Star Award date and add the missing AI Catalyst 2026 achievement

**Files:** Modify `src/data/achievements.ts` (read fully first)

- [ ] **Step 1: Fix `team-star-award`** (currently lines 16-24) — change `date: 'June 2024'` → `date: 'March 2025'`, and reword the description to reference "First Annual Townhall" (currently already does) with the corrected date; `metrics: '9 months of excellence'` → confirm against career-growth's framing (recognized across ~9-11 months of work leading into the March 2025 Townhall — keep the metric if it still reads accurately, otherwise adjust wording, don't just swap the date and leave a stale duration claim).

- [ ] **Step 2: Add a new achievement entry for AI Catalyst 2026**, placed first in the Awards section (it's the most recent and most senior recognition):

```ts
{
  id: 'ai-catalyst-2026',
  title: 'AI Catalyst 2026 — Special Recognition',
  organization: 'Digiflux Technologies',
  date: 'March 2026',
  description: 'Special Recognition at the Second Annual Townhall for advancing AI-driven solutions — one year after Team Star, reflecting the shift from finding my footing to owning AI infrastructure at scale.',
  category: 'award',
  metrics: 'Second Annual Townhall',
},
```
(Exact wording is a starting draft — confirm final phrasing with the user before committing, since award-description tone matters and this is representing a real employer recognition.)

- [ ] **Step 3: Add `ai-catalyst-2026` to `highlightedAchievements`** (line ~208-215), likely as the new first entry given recency/seniority.

- [ ] **Step 4: Verify build**, `npm run build`.

- [ ] **Step 5: Propose to user, then commit**

```bash
git commit -m "feat(content): add AI Catalyst 2026 award, fix Team Star date

Team Star was March 2025 (First Annual Townhall), not June 2024.
AI Catalyst 2026 (Second Annual Townhall, March 2026) was missing
entirely - the most recent and most senior recognition to date."
```

---

### Task 28: Fix AI-Manthan hackathon date

**Files:** Modify `src/data/achievements.ts`, cross-check `src/data/caseStudies.ts`

- [ ] **Step 1: Fix `ai-manthan-top10`** (achievements.ts lines 25-33) — change `date: 'January 2025'` → `date: 'October 2025'`. Verified via git init timestamp (2025-10-11) in the ForeSight/Innovatrix repo.

- [ ] **Step 2: Check `caseStudies.ts` for the same date on the ForeSight case study**:

```bash
grep -n "January 2025\|Jan 2025\|ForeSight\|foresight" src/data/caseStudies.ts
```
Fix any matching stale date found there too — this must be consistent across both files.

- [ ] **Step 3: Verify build**, `npm run build`.

- [ ] **Step 4: Propose to user, then commit**

```bash
git commit -m "fix(content): correct AI-Manthan hackathon date to October 2025"
```

---

### Task 29: Decide which missing major projects get case-study treatment

**Files:** N/A initially — decision + scoping task. Likely touches `src/data/caseStudies.ts` and/or `src/data/projects.ts` once scoped.

**Missing work identified in career-growth (none currently represented anywhere on the site):**
- **MIXA** — creator-commerce platform, 517K+ products across 29 marketplaces (EN+AR), PostgreSQL→MongoDB sync, Cloudflare R2 image processing, gRPC semantic search API with Pinecone (5,109 category mappings). Full platform ownership from Jan 2026.
- **MOLT** — NestJS microservice mesh (auth/coach/fitness/meal-logging/user) + standalone React Native app with Fitbit/Garmin/Oura integrations. Feb 2026 onward.
- **Zikhara** — Adobe Photoshop UXP plugin (React-based, used by real designers inside Photoshop) + follow-on SaaS catalog pipelines and serverless image compression.
- **decodeU** — BLE thermal printer React Native app for cafe POS (real hardware integration: device pairing, ESC/POS commands).
- **Delicut WhatsApp bot** — FastAPI + Supabase + Twilio, rule-based meal-ordering (May 2026).
- **LangGraph Redmine agents** — ReAct agents for internal automation (Apr 2025).

- [ ] **Step 1: Decision gate — ask the user**: which of these six warrant a full case study (like the existing 7 in `caseStudies.ts`) versus a shorter `projects.ts` entry versus just an added bullet in `experience.ts`'s `digiflux-ase` description? MIXA and MOLT are the strongest case-study candidates given scale and full ownership; Zikhara's UXP angle is distinctive/memorable even if smaller in scale; decodeU/WhatsApp bot/Redmine agents may fit better as `experience.ts` bullets or `projects.ts` entries than full case studies.

- [ ] **Step 2: Once scoped, this task splits into one sub-task per approved case study/project**, following the existing pattern in `caseStudies.ts` (read 2-3 existing entries fully first to match structure/fields exactly) or `projects.ts`. Each sub-task gets written with full detail (exact TS object, exact metrics from the table above) once the user confirms scope — not drafted blind here, since case-study depth requires the user's input on what technical detail to foreground.

---

### Task 30: Rewrite `personal.ts` bio/tagline/impactStatement in a hook-driven voice

**Files:** Modify `src/data/personal.ts` (read fully first — already read in full this session, 27 lines). Also touches `src/data/index.ts`'s `stats.accuracy` (currently `'98%+'`) and `seo.description`/`seo.title` (same stat-dump/mixed-identity tone as `bio`, e.g. "Passionate footballer and data scientist" — read the full `stats`, `seo` objects in `data/index.ts` too, not just `personal.ts`, since they carry the same tone/accuracy problem).

**Current state:** `bio` reads as a dense stat-list mixing identity markers ("Data Scientist and National-Level Footballer building production systems serving 2M+ users with 98%+ accuracy. Published researcher with 9.35 CGPA from CHARUSAT."). `tagline` and `impactStatement` are similarly stat-forward rather than narrative. `data/index.ts`'s `stats.accuracy: '98%+'` is a rounder, less-precise figure than career-growth's verified 93.17% (used elsewhere in the codebase's own case-study content) — reconcile for consistency rather than leaving two different accuracy claims live on the same site.

**Source material available:** `career-growth.html`'s hero tagline (*"From imposter syndrome and Jupyter notebooks to architecting systems that serve millions — a 29-month story of building, shipping, and growing up as an engineer"*) and phase subtitles (*"I don't wait for a task anymore. I see the problem and I build the solution"*) demonstrate the target register: specific, human, confident without being a stat-dump.

- [ ] **Step 1: Decision gate — ask the user for direction, not just approval**: this is creative/positioning work, not mechanical fact-correction like Tasks 26-28. Present 2-3 draft directions for `bio`/`tagline`/`impactStatement` (e.g., one narrative-hook-led option adapted from career-growth's voice, one metrics-led-but-tighter option, one hybrid) and let the user pick/steer before finalizing exact copy — don't ship a single unilateral rewrite.

- [ ] **Step 2: Once direction is chosen, draft final copy** incorporating verified current metrics (517K+ products, 29 marketplaces, 2M+ users, 125K+ customers — pick the ones that best fit the chosen direction, don't cram all of them in) and verified current title/seniority framing (29 months at Digiflux, not a first-year-engineer framing).

- [ ] **Step 3: Check downstream consumers** of `personalInfo.bio`/`tagline`/`impactStatement`:

```bash
grep -rn "personalInfo\.\(bio\|tagline\|impactStatement\)" --include="*.tsx" src/
```
Confirm the new copy fits each consuming component's layout (character length matters for hero/meta-description contexts) — read each consuming component before finalizing length.

- [ ] **Step 4: Apply, verify build, propose, commit.**

```bash
git commit -m "content: rewrite bio/tagline for hook-driven, senior-engineer voice"
```

---

### Task 31: Update `roles[]` and Hero typing-animation content for current seniority

**Files:** Modify `src/data/personal.ts` (`roles[]`, lines 13-19), check `HeroEnhanced.tsx`'s consumption of it

**Current:** `["AI/ML Engineer", "Full Stack Developer", "Data Scientist", "Published Researcher", "National Footballer"]`

- [ ] **Step 1: Decision gate — ask the user**: does this list still represent current positioning, or should it shift toward the ownership/scale framing career-growth demonstrates (e.g., reflecting platform ownership, multi-product concurrency)? This is a small, low-risk edit but still a voice/positioning choice — confirm direction rather than assuming.

- [ ] **Step 2: Apply approved change, verify build, propose, commit.**

---

## Phase J — Competitive Portfolio Design & Content Audit

> Added 2026-08-19 per user request: source ~20 strong software engineer/AI-engineer portfolio sites, deeply audit their design and content patterns, and produce concrete, actionable recommendations (color theme, layout, content hooks) for this site. This phase is independent of Phase I and can run in parallel with it or with the Phase A-H SDD execution — it touches no repo files until Task 34's recommendations are turned into approved follow-up tasks.

### Task 32: Source a candidate list of ~20 portfolios

**Files:** N/A — research task. Output: a list file at `docs/superpowers/plans/2026-08-19-portfolio-scrape-candidates.md` (or similar, under this plan's workspace) listing the 20 chosen URLs with a one-line reason each.

- [ ] **Step 1: Decision gate — confirm benchmark criteria with the user** before searching: what tier/style to benchmark against — e.g., senior/staff software engineers, AI/ML engineers specifically, a mix of minimalist vs. narrative-heavy vs. dark-mode-editorial styles? Searching blind without this produces a list that may not match what "best for us" means for this specific site's positioning (technical, production-systems-focused, not a designer/agency portfolio).

- [ ] **Step 2: Load the `firecrawl:firecrawl-search` skill** (per this session's using-superpowers rule — invoke skills before using their tools) and run a set of targeted searches (e.g., "best software engineer portfolio websites", "AI engineer portfolio design inspiration", "developer portfolio case study examples") to build a candidate pool larger than 20, then down-select to ~20 with genuine variety (not 20 near-identical templates).

- [ ] **Step 3: Write the candidate list** to the output file with URL + one-line reason for inclusion (design style, seniority level represented, why it's relevant).

- [ ] **Step 4: Present the list to the user for a quick sanity check** before the full scrape/audit in Task 33 — cheap checkpoint before spending the scrape budget.

---

### Task 33: Scrape and structurally analyze the 20 sites

**Files:** N/A — research task. Output: per-site notes file (or one consolidated file) under this plan's workspace, not the main repo.

- [ ] **Step 1: Load the `firecrawl:firecrawl-scrape` skill** (and `firecrawl:firecrawl-crawl` if a site needs more than its landing page) before scraping.

- [ ] **Step 2: For each of the 20 approved candidates, scrape and extract:**
  - Color palette (primary/accent/background — note dark vs. light default, and whether it's a themed toggle)
  - Typography choices (heading/body font pairing, whether serif/sans/mono mixing is used)
  - Content structure/section order (what comes first after hero, how case studies are structured, where resume/contact CTAs sit)
  - Hero hook pattern (stat-led vs. narrative-led vs. visual-led — capture the actual hero copy verbatim for a few standout examples)
  - Case-study depth and structure (problem/solution/impact framing, metrics usage, image/diagram usage)
  - Any distinctive interaction/animation pattern worth noting

- [ ] **Step 3: Write findings to a structured notes file** — one row per site in a table (URL, palette, hero pattern, structure notes), plus a short "standouts" list of the 3-5 most impressive/relevant examples with why.

- [ ] **Step 4: Given the scale (20 sites), delegate the actual scrape+analysis to a background agent** per this repo's own cleanup-rules guidance on delegating large-volume reads — dispatch one agent with the approved candidate list and this task's extraction spec, rather than doing 20 sequential scrapes in the controller session.

---

### Task 34: Synthesize recommendations and produce follow-up tasks

**Files:** N/A — synthesis task, output feeds Phase E (frontend polish) and potentially a new Phase K.

- [ ] **Step 1: Read Task 33's findings file fully.**

- [ ] **Step 2: Cross-reference against the current live site's actual choices** (re-confirm, don't assume from memory): `tailwind.config.ts`'s color tokens (blue/orange/cyan per recon), Inter as the site-wide font (per the recent `7e71be5 fix(typography): restore Inter site-wide for consistency` commit — note this was a deliberate recent decision, so any font-change recommendation must be weighed against that recent explicit choice, not silently overridden), current section order in `page.tsx`, current case-study structure in `CaseStudyArticle.tsx`.

- [ ] **Step 3: Produce a structured recommendations report** covering: (a) color theme — keep/adjust/replace with specific reasoning, not just "this other site's palette looks nice"; (b) content structure — specific section-order or hook-pattern changes worth adopting; (c) case-study format improvements; (d) anything explicitly NOT worth adopting and why (avoid cargo-culting trends that don't fit an engineering-focused portfolio).

- [ ] **Step 4: Present the report to the user** and, for each recommendation they approve, write it as a new fully-detailed task (following this plan's task-writing standard — exact files, exact changes, no placeholders) appended under a new Phase K, rather than executing any visual/content change unilaterally from this research alone.

---

## Phase L — 3D AI Avatar Companion (Research & Feasibility)

> Added 2026-08-20 per user request: research the feasibility of a 3D character likeness of Sahil that roams the portfolio freely, moves/animates as the visitor scrolls, does natural idle actions, shows a thought cloud, and delivers short spoken/thought narration tied to each section — a "story mode" guided-tour companion. This section is **research and staged planning only** — per this project's standing process (creative feature work goes through `superpowers:brainstorming` before implementation tasks are written), no Task-N-with-exact-steps exists yet for the actual build. That happens at L1 below.

### Reference context

- **Inspiration, not a technical blueprint:** the user linked a Reddit post about [sanfransim.com](https://sanfransim.com), a 2D isometric business-sim game built rapidly using Claude Fable (an AI model). It demonstrates that AI-assisted development can ship ambitious, playful interactive experiences fast — relevant as proof-of-appetite, not as a rendering technique (it's 2D isometric, not a 3D humanoid character).
- **Closest real technical precedent:** [Bruno Simon's portfolio](https://bruno-simon.com/) — a Three.js personal site where visitors drive/explore a 3D world instead of scrolling a traditional page. [Case study](https://medium.com/@bruno_simon/bruno-simon-portfolio-case-study-960402cc259b), [source on GitHub](https://github.com/brunosimon) (MIT-licensed, including Blender files). The pattern this plan proposes (a character that reacts to scroll rather than free-roam driving) is a lighter-weight variant of the same core idea: a 3D character layered over/around the content, not replacing it.

### Recommended tech stack (from research, 2026-08-20)

| Concern | Recommendation | Why |
|---|---|---|
| Photo → rigged 3D character | **[Meshy](https://www.meshy.ai/features/image-to-3d)** (user-suggested, confirmed well-suited) | Photo/text → rigged full-body human; [auto-rig](https://www.meshy.ai/features/ai-auto-rigging) uses Mixamo-compatible bone naming (huge free animation library retargets directly — walk, idle, wave, think, talk); 600+ built-in animation presets; exports GLB (ideal single-file web format); rigging/animation currently 0 credits, Pro plan $20/mo/1000 credits for the generation itself. |
| Alternatives considered | Ready Player Me (best for stylized/consistent but less photoreal), Tripo3D (fastest pipeline, Unity-leaning rig), 3D AI Studio (rig+animate in one workspace, Blender bridge) | Noted for comparison; Meshy is the strongest fit for "photoreal-ish rigged human with a large ready-made animation library." |
| Rendering | React Three Fiber + drei | **Already installed in this repo, currently unused** (this directly resolves Task 19's open decision — see cross-reference below). `useGLTF`/`useAnimations` for loading the character, drei's `<Html>` for overlay content. |
| Scroll-driven animation/position | Framer Motion `useScroll`/`useTransform` (already this codebase's animation library) — evaluate against GSAP ScrollTrigger via a small spike | The most complete public tutorial found ([Wawa Sensei's 3D portfolio series](https://wawasensei.dev/tuto/build-a-3D-portfolio-with-react-three-fiber-framer-motion-scroll-animations)) pairs GSAP with R3F; staying on Framer Motion keeps one animation runtime instead of two unless GSAP proves meaningfully better for this specific sync problem. |
| Thought bubble / narration overlay | Three.js `CSS2DRenderer`/`CSS2DObject` (or drei's `<Html>`, same underlying technique) | Standard, well-documented pattern: wrap an HTML/CSS bubble in a `CSS2DObject`, position it in 3D, it gets projected to screen coordinates every frame. [Three.js docs](https://threejs.org/docs/pages/CSS2DRenderer.html), [tutorial](https://waelyasmina.net/articles/how-to-integrate-html-elements-into-a-three-js-scene/). |

**Cross-reference — Task 19 (unused Three.js dependency decision):** this phase gives `three`/`@react-three/fiber`/`@react-three/drei` a concrete planned use. When Task 19 is reached, the recommendation is now **keep**, not remove — flag this to the user again at that point in case priorities have shifted, but don't silently remove dependencies this phase is about to need.

**Cross-reference — Task 30 (bio/tagline hook-driven rewrite):** the character's per-section thought/spoken lines are a natural home for the same hook-driven voice being developed for `personal.ts` — potentially delivered progressively as a guided tour rather than front-loaded into one bio paragraph. Worth considering together once both reach implementation, not necessarily duplicating the same copy in two places.

### Performance & accessibility findings (non-negotiable given this site's audience and static-export constraints)

- Respect `prefers-reduced-motion` (already an established pattern in `globals.css`) — static/simplified fallback (character stands still, one wave, no roaming) when preferred.
- WebGL feature-detection fallback — graceful degrade to the existing 2D site for unsupported browsers/devices, never a broken experience.
- Lazy-load the entire 3D layer (dynamic import) so it never blocks First/Largest Contentful Paint of the actual content (resume, case studies, contact) — the core site must stay fast and fully functional even if the 3D layer fails, is disabled, or hasn't loaded yet.
- Keep the character asset lean — target a total budget (model + textures + animations) in the low single-digit MB range. This project already has one cautionary example: `public/images/hero/profile.jpg` at 6.3MB, flagged in recon as a performance problem (Task 13) — this feature must not repeat that mistake at a larger scale.
- Test on real mid-range mobile devices, not just a dev machine — a laptop-smooth 60fps animation can crawl on a 3-year-old Android phone.
- Consider a simple on/off toggle so performance- or accessibility-conscious visitors can opt straight into the fast, content-first experience.

### Honest risk assessment

A rigged photo-likeness can land anywhere between genuinely memorable and uncanny-valley depending on execution quality — for a portfolio whose primary audience is recruiters/hiring managers, that's a real reputational variable on top of the technical one, directly relevant to the "professional, technical, smart" positioning goal from this session's content-repositioning work (Phase I). **Recommendation: prototype before committing** — one character, one animation, one section — validate visual quality and tone fit before scoping a full-site build.

### Staged outline (high-level — each stage gets its own fully-detailed task breakdown when reached, not written blind here)

- **L1 — Brainstorming/design pass (required before any implementation task is written).** Use `superpowers:brainstorming`. Nails down: character visual style (how photoreal vs. stylized), personality/voice, exact per-section dialogue/thought content, interaction model (does it react to clicks? follow a fixed path? idle-wander?), and how it coexists visually with the existing blue/orange/cyan design system.
- **L2 — Prototype spike.** Generate one character via Meshy from a reference photo, rig it, get one idle + one walk animation working in an isolated test page (not merged into the live site yet). Validate visual quality, file size, and frame-rate budget before scoping further.
- **L3 — Scroll-sync system.** Build the scroll-position → 3D-position/animation-state mapping for the full page, once L2 validates the approach.
- **L4 — Narration content system.** Data-driven (matching this codebase's `src/data/*.ts` pattern) mapping each section to the character's dialogue/thought text — informed by Task 30's voice work.
- **L5 — Performance/accessibility hardening.** Reduced-motion fallback, WebGL feature detection, lazy-loading, real mobile device testing, opt-out toggle — per the findings above.
- **L6 — Full-site integration + QA pass.**

---

## Self-Review Notes

- **Addendum (2026-08-19):** Tasks 26-34 (Phases I-J) were appended after the initial plan was written and after Task 1 was already complete, per a direct user request mid-execution. They follow the same task-writing standard (exact files, exact old→new values where known, decision gates where genuinely ambiguous) and don't renumber or otherwise disturb Tasks 1-25 or the SDD ledger's existing progress. Tasks 26-28 are pure factual corrections with exact values already known (no decision gate needed beyond the standard propose-before-commit); Tasks 29-31 and 32-34 have explicit decision gates since they involve creative/positioning judgment or research scoping that only the user can direct.
- **Coverage**: every finding from the recon report's §1 (executive summary) and §10 (open questions) maps to a task above (dead code → Tasks 1–4; docs → Tasks 5–9; content → Tasks 10–12; assets → Tasks 13–16; frontend/perf/SEO → Tasks 17–22; tooling → Tasks 23–24; close-out → Task 25; Digiflux content sync → Tasks 26-31; competitive audit → Tasks 32-34).
- **Decision gates are explicit**, not silently resolved, everywhere recon flagged genuine ambiguity (Hero.tsx fate, resume authoritative copy, testimonials UI-vs-delete, MASTER.md regenerate-vs-delete, Three.js keep-vs-remove, strict-mode scope) — per the cleanup rules' §2.5 guidance on ambiguous standing rules driving irreversible actions.
- **Task 12 is intentionally a stub/pointer**, not a placeholder in the forbidden sense — it correctly defers to a decision made in Task 3 and explicitly names what happens next depending on that decision, rather than saying "TBD."
- Every task ends with a proposal/approval step and a verification step before commit, consistent with Global Constraints.
