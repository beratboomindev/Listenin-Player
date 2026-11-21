<script lang="ts">
  import { t } from '#lib/i18n';

  let { onOpenSettings }: { onOpenSettings: () => void } = $props();
</script>

<header>
  <div class="brand">
    <span class="mark" aria-hidden="true"><i></i><i></i><i></i></span>
    <span class="name">{$t('app.name')}</span>
  </div>

  <label class="search">
    <span class="visually-hidden">{$t('a11y.search')}</span>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
    <input type="search" placeholder={$t('search.placeholder')} disabled />
  </label>

  <button
    type="button"
    class="icon-button"
    aria-label={$t('a11y.open_settings')}
    title={$t('nav.settings')}
    onclick={onOpenSettings}
  >
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.56V21a2 2 0 1 1-4 0v-.11a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3a2 2 0 1 1 0-4h.11a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.56V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V9a1.7 1.7 0 0 0 1.56 1H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.49 1Z"
      />
    </svg>
  </button>
</header>

<style>
  header {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--space-6);
    padding: 0 var(--space-6) 0 var(--space-6);
    border-bottom: 1px solid var(--color-border);
    background: var(--color-background);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
    padding-left: var(--space-2);
  }

  .mark {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 20px;
  }

  .mark i {
    display: block;
    width: 4px;
    border-radius: 2px;
    background: var(--color-accent);
  }

  .mark i:nth-child(1) {
    height: 9px;
  }

  .mark i:nth-child(2) {
    height: 16px;
  }

  .mark i:nth-child(3) {
    height: 12px;
  }

  .name {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }

  .search {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    height: 38px;
    max-width: 520px;
    padding: 0 var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    transition: border-color var(--transition-fast);
  }

  .search:focus-within {
    border-color: var(--color-accent);
  }

  .search svg {
    flex: none;
    width: 16px;
    height: 16px;
    fill: none;
    stroke: var(--color-muted);
    stroke-width: 2;
    stroke-linecap: round;
  }

  .search input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: none;
    outline: none;
    font-size: 13px;
  }

  .search input::placeholder {
    color: var(--color-muted);
  }

  .search input:disabled {
    cursor: not-allowed;
  }

  .icon-button {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: none;
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast);
  }

  .icon-button:hover {
    border-color: var(--color-border);
    background: var(--color-surface);
  }

  .icon-button svg {
    width: 18px;
    height: 18px;
    fill: none;
    stroke: var(--color-muted);
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .icon-button:hover svg {
    stroke: var(--color-text);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  @media (max-width: 900px) {
    header {
      grid-template-columns: 220px minmax(0, 1fr) auto;
      gap: var(--space-3);
      padding: 0 var(--space-4);
    }
  }
</style>
