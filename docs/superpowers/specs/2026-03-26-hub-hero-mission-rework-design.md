# Hub Page Hero + Mission Rework

## Problem

The hub page's hero and mission sections don't land with the target audience — local Cincinnati business owners who've been directly contacted by The Web Foundry. These are warm leads visiting the site to evaluate credibility, not cold traffic.

Current issues:
- **"Zero cost to you"** headline is misleading — hosting/maintenance has a monthly fee
- **"Volunteer" language** (4 locations) misrepresents the business — this is a mission-driven company, not a charity
- **Mission section** reads as a process walkthrough (4 numbered boxes) instead of an emotional "why we exist" statement
- **Hero subtext** fails to hook — "volunteer our time" doesn't resonate
- **Stat bar** ("Volunteer Built / AI-Powered / Always Evolving") is filler with no clear replacement

## Target Audience

90% of traffic = business owners The Web Foundry reached out to directly. They're curious but skeptical. They're thinking: "What's the catch?" The page needs to build trust and credibility fast.

## Design

### Page Flow (revised)

1. **Hero** — hook with free build offer + quality + local identity
2. **Mission** — emotional "why" section (flowing text, not boxes)
3. **Showcase** — the work speaks for itself (unchanged)
4. **How It Works** — animated timeline, simplified, moved below showcase
5. **CTA** — get in touch (unchanged aside from removing "nominate" language)

### Hero Section

**Files:** `src/pages/index.astro` (lines 35-78), `src/styles/hub.css` (HERO section ~line 259)

**Changes:**

- **Eyebrow:** Keep the dot + label format, update text. Remove "AI Vibe Coding x Local Business" — replace with something that establishes local identity (e.g., "Cincinnati's Web Foundry" or "Built in Cincinnati").
- **Headline:** Replace "Beautiful websites. Zero cost to you." with copy that leads with the free design/build offer while being honest. Direction: emphasize the build is free, the quality is real. Something in the spirit of "Your next website? Built for free." — confident, direct, not misleading.
- **Subtext:** Replace the "volunteer" paragraph entirely. New copy should: (1) state what we do plainly — design and build modern websites for Cincinnati small businesses, (2) clarify what's free — the design, build, and launch, (3) mention ongoing support exists at a fraction of what they'd pay elsewhere, (4) no "volunteer," no dollar amounts.
- **CTAs:** Keep "See the Work" primary. Change "Nominate a Business" to "Get in Touch" or "Let's Talk" — since the audience is the business owner themselves, not a nominator.
- **Stat bar:** Remove entirely. The `hero__stat-bar` element and its CSS get deleted. If we bring it back later, it'll be with real metrics or earned credibility signals.

**Word-for-word copy is not spec'd here intentionally.** The implementation phase should draft 2-3 options for headline + subtext and present them for review before committing. The direction and constraints above are what matter.

### Mission Section

**Files:** `src/pages/index.astro` (lines 81-115), `src/styles/hub.css` (lines 426-478)

**What it becomes:** An emotional, full-width "why we exist" section with flowing text — not boxes. Feels like a founder talking to you.

**Content arc (4 beats, rendered as flowing text blocks, not cards):**

1. **Your business matters** — You're the one people trust in this community. But your website doesn't reflect who you are or what you do.
2. **The problem** — Getting a real website built has always been expensive and confusing. DIY tools leave you with something generic that you have to maintain and test yourself.
3. **The shift** — AI changed the game. We build in days what used to take weeks. We think that speed should benefit the businesses that need it most.
4. **The offer** — We design, build, and launch your website for free. Custom design, modern tech, built to represent what you actually do. After launch, everything is handled — hosting, security, updates — for less than what you're paying today.

**Design treatment:**
- Remove the `.mission__steps` grid and `.step-card` elements entirely
- Replace with full-width flowing text blocks with generous whitespace
- Use Playfair Display for key emotional phrases / pull-quote moments that break up the body text
- Thin gold accent lines or dividers between content beats (extend the existing `.mission__rule` pattern)
- Scroll-triggered `.reveal` animations on each beat — staggered entrance
- The section itself should demonstrate design quality — typography, spacing, and subtle motion doing the heavy lifting
- No boxes, no cards, no numbered steps

**CSS approach:**
- New class structure: `.mission__content` wrapper with `.mission__beat` blocks
- Each beat gets generous padding, max-width for readability (~700-800px), centered
- Emphasized phrases within beats styled with `var(--ff-display)` and `var(--gold)` color
- Subtle reveal animations using the existing shared.css `.reveal` system

### How It Works (moved + redesigned)

**Current location:** Inside mission section (lines 92-113)
**New location:** Between showcase and CTA sections

**Format:** Animated vertical timeline that reveals steps as you scroll.

**Content (simplified to 3 steps):**
1. **We talk** — We learn about your business, your style, your goals. No jargon, no pressure.
2. **We build** — AI-powered design and development. We iterate fast until it feels right.
3. **You launch** — Your new site goes live. We handle the rest — hosting, security, updates.

**Design treatment:**
- Vertical timeline with a thin gold line connecting the steps
- Each step animates in on scroll (`.reveal` with stagger delays)
- Step markers (dots or icons) on the timeline
- Clean typography — step title in display font, description in body font
- Feels dynamic and modern, not like a boring process diagram
- Mobile: timeline stays vertical, works naturally in single column

**New CSS classes:** `.how-it-works`, `.timeline`, `.timeline__step`, `.timeline__marker`, `.timeline__line`

### Site-wide "Volunteer" Cleanup

| Location | Current | Action |
|----------|---------|--------|
| Hero subtext (line 56) | "We volunteer our time and AI tools..." | Full rewrite per hero spec above |
| Stat bar (line 72) | "Volunteer Built" | Remove entire stat bar |
| Meta description (line 7) | "...using AI vibe coding — for free" | Rewrite: remove "for free" from meta, reframe around quality + Cincinnati |
| About page hero subtext | "volunteer initiative" | Reframe as mission-driven company (separate task, flag for future) |
| Footer tagline (line 251) | "AI Vibe Coding for the people." | Review — may be fine, but evaluate in context of new messaging |

### CTA Section

Minor updates only:
- Change "Get Involved" tag to something more direct for business owners
- "Know a business that deserves better?" headline may need rewording since the reader IS the business owner — consider "Ready for a website that works as hard as you do?" or similar
- "Let's talk" subtext updated to match new tone

### What's NOT Changing

- Navigation structure and styling
- Showcase section (content and design)
- Footer structure
- BaseLayout / ShowcaseLayout
- shared.css / shared.js utilities
- Any showcase pages
- Design system (colors, fonts, tokens)

## Verification

1. `npm run build` succeeds with no errors
2. `npm run dev` — visually review hero, mission, how-it-works, and CTA sections
3. Confirm no "volunteer" language remains on hub page
4. Test scroll animations work on mission beats and timeline
5. Test mobile responsiveness at 768px and 375px breakpoints
6. Verify nav anchor links (#mission, #showcase, #contact) still work correctly
7. Check meta description in page source
