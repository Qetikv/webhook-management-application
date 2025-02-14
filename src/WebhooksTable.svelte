<script lang="ts">
  import { onMount } from 'svelte';

  interface User {
    avatar: string;
    name: string;
  }

  interface Webhook {
    id: string;
    nickname: string;
    url: string;
    createdDate: string;
    lastModifiedDate: string;
    lastModifiedUser: User;
    authorizationType: string;
  }

  export let webhooks: Webhook[] = [];

  let searchQuery = '';
  let loading = false;
  let error: string | null = null;
  let itemsPerPage = 10;
  let currentPage = 1;
  let isFilterOpen = false;

  $: filteredWebhooks = webhooks.filter(webhook => 
    webhook.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    webhook.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  $: paginatedWebhooks = filteredWebhooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function editWebhook(webhook: Webhook) {
    try {
      loading = true;
      console.log('Edit webhook:', webhook);
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to edit webhook';
    } finally {
      loading = false;
    }
  }

  function formatDate(date: string): string {
    try {
      return new Date(date).toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return 'Invalid date';
    }
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"%3E%3C/path%3E%3C/svg%3E';
  }
</script>

<style>
  .container {
    padding: 1rem 2rem;
    background-color: white;
    min-height: 100%;
  }

  .table-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .search-wrapper {
    position: relative;
    width: 240px;
  }

  .search-input {
    width: 100%;
    padding: 0.5rem 1rem;
    padding-left: 2.5rem;
    border: 1px solid #ddd;
    border-radius: 20px;
    outline: none;
    font-size: 0.9rem;
  }

  .search-icon {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
  }

  .search-input:focus {
    border-color: var(--color-primary);
  }

  .filter-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .filter-button:hover,
  .filter-button.active {
    background: #f5f5f5;
    color: #333;
    border-color: #ccc;
  }

  .filter-icon {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
  }

  .filter-line {
    height: 2px;
    background-color: currentColor;
  }

  .filter-line:nth-child(1) {
    width: 16px;
  }

  .filter-line:nth-child(2) {
    width: 12px;
  }

  .filter-line:nth-child(3) {
    width: 8px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    color: #666;
  }

  th {
    font-weight: 500;
    color: #333;
  }

  tr:hover {
    background-color: rgba(249, 249, 249, 0.5);
  }

  .avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 0.5rem;
    object-fit: cover;
  }

  .action-menu {
    cursor: pointer;
    padding: 0.5rem;
    width: 32px;
    height: 32px;
    color: #666;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .action-menu:hover {
    background-color: #f5f5f5;
    color: #333;
    border-color: #ccc;
  }

  .user-info {
    display: flex;
    align-items: center;
  }

  .empty-state {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style>

<div class="container">
  <div class="table-controls">
    <div class="search-wrapper">
      <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
      <input
        type="text"
        placeholder="Search webhooks..."
        class="search-input"
        bind:value={searchQuery}
        aria-label="Search webhooks"
      />
    </div>
    <button 
      class="filter-button"
      on:click={() => isFilterOpen = !isFilterOpen}
      class:active={isFilterOpen}
      aria-label="Toggle filters"
    >
      <div class="filter-icon">
        <div class="filter-line"></div>
        <div class="filter-line"></div>
        <div class="filter-line"></div>
      </div>
      <span>Filters</span>
    </button>
  </div>

  <table role="grid">
    <thead>
      <tr>
        <th scope="col">Nickname</th>
        <th scope="col">Webhook URL</th>
        <th scope="col">Created</th>
        <th scope="col">Last Modified</th>
        <th scope="col">Authorization Type</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {#each paginatedWebhooks as webhook (webhook.id)}
        <tr>
          <td>{webhook.nickname}</td>
          <td>{webhook.url}</td>
          <td>{formatDate(webhook.createdDate)}</td>
          <td>
            <div class="user-info">
              <img
                src={webhook.lastModifiedUser.avatar}
                alt={`${webhook.lastModifiedUser.name}'s avatar`}
                class="avatar"
                on:error={handleImageError}
              />
              {formatDate(webhook.lastModifiedDate)}
            </div>
          </td>
          <td>{webhook.authorizationType}</td>
          <td style="text-align: right;">
            <button
              type="button"
              class="action-menu"
              on:click={() => editWebhook(webhook)}
              aria-label={`Edit webhook ${webhook.nickname}`}
            >
              ⋮
            </button>
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="6" class="empty-state">
            {searchQuery ? 'No webhooks found matching your search' : 'No webhooks available'}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>