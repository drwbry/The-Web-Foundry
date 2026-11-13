# Web Foundry skill review

Reviewed: 2026-11-13. Scope: the canonical `skills/web-foundry-onboarding/` entrypoint, all 12 existing references, UI metadata, and all four bundled shell helpers; compared relevant instructions with project rules, the operations runbook, Worker source, and template deployment workflow.

The skill was maintained through October 2026; it was not abandoned. Its strongest material is the Foundry-specific infrastructure knowledge. The update removes unnecessary design/process constraints and fixes contradictions rather than attaching model-version-specific prompts. No model configuration was changed.

## Decisions

- Preserve the onboarding phase structure, approved Site Plan, exact provider identities, client-owned actions, shared Worker boundaries, and evidence before completion.
- Keep design judgment with the active Codex/Claude model. Optional companion skills do not require a separate approval ceremony or a mandatory sequence of agents.
- Use Modern Web Guidance for relevant platform choices, with a browser policy, direct-source fallback, and no global installer/hooks or new site dependency.
- Prefer focused Impeccable critique/polish when useful. Keep Taste Skill and Hallmark as optional examples rather than importing their aesthetic mandates. Keep Astryx available for an approved React/application use case; borrow component documentation and token practices without building a new platform.

The new [design/platform reference](../skills/web-foundry-onboarding/references/design-and-platform.md) contains the reusable instructions and source links. The approach also follows [OpenAI's current skill guidance](https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra): concise discovery, progressive disclosure, and room for capable models to exercise judgment.

## Findings addressed

| Finding | Change |
|---|---|
| Rigid dark/blurred fixed nav, hero formulas, compulsory design/brainstorming companions | Replaced with client goals, approved direction, rendered review, and optional assistance. |
| No browser policy or explicit platform-reference route | Added Modern Web Guidance search/retrieve/source fallback and essential-behavior versus enhancement criteria. |
| Weak explicit accessibility checks and an unlabeled `novalidate` form example | Added labels/autocomplete/status example, native validation default, keyboard/focus, contrast, reduced motion, fallback, and cross-browser checks. |
| Destructive fork cleanup could remove onboarding state or keep the template's deployment UUID | Preserve client state/plans/evidence; inspect/remove inherited deployment triggers and prospect demos in the client copy. |
| Phase 5 demanded a live-domain submission before deployment/DNS | Split configuration readiness from pending live evidence; finish enforcement/delivery checks before handoff. |
| KV examples could overwrite secrets or print the whole object | New-key-only example; preserve full objects on updates, use owner-only temporary files, and inspect allowlisted fields/secret-presence booleans. |
| Turnstile hostname table contradicted its explanation; instructions requested both keys | Naked domain covers subdomains; secret stays out of chat; documented that the maintained setter also enables enforcement and does not prove widget pairing. |
| Old sender/order-summary claims and unresolved-client assumptions contradicted current source/runbook | Corrected sender and summary guidance; require deployed verification, not historical assumptions. |
| Blanket DNS record deletion and a runbook summary claiming lossless auto-import | Confined cleanup to approved non-authoritative staging; preserved export/diff/pre-delegation checks and rollback planning. |
| Static agent/MCP assumptions and mandatory optional-auditor installation | Discover active capabilities; direct evidence-based fallback; preflight no longer requires installing `squirrel`. |
| Missing Codex discovery link | Restored `~/.agents/skills/web-foundry-onboarding` to the canonical repository skill; Claude's existing link resolves to the same directory. |

## Validation and limits

- Skill frontmatter validator passed; all four bundled shell scripts pass `bash -n`.
- Read-only preflight passed. It reports missing Wrangler, optional `squirrel`, and Coolify credentials in this environment; those are phase-specific availability warnings, not evidence about production health.
- Modern Web Guidance CLI `1.0.0` search and `retrieve navbar` ran successfully with a temporary npm cache. No plugin/global install or application dependency was added.
- Local Markdown reference checks and a synthetic KV-redaction check passed. Instruction wrappers remain thin imports.
- Scenario walkthroughs: (1) a new bakery can choose its own layout without a theme dealer; (2) an approved plan is not re-approved for routine implementation; (3) unavailable guide tooling routes to source/docs; (4) a net-new domain carries pending live checks through deployment, then completes them before handoff; (5) takeover cleanup does not empty an authoritative zone. These are instruction reviews, not independent model evals.
- No website source, Worker code, production KV/DNS, provider settings, or live delivery behavior was changed or tested. No browser build, paid API/model evaluation, or third-party skill installation was performed.
- Provider quotas, pricing, dashboard click paths, and infrastructure inventory remain subject to verification at the relevant phase. This was not a live infrastructure or credential-security audit.

Revisit after an actual onboarding exposes a problem or a provider workflow changes. A model release alone does not justify adding more instructions.
