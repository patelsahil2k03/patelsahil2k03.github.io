"""Shared helpers for the agent-guard hooks and the repo checks."""
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PRIVATE_TERMS_FILE = ROOT / "docs" / "private" / "PRIVATE_TERMS.txt"

SECRET_PATTERNS = [
    (r"mongodb(?:\+srv)?://[^\s:/@'\"<>]+:([^\s@'\"<>]{6,})@", "a MongoDB connection string with a password"),
    (r"postgres(?:ql)?://[^\s:/@'\"<>]+:([^\s@'\"<>]{6,})@", "a Postgres connection string with a password"),
    (r"AKIA[0-9A-Z]{16}", "an AWS access key id"),
    (r"-----BEGIN (?:RSA |EC |OPENSSH |DSA )?PRIVATE KEY-----", "a private key"),
    (r"\bsk-[A-Za-z0-9_-]{24,}", "an API key (sk-...)"),
    (r"\bgh[pousr]_[A-Za-z0-9]{30,}", "a GitHub token"),
    (r"\bxox[abprs]-[A-Za-z0-9-]{10,}", "a Slack token"),
]
PLACEHOLDER_PASSWORDS = {"password", "pass", "passwd", "secret", "xxxxxx", "******", "redacted", "changeme", "your_password", "yourpassword"}


def _is_placeholder(value):
    p = value.strip("*<>$%{}").lower()
    return (not p) or p in PLACEHOLDER_PASSWORDS or value.startswith(("$", "<", "{", "%")) or set(value) <= {"*", "x", "X", "."}


def find_secret(text):
    """Name of the first real-looking secret in text, or None."""
    for pattern, what in SECRET_PATTERNS:
        for m in re.finditer(pattern, text):
            secret = m.group(1) if m.groups() else m.group(0)
            if not _is_placeholder(secret):
                return what
    return None


def private_terms(path=None):
    """Compiled regexes from the git-ignored term list; empty when the file is absent (fresh clone)."""
    path = Path(path) if path else PRIVATE_TERMS_FILE
    if not path.is_file():
        return []
    out = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            out.append(re.compile(line, re.I))
    return out


def find_private_term(text, terms):
    for rx in terms:
        m = rx.search(text)
        if m:
            return m.group(0)
    return None


def is_private_area(rel):
    """Paths that are allowed to name private things: git-ignored working areas and harness memory."""
    rel = rel.replace(os.sep, "/")
    return rel.startswith(("docs/private/", "private/", "trash/", ".superpowers/")) or "/memory/" in rel
