# Astro Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the static HTML/CSS/JS DB Design website to Astro 5 (static output) with shared layouts, BackButton/DBCredit components, and the approved bakery menu redesign built in as part of the migration.

**Architecture:** Single Astro project scaffolded in-place on the existing git repo. Two layouts (BaseLayout for all pages, ShowcaseLayout extending it for showcase pages), two shared components (BackButton, DBCredit). Scripts bundled by Astro from `src/scripts/`; CSS imported in frontmatter from `src/styles/`. Bakery page is built to its approved redesign spec, not ported from the current minimal file.

**Tech Stack:** Astro 5.x (static output), Node 24, vanilla HTML/CSS/JS (no TypeScript needed). Google Fonts via CDN. No test framework — each page verified by visual browser inspection.

**Reference specs:**
- Migration spec: `docs/superpowers/specs/2026-03-23-astro-migration-design.md`
- Bakery redesign spec: `docs/superpowers/specs/2026-03-23-bakery-menu-redesign.md`
- Bakery redesign plan: `docs/superpowers/plans/2026-03-23-bakery-menu-redesign.md`

---

## Note on Testing

No test framework. Each task that changes visible output ends with a **browser verification step**. Start `npm run dev` once in Task 1 and leave it running throughout — the dev server hot-reloads on file save.

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `astro.config.mjs` | Create | Astro static output config |
| `.nvmrc` | Create | Pin Node 24 |
| `package.json` | Modify | Add engines field |
| `src/styles/shared.css` | Create (copy) | Global reset, shared utilities |
| `src/styles/hub.css` | Create (copy) | Hub design tokens + components |
| `src/scripts/shared.js` | Create (copy) | Scroll reveal + counter animation |
| `src/scripts/main.js` | Create (copy) | Hub 3D tilt, parallax, nav blur |
| `src/components/BackButton.astro` | Create | `.back-btn` with color/background props |
| `src/components/DBCredit.astro` | Create | `.db-credit` footer element |
| `src/layouts/BaseLayout.astro` | Create | HTML shell, shared.css, shared.js, head slot |
| `src/layouts/ShowcaseLayout.astro` | Create | Wraps BaseLayout + BackButton + DBCredit |
| `src/pages/index.astro` | Create | Hub page |
| `src/pages/showcase/plumber.astro` | Create | Plumber page (as-is port) |
| `src/pages/showcase/salon.astro` | Create | Salon page (as-is port) |
| `src/pages/showcase/bakery.astro` | Create | Bakery page (approved redesign) |
| `styles/` | Delete (Task 11) | Replaced by src/styles/ |
| `js/` | Delete (Task 11) | Replaced by src/scripts/ |
| `index.html` | Delete (Task 11) | Replaced by src/pages/index.astro |
| `showcase/` | Delete (Task 11) | Replaced by src/pages/showcase/ |

---

## Task 1: Scaffold Astro and configure project

**Files:**
- Create: `astro.config.mjs`, `.nvmrc`
- Modify: `package.json`

- [ ] **Step 1: Scaffold Astro in the current directory**

```bash
npm create astro@latest . -- --template empty --no-install --no-git --yes --skip-houston
```

If the command hangs (interactive mode engaged), answer:
- Non-empty directory warning → continue
- Template → empty
- Install dependencies → No (we install in Step 4)
- Initialize git → No
- TypeScript → No

**Fallback** — if the scaffold command fails or cannot be run non-interactively, create the files manually instead:

`package.json`:
```json
{
  "name": "db-design-website",
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

`astro.config.mjs`:
```js
// @ts-check
import { defineConfig } from 'astro/config';
export default defineConfig({ output: 'static' });
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/base"
}
```

Then skip to Step 3 (the astro.config.mjs is already correct from the fallback).

Expected after successful scaffold or fallback: `package.json`, `astro.config.mjs`, `tsconfig.json` are present.

- [ ] **Step 2: Delete the scaffold placeholder page**

```bash
rm src/pages/index.astro
```

- [ ] **Step 3: Replace `astro.config.mjs` contents**

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
});
```

- [ ] **Step 4: Create `.nvmrc`**

File contents (one line):

```
24
```

- [ ] **Step 5: Add `engines` field to `package.json`**

Open the generated `package.json` and add:

```json
"engines": {
  "node": "^20.0.0 || ^22.0.0 || ^24.0.0"
}
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: installs Astro 5.x and creates `package-lock.json`.

- [ ] **Step 7: Start dev server**

```bash
npm run dev &
```

The `&` runs the server in the background. Wait 3–5 seconds for startup, then continue. Expected output: `astro  v5.x.x  ready in Xms` at `http://localhost:4321/`. A 404 is expected — no pages exist yet.

Note: If running interactively (not as a headless agent), you can start the server in a separate terminal without `&` and leave it running throughout the migration.

- [ ] **Step 8: Commit**

```bash
git add astro.config.mjs .nvmrc package.json package-lock.json tsconfig.json
git commit -m "feat: scaffold Astro 5 with static output config"
```

---

## Task 2: Move CSS and JS assets to src/

**Files:**
- Create: `src/styles/shared.css`, `src/styles/hub.css`, `src/scripts/shared.js`, `src/scripts/main.js`

- [ ] **Step 1: Copy CSS and JS files**

```bash
mkdir -p src/styles src/scripts
cp styles/shared.css src/styles/shared.css
cp styles/hub.css src/styles/hub.css
cp js/shared.js src/scripts/shared.js
cp js/main.js src/scripts/main.js
```

- [ ] **Step 2: Verify**

```bash
ls src/styles/ src/scripts/
```

Expected: `shared.css  hub.css` and `shared.js  main.js`

- [ ] **Step 3: Commit**

```bash
git add src/styles/ src/scripts/
git commit -m "feat: copy CSS and JS assets to src/"
```

---

## Task 3: Create BackButton and DBCredit components

**Files:**
- Create: `src/components/BackButton.astro`
- Create: `src/components/DBCredit.astro`

- [ ] **Step 1: Create `src/components/BackButton.astro`**

```astro
---
const { color, background } = Astro.props;
---
<a href="/" class="back-btn" style={`color: ${color}; background: ${background};`}>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <path d="M19 12H5M5 12l7-7M5 12l7 7"/>
  </svg>
  DB Design
</a>
```

The `color` and `background` props are applied as inline styles, overriding the base `.back-btn` rules in `shared.css`. Border is controlled by each page's `<style is:global>` block (not a prop).

- [ ] **Step 2: Create `src/components/DBCredit.astro`**

```astro
<div class="db-credit">
  Website rebuilt by <a href="/">DB Design</a> as part of our AI vibe coding volunteer initiative.
</div>
```

The href is `/` (root-relative) — correct for Astro's static routing. Styling comes from each page's `<style is:global>` block.

- [ ] **Step 3: Commit**

```bash
git add src/components/
git commit -m "feat: add BackButton and DBCredit components"
```

---

## Task 4: Create BaseLayout.astro

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/shared.css';

const { title, description } = Astro.props;
---
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>

<script>
  import '../scripts/shared.js';
</script>
```

Notes:
- `shared.css` is imported in the frontmatter — Astro/Vite processes it and injects it globally on every page that uses this layout.
- The `<script>` block imports `shared.js` as a client-side ES module. Astro bundles it as a `type="module"` (deferred) script. ES module scripts execute *before* `DOMContentLoaded` fires (sequence: HTML parsed → deferred/module scripts run → `DOMContentLoaded` fires), so the `addEventListener('DOMContentLoaded', ...)` call inside `shared.js` registers before the event fires — it works correctly. You may notice `shared.js` contains a top-level IIFE that also calls `initScrollReveal()` immediately; when bundled as a module this will run once at module evaluation time and again when `DOMContentLoaded` fires. The double-init is harmless — the second pass finds the same elements and re-registers the observer, but elements already in view have already been unobserved and won't animate twice.
- `<slot name="head" />` lets pages inject font `<link>` tags into `<head>`. The preconnect hints are placed before this slot so they're always established first, minimizing FOUT.
- `<slot />` in `<body>` receives all page content.

- [ ] **Step 2: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with shared.css, shared.js, and head slot"
```

---

## Task 5: Create ShowcaseLayout.astro

**Files:**
- Create: `src/layouts/ShowcaseLayout.astro`

- [ ] **Step 1: Create `src/layouts/ShowcaseLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import BackButton from '../components/BackButton.astro';
import DBCredit from '../components/DBCredit.astro';

const { title, description, backColor, backBg } = Astro.props;
---
<BaseLayout title={title} description={description}>
  <slot name="head" slot="head" />
  <BackButton color={backColor} background={backBg} />
  <slot />
  <DBCredit />
</BaseLayout>
```

Notes:
- `<slot name="head" slot="head" />` forwards any `slot="head"` content from showcase pages through to `BaseLayout`'s `head` slot. This is the standard Astro pattern for slot forwarding through nested layouts.
- `BackButton` and `DBCredit` are rendered automatically on every showcase page — pages do not need to include them.

- [ ] **Step 2: Commit**

```bash
git add src/layouts/ShowcaseLayout.astro
git commit -m "feat: add ShowcaseLayout with BackButton and DBCredit"
```

---

## Task 6: Port the hub page

**Files:**
- Create: `src/pages/index.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

Open `index.html`. Identify the body content: everything between `<body>` and `</body>`, **excluding the final `<script src="js/main.js"></script>` line**.

Create `src/pages/index.astro` with this structure — paste the extracted body HTML where indicated:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import '../styles/hub.css';
---
<BaseLayout
  title="DB Design — AI Vibe Coding for Local Businesses"
  description="DB Design rebuilds outdated local business websites using AI vibe coding — for free. See what modern web design can do for your community."
>
  <Fragment slot="head">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap" rel="stylesheet" />
  </Fragment>

  <!-- PASTE FULL BODY CONTENT FROM index.html HERE (everything between <body> and </body>, excluding the final <script src="js/main.js"> tag) -->

  <script>
    import '../scripts/main.js';
  </script>
</BaseLayout>
```

Do not modify the pasted HTML. `hub.css` is imported in the frontmatter — Astro injects it as a page-scoped stylesheet.

- [ ] **Step 2: Verify in browser**

Open http://localhost:4321

- Hub page renders with correct gold/dark aesthetic
- Fonts load: Playfair Display on headings, DM Sans on body — no flash of system font
- Scroll-reveal animations trigger on scroll
- 3D card tilt effect on project cards (hover)
- Counter animations on stat numbers
- Nav blur activates on scroll
- No JS errors in browser console (F12)

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: port hub page to Astro"
```

---

## Task 7: Port the plumber page

**Files:**
- Create: `src/pages/showcase/plumber.astro`

- [ ] **Step 1: Create `src/pages/showcase/plumber.astro`**

Open `showcase/plumber.html`. You need:
- The entire `<style>` block contents (everything between `<style>` and `</style>`)
- The body HTML: everything between `<body>` and `</body>`, **excluding** these four elements:
  - `<link rel="stylesheet" href="../styles/shared.css" />`
  - The `<a class="back-btn">...</a>` element
  - The `<div class="db-credit">...</div>` element
  - `<script src="../js/shared.js"></script>`

**After pasting the body HTML:** find any relative page hrefs and update them to root-relative paths. Astro's static output uses directory-based URLs — relative `.html` hrefs will 404. Example: `href="plumber.html"` on the nav logo → `href="/showcase/plumber"`.

```astro
---
import ShowcaseLayout from '../../layouts/ShowcaseLayout.astro';
---
<ShowcaseLayout
  title="Peak Flow Plumbing — Rebuilt by DB Design"
  description="Peak Flow Plumbing — fast, reliable plumbing services. Call us 24/7."
  backColor="#FFFFFF"
  backBg="#1A2744"
>
  <Fragment slot="head">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </Fragment>

  <style is:global>
    /* PASTE FULL <style> BLOCK CONTENTS FROM plumber.html HERE */
    /* The existing .back-btn rule is kept as-is — it controls the border */
  </style>

  <!-- PASTE BODY HTML HERE (excluding back-btn, db-credit, shared.css link, shared.js script) -->

</ShowcaseLayout>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:4321/showcase/plumber

- Navy/orange color scheme renders correctly
- Back button: top-left, navy background, white text, no border — click navigates to /
- Fonts: Bebas Neue headings, Inter body — no FOUT
- Scroll-reveal animations work
- DB Design footer credit at bottom with correct plumber styling
- No JS errors in console

- [ ] **Step 3: Commit**

```bash
git add src/pages/showcase/plumber.astro
git commit -m "feat: port plumber showcase page to Astro"
```

---

## Task 8: Port the salon page

**Files:**
- Create: `src/pages/showcase/salon.astro`

- [ ] **Step 1: Create `src/pages/showcase/salon.astro`**

Open `showcase/salon.html`. The salon page contains an inline `<script>` block (the nav scroll listener) in addition to the `<script src="../js/shared.js">` tag. The extraction rules differ slightly:

- `<style>` block contents → paste verbatim into `<style is:global>`
- Body HTML between `<body>` and `</body>`, **excluding**:
  - `<link rel="stylesheet" href="../styles/shared.css" />`
  - The `<a class="back-btn">...</a>` element
  - The `<div class="db-credit">...</div>` element
  - `<script src="../js/shared.js"></script>`
- The inline `<script>` block (the nav scroll listener) → **include** it, but wrap in `<script is:inline>` instead of `<script>`

**After pasting the body HTML:** update any relative page hrefs to root-relative paths (e.g., `href="salon.html"` → `href="/showcase/salon"`).

```astro
---
import ShowcaseLayout from '../../layouts/ShowcaseLayout.astro';
---
<ShowcaseLayout
  title="Lumière Salon &amp; Spa — Rebuilt by DB Design"
  description="Lumière Salon & Spa — luxury hair, skin, and wellness experiences in a serene setting."
  backColor="#E8D5C4"
  backBg="rgba(28, 20, 16, 0.85)"
>
  <Fragment slot="head">
    <link href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Raleway:wght@300;400;500;600&display=swap" rel="stylesheet" />
  </Fragment>

  <style is:global>
    /* PASTE FULL <style> BLOCK CONTENTS FROM salon.html HERE */
    /* The existing .back-btn rule is kept as-is — it controls the border */
  </style>

  <!-- PASTE BODY HTML HERE (excluding back-btn, db-credit, shared.css link, shared.js script) -->

  <script is:inline>
    /* PASTE THE INLINE SCRIPT CONTENTS FROM salon.html HERE (the nav scroll listener) */
  </script>

</ShowcaseLayout>
```

- [ ] **Step 2: Verify in browser**

Open http://localhost:4321/showcase/salon

- Espresso/blush color scheme renders correctly
- Back button: blush text, dark translucent background, blush border — click navigates to /
- Fonts: Bodoni Moda headings, Raleway body — no FOUT
- Scroll-reveal animations work
- DB Design footer credit at bottom with correct salon styling
- No JS errors in console

- [ ] **Step 3: Commit**

```bash
git add src/pages/showcase/salon.astro
git commit -m "feat: port salon showcase page to Astro"
```

---

## Task 9: Build the bakery page (approved redesign)

**Files:**
- Create: `src/pages/showcase/bakery.astro`

The bakery page is **not** a port of `showcase/bakery.html`. It is built from scratch following the approved bakery redesign implementation plan at `docs/superpowers/plans/2026-03-23-bakery-menu-redesign.md`.

- [ ] **Step 1: Create `src/pages/showcase/bakery.astro` with the wrapper structure**

```astro
---
import ShowcaseLayout from '../../layouts/ShowcaseLayout.astro';
---
<ShowcaseLayout
  title="Sweet Crumb Bakery — Rebuilt by DB Design"
  description="Sweet Crumb Bakery — artisan baked goods and café in the heart of our community."
  backColor="#4A3728"
  backBg="rgba(253, 246, 236, 0.85)"
>
  <Fragment slot="head">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,600&family=Nunito:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  </Fragment>

  <style is:global>
    /* CSS goes here — filled in by following the bakery redesign plan */
    /* REQUIRED: must include .back-btn { border: 1px solid var(--border); } */
  </style>

  <!-- HTML content goes here — filled in by following the bakery redesign plan -->

  <script is:inline>
    /* Inline JS goes here — filled in by following the bakery redesign plan */
  </script>

</ShowcaseLayout>
```

- [ ] **Step 2: Implement the bakery page by following the bakery redesign plan**

Read `docs/superpowers/plans/2026-03-23-bakery-menu-redesign.md` and execute each task, placing content into `bakery.astro`. **The redesign plan targets `showcase/bakery.html` — substitute `src/pages/showcase/bakery.astro` everywhere the plan references that file.** The mapping below covers all other Astro-specific adaptations:

| Redesign plan says | Do this in bakery.astro |
|-------------------|------------------------|
| Edit `showcase/bakery.html` | Edit `src/pages/showcase/bakery.astro` |
| Add to `<style>` block | Add to the `<style is:global>` block |
| Add to inline `<script>` | Add to the `<script is:inline>` block |
| The HTML `<link rel="stylesheet">` | Already handled by BaseLayout — do NOT add |
| The `<script src="../js/shared.js">` | Already handled by BaseLayout — do NOT add |
| The `.back-btn` HTML element | Already handled by ShowcaseLayout — do NOT add |
| The `.db-credit` HTML element | Already handled by ShowcaseLayout — do NOT add |

**Required CSS rule** — ensure the `<style is:global>` block includes this (it's in the existing `bakery.html` but must be added explicitly since we're not porting from that file):

```css
.back-btn { border: 1px solid var(--border); }
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:4321/showcase/bakery

Check each section in order:

**Hero:**
- Slim split layout (not full-viewport) — roughly 50-60vh height
- Copy column on left, photo on right at 4:3 aspect ratio
- "Fresh from the oven daily" caption overlay visible on photo
- "Browse the Menu" (primary) and "Our Story" (ghost) buttons present
- Resize to < 768px: collapses to single column, image wrapper hidden

**Specials strip:**
- Sits between hero and menu — `var(--cream-dark)` background
- "TODAY'S SPECIALS" label on left, today's actual date on right (rendered by JS)
- 3 special cards with emoji, "Special" badge, name, description, price

**Menu section:**
- "Our Menu" title left, "Download PDF Menu" outlined pill button right
- Sticky tab bar: Pastries | Breads | Sandwiches | Beverages
- Tab bar locks below nav on scroll (not above it)
- Click each tab: page scrolls to that section, active tab highlights
- Scroll through sections: active tab updates automatically
- Each section: 2-column item grid with compact name/description/price cards
- Items marked Special have a "Special" badge
- Resize to mobile: tab bar scrolls horizontally; item grids become 1 column

**About:**
- Square photo (1:1, max 400px wide) with text beside it
- Resize to mobile: stacks vertically

**Hours:** Section renders with correct content

**Global:**
- Fonts: Cormorant Garamond headings, Nunito body — no FOUT
- Back button: cocoa text, translucent cream background, subtle border
- No JS errors in console

- [ ] **Step 4: Commit**

```bash
git add src/pages/showcase/bakery.astro
git commit -m "feat: build bakery page with approved redesign in Astro"
```

---

## Task 10: Production build verification

No file changes — this is a verification-only task.

- [ ] **Step 1: Stop the dev server** (Ctrl+C in the terminal running `npm run dev`)

- [ ] **Step 2: Run the production build**

```bash
npm run build
```

Expected: `✓ Completed in Xs.` with no errors or warnings. The `dist/` directory is created.

- [ ] **Step 3: Verify dist/ structure**

```bash
ls dist/
ls dist/showcase/
```

Expected output:
```
dist/
  index.html
  showcase/
    bakery/index.html
    plumber/index.html
    salon/index.html
  _astro/   ← bundled, minified, content-hashed CSS and JS
```

- [ ] **Step 4: Preview the production build**

```bash
npm run preview
```

Open http://localhost:4321 and verify every page:
- Hub: renders, scroll animations work, 3D tilt works, counters animate
- `/showcase/plumber`: renders, back button works, scroll animations work
- `/showcase/salon`: renders, back button works, scroll animations work
- `/showcase/bakery`: all sections render, tab bar works, specials date shows, back button works
- All back buttons navigate to `/` (hub)
- No JS errors on any page

- [ ] **Step 5: No commit needed** — this step makes no file changes

---

## Task 11: Delete old static files and final commit

**Only run this task after Task 10 passes completely.**

- [ ] **Step 1: Stop the preview server** (Ctrl+C)

- [ ] **Step 2: Delete the old static files**

```bash
rm -rf styles/ js/ index.html showcase/
```

- [ ] **Step 3: Confirm the build still passes**

```bash
npm run build
```

Expected: clean build, no errors. `dist/` regenerates successfully.

- [ ] **Step 4: Spot-check one page in preview**

```bash
npm run preview
```

Open http://localhost:4321. Verify the hub and at least one showcase page load correctly. Stop the server.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove old static HTML/CSS/JS files — Astro migration complete"
```
