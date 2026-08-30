# 3D Avatar Companion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a small, fixed-corner 3D character companion to the portfolio homepage that reacts to which section is in view — a different idle/pose animation plus a short thought-bubble line per section — on by default, with a full opt-out toggle and graceful fallbacks everywhere.

**Architecture:** A new `src/components/avatar/` module (React Three Fiber canvas, dynamically imported so it never blocks page load), driven by a shared `useActiveSection()` hook extracted from `Navigation.tsx`'s existing scroll logic, reading pose/copy from a new `src/data/avatarNarration.ts` data file. No new backend, no new routes on the live site (one temporary, unlisted test route for L2's prototype, removed before L6).

**Tech Stack:** Next.js 14 (App Router, static export), TypeScript, `@react-three/fiber` ^8.15, `@react-three/drei` ^9.93, `three` ^0.160 (all already installed, currently unused — this feature is their first real consumer), Framer Motion (existing), Tailwind CSS with this project's existing dark-mode token system, Microsoft Clarity (existing analytics).

**Spec:** `docs/superpowers/specs/2026-08-30-3d-avatar-companion-design.md` — read in full before starting; this plan argues from that spec and doesn't repeat its rationale.

## Global Constraints

These apply to every task below (from the spec and this project's own `ai_guidelines/` rules, already binding on this whole codebase):

- **Propose, then wait for explicit approval** before every commit — same discipline as the rest of this project's plan.
- **No commit trailers** (`Co-Authored-By:`, `Signed-off-by:`, etc.), no AI/vendor mentions in commit text.
- **Conventional Commits**, imperative mood, ≤50 char subject.
- **One commit per logical task** — don't bundle unrelated tasks.
- **Read the full file before editing it**, even if summarized above.
- **Verification per task**: `npx tsc --noEmit`, `npm run lint`, `npm run build` must all stay clean — this codebase has no test runner (confirmed: no Jest/Vitest/Testing Library in `package.json`), so "run the tests" throughout this plan means these three commands plus the manual/screenshot verification each task specifies, matching how every other task in this project's main plan has been verified.
- **Respect `prefers-reduced-motion`** (this codebase already has `usePrefersReducedMotion()` in `src/lib/hooks.ts` — reuse it, don't reimplement).
- **Lean asset budget** — low single-digit MB total for the GLB (model + textures + animations). Check the actual file size in Task L2.1 and flag immediately if it's not in that range, before building anything else on top of it.
- **Branch discipline**: work happens on `dev` per `BRANCH_STRATEGY.md`; merge to `main` only once L6 completes and the user approves a release.
- **No bare `rm -rf`** — untracked files via `gio trash`/`.trash/`, tracked files via `git rm`.

---

## ⛔ Blocking precondition — before Task L2 can start

This plan cannot begin until the user has generated the character asset via the human-driven pipeline in spec §6 (Nano Banana reference images → Meshy multi-view image-to-3D → auto-rig) and handed the assistant the resulting file(s):

- **Required:** one rigged `.glb` file containing the character mesh, at minimum one "idle" animation clip.
- **Strongly preferred:** the same GLB (or a second one) with additional pose clips from Meshy's animation library, so Task L3.2's per-section pose mapping has real clips to reference instead of falling back to idle everywhere.

**Do not start Task L2.1 without this file in hand.** If it isn't ready yet, stop here and wait — this is an external dependency this plan cannot task-break further (per the spec's own §6 and the brainstorming discussion that produced it).

---

## Phase L2 — Prototype spike (isolated test route)

*Validates visual quality, file size, and frame budget before anything is wired into the real homepage — per the spec's "prototype before committing" philosophy. Nothing in this phase touches `page.tsx` or any live route.*

### Task L2.1: Isolated test route + confirm the GLB loads

**Files:**
- Create: `public/models/avatar.glb` (the user-provided file from the blocking precondition — copy it in, don't regenerate it)
- Create: `src/components/avatar/AvatarScene.tsx`
- Create: `src/app/dev-avatar-test/page.tsx`

**Interfaces:**
- Produces: `AvatarScene` component with props `{ className?: string }`, rendering a `@react-three/fiber` `<Canvas>` containing the loaded GLB. Later tasks (L2.2 onward) extend this same file — this task's job is just "it loads and renders."

- [ ] **Step 1: Copy the handed-off GLB into place.**

```bash
mkdir -p public/models
cp <path-the-user-gave-you> public/models/avatar.glb
ls -lh public/models/avatar.glb
```

Note the file size in your task report — this is the first checkpoint against the spec's lean-asset-budget constraint (low single-digit MB). If it's already over ~5MB, stop and flag it to the user before continuing (may need re-exporting from Meshy at a lower texture resolution, per spec §6's "2K is enough" guidance) rather than building further on an oversized asset.

- [ ] **Step 2: Write `AvatarScene.tsx`.**

```tsx
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/avatar.glb';

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  return <primitive object={scene} />;
}

export function AvatarScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
```

- [ ] **Step 3: Write the unlisted test route.**

```tsx
// src/app/dev-avatar-test/page.tsx
'use client';

import dynamic from 'next/dynamic';

// ssr: false is required, not optional — Canvas/useGLTF touch WebGL/DOM
// globals that don't exist during Next.js's server-side prerender pass.
// Without this, `npm run build`'s static export would fail here.
const AvatarScene = dynamic(
  () => import('@/components/avatar/AvatarScene').then((m) => m.AvatarScene),
  { ssr: false }
);

export default function AvatarTestPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center">
      <AvatarScene className="w-[400px] h-[500px] border-2 border-slate-300 rounded-xl bg-white" />
    </main>
  );
}
```

This route is intentionally not linked from `Navigation.tsx` or any nav item — it's reachable only by typing the URL directly, and gets deleted in Task L6.1 once the feature ships for real.

- [ ] **Step 4: Verify.**

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

Run `npm run build` here specifically (not just `npm run dev`) — this is the concrete check that the `dynamic(..., { ssr: false })` wrapping actually prevents the static-export prerender pass from choking on `Canvas`/`useGLTF`'s browser-only globals. If `npm run build` fails at this step, that's the bug to fix before moving on, not something to defer.

Then open `http://localhost:3000/dev-avatar-test/` in a browser — confirm the character renders (even in a static bind pose, no animation yet — that's L2.2). If nothing renders, check the browser console for a `GLTFLoader` error before proceeding (common causes: wrong path, GLB not actually placed under `public/`, or the file being corrupted in transfer — verify with `file public/models/avatar.glb` reporting a valid glTF binary).

- [ ] **Step 5: Stop the dev server, propose to user with a screenshot, then commit.**

```bash
git add public/models/avatar.glb src/components/avatar/AvatarScene.tsx src/app/dev-avatar-test/page.tsx
git commit -m "feat(avatar): load character model in isolated test route"
```

---

### Task L2.2: Idle animation playback

**Files:**
- Modify: `src/components/avatar/AvatarScene.tsx`

**Interfaces:**
- Consumes: `MODEL_PATH` constant from Task L2.1.
- Produces: `AvatarScene` now plays a continuous idle animation. Exposes no new props yet — this task validates the animation pipeline works before Task L3.2 wires it to real section data.

- [ ] **Step 1: List the GLB's actual animation clip names.** Before writing the idle-loop code, confirm what clips actually exist — don't assume a name. Add a temporary console log:

```tsx
function Model() {
  const { scene, animations } = useGLTF(MODEL_PATH);
  console.log('Available animation clips:', animations.map((clip) => clip.name));
  return <primitive object={scene} />;
}
```

Run `npm run dev`, open `/dev-avatar-test/` and the browser console, note the exact clip names. This is the concrete answer to spec §9's open item — write the real names down now, you'll need them for Task L3.2's pose mapping.

- [ ] **Step 2: Play the first clip (assumed idle) on a loop.**

```tsx
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';

const MODEL_PATH = '/models/avatar.glb';

function Model() {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    const idleClipName = names[0];
    if (!idleClipName) return;
    const action = actions[idleClipName];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names]);

  return <primitive ref={group} object={scene} />;
}

export function AvatarScene({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
```

Remove the `console.log` from Step 1 once you've noted the clip names — don't ship a stray console log.

- [ ] **Step 3: Verify.** `npm run dev`, confirm the character visibly animates (breathing/idle motion, not a frozen bind pose) at `/dev-avatar-test/`. Open the browser's performance/FPS overlay (devtools → Rendering → "Frame Rendering Stats" in Chrome) and confirm it holds close to 60fps on your dev machine — this is the frame-budget checkpoint from the spec's constraints (§2).

- [ ] **Step 4: Commit.**

```bash
git add src/components/avatar/AvatarScene.tsx
git commit -m "feat(avatar): play idle animation on loop"
```

---

### Task L2.3: Pose-transition validation + decision gate

**Files:**
- Modify: `src/app/dev-avatar-test/page.tsx` (adds temporary test buttons — this whole file is deleted in L6.1, so temporary test-only UI here is fine)
- Modify: `src/components/avatar/AvatarScene.tsx`

**Interfaces:**
- Produces: `AvatarScene` accepts a `pose?: string` prop, crossfading to that named clip when it changes (falling back to the first/idle clip if the name doesn't match any real clip — the defensive fallback Task L3.2 will rely on).

- [ ] **Step 1: Extend `AvatarScene` to accept a `pose` prop and crossfade.**

```tsx
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';

const MODEL_PATH = '/models/avatar.glb';

function Model({ pose }: { pose?: string }) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions, names } = useAnimations(animations, group);
  const currentActionName = useRef<string | null>(null);

  useEffect(() => {
    if (names.length === 0) return;
    const targetName = pose && names.includes(pose) ? pose : names[0];
    if (targetName === currentActionName.current) return;

    const nextAction = actions[targetName];
    const prevAction = currentActionName.current ? actions[currentActionName.current] : null;

    nextAction?.reset().fadeIn(0.4).play();
    prevAction?.fadeOut(0.4);
    currentActionName.current = targetName;
  }, [pose, actions, names]);

  return <primitive ref={group} object={scene} />;
}

export function AvatarScene({ className, pose }: { className?: string; pose?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 40 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 4, 3]} intensity={1} />
        <Suspense fallback={null}>
          <Model pose={pose} />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
```

- [ ] **Step 2: Add temporary pose-switch buttons to the test route** (using the real clip names you noted in Task L2.2 Step 1 — replace `'Idle'`/`'Wave'` below with whatever your GLB actually contains):

```tsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const AvatarScene = dynamic(
  () => import('@/components/avatar/AvatarScene').then((m) => m.AvatarScene),
  { ssr: false }
);

export default function AvatarTestPage() {
  const [pose, setPose] = useState<string | undefined>(undefined);

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center justify-center gap-4">
      <AvatarScene className="w-[400px] h-[500px] border-2 border-slate-300 rounded-xl bg-white" pose={pose} />
      <div className="flex gap-2">
        <button onClick={() => setPose('Idle')} className="px-4 py-2 bg-white border rounded">Idle</button>
        <button onClick={() => setPose('Wave')} className="px-4 py-2 bg-white border rounded">Wave</button>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify.** `npm run dev`, click between the two buttons at `/dev-avatar-test/`, confirm the character visibly crossfades between poses without snapping or T-posing mid-transition. If only one clip exists in your GLB (no separate "Wave"), this step just confirms clicking the second button doesn't break anything (falls back to idle per the defensive logic in Step 1) — that's an acceptable L2 outcome, it just means Task L3.2's pose mapping will need to lean more heavily on the idle clip for now, revisit once more clips are generated later.

- [ ] **Step 4: Commit.**

```bash
git add src/components/avatar/AvatarScene.tsx src/app/dev-avatar-test/page.tsx
git commit -m "feat(avatar): support pose crossfading with graceful fallback"
```

- [ ] **Step 5: DECISION GATE — propose to the user before proceeding to L3.** Take a screenshot of the working prototype (both idle and — if available — a second pose), report the actual GLB file size, the real animation clip names found, and frame-rate observations. Ask explicitly: does this look right to keep building on, or does the character need to be regenerated (different stylization, a rigging issue, an unexpected visual problem) before any more work goes on top of it? **Do not proceed to Phase L3 without an explicit yes** — this is the single checkpoint the whole "prototype before committing" philosophy exists for.

---

## Phase L3 — Section-reactivity system

*Only start this phase after Task L2.3's decision gate is explicitly approved.*

### Task L3.1: Extract `useActiveSection()` shared hook, refactor `Navigation.tsx`

**Files:**
- Modify: `src/lib/hooks.ts`
- Modify: `src/components/ui/Navigation.tsx:34-68` (read the full file first — it's 296 lines)

**Interfaces:**
- Produces: `useActiveSection(sectionIds: string[], enabled: boolean = true): string` — returns the id of whichever section in `sectionIds` is currently scrolled into view (matching the exact scroll-offset logic already in `Navigation.tsx`, not `IntersectionObserver` — a correction from the spec's earlier description, verified against the real code during this plan). Defaults to `sectionIds[0]` before the first scroll event fires.

- [ ] **Step 1: Add the hook to `src/lib/hooks.ts`** (append after the existing `usePrefersReducedMotion` export — read the current file first, it's only 62 lines):

```tsx
/**
 * Tracks which of the given section ids is currently scrolled into view,
 * using the same offset-based scroll-position check as Navigation.tsx's
 * nav-highlighting (not IntersectionObserver). Returns sectionIds[0] until
 * the first scroll event fires. Pass enabled=false to skip entirely (e.g.
 * on a route where these sections don't exist).
 */
export function useActiveSection(sectionIds: string[], enabled: boolean = true) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? '');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sectionIds) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [enabled, sectionIds]);

  return activeSection;
}
```

- [ ] **Step 2: Refactor `Navigation.tsx` to consume the new hook instead of its own inline copy.** Read the full current file first. Replace the combined scroll-handling `useEffect` (currently lines ~42-68, which handles both `isScrolled` and section-detection in one function) with two separate concerns — `isScrolled` stays local, section-detection now comes from the shared hook:

```tsx
// Replace this existing block:
//   const [activeSection, setActiveSection] = useState('home');
//   useEffect(() => {
//     if (!onHome) return;
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 20);
//       const sectionIds = navItems.filter(...).map(...);
//       const scrollPosition = window.scrollY + 100;
//       for (const section of sectionIds) { ... }
//     };
//     handleScroll();
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [onHome]);

// With:
const sectionIds = navItems
  .filter((item): item is SectionNavItem => item.kind === 'section')
  .map((item) => item.sectionId);
const activeSection = useActiveSection(sectionIds, onHome);

useEffect(() => {
  if (!onHome) return;
  const handleScroll = () => setIsScrolled(window.scrollY > 20);
  handleScroll();
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [onHome]);
```

Add `useActiveSection` to the existing `import { useScrollAnimation, ... } from '@/lib/hooks'`-style import if one exists, or add a new import line for it from `@/lib/hooks`.

- [ ] **Step 3: Verify — this must be a zero-visual-change refactor.**

```bash
npx tsc --noEmit
npm run lint
npm run dev
```

Open the homepage, scroll through every section, confirm the nav still highlights the correct item exactly as before (compare against the pre-refactor screenshot if you have one, or just visually confirm nothing looks different — this is a pure extraction, not a behavior change).

- [ ] **Step 4: Commit.**

```bash
git add src/lib/hooks.ts src/components/ui/Navigation.tsx
git commit -m "refactor(nav): extract useActiveSection shared hook

Navigation.tsx had its own inline scroll-position-based active-section
detection. Extracted to src/lib/hooks.ts so the upcoming avatar
companion feature can consume the same logic instead of duplicating
it. Zero behavior change - isScrolled stays as its own effect."
```

---

### Task L3.2: Wire pose changes to the active section

**Files:**
- Create: `src/components/avatar/AvatarCompanion.tsx`
- Modify: `src/app/dev-avatar-test/page.tsx` (temporary — swap the manual buttons for real section-driven behavior, to validate before L6 wires it into the real homepage)

**Interfaces:**
- Consumes: `useActiveSection` (Task L3.1), `AvatarScene` (Task L2.3).
- Produces: `AvatarCompanion` component (no props yet — mode-detection props come in Task L5.1), internally computing the current pose name from the active section via a `SECTION_POSES` map.

- [ ] **Step 1: Define the section→pose mapping**, using the real clip names noted during Task L2.2 in place of any name below that doesn't actually exist in your GLB (fall back to your idle clip's real name for any section without a distinct pose yet — this directly follows the candidate table in spec §5, adjusted to what's real):

```tsx
// src/components/avatar/AvatarCompanion.tsx
'use client';

import { useActiveSection } from '@/lib/hooks';
import { AvatarScene } from './AvatarScene';

const HOMEPAGE_SECTION_IDS = [
  'home',
  'about',
  'experience',
  'case-studies',
  'skills',
  'projects',
  'publications',
  'achievements',
  'contact',
];

// Replace each value with a real clip name from your GLB (Task L2.2's
// console.log output) — anything not present falls back to the idle
// clip automatically via AvatarScene's own fallback logic.
const SECTION_POSES: Record<string, string> = {
  home: 'Idle',
  about: 'Idle',
  experience: 'Idle',
  'case-studies': 'Idle',
  skills: 'Idle',
  projects: 'Idle',
  publications: 'Idle',
  achievements: 'Idle',
  contact: 'Idle',
};

export function AvatarCompanion() {
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS);
  const pose = SECTION_POSES[activeSection] ?? 'Idle';

  return (
    <AvatarScene
      className="fixed bottom-6 right-6 w-32 h-32 z-40 pointer-events-none"
      pose={pose}
    />
  );
}
```

- [ ] **Step 2: Temporarily mount `AvatarCompanion` on the real homepage to validate section-tracking** (this is reverted/formalized properly in Task L6.1 — for now it's just to prove the wiring works against real page content, since `dev-avatar-test` has no real sections to scroll through):

Read `src/app/page.tsx` first (it's a Server Component, not `'use client'` — that's fine, `next/dynamic` with `ssr: false` works from a Server Component same as anywhere else). Add near the top:

```tsx
import dynamic from 'next/dynamic';

const AvatarCompanion = dynamic(
  () => import('@/components/avatar/AvatarCompanion').then((m) => m.AvatarCompanion),
  { ssr: false }
);
```

Then add `<AvatarCompanion />` right before `<Footer />`. This dynamic-with-`ssr:false` wrapping is required here, not optional — `AvatarCompanion` internally imports `AvatarScene`, which touches WebGL/DOM globals that don't exist during the server-side prerender pass; wrapping at this single mount point covers the whole subtree, so `AvatarScene`/`AvatarCompanion`'s own internal imports of each other can stay plain.

- [ ] **Step 3: Verify.** `npm run build` first (confirms the dynamic-import wrapping actually prevents a prerender failure — same check as Task L2.1 Step 4), then `npm run dev`, open the real homepage, scroll through every section, confirm the fixed-corner character's pose value changes as you cross section boundaries (check via the same temporary console log approach as Task L2.2 if the pose clips are visually too similar to tell apart yet — that's expected until more distinct clips exist).

- [ ] **Step 4: Revert the temporary `page.tsx` mount** (Step 2) — this phase validates the wiring works, but the component doesn't formally ship until Task L6.1 handles mode-detection, the opt-out toggle, and mobile behavior first. `git diff src/app/page.tsx` should show your Step 2 addition; remove it before committing.

- [ ] **Step 5: Commit.**

```bash
git add src/components/avatar/AvatarCompanion.tsx
git commit -m "feat(avatar): wire pose changes to active homepage section"
```

---

## Phase L4 — Narration content system

### Task L4.1: Create `avatarNarration.ts` with drafted copy

**Files:**
- Create: `src/data/avatarNarration.ts`

**Interfaces:**
- Produces: `avatarNarration: AvatarNarrationEntry[]` and `getNarrationForSection(sectionId: string): AvatarNarrationEntry` — the lookup function `AvatarNarration.tsx` (Task L4.2) will call.

- [ ] **Step 1: Write the data file with a first-pass draft** (per the spec's own process: assistant drafts, user reviews before this ships — treat the copy below as that draft, not final):

```typescript
export interface AvatarNarrationEntry {
  sectionId: string;
  pose: string;
  thought: string;
}

export const avatarNarration: AvatarNarrationEntry[] = [
  {
    sectionId: 'home',
    pose: 'Idle',
    thought: "Hi — I'm the 3D-sized version of Sahil. Scroll on, I'll keep up.",
  },
  {
    sectionId: 'about',
    pose: 'Idle',
    thought: "Production AI/ML systems, not slideware — that's the actual story here.",
  },
  {
    sectionId: 'experience',
    pose: 'Idle',
    thought: 'Two years in, already the person other teams ping when something breaks.',
  },
  {
    sectionId: 'case-studies',
    pose: 'Idle',
    thought: 'These are real systems at real scale, not demos — worth a proper look.',
  },
  {
    sectionId: 'skills',
    pose: 'Idle',
    thought: "50+ technologies. I only know how to stand here, so we're even.",
  },
  {
    sectionId: 'projects',
    pose: 'Idle',
    thought: 'Side projects that occasionally out-ambition the day job.',
  },
  {
    sectionId: 'publications',
    pose: 'Idle',
    thought: 'Actual peer review, actual publication — this part took real work.',
  },
  {
    sectionId: 'achievements',
    pose: 'Idle',
    thought: 'A few wins worth mentioning — on the field and off it.',
  },
  {
    sectionId: 'contact',
    pose: 'Idle',
    thought: "Go ahead, say hi — I'll be right here.",
  },
];

const FALLBACK_ENTRY = avatarNarration[0];

export function getNarrationForSection(sectionId: string): AvatarNarrationEntry {
  return avatarNarration.find((entry) => entry.sectionId === sectionId) ?? FALLBACK_ENTRY;
}
```

Note: `pose` values are all `'Idle'` as a safe starting default — update these to match `AvatarCompanion.tsx`'s `SECTION_POSES` map from Task L3.2 once real distinct clips exist (the two should stay in sync; consider consolidating them into one source of truth during Task L6.3's QA pass if by then it's clear they'll always move together).

- [ ] **Step 2: Verify.** `npx tsc --noEmit` — confirms the interface and lookup function compile cleanly.

- [ ] **Step 3: Commit.**

```bash
git add src/data/avatarNarration.ts
git commit -m "feat(avatar): add narration data file with draft copy"
```

- [ ] **Step 4: Flag to the user for review** — per the spec's process, this draft copy needs your read-through/edits before it ships in Task L6. Not a blocking gate for continuing the plan's remaining tasks, but don't consider this content final until you've confirmed it.

---

### Task L4.2: `AvatarNarration.tsx` thought-bubble component

**Files:**
- Create: `src/components/avatar/AvatarNarration.tsx`
- Modify: `src/components/avatar/AvatarCompanion.tsx`

**Interfaces:**
- Consumes: `getNarrationForSection` (Task L4.1).
- Produces: `AvatarNarration` component with props `{ thought: string }`.

- [ ] **Step 1: Write the component**, using this project's existing dark-mode tokens (`bg-surface`, `text-ink-primary`, `border-edge` — confirmed present in `tailwind.config.ts` from this session's earlier dark-mode work) and deciding the accessibility behavior the spec left open (§6b): `aria-live="polite"` so screen readers announce each new thought without interrupting whatever else is being read, since this text isn't duplicated anywhere else in the page's content:

```tsx
'use client';

export function AvatarNarration({ thought }: { thought: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="max-w-[180px] px-3 py-2 rounded-lg bg-surface border border-edge text-ink-primary text-xs shadow-md"
    >
      {thought}
    </div>
  );
}
```

- [ ] **Step 2: Wire it into `AvatarCompanion.tsx`** — read the current file (from Task L3.2) first:

```tsx
'use client';

import { useActiveSection } from '@/lib/hooks';
import { getNarrationForSection } from '@/data/avatarNarration';
import { AvatarScene } from './AvatarScene';
import { AvatarNarration } from './AvatarNarration';

const HOMEPAGE_SECTION_IDS = [
  'home', 'about', 'experience', 'case-studies',
  'skills', 'projects', 'publications', 'achievements', 'contact',
];

export function AvatarCompanion() {
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS);
  const { pose, thought } = getNarrationForSection(activeSection);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <AvatarNarration thought={thought} />
      <AvatarScene className="w-32 h-32" pose={pose} />
    </div>
  );
}
```

(Note: this removes the standalone `SECTION_POSES` map from Task L3.2 — `avatarNarration.ts` is now the single source of truth for both pose and copy per section, resolving the "keep them in sync" note from Task L4.1 Step 1 immediately rather than deferring it.)

- [ ] **Step 3: Verify.** `npx tsc --noEmit`, `npm run lint`, `npm run dev` — temporarily re-add `<AvatarCompanion />` to `page.tsx` (same as Task L3.2 Step 2), confirm the thought bubble text changes per section alongside the pose, then remove the temporary mount again.

- [ ] **Step 4: Commit.**

```bash
git add src/components/avatar/AvatarNarration.tsx src/components/avatar/AvatarCompanion.tsx
git commit -m "feat(avatar): add thought-bubble narration overlay"
```

---

## Phase L5 — Performance / accessibility hardening

### Task L5.1: Mode detection (WebGL, reduced-motion, mobile, opt-out)

**Files:**
- Modify: `src/components/avatar/AvatarCompanion.tsx`
- Create: `src/lib/avatarConfig.ts`

**Interfaces:**
- Produces: `AVATAR_ENABLED` constant (the kill-switch from spec §6b), `detectWebGLSupport(): boolean`, and `AvatarCompanion`'s internal `mode: 'full' | 'simplified' | 'hidden'` computation.

- [ ] **Step 1: Create the kill-switch + WebGL detection helper.**

```typescript
// src/lib/avatarConfig.ts

/**
 * Site-wide kill switch. Flip to false to hide the avatar companion
 * entirely without a code revert, if something looks wrong in
 * production that wasn't caught in testing (spec section 6b).
 */
export const AVATAR_ENABLED = true;

export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Compute the render mode in `AvatarCompanion.tsx`.** Read the current file (from Task L4.2) first:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useActiveSection, usePrefersReducedMotion } from '@/lib/hooks';
import { getNarrationForSection } from '@/data/avatarNarration';
import { AVATAR_ENABLED, detectWebGLSupport } from '@/lib/avatarConfig';
import { AvatarScene } from './AvatarScene';
import { AvatarNarration } from './AvatarNarration';

const HOMEPAGE_SECTION_IDS = [
  'home', 'about', 'experience', 'case-studies',
  'skills', 'projects', 'publications', 'achievements', 'contact',
];

const OPT_OUT_STORAGE_KEY = 'avatar-opt-out';
const MOBILE_BREAKPOINT_PX = 768; // matches this codebase's existing Tailwind `md` breakpoint

type Mode = 'full' | 'simplified' | 'hidden';

function useAvatarMode(): Mode {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<Mode>('hidden');

  useEffect(() => {
    if (!AVATAR_ENABLED) {
      setMode('hidden');
      return;
    }

    let optedOut = false;
    try {
      optedOut = localStorage.getItem(OPT_OUT_STORAGE_KEY) === 'true';
    } catch {
      // localStorage unavailable — treat as not opted out
    }

    if (optedOut || prefersReducedMotion || !detectWebGLSupport()) {
      setMode('hidden');
      return;
    }

    setMode(window.innerWidth < MOBILE_BREAKPOINT_PX ? 'simplified' : 'full');
  }, [prefersReducedMotion]);

  return mode;
}

export function AvatarCompanion() {
  const mode = useAvatarMode();
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS, mode !== 'hidden');
  const { pose, thought } = getNarrationForSection(activeSection);

  if (mode === 'hidden') return null;

  const sizeClass = mode === 'simplified' ? 'w-20 h-20' : 'w-32 h-32';

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <AvatarNarration thought={thought} />
      <AvatarScene className={sizeClass} pose={pose} />
    </div>
  );
}
```

Note: this doesn't yet implement the "reduced animation loop on mobile" detail from spec §5/§9 (that's Task L5.3, which needs real mobile device testing to decide the exact mechanism) — `simplified` mode here is currently just "smaller," matching the spec's explicit "same live canvas, just smaller" decision as a starting point.

- [ ] **Step 3: Verify.** `npx tsc --noEmit`, `npm run lint`, `npm run build`. Manually test in a browser: resize the viewport below 768px width and confirm the canvas shrinks; open devtools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce" and confirm the component disappears entirely (not just stops animating).

- [ ] **Step 4: Commit.**

```bash
git add src/lib/avatarConfig.ts src/components/avatar/AvatarCompanion.tsx
git commit -m "feat(avatar): add mode detection, kill switch, and reduced-motion/WebGL fallbacks"
```

---

### Task L5.2: Opt-out toggle

**Files:**
- Create: `src/components/avatar/AvatarToggle.tsx`
- Modify: `src/components/ui/Navigation.tsx` (mount point — read the file first, place near the existing `ThemeToggle`)
- Modify: `src/components/avatar/AvatarCompanion.tsx`

**Interfaces:**
- Produces: `AvatarToggle` component — a button that flips the `avatar-opt-out` localStorage key and reloads the avatar's mode computation.

- [ ] **Step 1: Write the toggle**, following the exact same pattern as the existing `ThemeToggle.tsx` (localStorage + a custom event so `AvatarCompanion` can react without a full page reload):

```tsx
// src/components/avatar/AvatarToggle.tsx
'use client';

import { useEffect, useState } from 'react';
import { Sparkles, SparklesIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const OPT_OUT_STORAGE_KEY = 'avatar-opt-out';
export const AVATAR_TOGGLE_EVENT = 'avatar-opt-out-changed';

export function AvatarToggle({ className }: { className?: string }) {
  const [optedOut, setOptedOut] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      setOptedOut(localStorage.getItem(OPT_OUT_STORAGE_KEY) === 'true');
    } catch {
      // ignore — default false
    }
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = !optedOut;
    setOptedOut(next);
    try {
      localStorage.setItem(OPT_OUT_STORAGE_KEY, String(next));
    } catch {
      // localStorage unavailable — toggle still applies for this session via state,
      // it just won't persist across reloads
    }
    window.dispatchEvent(new CustomEvent(AVATAR_TOGGLE_EVENT, { detail: { optedOut: next } }));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        'relative inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-700 hover:bg-slate-100 dark:text-ink-secondary dark:hover:bg-surface-hover transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-signal-blue',
        className
      )}
      aria-label={mounted ? (optedOut ? 'Show 3D companion' : 'Hide 3D companion') : 'Toggle 3D companion'}
      title={mounted ? (optedOut ? 'Show 3D companion' : 'Hide 3D companion') : undefined}
    >
      {mounted && optedOut ? <SparklesIcon className="w-5 h-5" aria-hidden /> : <Sparkles className="w-5 h-5" aria-hidden />}
    </button>
  );
}
```

- [ ] **Step 2: Mount it in `Navigation.tsx`**, next to the existing `<ThemeToggle />` (read the file first — it's the same `<div className="flex items-center gap-1 relative z-10">` wrapper introduced during the dark-mode work):

```tsx
<div className="flex items-center gap-1 relative z-10">
  <AvatarToggle />
  <ThemeToggle />
  <button /* existing mobile hamburger button, unchanged */>
    ...
  </button>
</div>
```

Add the import: `import { AvatarToggle } from '@/components/avatar/AvatarToggle';`

- [ ] **Step 3: Make `AvatarCompanion` listen for the toggle event** so it hides/shows without a page reload. Modify the `useAvatarMode` hook from Task L5.1:

```tsx
useEffect(() => {
  // ... existing mode-computation logic from Task L5.1 ...

  const handleToggle = (event: Event) => {
    const optedOut = (event as CustomEvent<{ optedOut: boolean }>).detail.optedOut;
    if (optedOut) {
      setMode('hidden');
    } else if (!prefersReducedMotion && detectWebGLSupport()) {
      setMode(window.innerWidth < MOBILE_BREAKPOINT_PX ? 'simplified' : 'full');
    }
  };

  window.addEventListener(AVATAR_TOGGLE_EVENT, handleToggle);
  return () => window.removeEventListener(AVATAR_TOGGLE_EVENT, handleToggle);
}, [prefersReducedMotion]);
```

Add the import: `import { AVATAR_TOGGLE_EVENT } from '@/components/avatar/AvatarToggle';`

- [ ] **Step 4: Verify.** `npx tsc --noEmit`, `npm run lint`, `npm run build`, then `npm run dev` — click the new toggle in the nav, confirm the companion hides/shows immediately without a page reload, and that the choice persists across a manual page refresh.

- [ ] **Step 5: Commit.**

```bash
git add src/components/avatar/AvatarToggle.tsx src/components/avatar/AvatarCompanion.tsx src/components/ui/Navigation.tsx
git commit -m "feat(avatar): add opt-out toggle with live hide/show"
```

---

### Task L5.3: Mobile behavior — real device verification

**Files:** none new — this task is verification-only, with a possible small follow-up edit to `AvatarCompanion.tsx` depending on what real-device testing finds.

- [ ] **Step 1: Deploy the current state to a preview** (push the `dev` branch, or use a local network IP + a real phone on the same Wi-Fi — `npm run dev -- -H 0.0.0.0` and visit `http://<your-machine's-LAN-IP>:3000` from the phone).

- [ ] **Step 2: On a real mid-range Android or a few-years-old iPhone (not the newest flagship, not devtools emulation)**, check: does the `simplified` canvas maintain a usable frame rate? Does it noticeably drain battery or heat the device over ~2 minutes of scrolling? Does the opt-out toggle work correctly by touch?

- [ ] **Step 3: Decide the mobile animation-reduction mechanism** (spec §9's open item) based on what Step 2 finds:
  - If frame rate/battery is genuinely fine as-is: no further change needed, `simplified` mode staying "just smaller" is sufficient.
  - If it struggles: add a paused-idle-until-interaction behavior — modify `AvatarScene`'s animation `useEffect` (Task L2.2) to accept a `paused?: boolean` prop, and have `simplified` mode pass `paused` after the initial idle pose settles, resuming only briefly on each section change rather than animating continuously. Write this as a follow-up commit only if testing shows it's actually needed — don't add complexity preemptively.

- [ ] **Step 4: Document the actual finding** (not hypothetical) in this plan file's checkbox for future reference, then commit whatever code change (if any) Step 3 produced, with a commit message describing the real device tested and the actual observed behavior.

---

### Task L5.4: Clarity analytics events

**Files:**
- Modify: `src/components/avatar/AvatarCompanion.tsx`
- Modify: `src/components/avatar/AvatarToggle.tsx`
- Modify: `src/lib/clarity.ts` (read the file first — confirm the existing `CLARITY_EVENTS` export pattern before adding to it)

**Interfaces:**
- Produces: two new Clarity custom events, following this codebase's existing `case-study-view-{slug}`-style naming.

- [ ] **Step 1: Check the existing pattern.**

```bash
grep -n "CLARITY_EVENTS\|trackClarityEvent" src/lib/clarity.ts
```

Add two new event constants following whatever naming convention that file already uses (likely an object literal or enum — match it exactly, don't introduce a second convention).

- [ ] **Step 2: Fire `avatar-shown` once, on first mount when `mode !== 'hidden'`** in `AvatarCompanion.tsx`:

```tsx
useEffect(() => {
  if (mode !== 'hidden') {
    trackClarityEvent(CLARITY_EVENTS.AVATAR_SHOWN); // exact constant name per Step 1's actual convention
  }
}, [mode]);
```

- [ ] **Step 3: Fire `avatar-opt-out` when the user actually opts out** (not on every toggle click — only the opt-out direction is the meaningful product signal) in `AvatarToggle.tsx`'s `toggle` function:

```tsx
if (next) {
  trackClarityEvent(CLARITY_EVENTS.AVATAR_OPT_OUT);
}
```

- [ ] **Step 4: Verify.** `npx tsc --noEmit`, `npm run lint`, `npm run build`. Confirm in Clarity's dashboard (or via the browser network tab, watching for the Clarity beacon) that both events actually fire when expected — don't just trust the code compiles, confirm the event actually reaches Clarity.

- [ ] **Step 5: Commit.**

```bash
git add src/components/avatar/AvatarCompanion.tsx src/components/avatar/AvatarToggle.tsx src/lib/clarity.ts
git commit -m "feat(avatar): track shown/opt-out events in Clarity"
```

---

## Phase L6 — Full-site integration + QA pass

### Task L6.1: Mount into the real homepage, remove the test route

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/app/dev-avatar-test/`

**Interfaces:** none new — this task is pure integration of already-built pieces.

- [ ] **Step 1: Mount for real.** Read `src/app/page.tsx` fully. This is the same `dynamic(..., { ssr: false })` wrapping used temporarily in Task L3.2 Step 2 — keep it, don't switch to a plain import now that it's "final":

```tsx
import dynamic from 'next/dynamic';

const AvatarCompanion = dynamic(
  () => import('@/components/avatar/AvatarCompanion').then((m) => m.AvatarCompanion),
  { ssr: false }
);
// ...
      <Contact />
      <AvatarCompanion />
    </main>
    <Footer />
```

- [ ] **Step 2: Delete the test route.**

```bash
git rm -r src/app/dev-avatar-test/
```

- [ ] **Step 3: Verify.** `npx tsc --noEmit`, `npm run lint`, `npm run build`. Confirm `/dev-avatar-test/` returns a 404 in the built `out/` output, and the real homepage now shows the companion.

- [ ] **Step 4: Commit.**

```bash
git add src/app/page.tsx
git commit -m "feat(avatar): mount companion on the live homepage, remove test route"
```

---

### Task L6.2: GitHub Pages live verification

**Files:** none — verification only, per spec §6a's flagged "worth a concrete verification" item.

- [ ] **Step 1: Push to `dev`, confirm CI passes** (`gh run list --branch dev --limit 3`).

- [ ] **Step 2: Merge `dev` → `main`** per this repo's documented release process (`BRANCH_STRATEGY.md`) — same steps used earlier this session:

```bash
git checkout main
git pull origin main
git merge dev --no-edit
git push origin main
```

- [ ] **Step 3: Watch the deploy workflow, then check the actual live URL** (not local dev) — `https://patelsahil2k03.github.io/` — confirm the GLB loads and the companion renders exactly as it did locally. This is the concrete check spec §6a asked for: same-origin GLB serving, no basePath/CORS/MIME issue in practice, not just in theory.

- [ ] **Step 4: Report back** — if anything differs between local and the live GitHub Pages URL (a loading failure, a path issue, a slower-than-expected load), that's a real finding to fix before considering this phase done, not something to wave away as "probably fine in prod."

---

### Task L6.3: Full QA pass

**Files:** none — verification and sign-off only.

- [ ] **Step 1: Screenshot review** — both light and dark mode, desktop and a real mobile device (not just devtools), matching this session's established verification pattern for every other visual change.

- [ ] **Step 2: Confirm every constraint from spec §2 in the shipped state**: `prefers-reduced-motion` fully hides (not just visually pauses) the companion; the opt-out toggle works and persists; WebGL-unsupported gracefully hides; GLB file size is still within the lean-asset budget; the rest of the site works identically with the companion hidden via any of the above paths.

- [ ] **Step 3: Present the finished feature to the user** with screenshots from Step 1 and a summary of Step 2's checks, before considering Phase L complete. Ask directly whether the narration copy from Task L4.1 needs any edits now that it's seen in its real, live context — per the spec's stated review process, this was drafted but not yet formally approved.

- [ ] **Step 4: Update `docs/superpowers/plans/2026-08-19-portfolio-production-readiness.md`'s Phase L section** to mark L2-L6 complete, following the same completion-note pattern used for every other finished task in that document (what was actually built vs. planned, any deviations, final commit SHAs).
