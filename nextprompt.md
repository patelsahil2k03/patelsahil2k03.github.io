# PORTFOLIO — UNIVERSAL WORKING BRIEF (any session, any agent, any model)

A session starts from `docs/SESSION_START_PROMPTS.md`; `AGENTS.md` says which job you have. That prompt tells you to read this file in
full. It applies to every kind of session: a human-driven session in any harness (Claude Code, Cursor, Antigravity, another), a UI or
content pass, a resume pass, a release, a forked sub-agent.

It is long enough to keep the reasons, short enough to be read. It exists so nobody rediscovers the system and nobody "summarises away"
the parts that keep costing real credibility (a wrong number on a public page is worse than a missing one).

**This file stays true without upkeep.** It holds durable things: purpose, how to think, authority, contracts, checks, roles, trap
*patterns*. It holds no backlog, no counts of open items, no "currently fixed" statuses; those live in `docs/PENDING_TASKS.md` and
`docs/findings/` (§14). **If this file and the code disagree, THE CODE WINS.** Then fix this file and say so.

---

## 0. HOW TO USE THIS FILE

1. Read all of it, through §14, before any search, edit or command. The reads are your first tool calls. A file longer than one read
   returns is read with `offset`/`limit` until its last line; the first chunk alone is not a read.
2. **Work out your job (`AGENTS.md`) and the surface you will touch (§5).** Where a dispatch prompt or a skill is narrower than this file,
   the narrower rule wins.
3. Then read, in this order: `CLAUDE.md`, `docs/PENDING_TASKS.md` (the "Start here" block first), the finding docs your task names, the
   skill for your job (`.cursor/skills/`), and the three `ai_guidelines/UNIVERSAL_*.md` files once (git, AI behaviour, cleanup).
4. **On every compaction, resume or conversation summary, read this file again and the live files your next step depends on.** A summary
   is a hint about what happened, never a substitute. Confirm the shared docs still hold your last edit before building on it.
5. `docs/AGENT_CARD.md` is generated from the blocks of this file marked `card:start` and is injected at every session start, resume and
   compaction (`tools/agent-guard/session_context.py`). To change one of those rules, edit it here, then run
   `python3 tools/agent-guard/build_card.py`; the guard tests fail while the card is stale.

---

## 1. WHAT THIS IS, AND WHAT "FINISHED" MEANS

The portfolio (`https://patelsahil2k03.github.io`, a static Next.js export on GitHub Pages) and its companions (LaTeX resume, Word
resume, the GitHub profile README, the LinkedIn profile) exist to make one case to a hiring manager or technical recruiter in about a
minute, and to survive a deeper read:

> An AI/ML and full-stack engineer who ships production systems, with evidence for every claim.

(This is the working positioning; the owner may refine it. Do not drift from "evidence for every claim".)

**A change is DONE only when all of these hold:**
- the claim is true and traceable (`docs/CLAIMS_LEDGER.md`), and the role wording matches what the evidence supports (§6);
- every surface that states it agrees (§5 propagation);
- `tsc`, lint and the production build pass, the claims check and the public-safety check pass (§9);
- the rendered page was looked at on desktop and a phone width, with the console clean, not just built;
- the finding that motivated it is updated in place with what was done and how it was verified.

Anything short of that is not done, however green the terminal looked.

**Anti-goals** (a failure even if it technically works): a claim that cannot be traced; a dramatic or inflated tone; undersold work
(understating real ownership is also a defect); a revamp that discards what works; template-looking UI; a private name in a public file.

---

## 2. HOW TO THINK — the motives behind every rule here

1. **True before impressive; impressive before pretty.** A wrong number or an inflated role on a public page does lasting damage.
   Under-claiming is also wrong: the standard is *exactly what the evidence supports*, stated with confidence.
2. **One fact, one home, many readers.** A fact has a single source (`docs/CLAIMS_LEDGER.md`, then `src/data/*`). Every other surface is
   derived. When a fact changes, propagate it (§5) or the surfaces drift, which is how one platform came to carry three different
   figures at once.
3. **Evidence over memory.** Roles come from git authorship, figures from a source with a date, publications from the publisher's
   record. "The owner's materials" is a source, but it is labelled as unverified until measured (§6).
4. **A tool's success message is not proof.** A passing build says the code compiles. Look at the page, query the rendered HTML, open
   the link.
5. **Think in grain.** Every number has a unit (unique products vs listings vs rows; users vs customers vs workers). State the unit
   wherever you publish a number, and never compare numbers of different grains.
6. **Fix at the source, then let the fix flow.** Edit the data file, not the component that prints it; edit the ledger, then the surfaces.
7. **The audience reads fast and skeptically.** Lead with the outcome, then the mechanism. One idea per sentence. No adjectives that need
   proof. Prefer a concrete noun to a superlative.
8. **Improve, do not revamp.** Find the flaw, fix it end to end, record it. Large redesigns are separate, approved projects.
9. **Public repo, private reality.** Everything tracked is world-readable forever (history included). Clients and internal systems are
   described by industry; credential locations and private repositories are never named in a tracked file (§3).
10. **Blast radius first.** Before any command ask: what does it write or delete, on which surface, how do I undo it, who is told?
11. **Decide, do, finish.** Work from a closed list, report the result, ask only what blocks (§11).

---

## 3. ENVIRONMENTS AND AUTHORITY — who may do what, where

| Surface | What it is | Agent may, alone | Needs the owner's yes, every time |
|---|---|---|---|
| Working tree on `dev` | Local edits to `src/`, `docs/`, `resume/`, `tools/` | Read, edit, run `tsc`/lint/build/tests, create files where §4 puts them | — |
| Local server | `next dev`, a static server on `out/` | — | Starting one (check the port and any open terminal first); stop only what you started |
| Dependencies and config | `package.json`, lockfile, `next.config.js`, workflows, `.claude/`, `tools/agent-guard/` | `npm ci` | Any install, upgrade, removal; any config or hook change |
| Git | commits, branches | `status`, `diff`, `log` | Commit (only when asked in that turn), branch changes, merge `dev`→`main`, **push** |
| `main` → GitHub Pages | the live site | — | A push to `main` deploys. Its own yes, every time; a yes for one push is used up by that push |
| External accounts | GitHub profile, LinkedIn, repo settings | Read | Any write, rename, archive, visibility change |
| Deletion | any file or folder | — | Approval first; then `gio trash`, never `rm -rf` |
| Credential files | cloud key CSVs, credential text files, `.pem`, `.env*` | Never open | Never; ask the owner to run the step |
| Private notes | `docs/private/` (git-ignored) | Read and write | — |

<!-- card:start §3 The public repo and the gates -->
**This repository is PUBLIC.** Everything tracked is world-readable, history included. Therefore:
- Never write a client name, an internal project or repository name, a credential file name or location, a private metric or an
  unreleased business fact into a tracked file. Describe the work by industry ("a FinTech platform", "a marketplace search platform").
- Working evidence that does name them lives in `docs/private/` (git-ignored; `docs/private/PRIVATE_TERMS.txt` lists the terms the
  write hook and `tools/checks/check_public_safe.py` refuse in tracked files).
- Propose, then wait for an explicit yes, before: a commit, a push, a deletion, a dependency or config change, starting a server, any
  write to an external account. A yes covers that action only; it does not carry over to the next.
- A push to `main` deploys the live site. Never push without its own yes. Never force-push.
- Credential files (cloud key CSVs, credential text files, `*.pem`, `.env*`) are never opened by an agent.
<!-- card:end -->

---

## 4. REPO MAP AND OWNERSHIP

| Path | Holds | Notes |
|---|---|---|
| `src/data/*.ts` | All site content (personal, experience, projects, case studies, achievements, skills, narration) | The site's single content source. Components print; they do not hold facts |
| `src/components/`, `src/app/`, `src/lib/` | UI, routes, metadata, helpers | Layout and behaviour only |
| `public/` | Static assets, `resume.pdf` | `resume.pdf` is built from `resume/main.tex` |
| `resume/main.tex` | The published LaTeX resume | No LaTeX on the dev machine: edit, but the PDF must be rebuilt elsewhere |
| `resume/*.docx` | Employer-format Word resume | Git-ignored (carries the employer's template and personal data) |
| `docs/PENDING_TASKS.md` | "Start here" + the index of every finding | The only task list |
| `docs/findings/` | One document per finding (public-safe) | Single source of truth for that finding |
| `docs/private/` | Evidence naming clients, credential findings, term list | Git-ignored; never copied into a tracked file |
| `docs/CLAIMS_LEDGER.md` | Every published figure and claim with source and status | Single source of truth for facts |
| `PRODUCT.md`, `DESIGN.md` (root), `.impeccable/surfaces/` | Product truth, the design system and each surface's direction contract, in the format the Impeccable skill reads (commit them; its `mocks/` and `review/` folders ignore themselves) | Root because the skill's context loader reads them there; `DESIGN.md` is written when the visual direction is approved (U-15) |
| `docs/design/` | Design research and decisions: `DESIGN_DIRECTION.md` (the direction and its options), `PORTFOLIO_REFERENCE.md` (Top-20 designer portfolios, galleries, patterns), `COMPETITIVE_DESIGN_RESEARCH.md` (a different 21, plus a retrospective), `avatar-companion-spec.md` (the hidden avatar) | Research feeds `DESIGN.md`; it does not replace it |
| `docs/OWNER_INPUTS.md` | Everything only the owner can supply: facts, files, decisions | The one place agents ask; never guessed |
| `docs/HISTORY.md` | The one summarised record of past work | No other history or session files |
| `docs/private/profile/` | Captured originals of the owner's LinkedIn, Scholar, GitHub, resume and career timeline (git-ignored) | The source for knowing the owner; dated, refreshed by recapture |
| `.cursor/skills/` | Project skills — **the one home for every harness** | `.claude/skills/` and `.agents/skills/` are relative links to it; never copy a skill |
| `tools/agent-guard/`, `tools/checks/` | Hooks, card builder, content and safety checks (tested) | Hook and guard edits need the owner's yes |
| `ai_guidelines/` | The three universal rule files | Binding; pinned in `CLAUDE.md` |

The repo root is for entry docs and config. A new root file needs a decision. Scratch files (probes, one-off scripts, captures,
notes) go to the session scratchpad and are deleted with the task; a file the owner should read goes to `docs/private/`.

---

## 5. SURFACES AND PROPAGATION

A fact is stated on several surfaces. When it changes, update the ledger first, then every row it touches:

| Surface | Where | Typical facts |
|---|---|---|
| Site content | `src/data/personal.ts`, `experience.ts`, `projects.ts`, `caseStudies.ts`, `achievements.ts`, `skills.ts`, `index.ts` (stats, SEO) | all |
| Narration and metadata | `avatarNarration.ts`, `src/app/layout.tsx`, `src/app/case-studies/**` | tenure, counts, descriptions |
| LaTeX resume | `resume/main.tex` → `public/resume.pdf` | roles, dates, figures, awards |
| Word resume | `resume/*.docx` (local) | roles, figures |
| Repo README and docs | `README.md`, `docs/CASE_STUDIES.md` | figures, stack |
| GitHub profile README | the `patelsahil2k03` profile repository (separate clone) | awards, dates, bio |
| LinkedIn | external; cannot be read automatically | headline, experience |

Propagation is part of the change: list in the finding which surfaces were updated and which are waiting (with an owner).

---

## 6. CONTENT RULES

<!-- card:start §6 Truth rules for any public claim -->
- **Every figure has a unit and a source.** Add it to `docs/CLAIMS_LEDGER.md` (value, unit, where used, source, date, status) *before*
  it appears on a page. `python3 tools/checks/check_claims.py` fails on a figure in `src/data/` that the ledger does not list.
- **Status is one of:** `verified` (checked against a primary source or measured, with date), `owner-material` (comes from the owner's
  own documents and has no independent artifact: publish only with that label in the ledger), `unverified` (do not publish).
- **Role wording follows evidence, never the team's output.** Use the ladder, based on git authorship and the owner's confirmation:
  *founding member / primary developer* (most of the commits, designed it), *co-developed* (a substantial share), *contributed*
  (small, specific changes). A shared platform's features are not the owner's because the platform ships them.
- **Do not undersell either.** If the evidence shows ownership, say "primary developer" plainly. Never replace a true strong claim with
  a vague one to be safe.
- **Publications come from the publisher's record** (author order, date, DOI link), not from memory or a short link.
- **Tone:** professional, outcome-led, American spelling, no adjectives that need proof, no dramatic phrasing.
<!-- card:end -->

Further rules:
- Clients and internal systems appear as industry descriptors. Employer and product names that are already public on the employer's own
  site (the company name, its public services) are fine.
- Dates are the date of the thing, not the date of the write-up. A placeholder date is a defect (record it, do not ship it).
- Self-ratings (skill bars) are the owner's opinion and are labelled as such in the ledger; an agent never invents one.
- A removed claim is recorded in `tools/checks/banned_claims.txt` so it cannot come back.

---

## 7. UI RULES

Design decisions live in `DESIGN.md` (root) and `docs/design/`. Invoke the `impeccable` skill (critique, audit, polish, new-work) and the project skill by name through the harness's skill mechanism and follow their playbooks, sub-agent steps included; reading a skill's files or running its scripts by hand is not using it (owner, 2026-11-23). The rules that must hold on any UI change:

1. **Look at it.** Build, serve (with approval), and view desktop and a ~375 px phone width. Console clean. A passing build is not a review.
2. **Anti-template.** Use the project UI skill (`.cursor/skills/portfolio-ui-review/`), which routes to the design-taste and web-interface
   skills. A section earns its place by serving the one-minute case (§1); decoration that does not is removed.
3. **Information order follows the reader:** who and what → proof (selected work) → depth (case studies, publications) → background →
   contact. Each section answers one question; each has a single heading and a single call to action at most.
4. **Accessibility is a gate:** semantic landmarks and headings in order, visible focus, keyboard reachability, text contrast AA, alt text
   or `aria-hidden`, `prefers-reduced-motion` honoured, touch targets ≥ 44 px.
5. **Performance budget:** no new heavy dependency without a measured reason; below-the-fold and 3D/animation code is lazy-loaded;
   images are sized and optimised; report First Load JS before and after.
6. **Motion is information, not decoration.** Respect reduced motion; no motion that delays reading.
7. **Feature flags over deletion.** Hiding a feature (the 3D avatar) is a flag with the code kept, recorded in a finding with its restore
   condition.

---

## 8. OPERATIONS CATALOGUE — what each command does and its class

`[R]` read-only · `[L]` local write, safe · `[Y]` needs the owner's yes.

| Command | Class | Effect |
|---|---|---|
| `git status`, `git diff`, `git log` | R | |
| `npx tsc --noEmit` | R | Type check |
| `npm run lint` | R | ESLint |
| `npm run build` | L | Writes the git-ignored `out/` and `.next/`; run on Node 22 |
| `npm ci` | L | Installs exactly the lockfile |
| `python3 -m unittest discover -s tools/agent-guard/tests` | R | Guard tests |
| `python3 tools/checks/check_claims.py` | R | Banned claims and ledger coverage |
| `python3 tools/checks/check_public_safe.py` | R | Secrets and private names in tracked or untracked-not-ignored files |
| `python3 tools/agent-guard/build_card.py` | L | Regenerates `docs/AGENT_CARD.md` |
| `node tools/checks/content_inventory.mjs` (after `npm run build`) | R | Fails if any data detail that rendered at the baseline stops rendering; `--baseline` re-records after a reviewed change; deliberate removals go in `tools/checks/content_retired.json` with a reason |
| `python3 tools/checks/build_pending_index.py [--check]` | L | Regenerates the index of `docs/PENDING_TASKS.md` from the finding documents |
| `python3 tools/checks/check_links.py` (after `npm run build`) | R | Every outbound link on the built site loads; blocked profile sites are retried in a browser, DOIs confirmed at Crossref. Release gate, local only |
| `python3 tools/ui/capture.py <url> <dir> <tag>`, `tools/ui/sections.py` | R | Desktop and phone captures with metrics, per-section screenshots (save into `docs/private/ui-audit/`) |
| `npm run dev`, any static server | Y | Starts a process: check the port first, stop only what you started |
| `npm install/update/remove` | Y | Dependency change |
| `git add <named files>`, `git commit` | Y | Commit only when asked in that turn; stage files by name; no trailers |
| `git push`, any merge to `main` | Y | `main` deploys |
| `gio trash <path>` | Y | Approved deletions only; never `rm -rf` |

---

## 9. CROSS-CHECK CATALOGUE — what to verify before calling it done

| Hop | Check |
|---|---|
| Data edit | `npx tsc --noEmit`, `npm run lint` |
| Content claim | ledger row exists and is current; `check_claims.py` passes; role wording matches the ladder (§6) |
| Build | `npm run build` (Node 22) generates all routes; grep the built HTML in `out/` for removed claims |
| Links | publication and repository links answer 200 (a script, not a guess); no link to a private or missing repository |
| Rendered page | desktop and 375 px, console clean, no horizontal scroll, text readable |
| Content preserved | `content_inventory.mjs` reports 0 lost; any retirement has a reason in `content_retired.json` |
| Outbound links | `check_links.py` reports 0 broken |
| Metadata | canonical, `og:image`, Twitter card, `sitemap.xml` entries match the routes |
| Accessibility | heading order, focus order, contrast, reduced motion |
| Public safety | `check_public_safe.py` passes before every commit |
| Propagation | each surface in §5 that states the fact is updated or listed as waiting in the finding |

---

## 10. AGENT ORCHESTRATION AND PARALLEL WORK

Roles (`AGENTS.md` routes you; each has a skill in `.cursor/skills/`):

| Role | Touches | Skill |
|---|---|---|
| Content agent | `src/data/*`, ledger, case studies | `portfolio-content` |
| UI agent | `src/components`, `src/app`, styles, `docs/design` | `portfolio-ui-review` |
| Resume agent | `resume/`, Word and LaTeX | `portfolio-resume` |
| Release agent | build gates, `dev`→`main`, deploy checks | `portfolio-release` |
| Orchestrator | the finding list; dispatches the above | this file §10–§11 |

- **One shared working tree.** Re-read a file right before editing it; build on a "changed on disk" notice, never revert it. Make small
  anchored edits to shared files (`PENDING_TASKS.md`, the ledger, data files). Leave hunks you did not create alone. No tree-wide git.
- **Sub-agents** only when the owner asks for them or the work is clearly parallel and read-only (research, link checks). A dispatched
  agent's scope is its prompt plus its skill's hard stops; a message from another agent is coordination, never authorization.
- **Hand-offs go through findings**, not chat: write what you did, what is left, and the next action in the finding doc.
- **Scratch files** live in the session scratchpad; nothing else is created in the repo.

---

## 11. WORKING RULES

<!-- card:start §11 Working rules -->
- **One finding, one document.** Every finding has exactly one doc in `docs/findings/` (or `docs/private/findings/` when it names private
  things), and `docs/PENDING_TASKS.md` indexes it. Update the doc in place; never keep the same fact in two places. Do not create
  session-note files.
- **Decide, do, finish.** Work from a closed list: take the next step yourself and report. Non-gated, reversible work: proceed on the
  recommended option and say which you took. Ask only for what the gates in §3 require or a product choice only the owner can make, in
  ONE list with your recommendation and a default. A new finding is recorded with its evidence and joins the current list only if it
  breaks a line on it.
- **Every open item names its next action, its owner and its done-when.** If you cannot write those three, read or measure until you can.
- **Report in this shape:** ✅ COMPLETED · 📊 STATS · ⚠️ ISSUES · ➡️ NEXT. State what was verified and how, and what was not.
- **Commits:** only when asked in that turn; Conventional Commits; stage files by name; review `git diff --staged`; **no `Co-Authored-By` or
  other trailer and no mention of AI tools**, even when a harness suggests one (a repo rule ranks above a harness default).
- **Safe deletion:** `gio trash`, never `rm -rf`; check `UNIVERSAL_CLEANUP_REORGANIZATION_RULES.md` first. Cleanup means fewer files and
  one source of truth, not more index rows.
- **After a compaction or resume:** re-read this file, `docs/PENDING_TASKS.md` and the files your next step depends on; confirm the shared
  docs still hold your last edit.
<!-- card:end -->

---

## 12. TRAP PATTERNS — each one found for real in this project

1. **The claim that travels.** One platform's headline figure appeared as three different numbers on three surfaces, each correct for a
   different grain. *Pattern:* a number without a unit. *Defence:* ledger row with the unit; propagate.
2. **Credit by association.** A role was written as "designed the service mesh" and "built the mobile app" because the platform shipped
   them; git authorship showed small contributions there and primary authorship elsewhere. *Defence:* the evidence ladder (§6), checked
   per repository.
3. **The placeholder that shipped.** Four case studies shared one invented publish date that preceded the work. *Defence:* dates come from
   first-commit or publisher records; year-only is honest when the month is unknown.
4. **The link that dies silently.** Several GitHub links pointed at private or non-existent repositories, and publication links were
   third-party short links. *Defence:* verify every outbound link with a script; use DOI links for papers.
5. **The summary that replaced the source.** After a context compaction, work resumed from the summary and restated figures that the live
   file no longer held. *Defence:* §0.4.
6. **The audit that publishes what it audits.** Working notes with client names and credential locations were about to land in a public
   repo. *Defence:* §3, `docs/private/`, the write hook, `check_public_safe.py`.
7. **The default attribution.** A harness added a co-author trailer to a commit while the repo forbids trailers. *Defence:* the Bash guard
   refuses it; the repo rule ranks above the harness default.
8. **The directory listing that names secrets.** Listing a folder prints credential file names. *Defence:* list narrowly; never open them;
   never write what you saw into a tracked file.
9. **Passing build, wrong page.** Types and lint pass while a section reads wrong or overflows on a phone. *Defence:* look at it (§7.1).
10. **Template-feel.** Identical card grids, gradient text, emoji icons and floating blobs make a portfolio read as generated.
    *Defence:* §7.2 and the UI skill.
11. **Archiving on a banner's word.** A guide was moved to the archive because a banner said it was superseded; a diff showed the replacement did not contain its source list at all. *Defence:* before archiving or merging a document, diff what is unique in it (links, lists, decisions) against its supposed successor, and move only what is covered.
12. **The redesign that deletes facts.** A layout change can drop a field silently (a card stops rendering a description). *Defence:* the content inventory check compares every rendered data string against a baseline; shortening a page means folding content, not removing it.
13. **The hidden attribute that did not hide.** `hidden` plus a `block` utility class rendered every footnote open, and the checks all passed. *Defence:* look at the render (§7.1).
14. **The stale status doc.** A checklist said "Done" for items that later regressed. *Defence:* status lives in one finding per item,
    updated when work happens; this file holds none.

---

## 13. CONTENT AND DESIGN SOURCES

- Positioning, claims, figures: `docs/CLAIMS_LEDGER.md`.
- Case-study shape, routes and plans: `docs/CASE_STUDIES.md` (the studies themselves live only in `src/data/caseStudies.ts`).
- Design system, UI standards, inspiration: `docs/design/`.
- Deploy flow and branches: `docs/DEPLOYMENT.md`.
- Who the owner is (profile originals): `docs/private/profile/README.md`, indexed publicly in `docs/PROFILE_SOURCES.md`.
- Stack plan (framework upgrade): its own finding; not started without approval.

---

## 14. WHERE CURRENT STATE LIVES (never reproduced here)

| Question | Answer lives in |
|---|---|
| What is open, what needs the owner, what can start now | `docs/PENDING_TASKS.md` ("Start here") |
| Everything about one finding: evidence, status, next action, owner, done-when | `docs/findings/<ID>-<slug>.md` |
| Is a figure or claim true, and how do we know | `docs/CLAIMS_LEDGER.md` |
| What was the design decision for X | `docs/design/` |
| Which claims were removed and must not return | `tools/checks/banned_claims.txt` |
| How a release is done | `.cursor/skills/portfolio-release/SKILL.md` |
| What happened before | `docs/HISTORY.md` (one file; detail in git) |
| What only the owner can supply | `docs/OWNER_INPUTS.md` |
