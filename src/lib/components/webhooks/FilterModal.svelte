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
        <div class="filters-container">
          <div class="filters-grid">
            <label class="filter-label" for="dateFilter">Date created</label>
            <input 
              type="date" 
              id="dateFilter"
              class="form-input"
              bind:value={selectedDate}
            />
            
            <div class="separator"></div>
            
            <label class="filter-label">Authorization type</label>
            <div class="auth-types">
              <button
                type="button"
                class="auth-type-button"
                class:selected={!selectedAuthType}
                on:click={() => selectedAuthType = ''}
              >
                All
              </button>
              {#each authTypes as authType}
                <button
                  type="button"
                  class="auth-type-button"
                  class:selected={selectedAuthType === authType}
                  on:click={() => selectedAuthType = authType}
                >
                  {authType}
                </button>
              {/each}
            </div>
          </div>
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
    max-width: 650px;
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

  .filters-container {
    margin-bottom: 2rem;
  }

  .filters-grid {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    align-items: center;
  }

  .filter-label {
    color: #333;
    font-weight: 500;
  }

  .separator {
    grid-column: 1 / -1;
    height: 1px;
    background-color: #f1f1f1;
    margin: 1.5rem 0;
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

  .auth-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .auth-type-button {
    padding: 0.5rem 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
  }

  .auth-type-button:hover {
    border-color: #000;
    background: #f8f8f8;
  }

  .auth-type-button.selected {
    background: #000;
    color: white;
    border-color: #000;
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