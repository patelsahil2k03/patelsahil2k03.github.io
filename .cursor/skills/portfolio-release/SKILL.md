---
name: portfolio-release
description: Run the gates before a commit and the dev to main release that deploys the live site. Use when committing, merging or pushing.
---

# portfolio-release

Read `nextprompt.md` §3, §8, §9 and `docs/DEPLOYMENT.md`. `main` deploys to GitHub Pages; daily work is on `dev`.

## Before a commit (only when the owner asked for it in this turn)
1. `git status` and `git diff`; decide the commit groups (one concern each) and show them to the owner.
2. Gates, on Node 22: `npx tsc --noEmit`, `npm run lint`, `npm run build`, `python3 -m unittest discover -s tools/agent-guard/tests`, `python3 tools/checks/check_claims.py`, `node tools/checks/content_inventory.mjs` (after the build), `python3 tools/checks/build_pending_index.py --check`, `python3 tools/checks/check_public_safe.py --staged` (after staging).
3. Stage files **by name**; read `git diff --staged`. Never `.env*`, credentials, private notes, the Word resumes.
4. Message: Conventional Commits (`type(scope): subject`), body explains why. **No `Co-Authored-By`, no trailer, no mention of AI tools** (the Bash guard refuses them; a repo rule ranks above the harness default).

## Release (`dev` → `main`)
1. Everything above is green on `dev`, `python3 tools/checks/check_links.py` reports 0 broken (after the build; it opens blocked profile sites in a browser), and a looked-at preview exists (desktop and phone, console clean).
2. Show the owner the release diff and the proposed merge; **wait for the yes.** Merge and push are separate yeses; a push to `main` deploys.
3. After the deploy finishes (GitHub Actions), verify the live site: HTTP 200 on `/`, `/case-studies/`, a case-study page, `sitemap.xml`, `robots.txt`, `resume.pdf`; spot-check a changed fact on the live page; record the result in the finding.
4. Rollback = revert the merge commit on `main` (its own yes), not a force push.

## Hard stops
Never force-push. Never push `main` without its own yes. Never commit a file the safety check flags.
