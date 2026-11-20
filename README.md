# Listenin'

Listenin' is an open-source, local-first music player. Browse artists, albums and tracks with
your own Spotify account; Listenin' plays the equivalent audio on your own machine through
your own `yt-dlp` binary. No hosted backend, no shared account, no bundled content.

- Status: **pre-alpha** · Stack: **TBD — see `DECISIONS.md`** · License: **TBD**

## Requirements

Listenin' ships no binaries. Install `yt-dlp` and `ffmpeg` yourself, using your system's
package manager.

macOS:
```bash
brew install yt-dlp ffmpeg
```

Windows:
```powershell
winget install yt-dlp.yt-dlp
winget install Gyan.FFmpeg
```

Debian / Ubuntu:
```bash
sudo apt install ffmpeg
python3 -m pipx install yt-dlp
```

The distro `yt-dlp` package is often outdated; prefer `pipx` or the official binary.

Any OS, fallback:
```bash
python3 -m pip install -U yt-dlp
```

Verify:
```bash
yt-dlp --version
ffmpeg -version
```

Installing the app is a normal, unblocked operation: no install, build or packaging step
checks for these tools. On launch the app stops at a setup screen instead of opening the
interface until `yt-dlp` is found.

## How it works

1. Browse artists, albums and tracks in Spotify (read-only browse layer).
2. Resolve each track's identity: title, artist, duration.
3. Play the equivalent track locally through `yt-dlp` (with `ffmpeg` for muxing/extraction).
4. Optionally download a track to disk — always explicit and user-initiated.

Spotify is never used for playback.

## Legal & ToS

Listenin' runs entirely on the user's machine and hosts nothing. It uses the user's own
Spotify account and the user's own `yt-dlp` binary to access third-party content, which may
violate Spotify's and YouTube's terms of service. The user is solely responsible for
compliance with those terms and for any content they access. The maintainers ship no content
and provide no warranty.

## Documentation

- `AGENTS.md` — rules and entry point for agents and contributors.
- `PLAN.md` — phased roadmap and performance budget.
- `DECISIONS.md` — locked decisions and open questions.
- `HANDOFF.md` — current state and how to resume.
