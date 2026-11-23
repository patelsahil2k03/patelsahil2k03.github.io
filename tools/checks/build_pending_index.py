#!/usr/bin/env python3
"""Regenerates the Index table of docs/PENDING_TASKS.md from the finding documents' own header rows.

Each finding (docs/findings/<ID>-<slug>.md) starts with a title line and a one-row table:
| Priority | Status | Area | Owner | Opened | Updated |. The index is written between the markers
<!-- index:start --> and <!-- index:end -->, sorted by priority then id. Private findings (docs/private/findings/) are listed by id
and title only, without a link, because the folder is git-ignored.

  python3 tools/checks/build_pending_index.py           rewrite the index
  python3 tools/checks/build_pending_index.py --check   exit 1 if the index is out of date
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PENDING = ROOT / "docs" / "PENDING_TASKS.md"
PUBLIC = ROOT / "docs" / "findings"
PRIVATE = ROOT / "docs" / "private" / "findings"
START, END = "<!-- index:start -->", "<!-- index:end -->"
ORDER = {"P0": 0, "P1": 1, "P2": 2, "P3": 3}


def parse(path):
    lines = path.read_text(encoding="utf-8").splitlines()
    m = re.match(r"#\s+(\S+)\s+(?:\(PRIVATE\)\s+)?[—-]\s+(.*)", lines[0])
    if not m:
        raise ValueError(f"{path.name}: first line must be '# <ID> — <title>'")
    row = next((l for l in lines if re.match(r"\|\s*P[0-3]\s*\|", l)), None)
    if row is None:
        raise ValueError(f"{path.name}: missing the Priority/Status header row")
    cells = [c.strip() for c in row.strip().strip("|").split("|")]
    return {"id": m.group(1), "title": m.group(2).strip(), "prio": cells[0], "status": cells[1], "owner": cells[3], "updated": cells[5]}


def build():
    rows = []
    for folder, private in ((PUBLIC, False), (PRIVATE, True)):
        if not folder.is_dir():
            continue
        for p in sorted(folder.glob("*.md")):
            f = parse(p)
            link = f"`{f['id']}` *(private)*" if private else f"[{f['id']}](findings/{p.name})"
            rows.append((ORDER.get(f["prio"], 9), f["id"], f"| {link} | {f['title']} | {f['prio']} | {f['status']} | {f['owner']} | {f['updated']} |"))
    rows.sort()
    head = "| ID | Finding | P | Status | Owner | Updated |\n|----|---------|---|--------|-------|---------|"
    return head + "\n" + "\n".join(r[2] for r in rows)


def render(text, table):
    if START not in text or END not in text:
        raise ValueError("docs/PENDING_TASKS.md has no index markers")
    a, rest = text.split(START, 1)
    _, b = rest.split(END, 1)
    return f"{a}{START}\n{table}\n{END}{b}"


def main(argv=None):
    argv = sys.argv[1:] if argv is None else argv
    text = PENDING.read_text(encoding="utf-8")
    want = render(text, build())
    if "--check" in argv:
        if not PRIVATE.is_dir():
            # A clone without the git-ignored private findings (CI, a fresh checkout) cannot rebuild their rows,
            # so compare the public rows only.
            strip = lambda t: "\n".join(l for l in t.splitlines() if "*(private)*" not in l)
            want, text = strip(want), strip(text)
        if want != text:
            print("docs/PENDING_TASKS.md index is out of date: run python3 tools/checks/build_pending_index.py", file=sys.stderr)
            return 1
        print("docs/PENDING_TASKS.md index is up to date")
        return 0
    PENDING.write_text(want, encoding="utf-8")
    print("wrote the index of docs/PENDING_TASKS.md")
    return 0


if __name__ == "__main__":
    sys.exit(main())
