import { derived, writable } from 'svelte/store';
import en from './en.json';
import tr from './tr.json';

export const catalog = { en, tr } as const;

export type Locale = keyof typeof catalog;
export const locales: Locale[] = ['en', 'tr'];

const fallback: Locale = 'en';

type Params = Record<string, string | number>;

function normalize(language: string): Locale {
  const base = language.slice(0, 2).toLowerCase();
  return (locales as string[]).includes(base) ? (base as Locale) : fallback;
}

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return fallback;
  return normalize(navigator.language);
}

export const locale = writable<Locale>(detectLocale());

export function setLocale(next: Locale): void {
  locale.set(next);
}

function read(dict: unknown, path: string): string | undefined {
  const value = path.split('.').reduce<unknown>((acc, key) => {
    if (typeof acc !== 'object' || acc === null) return undefined;
    return (acc as Record<string, unknown>)[key];
  }, dict);

  return typeof value === 'string' ? value : undefined;
}

function interpolate(template: string, params?: Params): string {
  if (!params) return template;

  return template.replace(/\{(\w+)\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match
  );
}

export function translate(target: Locale, key: string, params?: Params): string {
  const value = read(catalog[target], key) ?? read(catalog[fallback], key) ?? key;
  return interpolate(value, params);
}

export const t = derived(locale, ($locale) => {
  return (key: string, params?: Params) => translate($locale, key, params);
});
