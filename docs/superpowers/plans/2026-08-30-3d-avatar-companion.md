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

## ✅ Blocking precondition — resolved (asset pivot)

The original precondition (a Meshy-generated personal-likeness GLB) hit a real blocker: Meshy's export requires a paid tier. A free-tool workaround produced a structurally empty file (zero materials/textures/rigging/animations — confirmed by parsing it directly, not just by it looking grey). Per spec §6c, the project pivoted to the CC0-licensed `KayKit_Adventurers_2.0_FREE` pack instead. The precondition is satisfied with these actual files, verified (not assumed) to be properly textured, rigged, and animation-compatible:

- **Character:** `/home/lenovo/Downloads/KayKit_Adventurers_2.0_FREE/Characters/gltf/Ranger.glb` (473KB, 1 material with a real baseColorTexture, 1 skin/rig, 0 embedded animations by design)
- **Animation library:** `/home/lenovo/Downloads/KayKit_Adventurers_2.0_FREE/Animations/gltf/Rig_Medium/Rig_Medium_General.glb` (809KB, 15 clips — verified 24 matching skeleton bone names against Ranger's rig, confirming animation retargeting will work)

Combined asset budget: ~1.28MB, well within the lean-asset-budget constraint — `Rig_Medium_MovementBasic.glb` (walking/running/jumping, 674KB) is deliberately **not** included in v1, since no v1 pose mapping (spec §5) uses a movement clip; only relevant if the deferred "traveling companion" enhancement (spec §7) is built later.

Task L2.1 below copies both files in and sets up a swappable character-selection constant, so switching to a different KayKit character (or a future personal-likeness model) later is a one-line change.

---

## Phase L2 — Prototype spike (isolated test route)

*Validates visual quality, file size, and frame budget before anything is wired into the real homepage — per the spec's "prototype before committing" philosophy. Nothing in this phase touches `page.tsx` or any live route.*

### Task L2.1: Isolated test route + confirm both files load and retarget

**Files:**
- Create: `public/models/character-ranger.glb` (copied from the KayKit pack — see the resolved precondition above)
- Create: `public/models/animations-general.glb` (copied from the KayKit pack)
- Create: `src/lib/avatarConfig.ts`
- Create: `src/components/avatar/AvatarScene.tsx`
- Create: `src/app/dev-avatar-test/page.tsx`

**Interfaces:**
- Produces: `AVATAR_CHARACTER_PATH`, `AVATAR_ANIMATIONS_PATH` constants (the swap point for changing character later). `AvatarScene` component with props `{ className?: string }`, loading the character mesh and separately loading animation clips from the animation-library file, binding them to the character's own skeleton (standard Mixamo-style retargeting — verified compatible in spec §6c by matching bone names directly, not assumed). Later tasks (L2.2 onward) extend this same file.

- [ ] **Step 1: Copy both files into place.**

```bash
mkdir -p public/models
cp "/home/lenovo/Downloads/KayKit_Adventurers_2.0_FREE/Characters/gltf/Ranger.glb" public/models/character-ranger.glb
cp "/home/lenovo/Downloads/KayKit_Adventurers_2.0_FREE/Animations/gltf/Rig_Medium/Rig_Medium_General.glb" public/models/animations-general.glb
ls -lh public/models/
```

Confirm the combined size is close to the ~1.28MB noted in the precondition section above — this is the lean-asset-budget checkpoint (spec §2).

- [ ] **Step 2: Write `avatarConfig.ts`** with the swappable character-selection constant (this file is extended later in Task L5.1 with `AVATAR_ENABLED` and WebGL detection — created here, not there):

```typescript
// src/lib/avatarConfig.ts

/**
 * Swap these two paths to change which character the companion uses.
 * Any character from the KayKit Adventurers pack works here as long as
 * it shares the animation library's skeleton bone names (verified true
 * for every character in the pack — see spec section 6c). A future
 * personal-likeness model (e.g. from Meshy) would also work here, as
 * long as it's rigged with a compatible skeleton.
 */
export const AVATAR_CHARACTER_PATH = '/models/character-ranger.glb';
export const AVATAR_ANIMATIONS_PATH = '/models/animations-general.glb';
```

- [ ] **Step 3: Write `AvatarScene.tsx`**, loading the character for its mesh/skeleton and the animation file separately for its clips:

```tsx
'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model() {
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  // Loaded here only to confirm it resolves — its own animations/scene
  // are used starting in Task L2.2, not yet in this step.
  useGLTF(AVATAR_ANIMATIONS_PATH);
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

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
```

- [ ] **Step 4: Write the unlisted test route.**

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

- [ ] **Step 5: Verify.**

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run dev
```

Run `npm run build` here specifically (not just `npm run dev`) — this is the concrete check that the `dynamic(..., { ssr: false })` wrapping actually prevents the static-export prerender pass from choking on `Canvas`/`useGLTF`'s browser-only globals. If `npm run build` fails at this step, that's the bug to fix before moving on, not something to defer.

Then open `http://localhost:3000/dev-avatar-test/` in a browser — confirm the character renders (even in a static bind pose, no animation yet — that's L2.2). If nothing renders, check the browser console for a `GLTFLoader` error before proceeding (common causes: wrong path, files not actually placed under `public/models/`, or a file corrupted in transfer — verify with `file public/models/character-ranger.glb` reporting a valid glTF binary).

- [ ] **Step 6: Stop the dev server, propose to user with a screenshot, then commit.**

```bash
git add public/models/character-ranger.glb public/models/animations-general.glb src/lib/avatarConfig.ts src/components/avatar/AvatarScene.tsx src/app/dev-avatar-test/page.tsx
git commit -m "feat(avatar): load KayKit Ranger character in isolated test route"
```

---

### Task L2.2: Idle animation playback

**Files:**
- Modify: `src/components/avatar/AvatarScene.tsx`

**Interfaces:**
- Consumes: `AVATAR_CHARACTER_PATH`, `AVATAR_ANIMATIONS_PATH` from Task L2.1.
- Produces: `AvatarScene` now plays a continuous idle animation (`Idle_A`, per spec §5's finalized pose table — a real, known clip name, not a guess). Exposes no new props yet — this task validates the retargeted-animation pipeline works before Task L3.2 wires it to real section data.

- [ ] **Step 1: Confirm the animation file's actual clip names match the spec.** The clip names are already known (spec §5/§6c — `Idle_A`, `Idle_B`, `Interact`, `PickUp`, `Throw`, `Use_Item`, `Spawn_Air`, `Spawn_Ground`, `T-Pose`, plus `Hit_*`/`Death_*` which this plan deliberately never uses), verified directly by parsing the GLB during this session — not left to discover at runtime. Sanity-check this once with a quick Python check before writing any component code (faster than a browser round-trip):

```bash
python3 -c "
import struct, json
with open('public/models/animations-general.glb', 'rb') as f:
    data = f.read()
offset = 12
while offset < len(data):
    chunk_len, chunk_type = struct.unpack('<II', data[offset:offset+8])
    if chunk_type.to_bytes(4, 'little') == b'JSON':
        gltf = json.loads(data[offset+8:offset+8+chunk_len])
        print([a['name'] for a in gltf.get('animations', [])])
        break
    offset += 8 + chunk_len + (4 - chunk_len % 4 if chunk_len % 4 else 0)
"
```

Expected output includes `Idle_A`. If it doesn't, stop and re-check the file copied in Task L2.1 Step 1 before writing any more code against a wrong assumption.

- [ ] **Step 2: Load the character and animation clips separately, bind them via retargeting, and play `Idle_A` on a loop.**

```tsx
'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import type { Group } from 'three';
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model() {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  const { animations } = useGLTF(AVATAR_ANIMATIONS_PATH);
  // useAnimations binds these foreign clips to `group`'s own hierarchy by
  // matching bone/node names — this is the retargeting step verified
  // compatible in spec section 6c (24 matching bone names between the
  // character and the animation library).
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions['Idle_A'];
    action?.reset().fadeIn(0.3).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions]);

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

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
```

- [ ] **Step 3: Verify.** `npm run dev`, confirm the character visibly animates (breathing/idle motion, not a frozen bind pose) at `/dev-avatar-test/`. Open the browser's performance/FPS overlay (devtools → Rendering → "Frame Rendering Stats" in Chrome) and confirm it holds close to 60fps on your dev machine — this is the frame-budget checkpoint from the spec's constraints (§2). If the mesh visibly deforms incorrectly (limbs stretching wrong, geometry tearing) rather than animating cleanly, that's a sign the retargeting bind failed silently — re-check Step 1's bone-name output against what Task L2.1 actually copied in.

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
import { AVATAR_CHARACTER_PATH, AVATAR_ANIMATIONS_PATH } from '@/lib/avatarConfig';

function Model({ pose }: { pose?: string }) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF(AVATAR_CHARACTER_PATH);
  const { animations } = useGLTF(AVATAR_ANIMATIONS_PATH);
  const { actions, names } = useAnimations(animations, group);
  const currentActionName = useRef<string | null>(null);

  useEffect(() => {
    if (names.length === 0) return;
    const targetName = pose && names.includes(pose) ? pose : 'Idle_A';
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

useGLTF.preload(AVATAR_CHARACTER_PATH);
useGLTF.preload(AVATAR_ANIMATIONS_PATH);
```

Note the fallback changed from `names[0]` (Task L2.2's "assume the first clip is idle") to the literal `'Idle_A'` — now that the real clip names are known, the fallback should name the actual idle clip rather than guess positionally.

- [ ] **Step 2: Add temporary pose-switch buttons to the test route**, using two real clip names from spec §5's table — `Idle_A` (the default) and `Interact` (the Experience-section pose, a good visually-distinct test case):

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
        <button onClick={() => setPose('Idle_A')} className="px-4 py-2 bg-white border rounded">Idle</button>
        <button onClick={() => setPose('Interact')} className="px-4 py-2 bg-white border rounded">Interact</button>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify.** `npm run dev`, click between the two buttons at `/dev-avatar-test/`, confirm the character visibly crossfades between the idle and interact poses without snapping or T-posing mid-transition.

- [ ] **Step 4: Commit.**

```bash
git add src/components/avatar/AvatarScene.tsx src/app/dev-avatar-test/page.tsx
git commit -m "feat(avatar): support pose crossfading with graceful fallback"
```

- [ ] **Step 5: DECISION GATE — propose to the user before proceeding to L3.** Take a screenshot of the working prototype (both `Idle_A` and `Interact` poses), report the combined asset size and frame-rate observations. Ask explicitly: does the retargeted animation look right — no visible mesh distortion, clean crossfades — or does something need fixing (a different character from the pack, a different pose mapping) before more work goes on top of it? **Do not proceed to Phase L3 without an explicit yes** — this is the single checkpoint the whole "prototype before committing" philosophy exists for.

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

// Per spec section 5's finalized mapping against KayKit's real clip
// names (Idle_A/Idle_B/Interact/PickUp/Throw/Use_Item/Spawn_Air) —
// anything not present falls back to Idle_A via AvatarScene's own
// fallback logic. Superseded by avatarNarration.ts in Task L4.2, which
// becomes the single source of truth for both pose and copy together.
const SECTION_POSES: Record<string, string> = {
  home: 'Idle_A',
  about: 'Idle_B',
  experience: 'Interact',
  'case-studies': 'Use_Item',
  skills: 'PickUp',
  projects: 'Throw',
  publications: 'Idle_A',
  achievements: 'Spawn_Air',
  contact: 'Idle_B',
};

export function AvatarCompanion() {
  const activeSection = useActiveSection(HOMEPAGE_SECTION_IDS);
  const pose = SECTION_POSES[activeSection] ?? 'Idle_A';

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

// Pose values match spec section 5's finalized mapping against KayKit's
// real animation clip names, not a placeholder — Idle_A/Idle_B/Interact/
// Use_Item/PickUp/Throw/Spawn_Air, deliberately never Hit_*/Death_*.
export const avatarNarration: AvatarNarrationEntry[] = [
  {
    sectionId: 'home',
    pose: 'Idle_A',
    thought: "Hi — I'm the 3D-sized version of Sahil. Scroll on, I'll keep up.",
  },
  {
    sectionId: 'about',
    pose: 'Idle_B',
    thought: "Production AI/ML systems, not slideware — that's the actual story here.",
  },
  {
    sectionId: 'experience',
    pose: 'Interact',
    thought: 'Two years in, already the person other teams ping when something breaks.',
  },
  {
    sectionId: 'case-studies',
    pose: 'Use_Item',
    thought: 'These are real systems at real scale, not demos — worth a proper look.',
  },
  {
    sectionId: 'skills',
    pose: 'PickUp',
    thought: "50+ technologies — still figuring out how to hold all of them at once.",
  },
  {
    sectionId: 'projects',
    pose: 'Throw',
    thought: 'Side projects that occasionally out-ambition the day job.',
  },
  {
    sectionId: 'publications',
    pose: 'Idle_A',
    thought: 'Actual peer review, actual publication — this part took real work.',
  },
  {
    sectionId: 'achievements',
    pose: 'Spawn_Air',
    thought: 'A few wins worth mentioning — on the field and off it.',
  },
  {
    sectionId: 'contact',
    pose: 'Idle_B',
    thought: "Go ahead, say hi — I'll be right here.",
  },
];

const FALLBACK_ENTRY = avatarNarration[0];

export function getNarrationForSection(sectionId: string): AvatarNarrationEntry {
  return avatarNarration.find((entry) => entry.sectionId === sectionId) ?? FALLBACK_ENTRY;
}
```

Note: `pose` values here already match `AvatarCompanion.tsx`'s `SECTION_POSES` map from Task L3.2 (both come from spec §5's same table) — Task L4.2 below consolidates them into this one file as the single source of truth, removing the temporary duplication.

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
- Modify: `src/lib/avatarConfig.ts` (already created in Task L2.1 with the character-path constants — append to it, don't recreate it)

**Interfaces:**
- Produces: `AVATAR_ENABLED` constant (the kill-switch from spec §6b), `detectWebGLSupport(): boolean`, and `AvatarCompanion`'s internal `mode: 'full' | 'simplified' | 'hidden'` computation.

- [ ] **Step 1: Append the kill-switch + WebGL detection helper to the existing `avatarConfig.ts`** (read the file first — it currently has just the two path constants from Task L2.1):

```typescript
// Add below the existing AVATAR_CHARACTER_PATH/AVATAR_ANIMATIONS_PATH exports

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
