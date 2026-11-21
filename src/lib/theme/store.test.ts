import { beforeEach, describe, expect, it } from 'vitest';
import { get } from 'svelte/store';

const storage = new Map<string, string>();
const styleProps = new Map<string, string>();

globalThis.localStorage = {
  getItem: (key: string) => storage.get(key) ?? null,
  setItem: (key: string, value: string) => void storage.set(key, value),
  removeItem: (key: string) => void storage.delete(key),
  clear: () => storage.clear(),
  key: (index: number) => [...storage.keys()][index] ?? null,
  get length() {
    return storage.size;
  }
} as Storage;

globalThis.document = {
  documentElement: {
    style: { setProperty: (key: string, value: string) => styleProps.set(key, value) },
    dataset: {}
  }
} as unknown as Document;

const { initTheme, setPalette, palette, PALETTE_STORAGE_KEY } = await import('./store');
const { defaultPalette } = await import('./palettes');

describe('theme store', () => {
  beforeEach(() => {
    storage.clear();
    styleProps.clear();
  });

  it('persists and applies the selected palette', () => {
    setPalette('graphite');

    expect(get(palette)).toBe('graphite');
    expect(storage.get(PALETTE_STORAGE_KEY)).toBe('graphite');
    expect(styleProps.get('--color-background')).toBe('#0b0c0e');
  });

  it('restores the stored palette on init', () => {
    storage.set(PALETTE_STORAGE_KEY, 'crimson');

    initTheme();

    expect(get(palette)).toBe('crimson');
    expect(styleProps.get('--color-background')).toBe('#451726');
  });

  it('falls back to the default for unknown stored values', () => {
    storage.set(PALETTE_STORAGE_KEY, 'nope');

    initTheme();

    expect(get(palette)).toBe(defaultPalette);
  });
});
