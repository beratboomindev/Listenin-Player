# HANDOFF.md

Written for an agent with zero context. Read `AGENTS.md` first, then `PLAN.md`, then
`DECISIONS.md`.

## Current state

Phase 0 (bootstrap) is complete. Phase 1 (scaffold) is in progress; the detailed milestone
plan is `docs/phase-1-plan.md`. The stack is locked: **Tauri 2 + Rust core + SvelteKit static
frontend** (D-011). The license is settled: **MIT** (D-012).

## What exists

- `README.md` — product summary, requirements and install commands, how it works, legal notes.
- `AGENTS.md` — entry point, project rules, skill usage, launch-gate invariant, performance
  budget, commit convention, stop-and-ask list.
- `PLAN.md` — phases 0 to 6 with done criteria, plus the performance budget.
- `DECISIONS.md` — locked decisions D-001 to D-012 and open decisions O-002 to O-006.
- `LICENSE` — MIT, copyright 2026 beratboomindev.
- `HANDOFF.md` — this file.
- `ui-sample/ui1.png` — low-fidelity layout reference (sidebar, top bar with logo and search,
  content area, persistent bottom player bar). Colors are not the palette.
- `ui-sample/need-to-know.txt` — reference guide with the three palettes recorded verbatim.

## What is blocked

- Packaging target (O-003) — Tauri is locked, but the target set (Linux AppImage/deb, macOS
  dmg, Windows msi) is not.
- Semantic palette mapping (O-004) and minimum `yt-dlp` version (O-006) — implementation phase.
- Spotify OAuth flow details (O-005) — loopback port strategy and token storage.

## Repository

- Remote: `https://github.com/beratboomindev/listenin` (public, default branch `main`).
- State: bootstrap commit plus documentation commits; no CI, no manifest, no app code yet.

## Exact next action

1. Start Phase 1: scaffold Tauri 2 with a Rust core and a SvelteKit static frontend, plus
   lint/format/type-check/test commands and a CI workflow. No `yt-dlp` checks in any build or
   packaging step.
2. Use the `ui-ux-pro-max` skill for all UI work, and `frontend-design` for the visual
   direction.

Do not implement the launch gate as a UI overlay that can be dismissed. It is a pre-mount
check: if it fails, the main UI is never created. In Tauri this means the main window is built
at runtime only after a passing pre-flight; the setup window is the only window that exists
before that.

## How to resume

- Verify state: `git log --oneline`, `ls -la`, `cat DECISIONS.md`.
- Read the open decisions table before writing any code.
- If the machine lacks `yt-dlp` or `ffmpeg`, that is expected during development; the gate
  path must be testable with a deliberately missing or fake binary.
- Every task ends by updating `PLAN.md` and `HANDOFF.md`.
