# Branch strategy

**Repository:** patelsahil2k03.github.io  
**Strategy:** Simplified GitFlow (solo / small team)  
**Last updated:** 2026-05-29

Inspired by the mixa-product-extractor `BRANCH_STRATEGY.md` — trimmed to **dev + main** only (no `staging` for now).

---

## Branch structure

```
main                          # Production — GitHub Pages LIVE
└── dev                       # Integration — default branch for daily work
    ├── feature/<name>        # New features (case studies, sections, UI)
    ├── fix/<name>            # Bug fixes
    ├── docs/<name>           # Documentation only
    └── chore/<name>          # Tooling, deps, CI, gitignore
```

---

## Branch roles

### `main` (production)

| | |
|---|---|
| **Purpose** | Stable code that matches https://patelsahil2k03.github.io |
| **Deploy** | Auto-deploy via `.github/workflows/portfolio.yml` on every push |
| **Direct commits** | Avoid — merge from `dev` when ready to release |

### `dev` (development)

| | |
|---|---|
| **Purpose** | Integrate finished work before production |
| **Default branch** | Yes — clone and branch from here |
| **Deploy** | No — CI only (build + lint in `.github/workflows/ci.yml`) |
| **Direct commits** | OK for small solo changes; prefer `feature/*` for larger work |

### `feature/*`, `fix/*`, `docs/*`, `chore/*`

| | |
|---|---|
| **Created from** | `dev` |
| **Merged into** | `dev` (PR or local merge) |
| **Naming** | Lowercase, hyphens — e.g. `feature/case-study-images`, `fix/nav-publications` |

### `hotfix/*` (optional)

| | |
|---|---|
| **Created from** | `main` |
| **Merged into** | `main` **and** `dev` (keep branches in sync) |
| **Use when** | Production is broken and cannot wait for `dev` → `main` |

---

## Workflows

### Daily feature work

```bash
git checkout dev
git pull origin dev

git checkout -b feature/my-change

# edit, commit (Conventional Commits — see UNIVERSAL_GIT_RULES.md)
git add <files>
git commit -m "feat(case-studies): add hero images"

git push -u origin feature/my-change
# Open PR: feature/my-change → dev (GitHub UI)
# After merge, delete remote feature branch
```

### Release to production (dev → main)

```bash
git checkout dev
git pull origin dev
npm run build   # local sanity check

git checkout main
git pull origin main
git merge dev
git push origin main
# GitHub Actions deploys to GitHub Pages (~1–2 min)
```

Or open a **Pull Request: `dev` → `main`** for a final review before deploy.

### Hotfix (production urgent)

```bash
git checkout main
git pull origin main
git checkout -b hotfix/broken-link

# fix, commit, push
git checkout main
git merge hotfix/broken-link
git push origin main

git checkout dev
git merge hotfix/broken-link
git push origin dev
```

---

## CI vs deploy

| Event | Workflow | Result |
|-------|----------|--------|
| Push to `main` | `portfolio.yml` | Build + **deploy** to GitHub Pages |
| Push to `dev`, `feature/*`, etc. | `ci.yml` | Build + lint only |
| PR to `dev` or `main` | `ci.yml` | Build + lint on PR |

---

## Branch naming

**Good:** `feature/case-study-screenshots`, `fix/achievement-labels`, `docs/branch-strategy`, `chore/deps-next`  

**Avoid:** `my-branch`, `Feature/X`, spaces, vague names like `fix/bug`

---

## Best practices

**Do**

- Start new work from `dev`, not `main`
- Keep feature branches short-lived
- Run `npm run build` before merging to `main`
- Delete merged feature branches

**Don't**

- Develop long-term on `main` while `dev` drifts
- Force-push `main` or `dev`
- Commit `.env.local` or `.cursor/`

---

## GitHub settings (recommended)

1. **Default branch:** `dev` (Settings → General → Default branch)
2. **Protect `main`:** require PR or self-review before merge (optional for solo)
3. **Protect `dev`:** optional — require CI pass on PRs

---

## Commit messages

Follow **Conventional Commits** (same as `UNIVERSAL_GIT_RULES.md` in the monorepo):

```
feat(portfolio): add case studies listing page
fix(nav): highlight case studies route on subpages
docs: add branch strategy
chore(ci): run build on dev pushes
```

No `Co-authored-by` trailers unless your org requires them.

---

## Current status

| Branch | Remote | Notes |
|--------|--------|-------|
| `main` | Yes | Production / GitHub Pages |
| `dev` | Yes | Default for new work |
| `staging` | Not used | Add later if you need a QA URL |

---

**Live site:** https://patelsahil2k03.github.io  
**Docs:** `docs/DEPLOYMENT.md`, `docs/PORTFOLIO_SCOPE_CHECKLIST.md`
