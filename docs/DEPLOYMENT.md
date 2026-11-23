# Build, branches and release

The single reference for how the site is built, branched, released and measured. The gates an agent runs before a commit or release are in `.cursor/skills/portfolio-release/SKILL.md`; this file does not repeat them.

- **Live URL:** `https://patelsahil2k03.github.io` (GitHub Pages via GitHub Actions)
- **Framework:** Next.js 14, App Router, static export (`output: 'export'`, `images.unoptimized: true`, `trailingSlash: true` in `next.config.js`)
- **Runtime:** Node 22 locally and in both workflows; install with `npm ci` (exactly the lockfile)

## Local commands

```bash
npm ci              # install exactly what the lockfile says
npm run dev         # http://localhost:3000 (check the port first; agents need a yes)
npm run build       # static export into out/ (git-ignored)
npm run lint
npx tsc --noEmit
```

## Branches

| Branch | Role | Deploys? |
|---|---|---|
| `main` | Production; matches the live site | Yes: `.github/workflows/portfolio.yml` builds and deploys on every push |
| `dev` | Default branch for daily work | No: `.github/workflows/ci.yml` runs build and lint |
| `feature/*`, `fix/*`, `docs/*`, `chore/*` | Short-lived work, branched from `dev`, merged back into `dev` | No (CI only) |
| `hotfix/*` | Urgent production fix, branched from `main`, merged into `main` **and** `dev` | Via `main` |

Names are lowercase with hyphens (`feature/case-study-images`). Never force-push `main` or `dev`. Commits follow Conventional Commits with **no trailers and no mention of AI tools** (`ai_guidelines/UNIVERSAL_GIT_RULES.md`). The remote uses the `github.com-patelsahil` SSH host alias.

## Release (`dev` → `main`)

Every merge and every push to `main` needs the owner's yes, each time; a push to `main` deploys within one to two minutes.

```bash
git checkout main && git pull origin main
git merge dev
git push origin main        # deploys
git checkout dev
```

Before the merge, `python3 tools/checks/check_links.py` must report 0 broken outbound links (local only: it needs a browser for sites that refuse scripted requests). Rollback is a revert commit on `main` (its own yes), never a force push. After a deploy, check: HTTP 200 on `/`, `/case-studies/`, one case-study page, `sitemap.xml`, `robots.txt` and `resume.pdf`, and spot-check one changed fact on the live page.

**Repository settings (recommended):** default branch `dev`; protect `main`.

## Microsoft Clarity (analytics)

Initialised in `src/components/analytics/ClarityAnalytics.tsx` from the root layout, production builds only.

- **Local:** `.env.local` with `NEXT_PUBLIC_CLARITY_PROJECT_ID=<id>` (never committed).
- **CI:** repository secret `NEXT_PUBLIC_CLARITY_PROJECT_ID`, inlined at build time.
- **Custom events** (`src/lib/clarity.ts`): `view-projects`, `contact-cta`, `resume-download`, `case-study-view-{slug}`, and the avatar's shown/opt-out/opt-in events (inactive while the avatar is off). The contact form opens a mail client, so it fires no server-side event.

## Current build

Measured figures (bundle size, Lighthouse) live in finding U-08, not here, so this file does not go stale. Earlier deploy history is summarised in `docs/HISTORY.md`.
