"""Tests for the agent-guard hooks. Run: python3 -m unittest discover -s tools/agent-guard/tests -v"""
import importlib.util
import os
import re
import sys
import tempfile
import unittest
from pathlib import Path

GUARD = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(GUARD))


def load(name):
    spec = importlib.util.spec_from_file_location(name, GUARD / f"{name}.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


gb, gw, gr, bc, common = load("guard_bash"), load("guard_write"), load("guard_read"), load("build_card"), load("common")
TERMS = [re.compile(r"\bacmecorp\b", re.I)]
PROJ = "/repo"


class BashGuard(unittest.TestCase):
    def v(self, cmd):
        return gb.decide(cmd)[0]

    def test_allow_plain_work(self):
        for c in ("git status --short", "npx tsc --noEmit", "npm run lint", "npm run build", "npm ci", "ls -la docs", "git diff --stat"):
            self.assertEqual(self.v(c), "allow", c)

    def test_deny(self):
        for c in ("rm -rf node_modules", "rm -fr out", "git push --force origin dev", "git push -f"):
            self.assertEqual(self.v(c), "deny", c)

    def test_bypass_spellings_are_caught(self):
        # Global git options before the subcommand, a refspec force push, and split or capital rm flags (code review, 2026-11-23).
        for c in ("git -C . push --force", "git -C /tmp/x push -f origin dev", "git push origin +main", "rm -Rf out", "rm -r -f out"):
            self.assertEqual(self.v(c), "deny", c)
        for c in ("git -C . commit -m 'fix: x'", "git --no-pager push origin dev"):
            self.assertEqual(self.v(c), "ask", c)
        self.assertEqual(self.v("git -C . log --oneline"), "allow")

    def test_text_that_only_names_a_command_is_not_the_command(self):
        self.assertEqual(self.v("grep -n 'rm -rf' docs/x.md"), "allow")
        self.assertEqual(self.v('echo "git push --force"'), "allow")

    def test_ask(self):
        for c in ("git push origin dev", "git commit -m 'fix: x'", "git add -A", "git stash", "npm install left-pad", "npm update",
                  "npm run dev", "python3 -m http.server 8765", "gio trash old.md", "git rm a.md", "gh pr create --fill", "rm a.txt"):
            self.assertEqual(self.v(c), "ask", c)

    def test_trailers_and_ai_mentions_in_commit_are_refused(self):
        self.assertEqual(self.v("git commit -m 'fix: x\n\nCo-Authored-By: Someone <a@b.c>'"), "deny")
        self.assertEqual(self.v("git commit -m 'docs: written with Claude Code'"), "deny")
        self.assertEqual(self.v("gh pr create --body 'Generated with [Claude Code](x)'"), "deny")

    def test_credential_files_are_not_read(self):
        for c in ("cat ~/Sahil/x/me_accessKeys.csv", "head -2 a_credentials.csv", "grep key delicut_creds.txt", "cat server.pem"):
            self.assertEqual(self.v(c), "deny", c)
        self.assertEqual(self.v("ls ~/Sahil/x"), "allow")


class WriteGuard(unittest.TestCase):
    def v(self, path, content="", exists=True, scratch=None):
        return gw.decide(path, content, PROJ, scratch, exists, terms=TERMS)[0]

    def test_normal_edit_allowed(self):
        self.assertEqual(self.v("/repo/src/data/skills.ts", "x"), "allow")
        self.assertEqual(self.v("/repo/docs/findings/F-01.md", "x", exists=False), "allow")

    def test_secret_denied(self):
        self.assertEqual(self.v("/repo/docs/a.md", "key AKIAABCDEFGHIJKLMNOP"), "deny")
        self.assertEqual(self.v("/repo/docs/a.md", "sk-" + "a" * 30), "deny")
        self.assertEqual(self.v("/repo/docs/a.md", "postgres://u:<password>@h/db"), "allow")

    def test_private_term_in_public_area(self):
        self.assertEqual(self.v("/repo/src/data/x.ts", "built for AcmeCorp"), "deny")
        self.assertEqual(self.v("/repo/docs/x.md", "built for AcmeCorp"), "ask")
        self.assertEqual(self.v("/repo/docs/private/x.md", "built for AcmeCorp"), "allow")

    def test_outside_repo_and_scratch(self):
        self.assertEqual(self.v("/home/u/x.py", "x"), "deny")
        self.assertEqual(self.v("/tmp/claude-1000/p/s/scratchpad/a.py", "x"), "allow")
        self.assertEqual(self.v("/s/scratch/a.py", "x", scratch="/s/scratch"), "allow")

    def test_junk_root_and_guard_files(self):
        self.assertEqual(self.v("/repo/docs/notes.bak", "x"), "deny")
        self.assertEqual(self.v("/repo/NEWFILE.md", "x", exists=False), "ask")
        self.assertEqual(self.v("/repo/README.md", "x", exists=True), "allow")
        self.assertEqual(self.v("/repo/.claude/settings.json", "{}"), "ask")
        self.assertEqual(self.v("/repo/tools/agent-guard/guard_bash.py", "x"), "ask")


class ReadGuard(unittest.TestCase):
    def test_credentials(self):
        self.assertEqual(gr.decide("/h/me_accessKeys (1).csv")[0], "deny")
        self.assertEqual(gr.decide("/h/a/server.pem")[0], "deny")
        self.assertEqual(gr.decide("/h/p/.env.local")[0], "deny")
        self.assertEqual(gr.decide("/h/p/src/data/skills.ts")[0], "allow")


class Card(unittest.TestCase):
    def test_blocks_extracted(self):
        text = "x\n<!-- card:start A -->\nrule one\n<!-- card:end -->\ny\n<!-- card:start B -->\nrule two\n<!-- card:end -->\n"
        out = bc.build(text)
        self.assertIn("## A\n\nrule one", out)
        self.assertIn("## B\n\nrule two", out)

    def test_unbalanced_raises(self):
        with self.assertRaises(ValueError):
            bc.build("<!-- card:start A -->\nno end")

    def test_card_is_current(self):
        self.assertEqual(bc.main(["--check"]), 0)


class Terms(unittest.TestCase):
    def test_missing_file_means_no_terms(self):
        self.assertEqual(common.private_terms(Path(tempfile.gettempdir()) / "definitely-missing-terms.txt"), [])


if __name__ == "__main__":
    unittest.main()


class PendingIndex(unittest.TestCase):
    def test_index_is_current(self):
        spec = importlib.util.spec_from_file_location("bpi", GUARD.parent / "checks" / "build_pending_index.py")
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
        self.assertEqual(mod.main(["--check"]), 0)
