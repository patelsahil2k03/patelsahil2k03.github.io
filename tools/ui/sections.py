"""Screenshot each homepage section (first 1100 px of it) at one viewport width, for section-by-section review.

  python3 tools/ui/sections.py <url> <out_dir> <tag> [width]
"""
import sys
from playwright.sync_api import sync_playwright

url, out, tag = sys.argv[1:4]
width = int(sys.argv[4]) if len(sys.argv) > 4 else 1440
with sync_playwright() as p:
    b = p.chromium.launch()
    page = b.new_page(viewport={"width": width, "height": 1000})
    page.goto(url, wait_until="networkidle")
    page.emulate_media(reduced_motion="reduce")
    for sid in page.eval_on_selector_all("main > section", "els => els.map(e => e.id)"):
        box = page.eval_on_selector(f"#{sid}", "e => { const r = e.getBoundingClientRect(); return {y: r.top + scrollY, h: r.height}; }")
        page.screenshot(path=f"{out}/{tag}-{width}-{sid}.png", full_page=True,
                        clip={"x": 0, "y": box["y"], "width": width, "height": min(box["h"], 1100)})
        print(sid, round(box["h"]))
    b.close()
