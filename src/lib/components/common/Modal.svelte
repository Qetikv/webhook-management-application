<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import Button from './Button.svelte';
  
  export let isOpen = false;
  export let title: string;
  export let onClose: () => void;
</script>

{#if isOpen}
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center"
    transition:fade
    on:click={onClose}
  >
    <div
      class="bg-white rounded-lg p-6 max-w-lg w-full mx-4 relative z-50"
      transition:scale
      on:click|stopPropagation
    >
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">{title}</h2>
        <button
          class="text-gray-500 hover:text-gray-700"
          on:click={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
      
      <div class="mb-6">
        <slot />
      </div>
      
      <div class="flex justify-end gap-3">
        <slot name="actions">
          <Button variant="secondary" on:click={onClose}>Cancel</Button>
        </slot>
      </div>
    </div>
  </div>
{/if}