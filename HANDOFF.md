# HANDOFF.md

Written for an agent with zero context. Read `AGENTS.md` first, then `PLAN.md`, then
`DECISIONS.md`.

## Current state

Phase 0 (bootstrap) and Phase 1 (scaffold) are complete. The repository contains a Tauri 2
shell (Rust owns window creation), a SvelteKit static frontend, `en`/`tr` catalogs,
ESLint/Prettier/svelte-check/Vitest, a CI workflow, and local Linux bundles (`.deb`, `.rpm`,
`.AppImage`). Phase 2 (i18n hardening + theming) is next. Stack: **Tauri 2 + Rust core +
SvelteKit** (D-011). License: **MIT** (D-012).

Open verification: the built app has not been launched interactively on a real display yet.

## What exists

- `README.md` — product summary, requirements and install commands, how it works, legal notes.
- `AGENTS.md` — entry point, project rules, skill usage, launch-gate invariant, performance
  budget, commit convention, stop-and-ask list.
- `PLAN.md` — phases 0 to 6 with done criteria, plus the performance budget.
- `DECISIONS.md` — locked decisions D-001 to D-012 and open decisions O-002 to O-006.
- `LICENSE` — MIT, copyright 2026 beratboomindev.
- `HANDOFF.md` — this file.
- `docs/development.md` — prerequisites, commands, layout, and the `#lib/*` import convention.
- `docs/phase-1-plan.md` — Phase 1 milestones and their exit criteria.
- `package.json` — scripts: `dev`, `build`, `check`, `lint`, `format`, `test`, `tauri`.
- `src/` — SvelteKit app: one placeholder route, i18n catalogs and helper, tests.
- `src-tauri/` — Rust crate: `main.rs`, `lib.rs` (window + `version` command), config, icons.
- `.github/workflows/ci.yml` — frontend and Rust jobs.
- `ui-sample/` — design reference only, never imported by app code.

## What is blocked

- Semantic palette mapping (O-004) — Phase 2, needs the maintainer's mapping decision.
- Packaging target set (O-003) — Linux bundles exist; macOS/Windows are undecided.
- Minimum `yt-dlp` version (O-006) — Phase 4.
- Spotify OAuth flow details (O-005) — Phase 3: loopback strategy and token storage.

## Repository

- Remote: `https://github.com/beratboomindev/listenin` (public, default branch `main`).
- Local toolchains are user-installed: Node in `~/.local/opt`, Rust in `~/.cargo`,
  `gh` in `~/.local/bin`. A fresh shell may need those on `PATH`.
- `.memo/` is local tooling output and is git-ignored; do not commit it.

## Exact next action

1. Phase 2 — i18n and theming. Use the `ui-ux-pro-max` skill for layout/visual decisions and
   `frontend-design` for direction; never import colors from `ui-sample/`.
2. Map the three locked palettes to semantic tokens (background, surface, elevated surface,
   border, text, text-muted, accent), add runtime switching plus persistence, and record the
   mapping in `DECISIONS.md` (O-004).
3. Replace the placeholder route with the real shell (sidebar, top bar, content area, player
   bar) behind translation keys only.

Do not implement the launch gate as a UI overlay that can be dismissed. It is a pre-mount
check: in Tauri the main window is built in Rust only after a passing pre-flight; the setup
window is the only window that may exist before that.

## How to resume

- Verify state: `git log --oneline`, `npm run check`, `npm test`, `cargo check --manifest-path
src-tauri/Cargo.toml`.
- Read the open decisions table before writing any code.
- If the machine lacks `yt-dlp` or `ffmpeg`, that is expected during development; the gate
  path must be testable with a deliberately missing or fake binary.
- Every task ends by updating `PLAN.md` and `HANDOFF.md`.
