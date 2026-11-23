"""Capture a page at desktop and phone widths with layout metrics.

  python3 tools/ui/capture.py <url> <out_dir> <tag>

Writes <tag>-<viewport>-fold.png, <tag>-<viewport>-full.png and <tag>-metrics.json. Used for the before/after record of UI findings
(save into docs/private/ui-audit/, which is git-ignored). Read-only against the page.
"""
import json
import sys
from playwright.sync_api import sync_playwright

METRICS_JS = """() => {
  const de = document.documentElement, t = document.body.innerText;
  const secs = [...document.querySelectorAll('main > section')].map(s => [s.id, Math.round(s.getBoundingClientRect().height)]);
  return {pageHeight: de.scrollHeight, overflowX: de.scrollWidth > de.clientWidth, sections: secs,
    hero: (document.getElementById('home') || {getBoundingClientRect: () => ({height: 0})}).getBoundingClientRect().height,
    headings: {h1: document.querySelectorAll('h1').length, h2: document.querySelectorAll('h2').length, h3: document.querySelectorAll('h3').length},
    emoji: (t.match(/[\\u{1F300}-\\u{1FAFF}\\u{2600}-\\u{27BF}]/gu) || []).length,
    emDash: (t.match(/\\u2014/g) || []).length, enDash: (t.match(/\\u2013/g) || []).length,
    unnamedControls: [...document.querySelectorAll('button,a')].filter(e => !(e.innerText || '').trim() && !e.getAttribute('aria-label') && !e.getAttribute('title')).length,
    canvas: document.querySelectorAll('canvas').length,
    words: t.split(/\\s+/).filter(Boolean).length};
}"""


def main(url, out, tag):
    res = {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        for name, vp in (("desktop", {"width": 1440, "height": 900}), ("phone", {"width": 375, "height": 812})):
            ctx = b.new_context(viewport=vp)
            page = ctx.new_page()
            issues, js = [], []
            page.on("console", lambda m, a=issues: a.append(f"{m.type}: {m.text[:140]}") if m.type == "error" else None)
            page.on("pageerror", lambda e, a=issues: a.append("pageerror: " + str(e)[:140]))
            page.on("response", lambda r, a=js: a.append(r.url) if r.url.endswith(".js") else None)
            page.goto(url, wait_until="networkidle")
            page.wait_for_timeout(2500)
            m = page.evaluate(METRICS_JS)
            m["jsRequests"], m["consoleErrors"] = len(js), issues[:5]
            res[name] = m
            page.screenshot(path=f"{out}/{tag}-{name}-fold.png")
            page.screenshot(path=f"{out}/{tag}-{name}-full.png", full_page=True)
            ctx.close()
        b.close()
    open(f"{out}/{tag}-metrics.json", "w").write(json.dumps(res, indent=1))
    for k, v in res.items():
        print(k, {x: v[x] for x in ("pageHeight", "hero", "words", "emoji", "emDash", "canvas", "jsRequests", "unnamedControls", "overflowX")})


if __name__ == "__main__":
    main(*sys.argv[1:4])
