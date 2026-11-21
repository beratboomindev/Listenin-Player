import { describe, expect, it } from 'vitest';
import en from './en.json';
import tr from './tr.json';

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

function flatten(value: Json, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return {};

  return Object.entries(value).reduce<Record<string, string>>((acc, [key, child]) => {
    const path = prefix ? `${prefix}.${key}` : key;
    return { ...acc, ...flatten(child as Json, path) };
  }, {});
}

describe('locale catalogs', () => {
  const enKeys = Object.keys(flatten(en as Json)).sort();
  const trKeys = Object.keys(flatten(tr as Json)).sort();

  it('expose the same key set', () => {
    expect(trKeys).toEqual(enKeys);
  });

  it('contain no empty values', () => {
    for (const dict of [en, tr]) {
      for (const [key, value] of Object.entries(flatten(dict as Json))) {
        expect(value.trim(), key).not.toBe('');
      }
    }
  });

  it('keep every placeholder used in English', () => {
    const english = flatten(en as Json);
    const turkish = flatten(tr as Json);

    for (const [key, value] of Object.entries(english)) {
      const enPlaceholders = [...value.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();
      const trPlaceholders = [...(turkish[key] ?? '').matchAll(/\{(\w+)\}/g)]
        .map((m) => m[1])
        .sort();
      expect(trPlaceholders, key).toEqual(enPlaceholders);
    }
  });
});
