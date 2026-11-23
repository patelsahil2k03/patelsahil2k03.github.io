# H-04 — Pages deploys from the branch and from Actions; the actions run on a deprecated Node

| Priority | Status | Area | Owner | Opened | Updated |
|---|---|---|---|---|---|
| P2 | Open: needs the owner's yes (repository setting and workflow versions) | ci | Sahil (setting); agent (workflows) | 2026-11-24 | 2026-11-24 |

## Finding

GitHub Pages is set to build from the `main` branch (`build_type: legacy`), so every push to `main` runs two deploys: GitHub's
branch build ("pages build and deployment") and the project's Next.js workflow. The Next.js deploy has always finished last and
won (release 2026-11-24: branch build 20:22:45, Next.js deploy 20:23:20), but a slow Actions run could leave the raw branch
build live. Separately, GitHub warns that `actions/checkout@v4`, `actions/setup-node@v4` and `actions/setup-python@v5` target the
deprecated Node 20 runtime.

## Evidence

`gh api repos/<owner>/<repo>/pages` returns `build_type: legacy, source: main /`; both workflows ran on every `main` push since
2026-08-22. CI log of run 45258237547 carries the Node 20 deprecation notice.

## Next action

Owner: switch Settings → Pages → Source to "GitHub Actions" (or approve `gh api -X PUT .../pages -f build_type=workflow`). Agent:
bump the three actions to their Node 24 majors and confirm CI and a deploy pass.

## Done when

Only the Next.js workflow deploys `main`, and CI runs without the deprecation notice.
