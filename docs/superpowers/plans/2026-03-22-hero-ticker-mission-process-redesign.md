# Hero Ticker + Mission/Process Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken animated hero ticker with a static stat bar, and merge the Mission and Process sections into one cohesive narrative section.

**Architecture:** Pure HTML/CSS edits to `index.html` and `styles/hub.css`. No JavaScript changes. No build tools. Verify visually with `python -m http.server 8080` at `http://localhost:8080`. There is no automated test suite — verification steps are visual browser checks.

**Tech Stack:** Static HTML5, CSS custom properties, Python http.server for local preview.

---

## File Map

| File | What changes |
|------|-------------|
| `index.html` | Remove "Process" nav `<li>`, replace `.hero__ticker` with `.hero__stat-bar`, rewrite `#mission` section body, remove `#how` section |
| `styles/hub.css` | Remove ticker rules (lines 388–419), remove stat card rules (lines 429–497), remove how/step rules (lines 736–820), add stat bar + step card rules |

---

## Task 1: Remove "Process" nav link

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Delete the Process nav list item**

In `index.html`, find the `<ul class="nav__links">` block (around line 26). Remove this line:
```html
<li><a href="#how" class="nav__link">Process</a></li>
```

The nav should now read:
```html
<ul class="nav__links">
  <li><a href="#mission" class="nav__link">Mission</a></li>
  <li><a href="#showcase" class="nav__link">Work</a></li>
  <li><a href="#contact" class="nav__cta">Get in Touch</a></li>
</ul>
```

- [ ] **Step 2: Verify**

Start the server if not already running:
```bash
python -m http.server 8080
```
Open `http://localhost:8080`. Confirm the nav shows only: Mission · Work · Get in Touch. Check at mobile width (≤768px) — the hamburger menu should also show only those three items.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Remove Process nav link (merged into Mission section)"
```

---

## Task 2: Replace hero ticker with static stat bar

**Files:**
- Modify: `index.html`
- Modify: `styles/hub.css`

- [ ] **Step 1: Replace ticker HTML**

In `index.html`, find the `<div class="hero__ticker" aria-hidden="true">` block (lines 74–97) and replace the entire block with:

```html
<!-- TODO: Replace with client logo marquee once 2-3 real builds are live -->
<div class="hero__stat-bar">
  <span>Volunteer Built</span>
  <span class="hero__stat-bar__divider" aria-hidden="true"></span>
  <span>AI-Powered</span>
  <span class="hero__stat-bar__divider" aria-hidden="true"></span>
  <span>Always Evolving</span>
</div>
```

- [ ] **Step 2: Remove ticker CSS**

In `styles/hub.css`, delete lines 387–419 (the entire ticker block including the keyframes):

```css
/* Ticker */
.hero__ticker { … }
.hero__ticker-track { … }
.ticker-dot { … }
@keyframes ticker { … }
```

- [ ] **Step 3: Add stat bar CSS**

In `styles/hub.css`, in place of the removed ticker block, add:

```css
/* Stat Bar */
.hero__stat-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid var(--border);
  background: rgba(10, 10, 10, 0.6);
  padding: 0.8rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cream-muted);
}

.hero__stat-bar__divider {
  display: inline-block;
  width: 1px;
  height: 2rem;
  background: var(--border);
  margin: 0 2.5rem;
}
```

- [ ] **Step 4: Verify**

Refresh `http://localhost:8080`. At the bottom of the hero section, confirm:
- "Volunteer Built · AI-Powered · Always Evolving" is visible in small uppercase text
- No animation or scrolling
- Thin vertical lines separate the three items
- No JS errors in the browser console

- [ ] **Step 5: Commit**

```bash
git add index.html styles/hub.css
git commit -m "Replace animated ticker with static stat bar"
```

---

## Task 3: Rewrite mission section HTML

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace mission section content**

In `index.html`, find the entire `<section class="mission" id="mission">` block (lines 100–130) and replace it with:

```html
<!-- ── Mission / Process ── -->
<section class="mission" id="mission">
  <div class="container">
    <div class="section-header reveal">
      <span class="section-tag">Our Mission</span>
      <h2 class="section-title">The web shouldn't be<br/><em>a luxury</em></h2>
      <p class="section-sub">Small businesses are the backbone of every community. We think they deserve a digital presence that says so.</p>
      <p class="section-sub">Technology moves fast. We keep your web presence current so you can focus on what you actually do.</p>
    </div>

    <div class="mission__rule"></div>

    <div class="mission__steps">
      <div class="step-card reveal reveal-delay-1">
        <div class="step-card__number">01</div>
        <h3 class="step-card__title">Nominate</h3>
        <p class="step-card__desc">Know a local business with a website stuck in 2008? Nominate them — or have them reach out directly.</p>
      </div>
      <div class="step-card reveal reveal-delay-2">
        <div class="step-card__number">02</div>
        <h3 class="step-card__title">Design Sprint</h3>
        <p class="step-card__desc">AI vibe coding lets us iterate through concepts at lightning speed — finding the aesthetic that fits.</p>
      </div>
      <div class="step-card reveal reveal-delay-3">
        <div class="step-card__number">03</div>
        <h3 class="step-card__title">Build &amp; Handoff</h3>
        <p class="step-card__desc">We build the full site, test across devices, and hand it over with guidance on keeping it current.</p>
      </div>
      <div class="step-card reveal reveal-delay-4">
        <div class="step-card__number">04</div>
        <h3 class="step-card__title">Community Wins</h3>
        <p class="step-card__desc">More customers, more trust, a stronger local economy. That's the whole point.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify HTML structure renders (no CSS yet)**

Refresh `http://localhost:8080`. The mission section should show:
- The "Our Mission" tag + headline + two body paragraphs
- An empty rule element (invisible for now)
- Four unstyled step cards with numbers/titles/descriptions below it
- The old stat cards (100%, 10×, 3+) are gone

If the step cards don't appear at all or the section is missing, check the HTML for unclosed tags.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Rewrite mission section: merge process steps, remove stat cards"
```

---

## Task 4: Remove #how section

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Delete the #how section**

In `index.html`, find and delete the entire `<section class="how" id="how">` block (lines 243–282 in the original file — adjust line numbers if previous edits shifted them). It starts with:
```html
<!-- ── How It Works ── -->
<section class="how" id="how">
```
and ends with:
```html
</section>
```
just before the `<!-- ── CTA ── -->` comment.

- [ ] **Step 2: Verify**

Refresh `http://localhost:8080`. Scroll down — there should be no "From outdated to outstanding" section. The page flow should be: Hero → Mission → Showcase → CTA → Footer.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Remove standalone #how section (content merged into #mission)"
```

---

## Task 5: CSS cleanup and new rules

**Files:**
- Modify: `styles/hub.css`

- [ ] **Step 1: Remove stat card CSS**

In `styles/hub.css`, delete the `.stats-grid` and all `.stat-card*` rules. These are at lines 429–497 in the original file:
```css
.stats-grid { … }
.stat-card { … }
.stat-card::before { … }
.stat-card:hover { … }
.stat-card:hover::before { … }
.stat-card__icon { … }
.stat-card__number { … }
.stat-card__label { … }
.stat-card__desc { … }
@media (max-width: 768px) {
  .stats-grid { … }
}
```

- [ ] **Step 2: Remove how/steps CSS**

In `styles/hub.css`, delete all `.how` and `.step*` rules. These are at lines 736–820 in the original file:
```css
.how { … }
.how::before { … }
.steps { … }
.step { … }
.step::after { … }
.step:hover { … }
.step:hover::after { … }
.step__number { … }
.step:hover .step__number { … }
.step__title { … }
.step__desc { … }
@media (max-width: 768px) {
  .steps { … }
}
```

- [ ] **Step 3: Add mission rule + step card CSS**

After the `.mission` rule block (around line 424 in the original, now shifted), add:

```css
.mission__rule {
  width: 2rem;
  height: 2px;
  background: var(--gold);
  margin: 2rem 0;
}

.mission__steps {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.step-card {
  background: var(--black-card);
  border: 1px solid var(--border);
  border-left: 2px solid var(--gold);
  border-radius: 8px;
  padding: 1.5rem;
}

.step-card__number {
  font-family: var(--ff-body);
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--gold);
  opacity: 0.5;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.step-card__title {
  font-weight: 600;
  color: var(--cream);
  margin-bottom: 0.5rem;
}

.step-card__desc {
  font-size: 0.85rem;
  color: var(--cream-muted);
  line-height: 1.65;
}

@media (max-width: 768px) {
  .mission__steps {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 4: Final visual verification checklist**

Refresh `http://localhost:8080` and confirm each of the following:

**Hero ticker:**
- [ ] Stat bar shows "Volunteer Built · AI-Powered · Always Evolving" at bottom of hero
- [ ] No animation, no scrolling, no jump bug
- [ ] Thin vertical dividers between items

**Nav:**
- [ ] Desktop nav shows: Mission · Work · Get in Touch (no Process link)
- [ ] Clicking "Mission" scrolls to the mission section

**Mission section:**
- [ ] "Our Mission" tag + "The web shouldn't be a luxury" headline visible
- [ ] Two body paragraphs visible (community + technology sentences)
- [ ] Gold rule (thin 2rem gold bar) visible below the paragraphs
- [ ] 2×2 grid of step cards below the rule
- [ ] Each card has a muted gold step number, bold title, and description text
- [ ] Gold left-border accent visible on each card
- [ ] Old stat cards (100%, 10×, 3+) are gone
- [ ] Old "From outdated to outstanding" section is gone

**Mobile (resize to ≤768px):**
- [ ] Step cards stack to a single column
- [ ] Stat bar text doesn't overflow or wrap awkwardly

**Section padding:**
- [ ] Mission section padding feels balanced — the merged section is taller than the original. If it feels cramped or over-padded, adjust `padding` on `.mission` in hub.css (currently `8rem 0`)

**No regressions:**
- [ ] Showcase cards still render correctly
- [ ] CTA section still renders correctly
- [ ] Footer still renders correctly
- [ ] Browser console shows no JS errors

- [ ] **Step 5: Commit**

```bash
git add styles/hub.css
git commit -m "Add stat bar + step card CSS, remove obsolete ticker/stat-card/how/step rules"
```
