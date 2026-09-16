# Update: Hero photo → muted video

## Context
Replace the static `<img>` in the hero section with the user-supplied video (`src/imports/me.mp4`). The video should match the existing container exactly — 220×220px, `rounded-[28px]`, cropped to fill — auto-play, loop, muted, and `playsInline` for mobile. No other sections change.

## File to modify
`src/App.tsx` — hero image block (lines ~232–237)

## Change
Replace:
```jsx
<img
  src="https://images.unsplash.com/..."
  alt="Lance"
  className="w-full h-full object-cover"
/>
```
With:
```jsx
<video
  src="/src/imports/me.mp4"
  autoPlay
  muted
  playsInline
  className="w-full h-full object-cover"
/>
```

The container `div` (`w-[220px] h-[220px] rounded-[28px] overflow-hidden`) already clips and rounds the video — no extra CSS needed. `object-cover` on a `<video>` works the same as on `<img>`. `playsInline` prevents iOS from forcing fullscreen. `muted` is required by browsers for autoplay to work.

## Verification
Preview panel should show the video playing silently and looping inside the rounded square, cropped to fill, at all viewport sizes.

---

# Original plan

# Context

Personalizing the existing portfolio template (currently "Alex Chen") for Lance — a Software Developer / UI/UX Designer from Quezon City, Philippines, open to part-time / project-based roles. All content replacements are confined to `src/App.tsx`; no structural changes to routing, CSS, or other files are needed.

---

## Changes to `src/App.tsx`

### 1. Nav — name
`Alex Chen` → `Lance`

### 2. Hero — remove "Available for work" badge
Delete the entire `motion.div` block (lines 181–189) that renders the green-dot "Available for work" pill.

### 3. Hero — headline & subtitle
- Line 1: `"Design engineer."` → `"Developer & Designer."`
- Line 2: `"Builder at heart."` → keep or change to `"Builder at heart."` (fits well, keep)
- Subtitle: update to `"I build full-stack web apps with clean, thoughtful interfaces. Based in Quezon City, Philippines — open to part-time and project-based work."`

### 4. Hero — location & availability line
- Location: `"San Francisco, CA"` → `"Quezon City, Philippines"`
- Role line: `"Open to full-time roles"` → `"Open to part-time / project-based"`

### 5. Skills
Replace `["Swift", "TypeScript", "Go", "React", "Figma", "PostgreSQL"]` with:
`["Python", "Flask", "Svelte", "React", "Laravel", "Tailwind", "Figma", "Shell"]`

### 6. Projects (PROJECTS array)
Replace all three placeholder projects with Lance's three real projects:

**AutoMatik**
- category: `"Fullstack · Project Manager"`
- year: `"2024"`
- description: `"Car dealership management system covering the entire dealership process — customer self-portal, AI chatbot for inquiries, push notifications, and JWT + session security."`
- longDescription: full narrative explaining scope (customer portal, AI chatbot, push notifications, JWT/session auth)
- tags: `["Python", "Flask", "Svelte", "Tailwind"]`
- image: keep existing Unsplash URL (slot 1) — user will replace later

**Tilao Corp.**
- category: `"Fullstack · ERP"`
- year: `"2024"`
- description: `"ERP prototype for a clothing manufacturing company covering production and sales workflows with a clean, responsive interface."`
- longDescription: narrative about ERP scope for manufacturing
- tags: `["React", "Tailwind"]`
- image: keep existing Unsplash URL (slot 2)

**SciLab**
- category: `"Fullstack · Offline-first"`
- year: `"2023"`
- description: `"Offline-first smart inventory management for schools, bundled with a shell script that auto-launches the stack — no technical knowledge required."`
- longDescription: narrative about offline-first design, shell launcher, school context
- tags: `["Shell", "Laravel", "Tailwind"]`
- image: keep existing Unsplash URL (slot 3)

### 7. Achievements (ACHIEVEMENTS array)
Replace all six entries with Lance's real achievements:

| icon | title | detail |
|---|---|---|
| `★` | Web Technologies Regionals | Bronze Medalist · 2023 |
| `◈` | Web Technologies Nationals | National Finalist · 2024 |
| `◉` | Most Improved Award | ASEAN Manila 2025 · Web Technologies |
| `▲` | 3+ Years Experience | Full-stack development & UI/UX design |
| `◆` | Cross-stack Proficiency | Python, Svelte, React, Laravel, Tailwind |
| `⬡` | Open to Collaboration | Part-time & project-based roles |

### 8. Stats row — replace "Products shipped / Users reached"
Replace the three STATS entries with something meaningful for Lance's profile (no shipped products or user counts):

| value | label |
|---|---|
| `"3+"` | `"Years of experience"` |
| `"3"` | `"Projects built"` |
| `"3×"` | `"Competition placements"` |

### 9. Contact section copy
- Heading stays `"Get in touch"`
- Subtitle: `"Open to part-time roles and project-based collaborations. Let's build something together."` 

### 10. Footer
`"© 2026 Alex Chen. All rights reserved."` → `"© 2026 Lance. All rights reserved."`
`"San Francisco, CA"` → `"Quezon City, PH"`

### 11. Profile image
Leave the existing Unsplash image URL unchanged — user confirmed they'll replace it later. Update alt text to `"Lance"`.

---

## File to modify
- `src/App.tsx` — all changes above, in one focused edit pass

## Verification
- Preview panel should show: name "Lance" in nav, no green badge, Philippines location, 3 real projects, 3 real achievements + 3 placeholder achievements, corrected stats, updated footer.
- Dark mode toggle should still work.
- Project overlay expand/collapse should still animate correctly for all 3 new projects.
