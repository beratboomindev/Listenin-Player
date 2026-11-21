/**
 * Locked palettes, recorded verbatim from `ui-sample/need-to-know.txt`.
 * Only `source` values are canonical. The extra tokens are derived once here so the rest of
 * the app never invents colors; the mapping is recorded in `DECISIONS.md` (O-004).
 */
export type PaletteId = 'sage' | 'graphite' | 'crimson';

export type ThemeTokens = {
  background: string;
  surface: string;
  elevated: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accentAlt: string;
  onAccent: string;
};

export type Palette = {
  id: PaletteId;
  nameKey: string;
  /** Canonical values, exactly as given. Never edit these. */
  source: readonly string[];
  tokens: ThemeTokens;
};

export const palettes: Record<PaletteId, Palette> = {
  sage: {
    id: 'sage',
    nameKey: 'settings.palette_sage',
    source: ['#8f9989', '#6b7566', '#484f45', '#20231f', '#0c0e0c'],
    tokens: {
      background: '#0c0e0c',
      surface: '#20231f',
      elevated: '#2b2f2a',
      border: '#484f45',
      text: '#e9ece6',
      muted: '#8f9989',
      accent: '#8f9989',
      accentAlt: '#6b7566',
      onAccent: '#14170f'
    }
  },
  graphite: {
    id: 'graphite',
    nameKey: 'settings.palette_graphite',
    source: ['#5e6374', '#3e414d', '#1e2025', '#0b0c0e', '#0b0c0e'],
    tokens: {
      background: '#0b0c0e',
      surface: '#1e2025',
      elevated: '#282b33',
      border: '#3e414d',
      text: '#edeef3',
      muted: '#9aa0b2',
      accent: '#5e6374',
      accentAlt: '#3e414d',
      onAccent: '#f2f3f7'
    }
  },
  crimson: {
    id: 'crimson',
    nameKey: 'settings.palette_crimson',
    source: ['#af1f4d', '#61112b', '#451726', '#1faf80', '#116147'],
    tokens: {
      background: '#451726',
      surface: '#61112b',
      elevated: '#6f1631',
      border: '#8a1c40',
      text: '#f7eef1',
      muted: '#d9a7b8',
      accent: '#1faf80',
      accentAlt: '#af1f4d',
      onAccent: '#06251a'
    }
  }
};

export const paletteIds = Object.keys(palettes) as PaletteId[];

export const defaultPalette: PaletteId = 'sage';

export function tokenVar(token: keyof ThemeTokens): string {
  return `--color-${token.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)}`;
}

export function applyPalette(id: PaletteId, target: HTMLElement = document.documentElement): void {
  const { tokens } = palettes[id];

  for (const [token, value] of Object.entries(tokens)) {
    target.style.setProperty(tokenVar(token as keyof ThemeTokens), value);
  }

  target.dataset.palette = id;
}
