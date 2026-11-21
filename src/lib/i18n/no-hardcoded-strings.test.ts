import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const srcDir = join(process.cwd(), 'src');

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.svelte') ? [full] : [];
  });
}

function stripBlocks(source: string): string {
  let cleaned = source
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '');

  let previous = '';
  while (previous !== cleaned) {
    previous = cleaned;
    cleaned = cleaned.replace(/\{[^{}]*\}/g, '');
  }

  return cleaned;
}

function literalText(source: string): string[] {
  const withoutBlocks = stripBlocks(source);
  const text: string[] = [];

  for (const match of withoutBlocks.matchAll(/>([^<>]+)</g)) {
    const value = match[1].trim();
    if (/\p{L}{2,}/u.test(value)) text.push(value);
  }

  return text;
}

describe('i18n coverage', () => {
  it('has no hardcoded user-facing strings in components', () => {
    const offenders = walk(srcDir).flatMap((file) =>
      literalText(readFileSync(file, 'utf8')).map((text) => `${file}: ${text}`)
    );

    expect(offenders).toEqual([]);
  });
});
