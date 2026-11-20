# Phase 1 — Application scaffold plan

Companion to `PLAN.md` Phase 1. English only, like every tracked file.

- Status: in progress
- Depends on: D-011 (Tauri 2 + SvelteKit), D-012 (MIT)
- Out of scope here: Spotify (Phase 3), playback (Phase 4), persistence (Phase 5), full
  theming (Phase 2), packaging targets (Phase 6)

## Goal

A runnable desktop shell that proves the stack: Rust owns the process and the window,
SvelteKit renders a static, translated placeholder screen, and lint/type-check/test/CI are
green. No feature logic, no `yt-dlp`, no Spotify.

## Milestones

### M1 — Toolchain (user-local, no system changes)

- Node.js LTS and Rust stable installed per-user (`~/.local/opt/node`, `~/.cargo`), no sudo.
- Verify `node`, `npm`, `rustc`, `cargo`.
- Verify Linux webview prerequisites via `pkg-config`: `webkit2gtk-4.1`, `gtk+-3.0`,
  `libsoup-3.0` (already present on this machine).
- Exit: all versions print; no build step references `yt-dlp`.

### M2 — Repository layout

```
src/            SvelteKit app (static, SSR off)
src/lib/i18n/   locale catalogs and translation helper
src-tauri/      Rust crate: main.rs, lib.rs, tauri.conf.json, icons
docs/           phase plans and long-form docs
```

- `package.json` with pinned scripts, `pnpm` or `npm` lockfile (one only).
- `tsconfig.json`, `svelte.config.js` (adapter-static), `vite.config.ts`.
- `.env.example` with variable names and empty values only.
- Exit: `npm run check` passes on the empty project.

### M3 — Frontend shell

- One route, one placeholder screen: app name, current locale, version string.
- No sidebar, no search, no player, no navigation — the real layout starts in Phase 2.
- Global CSS limited to neutral tokens; the three locked palettes are defined as data in
  Phase 2, not here.
- Exit: `npm run build` emits static assets into `build/`.

### M4 — Rust core and window ownership

- `src-tauri` crate with a minimal `lib.rs`: app builder, a `version()` command, window
  created by Rust (not by config file), so Phase 4 can gate window creation.
- `tauri.conf.json` with development URL and production assets path, identifier
  `app.listenin`.
- Exit: `cargo check` passes; `npm run tauri dev` opens the shell.

### M5 — i18n skeleton

- `src/lib/i18n/{en,tr}.json` catalogs with the same key set.
- `t(key, params)` helper, locale resolution from OS with `en` fallback, locale switch API
  (Settings UI comes in Phase 2).
- No literal user-facing string in components; the placeholder screen reads from the catalog.
- Exit: a test asserts both catalogs have identical keys and no empty values.

### M6 — Quality gates and CI

- ESLint + Prettier + `svelte-check` + Vitest; `cargo fmt --check` + `cargo clippy -D warnings`.
- GitHub Actions: one job for frontend checks, one for Rust checks, both on push and PR.
- Exit: workflow files committed; local equivalents run clean.

### M7 — Local packaged build

- `npm run tauri build` produces a Linux bundle (AppImage/deb) with no `yt-dlp` inspection
  anywhere in the pipeline.
- Exit: artifact exists, `ldd`/`file` sanity checked; install step never fails on missing
  external tools.

### M8 — Documentation and handoff

- `README.md` gains a Development section (commands only, no stack re-litigation).
- `HANDOFF.md` and `PLAN.md` updated with the real state.
- Exit: a fresh clone can reach a running dev shell by following the README.

## Done criteria (Phase 1 exit)

- App launches into a translated placeholder shell on this machine.
- Lint, format, type-check and tests pass locally and in CI.
- A local packaged build exists.
- No hardcoded UI strings, no secrets, no bundled binaries.
- `yt-dlp` is not referenced by any install, build or packaging step.

## Risks

- Rust compile time on first build is long (Tauri dependency tree); keep `cargo check`
  incremental and avoid unnecessary rebuilds.
- WebKitGTK audio codec support is the known Phase 4 risk; it does not affect Phase 1.
- Node/Rust installed user-locally means a new shell may need `PATH` refresh.

## Skills

- UI work in this phase is a placeholder screen only. Real layout and visual direction start
  in Phase 2 and must use `ui-ux-pro-max` (plus `frontend-design` for direction), never
  hardcoded colors from `ui-sample/`.
