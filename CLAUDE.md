# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A showcase website for **The Web Foundry** (Cincinnati locale), a volunteer initiative that rebuilds outdated local business websites using AI vibe coding. The site demonstrates capabilities and serves as a template for future client sites. The overarching brand is "The Web Foundry" — Cincinnati is the current locale, with potential future expansion to other locales (e.g. Brown County, IN) each getting their own site with minor localization.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Astro (static output) |
| CMS | Sanity.io (embedded Studio) |
| Hosting | Coolify on OVHcloud VPS |
| Deploy | GitHub → Coolify auto-deploy on push |

- **Build command:** `npm run build`
- **Output directory:** `dist`

## Running Locally

```bash
npm run dev
```
Then visit `http://localhost:4321`

## Site Structure

```
├── src/
│   ├── pages/
│   │   ├── index.astro                  # Main hub page
│   │   └── showcase/
│   │       ├── bakery.astro             # Sweet Crumb Bakery (warm artisan)
│   │       ├── plumber.astro            # Peak Flow Plumbing (industrial bold)
│   │       └── salon.astro             # Lumière Salon & Spa (chic luxury)
│   ├── layouts/
│   │   ├── BaseLayout.astro             # Shared HTML shell
│   │   └── ShowcaseLayout.astro         # Wrapper for showcase pages
│   ├── components/
│   │   ├── BackButton.astro             # Fixed top-left back button for showcase pages
│   │   └── DBCredit.astro              # "Built with The Web Foundry" pill badge
│   ├── scripts/
│   │   ├── shared.js                    # IntersectionObserver scroll reveal + counter animation
│   │   └── main.js                      # Hub-specific: 3D magnetic card tilt, nav blur, parallax
│   ├── styles/
│   │   ├── shared.css                   # Global reset, scroll-reveal utility classes, .back-btn
│   │   └── hub.css                      # Hub page design tokens + all component styles
│   └── lib/
│       ├── sanityClient.ts              # Sanity client (useCdn: false — critical for fresh build-time data)
│       └── imageUrl.ts                  # @sanity/image-url builder
├── studio/                              # Sanity Studio (deployed at cincinnati-web-foundry.sanity.studio)
└── public/
```

## Architecture

**Hub page** (`index.astro`) uses `BaseLayout`, loads `hub.css` and `main.js`.

**Showcase pages** use `ShowcaseLayout`, which wraps content with `BackButton` and `DBCredit`. All page-specific styles live in a `<style>` block using CSS custom properties at `:root`.

`shared.js` auto-initializes on `DOMContentLoaded` — no manual calls needed. It wires up scroll reveal and counters automatically by querying the DOM for `.reveal` and `[data-count]`.

**Sanity CMS** is used for dynamic content fetched at build time:
- Bakery: PDF menu URL (`menuPdf` field)
- Plumber: business hours with 7-day default fallback
- Salon: gallery images with emoji fallback (max 5)

A Sanity webhook triggers a Coolify rebuild on publish (Create + Update, filter: `!(_id in path("drafts.**"))`).

## Shared Utilities (shared.css + shared.js)

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

## Design System

### Hub Page (index.astro)
- **Colors**: `#0A0A0A` bg, `#D4A853` gold, `#F0EBE0` cream
- **Fonts**: `Playfair Display` (display/serif) + `DM Sans` (body)

### Showcase Pages
| Page | Palette | Fonts |
|------|---------|-------|
| bakery.astro | Cream `#FDF6EC`, Terracotta `#C9926B`, Sage `#7A9E82` | Cormorant Garamond + Nunito |
| plumber.astro | Navy `#1A2744`, Orange `#FF6B2B`, Light `#F5F5F5` | Bebas Neue + Inter |
| salon.astro | Espresso `#1C1410`, Blush `#E8D5C4`, Champagne `#C9A96E` | Bodoni Moda + Raleway |

Each showcase page defines its full palette as CSS custom properties in its `<style>` block — search for `:root {` within the file to find them.

## Adding a New Showcase Page

1. Copy the structure of an existing showcase page in `src/pages/showcase/`
2. Pick a distinct aesthetic (fonts, palette, motion style) — use the **frontend-design** skill for design guidance
3. Link from `index.astro` — add a new `.project-card` in the showcase grid
4. Add the matching color swatches and mock wireframe CSS using the `.project-card__mock--[name]` pattern
