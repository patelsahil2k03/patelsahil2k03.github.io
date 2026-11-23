# docs/

Where each kind of fact lives. One home per fact; a file's own header says what it is, so this list does not describe files twice. Rules for working here: `../nextprompt.md`.

| Question | File |
|---|---|
| What is open, and what can start now? | `PENDING_TASKS.md` (index) → `findings/<ID>.md` (one per finding) |
| What do we need from the owner? | `OWNER_INPUTS.md` |
| Is this figure or claim true? | `CLAIMS_LEDGER.md` |
| What was decided? | `DECISIONS.md` |
| What happened before? | `HISTORY.md` |
| Who is the owner (profile originals)? | `PROFILE_SOURCES.md` → `private/profile/` (git-ignored) |
| How do we build, branch and release? | `DEPLOYMENT.md` |
| How a case study is shaped, routed and planned? | `CASE_STUDIES.md` (the studies are in `src/data/caseStudies.ts`) |
| What does the design aim for, and why? | `design/DESIGN_DIRECTION.md`; research in `design/` |
| How does an agent start a session? | `SESSION_START_PROMPTS.md`; the card `AGENT_CARD.md` is generated from `../nextprompt.md` |
| Which agent skills are available? | `SKILLS_DIRECTORY.md` |

`private/` is git-ignored: evidence that names clients, credential findings and the profile originals. This repository is public, so nothing tracked may name a client, an internal project or a credential file.
