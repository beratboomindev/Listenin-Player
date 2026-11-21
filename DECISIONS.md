# DECISIONS.md

Decisions recorded here override every other document. `Status` is one of `locked`,
`open` or `superseded`. Nothing locked is re-litigated without an explicit maintainer request.

## Locked decisions

| ID    | Date       | Decision                                                                                                     | Status | Rationale                                                                                                                                   |
| ----- | ---------- | ------------------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| D-001 | 2026-11-20 | The project is open source.                                                                                  | locked | Community contribution, auditability and trust are core to a local-first player.                                                            |
| D-002 | 2026-11-20 | Docs, code and commits are English; chat with the maintainer is Turkish.                                     | locked | Widest contributor reach, while keeping day-to-day communication natural for the maintainer.                                                |
| D-003 | 2026-11-20 | The app ships multiple color palettes, switchable at runtime from Settings.                                  | locked | User preference and accessibility; three palettes recorded in `ui-sample/need-to-know.txt`.                                                 |
| D-004 | 2026-11-20 | Spotify is a browse layer only: auth, artist/album listing, track identity. No playback via Spotify.         | locked | Avoids Spotify playback SDK constraints and keeps one playback path.                                                                        |
| D-005 | 2026-11-20 | `yt-dlp` is the sole playback source.                                                                        | locked | Handles resolution and streaming on the user's machine with no hosted component.                                                            |
| D-006 | 2026-11-20 | Install is never blocked; launch is gated on a `yt-dlp` pre-flight check.                                    | locked | Packaging must never fail on a missing runtime tool, and the app must never show a partial interface.                                       |
| D-007 | 2026-11-20 | `yt-dlp` and `ffmpeg` are user-installed and never bundled.                                                  | locked | No binaries in the repo; licensing and staleness are the user's package manager's job.                                                      |
| D-008 | 2026-11-20 | The app is local-only with no hosted backend.                                                                | locked | Local-first is the product; a backend would add cost, accounts and a single point of failure.                                               |
| D-009 | 2026-11-20 | Downloads are explicit and user-initiated, never automatic.                                                  | locked | Keeps the default flow streaming and puts storage decisions with the user.                                                                  |
| D-010 | 2026-11-20 | i18n from day one: no hardcoded UI strings, locales `en` and `tr`.                                           | locked | Retrofitting i18n is expensive; Turkish is a first-class locale from the start.                                                             |
| D-011 | 2026-11-20 | Stack: Tauri 2 (Rust core) + SvelteKit static frontend + system webview; packaging via `tauri-bundler`.      | locked | The main window is created by Rust only after a passing pre-flight, so the launch gate is structural; smallest footprint of the candidates. |
| D-012 | 2026-11-20 | License: MIT.                                                                                                | locked | Lowest friction for an open-source player, permissive, one short file, no patent or copyleft obligations for downstream users.              |
| D-013 | 2026-11-21 | Semantic token mapping for the three palettes, with derived tokens for elevated surface, text and on-accent. | locked | The palettes provide five anchor colors each; the UI needs named roles. Contrast is enforced by tests, not taste.                           |

## Locked details

### Launch gate (D-006)

On every launch, before main window content is created, the app locates `yt-dlp` on `PATH` or
at a user-configured path, runs `yt-dlp --version` and parses the version string; `ffmpeg` is
checked the same way. On failure only a "Setup required" screen is shown: missing tools,
detected OS, matching install commands with copy buttons, Re-check and Quit. No sidebar, no
search, no player, no navigation, no cached library. The screen cannot be dismissed into the
app. A passing re-check replaces it with the main UI without a restart.

### Handoff model (D-004, D-005)

The user picks an artist or album in Spotify; the app resolves each track's identity (title,
artist, duration) and plays the equivalent track through `yt-dlp`, using `ffmpeg` for muxing
and audio extraction.

### Palettes (D-003)

Recorded verbatim from the design reference.

- Sage: `#8f9989`, `#6b7566`, `#484f45`, `#20231f`, `#0c0e0c`
- Graphite: `#5e6374`, `#3e414d`, `#1e2025`, `#0b0c0e`, `#0b0c0e`
- Crimson/emerald: `#af1f4d`, `#61112b`, `#451726`, `#1faf80`, `#116147`

### Semantic token mapping (D-013)

Anchor values are verbatim. `elevated`, `text`, `on-accent` and graphite's `muted` are derived
once in `src/lib/theme/palettes.ts`; nothing else in the app may invent colors.

| Token      | Sage      | Graphite  | Crimson   |
| ---------- | --------- | --------- | --------- |
| background | `#0c0e0c` | `#0b0c0e` | `#451726` |
| surface    | `#20231f` | `#1e2025` | `#61112b` |
| elevated   | `#2b2f2a` | `#282b33` | `#6f1631` |
| border     | `#484f45` | `#3e414d` | `#8a1c40` |
| text       | `#e9ece6` | `#edeef3` | `#f7eef1` |
| muted      | `#8f9989` | `#9aa0b2` | `#d9a7b8` |
| accent     | `#8f9989` | `#5e6374` | `#1faf80` |
| accent-alt | `#6b7566` | `#3e414d` | `#af1f4d` |
| on-accent  | `#14170f` | `#f2f3f7` | `#06251a` |

Contrast floors, verified by `src/lib/theme/palettes.test.ts`: text 7:1 on background and
surface, muted 4.5:1 on both, accent 3:1 on background, on-accent 4.5:1 on accent.

The crimson palette carries two accents: emerald is the primary accent, crimson is
`accent-alt`; background and surface come from its wine shades.

## Open decisions

| ID    | Question                                                         | Status   | Notes                                                                     |
| ----- | ---------------------------------------------------------------- | -------- | ------------------------------------------------------------------------- |
| O-001 | ~~Stack choice~~ — resolved: Tauri 2 + Rust + SvelteKit (D-011). | resolved | Chosen by the maintainer on 2026-11-20.                                   |
| O-002 | ~~License~~ — resolved: MIT (D-012).                             | resolved | Chosen by the maintainer on 2026-11-20.                                   |
| O-003 | Packaging target(s).                                             | open     | Linux bundles exist; macOS and Windows are undecided.                     |
| O-004 | ~~Semantic palette mapping~~ — resolved: D-013.                  | resolved | Mapping recorded above and enforced by contrast tests.                    |
| O-005 | Spotify OAuth flow: PKCE per user, loopback port, token storage. | open     | PKCE is required; port strategy and storage depend on the implementation. |
| O-006 | Minimum supported `yt-dlp` version.                              | open     | Needs a floor for the pre-flight version parse and resolver flags.        |
