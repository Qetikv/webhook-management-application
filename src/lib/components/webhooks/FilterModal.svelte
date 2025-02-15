<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  export let isOpen = false;
  export let onClose: () => void;
  
  let selectedDate: string = '';
  let selectedAuthType: string = '';
  const authTypes = ['Bearer Token', 'Basic Auth'];
  
  $: selectedFiltersCount = [selectedDate, selectedAuthType].filter(Boolean).length;
  
  function handleClearAll() {
    selectedDate = '';
    selectedAuthType = '';
  }
  
  function handleApplyFilters() {
    const filters = {
      date: selectedDate,
      authType: selectedAuthType,
    };
    dispatch('filter', filters);
    onClose();
  }
  
  const dispatch = createEventDispatcher();
</script>

{#if isOpen}
  <div class="modal-backdrop" on:click={onClose}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h2 class="modal-title">Filters</h2>
        <button class="close-button" on:click={onClose}>&times;</button>
      </div>

      <div class="modal-content">
        <div class="filter-group">
          <label class="form-label" for="dateFilter">Date created</label>
          <input 
            type="date" 
            id="dateFilter"
            class="form-input"
            bind:value={selectedDate}
          />
        </div>
        
        <div class="separator"></div>
        
        <div class="filter-group">
          <label class="form-label" for="authTypeFilter">Authorization type</label>
          <select 
            id="authTypeFilter"
            class="form-input"
            bind:value={selectedAuthType}
          >
            <option value="">All</option>
            {#each authTypes as authType}
              <option value={authType}>{authType}</option>
            {/each}
          </select>
        </div>

        <div class="actions">
          <button class="secondary-button" on:click={handleClearAll}>
            Clear all
          </button>
          <button class="primary-button" on:click={handleApplyFilters}>
            Filter selected {selectedFiltersCount ? `(${selectedFiltersCount})` : ''}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 8px;
    width: 95%;
    max-width: 500px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 2rem 2rem 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f1f1;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .close-button {
    background: none;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    font-size: 1.25rem;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
  }

  .close-button:hover {
    color: #333;
    border-color: #333;
  }

  .modal-content {
    padding: 1.5rem 2rem;
    overflow-y: auto;
  }

  .filter-group {
    margin-bottom: 1.5rem;
  }

  .separator {
    height: 1px;
    background-color: #f1f1f1;
    margin: 1.5rem 0;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    background-color: white;
  }

  .form-input:focus {
    outline: none;
    border-color: #000;
  }

  select.form-input {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 9L1 4h10z' fill='%23666666'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    padding-right: 2rem;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;
  }

  .secondary-button,
  .primary-button {
    padding: 0.625rem 1rem;
    border-radius: 4px;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .secondary-button {
    background: white;
    border: 1px solid #ddd;
    color: #666;
  }

  .secondary-button:hover {
    border-color: #000;
    color: #000;
  }

  .primary-button {
    background: #000;
    border: 1px solid #000;
    color: white;
  }

  .primary-button:hover {
    opacity: 0.9;
  }
</style>