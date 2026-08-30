# 3D Avatar Companion — Design Spec

**Status:** Core design decisions (§3) approved via discussion. This written document — including the concrete Nano Banana/Meshy workflow (§6), GitHub Pages verification (§6a), and gap analysis (§6b), all added after that discussion — awaits the user's review before moving to implementation planning.
**Plan reference:** `docs/superpowers/plans/2026-08-19-portfolio-production-readiness.md`, Phase L (this spec fulfills L1 — the required brainstorm/design pass before any implementation task is written).
**Related:** `docs/COMPETITIVE_DESIGN_RESEARCH.md` (Bruno Simon reference analysis, both live-site and GitHub-repo level).

---

## 1. Purpose

A small 3D character — a stylized likeness of Sahil — accompanies visitors through the portfolio homepage. It reacts to which section is in view (not to free-roam driving or clicks, for v1), showing an idle/pose animation plus a short thought-bubble line written in the site's established voice. The goal is a genuinely memorable, differentiating element — the research (`COMPETITIVE_DESIGN_RESEARCH.md`) found this category of feature entirely absent from the 21 competitor sites reviewed except Bruno Simon's much larger full-open-world game — while staying honest about scope: this is a companion widget, not a spatial world.

## 2. Constraints (carried over from the plan's existing Phase L research, still binding)

- Respect `prefers-reduced-motion` (already an established site-wide pattern).
- Graceful WebGL feature-detection fallback — the rest of the site must work identically with this feature hidden.
- Lazy-loaded (dynamic import, `ssr: false`) — never blocks First/Largest Contentful Paint of core content.
- Lean asset budget — target low single-digit MB total (model + textures + animations). `public/images/hero/profile.jpg` at 6.3MB is this project's own cautionary example of what not to repeat, at a larger scale.
- Real mid-range mobile device testing before shipping, not just devtools emulation.
- An opt-out toggle, since this is a real reputational variable for a recruiter-facing site (uncanny-valley risk noted honestly, not dismissed).

## 3. Decisions made in this brainstorm

| Decision | Resolution |
|---|---|
| Visual style | Not a binary "photoreal vs. stylized" choice — a 2-stage pipeline: generate 2-4 consistent stylized reference angles first (Nano Banana / Gemini image models, chosen for stronger cross-image character consistency than ChatGPT per current research — see §6), then convert via Meshy's multi-view image-to-3D (which explicitly preserves the input art style rather than reinterpreting it), then auto-rig. |
| Default state | **On by default**, with a visible, easy opt-out toggle (localStorage-persisted, same pattern as the existing `ThemeToggle`). The differentiating feature should be what visitors actually see; it should also be trivially easy to turn off. |
| Interaction model (v1) | **Passive/ambient only.** Reacts to which homepage section is in view (idle/pose animation + thought-bubble text). No click/hover reactions in v1 — documented as a future enhancement (§7), not built now. |
| Companion movement | **Fixed corner presence (Approach 1)**, not a full scroll-synced 3D-world traveling companion. The character stays in one fixed screen position throughout; only its pose/animation state and adjacent narration text change per section. This is a deliberate, scoped-down v1 relative to the original "roams the portfolio" framing — see §7 for why the fuller vision isn't lost, just sequenced later. |
| Mobile treatment | **Live, simplified 3D canvas** (not a static fallback image) — same character/canvas, just a smaller viewport and reduced/no continuous animation loop (idle pose held, pose changes still happen on section change). Revised during this brainstorm from an earlier static-image-only proposal, per explicit user direction to keep it live. |
| Narration content | Drafted by the assistant (grounded in Task 30's existing hook-driven voice work and each section's real content), reviewed and approved by the user before shipping — same working pattern as this session's case-study and bio copy. |
| Asset generation workflow | **Human-driven, not automated by the assistant** — see §6. No Meshy API/MCP access exists in this environment; the 2D stylization step also benefits from an interactive back-and-forth the assistant can't replicate through a single API call. |

## 4. Architecture

New module: `src/components/avatar/`.

- **`AvatarCompanion.tsx`** — top-level component, dynamically imported (`next/dynamic`, `ssr: false`) from wherever it mounts in the page tree (likely `page.tsx`, rendered once, fixed-position, independent of scroll-driven section layout). On mount, detects:
  - WebGL support (a simple canvas-context probe)
  - `prefers-reduced-motion`
  - Viewport size (mobile breakpoint, matching the codebase's existing Tailwind breakpoints)
  - Stored opt-out preference (`localStorage`)

  Combines these into a render mode: **`full`** (desktop, capable, not opted out), **`simplified`** (mobile — same live canvas, smaller/reduced animation), or **`hidden`** (opted out, reduced-motion, or WebGL unsupported).

- **`AvatarScene.tsx`** — the actual React Three Fiber `<Canvas>` contents. Loads the rigged GLB via drei's `useGLTF`, plays animation clips via `useAnimations`, crossfades between idle/pose clips when the active section changes.

- **`AvatarNarration.tsx`** — the thought-bubble text overlay. A plain CSS-positioned React component next to the fixed canvas — **not** Three.js's `CSS2DRenderer`. That technique exists to project a 2D overlay onto a character moving through 3D world space; since this design keeps the character in one fixed screen position (§3), there's no 3D-to-screen projection problem to solve, so the simpler plain-DOM overlay is a genuine simplification versus the originally-researched CSS2DRenderer approach, not a corner cut.

- **`src/data/avatarNarration.ts`** — new data file, one entry per homepage section id: `{ sectionId: string; pose: string; thought: string }[]`. Assistant-drafted, user-approved (per §3).

- **`useActiveSection()` hook** (new, in `src/lib/hooks.ts`) — **found while designing this**: `Navigation.tsx` already has inline IntersectionObserver-based active-section-detection logic for its own nav-highlighting. Extracting it into a shared hook serves both `Navigation.tsx` and `AvatarCompanion.tsx` instead of duplicating scroll-tracking code — a targeted improvement to existing code that directly serves this feature, per the brainstorming skill's own "working in existing codebases" guidance, not unrelated scope creep.

- **Opt-out toggle** — visually near the existing `ThemeToggle` (exact placement TBD at implementation time), same `localStorage` persistence pattern.

## 5. Data flow

1. Page loads → `AvatarCompanion` code-splits in, doesn't block LCP.
2. Mode detection runs once on mount (§4) → `full`, `simplified`, or `hidden`.
3. If not `hidden`: `useActiveSection()` reports which homepage section is currently in view.
4. `avatarNarration.ts` is looked up by the current section id → pose name + thought text.
5. `AvatarScene` crossfades to the matching animation clip; `AvatarNarration` updates its text.
6. In `simplified` (mobile) mode: same data flow, smaller canvas, animation loop reduced (idle pose held between section changes rather than continuously animating) to manage battery/perf — exact reduction mechanism (e.g., pausing the render loop between transitions vs. a lower frame-rate cap) decided at implementation time based on real device testing.

## 6. Asset generation workflow (human-driven) — concrete prompts and settings

No Meshy API/MCP access exists in this environment, and the Nano Banana stylization step benefits from interactive refinement the assistant can't replicate through one-shot API calls. This step is explicitly **not** automated by the assistant. The guidance below is grounded in current (2026) documentation for both tools, fetched and read directly during this brainstorm — not assumed from general knowledge (a real correction surfaced doing this: Meshy's current default model is **Meshy 7** ("latest"), not Meshy 6 as the earlier, staler Phase L research note said).

### Step 1 — Generate the reference photo(s) with Nano Banana

Do this in the Gemini app directly (not via any API), so you get the real conversational refinement loop — "keep the face closer to the photo," "try a 3/4 angle instead" — which is the actual strength of doing this interactively rather than as a single prompt.

**What source image to start from:** your own clear, well-lit, front-facing photo — plain background if possible, no sunglasses/hats obscuring your face, similar in spirit to a passport-style photo. Attach it to the Gemini chat as a reference image.

**Prompt structure** (subject → style → technical/camera details, the structure current prompting guides recommend):
> "Using the attached photo as the reference for facial likeness, generate a [stylization level — e.g. 'semi-realistic 3D-render style, Pixar/Disney-adjacent, not photoreal skin texture'] character portrait of this person. [Describe key features worth preserving: hair, build, any distinguishing details.] Full body, standing in a neutral A-pose (arms slightly away from the body, palms facing inward), plain white background, even diffused studio lighting with no harsh shadows, sharp focus, high detail."

Then, in the same conversation (so the character stays consistent), ask for the additional angles one at a time:
> "Now generate the exact same character, same outfit, same lighting, same pose — but from a side profile view (90°)."
> "Now the same character from directly behind."
> "Now a 3/4 angle view (45°)."

**Why this specific approach, not a single multi-view prompt:** current guides note Nano Banana can generate one image containing multiple framed views (front/45°/90° in one composited sheet) *or* separate images in a running conversation — the separate/iterative route is recommended here specifically because it's what lets you correct likeness drift ("that's not quite my nose") between angles, which a single one-shot composite prompt doesn't allow you to do per-angle.

**Technical settings worth setting explicitly (Nano Banana 2 / Gemini 3.1 Flash Image):** request at least 1024×1024 resolution (Meshy's own guidance, below, wants ≥1040×1040 for best results); 1:1 aspect ratio is simplest to work with.

### Step 2 — Convert to a rigged 3D model with Meshy

Current, verified requirements for the source images (from Meshy's own help center and multi-view guide):

| Requirement | Detail |
|---|---|
| Resolution | ≥1040×1040px (higher = more detail preserved) |
| Background | Plain — white, gray, or transparent. Avoid a background close to the character's own color |
| Lighting | Even, diffused — no strong directional shadows (these bake into the final texture) |
| Focus | Sharp, in-focus — blurry input produces noisy geometry |
| Framing | Subject fills most of the frame, same distance/scale across all angle photos |
| Angles | 1-4 images; **front + side + back + 3/4** is the best-covered combination Meshy recommends. Even just front + back "noticeably improves" results over a single photo. |
| What to avoid | Mixing multiple angles in one upload slot, glossy/metal strong highlights, watermarks/captions on the image, more than one subject per photo |

**Upload mode:** Multi-View Image to 3D (not single Image-to-3D) — explicitly the mode Meshy recommends for "character sheets, stylized and anime characters, anything where the back matters," and the mode that **preserves your input's art style** rather than letting Meshy's own interpretation decide how photoreal the result looks (this is the mechanism that actually delivers on the "control the style yourself" goal from §3, not the multi-view input alone).

**Settings to use:**
- `ai_model`: **latest (Meshy 7)** — corrected from the earlier Phase L research's "Meshy 6" note; verified directly against Meshy's current API docs during this brainstorm.
- **Pose mode: A-pose** — rigging-ready, matches the pose requested from Nano Banana in Step 1.
- **Image enhancement: consider disabling it** (`image_enhancement: false` in API terms, or the equivalent toggle in the web app) — by default Meshy "optimizes" input images before conversion, which risks re-interpreting the exact stylization you deliberately chose in Step 1. Test both ways during the L2 prototype; keep whichever actually preserves your Nano Banana style better.
- Texture resolution: 2K is enough for a small on-screen companion (the plan's "lean asset budget" constraint) — no need for 4K/8K here.

**Output:** a rigged GLB with the built-in animation library (idle, wave, think, etc.) auto-attached via Meshy's auto-rigging.

### Step 3 — Hand off to implementation

Hand the assistant the resulting GLB file(s). Everything from that point (loading, wiring into the section-reactivity system, fallbacks, testing) is implementation work done directly in this codebase — no further asset-generation research needed at that stage.

If a Meshy API key becomes available later, steps 2 could be scripted end-to-end — but that would need re-verifying the exact current API contract at that time, the same way this section was just verified now rather than assumed.

**Sources:** [Meshy multi-view guide](https://www.meshy.ai/tutorials/multi-view-image-to-3d) · [Meshy image-to-3D tips](https://help.meshy.ai/en/articles/15723519-how-to-get-better-image-to-3d-results-in-meshy) · [Meshy Multi-Image to 3D API docs](https://docs.meshy.ai/en/api/multi-image-to-3d) · [Nano Banana prompting guide (Google Cloud)](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-nano-banana) · [Nano Banana character-consistency guide](https://www.nenobanana.com/blogs/nano-banana-character-consistency-12-prompts-that-actually-work--2026-guide)

## 6a. GitHub Pages deployment — verified, no known blockers

Checked directly against this repo's actual config, not assumed:

- **No basePath issue.** `next.config.js` already has `basePath: ''`, `assetPrefix: ''` — because this repo is `patelsahil2k03.github.io`, GitHub's special user/organization-site naming, it deploys to the domain root (`https://patelsahil2k03.github.io/`), not a `/repo-name/` subpath. The basePath pitfall that trips up *project*-page GitHub Pages deployments (`username.github.io/repo-name/`) simply doesn't apply here. A GLB placed in `public/models/avatar.glb` is referenced exactly like the site's existing images (`/models/avatar.glb`) — no special config needed.
- **No CORS issue.** The GLB is served same-origin (same domain as the page), so `GLTFLoader`'s fetch has nothing to negotiate.
- **No known MIME-type blocker.** `GLTFLoader` fetches the file as an `ArrayBuffer` and parses it client-side — unlike, say, ES module `<script>` tags, this doesn't depend on the server declaring a specific `Content-Type` for `.glb`. No documentation search surfaced a real GitHub-Pages-specific MIME problem for this file type; still worth a concrete verification in L2's prototype (deploy the test route, confirm the model actually loads on the live GitHub Pages URL, not just locally) rather than assumed risk-free.
- **No size-limit concern.** GitHub's per-file hard limit is 100MB; GitHub Pages' informal site-size guidance is ~1GB. This feature's asset budget (§2) targets low single-digit MB — orders of magnitude under either ceiling.
- **Build pipeline**: this repo's existing `public/` → static-export copy behavior (already used for images, resume PDF, etc.) handles binary GLB files the same way — no changes needed to `next.config.js` or the GitHub Actions workflow.

**Net: GitHub Pages is a fully viable target for this feature with the existing deployment setup — this was a real, worthwhile thing to verify rather than assume, but it did not surface a blocker.**

## 6b. Gaps, risks, and open questions — a full pass

Beyond what's already captured in §2 (constraints) and §9 (deferred implementation-time decisions), a dedicated look for anything still missing:

- **Likeness drift across the 2D reference set is the single biggest real risk in the whole pipeline**, not a solved problem — even Nano Banana's improved consistency is "better than ChatGPT," not perfect. If the front/side/back/3/4 images don't agree closely enough on facial structure, Meshy's 3D reconstruction will blend/average them in ways that may not look like you. **Mitigation already built into §6's Step 1**: iterative, same-conversation generation so drift gets caught and corrected per-angle, not discovered only after all 4 images are done.
- **No decision yet on how many distinct poses/animations to actually request from Meshy's animation library** — the spec's data flow (§5) assumes "pose changes on section change" but doesn't fix a specific set (idle, wave, think, point, celebrate?). This should be decided once Meshy's auto-rig output is in hand and its available clip library is visible, not guessed now — already flagged as an open item in §9, cross-referenced here for completeness.
- **Analytics/observability gap**: nothing in this design currently tracks whether visitors actually engage with the companion (or immediately opt out) — the rest of this codebase uses Microsoft Clarity custom events for exactly this kind of product-usage signal (e.g. `case-study-view-{slug}`). Worth adding a `avatar-opt-out` / `avatar-shown` Clarity event pair during implementation so the feature's real reception is measurable, not just assumed.
- **No rollback/kill-switch beyond the opt-out toggle** — if the shipped character looks worse in production than in the L2 prototype (different real-world lighting expectations, an unexpected mobile rendering artifact, etc.), the fastest safe response is a one-line env/config flag that force-hides the whole feature site-wide without a code revert. Worth building this in from the start (e.g. a single exported boolean/constant `AVATAR_ENABLED` checked at the top of `AvatarCompanion.tsx`) rather than retrofitting it under pressure later.
- **Content-generation cost is real but small**: Nano Banana and Meshy both consume the user's own credits/quota (Meshy specifically is a paid tier for anything beyond a small free allowance). Not a blocker, but worth the user knowing before starting L2 that this isn't free to iterate on indefinitely — budget a handful of generation attempts, not unlimited retries.
- **Bruno Simon's site (the closest real precedent, now analyzed at GitHub-repo depth this session) is a genuinely different scale of engineering** — a full physics engine, ~40 modular systems files, a real game loop. This spec's fixed-corner v1 is deliberately nowhere near that scope, which is the right call for a first ship, but worth stating plainly so nobody benchmarks v1's ambition against that reference and finds it lacking — they're solving different problems (a companion widget vs. an explorable world).
- **No accessibility statement yet for the thought-bubble text itself** — beyond `prefers-reduced-motion`, screen-reader behavior for the narration overlay isn't specified (should it be `aria-live` so assistive tech announces new thoughts as sections change, or should it be decorative/`aria-hidden` since the same information isn't otherwise duplicated in the main content flow — this needs a decision, not silence, at implementation time).

## 7. Documented future enhancements (explicitly not built in v1)

Recorded here so the fuller original vision isn't lost, per user direction ("recommended but document the enhancements for future"):

- **Traveling companion (Approach 2)**: the character's 3D position/rotation driven by scroll progress, visually moving along an authored path between sections — closer to the original "roams the portfolio" framing and to Bruno Simon's spirit. Requires a real scroll-to-3D-space sync system (this is Task L3 in the plan's existing staged outline) and a full-page-height canvas overlay. Revisit once the v1 fixed-corner companion validates visual quality and tone.
- **Click/hover reactions**: hovering triggers a wave, clicking triggers a small easter-egg animation — more game-like, closer to Bruno Simon's interaction spirit, deferred to keep v1's build scope tight.
- **"Cute animations and other things"** (user's own phrase, left open-ended): seasonal/easter-egg pose variations, an achievement-unlock-style gamification layer inspired by Bruno Simon's 6-tier achievement system, a lightweight visitor-interaction feature akin to Bruno Simon's "Whispers" messaging. None scoped in detail yet — revisit after v1 ships and the character's reception is known.

## 8. Testing / verification plan

- **L2 (prototype spike)**: build in isolation first — an unlisted test route, not the live homepage — to validate visual quality, GLB file size, and frame-rate budget before any wiring into the real page. This is already the plan's own existing recommendation; this spec doesn't change it.
- Screenshot-based visual review (light + dark mode, matching this session's established verification pattern) once wired in.
- Real mid-range mobile device test before merging to `main` — not just simulated devtools throttling.
- Confirm `prefers-reduced-motion` and the opt-out toggle both fully disable the animation loop, not just visually hide it (a paused-but-still-rendering canvas would defeat the performance/battery point of the fallback).

## 9. Open items for the implementation plan (not decided here, deliberately)

- Exact fixed-corner placement (bottom-right assumed as a sensible default; not yet confirmed with the user).
- Exact mechanism for "reduced animation" on mobile (paused loop between transitions vs. lower frame-rate cap) — a real-device-testing decision, not a design-time one.
- Exact opt-out toggle placement relative to `ThemeToggle`.
- Number and content of the pose/animation clips actually available, once Meshy's auto-rigging output is in hand — the narration data file's `pose` field names depend on what clips actually exist.
