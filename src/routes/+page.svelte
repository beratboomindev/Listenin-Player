<script lang="ts">
  import { onMount } from 'svelte';
  import { invoke } from '@tauri-apps/api/core';
  import { locale, setLocale, t, type Locale } from '#lib/i18n';

  let version: string | null = null;

  onMount(async () => {
    try {
      version = await invoke<string>('version');
    } catch {
      version = null;
    }
    // Initialize color scheme from meta tag or default to sage
    const metaScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaScheme) {
      document.documentElement.dataset.colorScheme = 'sage';
    }
  });

  const languages: Locale[] = ['en', 'tr'];

  // Color scheme store with default 'sage'
  import { writable } from 'svelte/store';
  const colorScheme = writable<'sage' | 'graphite' | 'crimson-emerald'>('sage');
</script>

<main>
  <div class="mark" aria-hidden="true">
    <span></span><span></span><span></span>
  </div>

  <h1>{$t('app.name')}</h1>
  <p class="tagline">{$t('app.tagline')}</p>
  <p class="phase">{$t('app.phase')}</p>

  <div class="language">
    <span class="label">{$t('language.label')}</span>
    <div class="options" role="group" aria-label={$t('language.label')}>
      {#each languages as language (language)}
        <button
          type="button"
          aria-pressed={$locale === language}
          onclick={() => setLocale(language)}
        >
          {$t(`language.${language}`)}
        </button>
      {/each}
      <!-- Palette selector buttons -->
      <button
        type="button"
        aria-pressed={$colorScheme === 'graphite'}
        onclick={() => colorScheme.set('graphite')}
        class:active={$colorScheme === 'graphite'}
      >
        {$t('palette.graphite')}
      </button>
      <button
        type="button"
        aria-pressed={$colorScheme === 'crimson-emerald'}
        onclick={() => colorScheme.set('crimson-emerald')}
        class:active={$colorScheme === 'crimson-emerald'}
      >
        {$t('palette.crimson-emerald')}
      </button>
    </div>
  </div>

  <footer>
    {version ? $t('runtime.version', { version }) : $t('runtime.web_preview')}
  </footer>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--space-4);
    min-height: 100%;
    padding: var(--space-8);
    text-align: center;
  }

  .mark {
    display: flex;
    align-items: flex-end;
    gap: 6px;
    height: 40px;
    margin-bottom: var(--space-4);
  }

  .mark span {
    display: block;
    width: 8px;
    border-radius: 4px;
    background: var(--color-text);
    opacity: 0.9;
  }

  .mark span:nth-child(1) {
    height: 18px;
  }

  .mark span:nth-child(2) {
    height: 32px;
  }

  .mark span:nth-child(3) {
    height: 24px;
  }

  h1 {
    margin: 0;
    font-size: 2.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .tagline {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 1.0625rem;
  }

  .phase {
    max-width: 34ch;
    margin: var(--space-4) 0 0;
    color: var(--color-text-muted);
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .language {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    margin-top: var(--space-6);
    padding: var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .label {
    color: var(--color-text-muted);
    font-size: 0.875rem;
  }

  .options {
    display: flex;
    gap: 8px;
  }

  button {
    min-height: 44px;
    padding: 0 16px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
  }

  button[aria-pressed='true'] {
    border-color: var(--color-text);
    background: var(--color-text);
    color: var(--color-bg);
  }

  footer {
    position: fixed;
    bottom: var(--space-6);
    color: var(--color-text-muted);
    font-size: 0.8125rem;
  }
</style>
