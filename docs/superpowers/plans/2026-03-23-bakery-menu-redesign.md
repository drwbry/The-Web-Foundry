# Bakery Menu Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `showcase/bakery.html` into an information-dense, real-feeling local bakery website with a slim hero, photo, specials strip, full tabbed menu, and a photo in the About section.

**Architecture:** Single-file change — all markup, styles, and JS live in `showcase/bakery.html`. Styles go in the existing `<style>` block; JS goes in the existing inline `<script>` at the bottom. No new files created.

**Tech Stack:** Vanilla HTML/CSS/JS. No build tools. Shared utilities: `../styles/shared.css` (reset, `.reveal`, `.container`, `.back-btn`) and `../js/shared.js` (scroll reveal, counter animation). Run locally with `python -m http.server 8080`.

---

## Note on Testing

This project has no test framework. Each task ends with a **browser verification step** — open `http://localhost:8080/showcase/bakery.html` after each change and confirm the described visual output. Start the server once before Task 1 and leave it running throughout.

---

## File Map

| File | Change |
|------|--------|
| `showcase/bakery.html` | Full rewrite of hero, specials, menu, about sections + new CSS rules + new JS |

No other files are touched.

---

## Task 1: Start dev server and slim down the hero

**Files:**
- Modify: `showcase/bakery.html` — hero section HTML + hero CSS rules

- [ ] **Step 1: Start the dev server**

```bash
python -m http.server 8080
```

Leave running. Open `http://localhost:8080/showcase/bakery.html` in a browser.

- [ ] **Step 2: Replace the hero section HTML**

In `showcase/bakery.html`, find the `<!-- HERO -->` comment and replace the entire `<section class="hero">...</section>` block with:

```html
<!-- HERO -->
<section class="hero" id="home">
  <div class="hero__inner">
    <div class="hero__copy">
      <div class="hero__tag">Artisan Bakery &amp; Café · Est. 2011</div>
      <h1 class="hero__headline">
        Baked with love,<br/>
        <em>every morning.</em>
      </h1>
      <p class="hero__sub">
        Small-batch pastries, fresh-ground coffee, and seasonal breads — made in-house, daily.
      </p>
      <div class="hero__actions">
        <a href="#menu" class="btn-primary">Browse the Menu</a>
        <a href="#about" class="btn-ghost">Our Story</a>
      </div>
    </div>
    <div class="hero__img-wrap">
      <img
        src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80"
        alt="Fresh croissants and pastries cooling on a rack at Sweet Crumb Bakery"
      />
      <div class="hero__img-caption">Fresh from the oven daily</div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Replace hero CSS rules**

In the `<style>` block, find the `/* ── HERO ── */` section and replace everything from that comment through the last `.hero__img-emoji--sm` rule with:

```css
/* ── HERO ── */
.hero {
  background: linear-gradient(135deg, #FDF6EC 0%, #F0E0C4 100%);
  padding: 5rem 2rem 3.5rem;
  border-bottom: 1px solid var(--border);
  position: relative; overflow: hidden;
}
.hero::after {
  content: '';
  position: absolute; right: -80px; top: -80px;
  width: 340px; height: 340px;
  border-radius: 50%; border: 2px solid var(--terra);
  opacity: 0.1; pointer-events: none;
}
.hero__inner {
  max-width: 1200px; margin: 0 auto;
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 3rem; align-items: center;
}
.hero__tag {
  display: inline-flex; align-items: center; gap: 0.5rem;
  font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--sage);
  margin-bottom: 1rem;
}
.hero__tag::before {
  content: ''; display: inline-block;
  width: 22px; height: 1.5px; background: var(--sage);
}
.hero__headline {
  font-family: var(--ff-display);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  font-weight: 700; line-height: 1.1;
  color: var(--cocoa); margin-bottom: 1rem;
}
.hero__headline em { font-style: italic; color: var(--terra-deep); }
.hero__sub {
  font-size: 1rem; color: var(--text-mid);
  line-height: 1.75; margin-bottom: 2rem; max-width: 400px;
}
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* Hero image */
.hero__img-wrap {
  position: relative; border-radius: 16px;
  overflow: hidden; aspect-ratio: 4 / 3;
  box-shadow: 0 16px 48px rgba(74, 55, 40, 0.18);
}
.hero__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
.hero__img-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  background: linear-gradient(to top, rgba(74, 55, 40, 0.55), transparent);
  color: rgba(253, 246, 236, 0.9);
  font-size: 0.7rem; font-weight: 600; letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 1.5rem 1rem 0.7rem;
}
```

- [ ] **Step 4: Verify in browser**

Expected:
- Hero is roughly half the viewport height (not full-screen)
- Left: tag, headline, subtext, two buttons
- Right: a rounded photo of croissants with a faint caption overlay at the bottom
- A faint decorative circle in the top-right corner

- [ ] **Step 5: Commit**

```bash
git add showcase/bakery.html
git commit -m "Slim hero: split layout with bakery photo"
```

---

## Task 2: Add Today's Specials strip

**Files:**
- Modify: `showcase/bakery.html` — add specials section HTML + CSS

- [ ] **Step 1: Add specials HTML**

Immediately after the closing `</section>` of the hero (before `<!-- MENU -->`), insert:

```html
<!-- SPECIALS -->
<section class="specials-section" id="specials">
  <div class="specials-inner">
    <div class="specials__header">
      <span class="specials__label">Today's Specials</span>
      <div class="specials__rule"></div>
      <span class="specials__date" id="specials-date"></span>
    </div>
    <div class="specials__grid">
      <div class="special-card">
        <span class="special-card__emoji">🥐</span>
        <div class="special-card__body">
          <span class="special-badge">Special</span>
          <div class="special-card__name">Almond Croissant</div>
          <div class="special-card__desc">House almond cream, toasted flakes, powdered sugar</div>
          <div class="special-card__price">$4.25</div>
        </div>
      </div>
      <div class="special-card">
        <span class="special-card__emoji">🍵</span>
        <div class="special-card__body">
          <span class="special-badge">Special</span>
          <div class="special-card__name">Matcha Latte</div>
          <div class="special-card__desc">Ceremonial grade, oat milk, lightly sweetened</div>
          <div class="special-card__price">$5.75</div>
        </div>
      </div>
      <div class="special-card">
        <span class="special-card__emoji">🍞</span>
        <div class="special-card__body">
          <span class="special-badge">Special</span>
          <div class="special-card__name">Walnut Rye Loaf</div>
          <div class="special-card__desc">Baked Tue/Thu/Sat only — limited quantity</div>
          <div class="special-card__price">$11.00</div>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add specials CSS**

In the `<style>` block, find `/* ── MENU SECTION ── */` and insert the following block immediately before it:

```css
/* ── SPECIALS STRIP ── */
.specials-section {
  background: var(--cream-dark);
  padding: 2rem 2rem;
  border-bottom: 1px solid var(--border);
}
.specials-inner { max-width: 1200px; margin: 0 auto; }
.specials__header {
  display: flex; align-items: center; gap: 0.75rem;
  margin-bottom: 1.2rem;
}
.specials__label {
  font-size: 0.68rem; font-weight: 700;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: var(--terra); white-space: nowrap;
}
.specials__rule { flex: 1; height: 1px; background: var(--border); }
.specials__date { font-size: 0.72rem; color: var(--text-mid); white-space: nowrap; }
.specials__grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;
}
.special-card {
  background: var(--cream-card);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 1rem;
  display: flex; gap: 0.75rem; align-items: flex-start;
}
.special-card__emoji { font-size: 1.8rem; flex-shrink: 0; line-height: 1; }
.special-card__body { flex: 1; }
.special-badge {
  display: inline-block;
  background: var(--terra); color: white;
  font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.15rem 0.45rem; border-radius: 4px;
  margin-bottom: 0.35rem;
}
.special-card__name {
  font-size: 0.85rem; font-weight: 700;
  color: var(--cocoa); margin-bottom: 0.2rem;
}
.special-card__desc {
  font-size: 0.75rem; color: var(--text-mid);
  line-height: 1.5; margin-bottom: 0.35rem;
}
.special-card__price { font-size: 0.82rem; font-weight: 700; color: var(--terra); }
```

- [ ] **Step 3: Add date JS**

In the inline `<script>` at the bottom of the file, add this line alongside the existing nav scroll logic:

```js
// Specials date
document.getElementById('specials-date').textContent =
  new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
```

- [ ] **Step 4: Verify in browser**

Expected:
- A warm cream-tinted strip between the hero and the old menu section
- Header row: "TODAY'S SPECIALS" (terracotta, uppercase) — rule line — today's date (e.g., "Monday, Mar 23")
- 3 cards side by side, each with emoji, orange "Special" badge, name, description, price

- [ ] **Step 5: Commit**

```bash
git add showcase/bakery.html
git commit -m "Add Today's Specials strip with JS date"
```

---

## Task 3: Rewrite menu section HTML

**Files:**
- Modify: `showcase/bakery.html` — replace old 3-card menu grid with tabbed full menu

- [ ] **Step 1: Remove the old menu section content**

Find `<!-- MENU -->` and replace the entire `<section class="menu-section" id="menu">...</section>` block with:

```html
<!-- MENU -->
<section class="menu-section" id="menu">
  <div class="menu-inner">

    <!-- Menu header -->
    <div class="menu-header reveal">
      <h2 class="menu-title">Our Menu</h2>
      <a href="#" class="pdf-link" aria-label="Download PDF menu">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M12 15V3m0 12l-4-4m4 4l4-4"/>
          <path d="M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17"/>
        </svg>
        Download PDF Menu
      </a>
    </div>

    <!-- Tab bar -->
    <div class="tab-bar" role="tablist" aria-label="Menu categories">
      <button class="tab tab--active" data-target="pastries" role="tab" aria-selected="true">Pastries</button>
      <button class="tab" data-target="breads" role="tab" aria-selected="false">Breads</button>
      <button class="tab" data-target="sandwiches" role="tab" aria-selected="false">Sandwiches</button>
      <button class="tab" data-target="beverages" role="tab" aria-selected="false">Beverages</button>
    </div>

    <!-- Pastries -->
    <div class="menu-category" id="pastries">
      <h3 class="category-heading">Pastries</h3>
      <div class="item-grid">
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row">
              <span class="item-name">Almond Croissant</span>
              <span class="item-badge">Special</span>
            </div>
            <div class="item-desc">House almond cream, toasted flakes, powdered sugar</div>
          </div>
          <span class="item-price">$4.25</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Plain Croissant</span></div>
            <div class="item-desc">Laminated dough, cultured butter, baked fresh daily</div>
          </div>
          <span class="item-price">$3.50</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Seasonal Muffin</span></div>
            <div class="item-desc">Ask us what's in today — changes weekly</div>
          </div>
          <span class="item-price">$3.25</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Carrot Cake Cupcake</span></div>
            <div class="item-desc">Brown butter cream cheese frosting, candied walnut</div>
          </div>
          <span class="item-price">$3.75</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Kouign-Amann</span></div>
            <div class="item-desc">Caramelized sugar, flaky layers — limited daily</div>
          </div>
          <span class="item-price">$4.75</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Cinnamon Morning Bun</span></div>
            <div class="item-desc">Orange zest glaze, turbinado sugar crust</div>
          </div>
          <span class="item-price">$4.00</span>
        </div>
      </div>
    </div>

    <!-- Breads -->
    <div class="menu-category" id="breads">
      <h3 class="category-heading">Breads</h3>
      <div class="item-grid">
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Country Sourdough</span></div>
            <div class="item-desc">100-hour fermented starter, stone-baked crust</div>
          </div>
          <span class="item-price">$8.50</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row">
              <span class="item-name">Walnut Rye Loaf</span>
              <span class="item-badge">Special</span>
            </div>
            <div class="item-desc">Baked Tue/Thu/Sat only — limited quantity</div>
          </div>
          <span class="item-price">$11.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Seeded Baguette</span></div>
            <div class="item-desc">Poppy, sesame, and sunflower — crisp crust</div>
          </div>
          <span class="item-price">$4.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Olive Focaccia</span></div>
            <div class="item-desc">Castelvetrano olives, rosemary, flaked salt</div>
          </div>
          <span class="item-price">$6.50</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Honey Oat Sandwich Loaf</span></div>
            <div class="item-desc">Soft crumb, lightly sweetened, great for toast</div>
          </div>
          <span class="item-price">$7.00</span>
        </div>
      </div>
    </div>

    <!-- Sandwiches -->
    <div class="menu-category" id="sandwiches">
      <h3 class="category-heading">Sandwiches</h3>
      <div class="item-grid">
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">The Classic BLT</span></div>
            <div class="item-desc">Applewood bacon, heirloom tomato, butter lettuce, aioli on sourdough</div>
          </div>
          <span class="item-price">$13.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Smoked Turkey &amp; Brie</span></div>
            <div class="item-desc">Apple slices, whole grain mustard, arugula on honey oat</div>
          </div>
          <span class="item-price">$14.50</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Roasted Veggie &amp; Hummus</span></div>
            <div class="item-desc">Zucchini, red pepper, spinach, house hummus on focaccia</div>
          </div>
          <span class="item-price">$12.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Ham &amp; Gruyère</span></div>
            <div class="item-desc">Black forest ham, Dijon, cornichons on baguette</div>
          </div>
          <span class="item-price">$13.50</span>
        </div>
      </div>
    </div>

    <!-- Beverages -->
    <div class="menu-category" id="beverages">
      <h3 class="category-heading">Beverages</h3>
      <div class="item-grid">
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Drip Coffee</span></div>
            <div class="item-desc">Single-origin, rotates weekly — ask your barista</div>
          </div>
          <span class="item-price">$3.25</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Cortado</span></div>
            <div class="item-desc">Equal parts espresso and steamed whole milk</div>
          </div>
          <span class="item-price">$4.50</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Oat Milk Latte</span></div>
            <div class="item-desc">Double shot, house oat milk, your choice of syrup</div>
          </div>
          <span class="item-price">$6.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row">
              <span class="item-name">Matcha Latte</span>
              <span class="item-badge">Special</span>
            </div>
            <div class="item-desc">Ceremonial grade, oat milk, lightly sweetened</div>
          </div>
          <span class="item-price">$5.75</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Chai</span></div>
            <div class="item-desc">House-spiced concentrate, steamed milk</div>
          </div>
          <span class="item-price">$5.25</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Cold Brew</span></div>
            <div class="item-desc">18-hour steep, served over ice — straight or with oat milk</div>
          </div>
          <span class="item-price">$5.00</span>
        </div>
        <div class="menu-item">
          <!-- <div class="item-img-slot"></div> -->
          <div class="item-left">
            <div class="item-name-row"><span class="item-name">Orange Juice</span></div>
            <div class="item-desc">Freshly squeezed, seasonal citrus</div>
          </div>
          <span class="item-price">$4.50</span>
        </div>
      </div>
    </div>

  </div>
</section>
```

- [ ] **Step 2: Verify in browser (structure only)**

Expected: The old 3-card menu grid is gone. You should see a section with an "Our Menu" heading, four category headings (Pastries, Breads, Sandwiches, Beverages) with items below them. It will be unstyled/partially styled — that's fine, CSS comes next.

- [ ] **Step 3: Commit**

```bash
git add showcase/bakery.html
git commit -m "Rewrite menu HTML: tabbed categories with full item list"
```

---

## Task 4: Add menu CSS

**Files:**
- Modify: `showcase/bakery.html` — replace old menu CSS, add new rules

- [ ] **Step 1: Replace the old menu section CSS**

In the `<style>` block, find `/* ── MENU SECTION ── */` and replace everything from that comment through the last `.menu-card__price` rule with:

```css
/* ── MENU SECTION ── */
.menu-section { padding: 0 2rem 5rem; background: var(--cream); }
.menu-inner { max-width: 1200px; margin: 0 auto; }

/* Menu header row */
.menu-header {
  padding: 2rem 0 0;
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 1rem;
}
.menu-title {
  font-family: var(--ff-display);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 700; font-style: italic;
  color: var(--cocoa);
}

/* PDF download link */
.pdf-link {
  display: inline-flex; align-items: center; gap: 0.45rem;
  font-size: 0.75rem; font-weight: 600;
  color: var(--text-mid);
  border: 1px solid var(--border);
  padding: 0.4rem 0.9rem;
  border-radius: 100px;
  transition: border-color 0.2s ease, color 0.2s ease;
}
.pdf-link:hover, .pdf-link:focus-visible {
  border-color: var(--terra);
  color: var(--terra-deep);
  outline: none;
}

/* Tab bar */
.tab-bar {
  display: flex;
  border-bottom: 2px solid var(--border);
  margin-bottom: 2rem;
  position: sticky; top: 72px;
  background: var(--cream); z-index: 10;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.tab-bar::-webkit-scrollbar { display: none; }
.tab {
  padding: 0.7rem 1.3rem;
  font-family: var(--ff-body); font-size: 0.8rem; font-weight: 600;
  color: var(--text-mid);
  border: none; background: none; cursor: pointer;
  border-bottom: 2px solid transparent; margin-bottom: -2px;
  white-space: nowrap;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.tab:hover { color: var(--cocoa); }
.tab--active { color: var(--terra-deep); border-bottom-color: var(--terra); }

/* Category sections */
.menu-category { margin-bottom: 3rem; }
.category-heading {
  font-family: var(--ff-display);
  font-size: 1.3rem; font-weight: 700; font-style: italic;
  color: var(--cocoa);
  margin-bottom: 1rem; padding-bottom: 0.6rem;
  border-bottom: 1px solid var(--border);
}

/* Item grid */
.item-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem;
}
.menu-item {
  background: var(--cream-card);
  border: 1px solid var(--border);
  border-radius: 12px; padding: 0.9rem 1rem;
  display: flex; justify-content: space-between;
  align-items: flex-start; gap: 0.75rem;
  transition: box-shadow 0.2s ease;
}
.menu-item:hover { box-shadow: 0 4px 16px rgba(74, 55, 40, 0.08); }
.item-left { flex: 1; min-width: 0; }
.item-name-row {
  display: flex; align-items: center;
  gap: 0.4rem; flex-wrap: wrap;
  margin-bottom: 0.25rem;
}
.item-name { font-size: 0.87rem; font-weight: 700; color: var(--cocoa); }
.item-badge {
  display: inline-block;
  background: var(--terra); color: white;
  font-size: 0.55rem; font-weight: 700;
  letter-spacing: 0.07em; text-transform: uppercase;
  padding: 0.13rem 0.38rem; border-radius: 3px;
  flex-shrink: 0;
}
.item-desc { font-size: 0.74rem; color: var(--text-mid); line-height: 1.55; }
.item-price { font-size: 0.87rem; font-weight: 700; color: var(--terra); flex-shrink: 0; }
```

- [ ] **Step 2: Verify in browser**

Expected:
- "Our Menu" heading on the left, "Download PDF Menu" pill on the right
- Tab bar (Pastries | Breads | Sandwiches | Beverages) sitting below the header
- Each category has a serif italic heading with a bottom rule
- Items display as compact 2-column cards: name (+ orange badge on specials), description, price flush right
- PDF button has a visible outline that turns terracotta on hover

- [ ] **Step 3: Commit**

```bash
git add showcase/bakery.html
git commit -m "Add menu CSS: tabs, item grid, PDF button"
```

---

## Task 5: Wire up tab JS (scroll + active tab highlight)

**Files:**
- Modify: `showcase/bakery.html` — inline `<script>` at bottom

- [ ] **Step 1: Add tab behavior to the inline script**

In the inline `<script>` at the bottom, add the following after the existing nav scroll logic:

```js
// ── MENU TABS ──
(function () {
  const tabs = document.querySelectorAll('.tab');
  const categories = document.querySelectorAll('.menu-category');
  let isScrollingProgrammatically = false;

  // Tab click: scroll to category
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.getElementById(tab.dataset.target);
      if (!target) return;

      isScrollingProgrammatically = true;
      setActiveTab(tab);
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Clear flag after scroll settles
      clearTimeout(window._tabScrollTimer);
      window._tabScrollTimer = setTimeout(() => {
        isScrollingProgrammatically = false;
      }, 800);
    });
  });

  // Active tab highlight on scroll
  const observer = new IntersectionObserver(entries => {
    if (isScrollingProgrammatically) return;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        const matchingTab = document.querySelector(`.tab[data-target="${id}"]`);
        if (matchingTab) setActiveTab(matchingTab);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-72px 0px 0px 0px'
  });

  categories.forEach(cat => observer.observe(cat));

  function setActiveTab(activeTab) {
    tabs.forEach(t => {
      t.classList.remove('tab--active');
      t.setAttribute('aria-selected', 'false');
    });
    activeTab.classList.add('tab--active');
    activeTab.setAttribute('aria-selected', 'true');
  }
})();
```

- [ ] **Step 2: Verify tab click behavior**

Steps to test:
1. Scroll to the menu section
2. Click "Beverages" tab — page should smooth-scroll to the Beverages section
3. "Beverages" tab should be highlighted (terracotta underline) after scroll settles
4. Manually scroll back up to Pastries — the "Pastries" tab should become active automatically

- [ ] **Step 3: Commit**

```bash
git add showcase/bakery.html
git commit -m "Wire tab scroll and active-tab IntersectionObserver"
```

---

## Task 6: Swap About section photo

**Files:**
- Modify: `showcase/bakery.html` — about section HTML + about CSS

- [ ] **Step 1: Replace the about visual HTML**

In the About section, find `<div class="about-visual reveal reveal--left">` and replace the entire div (including both blobs and the emoji) with:

```html
<div class="about-visual reveal reveal--left">
  <div class="about-img-wrap">
    <img
      src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80"
      alt="Maria Chen, founder of Sweet Crumb Bakery, in the kitchen"
    />
  </div>
</div>
```

- [ ] **Step 2: Replace about visual CSS**

In the `<style>` block, find `/* ── ABOUT ── */` and replace the `.about-visual`, `.about-blob`, `.about-blob--1`, `.about-blob--2`, `@keyframes morph`, and `.about-emoji` rules with:

```css
.about-visual { display: flex; align-items: center; justify-content: center; }
.about-img-wrap {
  width: 100%; max-width: 400px;
  aspect-ratio: 1 / 1;
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 16px 48px rgba(74, 55, 40, 0.18);
}
.about-img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover; display: block;
}
```

- [ ] **Step 3: Verify in browser**

Expected:
- About section shows a square photo (baker in kitchen) on the left
- Text quote and story content on the right — unchanged
- Photo has a soft shadow, rounded corners, fills the left column

- [ ] **Step 4: Commit**

```bash
git add showcase/bakery.html
git commit -m "Swap About section blob/emoji for real bakery photo"
```

---

## Task 7: Add mobile responsive styles

**Files:**
- Modify: `showcase/bakery.html` — update `@media (max-width: 768px)` block

- [ ] **Step 1: Update the mobile breakpoint**

Find `@media (max-width: 768px)` near the bottom of the `<style>` block. **Before replacing, read the existing rules** to check whether any rules not touched by this redesign (e.g., nav, footer) are present — if so, keep them and merge rather than doing a wholesale replace. Then ensure the block contains at least these rules:

```css
@media (max-width: 768px) {
  /* Hero */
  .hero__inner { grid-template-columns: 1fr; }
  .hero__img-wrap { display: none; }

  /* Specials */
  .specials__grid { grid-template-columns: 1fr; }

  /* Menu tabs */
  .tab-bar { flex-wrap: nowrap; }

  /* Menu items */
  .item-grid { grid-template-columns: 1fr; }

  /* About & Hours */
  .about-inner { grid-template-columns: 1fr; }
  .hours-inner { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verify on mobile viewport**

In browser DevTools, switch to a mobile viewport (e.g., iPhone 12, 390px wide). Check:
- Hero: single column, no image showing
- Specials: cards stacked vertically
- Tab bar: scrollable horizontally (swipe between tabs)
- Menu items: single column
- About: single column, photo stacked above text
- Hours: single column

- [ ] **Step 3: Commit**

```bash
git add showcase/bakery.html
git commit -m "Mobile responsive styles for all new sections"
```

---

## Task 8: Final polish pass and cleanup

**Files:**
- Modify: `showcase/bakery.html` — remove any leftover old CSS/HTML, fix nav link

- [ ] **Step 1: Verify nav links**

Check the nav links in the `<nav>` section point to the correct anchors:
- `#menu` → should scroll to the menu section ✓ (already `id="menu"`)
- `#about` → should scroll to About ✓
- `#hours` → should scroll to Hours ✓
- "Order Now" → currently `#hours`, that's fine as a placeholder

- [ ] **Step 2: Remove leftover old CSS if any**

Scan the `<style>` block for any rules referencing `.menu-card`, `.menu-card__img`, `.menu-card__body`, `.menu-card__name`, `.menu-card__desc`, `.menu-card__price`, `.hero__card-stack`, `.hero__img-card`, `.hero__img-emoji`. Delete any that remain.

- [ ] **Step 3: Full visual walkthrough**

Open `http://localhost:8080/showcase/bakery.html` and walk through the page top to bottom:

1. **Nav** — logo, links, Order Now button visible; blurs on scroll
2. **Hero** — slim split layout, bakery photo right, tag + headline + buttons left, faint circle deco
3. **Specials** — cream background, today's date, 3 cards with Special badges and prices
4. **Menu** — "Our Menu" heading, PDF download pill, sticky tab bar, 4 categories with 2-column item grids, Special badges on Almond Croissant, Walnut Rye, Matcha Latte
5. **About** — square baker photo left, quote + story text right
6. **Hours** — dark cocoa section, location + hours table
7. **Footer** — DB Design credit link

- [ ] **Step 4: Final commit**

```bash
git add showcase/bakery.html
git commit -m "Final polish: remove old CSS, verify nav anchors"
```
