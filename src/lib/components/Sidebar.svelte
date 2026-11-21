<script lang="ts">
  import { t } from '#lib/i18n';
  import { artists } from '#lib/sample/library';

  let activeId = $state(artists[0]?.id ?? '');
</script>

<aside>
  <nav aria-label={$t('nav.artists')}>
    <h2>{$t('nav.artists')}</h2>
    <ul>
      {#each artists as artist (artist.id)}
        <li>
          <button
            type="button"
            class:active={artist.id === activeId}
            aria-current={artist.id === activeId ? 'true' : undefined}
            onclick={() => (activeId = artist.id)}
          >
            {artist.name}
          </button>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="footer">
    <p>{$t('nav.library_hint')}</p>
  </div>
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 0;
    padding: var(--space-5) var(--space-3) var(--space-4);
    border-right: 1px solid var(--color-border);
    background: var(--color-surface);
    overflow: hidden;
  }

  nav {
    min-height: 0;
    overflow-y: auto;
  }

  h2 {
    margin: 0 0 var(--space-3);
    padding: 0 var(--space-3);
    color: var(--color-muted);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  li button {
    width: 100%;
    padding: 9px var(--space-3);
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    color: var(--color-muted);
    font-size: 13px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition:
      background-color var(--transition-fast),
      color var(--transition-fast);
  }

  li button:hover {
    background: var(--color-elevated);
    color: var(--color-text);
  }

  li button.active {
    background: var(--color-elevated);
    color: var(--color-text);
    box-shadow: inset 2px 0 0 var(--color-accent);
  }

  .footer {
    margin-top: var(--space-4);
    padding: var(--space-3);
    border-top: 1px solid var(--color-border);
  }

  .footer p {
    margin: 0;
    color: var(--color-muted);
    font-size: 12px;
    line-height: 1.45;
  }
</style>
