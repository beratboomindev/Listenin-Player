<script lang="ts">
  import { t } from '#lib/i18n';
</script>

<footer aria-label={$t('player.nothing')}>
  <div class="state">
    <span class="cover" aria-hidden="true"></span>
    <div class="text">
      <p class="title">{$t('player.nothing')}</p>
      <p class="hint">{$t('player.hint')}</p>
    </div>
  </div>

  <div class="controls">
    <button type="button" disabled aria-label={$t('player.previous')}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 20 9 12l10-8v16Z" />
        <path d="M5 19V5" />
      </svg>
    </button>
    <button type="button" class="play" disabled aria-label={$t('player.play')}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M8 5.5v13l11-6.5-11-6.5Z" />
      </svg>
    </button>
    <button type="button" disabled aria-label={$t('player.next')}>
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 4l10 8-10 8V4Z" />
        <path d="M19 5v14" />
      </svg>
    </button>
  </div>

  <div class="volume">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 5 6 9H3v6h3l5 4V5Z" />
      <path d="M16 9a4 4 0 0 1 0 6" />
    </svg>
    <span class="rail"><span></span></span>
  </div>
</footer>

<style>
  footer {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
    align-items: center;
    gap: var(--space-6);
    padding: 0 var(--space-6);
    border-top: 1px solid var(--color-border);
    background: var(--color-surface);
  }

  .state {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-width: 0;
  }

  .cover {
    flex: none;
    width: 52px;
    height: 52px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-elevated);
  }

  .text {
    min-width: 0;
  }

  .title {
    margin: 0;
    font-size: 13px;
    font-weight: 500;
  }

  .hint {
    margin: 2px 0 0;
    color: var(--color-muted);
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .controls {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .controls button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border: 0;
    border-radius: 50%;
    background: none;
    transition: background-color var(--transition-fast);
  }

  .controls button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .controls button:hover:not(:disabled) {
    background: var(--color-elevated);
  }

  .controls svg {
    width: 16px;
    height: 16px;
    fill: var(--color-text);
    stroke: var(--color-text);
    stroke-width: 1.5;
    stroke-linecap: round;
  }

  .controls .play {
    width: 44px;
    height: 44px;
    background: var(--color-accent);
  }

  .controls .play svg {
    width: 18px;
    height: 18px;
    fill: var(--color-on-accent);
    stroke: var(--color-on-accent);
  }

  .volume {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--space-3);
    color: var(--color-muted);
  }

  .volume svg {
    width: 16px;
    height: 16px;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.8;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .rail {
    width: 96px;
    height: 3px;
    border-radius: 2px;
    background: var(--color-border);
  }

  .rail span {
    display: block;
    width: 35%;
    height: 100%;
    border-radius: inherit;
    background: var(--color-muted);
  }

  @media (max-width: 900px) {
    footer {
      padding: 0 var(--space-4);
      gap: var(--space-4);
    }

    .rail {
      display: none;
    }
  }
</style>
