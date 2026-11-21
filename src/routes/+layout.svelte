<script lang="ts">
  import { onMount } from 'svelte';
  import '../app.css';
  import TopBar from '#lib/components/TopBar.svelte';
  import Sidebar from '#lib/components/Sidebar.svelte';
  import PlayerBar from '#lib/components/PlayerBar.svelte';
  import SettingsPanel from '#lib/components/SettingsPanel.svelte';
  import { initTheme } from '#lib/theme/store';

  let { children } = $props();

  let settingsOpen = $state(false);

  onMount(initTheme);
</script>

<div class="app">
  <TopBar onOpenSettings={() => (settingsOpen = true)} />

  <div class="workspace">
    <Sidebar />
    <main>
      {@render children()}
    </main>
  </div>

  <PlayerBar />

  {#if settingsOpen}
    <SettingsPanel onClose={() => (settingsOpen = false)} />
  {/if}
</div>

<style>
  .app {
    display: grid;
    grid-template-rows: 64px minmax(0, 1fr) 88px;
    height: 100vh;
    height: 100dvh;
  }

  .workspace {
    display: grid;
    grid-template-columns: 280px minmax(0, 1fr);
    min-height: 0;
  }

  main {
    min-width: 0;
    overflow-y: auto;
    padding: var(--space-6) var(--space-8) var(--space-8);
    background: var(--color-background);
  }

  @media (max-width: 900px) {
    .workspace {
      grid-template-columns: 220px minmax(0, 1fr);
    }

    main {
      padding: var(--space-5);
    }
  }
</style>
