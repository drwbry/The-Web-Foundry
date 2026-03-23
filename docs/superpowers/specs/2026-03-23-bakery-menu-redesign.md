# Sweet Crumb Bakery — Menu Redesign Spec

**Date:** 2026-03-23
**File:** `showcase/bakery.html`
**Goal:** Transform the current portfolio-style showcase into an information-dense, real-feeling local bakery website with a full menu, specials, and a personal hero image.

---

## Context

The current `bakery.html` is sparse — 3 large menu tile cards, a 100vh hero, and minimal content. It reads more like a portfolio piece than an actual bakery site. The goal is to make it feel like a real business website that a customer would actually use.

Sanity CMS integration is in progress (not yet implemented). The redesign should treat images as real content slots — placeholder-ready now, CMS-ready later.

---

## Design Decisions

### Hero — Slim Split Layout
- **Not** a full-viewport hero. A compact band (~50-60% viewport height max).
- Two-column grid: copy on the left, photo on the right.
- Right side: a single rounded image (aspect ratio 4:3) with a subtle gradient caption overlay at the bottom ("Fresh from the oven daily"). The caption text is decorative — it is **not** duplicated in the copy column and is acceptable to lose on mobile.
- Image is a real photo placeholder — designed to accept a Sanity CMS image field later.
- Retain existing copy: tagline, subtext, "Browse the Menu" + "Our Story" CTAs.
- Keep decorative elements subtle (one faint circle, no heavy animation).
- **Mobile (`max-width: 768px`):** collapses to single column, image wrapper hidden (`display: none`) via existing breakpoint. The caption text loss on mobile is acceptable.

### Today's Specials Strip
- Sits immediately below the hero, above the main menu.
- Background: `var(--cream-dark)` (already `#F0E6D0` in `:root`) — use the token, not the hex.
- Header row: "TODAY'S SPECIALS" label (left) + rule line + current date (right).
  - Current date rendered via inline JS: `new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })`. Placed in the inline `<script>` at the bottom of the file alongside the nav scroll logic.
- 3-column card grid. Each card: emoji icon + "Special" badge + name + short description + price.
- Items that appear in the Specials strip also show a "Special" badge in the main menu categories. **This is a manual HTML duplication** — the badge must be added to both the strip card and the corresponding menu item card. There is no JS sync mechanism.
- Content is hardcoded for now; CMS-ready slot later.
- **Mobile:** collapses to 1-column stack.

### Menu Section
- **Header row:** "Our Menu" title (left) + subtle "Download PDF Menu" button (right).
  - PDF button: outlined pill, small, download icon + text. Uses `var(--border)` outline, `var(--text-mid)` color. `:hover` and `:focus-visible` states: border color shifts to `var(--terra)`, text color shifts to `var(--terra-deep)`.
  - PDF link: `<a href="#">` placeholder. Real PDF URL dropped in when available.
- **Sticky tab bar:** Pastries | Breads | Sandwiches | Beverages
  - Tabs sit below the menu header.
  - `position: sticky; top: 72px` (nav height) so it locks below the nav on scroll.
  - Clicking a tab sets a `isScrollingProgrammatically = true` flag, smooth-scrolls to the target category section, then clears the flag via a `setTimeout` of 800ms (enough for the scroll to settle). This suppresses the IntersectionObserver from firing spurious active-tab updates during the scroll.
  - Active tab highlight driven by IntersectionObserver on each category section with `threshold: 0.3` and `rootMargin: '-72px 0px 0px 0px'` (accounts for sticky nav height). Observer is suppressed while `isScrollingProgrammatically` is true.
  - **Mobile:** tab bar scrolls horizontally (`overflow-x: auto`, `white-space: nowrap`, no wrapping, hide scrollbar via `-webkit-scrollbar: none`).
- **Category sections:** Each `<section>` has an `id` matching the tab (e.g., `id="pastries"`) and a styled heading + 2-column item grid.
  - **Mobile:** item grid collapses to 1 column.
- **Menu item cards:** Compact — name row (name + optional Special badge), one-line description, price. No image rendered. Each card contains a commented-out `<!-- <div class="item-img-slot"></div> -->` as a reserved slot for future image support.
- **Categories and items (placeholder content):**
  - Pastries: Almond Croissant (Special), Plain Croissant, Seasonal Muffin, Carrot Cake Cupcake, Kouign-Amann, Cinnamon Morning Bun
  - Breads: Country Sourdough, Walnut Rye (Special), Seeded Baguette, Olive Focaccia, Honey Oat Sandwich Loaf
  - Sandwiches: The Classic BLT, Smoked Turkey & Brie, Roasted Veggie & Hummus, Ham & Gruyère
  - Beverages: Drip Coffee, Cortado, Oat Milk Latte, Matcha Latte (Special), Chai, Cold Brew, Orange Juice

### About & Hours Sections
- Retain existing About and Hours sections with minimal changes.
- About section: swap the blob/emoji visual for a second real photo. Aspect ratio: **1:1** (square), max-width 400px, border-radius 16px. Same `<img>` + `object-fit: cover` + Unsplash placeholder pattern as hero image.
- Hours section: no structural change.

---

## Architecture

- **Single file:** All changes stay within `showcase/bakery.html`. No new files.
- **Styles:** Self-contained `<style>` block. CSS custom properties already defined at `:root` — use tokens throughout, no magic hex values.
- **JS:** No new JS file. All new behavior (date rendering, tab scroll, active tab observer, `isScrollingProgrammatically` flag) goes in the inline `<script>` at the bottom alongside the existing nav scroll listener.
- **Images:** `<img>` tags with `object-fit: cover`, wrapped in a sized container div. `src` points to an Unsplash placeholder URL. `alt` text written descriptively as if for a real photo.
- **PDF link:** `<a href="#">` placeholder.

---

## What Is NOT Changing

- Color palette, fonts, CSS custom properties — unchanged.
- `shared.css` and `shared.js` — no modifications.
- Nav structure and scroll behavior — retained as-is.
- DB Design credit footer — retained.
- Back button — retained.

---

## Future Considerations (out of scope now)

- Menu item images: reserved slot already in markup (commented-out div).
- Sanity CMS: hero image, about image, specials content, and menu items are all natural CMS fields.
- Mobile refinements beyond the breakpoints specified above.
