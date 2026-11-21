import { writable } from 'svelte/store';
import { applyPalette, defaultPalette, paletteIds, type PaletteId } from './palettes';

export const PALETTE_STORAGE_KEY = 'listenin.palette';

function isPaletteId(value: string | null): value is PaletteId {
  return value !== null && (paletteIds as string[]).includes(value);
}

function readStoredPalette(): PaletteId {
  if (typeof localStorage === 'undefined') return defaultPalette;

  const stored = localStorage.getItem(PALETTE_STORAGE_KEY);
  return isPaletteId(stored) ? stored : defaultPalette;
}

export const palette = writable<PaletteId>(defaultPalette);

/** Applies the stored palette. Safe to call more than once. */
export function initTheme(): void {
  const id = readStoredPalette();
  palette.set(id);
  applyPalette(id);
}

export function setPalette(id: PaletteId): void {
  palette.set(id);
  applyPalette(id);

  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(PALETTE_STORAGE_KEY, id);
  }
}
