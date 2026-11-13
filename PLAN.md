# Plan: GIB Supply Chain prospect demo at /demo/gib-supply-chain

Status: built, ready for owner review
Planned by: Claude Code, 2026-11-13
Builder: any (Codex Luna high, Sonnet, Haiku, or OMP with DeepSeek subagents)
Built by: Codex (GPT-6), 2026-11-13
Stakes: normal

## Goal

A ten-page proof-of-concept rebuild of https://www.gibsupplychain.com lives at `/demo/gib-supply-chain` on The Web Foundry site. It keeps GIB's own content but shows a modern, clean, easy-to-scan design, so the owner can send the link to GIB as a pitch.

## Context

- Repo: `db-design-website` (Astro 5 static site, deployed by Coolify when `main` is pushed). Work on whatever branch is checked out in this folder (it already holds this plan). Do not switch or create branches.
- **Read these first, in this order:**
  1. `docs/demo/gib-supply-chain/DESIGN.md`. The full design and content spec. It decides every visual and copy question. Follow it exactly. Its main idea is the "cockpit": each module is shown as one application window with a rail of views, the way GIB's own product pulls scattered SAP data into one screen.
  2. `src/components/demo/morning-and-night/Layout.astro` and `src/pages/demo/morning-and-night/index.astro`. The existing prospect demo. Copy its structure and code style.
  3. `docs/shared-utilities.md`. Explains the `.reveal` and `data-count` helpers that `shared.js` already provides.
  4. `docs/demo/gib-supply-chain/DESIGN.md` section 8, "Web platform guidance". The Web Foundry uses Google Chrome's Modern Web Guidance as its reference for HTML, CSS and JavaScript patterns. Before you build the nav (step 2), the FAQ (step 3) and the cockpit (step 4), retrieve the matching guide with the commands in that section and follow it for the mechanics. If you are running with the `web-foundry-onboarding` skill and it has `references/design-and-platform.md`, that file says the same thing; read it, but do not start the onboarding phases. This is a demo page, not a client onboarding.
- All content and images you need are already in the repo. Do not fetch content or images from the internet. Looking up Modern Web Guidance and MDN is allowed and encouraged.
  - GIB's page text: `docs/demo/gib-supply-chain/source/*.md` (one file per page of their site).
  - GIB's images: `src/assets/demo/gib-supply-chain/` (logo, symbols, hero images, `logos/`, and 22 product screenshots in `shots/`). In the source files, `[IMAGE: shots/x.png]` names the local file to use at that spot. `[image not kept: ...]` means skip it.
- New files only. The demo is self-contained in three folders:
  - `src/components/demo/gib-supply-chain/` (layout, components, `data.js`, `images.js`)
  - `src/pages/demo/gib-supply-chain/` (pages)
  - `src/assets/demo/gib-supply-chain/` (already filled; do not add or change images)
- Constraints:
  - `astro.config.mjs` already keeps `/demo/` out of the sitemap. Do not edit it.
  - No new npm packages. No Tailwind. Plain scoped CSS in each `.astro` file, the same as the rest of the repo.
  - Internal links have no trailing slash: `/demo/gib-supply-chain/platform`.
  - No em dashes in page text. Details in DESIGN.md section 2.

## Out of scope

- GIB's Resources pages: blog, case study articles, webinars, industry and topic tag pages, and the `scx-for-*` landing pages. Link out to the live site instead (links are in DESIGN.md section 5).
- Forms of any kind. Every "Get a demo" button is a link to the live GIB site.
- Sanity, the form Worker, `src/config/site.js`, the hub page, `src/styles/`, `src/scripts/`, `astro.config.mjs`, `npm run shots`. Do not touch them.
- Listing this demo on the hub, in the nav, or in the sitemap.
- Rewriting GIB's copy. The only rewritten copy is what DESIGN.md section 6 gives word for word. Everything else is transcribed from the source files.
- Adding sections, images, icons libraries, animations or pages that DESIGN.md does not list.

## Ask before doing

- Pushing or merging to `main`. That deploys to the live site. Commit on the current branch only. The owner merges after review.
- Editing any file outside the three demo folders listed above.
- Adding a dependency.
- Using any GIB image that is not already in `src/assets/demo/gib-supply-chain/`. The quote badges, staff headshots and GIFs were left out on purpose.
- Adding a polyfill, or switching the nav to the Popover API, because a Modern Web Guidance guide suggests it. DESIGN.md section 8 explains why this demo does not.
- If a source file and DESIGN.md disagree, or a piece of content named in DESIGN.md cannot be found in the source file: stop guessing, leave that item out, and write it in the Build log.
- Data rule (who may see this repo's code): any, including DeepSeek. This is a public marketing site with no secrets.

## Rules for the build

- **Build the whole plan in one run.** Work through steps 0 to 12 in order without stopping to report or to ask whether to continue. Finishing a step is not a reason to end your turn. Go straight on to the next one. You are done only when every box in "Steps" and "Done when" is ticked, or when you hit one of the stop cases below.
- For each step: build it, run its check, tick the box only when the check passes, add one or two lines to the Build log with the evidence, and commit. One commit per step. Do not push.
- A failing check is a diagnosis task, not a stop sign. This is the owner's instruction for this build, and it replaces the "if a check fails twice, stop" rule in `~/.codex/AGENTS.md`. Read the error, work out whether the code or the check is wrong, fix that, and run it again. Common causes here: a screenshot file name in `data.js` that does not match a file in `shots/`, a wrong relative import path (pages are three folders deep, components three), an Astro `<Image>` given a string instead of an imported image, and a `grep` check run before `npm run build`.
- Stop and ask only for: an item in "Ask before doing", a design question that DESIGN.md does not settle and that you cannot settle by picking the simpler option, or a failure you still cannot explain after real investigation. If you do stop, say exactly which step you are on and what you tried.
- A small gap is not a stop case. If one piece of content cannot be found in a source file, leave that one item out, note it in the Build log, and keep going.
- If you run low on context, commit what you have, make sure the ticked boxes and Build log are current, and say which step is next. The next run picks up from the first unticked box.
- Run `npm run build` before each commit.

## Steps

Each step is small enough for one subagent, and says how to check it. Do them in order. Steps 5 to 10 only depend on steps 1 to 4, so an orchestrator may hand them to parallel subagents after step 4; a single agent just does them in order.

- [x] **0. Set up**
  - Files: none
  - Change: Stay on the current branch. Run `git status` to confirm it is clean and that `PLAN.md` is at the repo root. Run `npm install`.
  - Check: `npm run build` passes before you change anything. `ls src/assets/demo/gib-supply-chain/shots | wc -l` prints `22`.

- [x] **1. Data files**
  - Files: `src/components/demo/gib-supply-chain/data.js`, `src/components/demo/gib-supply-chain/images.js`
  - Change: Create both exactly as DESIGN.md section 5 describes. Export `base`, `links`, `products` (four products, every field filled from `source/gib-forecast.md`, `gib-inventory.md`, `gib-operations.md`, `gib-production.md`), and `faq` (five items from the end of `source/home.md`). Use the fixed tables in section 5 for category, verb, tabShot, stats and closing headings. Apply the typo fixes listed there. Replace every em dash.
  - Check: `grep -c "—" src/components/demo/gib-supply-chain/data.js` prints `0`. Every `shot:` and `tabShot:` value is a file name that exists in `src/assets/demo/gib-supply-chain/shots/`. Each product has 4 stats. Capability counts: forecast 5, inventory 6, operations 6, production 5.

- [x] **2. Layout**
  - Files: `src/components/demo/gib-supply-chain/Layout.astro`
  - Change: Build it per DESIGN.md sections 3 and 4 ("Layout.astro"): `BaseLayout` wrapper, `noindex` meta, font link, the global `:root` tokens and base type styles, preview bar, sticky nav with the Platform dropdown and the mobile menu (both are a button with `aria-expanded` plus one small script), footer, then `DBCredit`, then the floating "Back to The Web Foundry" link. Retrieve the `navbar` guide first.
  - Check: create a temporary `src/pages/demo/gib-supply-chain/index.astro` that renders the layout with one `<h1>`. `npm run build` passes. `grep -c 'noindex, nofollow' dist/demo/gib-supply-chain/index.html` prints `1` or more.

- [x] **3. Small components**
  - Files (all in `src/components/demo/gib-supply-chain/`): `Eyebrow.astro`, `Button.astro`, `Section.astro`, `Frame.astro`, `Quote.astro`, `Stats.astro`, `Faq.astro`, `CtaBand.astro`, `CaseStudy.astro`, `LogoWall.astro`, `CertBadges.astro`, `ModuleCards.astro`
  - Change: Build each per DESIGN.md section 4, with the listed props and nothing extra. `Stats` also accepts the optional per-item `text` field described in the `ai.astro` section, and draws ring gauges for percent values.
  - Check: `npm run build` passes after the home page (step 5) imports them. No component file is longer than about 150 lines.

- [x] **4. Cockpit and Scattered** (the signature components; give this step to the strongest model you have)
  - Files: `src/components/demo/gib-supply-chain/Cockpit.astro`, `src/components/demo/gib-supply-chain/Scattered.astro`. Also add the `moduleViews` export to `data.js`.
  - Change: Build both per DESIGN.md section 4. `Cockpit` is one application window: title bar, left rail of views, screen, status bar. Retrieve the `tabs` and `search-hidden-content` guides first. Vertical ARIA tabs, starting state rendered in the HTML, `hidden="until-found"` with a `beforematch` listener, arrow keys, hash deep links, rail turns into scrolling pills below 900px, script under 60 lines. `Scattered` is the before and after picture with the eight exact chips.
  - Check: in `npm run dev`, on a test page with four views: clicking a rail button swaps the screen and the `03 / 04` counter. Up and down arrows move between views. Loading the page with `#modules-inventory` in the URL opens the Inventory view. Only the selected screen is visible on first paint (no flash of all screens). In Chrome, find-in-page for a word that is only on a hidden view switches the cockpit to that view. With JavaScript disabled, the starting view shows. At 390px wide the rail is a scrolling row of pills and nothing overflows the page.

- [x] **5. Home page**
  - Files: `src/pages/demo/gib-supply-chain/index.astro`
  - Change: Replace the temporary page with the ten sections in DESIGN.md section 6 ("index.astro"), in that order, using the exact copy given there. Section 3 uses `Scattered`. Section 4 uses `Cockpit` with `moduleViews`.
  - Check: `npm run build` passes. The built page has exactly one `<h1>`. It contains the text `It's just not in one place`, `Nature` and `MD04`. The cockpit opens on Operations. `grep -c "—" src/pages/demo/gib-supply-chain/index.astro` prints `0`.

- [x] **6. Product pages**
  - Files: `src/pages/demo/gib-supply-chain/[product].astro`
  - Change: One dynamic route with `getStaticPaths` over the four products, with the nine sections in DESIGN.md section 6 ("[product].astro"). Section 4 is a `Cockpit` with one view per capability. Screenshots come from `shot(name)` in `images.js`. Hero images: import the four `hero-*.png` files and pick by slug.
  - Check: `npm run build` creates `dist/demo/gib-supply-chain/forecast/index.html`, `inventory/index.html`, `operations/index.html` and `production/index.html`. The Outcomes section appears only on production. The case study card and "Watch the video" button appear only on operations. Each page shows its four real stat values, not `0`, with ring gauges on the percent values. Each page has one cockpit whose rail lists every capability (forecast 5, inventory 6, operations 6, production 5).

- [x] **7. Platform page**
  - Files: `src/pages/demo/gib-supply-chain/platform.astro`
  - Change: Seven sections per DESIGN.md section 6 ("platform.astro"), content from `source/gib-platform.md`.
  - Check: `npm run build` passes. The page has the four capability group titles and the platform cockpit with four module views.

- [x] **8. Why GIB page**
  - Files: `src/pages/demo/gib-supply-chain/why-gib.astro`
  - Change: Six sections per DESIGN.md section 6 ("why-gib.astro"), content from `source/why-gib.md`.
  - Check: `npm run build` passes. The page has the four measures numbered 01 to 04 and four quotes.

- [x] **9. Solutions and GIB for SAP pages**
  - Files: `src/pages/demo/gib-supply-chain/solutions.astro`, `src/pages/demo/gib-supply-chain/gib-for-sap.astro`
  - Change: Per DESIGN.md section 6, content from `source/solutions.md` and `source/gib-for-sap.md`.
  - Check: `npm run build` passes. Solutions shows four step cards with the four symbol images. GIB for SAP shows eight numbered capability cards.

- [x] **10. AI page**
  - Files: `src/pages/demo/gib-supply-chain/ai.astro`
  - Change: Seven sections per DESIGN.md section 6 ("ai.astro"), content from `source/ai-in-gib.md`. The disclaimer line under the AI features grid is required.
  - Check: `npm run build` passes. The page contains `may not be available in all product releases`. The four stat ranges render as text (`15-40%`), not animated numbers.

- [x] **11. Link and rule sweep**
  - Files: any file in the two demo code folders
  - Change: Fix whatever these checks find.
  - Check, all must pass:
    - `grep -rn "—" src/components/demo/gib-supply-chain src/pages/demo/gib-supply-chain` prints nothing.
    - `grep -rLZ 'noindex, nofollow' dist/demo/gib-supply-chain --include=index.html | tr '\0' '\n'` prints nothing (every page has the tag).
    - `grep -c "gib-supply-chain" dist/sitemap-0.xml` prints `0`.
    - `grep -rn "<form" src/components/demo/gib-supply-chain src/pages/demo/gib-supply-chain` prints nothing.
    - Every internal `href` in the demo points at one of the ten pages or an `#id` that exists on that page. List the built pages with `find dist/demo/gib-supply-chain -name index.html` and compare.
    - `git status --short` shows changes only inside `src/components/demo/gib-supply-chain/`, `src/pages/demo/gib-supply-chain/` and `PLAN.md`.

- [x] **12. Visual check** (needs judgment)
  - Files: any file in the two demo code folders
  - Change: Run `npm run preview`. Open every page at 1440px, 768px and 390px wide. Go through the checklist in DESIGN.md section 7 and fix what fails. If Playwright's Chromium is installed (`npx playwright --version` works and a browser launches), save full-page screenshots of all ten pages at 1440px and 390px to `/tmp/gib-demo-shots/` for the owner. If it is not installed, skip the screenshots and say so in the Build log. Do not install it.
  - Check: no horizontal scroll at 390px on any page. The mobile menu opens and closes, and Escape closes it. Tabbing shows a focus ring on every link and button. No image is broken.

## Done when

- [x] `npm run build` passes with no errors or warnings about missing images
- [x] All ten pages exist under `dist/demo/gib-supply-chain/`: home, platform, forecast, inventory, operations, production, why-gib, solutions, gib-for-sap, ai
- [x] Every check in step 11 passes
- [x] The Build log below lists anything left out, anything that differed from DESIGN.md, which Modern Web Guidance guides were read (or that the CLI could not run), which browsers were actually checked, and whether screenshots were captured
- [x] Committed on the current branch (not pushed to `main`, not merged)

## Build log

0. Setup: clean current branch `drwbry/GIB-demo-website-build`; npm install completed, 22 screenshots confirmed, baseline build passed. This worktree lacks Sanity environment values, so builds export the existing main checkout .env without copying it. No STATUS.md exists; the plan restricts edits to demo code and this log, so none was created.

1. Data: four complete products and five FAQs transcribed with specified typo fixes, real statistics and no em dashes. All screenshot filenames exist, capability counts are 5/6/6/5, each product has four stats; build passes.

2. Layout: private shell, responsive disclosure navigation, footer, DBCredit and exact rust Foundry link built. Temporary home builds with noindex. Read Modern Web Guidance navbar; retained the specified button mechanics and followed guidance to open via Enter/Space rather than on focus (section 7 checklist conflicts with the guide).

3. Small components: all twelve built, including native searchable FAQ, real counter fallbacks, percent gauges, imported badges/logos and case cards. Temporary fixture compiled every component successfully (all under 150 lines); fixture removed. Home import verification follows in step 5. Read accordion and search-hidden-content guides.

4. Cockpit/Scattered: signature windows and eight exact chips built; read tabs and search-hidden-content guides. Chromium 130 checks pass for clicks/counter, desktop/mobile arrows, hash, initial/no-JS state, 390px overflow and native text-fragment beforematch reveal. window.find finds hidden text; browser Find toolbar itself remains a manual review item. Fixed Astro stripping dynamic hidden values by using literal hidden="until-found" on inactive panels. Temporary test route removed; build passes.

5. Home: all ten sections built in order with exact rewritten copy, supplied quotes/benefits/case study and Operations selected. Build passes; one h1, required phrases present, no em dashes. All small components now compile in the complete home or their earlier fixture. A parallel build initially cleared dist during checks; builds are now serialized and checks rerun.

6. Products: shared static route generates four pages with 5/6/6/5 cockpit views, exact source hero/quote/closing content and real values/gauges. Build and conditional Outcomes/FFF/video checks pass. Explicit page section tones take precedence over the generic alternation checklist (hero quote and capability bands are both light on three products).

7. Platform: seven prescribed sections, four capability groups and the four-view platform cockpit reviewed against source; build and title/tab checks pass.

8. Why GIB: all six sections, four measures numbered 01-04, featured quote and four customer quotes match the source. Build and counts pass.

9. Solutions / GIB for SAP: prescribed sections and source copy reviewed; build passes, four solution steps have their four symbols, and eight SAP cards are numbered 01-08.

10. AI: seven sections, four feature blocks and required release disclaimer built; build passes and all four ranges are text without counters. Kept the explicit dark Stats then dark CTA order despite the general band-alternation checklist; narrative feature introductions omitted in favor of the prescribed heading/item grids.

11. Link/rule sweep: ten routes checked with HTML parsing, including all local anchors, unique IDs, image zoom targets, one h1 and robots tag per page. Required Foundry return and inherited DBCredit privacy links point to existing hub routes, exceptions to the ten-page-only wording. No forms/em dashes/sitemap entries; status restricted to allowed paths. Cleaned punctuation spacing and fixed menu focus retention/outside clicks. Build passes. Validation scripts account for Astro minifying empty alt attributes and inlining shared counter code.

12. Visual: production preview opened all ten pages at 1440, 768 and 390px in installed Chromium 130.0.6723.31 via Playwright 1.61.1. No horizontal overflow, broken images or page script errors; menu toggle/Tab/Escape/outside click, focus rings across every page, cockpit arrows/hash/native reveal and no-JS initial view pass. Reduced-motion counters retain their real values; smooth scrolling, reveals and transitions respect the preference. Specified type sizes restored. Saved 30 fully loaded full-page screenshots plus checks.json and first-screen review sheets in /tmp/gib-demo-shots/. A long Chromium capture run exited during its final focus loop after all captures; those checks passed in a fresh browser. Firefox, Safari and Edge were not available/tested. Browser Find toolbar remains manual; native text searchability and text-fragment beforematch reveal were verified.

Final review: all prescribed content is included except narrative AI feature introductions, as noted above. Explicit section order/tones and full supplied hero copy were retained over general visual heuristics; long mobile heroes place their images below the first fold. No source assets, shared infrastructure, hub, sitemap configuration or dependencies changed. All Done when checks pass; committed on the original branch without push or merge.
