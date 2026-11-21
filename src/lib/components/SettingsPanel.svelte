<script lang="ts">
  import { onMount } from 'svelte';
  import { locale, setLocale, t, type Locale } from '#lib/i18n';
  import { palettes, paletteIds } from '#lib/theme/palettes';
  import { palette, setPalette } from '#lib/theme/store';

  let { onClose }: { onClose: () => void } = $props();

  let panel: HTMLElement | undefined = $state();
  let closeButton: HTMLButtonElement | undefined = $state();

  const languages: Locale[] = ['en', 'tr'];

  onMount(() => {
    closeButton?.focus();

    function onKeydown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    window.addEventListener('keydown', onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  });
</script>

<div class="backdrop" role="presentation" onclick={onClose}></div>

<section aria-labelledby="settings-title" tabindex="-1" bind:this={panel}>
  <header>
    <h2 id="settings-title">{$t('settings.title')}</h2>
    <button
      type="button"
      class="close"
      aria-label={$t('settings.close')}
      bind:this={closeButton}
      onclick={onClose}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    </button>
  </header>

  <div class="group">
    <h3>{$t('settings.language')}</h3>
    <div class="languages" role="group" aria-label={$t('settings.language')}>
      {#each languages as language (language)}
        <button
          type="button"
          aria-pressed={$locale === language}
          onclick={() => setLocale(language)}
        >
          {$t(`language.${language}`)}
        </button>
      {/each}
    </div>
  </div>

  <div class="group">
    <h3>{$t('settings.palette')}</h3>
    <div class="palettes" role="group" aria-label={$t('settings.palette')}>
      {#each paletteIds as id (id)}
        <button
          type="button"
          class:selected={$palette === id}
          aria-pressed={$palette === id}
          onclick={() => setPalette(id)}
        >
          <span class="swatches" aria-hidden="true">
            {#each palettes[id].source.slice(0, 4) as color (color)}
              <i style:background={color}></i>
            {/each}
          </span>
          <span class="name">{$t(palettes[id].nameKey)}</span>
          {#if $palette === id}
            <svg class="check" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m5 13 4 4L19 7" />
            </svg>
          {/if}
        </button>
      {/each}
    </div>
  </div>
</section>

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: rgb(0 0 0 / 55%);
  }

  section {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 41;
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    width: min(380px, 92vw);
    padding: var(--space-6);
    border-left: 1px solid var(--color-border);
    background: var(--color-surface);
    overflow-y: auto;
    outline: none;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: -0.01em;
  }

  h3 {
    margin: 0 0 var(--space-3);
    color: var(--color-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .close {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: none;
  }

  .close:hover {
    background: var(--color-elevated);
  }

  .close svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: var(--color-text);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .group {
    display: flex;
    flex-direction: column;
  }

  .languages {
    display: flex;
    gap: var(--space-2);
  }

  .languages button {
    min-height: 44px;
    padding: 0 var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: none;
    font-size: 13px;
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .languages button:hover {
    background: var(--color-elevated);
  }

  .languages button[aria-pressed='true'] {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .palettes {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .palettes button {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 56px;
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-background);
    text-align: left;
    transition: border-color var(--transition-fast);
  }

  .palettes button:hover {
    border-color: var(--color-muted);
  }

  .palettes button.selected {
    border-color: var(--color-accent);
  }

  .swatches {
    display: flex;
    flex: none;
    width: 56px;
    height: 24px;
    border-radius: var(--radius-sm);
    overflow: hidden;
  }

  .swatches i {
    flex: 1;
  }

  .name {
    font-size: 13px;
  }

  .check {
    width: 16px;
    height: 16px;
    margin-left: auto;
    fill: none;
    stroke: var(--color-accent);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
