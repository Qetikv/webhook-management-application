<script lang="ts">
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';
import CreateWebhookModal from '../CreateWebhookModal.svelte';

let isFilterOpen = false;
let showCreateModal = false;

onMount(() => {
  if ($page.url.pathname === '/') {
    goto('/configuration');
  }
});

function handleCreateWebhook(event: CustomEvent) {
  console.log('Create webhook:', event.detail);
  showCreateModal = false;
}
</script>

<div class="app-container">
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <div class="nav-items">
        <a href="/" class="nav-item" class:active={$page.url.pathname === '/'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </a>
        <a href="/card" class="nav-item" class:active={$page.url.pathname === '/card'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 10h20"/>
          </svg>
        </a>
        <a href="/settings" class="nav-item" class:active={$page.url.pathname === '/settings'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </a>
        <a href="/code" class="nav-item" class:active={$page.url.pathname === '/code'}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
          </svg>
        </a>
      </div>
      <div class="user-section">
        <button class="nav-item notification">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <div class="user-info nav-item">
          <div class="avatar">JD</div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 6 15 12 9 18"/>
          </svg>
        </div>
      </div>
    </nav>
  </aside>

  <div class="main-content">
    <header class="top-header">
      <div class="header-nav">
        <span class="page-title">Webhooks</span>
        <a 
          href="/configuration" 
          class="nav-link"
          class:active={$page.url.pathname.startsWith('/configuration')}
        >
          Configuration
        </a>
        <a 
          href="/statuses" 
          class="nav-link"
          class:active={$page.url.pathname.startsWith('/statuses')}
        >
          Statuses
        </a>
      </div>

      <button class="create-button" on:click={() => showCreateModal = true}>
        Create Webhook +
      </button>
    </header>

    <main>
      <slot></slot>
    </main>
  </div>
</div>

<CreateWebhookModal 
  show={showCreateModal}
  on:close={() => showCreateModal = false}
  on:submit={handleCreateWebhook}
/>

<style>
  :global(:root) {
    --color-primary: #ffcc00;
    --color-background: #f5f5f5;
    --color-border: #eee;
    --header-height: 64px;
    --sidebar-width: 80px;
  }

  .app-container {
    min-height: 100vh;
    display: flex;
  }

  .sidebar {
    width: var(--sidebar-width);
    background-color: var(--color-background);
    color: #666;
    position: fixed;
    height: 100vh;
    left: 0;
    top: 0;
    border-right: 1px solid var(--color-border);
  }

  .sidebar-nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem 0;
  }

  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.75rem;
    color: #666;
    text-decoration: none;
    gap: 0.5rem;
    transition: color 0.2s;
  }

  .nav-item:hover,
  .nav-item.active {
    color: #333;
  }

  .nav-item span {
    font-size: 0.75rem;
  }

  .user-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .notification {
    cursor: pointer;
    background: none;
    border: none;
    padding: 0.75rem;
  }

  .user-info {
    cursor: pointer;
  }

  .avatar {
    width: 32px;
    height: 32px;
    background: #fff;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  .main-content {
    flex: 1;
    margin-left: var(--sidebar-width);
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .top-header {
    height: var(--header-height);
    background-color: white;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .header-nav {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-link {
    text-decoration: none;
    color: #666;
    font-size: 0.95rem;
    padding: 0.5rem 0;
    position: relative;
    white-space: nowrap;
  }

  .nav-link.active {
    color: #333;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: var(--color-primary);
  }

  .nav-link:hover {
    color: #333;
  }

  .page-title {
    color: #333;
    font-size: 0.95rem;
    font-weight: 600;
  }

  .create-button {
    background-color: var(--color-primary);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: opacity 0.2s;
    white-space: nowrap;
  }

  .create-button:hover {
    opacity: 0.9;
  }

  main {
    flex: 1;
    background-color: var(--color-background);
    min-height: calc(100vh - var(--header-height));
    padding: 0;
  }

  @media (max-width: 768px) {
    .top-header {
      padding: 0 1rem;
    }

    .header-nav {
      gap: 1rem;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 2px;
    }

    .header-nav::-webkit-scrollbar {
      display: none;
    }

    .create-button {
      padding: 0.5rem 0.75rem;
    }
  }
</style>