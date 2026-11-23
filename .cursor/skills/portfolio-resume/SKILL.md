---
name: portfolio-resume
description: Edit the LaTeX resume, the Word resume or the GitHub profile README so they agree with the site and the claims ledger.
---

# portfolio-resume

Read `nextprompt.md` §5, §6 first. The resume is a derived surface: the facts come from `docs/CLAIMS_LEDGER.md` and `src/data/`.

- **LaTeX** (`resume/main.tex` → `public/resume.pdf`): there is no LaTeX on the dev machine. Edit the source, run `python3 tools/checks/check_claims.py`, and record in the finding that the PDF needs a rebuild elsewhere (and by whom). Never claim the PDF is current until it is rebuilt and checked.
- **Word** (`resume/*.docx`, git-ignored): built from the employer template; keep the template untouched and write to a new file. Use the `docx` skill; validate the OOXML and render to PDF to look at every page. The file carries personal data and the employer format, so it is never committed.
- **GitHub profile README** lives in a separate clone; edit locally, show the diff, push only with its own yes, using the host alias that maps to the personal key (`git remote -v`; the default `github.com` host maps to a different account).
- Roles follow the evidence ladder; clients are industry descriptors; credentials are described as exactly what they are (a course is a course).
- After any change, list in the finding which of the surfaces in `nextprompt.md` §5 still disagree.
