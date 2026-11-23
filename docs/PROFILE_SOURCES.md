# Profile sources

The original material about Sahil that the portfolio is written from. The captures themselves are in `docs/private/profile/` (git-ignored: they include client names, other people's names and comments). This file says what each source is, how it was captured, how fresh it is, and which surfaces it feeds. Figures still go through `CLAIMS_LEDGER.md` before they are published.

**Home:** this repository's `docs/private/profile/` is the portfolio's copy, taken on 2026-11-23 from the owner's private job-search repository (captured 2026-11-19). That repository keeps its own copy for applications. When either is recaptured, copy the newer capture here and record the date below; never edit a capture by hand.

| # | Source | Captured | Method | Folder | What it settles |
|---|---|---|---|---|---|
| 1 | Resume: LaTeX source, the published PDF, the employer-format Word resume | 2026-11-19 | File copy | `01-resume/` | Published wording (the PDF is stale, F-04) |
| 2 | LinkedIn: profile, experience details, the earlier post export | 2026-11-19 (posts export about October 2025) | Logged-in Cursor IDE browser, reading the owner view; a logged-out fetch gets HTTP 999 | `02-linkedin/` | Titles, dates and employers; headline; hackathon and award posts |
| 3 | Google Scholar profile | 2026-11-19 | Firecrawl live scrape | `03-google-scholar/` | Author order, venues, citations (2 citations, h-index 1 at capture) |
| 4 | Portfolio website (all `src/data` and the live homepage text) | 2026-11-19 | Repository dump plus Firecrawl | `04-portfolio-website/` | What the live site said before the 2026-11 changes |
| 5 | GitHub profile README | 2026-11-19 | `gh` and raw file | `05-github/` | Public profile wording (still carries stale claims, F-03) |
| 6 | Career timeline and narrative page | 2026-10-27 copy of a 2026-06 audit | File copy | `06-career-growth/` | When each project started; narrative tone is not publishable copy |
| 7 | LinkedIn voice notes (template and a draft from real posts) | 2026-11 | File copy | `07-linkedin-voice/` | Tone for any copy written in Sahil's voice; the draft is not approved |

## How to refresh

1. **LinkedIn:** only through a logged-in browser session that Sahil opens (the Cursor IDE browser). Never through a script that sends credentials, and never print them. Read the owner view of the profile and `/details/experience/`; save as Markdown with the capture date.
2. **Scholar and the live site:** Firecrawl scrape of the public URL, saved as Markdown with the capture date.
3. **GitHub:** `gh api users/patelsahil2k03` and the profile repository's README.
4. After a refresh, diff against the previous capture. Every changed fact becomes a ledger row update and, if it affects the site, a finding.

## Facts the 2026-11-19 capture changed

Applied on 2026-11-23 (findings F-30 and F-31): SDE II client engagement since November 2025 alongside the Digiflux role; Motorola Solutions web development intern, May-Dec 2022; L&T Technology Services C# developer intern; L&T Power for the 2022 machine-learning internship; Odoo Hackathon 2026 finalist and Kanad S.H.I.E.L.D. 2026 hackathon.
