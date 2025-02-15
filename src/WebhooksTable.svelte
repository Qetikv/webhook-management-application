<script lang="ts">
  import { onMount } from 'svelte';
  import DeleteWebhookModal from './DeleteWebhookModal.svelte';
  import EditWebhookModal from './EditWebhookModal.svelte';
  import FilterModal from './lib/components/webhooks/FilterModal.svelte';

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
  let dateFilter = '';
  let authTypeFilter = '';
  let activeDropdown: string | null = null;
  let webhookToDelete: Webhook | null = null;
  let webhookToEdit: Webhook | null = null;
  let showDeleteModal = false;
  let showEditModal = false;
  let showSuccessToast = false;
  let successMessage = '';

  let toastTimeout: NodeJS.Timeout;

  onMount(() => {
    return () => {
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  });

  function showToast(message: string) {
    successMessage = message;
    showSuccessToast = true;
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      showSuccessToast = false;
    }, 3000);
  }

  function isSameDay(date1: string, date2: string): boolean {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  $: filteredWebhooks = webhooks.filter(webhook => {
    const matchesSearch = webhook.nickname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         webhook.url.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDate = !dateFilter || isSameDay(webhook.createdDate, dateFilter);
    const matchesAuthType = !authTypeFilter || webhook.authorizationType === authTypeFilter;
    
    return matchesSearch && matchesDate && matchesAuthType;
  });

  function handleFilter(event: CustomEvent) {
    const { date, authType } = event.detail;
    dateFilter = date;
    authTypeFilter = authType;
  }

  function handleClearAll() {
    dateFilter = '';
    authTypeFilter = '';
  }

  $: paginatedWebhooks = filteredWebhooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function editWebhook(webhook: Webhook) {
    webhookToEdit = webhook;
    showEditModal = true;
    activeDropdown = null;
  }

  async function handleEditSubmit(event: CustomEvent) {
    try {
      loading = true;
      console.log('Update webhook:', event.detail);
      
      const updatedWebhook = event.detail;
      webhooks = webhooks.map(w => w.id === updatedWebhook.id ? { ...w, ...updatedWebhook } : w);
      showToast(`"${updatedWebhook.nickname}" updated successfully`);
      showEditModal = false;
      webhookToEdit = null;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to update webhook';
    } finally {
      loading = false;
    }
  }

  function handleDeleteClick(webhook: Webhook) {
    webhookToDelete = webhook;
    showDeleteModal = true;
    activeDropdown = null;
  }

  async function handleConfirmDelete() {
    if (!webhookToDelete) return;
    
    try {
      loading = true;
      console.log('Delete webhook:', webhookToDelete);
      
      webhooks = webhooks.filter(w => w.id !== webhookToDelete.id);
      showToast(`"${webhookToDelete.nickname}" deleted successfully`);
      showDeleteModal = false;
      webhookToDelete = null;
    } catch (err) {
      error = err instanceof Error ? err.message : 'Failed to delete webhook';
    } finally {
      loading = false;
    }
  }

  function toggleDropdown(webhookId: string) {
    activeDropdown = activeDropdown === webhookId ? null : webhookId;
  }

  function handleClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown') && !target.closest('.action-menu')) {
      activeDropdown = null;
    }
  }

  function formatDate(date: string): string {
    try {
      const d = new Date(date);
      const month = d.toLocaleString('en-US', { month: 'short' });
      const day = d.getDate();
      const year = d.getFullYear();
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${month} ${day},${year}- ${hours}:${minutes}`;
    } catch {
      return 'Invalid date';
    }
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"%3E%3C/path%3E%3C/svg%3E';
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<div class="container">
  <div class="table-controls">
    <div class="controls-top">
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
      <span>Filters {(dateFilter || authTypeFilter) ? `(${[dateFilter, authTypeFilter].filter(Boolean).length})` : ''}</span>
    </button>
  </div>
  {#if dateFilter || authTypeFilter}
    <div class="filter-tags">
      {#if dateFilter}
        <div class="filter-tag">
          Date: {new Date(dateFilter).toLocaleDateString()}
          <button class="tag-remove" on:click={() => dateFilter = ''}>×</button>
        </div>
      {/if}
      {#if authTypeFilter}
        <div class="filter-tag">
          Type: {authTypeFilter}
          <button class="tag-remove" on:click={() => authTypeFilter = ''}>×</button>
        </div>
      {/if}
      <div class="filter-tag clear-all">
        Clear all
        <button class="tag-remove" on:click={handleClearAll}>×</button>
      </div>
    </div>
  {/if}
</div>

  <FilterModal
    isOpen={isFilterOpen}
    onClose={() => isFilterOpen = false}
    on:filter={handleFilter}
  />

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
              on:click={() => toggleDropdown(webhook.id)}
              aria-label={`Actions for webhook ${webhook.nickname}`}
              aria-expanded={activeDropdown === webhook.id}
              aria-haspopup="true"
            >
              ⋮
            </button>
            {#if activeDropdown === webhook.id}
              <div class="dropdown" role="menu">
                <button
                  class="dropdown-item"
                  on:click={() => editWebhook(webhook)}
                  role="menuitem"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"></path>
                    <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"></polygon>
                  </svg>
                  Edit
                </button>
                <button
                  class="dropdown-item delete"
                  on:click={() => handleDeleteClick(webhook)}
                  role="menuitem"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete
                </button>
              </div>
            {/if}
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

  {#if showDeleteModal}
    <DeleteWebhookModal
      webhook={webhookToDelete}
      onClose={() => {
        showDeleteModal = false;
        webhookToDelete = null;
      }}
      onConfirm={handleConfirmDelete}
    />
  {/if}

  {#if showEditModal && webhookToEdit}
    <EditWebhookModal
      show={showEditModal}
      webhook={webhookToEdit}
      on:close={() => {
        showEditModal = false;
        webhookToEdit = null;
      }}
      on:submit={handleEditSubmit}
    />
  {/if}

  {#if showSuccessToast}
    <div class="success-toast" role="alert">
      <span class="success-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </span>
      {successMessage}
    </div>
  {/if}
</div>

<style>
  .container {
    padding: 1rem 2rem;
    background-color: white;
    min-height: 100%;
  }

  .table-controls {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .controls-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .filter-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .filter-tag {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background-color: #f5f5f5;
    border-radius: 20px;
    font-size: 0.9rem;
    color: #666;
  }

  .tag-remove {
    background: none;
    border: none;
    padding: 0;
    margin-left: 0.25rem;
    font-size: 1.2rem;
    line-height: 1;
    color: #999;
    cursor: pointer;
  }

  .tag-remove:hover {
    color: #666;
  }

  .filter-tag.clear-all {
    background-color: #eee;
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

  .filter-line:nth-child(1) { width: 16px; }
  .filter-line:nth-child(2) { width: 12px; }
  .filter-line:nth-child(3) { width: 8px; }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    color: #666;
    border-bottom: 1px solid #f1f1f1;
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

  .dropdown {
    position: absolute;
    right: 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }

  .dropdown-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    color: #666;
    cursor: pointer;
    transition: background-color 0.2s;
    white-space: nowrap;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-size: 14px;
  }

  .dropdown-item:hover {
    background-color: #f5f5f5;
    color: #333;
  }

  .dropdown-item.delete {
    color: #dc3545;
  }

  .dropdown-item.delete:hover {
    background-color: #fff5f5;
  }

  td {
    position: relative;
  }

  .success-toast {
    position: fixed;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    z-index: 2000;
    animation: fadeIn 0.3s ease-out;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -20px);
    }
    to {
      opacity: 1;
      transform: translateX(-50%);
    }
  }

  .success-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #4caf50;
  }

  .success-icon svg {
    width: 20px;
    height: 20px;
    stroke-width: 3;
  }
</style>