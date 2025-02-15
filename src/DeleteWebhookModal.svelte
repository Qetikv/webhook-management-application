<script lang="ts">
  import type { Webhook } from './WebhooksTable.svelte';
  
  export let webhook: Webhook | null = null;
  export let onClose: () => void;
  export let onConfirm: () => void;
</script>

<div class="modal-backdrop">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h2><strong>Deleting "{webhook?.nickname}"</strong></h2>
      <button class="close-button" on:click={onClose} aria-label="Close modal">×</button>
    </div>
    <div class="modal-content">
      <p>Are you sure you want to delete selected webhook? This action can't be undone.</p>
    </div>
    <div class="modal-footer">
      <button class="button secondary" on:click={onClose}>Cancel</button>
      <button class="button delete" on:click={onConfirm}>Delete</button>
    </div>
  </div>
</div>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 16px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
  }

  .modal-header {
    padding: 1.25rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .modal-header h2 {
    margin: 0;
    font-size: 1.1rem;
    color: #333;
  }

  .close-button {
    width: 32px;
    height: 32px;
    border: 1.5px solid #ddd;
    border-radius: 50%;
    background: white;
    color: #666;
    font-size: 1.2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    line-height: 0;
    padding: 0;
  }

  .close-button:hover {
    color: #333;
    border-color: #999;
    background: #f5f5f5;
  }

  .modal-content {
    padding: 1.5rem 1rem;
  }

  .modal-content p {
    margin: 0;
    color: #666;
  }

  .modal-footer {
    padding: 1rem;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }

  .button {
    padding: 0.5rem 1rem;
    border-radius: 4px;
    border: 1px solid #ddd;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .button.secondary {
    background: white;
    color: #666;
  }

  .button.secondary:hover {
    background: #f5f5f5;
    border-color: #ccc;
  }

  .button.delete {
    background: #dc3545;
    color: white;
    border-color: #dc3545;
  }

  .button.delete:hover {
    background: #c82333;
    border-color: #bd2130;
  }
</style>