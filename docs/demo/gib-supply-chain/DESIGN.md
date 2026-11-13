# GIB Supply Chain demo: design and content spec

This is the build spec for `/demo/gib-supply-chain`. `PLAN.md` at the repo root lists the steps. This file says what each thing looks like and what it says.

The prospect's current site is https://www.gibsupplychain.com (HubSpot). Their text is saved in `source/*.md` in this folder. Their images are in `src/assets/demo/gib-supply-chain/`. You do not need network access to build this.

## 1. What we are showing them

GIB sells supply chain software that runs inside SAP. Their buyers are supply chain and IT leaders at large manufacturers. Their current site has good content but every section looks the same, pages are long, and it is hard to scan.

The demo must feel: calm, precise, enterprise, fast to scan. A visitor should understand what GIB is in five seconds and find their module in one click.

Four ideas carry the design. Use them everywhere, and do not add others.

1. **The cockpit.** This is the main one. GIB's biggest selling point is that it pulls information that is normally spread across many SAP transactions into one or a few customizable screens, with stronger visuals, for each user and department. GIB calls these screens cockpits. The demo site should work the same way: instead of making visitors scroll through a long page, each module is shown as one cockpit window with a rail of views on the left and the live screen on the right. The site's layout proves the product's point. See `Cockpit.astro`, `Scattered.astro` and the gauge tiles in `Stats.astro`.
2. **Traffic lights.** GIB's own SAP screens mark materials red, amber, green. We reuse that as the brand motif: three small dots before eyebrow labels, and red / amber / green for the "Alert, Analysis, Action" steps.
3. **Framed screenshots.** Real product screenshots, shown inside a simple window frame, are the main imagery. No stock photos. No illustrations. No invented dashboards: the cockpit windows only ever show GIB's real screenshots, real feature names and real customer numbers.
4. **Dark and light bands.** Pages alternate dark ink bands and light paper bands so sections are easy to tell apart.

## 2. Hard rules

- Every page: `<meta name="robots" content="noindex, nofollow">`.
- No forms. Every "Get a demo" button is a link to the prospect's live site (see `links` in section 5).
- Copy their words. Do not invent customers, numbers, quotes, features or claims. Section 6 has the only rewritten copy; use it exactly.
- No em dashes (—) anywhere in page text. Where the source text has one, replace it with a comma, a colon, or a full stop. En dashes in number ranges (15–40%) are fine; write them as `15-40%`.
- Do not use the "logo quote" badges, people's headshots or the GIFs from their site. They were left out on purpose.
- All class names start with `gib-`. All CSS variables start with `--gib-`. Put no styles in `src/styles/shared.css` or `hub.css`.
- Do not touch any file outside the list in `PLAN.md`.
- Text contrast must pass WCAG AA. Never put white text on orange. Orange buttons use ink text.
- Every animation respects `prefers-reduced-motion: reduce`.
- Images use Astro's `<Image>` from `astro:assets` with real `alt` text. Screenshots get alt text that says what the screen shows, for example "GIB Operations material overview with shortage traffic lights".

## 3. Tokens

Put these in a global style block in `Layout.astro`.

```css
:root {
  --gib-ink: #0E1116;        /* darkest band, nav, footer */
  --gib-ink-2: #171C24;      /* cards on dark */
  --gib-ink-3: #232A35;      /* borders on dark */
  --gib-paper: #F5F7F9;      /* light band */
  --gib-white: #FFFFFF;      /* cards on light */
  --gib-line: #E1E6EB;       /* borders on light */
  --gib-text: #1B222C;       /* body text on light */
  --gib-muted: #56616F;      /* secondary text on light */
  --gib-on-dark: #F2F4F7;    /* body text on dark */
  --gib-on-dark-muted: #A9B4C0;
  --gib-orange: #F37021;     /* brand accent, buttons, highlights on dark */
  --gib-orange-ink: #B4480C; /* orange for text and links on light */
  --gib-steel: #6E8BA0;
  --gib-steel-light: #BCCCDD;
  --gib-red: #D64545;
  --gib-amber: #E6A117;
  --gib-green: #2E9E5B;
  --gib-ff: 'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --gib-ff-mono: 'IBM Plex Mono', ui-monospace, 'SFMono-Regular', monospace;
  --gib-max: 1200px;
  --gib-radius: 14px;
  --gib-radius-sm: 8px;
  --gib-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --gib-shadow: 0 1px 2px rgba(14,17,22,.06), 0 12px 32px rgba(14,17,22,.08);
}
```

Fonts (in the layout's `head` slot):

```html
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
```

Type scale:

| Use | Size | Weight | Notes |
|---|---|---|---|
| h1 | `clamp(2.4rem, 5vw, 4rem)` | 700 | line-height 1.05, letter-spacing -0.02em, `text-wrap: balance` |
| h2 | `clamp(1.8rem, 3.2vw, 2.6rem)` | 700 | line-height 1.12, letter-spacing -0.015em |
| h3 | `1.25rem` | 600 | |
| lead | `clamp(1.1rem, 1.5vw, 1.3rem)` | 400 | line-height 1.5, max-width 60ch |
| body | `1.0625rem` | 400 | line-height 1.6, max-width 68ch |
| eyebrow | `.78rem` mono | 500 | uppercase, letter-spacing .14em |
| stat number | `clamp(2.6rem, 5vw, 4rem)` mono | 500 | |

Spacing: sections have `padding-block: clamp(4rem, 9vw, 7.5rem)`. Content sits in `.gib-wrap` (max-width `--gib-max`, side padding 1.5rem). Grid gaps are 1.5rem or 2rem.

Breakpoints: stack to one column below 900px. Mobile nav below 960px. Check at 390px, 768px and 1440px wide.

## 4. Components

All live in `src/components/demo/gib-supply-chain/`. Each is a small `.astro` file with its own scoped `<style>`. Props are listed; keep them this simple.

**`Layout.astro`** (props: `title`, `description`, `current`)
Wraps `BaseLayout` the same way `src/components/demo/morning-and-night/Layout.astro` does. Read that file first and copy its structure. Differences:
- Do not use `DBCredit`. The footer has its own credit line (below).
- OG image: `hero-home.png` through `getImage`, 1200x630, `fit: 'contain'`, background `#F5F7F9`, format `jpg`.
- Contains, in order: preview bar, sticky nav, `<main id="main-content"><slot /></main>`, footer.

Preview bar: one thin line at the very top, `--gib-orange` background, ink text, centered, `.8rem`: `Concept preview by The Web Foundry for GIB Supply Chain` with "The Web Foundry" linked to `/`.

Nav: sticky, `--gib-ink` background, 68px tall, bottom border `--gib-ink-3`.
- Left: `logo-white.png`, 44px tall, links to `base`.
- Middle links: Platform (has dropdown), Solutions, Why GIB, GIB for SAP, Resources (external, opens new tab, shows a small `↗`).
- Platform dropdown lists: Platform overview, GIB Forecast, GIB Inventory, GIB Operations, GIB Production, AI in GIB. Each row shows the name and a one-line category (from `products` data). Build it with CSS only: a `<li>` holding a `<button aria-haspopup="true">` and a panel that shows on `:hover` and `:focus-within`.
- Right: orange "Get a demo" button.
- Below 960px: hide the middle links and show a `<details class="gib-menu">` with a "Menu" summary. Inside it, list every link flat (all six Platform links first). No JavaScript.
- Current page link gets `aria-current="page"` and an orange 2px underline.

Footer: `--gib-ink` background. Four columns on desktop, stacked on mobile.
1. Logo, then: `GIB is developed and delivered by ifm Supply Chain, a division of ifm efector.`
2. "Platform": the six Platform links.
3. "Company": Solutions, Why GIB, GIB for SAP.
4. "Resources" (all external): Case studies, Webinars, Blog, Customer portal, Community forum.
Bottom row: `© 2026 GIB USA, an ifm company` and a link "Privacy Policy" to `links.privacy`. Then the credit line in `--gib-on-dark-muted`, `.8rem`: `This page is a concept preview built by The Web Foundry. It is not the official GIB website. Visit gibsupplychain.com for the live site.` Link "The Web Foundry" to `/` and "gibsupplychain.com" to `links.site`.

**`Eyebrow.astro`** (props: `text`, `lights` default `true`)
Mono uppercase label. When `lights` is true, show three 7px dots before the text: red, amber, green, 4px apart. On dark bands the text is `--gib-on-dark-muted`; on light bands `--gib-muted`. Use `color: inherit` and let the section set it.

**`Button.astro`** (props: `href`, `variant` = `primary` | `ghost` | `link`, `external` boolean)
- primary: orange background, ink text, weight 600, padding `.8rem 1.3rem`, radius 8px. Hover: lift 1px, slightly lighter orange.
- ghost: transparent, 1px border in current text color at 30% opacity. Hover: border at 100%.
- link: text with a trailing `→` that slides 3px right on hover.
- `external` adds `target="_blank" rel="noopener"`.
- Visible focus ring: `outline: 2px solid var(--gib-orange); outline-offset: 3px`.

**`Frame.astro`** (props: `src` (image import), `alt`, `eager` boolean)
The window frame for screenshots. A rounded box (radius 14px, `--gib-shadow`, 1px border) with a 34px top bar in `#E9EEF3` holding three 9px dots (red, amber, green) on the left. Below the bar, the `<Image>` at full width, `widths={[640, 960, 1280, 1920]}`, `sizes="(min-width: 900px) 55vw, 100vw"`. The whole frame is a link to the full-size image opening in a new tab, so visitors can zoom. Screenshots are 16:9.

**`Section.astro`** (props: `tone` = `dark` | `light` | `white`, `id`)
Sets background and text colors for a band and wraps children in `.gib-wrap`. dark = `--gib-ink` with `--gib-on-dark` text. light = `--gib-paper`. white = `--gib-white`.

**`Quote.astro`** (props: `text`, `name`, `role`, `featured` boolean)
A `<figure>` with `<blockquote>` and `<figcaption>`. A large orange `“` mark above the text. `name` is bold; `role` is muted on the next line. If there is no person's name, the first attribution line goes in `name`. `featured` makes the text h2-sized and centers the block at max-width 900px.

**`Stats.astro`** (props: `items` = array of `{ value, prefix, suffix, label, source }`)
A dark band with a 4-column grid (2 columns below 900px). Each cell: the number in mono, then the label. The number is `<span>{prefix}</span><span data-count={value}>{value}</span><span>{suffix}</span>`. The repo's `shared.js` animates any `[data-count]` element from 0 on scroll, so write the real value as the text too (it is the no-JS fallback). `source`, when present, is a small mono line under the label, for example `GIB Operations`. A thin `--gib-ink-3` line separates cells.

Gauge tiles: when an item's suffix is `%`, draw a ring gauge to the left of the number, 56px wide, filled to that percentage. Use a `conic-gradient` from `--gib-orange` to `--gib-ink-3` with a round mask, or an SVG circle with `stroke-dasharray`. Values above 100 show a full ring. Items that are not percentages (hours, months, money, ranges) show no ring. The ring is decoration (`aria-hidden`). Together the four tiles should read like an instrument panel. Do not add any number that is not in the data.

**`ModuleCards.astro`** (props: `exclude` optional slug)
Four cards linking to the four product pages, from `products` data: category eyebrow, name, summary, `link`-style button using the product's `verb` (Plan, Optimize, Coordinate, Schedule). Operations shows a small "Most popular" tag. `exclude` drops one card (used on product pages to show the other three).

**`Cockpit.astro`** (props: `label`, `views`, `initial` default `0`, `id`)
The signature component. It is used on the home page, the platform page and all four product pages. It looks like one application window, not like a web page section.

`views` is an array of `{ key, title, kicker, text, bullets, shot, alt, href, hrefLabel, tag }`. Only `key` and `title` are required.

Structure, top to bottom:
- **Title bar.** 40px tall, `--gib-ink-2`. Left: three 9px dots (red, amber, green). Then `label` in mono, for example `GIB Platform` or `GIB Operations`. Right: a mono counter that shows the selected view, for example `03 / 06`.
- **Body.** Two parts side by side.
  - **Rail** (left, 280px, `--gib-ink-2`, right border `--gib-ink-3`). One button per view, stacked. Each button shows a mono number (`01`, `02` ...) and the view `title`. If the view has `tag` (for example `Most popular`), show it as a small orange outline pill. The selected button has a 3px orange left border, `--gib-ink-3` background and white text. The others are `--gib-on-dark-muted`.
  - **Screen** (right, fills the rest, `--gib-ink` background, 1.5rem padding). Top: the view's `kicker` in mono (optional), `title` as h3, then `text`. If the view has `bullets`, show them in two columns with small green check marks. If it has `href`, show a `link` button with `hrefLabel`. Below that: the view's `shot` image at full width with radius 8px and a 1px `--gib-ink-3` border. The image links to the full-size file in a new tab. Do not wrap it in `Frame`; the cockpit window is already the frame.
- **Status bar.** 32px, `--gib-ink-2`, mono `.75rem`, `--gib-on-dark-muted`. Left: a green dot and the text `Inside SAP S/4HANA and SAP ECC`. Right: `No separate database. No middleware.`

The whole window has radius 14px, a 1px `--gib-ink-3` border and a deep shadow (`0 30px 80px rgba(0,0,0,.35)`). It always uses the dark colors above, whatever band it sits on. Put it on a dark or a light band as the page spec says.

Behavior:
- Real ARIA tabs with vertical orientation: the rail is `role="tablist" aria-orientation="vertical"`, each button is `role="tab"` with `aria-selected` and `aria-controls`, each screen is `role="tabpanel"`. Up and down arrow keys move between views. Home and End jump to first and last.
- All screens are in the HTML. JavaScript only toggles the `hidden` attribute and updates the counter. The swap is a 200ms fade.
- No JavaScript: show every screen stacked, one after another, and turn the rail into a plain list of anchor links. Do this by having the script add a `gib-js` class to the component, and only apply the hiding and the side-by-side tab layout under `.gib-js`.
- Each screen has `id={`${id}-${key}`}` so other parts of the page can link straight to a view. On load, if the URL hash matches a screen id, select that view.
- The first image (the `initial` view) is `loading="eager"` when the cockpit is near the top of a page; all others are lazy.
- Below 900px: the rail becomes a horizontally scrolling row of pill buttons above the screen (`overflow-x: auto`, no wrapping, each pill at least 44px tall). The status bar keeps only its left text.
- Several cockpits can be on one site but only one per page. Write the script as a plain `<script>` in the component, under 60 lines, and scope every query to the component root.

**`Scattered.astro`** (no props; home page only)
A before and after picture that explains the cockpit idea in one glance. Three columns on desktop: before, arrow, after. Stacked on mobile.
- **Before** (left). Mono eyebrow `Today: spread across SAP`. A loose cluster of eight small chips, each rotated by a few degrees (between -4 and 4) and slightly overlapping, so it looks untidy on purpose. Chips are white with a `--gib-line` border and mono text. The chips are, exactly: `MD04`, `MD07`, `ME58`, `CO24`, `Excel export`, `VLOOKUP`, `Email thread`, `Another report`. These come from GIB's own customer quotes. Do not add other transaction codes.
- **Arrow** (middle). A thin line with an arrowhead and the mono label `One cockpit`. On mobile it points down.
- **After** (right). A small cockpit window: the same title bar as `Cockpit.astro` with the label `GIB Operations`, and under it the screenshot `shots/gib-operations-dashboard-with-menu-options.png`. Under the window, three short lines with traffic light dots: red `Alert`, amber `Analysis`, green `Action`, each followed by its sentence from section 6.
- The chips are decoration: give the cluster `aria-hidden="true"` and add a visually hidden sentence for screen readers: `Today the same information is spread across separate SAP transactions, spreadsheets and email.`

**`Faq.astro`** (props: `items` = array of `{ q, a }`)
Native `<details>` elements, one per question, separated by `--gib-line` rules. Summary is h3-sized with a `+` that turns to `−` when open. No JavaScript.

**`CtaBand.astro`** (props: `heading`, `text`, `primaryLabel` default `Get a demo`)
Dark band, centered, with a faint orange radial glow behind the heading (`radial-gradient` at 12% opacity). One primary button to `links.demo` and one ghost button "Explore the platform" to `${base}/platform`.

**`CaseStudy.astro`** (props: `eyebrow`, `title`, `text`, `href`, `image` optional)
A wide white card on a light band. Text on the left with a "Read the case study" external link button. If `image` is given it sits on the right (rounded corners, covers the card's right half); if not, the card is text only with an orange 4px left border.

**`LogoWall.astro`** (no props)
Light band. Heading line (see section 6). Six logos from `logos/`: `agilent`, `basf-chemetall`, `borgwarner`, `dana`, `tata`, `te-connectivity`. Each sits in a white cell (so the logo art always has a white background behind it), max height 40px, `filter: grayscale(1); opacity: .75`, full color on hover. Six columns on desktop, three on tablet, two on mobile. Alt text is the company name.

**`CertBadges.astro`** (no props)
The three SAP certification badges from `logos/sap-cert-*.png` in a row. Each sits on a white rounded chip with `.5rem .9rem` padding so it reads on dark and light bands. Height 40px. Alt text: "SAP Certified: clean core, SAP S/4HANA Cloud", "SAP Certified: works with RISE with SAP", "SAP Certified: integration with SAP S/4HANA".

Motion: add the repo's `.reveal` class (handled by `shared.js`) to section headings and cards, with `.reveal-delay-1` to `.reveal-delay-4` to stagger cards in a row. Nothing else moves except button hovers and the tab switch (a 200ms fade).

## 5. Data (`data.js`)

One file: `src/components/demo/gib-supply-chain/data.js`. Start with a comment like the one at the top of `src/components/demo/morning-and-night/data.js`, saying the content was transcribed from gibsupplychain.com in November 2026.

```js
export const base = '/demo/gib-supply-chain';
const live = 'https://www.gibsupplychain.com';

export const links = {
  site: live,
  demo: `${live}/gib-platform#demo`,
  resources: `${live}/gib-insights`,
  caseStudies: `${live}/gib-insights/tag/case-studies`,
  webinars: `${live}/webinars/sap-mrp-parameters-safety-stock`,
  portal: 'https://portal.ifm-business-solutions.com/en/',
  community: `${live}`,   // the forum invite link is private; point at the live site
  privacy: `${live}`,     // their footer privacy link; point at the live site
  caseTE: `${live}/gib-insights/preparing-for-sap-s4hana-how-te-connectivity-standardized-supply-chain-operations`,
  caseFFF: `${live}/gib-insights/how-fff-enterprises-reduced-manual-procurement-work-in-sap-by-150-hours-per-month`,
  caseMolex: `${live}/gib-insights/how-molex-restored-execution-visibility-in-sap-after-moving-planning-to-kinaxis`,
  caseAgilent: `${live}/gib-insights/enterprise-class-demand-planning-at-agilent-technologies`,
  operationsVideo: 'https://player.vimeo.com/video/1055307014',
};
```

Images: add `images.js` next to `data.js`:

```js
const shots = import.meta.glob('../../../assets/demo/gib-supply-chain/shots/*.png', { eager: true, import: 'default' });
export function shot(name) {
  const hit = Object.entries(shots).find(([path]) => path.endsWith(`/${name}`));
  if (!hit) throw new Error(`Missing screenshot: ${name}`);
  return hit[1];
}
```

A wrong file name then fails the build instead of shipping a broken image. In `data.js`, store screenshot file names as strings (for example `shot: 'gib-operations-missing-parts.png'`) and call `shot()` in the page. `moduleViews` in `data.js` therefore also holds file names; the page maps them through `shot()` before passing the views to `Cockpit`. Import hero images, logos and symbols directly in the component that uses them.

### `products`

An object keyed by slug. The four slugs are `forecast`, `inventory`, `operations`, `production`. Each product has:

```js
{
  slug, name,            // 'operations', 'GIB Operations'
  category,              // 'Supply Chain Operations | MRP & Procurement'
  verb,                  // 'Coordinate'
  summary,               // one sentence, from the home page product card
  features: [],          // the 5 or 6 bullets from the home page product card
  popular,               // true for operations only
  tabShot,               // screenshot file name for the home page tabs
  hero: 'hero-operations.png',
  tagline,               // the h3 under the product name on its page
  intro: [],             // the intro paragraph(s) on its page
  heroQuote: { text, name, role },
  capabilitiesHeading, capabilitiesSub,
  capabilities: [ { title, text, shot } ],   // the tabbed feature list on their page
  outcomes: [ { title, text } ],             // production only; others omit it
  stats: [ { value, prefix, suffix, label } ],
  quotes: [ { text, name, role } ],          // "Why Our Customers Love ..." section, max 4
  spotlight: { eyebrow, title, text, href, image },  // operations only in this pass
  closingHeading, closing: [],               // the "... Control Layer for SAP" heading and bullets
}
```

Fill each product from `source/gib-<slug>.md`. In the source file, each capability title is followed by an `[IMAGE: shots/...]` line and then its paragraph. That is the `title`, `shot`, `text` triple. If a capability has no image line, leave `shot` out and the page shows text only for that row.

Fixed values (already checked against the live site, use exactly these):

| slug | category | verb | tabShot |
|---|---|---|---|
| forecast | Demand Planning | Plan | `gxf-seasonal-en.png` |
| inventory | Inventory Optimization | Optimize | `gib-inventory-abc-xyz-classification-and-product-life-cycle-in-sap.png` |
| operations | Supply Chain Operations \| MRP & Procurement | Coordinate | `gib-operations-dashboard-with-menu-options.png` |
| production | Production Planning & Scheduling | Schedule | `gib-gxm-drag-and-drop-scheduling.png` |

Stats. The source text shows these numbers as `0` because the live site animates them. The real values are:

| slug | stats, in order |
|---|---|
| forecast | `113` `%` increase in forecast accuracy · `45` `%` reduction in planning time, effort, and expense · `4` ` months` for return on investment · `16` `%` reduction in open PO value |
| inventory | `40` `%` inventory reduction in 11 months · prefix `USD ` `2.7` suffix `M` reduction in inventory while maintaining service levels · prefix `EUR ` `140` suffix `M` inventory reduction in 12 months · `6` ` months` ROI achieved |
| operations | `42` ` hr` reduction in manual effort per buyer per month · `60` `%` fewer buyer overrides of MRP · `75` `%` reduction in MRP noise · `80` `%` faster order processing |
| production | `45` `%` faster planning cycles · `50` `%` reduction in backorders · `75` `%` reduction in material-related production disruptions · `6` ` weeks` ROI achieved |

Closing headings, exactly: forecast `GIB Forecast at a glance` · inventory `The Inventory Control Layer for SAP` · operations `Daily Operational Control Embedded in SAP` · production `The Production Control Layer for SAP`. The `closing` bullets are the four lines right under that heading in each source file (for forecast, the four lines under the second `## GIB Forecast` heading).

Operations spotlight: eyebrow `Customer spotlight`, title and text from the "CUSTOMER SPOTLIGHT" block in `source/gib-operations.md`, `href: links.caseFFF`, image `case-fff.png`.

Fix these typos from the source when you transcribe: "Hightlight" → "Highlight", "requestions" → "requisitions", "Strength On-Time Delivery" → "Strengthen On-Time Delivery", "its in SAP" → "it's in SAP".

Quote attribution: where the source shows a name line then a role line, use them as `name` and `role`. Where it shows only a role and a company description (for example "Systems Manager, Sourcing" / "Manufacturer | +2B Annual Revenue"), use those two lines as `name` and `role`.

### `faq`

The five questions and answers at the end of `source/home.md`, copied as written (minus em dashes). The last answer is cut off in the source file at "inside SAP."; that is the full answer.

## 6. Pages

All pages are in `src/pages/demo/gib-supply-chain/`. Each starts with `Layout` and passes `title`, `description` and `current`. Use the "Title" and "Meta description" lines at the top of each source file for those two props.

Section order matters. Do not add sections that are not listed.

### `index.astro` (home). Source: `source/home.md`

This page has the only rewritten copy in the demo. Use it exactly.

1. **Hero** (dark). Two columns: text left, image right.
   - Eyebrow: `For SAP S/4HANA and SAP ECC`
   - h1: `Everything you need is already in SAP. It's just not in one place.`
   - Lead: `GIB connects your supply chain processes end to end, so alert, analysis, and action happen in one place: inside SAP.`
   - Buttons: primary `Get a demo` → `links.demo` (external). Ghost `Explore the platform` → `${base}/platform`.
   - Under the buttons: `CertBadges`.
   - Right: `hero-home.png` on a `--gib-paper` panel with radius 20px and 1.5rem padding (the image has a light background, so it must not sit directly on the dark band). `loading="eager"`. Alt: "GIB dashboard inside SAP with process indicators for demand planning, procurement, inventory and manufacturing".
2. **LogoWall** (light).
   - Eyebrow: `Trusted in complex manufacturing and distribution`
   - Line: `25+ years of SAP supply chain expertise, serving customers worldwide.`
3. **The problem and the fix** (white).
   - Eyebrow: `From scattered to one screen`
   - h2: `SAP holds every signal. It doesn't connect them.`
   - Paragraph: `The shortage, the material position, and the purchase order sit in separate screens. Coordinating a response across planners, buyers, and schedulers still happens in Excel and email.`
   - Then `Scattered`. Its three "after" lines are:
     - red, `Alert`: `Catch shortages and exceptions early.`
     - amber, `Analysis`: `See the full material position across plants in one view.`
     - green, `Action`: `Trigger the purchase or reschedule without leaving SAP.`
4. **The platform cockpit** (dark).
   - Eyebrow: `The GIB platform`
   - h2: `One cockpit for each part of your supply chain`
   - Lead: `GIB is deployed directly inside your SAP system as an SAP certified clean core extension. It reads your existing SAP data and executes through standard SAP processes. If a field exists in your SAP tables, GIB can use it.`
   - Then `Cockpit` with `label="GIB Platform"`, `id="modules"`, `initial={2}` (Operations). Four views, one per product, in the order forecast, inventory, operations, production. Map each product to a view like this: `key: slug`, `title: name`, `kicker: category`, `text: summary`, `bullets: features`, `shot: tabShot`, `href: ${base}/${slug}`, `hrefLabel: "Open " + name`, `tag: "Most popular"` for operations only.
5. **No middleware** (light). Centered.
   - h2: `No separate database or system. No middleware.`
   - Lead: `Planners and buyers work in the SAP screens they already use, and every decision runs on current data, not a copy.`
   - Three cards, from "Key Benefits Only GIB Delivers" in `source/why-gib.md`: `Built Exclusively for SAP`, `Built-in, Not Bolted On`, `End-to-End Operational Scope`, each with its paragraph.
   - Link button: `See why customers choose GIB` → `${base}/why-gib`.
6. **Stats** (dark). Eyebrow: `Customer results`. Four items, each with `source`:
   - `42` ` hr` · `reduction in manual effort per buyer per month` · `GIB Operations`
   - `40` `%` · `inventory reduction in 11 months` · `GIB Inventory`
   - `45` `%` · `reduction in planning time, effort, and expense` · `GIB Forecast`
   - `50` `%` · `reduction in backorders` · `GIB Production`
7. **Quotes** (white). One featured `Quote` (the Nature's Way quote, Jean Treml, Materials Director at Nature's Way), then a 3-column row with the three other quotes from the home source (Systems Manager, Sourcing; Peter Nickel; Udo Wessbecher).
8. **CaseStudy** (light). Eyebrow `Featured case study`, title and paragraph from the "FEATURED CASE STUDY" block, `href: links.caseTE`. No image.
9. **Faq** (white). Eyebrow `FAQ`, h2 `Common questions`. Two columns on desktop: heading left, questions right.
10. **CtaBand**. Heading: `See GIB working inside SAP.` Text: `Bring your own questions. The GIB team will walk through your planning, procurement, and production scenarios.`

### `[product].astro` (four product pages). Source: `source/gib-forecast.md`, `gib-inventory.md`, `gib-operations.md`, `gib-production.md`

One file builds all four pages with `getStaticPaths` over `Object.values(products)`, so the URLs are `/demo/gib-supply-chain/forecast`, `/inventory`, `/operations`, `/production`. `current="platform"`.

1. **Hero** (dark). Eyebrow `SAP S/4HANA | SAP ECC`. h1 = product name. Lead = `tagline`. Then `intro` paragraphs in `--gib-on-dark-muted`. Buttons: primary `Get a demo`; ghost `Open the cockpit` → `#capabilities`. Right: the product's `hero` image on a `--gib-paper` panel, same as the home hero.
2. **Hero quote** (light). One featured `Quote` from `heroQuote`.
3. **Outcomes** (white). Production only. h2 `Manufacturers use GIB Production to`. Four cards from `outcomes`.
4. **The cockpit** (light, `id="capabilities"`). This is the heart of the page. h2 = `capabilitiesHeading`, lead = `capabilitiesSub`. Then `Cockpit` with `label={name}` and `id="view"`. One view per capability: `key` is `1`, `2` and so on, `title` and `text` from the capability, `shot` from `shot(capability.shot)`. No bullets, no link. Write alt text for each screenshot from the capability title, for example "GIB Operations screen: prioritize exception messages and coverage risk". If a capability has no `shot`, its screen shows the title and text only.
   - Under the cockpit, one centered muted line: `Screens shown are from GIB running inside SAP. Select a view on the left.`
5. **Stats** (dark). Eyebrow: `Why customers choose {name}`. The product's four `stats`, no `source`. Percent items get ring gauges (see `Stats.astro`).
6. **Quotes** (light). Up to four `Quote` cards in a 2-column grid.
7. **CaseStudy** (white). Only when `spotlight` exists.
8. **Closing** (dark). h2 = `closingHeading`. The `closing` bullets as a 2-column list with green check marks. Primary button `Request a demo` → `links.demo`. Operations only: add a ghost button `Watch the video` → `links.operationsVideo` (external).
9. **Other modules** (light). Eyebrow `Part of the GIB platform`. h2 `Works with the rest of GIB`. `ModuleCards` with `exclude` set to this product. Link button `Platform overview` → `${base}/platform`.

### `platform.astro`. Source: `source/gib-platform.md`. `current="platform"`

1. Hero (dark). Eyebrow `Embedded in SAP ECC and SAP S/4HANA`. h1 `Run your supply chain more effectively in SAP`. Lead: the h3 line under it in the source. Buttons as on the home hero (ghost goes to `#modules`). Right: `hero-operations.png` on a paper panel.
2. Featured `Quote` (light): the Director of Purchasing quote.
3. Four capability groups (white). h2 and lead from "Improve System Performance, Drive Better Supply Chain Outcomes". A 2x2 grid of cards: Cross-Functional Workspaces, Built-In Collaboration, Decision Prioritization, Embedded Optimization Logic. Each card: the small line above the title in the source as an eyebrow (no lights), the title, and its four bullets.
4. Statement (dark). The sentence that starts "GIB turns SAP from a system that records outcomes" as a centered h2, then `CertBadges`.
5. Modules (light, `id="modules"`). Eyebrow `Role-based operational cockpits`. h2 `Four modules. One SAP system.` Lead: `Planners, buyers, schedulers, and production teams each get a workspace built for their job, on the same live SAP data.` Then the same `Cockpit` as home page section 4 (same four views, `label="GIB Platform"`, `initial={2}`). To avoid writing the mapping twice, export a `moduleViews` array from `data.js` and use it on both pages.
6. Quotes (white): the three quotes under "What Our Customers Are Saying".
7. `CtaBand`. Heading: `See the platform on your own SAP data.` Text: leave empty.

### `why-gib.astro`. Source: `source/why-gib.md`. `current="why"`

1. Hero (dark). Eyebrow `Why GIB`. h1 `An easier way to manage, coordinate, and execute supply chain processes in SAP`. Lead: `For SAP ECC and SAP S/4HANA.` Primary button, then `CertBadges`. Right: `hero-operations.png` on a paper panel.
2. Featured `Quote` (light): the Materials Manager quote.
3. Four measures (white). Eyebrow `Built-in cross-functional intelligence`. h2 `Remove the friction that slows your supply chain down`. Four rows, numbered `01` to `04` in large mono: Decision Speed, Rework Rate, Exception Cycle Time, Workaround Frequency. Each row: number left, then title, the short bold line, and the paragraph. A `--gib-line` rule between rows.
4. Three benefits (dark). h2 `Key benefits only GIB delivers`. Three cards.
5. Quotes (light): the four quotes, 2-column grid.
6. `CtaBand`. Heading: `Optimize supply chain performance in SAP.` Text: `SAP executes transactions. GIB improves how work moves, how decisions are made, and how execution happens across your supply chain organization.`

### `solutions.astro`. Source: `source/solutions.md`. `current="solutions"`

1. Hero (dark). Eyebrow `SAP S/4HANA | SAP ECC`. h1 `Integrated Supply Chain Execution for SAP`. Lead `Connect advanced planning platforms to SAP ERP.` Primary button. Right: `hero-solutions.png` on a paper panel.
2. Intro (white). h2 `Bring execution under control in SAP`. The two paragraphs that follow it in the source.
3. Four steps (light). A 4-column row of cards: See What Matters, Set Clear Priorities, Align Decisions, Execute Faster. Each card has one of the GIB symbols at 44px on top, in this order: `symbol-6e8ba0.png`, `symbol-bcccdd.png`, `symbol-orange.png`, `symbol-black.png` (empty `alt`). A thin arrow line connects the cards on desktop.
4. Delivered through the platform (dark). h2 `Delivered through the GIB platform`. The paragraph from the source. Then four cards, one per module, each showing the module name, the role label from the source (Signal Quality, Policy Alignment, Decision Coordination, Execution Alignment), its sentence, and a link button `Explore {name}`.
5. `CaseStudy` (light). Eyebrow `Proven in hybrid SAP environments`, the Molex title and paragraph, `href: links.caseMolex`. No image.
6. `CtaBand`. Heading: `Connect your planning system to SAP.` Text: leave empty.

### `gib-for-sap.astro`. Source: `source/gib-for-sap.md`. `current="sap"`

1. Hero (dark). Eyebrow `GIB for SAP`. h1 `Built-in cross-functional intelligence for supply chains running on SAP`. Lead: the question line under it in the source. Primary button. Right: `hero-home.png` on a paper panel.
2. Intro (white). The paragraph that starts "The GIB platform delivers a suite".
3. Eight capabilities (light). h2 `Reduce manual coordination work in SAP`. A 4x2 grid (2x4 on tablet, one column on mobile) of small cards: title and sentence, numbered `01` to `08` in mono. Then the closing sentence that starts "These capabilities enable".
4. Featured `Quote` (dark): the quote that starts "Before we implemented GIB our buyers were changing 80%", with its attribution from the source.
5. Modules (white). h2 `Built-in solutions for managing supply chain operations in SAP`. `ModuleCards`.
6. `CtaBand`. Default heading: `See GIB working inside SAP.` Text: leave empty.

### `ai.astro`. Source: `source/ai-in-gib.md`. `current="platform"`

1. Hero (dark). Eyebrow `AI in GIB`. h1 `AI, embedded where it delivers operational value`. Lead: the paragraph under the first heading in the source, if there is one; if not, leave it out. Buttons: primary `Talk to the team` → `links.demo`; ghost `See AI features` → `#ai-features`. Right: `hero-ai.png` on a paper panel.
2. Four principles (light). A 4-column row, numbered `01` to `04`: the four titles and their paragraphs.
3. The problem (white). h2 `Where manual effort accumulates in SAP supply chains`, the paragraph, then a 2x2 grid with the four problem titles and their text.
4. AI today (dark, `id="ai-features"`). h2 `AI embedded in the GIB platform today`, the lead line, then four blocks: Inventory Management, Demand & Forecast, Production Planning, Cross-Functional. Each block shows its heading and the items listed under it in the source. Use a simple 2x2 card grid. Do not build tabs here. Under the grid, in small muted text, the disclaimer: `Some AI capabilities listed are in active development or prototyping stages and may not be available in all product releases.` This line is required.
5. Flow (light). h2 `AI that strengthens SAP workflows`. Three columns with arrows between them: `Supply chain signals & planning systems`, `Operational intelligence within SAP`, `Operational actions in SAP`, each with its bullet list. The middle column is a dark card to stand out.
6. `Stats` (dark). Eyebrow `What coordinated supply chain execution delivers`. These are ranges, so do not use `data-count`; render the text as is: `15-40%` Reduction in inventory levels · `20-47%` Reduction in stockouts · `10-40%` Improvement in employee productivity · `10-50%` Reduction in production downtime. Each has `source: 'Typical range'`. Give `Stats` an optional `text` field per item that, when set, replaces the animated number.
7. `CtaBand`. Heading: `See how GIB applies AI to your supply chain operations.` Text: `Talk with the GIB team about where AI can reduce manual effort and improve decision speed in your SAP environment.`

## 7. What "good" looks like

Before calling a page done, check it against this list.

- The first screen shows: the nav, the h1, one line of support, one orange button and the product image. Nothing else competes.
- No section has more than about 90 words of body text in one block. Where the source is longer, keep their sentences but break them into the cards and rows described above. Do not cut facts.
- Bands alternate. Two dark bands never touch. Two bands of the same light tone never touch.
- Orange appears in small amounts: buttons, quote marks, the active tab, the preview bar. It is never a section background (the preview bar is the only exception).
- Every screenshot is inside a `Cockpit`, the `Scattered` window or a `Frame`. Every hero image is on a paper panel.
- The cockpit reads as one application window: title bar, rail, screen, status bar. On a 1440px screen the whole window fits in the viewport without scrolling for most views.
- A visitor can see every capability of a module without scrolling the page, by clicking through the rail.
- At 390px wide nothing scrolls sideways, tap targets are at least 44px tall, and the mobile menu opens and closes.
- Tab through the page with the keyboard: every link and button shows the orange focus ring, the Platform dropdown opens on focus, and the arrow keys move through the cockpit rail.
