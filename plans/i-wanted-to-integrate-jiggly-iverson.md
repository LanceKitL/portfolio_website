# System Font Stack (SF Pro on Apple Devices)

## Context

The portfolio currently loads Inter from Google Fonts. The user wants to use Apple's SF Pro font. SF Pro is proprietary and cannot be self-hosted or loaded from a CDN, but it is available as a system font on all Apple devices via `-apple-system` / `BlinkMacSystemFont`. This is exactly what apple.com itself uses. Switching to the system font stack removes the Google Fonts network request, renders SF Pro natively on macOS/iOS, and falls back to Segoe UI on Windows and the OS default on other platforms.

## Changes

### `src/index.css`

1. Remove the `@import url('https://fonts.googleapis.com/...')` line for Inter entirely.
2. Update `--font-sans` in the `@theme` block to the system stack:

```css
--font-sans: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
```

No other changes needed. `body` already sets `font-family: var(--font-sans)` and every element in `App.tsx` inherits from it.

## Files to Modify

- `src/index.css` only — two-line change

## Verification

1. On a Mac/iPhone: headings and body text should render in SF Pro
2. On Windows: falls back to Segoe UI
3. No flash of Inter during load (Google Fonts request is gone)
4. Letter-spacing and weight classes (`font-bold`, `font-semibold`, etc.) remain unchanged — SF Pro respects them identically to Inter

---

# Card Expansion Stutter Fix

## Context

Clicking a project card to expand it produces visible jitter/stutter. Four concrete causes were identified through code inspection:

1. **`-translate-x-1/2` CSS class conflicts with Motion's layout transform** on the expanded card (`motion.div` at line 363). Tailwind writes `transform: translateX(-50%)` via CSS; Motion simultaneously writes its own `transform` inline for the layout animation. They fight on every frame, causing the card to jump during the morph.

2. **`overflow-hidden` on the layout-animated `motion.article` root** (line 287). `overflow: hidden` on a `layoutId` element forces the browser to recalculate clip bounds on every animation frame as the card morphs size, causing heavy repaints and visual stuttering.

3. **`overflow-hidden` on the nested `motion.div` image wrapper** (lines 331 / 378). Same overflow-clip repaint cost one level deeper, compounding the issue.

4. **`transition-all duration-500` on the `<img>` inside the card** (line 334). `transition-all` intercepts the transform changes Motion is driving and creates a CSS transition that conflicts with the JS animation. Only opacity and scale need to transition on hover.

## Fixes

### Fix 1 — Remove `-translate-x-1/2` from expanded card, center with `left`/`transform` in `style`

The expanded `motion.div` currently has both a CSS `-translate-x-1/2` class and `style={{ originX: 0.5, originY: 0 }}`. Replace the Tailwind centering approach with an inline `style` that Motion can own:

```tsx
// Before
<motion.div
  className="fixed z-[110] top-[4vh] left-1/2 -translate-x-1/2 w-[min(680px,92vw)] ..."
  style={{ originX: 0.5, originY: 0 }}
>

// After — Motion owns all transforms; CSS only handles fixed position + sizing
<motion.div
  className="fixed z-[110] w-[min(680px,92vw)] ..."
  style={{ top: "4vh", left: "50%", x: "-50%", originX: 0.5, originY: 0 }}
>
```

Using `x: "-50%"` in the Motion `style` prop lets Motion manage the centering transform as part of its own transform stack, eliminating the conflict.

### Fix 2 — Remove `overflow-hidden` from `motion.article`, use `rounded-2xl` with a clip wrapper

Replace `overflow-hidden` on the card root with a `clip-path` or simply let `border-radius` handle visual rounding without hard clipping. The simplest approach: remove `overflow-hidden` from the `motion.article` className and add `will-change-transform` to help the GPU promote the element:

```tsx
// Before
className="group grid ... rounded-2xl overflow-hidden border ..."

// After
className="group grid ... rounded-2xl border ..."
```

The `border-radius` still rounds the corners visually. The only visible difference is that content won't be hard-clipped mid-animation — which is actually desirable during the morph.

### Fix 3 — Remove `overflow-hidden` from the `layoutId` image wrapper

Both the compact card image `motion.div` and the expanded image `motion.div` carry `overflow-hidden`. Remove it from both:

```tsx
// Compact card image wrapper
// Before
<motion.div layoutId={`card-image-${project.id}`} className="bg-[#f0f0f5] dark:bg-[#111] overflow-hidden">
// After
<motion.div layoutId={`card-image-${project.id}`} className="bg-[#f0f0f5] dark:bg-[#111]">

// Expanded overlay image wrapper
// Before
<motion.div layoutId={`card-image-${selectedId}`} className="w-full h-[260px] overflow-hidden rounded-t-3xl ...">
// After
<motion.div layoutId={`card-image-${selectedId}`} className="w-full h-[260px] rounded-t-3xl ...">
```

### Fix 4 — Replace `transition-all` with `transition-opacity` on the card `<img>`

```tsx
// Before
className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500"

// After — only opacity transitions via CSS; scale is removed (Motion handles it in the expanded view)
className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
```

## Files to Modify

- `src/App.tsx` — four targeted edits, all within the Work section and the overlay block

## Verification

1. Click a card — expansion should be smooth with no jump, jitter, or frame drop
2. The card should morph cleanly from its grid position to the overlay position
3. Image should still be visually rounded on hover (radius from parent)
4. Dismissing the overlay should collapse back to the card smoothly
5. Hover scale on the card image is removed — confirm hover only changes opacity

---

# Blur-in / Blur-out on Card Expansion

## Context

When a project card is clicked and expands into the overlay, the user wants a blur animation: the content inside the expanded card blurs in (starts blurry, sharpens) on open, and blurs out (sharpens → blurry) on close. This gives the expansion a premium, cinematic feel that matches the BlurText animation already on the hero.

The existing overlay uses `layoutId` morphing for the card shell, image, title, and category. The extra detail content (`longDescription`, tags, footer) already fades+slides in via `initial/animate`. We extend that with a `filter: blur()` transition.

## What to Animate and How

Three layers inside the expanded card get blur treatment:

### Layer 1 — Image hero (`motion.div` with `layoutId="card-image-{id}"`)
Add `initial` / `exit` blur to the image so it blurs in as the card opens and blurs out as it closes. Since this element uses `layoutId`, we add blur through the `transition` on the layout animation rather than initial/exit (layout animations don't run initial/exit). Instead, wrap the `<img>` inside the motion.div with its own `motion.img`:

```tsx
<motion.div layoutId={`card-image-${selectedId}`} className="w-full h-[260px] overflow-hidden rounded-t-3xl bg-[#f0f0f5] dark:bg-[#111]">
  <motion.img
    src={selectedProject.image}
    alt={selectedProject.title}
    className="w-full h-full object-cover"
    initial={{ filter: "blur(12px)", scale: 1.04 }}
    animate={{ filter: "blur(0px)", scale: 1 }}
    exit={{ filter: "blur(12px)", scale: 1.04 }}
    transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
  />
</motion.div>
```

### Layer 2 — Detail content (`motion.div` with `initial/animate`)
The long description block already uses `initial={{ opacity: 0, y: 12 }}`. Extend it to also start blurred:

```tsx
<motion.div
  initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
  exit={{ opacity: 0, filter: "blur(8px)" }}
  transition={{ duration: 0.35, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
>
```

### Layer 3 — Title and category (already using `layoutId`)
These morph via shared-element layout animation. Add a `filter` keyframe by animating directly on the motion elements. Since they use `layoutId`, apply blur via `style` interpolation using a `useAnimate` approach — simpler: just add `initial` and `exit` blur props; Motion will run them independently of the layout animation:

```tsx
<motion.p
  layoutId={`card-category-${selectedId}`}
  className="text-[12px] text-[#6e6e73] ..."
  initial={{ filter: "blur(6px)" }}
  animate={{ filter: "blur(0px)" }}
  exit={{ filter: "blur(6px)" }}
  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
>

<motion.h3
  layoutId={`card-title-${selectedId}`}
  className="text-[32px] font-bold ..."
  initial={{ filter: "blur(8px)" }}
  animate={{ filter: "blur(0px)" }}
  exit={{ filter: "blur(8px)" }}
  transition={{ duration: 0.4, delay: 0.05, ease: [0.25, 0.1, 0.25, 1] }}
>
```

### Scrim — no change needed
The scrim already fades in/out with opacity. No blur added here.

## Files to Modify

- `src/App.tsx` only — four targeted edits inside the `AnimatePresence` overlay block:
  1. `motion.img` inside the image hero `motion.div`
  2. `motion.p` (category) — add `initial`, `animate`, `exit` blur props
  3. `motion.h3` (title) — add `initial`, `animate`, `exit` blur props
  4. Detail `motion.div` — extend existing `initial`/`animate` to include `filter: blur()`

## Verification

1. Click a card — image, title, category, and description all blur in smoothly
2. Click scrim or close — those same elements blur out before the overlay exits
3. The layout morph (card shell expanding) still plays correctly alongside the blur
4. No jank or flicker on the title/category which use both `layoutId` and blur props simultaneously

---

# BlurText Hero Animation

## Context

The user wants to apply the ReactBits BlurText animation to the hero section. BlurText animates each word (or character) individually: they start blurred and offset, then clear and settle in sequence with a stagger delay. The component uses an `IntersectionObserver` internally to trigger once in view, and is built on `motion/react` — the same package already in the project.

The hero currently uses simple `motion.h1` and `motion.p` fade-up animations. We will replace those with a self-contained `BlurText` component that produces the word-by-word blur-in effect.

## Implementation

### 1. Create `src/components/BlurText.tsx`

Paste the exact ReactBits implementation, converting to TypeScript:

```tsx
import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from: Record<string, unknown>, steps: Record<string, unknown>[]) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap((s) => Object.keys(s))]);
  const keyframes: Record<string, unknown[]> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, unknown>;
  animationTo?: Record<string, unknown>[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = "",
  delay = 120,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p ref={ref} className={className} style={{ display: "flex", flexWrap: "wrap" }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };
        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? " " : segment}
            {animateBy === "words" && index < elements.length - 1 && " "}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
```

### 2. Apply to `src/App.tsx` hero section

Replace the two `motion.h1` and `motion.p` elements with `BlurText`. The existing delay-chain approach (badge → h1 → p → skills) stays intact via the `delay` prop offset on each instance.

**Replace `motion.h1`:**
```tsx
// Remove:
<motion.h1 className="text-[56px] font-bold ..." initial=... animate=... transition=...>
  Design engineer.<br /><span className="text-[#6e6e73]">Builder at heart.</span>
</motion.h1>

// Add (two separate BlurText calls so each line has its own colour):
<div className="mb-6">
  <BlurText
    text="Design engineer."
    delay={80}
    className="text-[56px] font-bold leading-[1.05] tracking-[-0.03em]"
    direction="bottom"
    stepDuration={0.4}
  />
  <BlurText
    text="Builder at heart."
    delay={80}
    className="text-[56px] font-bold leading-[1.05] tracking-[-0.03em] text-[#6e6e73]"
    direction="bottom"
    stepDuration={0.4}
    animationFrom={{ filter: "blur(10px)", opacity: 0, y: 30 }}
  />
</div>
```

**Replace `motion.p`:**
```tsx
// Remove:
<motion.p className="text-[17px] text-[#6e6e73] ..." initial=... animate=... transition=...>
  I craft interfaces...
</motion.p>

// Add:
<BlurText
  text="I craft interfaces that feel inevitable. Based in San Francisco, working across iOS, web, and systems."
  delay={40}
  className="text-[17px] text-[#6e6e73] leading-relaxed max-w-md mb-10"
  direction="bottom"
  stepDuration={0.3}
/>
```

Since `BlurText` uses its own `IntersectionObserver` with `threshold: 0.1`, the hero is visible immediately on load — it fires on mount. Remove the `initial/animate/transition` props that were on `motion.h1` and `motion.p`; they are no longer needed.

The badge pill and skills stagger keep their existing `motion.div` animations unchanged.

## Files to Modify / Create

- **Create:** `src/components/BlurText.tsx`
- **Edit:** `src/App.tsx` — import `BlurText`, replace `motion.h1` and `motion.p` in the hero

## No new dependencies

`motion/react` is already installed. No extra packages needed.

## Verification

1. Refresh the page — hero headline words should blur-in word-by-word from bottom
2. Second line ("Builder at heart.") follows right after
3. Paragraph body text blurs in with a tighter stagger
4. Badge pill and skill pills continue their existing fade-up entrance unchanged
5. Dark mode: text colours remain correct (BlurText inherits className colours)
6. No layout shift — `will-change-[transform,filter,opacity]` on each span prevents reflow

---

# App Store Card Expansion — Selected Work Section

## Context

The user wants to apply the motion.dev "App Store" interaction pattern to the "Selected Work" section. This pattern — made famous by the iOS App Store — lets a card expand into a full-detail overlay when clicked, then collapse back smoothly. The key technique is `layoutId`: the same ID shared between the compact card and the expanded overlay tells Motion to morph one into the other even though they are separate DOM elements. `AnimatePresence` handles unmounting so the collapse animation plays before the overlay is removed.

Currently, project cards are `motion.article` elements in a vertical stack with only scroll-reveal and hover-lift animations. No expansion behaviour exists.

---

## Implementation Plan

### State

Add `selectedId: number | null` to the App component (alongside existing `dark`, `sent`, etc.).

```tsx
const [selectedId, setSelectedId] = useState<number | null>(null);
```

### Card grid — compact cards with `layoutId`

Each card becomes clickable. Key motion props:
- `layoutId={`card-${project.id}`}` on the `motion.article` wrapper — this is the shared ID that morphs into the overlay
- `onClick={() => setSelectedId(project.id)}`
- Keep existing `whileInView`, `whileHover`, `transition` props

Inside each card, give `layoutId` to sub-elements so they morph individually:
- `motion.div layoutId={`card-image-${project.id}`}` — image container
- `motion.h3 layoutId={`card-title-${project.id}`}` — title
- `motion.p layoutId={`card-category-${project.id}`}` — category line

### Expanded overlay

When `selectedId !== null`, render a full-screen overlay via `AnimatePresence`:

```tsx
<AnimatePresence>
  {selectedId && (() => {
    const project = PROJECTS.find(p => p.id === selectedId)!
    return (
      <>
        {/* Scrim — fades in behind the card */}
        <motion.div
          key="scrim"
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedId(null)}
        />

        {/* Expanded card — morphs from the compact card */}
        <motion.div
          key={`expanded-${selectedId}`}
          layoutId={`card-${selectedId}`}
          className="fixed z-[110] top-[5vh] left-1/2 -translate-x-1/2 w-[min(680px,92vw)] max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#0d0d0d] shadow-2xl"
        >
          {/* Image hero */}
          <motion.div layoutId={`card-image-${selectedId}`} className="w-full h-[280px] overflow-hidden rounded-t-3xl bg-[#f0f0f5] dark:bg-[#111]">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Content */}
          <div className="p-8">
            <motion.p layoutId={`card-category-${selectedId}`} className="text-[12px] text-[#6e6e73] uppercase tracking-widest mb-2">
              {project.category}
            </motion.p>
            <motion.h3 layoutId={`card-title-${selectedId}`} className="text-[32px] font-bold tracking-[-0.02em] mb-4">
              {project.title}
            </motion.h3>
            {/* Extended content — no layoutId, animates in with opacity */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
              <p className="text-[16px] text-[#6e6e73] leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[11px] font-medium text-[#6e6e73] border border-[#d2d2d7] dark:border-[#424245] px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setSelectedId(null)}
                className="w-8 h-8 rounded-full bg-[#f5f5f7] dark:bg-[#1c1c1e] flex items-center justify-center text-[#6e6e73] absolute top-4 right-4"
                aria-label="Close"
              >✕</button>
            </motion.div>
          </div>
        </motion.div>
      </>
    )
  })()}
</AnimatePresence>
```

### Body scroll lock

When overlay is open, prevent background scroll:
```tsx
useEffect(() => {
  document.body.style.overflow = selectedId ? 'hidden' : '';
  return () => { document.body.style.overflow = ''; };
}, [selectedId]);
```

### Layout animation on the card grid

Wrap the card list container in `<motion.div layout>` so the remaining cards don't jump when one is "selected" (they stay in place since we're using a fixed overlay, not removing the card — so this may not be needed, but add `layout` to each `motion.article` to let Motion manage any positional shifts).

### Close on Escape key

```tsx
useEffect(() => {
  const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedId(null); };
  window.addEventListener('keydown', handler);
  return () => window.removeEventListener('keydown', handler);
}, []);
```

---

## Files to Modify

- `src/App.tsx` only

## New imports needed

No new packages — `motion`, `AnimatePresence` are already imported from `motion/react`.  
Add `layoutId` prop usage to existing `motion.*` elements.

---

## Verification

1. Click any project card — it should expand into a full overlay with a smooth morph animation
2. Click the scrim or the ✕ button — overlay collapses back into the card
3. Press Escape — overlay closes
4. Dark mode: overlay background matches dark theme
5. On mobile-width viewport: overlay fills most of the screen with `92vw` width
6. Scroll reveal still fires on initial page load (cards still use `whileInView`)

---

# Motion.dev Integration Plan (completed)

## Context

The portfolio currently uses only CSS transitions and Tailwind hover utilities for animation. The user wants to integrate motion.dev (`motion` package) to add purposeful, physics-driven animations that elevate the Apple-style design feel — entrance reveals, scroll-triggered staggering, gesture feedback, and smooth page-level transitions.

## Package

Install: `motion` (imports from `"motion/react"` for React components)

## Animations to Apply

### 1. Nav — Slide-down entrance
- Wrap the `<nav>` with `motion.nav`
- `initial={{ y: -20, opacity: 0 }}` → `animate={{ y: 0, opacity: 1 }}`
- `transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}`

### 2. Hero — Staggered text + portrait reveal
- Wrap hero children in `motion.div` elements with staggered `delay` values
- Availability badge: `initial={{ opacity: 0, y: 10 }}` → `animate={{ opacity: 1, y: 0 }}`, delay 0.1s
- H1 headline: same, delay 0.2s
- Body copy: delay 0.3s
- Skill pills: `stagger(0.05)` via a wrapping `motion.div` with `variants` container/item pattern
- Portrait: `initial={{ opacity: 0, scale: 0.96 }}` → `animate={{ opacity: 1, scale: 1 }}`, delay 0.25s

### 3. Project cards — Scroll-triggered reveal
- Convert each `<article>` to `motion.article`
- `initial={{ opacity: 0, y: 32 }}` + `whileInView={{ opacity: 1, y: 0 }}`
- `viewport={{ once: true, margin: "-80px" }}`
- `transition={{ duration: 0.5, delay: index * 0.1 }}`
- Add `whileHover={{ y: -3 }}` for subtle lift (replaces current CSS shadow-only hover)

### 4. Achievement grid — Staggered inView
- Wrap the grid items with `motion.div`
- Use `variants` container/item pattern:
  - Container: `visible: { transition: { staggerChildren: 0.07 } }`
  - Item: `hidden: { opacity: 0, y: 16 }` → `visible: { opacity: 1, y: 0 }`
- `whileInView="visible"` + `viewport={{ once: true }}`

### 5. Stats row — Count-up on scroll
- Each stat block as `motion.div` with `whileInView` fade-up, stagger 0.12s delay

### 6. Contact section — Slide-in from sides
- Left column (contact links): `initial={{ opacity: 0, x: -24 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- Right column (form): `initial={{ opacity: 0, x: 24 }}` → `whileInView={{ opacity: 1, x: 0 }}`
- `viewport={{ once: true }}`

### 7. Form success state — AnimatePresence crossfade
- Wrap the `{sent ? <SuccessView> : <Form>}` conditional with `<AnimatePresence mode="wait">`
- Each branch gets `motion.div` with `initial={{ opacity: 0, scale: 0.96 }}` / `animate={{ opacity: 1, scale: 1 }}` / `exit={{ opacity: 0, scale: 0.96 }}`

### 8. Scroll progress indicator
- Add a thin `motion.div` fixed at the top (below nav, `z-40`, height 2px, `#1d1d1f` / white in dark)
- `useScroll()` → `scaleX: scrollYProgress`, `transformOrigin: "left"`

## Files to Modify

- `package.json` — add `motion` dependency (via install)
- `src/App.tsx` — apply all motion primitives above

## Variants Pattern (reuse across sections)

```tsx
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
```

## Verification

1. Dev server is already running — preview updates on save
2. Check nav slides in on page load
3. Scroll through each section and confirm reveals fire once
4. Hover project cards — confirm y-lift
5. Submit the contact form and confirm the crossfade success animation
6. Scroll progress bar should track page scroll position
7. Toggle dark mode and confirm progress bar color flips correctly
