import { describe, expect, it } from 'vitest';
import { paletteIds, palettes, applyPalette, tokenVar, type ThemeTokens } from './palettes';

function channel(value: number): number {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const value = hex.replace('#', '');
  const r = channel(parseInt(value.slice(0, 2), 16));
  const g = channel(parseInt(value.slice(2, 4), 16));
  const b = channel(parseInt(value.slice(4, 6), 16));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const pairs: Array<[keyof ThemeTokens, keyof ThemeTokens, number]> = [
  ['text', 'background', 7],
  ['text', 'surface', 7],
  ['muted', 'background', 4.5],
  ['muted', 'surface', 4.5],
  ['accent', 'background', 3],
  ['onAccent', 'accent', 4.5]
];

describe.each(paletteIds)('palette %s', (id) => {
  const { tokens, source } = palettes[id];

  it('keeps five canonical source values', () => {
    expect(source).toHaveLength(5);
    for (const value of source) {
      expect(value).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it.each(pairs)('%s on %s meets %s:1', (foreground, background, minimum) => {
    const ratio = contrast(tokens[foreground], tokens[background]);
    expect(ratio).toBeGreaterThanOrEqual(minimum);
  });
});

describe('applyPalette', () => {
  it('writes every semantic token and marks the palette', () => {
    const props = new Map<string, string>();
    const target = {
      style: { setProperty: (key: string, value: string) => props.set(key, value) },
      dataset: {} as Record<string, string>
    } as unknown as HTMLElement;

    applyPalette('crimson', target);

    for (const [token, value] of Object.entries(palettes.crimson.tokens)) {
      expect(props.get(tokenVar(token as keyof ThemeTokens))).toBe(value);
    }

    expect(target.dataset.palette).toBe('crimson');
  });
});
