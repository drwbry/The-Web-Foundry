# Status

Last updated: 2026-11-13

## Current state

- Canonical Web Foundry onboarding/build skill audited and updated. It preserves infrastructure gates while allowing client-led design judgment, uses Modern Web Guidance for relevant platform decisions, and treats Impeccable/Taste Skill/Hallmark/Astryx as optional resources.
- Fixed skill/runbook contradictions around fork cleanup, deployment triggers, live-test ordering, KV redaction/preservation, Turnstile, sender/summary behavior, and DNS staging. Review details and validation: [docs/web-foundry-skill-review.md](docs/web-foundry-skill-review.md).
- Codex and Claude discovery symlinks resolve to the same canonical skill. A fresh agent session may be needed to refresh skill discovery.

## Existing planned work

- The separately planned GIB prospect demo is on `demo/gib-supply-chain` at commit `7258d8d`, with its root `PLAN.md` and `docs/demo/gib-supply-chain/`. That branch/commit was not modified. This shared-skill update is on `main`; incorporate it into the demo branch before using that checkout's skill for the build, and read the complete plan before starting.

## Validation and next steps

- Skill validator, shell syntax, read-only preflight, local links, and synthetic secret-redaction checks passed. Modern Web Guidance CLI search/retrieve works here.
- Full onboarding, live email/Turnstile, deployments, DNS, and cross-model behavior remain untested by this change. Preflight reports missing Wrangler and Coolify credentials in this environment; resolve only when entering those phases.
- Use the updated skill on the next real client build and make narrow corrections from observed outcomes. No push or deployment was performed.
