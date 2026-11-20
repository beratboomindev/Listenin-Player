# PLAN.md

Phased roadmap. No dates: a phase is done when its done criteria are met. `DECISIONS.md`
overrides this file.

## Phase 0 — Bootstrap

**Goal:** repository, documentation and design reference are in place, with no application
code and no chosen stack.

**Done criteria:**
- Repository initialized on `main` with one bootstrap commit.
- `README.md`, `AGENTS.md`, `PLAN.md`, `DECISIONS.md`, `HANDOFF.md` exist and agree.
- `ui-sample/` preserved and annotated; its palette values recorded verbatim.
- Product behaviour and hard constraints recorded as locked decisions.
- Palette values recorded verbatim; mapping to semantic tokens still open.
- Stack locked: Tauri 2 + Rust core + SvelteKit static frontend (D-011).

## Phase 1 — Application scaffold

**Goal:** a runnable Tauri 2 shell with a SvelteKit static frontend, a build, and a release
pipeline skeleton, with no feature logic yet.

**Done criteria:**
- App launches into a blank, translated shell on the target OS(es).
- Lint, format, type-check and test commands exist and pass in CI.
- A local packaged build exists; no build step inspects `yt-dlp` or `ffmpeg`.
- Repository layout documented; `.env.example` present with no values.

## Phase 2 — i18n and theming

**Goal:** all user-facing text is translatable and all colors are semantic tokens driven by
runtime-switchable palettes.

**Done criteria:**
- `en` and `tr` locale files exist; no hardcoded UI strings remain (verified by a lint rule
  or test).
- Three palettes (sage, graphite, crimson/emerald) are selectable in Settings at runtime and
  persist across restarts.
- Palette values map to semantic tokens (background, surface, elevated surface, border, text,
  text-muted, accent); the mapping is recorded in `DECISIONS.md`.
- No component reads colors from `ui-sample/`.

## Phase 3 — Spotify browse layer

**Goal:** per-user Spotify OAuth login and read-only browsing of artists, albums and tracks.

**Done criteria:**
- PKCE OAuth flow per user; tokens stored locally, never committed, never transmitted to a
  project-owned server (there is none).
- Artist list, album list and album track list render from the API, virtualized above 100 rows.
- Track identity (title, artist, duration) is extracted and normalized into an internal model.
- No playback, no audio, no Spotify SDK playback surface anywhere in the app.
- Graceful, translated error states for auth failure, rate limits and offline.

## Phase 4 — yt-dlp resolver, playback and launch gate

**Goal:** resolve a track identity to a `yt-dlp` stream and play it locally, behind the
non-negotiable launch gate.

**Done criteria:**
- Pre-flight check runs before main window content is created: locate `yt-dlp`, run
  `yt-dlp --version`, parse and record the version; check `ffmpeg` the same way.
- Failing pre-flight shows only the setup screen (missing tools, detected OS, install
  commands with copy buttons, Re-check, Quit). No main UI mounts, no cached library renders.
- Passing re-check swaps in the main UI without a restart; a passing first check skips the
  screen entirely.
- `yt-dlp` runs in a child process; the UI thread stays responsive at all times.
- Playback starts in under 2 seconds after resolve; seek, pause, resume and track change work.
- User-configurable `yt-dlp` path and a translated message for a stale version.

## Phase 5 — Library, downloads and metadata cache

**Goal:** local library management, explicit downloads and a metadata cache that makes the app
fast offline.

**Done criteria:**
- Library persists locally (playlists, favourites, history) with no hosted sync.
- Download is always explicit, user-initiated, cancellable, with visible progress and a
  configurable destination.
- SQLite metadata cache stores resolutions and track metadata; repeat views hit the cache.
- Cache invalidation policy documented and tested; no stale entry can block playback silently.

## Phase 6 — Polish and packaging

**Goal:** shippable pre-release builds for the chosen packaging target.

**Done criteria:**
- Installers/artifacts for the chosen target(s) build reproducibly and install without a
  `yt-dlp` check.
- Accessibility pass: keyboard navigation, focus visibility, contrast against every palette.
- Performance budget verified: 60fps interactions, virtualized long lists, sub-2s playback
  start, no UI-thread blocking.
- Crash/error reporting is local-only or absent; nothing phones home.
- Release notes, license and contribution guide finalized.

## Performance budget

- 60fps interactions; animations and scrolling never drop frames on a mid-range machine.
- Lists above 100 rows are virtualized.
- Playback starts in under 2 seconds after a track resolves.
- `yt-dlp` always runs as a child process so the UI thread never blocks.
- SQLite metadata cache backs library, resolutions and track metadata.
