<script lang="ts">
  import { t } from '#lib/i18n';
  import { tracks } from '#lib/sample/library';
</script>

<section aria-labelledby="page-title">
  <p class="eyebrow">{$t('content.sample')}</p>
  <h1 id="page-title">{$t('content.title')}</h1>
  <p class="subtitle">{$t('content.subtitle')}</p>

  <h2>{$t('content.tracks')}</h2>

  <ul>
    {#each tracks as track, index (track.id)}
      <li>
        <span class="index">{String(index + 1).padStart(2, '0')}</span>
        <span class="meta">
          <span class="title">{track.title}</span>
          <span class="artist">{track.artist}</span>
        </span>
        <span class="kind">{track.kind}</span>
        <span class="duration">{track.duration}</span>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    max-width: 880px;
  }

  .eyebrow {
    margin: 0 0 var(--space-2);
    color: var(--color-accent);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }

  .subtitle {
    margin: var(--space-3) 0 0;
    color: var(--color-muted);
    font-size: 14px;
  }

  h2 {
    margin: var(--space-8) 0 var(--space-3);
    color: var(--color-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 32px minmax(0, 1fr) 96px 48px;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-2);
    border-bottom: 1px solid var(--color-border);
    transition: background-color var(--transition-fast);
  }

  li:hover {
    background: var(--color-surface);
  }

  .index {
    color: var(--color-muted);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .title {
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .artist {
    color: var(--color-muted);
    font-size: 12px;
  }

  .kind {
    justify-self: start;
    padding: 2px 8px;
    border: 1px solid var(--color-border);
    border-radius: 999px;
    color: var(--color-muted);
    font-size: 11px;
  }

  .duration {
    justify-self: end;
    color: var(--color-muted);
    font-size: 12px;
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 720px) {
    li {
      grid-template-columns: 24px minmax(0, 1fr) 44px;
    }

    .kind {
      display: none;
    }
  }
</style>
