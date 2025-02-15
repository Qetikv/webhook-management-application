<script lang="ts">
  import Modal from '../common/Modal.svelte';
  import Button from '../common/Button.svelte';

  export let isOpen = false;
  export let isSubmitting = false;
  export let webhook: {
    id: string;
    name: string;
  };

  function handleConfirm() {
    dispatch('confirm', { id: webhook.id });
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<Modal
  {isOpen}
  title="Delete Webhook"
  onClose={handleClose}
>
  <p class="text-gray-600">
    Are you sure you want to delete the webhook "{webhook.name}"? This action cannot be undone.
  </p>

  <svelte:fragment slot="actions">
    <Button
      variant="secondary"
      on:click={handleClose}
      disabled={isSubmitting}
    >
      Cancel
    </Button>
    <Button
      variant="danger"
      on:click={handleConfirm}
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Deleting...' : 'Delete'}
    </Button>
  </svelte:fragment>
</Modal>

<script context="module">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>