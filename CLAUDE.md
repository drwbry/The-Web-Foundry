@AGENTS.md

## Claude Code

- When a change affects client onboarding, update the canonical skill at `skills/web-foundry-onboarding/` in this repo. Both `~/.claude/skills/web-foundry-onboarding` and `~/.agents/skills/web-foundry-onboarding` are symlinks to it, so never edit through those paths as if they were separate copies.
- `web-foundry-onboarding` is visible to Claude Code only inside `~/projects/the-web-foundry/`. A user-level `skillOverrides` setting sets it to `user-invocable-only` everywhere, and each Web Foundry folder turns it back `on` in its own `.claude/settings.local.json`. That file is gitignored, and settings do not inherit from parent folders. New client repos get the setting in Phase 3, Step 6. If the skill is missing in a Web Foundry repo, copy the `skillOverrides` block from `~/projects/the-web-foundry/.claude/settings.local.json`.
- Use the `frontend-design` skill for substantial visual changes or new showcase concepts.
