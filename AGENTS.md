# The Web Foundry Template Instructions

## What This Is

A showcase website for **The Web Foundry** (Cincinnati locale), a community initiative that rebuilds outdated local business websites using AI vibe coding. The site demonstrates capabilities and serves as a template for future client sites. The overarching brand is "The Web Foundry" — Cincinnati is the current locale, with potential future expansion to other locales (e.g. Brown County, IN) each getting their own site with minor localization.

Astro static site + embedded Sanity Studio (deployed at `cincinnati-web-foundry.sanity.studio`), deployed GitHub → Coolify on push. For a visual overview of the whole website factory (stack, intake, build/deploy, form routing, Sanity update loop), open `docs/website-factory-map.html`.

## Architecture

**Hub page** (`index.astro`) uses `BaseLayout`, loads `hub.css` and `main.js`. **Showcase pages** (`src/pages/showcase/`) use `ShowcaseLayout`, which wraps content with `BackButton` and `DBCredit`. Each showcase page defines its own palette as CSS custom properties in its `<style>` block (search for `:root {`).

**Central config** lives in `src/config/site.js`. Use it for fork-swappable values that are shared across Astro config, pages, layouts, and client-side JS: domain, site name, contact email, Worker URL, Turnstile site key, hub `site_id`, showcase demo `site_id`s, form subject lines, and third-party integration URLs. Do not hardcode those values in individual form scripts.

**Sanity client must keep `useCdn: false`** (`src/lib/sanityClient.ts`). Content is fetched at build time, and the CDN can serve stale data right after a publish-triggered rebuild. A Sanity webhook triggers the Coolify rebuild on publish (Create + Update, filter: `!(_id in path("drafts.**"))`).

Shared utilities every fork inherits (scroll reveal, counters, layout helpers) are documented in `docs/shared-utilities.md`.

### Work-card previews

Every card in the hub's `#work` and `#concepts` grids shows a real screenshot — client sites from `src/assets/work/`, concept demos from `src/assets/concepts/`. Run `npm run shots` to recapture both sets, then commit the PNGs. It is a manual step, never part of `npm run build`.

The concept cards previously used hand-built CSS mockups of each demo. Those were a second copy of the design and drifted out of sync every time a demo page changed, so they were replaced with screenshots. **Do not reintroduce a mocked-up preview in markup** — recapture instead. After any material change to a demo page or a client site, re-run `npm run shots`.

The capture is 1024x640 at 2x, so text stays legible when the shot is scaled into the ~368x250 card slot. `npm run shots` builds first and serves the concept pages from a local `astro preview` on port 4331; the client phase needs the three live client sites reachable.

### Showcase integrations

Each demo carries the signature mechanism for its industry, so a fork inherits a working reference implementation:

| Demo | Mechanism | Config key |
|------|-----------|-----------|
| bakery | Pre-order form (our own Worker — no third party) | none needed |
| plumber | "Pay Your Invoice" Stripe Payment Link | `showcase.plumber.integrations.stripePaymentLink` |
| salon | Calendly booking embed, lazy-loaded | `showcase.salon.integrations.calendlyUrl` |

Three rules govern these:

- **Gate on `REPLACE_ME`.** Unconfigured integrations are omitted entirely — section *and* nav entry — so the page still reads as complete. Never render a "coming soon" placeholder on a Concept page; a prospect is looking at it.
- **Forking lifts the block.** Moving a demo into a client site means copying that demo's `integrations` block up to a top-level `siteConfig.integrations`, the flat shape the client repos use.
- **The salon's Calendly event is shared with MAB Properties** (`calendly.com/foundrysolutionsllc/30min`). Calendly's free tier allows exactly one event type. Renaming it is fine; **changing its URL slug breaks MAB's `/rentals` page.**

**The demos deliberately have no `WEB_FOUNDRY_SITES` KV entry.** With no entry, the Worker's fallback path brands demo confirmation emails as The Web Foundry and appends the Foundry CTA block — so a prospect who tests a demo form gets a sales touch. This is intentional; do not "fix" it by adding KV entries. One consequence: the bakery pre-order's `order_id` appears in the internal notification but not in the submitter's confirmation, which uses the generic template.

For online ordering generally, see the ladder in `docs/features.md`. **GloriaFood is discontinued** (Oracle; retires 30 Apr 2027) — do not recommend it to any client.

### Prospect demos (`/demo/<slug>`)

Proof-of-concept rebuilds of a real prospect's site, sent to them as a pitch. They differ from the Concept showcases on purpose:

- **Private.** Each page sets `noindex, nofollow`, and `astro.config.mjs` filters `/demo/` out of the sitemap. Don't list them on the hub or capture them with `npm run shots`. Otherwise our domain competes with the prospect's real listing.
- **Own layout per prospect** in `src/components/demo/<slug>/`, wrapping `BaseLayout` with `DBCredit` and no `BackButton` (the prospect never came from the hub). Content lives in that folder's `data.js`.
- **No Worker forms.** Link to the prospect's existing forms. Our Worker's fallback path would send their customers' orders to Foundry-branded emails.
- **Their real photos, re-encoded with sharp** so the GPS EXIF is stripped. Phone photos from home businesses carry it.
- **No home addresses.** Copy their own words rather than inventing claims, hours or reviews.

## Operational Runbooks

Before changing forms, the shared Worker, client onboarding, showcase setup, DNS/email, or multi-tenant deployment, read `docs/operations-runbook.md`. Its safety checks and verification steps are mandatory. The form Worker is shared production infrastructure, so verify repository drift and deployment scope before any Worker deploy.

The version-controlled source for the cross-agent onboarding workflow is `skills/web-foundry-onboarding/`. User-level Codex and Claude Code skill entries should symlink to that same directory so the workflow cannot drift between agents. Update and validate the canonical skill whenever onboarding conventions change.
