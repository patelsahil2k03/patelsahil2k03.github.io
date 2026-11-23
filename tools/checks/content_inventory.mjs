#!/usr/bin/env node
// Content-preservation check: nothing the site renders today may silently stop rendering.
//
// Loads every string in src/data/*.ts (transpiled with the project's TypeScript), then looks for each one in the text and links
// of the built site (out/**/*.html). The baseline records which strings rendered when it was taken; afterwards, every
// baselined string must still render somewhere on the site, or be listed in content_retired.json with a reason.
//
//   npm run build && node tools/checks/content_inventory.mjs --baseline   record what renders now
//   npm run build && node tools/checks/content_inventory.mjs              fail if a baselined string no longer renders
//
// Matching ignores case, whitespace and HTML entities. Strings shorter than 3 characters, ids and file paths are skipped.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import vm from 'node:vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const DATA = path.join(ROOT, 'src/data');
const OUT = path.join(ROOT, 'out');
const BASELINE = path.join(ROOT, 'tools/checks/content_baseline.json');
const RETIRED = path.join(ROOT, 'tools/checks/content_retired.json');
const SKIP_DATA = new Set(['avatarNarration.ts']); // the avatar is off by decision D-11; its lines are not page content
const ts = createRequire(import.meta.url)(path.join(ROOT, 'node_modules/typescript'));

function loadData() {
  const cache = {};
  const load = (file) => {
    if (cache[file]) return cache[file].exports;
    const src = fs.readFileSync(path.join(DATA, file), 'utf8');
    const js = ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const mod = { exports: {} };
    cache[file] = mod;
    const req = (spec) => load(spec.replace(/^\.\//, '') + '.ts');
    vm.runInNewContext(js, { module: mod, exports: mod.exports, require: req, console });
    return mod.exports;
  };
  const strings = new Map();
  const walk = (v, where) => {
    if (typeof v === 'string') {
      if (v.length >= 3 && !/^[a-z0-9-]+$/.test(v) && !/^\/[\w/.-]+$/.test(v) && !v.includes('\n    ')) strings.set(v, where);
    } else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${where}[${i}]`));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (k !== 'id' && k !== 'architectureDiagram') walk(x, `${where}.${k}`);
  };
  for (const f of fs.readdirSync(DATA).filter((f) => f.endsWith('.ts') && !SKIP_DATA.has(f))) {
    for (const [name, val] of Object.entries(load(f))) if (typeof val !== 'function') walk(val, `${f}:${name}`);
  }
  return strings;
}

const norm = (s) => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;|&rsquo;|’/g, "'").replace(/&quot;|&ldquo;|&rdquo;|“|”/g, '"')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim().toLowerCase();

/** Remove footnote numbers (span.ev-marker) and role="note" spans (nested spans counted) from a page's HTML. */
function withoutNotes(html) {
  let h = html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ');
  // A footnote is one button holding the figure and its number: keep the figure, drop the number (span.ev-marker).
  h = h.replace(/<span[^>]*class="[^"]*\bev-marker\b[^"]*"[^>]*>[^<]*<\/span>/g, '');
  for (let i = h.search(/<span[^>]*role="note"/); i >= 0; i = h.search(/<span[^>]*role="note"/)) {
    const re = /<\/?span\b[^>]*>/g;
    re.lastIndex = i;
    let depth = 0, end = h.length, m;
    while ((m = re.exec(h))) {
      depth += m[0][1] === '/' ? -1 : 1;
      if (depth === 0) { end = re.lastIndex; break; }
    }
    h = h.slice(0, i) + h.slice(end);
  }
  return h;
}

function siteText() {
  const parts = [];
  const visit = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { if (e.name !== '_next') visit(p); }
      else if (e.name.endsWith('.html')) {
        const html = fs.readFileSync(p, 'utf8');
        const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).join(' ');
        // Running text also keeps an unbroken copy without footnote markers and inline notes, so a sentence with a cited
        // figure still matches its data string (notes are checked through src/data/claims.ts on their own).
        parts.push(withoutNotes(html).replace(/<[^>]+>/g, ''));
        parts.push(html.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' '), hrefs);
      }
    }
  };
  if (!fs.existsSync(OUT)) { console.error('out/ is missing: run npm run build first'); process.exit(2); }
  visit(OUT);
  return norm(parts.join(' '));
}

const strings = loadData();
const text = siteText();
const rendered = [...strings.keys()].filter((s) => text.includes(norm(s))).sort();

if (process.argv.includes('--baseline')) {
  fs.writeFileSync(BASELINE, JSON.stringify({ taken: new Date().toISOString().slice(0, 10), note: 'Strings from src/data that rendered on the built site when this baseline was taken.', rendered }, null, 1) + '\n');
  console.log(`baseline: ${rendered.length} of ${strings.size} data strings render; ${strings.size - rendered.length} never rendered (listed with --report)`);
  process.exit(0);
}
if (process.argv.includes('--report')) {
  for (const [s, where] of strings) if (!rendered.includes(s)) console.log(`not rendered: ${where}: ${s.slice(0, 90)}`);
  process.exit(0);
}
const base = JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
const retired = fs.existsSync(RETIRED) ? JSON.parse(fs.readFileSync(RETIRED, 'utf8')) : {};
const current = new Set(strings.keys());
const lost = base.rendered.filter((s) => !retired[s] && (!current.has(s) ? false : !rendered.includes(s)));
const changed = base.rendered.filter((s) => !current.has(s) && !retired[s]);
for (const s of lost) console.log(`NO LONGER RENDERED: ${strings.get(s)}: ${s.slice(0, 100)}`);
for (const s of changed) console.log(`edited or removed in data (record it in content_retired.json or re-baseline after review): ${s.slice(0, 100)}`);
console.log(`content_inventory: ${rendered.length} rendered now, ${base.rendered.length} in baseline, ${lost.length} lost, ${changed.length} changed`);
process.exit(lost.length || changed.length ? 1 : 0);
