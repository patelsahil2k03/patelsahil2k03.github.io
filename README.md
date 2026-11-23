# Sahil Patel: portfolio

Source of [patelsahil2k03.github.io](https://patelsahil2k03.github.io), the portfolio of an AI/ML and full-stack engineer: production systems, case studies and research. A Next.js 14 static export on GitHub Pages.

This README says how to run the project and where things live. It does not restate content: the site's facts are in `src/data/*.ts`, and each figure's source and status is in [`docs/CLAIMS_LEDGER.md`](docs/CLAIMS_LEDGER.md).

## Run it

Node 22.

```bash
npm ci          # install exactly the lockfile
npm run dev     # http://localhost:3000
npm run build   # static export into out/
npm run lint && npx tsc --noEmit
python3 tools/checks/check_claims.py      # figures are in the ledger; removed claims stay removed
python3 tools/checks/check_public_safe.py # no secrets or private names in publishable files
```

Branches, release and analytics: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md). Daily work is on `dev`; a push to `main` deploys.

## Where things live

| Path | Holds |
|---|---|
| `src/data/` | All site content (one file per section) |
| `src/components/`, `src/app/`, `src/lib/` | UI, routes and metadata, helpers |
| `public/` | Images, icons, `resume.pdf` (built from `resume/main.tex`) |
| `PRODUCT.md`, `DESIGN.md` | Product truth and the design system (read by the Impeccable design skill) |
| `nextprompt.md`, `AGENTS.md`, `CLAUDE.md` | Working brief, job router and rule summary for anyone (person or agent) changing the site |
| `docs/PENDING_TASKS.md` | The only task list; one document per finding in `docs/findings/` |
| `docs/OWNER_INPUTS.md` | Facts, files and decisions only the owner can supply |
| `docs/HISTORY.md` | Summarised history (detail is in git) |
| `docs/design/` | Design direction and research |
| `tools/` | Agent guard hooks and content checks, with tests |

This repository is public: clients and internal systems are described by industry, never named.

## Contact

[patelsahil2k03@gmail.com](mailto:patelsahil2k03@gmail.com) · [LinkedIn](https://www.linkedin.com/in/sahil-patel-581226205) · [GitHub](https://github.com/patelsahil2k03) · [Google Scholar](https://scholar.google.com/citations?hl=en&user=2aSb_AwAAAAJ)
