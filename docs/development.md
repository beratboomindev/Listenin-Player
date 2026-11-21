# Development

Phase 1 setup. Nothing here installs or checks `yt-dlp`; that only happens at launch, in
Phase 4.

## Prerequisites

- Node.js LTS (user-local install is fine, no sudo required)
- Rust stable (`rustup`, user-local is fine)
- Linux: `webkit2gtk-4.1`, `gtk3`, `libsoup3`, `librsvg` development packages

## Commands

```bash
npm install
npm run tauri dev     # desktop shell (Rust + Vite dev server)
npm run dev           # browser-only preview of the frontend
npm run check         # svelte-check + TypeScript
npm run lint          # ESLint
npm run format        # Prettier check
npm test              # Vitest
npm run tauri build   # local Linux bundle
```

## Layout

```
src/             SvelteKit app (static, SSR off)
src/lib/i18n/    locale catalogs (en, tr) and the translation helper
src-tauri/       Rust crate: window creation, commands, bundle config
docs/            phase plans and long-form documentation
ui-sample/       design reference only, never imported by app code
```

## Notes

- The main window is created by Rust in `src-tauri/src/lib.rs`, not by `tauri.conf.json`.
  That is deliberate: Phase 4 inserts the `yt-dlp` pre-flight before window creation, so a
  failing check means the main UI never exists.
- Every user-facing string lives in `src/lib/i18n/{en,tr}.json`. Adding a string to one
  catalog without the other fails `npm test`.
- Module imports use Node subpath imports: `#lib/*` maps to `src/lib/*` in `package.json`.
  `tsconfig.json` mirrors the mapping because TypeScript does not resolve `imports` here.
- Palettes live in `src/lib/theme/palettes.ts`. The `source` arrays are verbatim and must not
  be edited; derived tokens and their contrast floors are documented in `DECISIONS.md`
  (D-013). Components only ever read `--color-*` variables, never hex values.
