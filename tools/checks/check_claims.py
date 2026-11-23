#!/usr/bin/env python3
"""Content checks for the portfolio.

  1. Banned claims: no regex from tools/checks/banned_claims.txt may appear in src/, resume/main.tex, README.md or public text files.
  2. Ledger coverage: every figure in src/data/*.ts (e.g. 500K+, 93.17%, 2M+) must appear, in backticks, in docs/CLAIMS_LEDGER.md.

  python3 tools/checks/check_claims.py            exit 1 on any finding
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
BANNED = ROOT / "tools" / "checks" / "banned_claims.txt"
LEDGER = ROOT / "docs" / "CLAIMS_LEDGER.md"
SCAN = [*sorted((ROOT / "src").rglob("*.ts*")), ROOT / "resume" / "main.tex", ROOT / "README.md"]
SKIP_PARTS = ()
FIGURE = re.compile(r"(?<![\w.])\d{1,3}(?:,\d{3})+\+?|(?<![\w.])\d+(?:\.\d+)?[KM]\+|(?<![\w.])\d+(?:\.\d+)?%\+?|(?<![\w.])\d+\+(?![\w])")


def banned_patterns(path=BANNED):
    out = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.split("#", 1)[0].strip()
        if line:
            out.append(re.compile(line, re.I))
    return out


def check_banned(files, patterns):
    hits = []
    for f in files:
        if not f.is_file() or any(p in f.as_posix() for p in SKIP_PARTS):
            continue
        for n, line in enumerate(f.read_text(encoding="utf-8", errors="ignore").splitlines(), 1):
            for rx in patterns:
                if rx.search(line):
                    hits.append(f"{f.relative_to(ROOT)}:{n}: banned claim /{rx.pattern}/")
    return hits


def ledger_tokens(text):
    return set(re.findall(r"`([^`]+)`", text))


def figures_in(files):
    found = {}
    for f in files:
        if f.suffix != ".ts" or "src/data/" not in f.as_posix():
            continue
        for n, line in enumerate(f.read_text(encoding="utf-8").splitlines(), 1):
            for m in FIGURE.finditer(line):
                found.setdefault(m.group(0).rstrip("."), []).append(f"{f.relative_to(ROOT)}:{n}")
    return found


def main():
    problems = check_banned(SCAN, banned_patterns())
    if not LEDGER.is_file():
        problems.append("docs/CLAIMS_LEDGER.md is missing")
    else:
        known = ledger_tokens(LEDGER.read_text(encoding="utf-8"))
        for fig, where in sorted(figures_in(SCAN).items()):
            if fig not in known:
                problems.append(f"figure `{fig}` is not in docs/CLAIMS_LEDGER.md (first seen {where[0]})")
    for p in problems:
        print(p)
    print(f"check_claims: {len(problems)} problem(s)")
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
