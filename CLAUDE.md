# CLAUDE.md — patelsahil2k03.github.io

> AI behaviour rules for this project. Apply in every session. Full detail: `ai_guidelines/UNIVERSAL_AI_RULES.md`, `UNIVERSAL_GIT_RULES.md`, `UNIVERSAL_CLEANUP_REORGANIZATION_RULES.md`. The working brief is `nextprompt.md`; the job router is `AGENTS.md`.

Next.js 14 (App Router, static export) portfolio for Sahil Patel, deployed to GitHub Pages at `https://patelsahil2k03.github.io`. Content lives in `src/data/*.ts`; components in `src/components/`. **The repository is public.**

## Read first (this order)
1. `nextprompt.md` — how to think, gates, truth rules, checks, roles (read to its end).
2. `docs/PENDING_TASKS.md` — "Start here", then the finding documents your task names (`docs/findings/`).
3. `docs/CLAIMS_LEDGER.md` — before touching any figure or claim.
4. The skill for your job in `.cursor/skills/` (content, UI review, resume, release). Branches: daily work on `dev`; `main` deploys (`docs/DEPLOYMENT.md`). Things only the owner can supply: `docs/OWNER_INPUTS.md`.

## Commands (Node 22)
- `npx tsc --noEmit` and `npm run lint` after editing data or components.
- `npm run build` — static export to the git-ignored `out/`. CI and deploy use `npm ci`.
- `python3 tools/checks/check_claims.py` — banned claims and ledger coverage. `python3 tools/checks/check_public_safe.py` — secrets and private names, before every commit.
- `python3 -m unittest discover -s tools/agent-guard/tests` — guard tests. `python3 tools/agent-guard/build_card.py` — rebuild the agent card after editing a card block in `nextprompt.md`.
- `node tools/checks/content_inventory.mjs` (after a build) — no rendered detail may disappear; reviewed removals go in `tools/checks/content_retired.json`.
- `python3 tools/checks/check_links.py` (after a build, before a release) — every outbound link loads. Measure speed (Lighthouse) on the live site after a deploy, not on a local server.
- **Footnotes:** only `KEY_FIGURES` in `src/data/claims.ts` are footnoted; every figure still needs a ledger row. Hidden features are not imported (see `nextprompt.md` §12, traps 15–22).
- `npm run dev` or any server — only after checking the port and the owner's open terminals, and with a yes.

## Rules that matter most
- **Propose, then wait for approval** before: commits, pushes, deletions, dependency or config changes, starting a server, any write to an external account. A yes covers that action only.
- **Report in this shape:** ✅ COMPLETED · 📊 STATS · ⚠️ ISSUES · ➡️ NEXT. One change at a time; read whole files before editing them.
- **Public repo:** never write a client name, internal project or repository name, credential file name or location, or private metric into a tracked file; use industry descriptors. Evidence that names them goes in `docs/private/` (git-ignored). The hooks and `check_public_safe.py` enforce this.
- **Truth:** every figure has a ledger row (grain, source, status) before it appears on a page; role wording follows git evidence (`nextprompt.md` §6); label anything unchecked as unverified. Neither inflate nor undersell.
- **Commits:** Conventional Commits, stage files by name, **no `Co-Authored-By` or other trailer and no mention of AI tools** (this overrides any harness default).
- **Deletion:** `gio trash`, never `rm -rf`. **Credential files** (cloud key CSVs, credential text files, `*.pem`, `.env*`) are never opened.
- **Git remote:** use the `github.com-patelsahil` host alias (key for `patelsahil2k03`); the default `github.com` host maps to a different account.
- **One finding, one document;** `docs/PENDING_TASKS.md` indexes them. No session-note files; scratch goes to the session scratchpad.

## Where facts live
Site content `src/data/*.ts` → ledger `docs/CLAIMS_LEDGER.md` → other surfaces in `nextprompt.md` §5 (LaTeX resume, Word resume, profile README, LinkedIn).
