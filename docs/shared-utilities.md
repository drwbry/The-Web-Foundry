# Shared Utilities (shared.css + shared.js)

Reference for the utilities every client fork inherits from the template. Moved out of `AGENTS.md` on 2026-10-10; the source of truth is `src/scripts/shared.js` and `src/styles/shared.css`.

`shared.js` auto-initializes on `DOMContentLoaded` — no manual calls needed. It wires up scroll reveal and counters by querying the DOM for `.reveal` and `[data-count]`.

**Scroll reveal** — add `.reveal` to any element. Modifier classes change the entrance direction:
- `.reveal--left` / `.reveal--right` — slide in from side
- `.reveal--scale` — scale up from 92%
- `.reveal-delay-1` through `.reveal-delay-6` — stagger by 0.1s increments

**Counter animation** — add `data-count="42"` (integer) or `data-count="4.9"` (float) to any element. `shared.js` animates it from 0 when scrolled into view.

**Layout / components:**
- `.container` — centered max-width 1200px wrapper with horizontal padding
- `BackButton.astro` — fixed top-left back button for showcase pages (styled per-page via `color`/`background`)
- `DBCredit.astro` — "Built with The Web Foundry" pill badge
- `.hide-mobile` / `.hide-desktop` — responsive visibility toggles (breakpoint: 768px)
