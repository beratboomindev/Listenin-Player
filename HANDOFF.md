# HANDOFF.md

Written for an agent with zero context. Read `AGENTS.md` first, then `PLAN.md`, then
`DECISIONS.md`.

## Current state

Phase 0 (bootstrap) only. There is **no application code**, **no dependency manifest** and
**no chosen stack**. The repository contains documentation plus the untouched design
reference.

## What exists

- `README.md` — product summary, requirements and install commands, how it works, legal notes.
- `AGENTS.md` — entry point, project rules, launch-gate invariant, performance budget, commit
  convention, stop-and-ask list.
- `PLAN.md` — phases 0 to 6 with done criteria, plus the performance budget.
- `DECISIONS.md` — locked decisions D-001 to D-010 and open decisions O-001 to O-006.
- `HANDOFF.md` — this file.
- `ui-sample/ui1.png` — low-fidelity layout reference (sidebar, top bar with logo and search,
  content area, persistent bottom player bar). Colors are not the palette.
- `ui-sample/need-to-know.txt` — reference guide with the three palettes recorded verbatim.

## What is blocked

- Stack choice (O-001) — the maintainer must pick one of the three proposed options.
- License (O-002) — must be chosen by the maintainer, never guessed.
- Packaging target (O-003) — follows the stack choice.
- Semantic palette mapping (O-004) and minimum `yt-dlp` version (O-006) — implementation phase.

## Repository

- Remote: `https://github.com/beratboomindev/listenin` (public, default branch `main`).
- State: one bootstrap commit, working tree clean. No CI, no manifest, no app code yet.

## Exact next action

1. Wait for the maintainer to choose a stack from the three options presented in chat.
2. Record that choice as a new locked row in `DECISIONS.md` (mark O-001 resolved) and update
   the stack line in `README.md` and the status in this file.
3. Then start Phase 1: scaffold the app shell, CI and a packaged build **without** using any
   framework that would force a browser-only runtime.

Do not implement the launch gate as a UI overlay that can be dismissed. It is a pre-mount
check: if it fails, the main UI is never created.

## How to resume

- Verify state: `git log --oneline`, `ls -la`, `cat DECISIONS.md`.
- Read the open decisions table before writing any code.
- If the machine lacks `yt-dlp` or `ffmpeg`, that is expected during development; the gate
  path must be testable with a deliberately missing or fake binary.
- Every task ends by updating `PLAN.md` and `HANDOFF.md`.
