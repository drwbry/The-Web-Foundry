# DB Design Website — Astro Migration Spec

**Date:** 2026-03-23
**Goal:** Migrate the static HTML/CSS/JS site to Astro (static output) with layouts, key shared components, and the approved bakery menu redesign implemented as part of the migration.

---

## Scope

- Full site migration: hub page + all three showcase pages
- Astro structure only — no Sanity CMS integration in this migration
- Bakery page built to the approved redesign spec (`docs/superpowers/specs/2026-03-23-bakery-menu-redesign.md`)
- Plumber and salon pages ported as-is
- Visual design unchanged across all pages

---

## Project Structure

```
src/
  layouts/
    BaseLayout.astro        ← <html>, <head>, font imports, shared.css
    ShowcaseLayout.astro    ← extends Base; mounts BackButton + DBBadge
  components/
    BackButton.astro        ← .back-btn; accepts color + background props
    DBBadge.astro           ← "Built with DB Design" pill; no props
  pages/
    index.astro             ← hub page (uses BaseLayout)
    showcase/
      bakery.astro          ← approved redesign (uses ShowcaseLayout)
      plumber.astro         ← as-is port (uses ShowcaseLayout)
      salon.astro           ← as-is port (uses ShowcaseLayout)
  styles/
    shared.css              ← moved from styles/shared.css
    hub.css                 ← moved from styles/hub.css
  scripts/
    shared.js               ← moved from js/shared.js
    main.js                 ← moved from js/main.js
public/                     ← static assets
```

URLs are unchanged: `/` for hub, `/showcase/bakery`, `/showcase/plumber`, `/showcase/salon`.

---

## Layouts

### BaseLayout.astro

Props: `title: string`, `description?: string`

- Renders full `<html lang="en">` document shell
- Imports Google Fonts via `<link>` in `<head>` (Playfair Display, DM Sans — hub fonts; showcase pages override via their own `<style is:global>` `@import`)
- Imports `shared.css` in frontmatter: `import '../styles/shared.css'`
- `<slot />` in `<body>` for page content

### ShowcaseLayout.astro

Props: `title: string`, `description?: string`, `backColor: string`, `backBg: string`

- Wraps `BaseLayout`
- Renders `<BackButton color={backColor} background={backBg} />`
- Renders `<DBBadge />`
- Loads `shared.js` via `<script src="/scripts/shared.js" is:inline>` or bundled import
- `<slot />` for page body content

---

## Components

### BackButton.astro

Props: `color: string`, `background: string`

Renders the `.back-btn` anchor pointing to `/`. Inline styles apply `color` and `background` from props, matching the current per-page hardcoded values.

### DBBadge.astro

No props. Renders the `.db-badge` pill element identically across all showcase pages.

---

## CSS Strategy

- `shared.css` imported globally in `BaseLayout.astro` frontmatter — available to all pages
- `hub.css` imported in `index.astro` frontmatter — hub only
- Each showcase page retains its existing `<style>` block verbatim, wrapped in `<style is:global>` so `:root` CSS custom properties cascade correctly
- No CSS is refactored — styles move as-is

---

## JS Strategy

- `shared.js` imported via `<script>` in `ShowcaseLayout.astro` — Astro bundles it; `DOMContentLoaded` listener works as-is
- `main.js` imported via `<script>` in `index.astro` — hub-specific (3D tilt, parallax, nav blur)
- Bakery inline scripts (date rendering, tab scroll, IntersectionObserver) use `<script is:inline>` — Astro does not process them, preserving current behavior exactly

---

## Bakery Page

`bakery.astro` uses `ShowcaseLayout` with:
- `backColor="#FDF6EC"`
- `backBg="#7A9E82"` (sage)

Page content follows the approved bakery redesign spec in full:
1. Slim split hero (copy left, photo right, gradient caption overlay)
2. Today's Specials strip
3. Tabbed menu with sticky tab bar (Pastries / Breads / Sandwiches / Beverages)
4. About section with square photo
5. Hours section

All HTML, CSS, and JS from the bakery redesign implementation plan is used verbatim. Astro-specific adaptations only:
- File extension `.astro` instead of `.html`
- `<style>` → `<style is:global>`
- Inline `<script>` → `<script is:inline>`
- `shared.css` and `shared.js` provided by `ShowcaseLayout` — no manual `<link>` or `<script>` tags in the page

Plumber and salon receive identical treatment with no redesign.

---

## Build & Deploy

- **Astro config:** `output: 'static'`, `outDir: 'dist'`
- **Scaffold:** `npm create astro` with the "empty" template
- **Node version:** pinned in `.nvmrc` and `package.json` `engines` field
- **Build command:** `npm run build` (matches Coolify config in CLAUDE.md — no changes needed)
- **Output directory:** `dist` (matches Coolify config)

### Files deleted after migration

- `styles/` directory (contents moved to `src/styles/`)
- `js/` directory (contents moved to `src/scripts/`)
- `index.html`
- `showcase/bakery.html`, `showcase/plumber.html`, `showcase/salon.html`

Git history preserves all originals.

---

## Out of Scope

- Sanity CMS integration (separate future migration)
- Any visual design changes to plumber or salon pages
- Mobile refinements beyond those already specified in the bakery redesign spec
- New showcase pages
