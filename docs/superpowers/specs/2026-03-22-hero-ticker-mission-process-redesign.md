# Design Spec: Hero Ticker + Mission/Process Redesign

**Date:** 2026-03-22
**Status:** Approved

---

## Overview

Two sections of the hub page (`index.html`) need redesigning:

1. The animated hero ticker has a jump bug and serves no real purpose in its current form.
2. The Mission and Process sections feel disconnected and the stats cards are placeholder-weak at this stage.

The goal is a cleaner, more honest page that tells a cohesive story: *here's why we do this → here's how it works.*

---

## Change 1 — Hero Ticker → Static Stat Bar

### Current state
An animated CSS marquee (`aria-hidden="true"`) at the bottom of the hero section. Has a visible jump bug caused by `gap` in flexbox making `translateX(-50%)` not land at the correct seam. Content mixes real client names with generic filler phrases.

### Decision
Replace with a static horizontal band. No animation. Three fact pills separated by decorative dividers.

### Content
```
Volunteer Built  |  AI-Powered  |  Always Evolving
```

*(Copy decision: "Always Evolving" chosen over "Built to Evolve" to avoid repeating "built" from "Volunteer Built.")*

### Class name
`.hero__stat-bar` — replaces `.hero__ticker` and `.hero__ticker-track`

### Layout & CSS
```css
.hero__stat-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  border-top: 1px solid var(--border);
  background: rgba(10, 10, 10, 0.6);
  padding: 0.8rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream-muted);
}
```

Pill separators — `<span aria-hidden="true">` elements with `width: 1px; height: 2rem; background: var(--border); margin: 0 2.5rem;`

### Accessibility
- The outer element: **no `aria-hidden`** — content is meaningful
- Separator `<span>` elements: `aria-hidden="true"` — decorative only

### Future-proofing
Add HTML comment above the element:
```html
<!-- TODO: Replace with client logo marquee once 2-3 real builds are live -->
```

---

## Change 2 — Mission + Process → Single Merged Section

### Current state
- `#mission`: headline + 3 stat cards (100% Free / 10× Faster / 3+ Builds). Stats feel hollow.
- `#how`: 4 numbered steps. Separate section, separate nav anchor.

### Decision
Merge both into a single `#mission` section. Remove the stat cards entirely. Steps become part of the mission narrative.

### Structure

**Section tag:** `Our Mission`

**H2:** The web shouldn't be *a luxury*
*(keep existing `<em>` italic on "a luxury")*

**Body text** — two paragraphs, both above the gold rule:
> "Small businesses are the backbone of every community. We think they deserve a digital presence that says so."
>
> "Technology moves fast. We keep your web presence current so you can focus on what you actually do."

Note: "We think" is intentionally retained. The second sentence is new copy — it implies an ongoing involvement beyond the one-time build, which is directionally accurate to the project's intent.

**Gold rule divider** — class: `.mission__rule`
```css
.mission__rule {
  width: 2rem;
  height: 2px;
  background: var(--gold);
  margin: 2rem 0;
}
```

**Step grid** — class: `.mission__steps`
```css
.mission__steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (max-width: 768px) {
  .mission__steps {
    grid-template-columns: 1fr;
  }
}
```

**Step card** — class: `.step-card`
```css
.step-card {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-left: 2px solid var(--gold);
  border-radius: 8px;
  padding: 1.5rem;
}
```

**Step card internals:**

| Element | Class | CSS |
|---------|-------|-----|
| Number | `.step-card__number` | `font-family: var(--ff-body); font-size: 0.75rem; font-weight: 700; color: var(--gold); opacity: 0.5; letter-spacing: 0.1em; margin-bottom: 0.5rem;` |
| Title | `.step-card__title` | `font-weight: 600; color: var(--cream); margin-bottom: 0.5rem;` |
| Description | `.step-card__desc` | `font-size: 0.85rem; color: var(--cream-muted); line-height: 1.65;` |

Note: `.step-card__number` explicitly uses `var(--ff-body)` (DM Sans) — not the display serif — since this is a small label, not a large decorative number.

**Step card copy:**

| # | Title | Description |
|---|-------|-------------|
| 01 | Nominate | Know a local business with a website stuck in 2008? Nominate them — or have them reach out directly. |
| 02 | Design Sprint | AI vibe coding lets us iterate through concepts at lightning speed — finding the aesthetic that fits. |
| 03 | Build & Handoff | We build the full site, test across devices, and hand it over with guidance on keeping it current. |
| 04 | Community Wins | More customers, more trust, a stronger local economy. That's the whole point. |

**Scroll reveal** — apply existing reveal classes to step cards, consistent with current `#how` step behavior:
- `.step-card:nth-child(1)` → `class="step-card reveal reveal-delay-1"`
- `.step-card:nth-child(2)` → `class="step-card reveal reveal-delay-2"`
- `.step-card:nth-child(3)` → `class="step-card reveal reveal-delay-3"`
- `.step-card:nth-child(4)` → `class="step-card reveal reveal-delay-4"`

**Section padding:** The merged section will be taller than the current `.mission` alone. Review section padding (`padding: 8rem 0` inherited from `.mission`) during implementation and adjust if the section feels visually imbalanced.

### Removed
- `.stats-grid`, all `.stat-card` variants — HTML + CSS
- `#how` section and `.how` — HTML + CSS
- `.step`, `.step__number`, `.step__body`, `.step__title`, `.step__desc` — CSS only

---

## Change 3 — Navigation Cleanup

### Current state
Nav links: Mission · Work · Process · Get in Touch

### Decision
Remove the "Process" `<li>` from `nav__links`. This is a single shared HTML element — removing it handles both desktop and mobile nav simultaneously (hamburger JS behavior is unchanged).

**Updated nav:** Mission · Work · Get in Touch

---

## Files Affected

| File | Changes |
|------|---------|
| `index.html` | Replace ticker with `.hero__stat-bar`, rewrite `#mission` section with merged steps, remove `#how` section, remove "Process" `<li>` from nav |
| `styles/hub.css` | Remove: `.hero__ticker`, `.hero__ticker-track`, `.ticker-dot`, `@keyframes ticker`, `.stats-grid`, all `.stat-card*`, `.how`, `.step`, `.step__number`, `.step__body`, `.step__title`, `.step__desc`. Add: `.hero__stat-bar`, `.mission__rule`, `.mission__steps`, `.step-card`, `.step-card__number`, `.step-card__title`, `.step-card__desc` |

No changes to `shared.css`, `shared.js`, `main.js`, or any showcase pages.

---

## Out of Scope

- Contact form or email link changes
- Showcase card changes
- Hamburger menu JS behavior (unchanged — only nav HTML `<li>` is removed)
- Any showcase page files
