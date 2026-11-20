# AGENTS.md

## Read this first

Read `AGENTS.md` → `PLAN.md` → `DECISIONS.md` → `HANDOFF.md` in that order before starting any task. `DECISIONS.md` overrides all other documents.

## What this project is

Listenin' is an open-source, local-first music player. Spotify is used as a browse layer
only (authentication, artist/album listing, track identity). Playback always happens on the
user's machine through the user's own `yt-dlp` binary. There is no hosted backend and there
never will be one.

## Project rules

- **English-only tracked content.** Docs, commit messages, code, comments, identifiers and
  branch names are English. The only exceptions are the Turkish chat with the maintainer and
  the `tr` locale files.
- **Chat with the maintainer in Turkish; every repo artifact in English.** This applies to
  progress updates, questions, plans and summaries in chat versus anything committed.
- **No secrets, ever.** No API keys, client IDs, client secrets, tokens, cookies or account
  data in any committed file. `.env.example` documents variable names with empty values.
  Every user completes their own Spotify OAuth login; the project owns no credentials.
- **No binaries in the repo.** `yt-dlp` and `ffmpeg` are user-installed. The repository ships
  zero executables.
- **i18n from day one.** No hardcoded UI strings. All user-facing text goes through the
  translation layer. Locales: `en` (default) and `tr`.
- **`ui-sample/` is a design reference.** Application code must never import from it, and its
  colors are not the app palette. It must not be modified except by appending to
  `ui-sample/need-to-know.txt`.

## Non-negotiable invariant: install always works, launch is gated

This invariant overrides convenience, deadlines and feature requests.

1. **Install is always allowed.** Building, packaging and installing the app must never check
   for `yt-dlp` or `ffmpeg`, and must always succeed.
2. **Launch is gated.** On every launch, before the main window content is created, a
   pre-flight check locates `yt-dlp` on `PATH` or at a user-configured path and runs
   `yt-dlp --version`, parsing the version string. `ffmpeg` is checked the same way.
3. **The gate fails closed.** If the check fails, the main UI never mounts. The app shows a
   single minimal "Setup required" screen: what is missing, the detected OS, matching install
   commands with a copy button each, a "Re-check" button and a quit button. No sidebar, no
   search, no player, no navigation, no cached library, no partial content.
4. **No silent fallback.** The setup screen can never be dismissed into the app. A passing
   re-check replaces it with the main UI without a restart. A partial interface is a bug.

Any change that makes the UI mount before a passing pre-flight check must be rejected.

## Performance budget

- Interactions stay at 60fps; no layout thrash or blocking work on the UI thread.
- Lists above 100 rows are virtualized.
- Playback starts in under 2 seconds after a track is resolved.
- `yt-dlp` always runs in a child process with streamed output; it never blocks the UI thread.
- Track metadata is cached in SQLite so repeat views and re-resolutions are local and instant.

## Commit convention

- [Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`,
  `chore:`, `refactor:`, `test:`, `perf:`, `build:`, `ci:`.
- One long-lived branch: `main`. Short-lived work branches may be created, but `main` stays
  releasable.
- Commits are English, imperative, scoped to one logical change.

## Stop and ask

Do not proceed without explicit maintainer confirmation before:

- creating the GitHub repository or pushing to it;
- choosing a license;
- installing global tooling (CLI tools, package managers, system packages);
- deleting files outside the project directory;
- adding any dependency, binary or hosted service that conflicts with the rules above.

## Task completion rule

Every task ends by updating `PLAN.md` and `HANDOFF.md`. If those two files do not reflect the
new state, the task is not done.
