#!/usr/bin/env python3
"""Public-safety check: this repo is public. Fails when a file that git would publish contains a secret or a private term.

Scans every file git tracks plus every untracked file that is not ignored (the files a careless `git add .` would publish).
Private terms come from the git-ignored docs/private/PRIVATE_TERMS.txt; on a fresh clone without it only secrets are checked.

  python3 tools/checks/check_public_safe.py [--staged]     --staged limits the scan to files staged for commit
"""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "tools" / "agent-guard"))
import common  # noqa: E402

# The guard's own code and tests legitimately contain credential-file patterns.
EXEMPT = ("tools/agent-guard/", "tools/checks/", "package-lock.json")
BINARY = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".pdf", ".docx", ".woff", ".woff2", ".glb", ".gltf", ".bin", ".zip", ".svg")


def files(staged):
    cmd = ["git", "diff", "--cached", "--name-only", "--diff-filter=ACM"] if staged else \
          ["git", "ls-files", "--cached", "--others", "--exclude-standard"]
    out = subprocess.run(cmd, cwd=ROOT, capture_output=True, text=True, check=True).stdout.splitlines()
    return [f for f in out if f and not f.endswith(BINARY) and not f.startswith(EXEMPT) and not common.is_private_area(f)]


def main():
    terms = common.private_terms()
    problems = []
    for rel in files("--staged" in sys.argv):
        p = ROOT / rel
        if not p.is_file():
            continue
        text = p.read_text(encoding="utf-8", errors="ignore")
        secret = common.find_secret(text)
        if secret:
            problems.append(f"{rel}: contains {secret}")
        hit = common.find_private_term(text, terms)
        if hit:
            problems.append(f"{rel}: names private term '{hit}'")
    for p in problems:
        print(p)
    print(f"check_public_safe: {len(problems)} problem(s)" + ("" if terms else " (no private term list found: secrets only)"))
    return 1 if problems else 0


if __name__ == "__main__":
    sys.exit(main())
