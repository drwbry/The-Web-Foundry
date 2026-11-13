# Design Judgment and Web Platform Guidance

Read for Site Plan design/technical decisions, substantial frontend implementation, and visual QA. Apply only what the current task needs. The approved brief and project conventions govern the work.

## Creative freedom

Start from the business, the visitor's main task, the client's real material, and any established visual identity. Choose a coherent direction and explain the few decisions that matter. Compare alternatives when the brief leaves a consequential choice open; do not require multiple concepts for every task or reopen approved choices.

The agent may use asymmetric layouts, restrained or expressive typography, generous whitespace, illustration, photography, color, or motion when they serve that direction. No universal font bans, palette bans, fixed section counts/heights, required hero formula, compulsory animation, or randomized theme selection. Treat signs of generic design as prompts to inspect the result, not automatic failures. Brand requirements can justify common treatments.

Reuse Foundry's working mechanisms without requiring every client to inherit a showcase's look. Showcases are examples, not the limits of the design space. Do not invent testimonials, credentials, business hours, prices, or results. Missing content can be omitted or shown honestly as a draft; stock/generated imagery must not impersonate the client's actual people, premises, products, or work. Check usage rights and attribution for sourced assets.

## Modern Web Guidance: the default platform reference

Use [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance) for material browser-platform decisions during planning and before implementing unfamiliar HTML/CSS/client-side JS patterns or adding a dependency to solve one. Search for the concrete pattern: accessible navigation, form validation, responsive layout, dialogs, animation, or image priority. Retrieve only relevant guides; reuse guidance already read in the task. Routine copy, token, or spacing edits do not need a fresh search.

Use an installed/project-pinned CLI when available. Otherwise, the following read-only queries can run on the devbox from the target repo through the permitted package runner; they do not require installing a plugin or adding an app dependency:

```bash
npx -y modern-web-guidance@latest search "accessible navigation menu"
npx -y modern-web-guidance@latest retrieve "<id-returned-by-search>"
```

`@latest` executes the currently published package. Respect the environment's network/execution permissions; use a temporary npm cache if the normal cache is read-only. Record the package version and lookup date, or the guide source commit, when guidance materially affects a decision. If execution is unavailable, read the matching [guide source](https://github.com/GoogleChrome/modern-web-guidance/tree/main/skills/modern-web-guidance/guides) through an available repository/browser tool, then official MDN/browser documentation as needed. Report a lookup limitation once and continue using verified sources; an optional CLI must not block a build.

Use the guidance corpus as a reference; do not install or copy the upstream skill's global triggers, reporting format, or mandatory workflow into Foundry. Do not run its legacy scan unless modernization or a broad legacy audit is requested. A scan covers only part of the corpus and cannot certify a site.

### Browser policy

Unless the project specifies otherwise, support current stable Chrome/Edge, Firefox, and Safari, including mobile Safari and Chrome. Prefer Baseline Widely Available features for essential behavior. Use newer features as progressive enhancements with feature detection and a working simpler fallback; do not require a polyfill or newer browser merely to preserve decoration. Verify current support when choosing a feature. Browser-specific AI APIs are not a standard Foundry dependency.

Menus, forms, and primary actions must work in the supported browsers. Keyboard operation, visible focus, sensible reading order, contrast, and reduced-motion behavior are quality requirements. Verify them in rendered output. Check Safari/Firefox behavior directly when available; Chromium screenshots alone do not establish compatibility, and untested browsers must be disclosed. Critical content should remain readable without animation or scripting; JSON-only Worker forms need a clear phone/email alternative when JS cannot run.

Record an explicit browser policy in the Site Plan or project instructions if the audience requires older browsers or the design changes this default. Keep critical fallback decisions beside the implementation or in the existing design notes.

## Optional design resources

Consult a resource for a concrete need; do not stack all their skills on the same build or install their hooks, plugins, dependencies, or global settings as part of normal onboarding.

| Resource | Useful role | Foundry boundary |
|---|---|---|
| [Impeccable](https://github.com/pbakaus/impeccable) | Targeted critique, polish, hierarchy, typography, UX copy, or documenting an existing visual system | Prefer a focused review or relevant reference. Detector taste findings are advisory. Its installer/hooks/live mode are not required; live mode has a separate agent-execution path that needs review before use. |
| [Taste Skill](https://github.com/Leonxlnx/taste-skill) | Composition, imagery, copy, and interaction examples | Its prescribed screens, motion, theme dealing, and demo contact conventions do not govern client sites. Use verified client contact details and facts. |
| [Hallmark](https://github.com/Nutlope/hallmark) | Theme/material references, designing around the visitor's task, and checking that redesigns retain working links/forms | Do not import its fixed word/section limits, aesthetic bans, stamping, or mandatory theme/review pipeline. |
| [Astryx](https://github.com/meta/astryx) | React components for a portal, dashboard, or complex interactive workflow; examples of clear APIs, tokens, and usage docs | Evaluate React requirements, maturity, customization, and shipped JS/CSS against the project. It is not the default for Astro brochure sites. A new application stack requires an approved scope decision. |

## Reuse without a new framework

Keep design tokens close to the existing CSS and document intent where it is not obvious. For a component that actually repeats, use the repo's existing component format with clear props/slots, a short usage example, and any accessibility or integration gotcha. Put durable decisions in existing design notes and link them from `AGENTS.md`; keep `CLAUDE.md` a thin import. Do not duplicate token values in prose or require a new registry, shared package, Storybook, or design-system platform for a small site.

## Review the result

Compare the rendered site with the approved brief and the visitor's task. Fix broken behavior, accessibility, mobile layout, fictional content, and performance problems. Evaluate craft through hierarchy, legibility, spacing, image choice, and consistency; a justified creative choice is not a defect because a style detector dislikes it. Run relevant project checks and Phase 9 QA, and state any remaining verification limits.
