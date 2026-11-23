#!/usr/bin/env python3
"""Outbound-link check for the release gate: every external link on the built site must load.

Reads every href in out/**/*.html (run `npm run build` first). Each external URL is fetched once with a plain request; a URL
that answers 4xx/5xx (many profile sites refuse scripted requests: LinkedIn, LeetCode, Medium, publishers) is opened again in
a real browser (Playwright Chromium) and counts as working only if that page loads with status < 400. A doi.org link the
publisher's bot challenge blocks even there is accepted when the DOI is registered at Crossref (the DOI system's record of where
it resolves). Not run in CI, which has no browser for those sites; run it locally before a release (docs/DEPLOYMENT.md).

  python3 tools/checks/check_links.py
"""
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / "out"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
SKIP = ("mailto:", "tel:", "https://patelsahil2k03.github.io")


def external_links():
    links = set()
    for page in OUT.rglob("*.html"):
        for href in re.findall(r'href="(https?://[^"]+)"', page.read_text(encoding="utf-8", errors="ignore")):
            if not href.startswith(SKIP):
                links.add(href.replace("&amp;", "&"))
    return sorted(links)


def plain_status(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status
    except urllib.error.HTTPError as e:
        return e.code
    except Exception:
        return 0


def main():
    if not OUT.is_dir():
        print("out/ is missing: run npm run build first", file=sys.stderr)
        return 2
    links = external_links()
    retry = [u for u in links if not 200 <= plain_status(u) < 400]
    broken = []
    if retry:
        from playwright.sync_api import sync_playwright

        with sync_playwright() as p:
            browser = p.chromium.launch()
            page = browser.new_page(user_agent=UA)
            for url in retry:
                try:
                    resp = page.goto(url, wait_until="domcontentloaded", timeout=45000)
                    ok = resp is not None and resp.status < 400
                except Exception:
                    ok = False
                if not ok and url.startswith("https://doi.org/"):
                    ok = plain_status("https://api.crossref.org/works/" + url[len("https://doi.org/"):]) == 200
                if not ok:
                    broken.append(url)
            browser.close()
    for url in broken:
        print(f"BROKEN: {url}")
    print(f"check_links: {len(links)} external links, {len(retry)} needed a browser, {len(broken)} broken")
    return 1 if broken else 0


if __name__ == "__main__":
    sys.exit(main())
