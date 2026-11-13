---
name: web-foundry-onboarding
description: Plan, build, launch, or resume a Web Foundry client website, including existing-site takeovers. Use for client onboarding and its phase failures; isolated edits to operating sites do not restart onboarding.
---

# Web Foundry Client Onboarding

Act as the workflow conductor. Guide the user through every applicable phase, preserve state across sessions, load the detailed phase playbook before acting, and require evidence before advancing.

## Judgment and scope

The user's explicit instructions and existing session authorization take precedence over this skill's guidelines. Ask only at an unresolved approval gate, for a material scope change, or when missing information changes the work. Do not request the same approval again. A `[MANUAL]` label identifies an owner/client action or access boundary; it does not require a pause when the requested action is already complete and verified.

Trust the active model to design and implement within the approved brief. Keep infrastructure constraints precise; leave palette, composition, typography, and expression open to judgment. Companion skills and external guides are optional aids, not a mandatory chain of agents, hooks, or design rules. Do not change model settings or require new tool installations as a prerequisite.

## Non-negotiable behavior

1. Determine `net-new` versus `takeover` before Phase 0.
2. Locate or create `docs/onboarding-state.md` in the client repository using [references/00-routing-and-state.md](references/00-routing-and-state.md).
3. Resume at the first incomplete required gate. Do not restart completed work without evidence that it is stale or incorrect.
4. Read the routed reference completely before entering its phase. Do not rely on summaries or memory.
5. Preserve manual ownership and approval gates; reuse recorded approvals and verified completed actions.
6. Confirm exact resource identities before external writes: repository, Sanity project ID, Cloudflare account/zone/KV binding, Coolify application UUID, domain, and recipient.
7. Never record credentials or secret values in the skill, repository docs, Site Plan, `AGENTS.md`, `CLAUDE.md`, or onboarding state.
8. Record commands, non-secret evidence, decisions, blockers, and the next gate in onboarding state after each phase.
9. Never deploy the shared Worker from a client fork. Use only the template repository's `worker/` directory.
10. Do not declare onboarding complete until the Phase 9 evidence gate and Phase 10 handoff are complete.

## Start or resume

1. Read [references/00-routing-and-state.md](references/00-routing-and-state.md) completely.
2. Read [references/operating-facts.md](references/operating-facts.md) completely and verify that time-sensitive infrastructure facts still match the workspace.
3. Resolve this skill's directory (see "Skill directory" below), then run `"$SKILL_DIR/scripts/preflight.sh"`. Treat `WARN` as a routing decision, not automatic failure; resolve every `FAIL` needed by the next phase.
4. Inspect the target repository and existing `docs/onboarding-state.md`.
5. Ask only for information that cannot be discovered safely and whose answer changes the workflow.
6. State the current track, phase, known blockers, and next approval gate.

For an explicitly requested mock or read-only dry run, keep state in memory, label all external facts unverified, and make no writes. Explain that persistent resume guarantees begin only when the user authorizes a real onboarding.

## Skill directory

Scripts in this skill are never on `PATH`, and your working directory is the client or template repository, not the skill. Resolve the skill directory once per session and use it for every `scripts/` invocation in this skill and its references:

```bash
SKILL_DIR=$(cd "$(dirname "$(readlink -f ~/.claude/skills/web-foundry-onboarding/SKILL.md)")" && pwd)
```

For Codex, substitute `~/.agents/skills/web-foundry-onboarding/SKILL.md`. Both paths symlink to the canonical version-controlled directory `~/projects/the-web-foundry/db-design-website/skills/web-foundry-onboarding`, which you may also use directly. Verify with `ls "$SKILL_DIR/scripts"` before relying on it.

## Phase router

Read each listed file completely when its phase becomes current. References are one level deep so both Codex and Claude Code can load them directly.

| Track/phase | Required reference | Advancement gate |
|---|---|---|
| Routing and resume | [references/00-routing-and-state.md](references/00-routing-and-state.md) | Track selected; state initialized; next phase identified |
| Operating facts | [references/operating-facts.md](references/operating-facts.md) | Shared infrastructure and phase map checked against current workspace |
| Migration M1–M9 | [references/01-migration-track.md](references/01-migration-track.md) | Every applicable migration gate has evidence; high-risk cutovers confirmed manually |
| Phase 0–1 | [references/02-discovery-and-plan.md](references/02-discovery-and-plan.md) | Site Plan is complete and explicitly approved |
| Design/platform decisions (Phases 1, 4, 9) | [references/design-and-platform.md](references/design-and-platform.md) | Client-led direction; relevant platform guidance and browser fallbacks considered |
| Phase 2–3 | [references/03-sanity-and-repository.md](references/03-sanity-and-repository.md) | Correct Sanity project and client repo configured; project instructions created |
| Phase 4 | [references/04-build-and-integrations.md](references/04-build-and-integrations.md) | Local build succeeds; planned pages, content, forms, and integrations work |
| Phase 5 | [references/05-worker-turnstile-and-email.md](references/05-worker-turnstile-and-email.md) | Configuration ready before deployment; live enforcement/delivery checks remain pending until Phase 9 verifies them |
| Phase 6 | [references/06-coolify-deployment.md](references/06-coolify-deployment.md) | First build succeeds; domains, env, labels, and auto-deploy evidence recorded |
| Phase 7/7b | [references/07-dns-email.md](references/07-dns-email.md) | DNS resolves correctly; HTTPS and optional email routing verified |
| Phase 8 | [references/08-webhook.md](references/08-webhook.md) | Sanity publish produces authenticated Coolify deployment |
| Phase 9–10 | [references/09-qa-handoff-and-mistakes.md](references/09-qa-handoff-and-mistakes.md) | QA evidence complete; client handoff delivered; residual risks recorded |

For tool availability or agent-specific capability names, read [references/tool-adapters.md](references/tool-adapters.md) before invoking a companion skill, MCP server, connector, browser, or authenticated CLI.

## Track logic

- Choose `net-new` only after confirming that the target domain does not carry a live site or production email that must be preserved. A request for a “new website” does not by itself prove that its domain is net-new.
- Choose `takeover` when a live site, DNS zone, production email, legacy redirects, or registrar transfer is involved.
- For `takeover`, begin Migration M1 before Phase 0. Follow the migration reference's explicit re-entry points and altered cutover ordering.
- Do not infer that a domain is safe to change from visual inspection alone. Use RDAP, authoritative DNS, HTTP, and user/provider evidence.

## Capability gates

Use capabilities, not one-agent-only names:

- `design exploration`: derive a direction from the client's goals, assets, and approved brief; record the important decisions and rationale. Use an available design skill when it adds value.
- `brainstorming`: compare approaches when the problem has a meaningful unresolved tradeoff; routine implementation does not need a separate ceremony.
- `code review`: review the implementation against the approved Site Plan before Phase 9.
- `verification`: gather command, browser, delivery, and provider evidence; assumptions do not pass gates.
- `live audit`: check the deployed site for functionality, accessibility, SEO, and performance using available browser/CLI tools.

Use [references/tool-adapters.md](references/tool-adapters.md) to map these capabilities for the active agent. Perform them directly when a companion skill is absent or unnecessary; required evidence still applies.

## Project instruction contract

During Phase 3, create `AGENTS.md` as the canonical project guidance. Create sibling `CLAUDE.md` as a thin import:

```md
@AGENTS.md
```

Add Claude-only notes below that import only when genuinely necessary. Keep operational runbooks and long specifications under `docs/` and link them from `AGENTS.md`.

## Stop conditions

Stop and request direction when:

- the Site Plan changes materially after sign-off;
- the target provider resource cannot be identified unambiguously;
- a required credential is missing, expired, or broader than the user wants to authorize;
- DNSSEC, mail records, nameserver ownership, or registrar state is uncertain during a takeover;
- a production write would affect another client or shared infrastructure beyond the approved scope;
- the playbook requires client-controlled inbox, MFA, identity, banking, payment, or registrar action.

Do not treat ordinary implementation difficulty as a stop condition. Diagnose, document evidence, and continue safely.
