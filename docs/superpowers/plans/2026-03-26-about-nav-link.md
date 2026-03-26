# About Nav Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an About link to the main nav on both the hub and About pages, positioned after the "Get in Touch" CTA.

**Architecture:** Two files each receive one new `<li>` after the existing CTA `<li>`. No new CSS or components needed — `.nav__link` already handles all styling and responsive behavior.

**Tech Stack:** Astro (static), hub.css design tokens

---

### Task 1: Add About link to hub nav

**Files:**
- Modify: `src/pages/index.astro:21-25`

- [ ] **Step 1: Add the nav link**

In `src/pages/index.astro`, locate the `<ul class="nav__links">` block (lines 21–25). Add one `<li>` after the Get in Touch `<li>`:

```html
<ul class="nav__links">
  <li><a href="#mission" class="nav__link">Mission</a></li>
  <li><a href="#showcase" class="nav__link">Work</a></li>
  <li><a href="#contact" class="nav__cta">Get in Touch</a></li>
  <li><a href="/about" class="nav__link">About</a></li>
</ul>
```

- [ ] **Step 2: Verify locally**

Run: `npm run dev`

Open `http://localhost:4321` — confirm the nav shows: Mission | Work | Get in Touch | About. Click About and confirm it navigates to `/about`. Check mobile hamburger menu includes About.

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add About link to hub nav after CTA"
```

---

### Task 2: Add About link to About page nav

**Files:**
- Modify: `src/pages/about.astro:19-23`

- [ ] **Step 1: Add the nav link**

In `src/pages/about.astro`, locate the `<ul class="nav__links">` block (lines 19–23). Add one `<li>` after the Get in Touch `<li>`:

```html
<ul class="nav__links">
  <li><a href="/#mission" class="nav__link">Mission</a></li>
  <li><a href="/#showcase" class="nav__link">Work</a></li>
  <li><a href="/#contact" class="nav__cta">Get in Touch</a></li>
  <li><a href="/about" class="nav__link">About</a></li>
</ul>
```

Note: links on this page already use `/#mission`, `/#showcase`, `/#contact` (hash anchors prefixed with `/`) to navigate back to the hub — keep that pattern.

- [ ] **Step 2: Verify locally**

Open `http://localhost:4321/about` — confirm the nav shows the same order. Confirm About link is present and doesn't cause a redirect loop (linking to `/about` from `/about` is fine — it just reloads the same page).

- [ ] **Step 3: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: add About link to About page nav after CTA"
```
