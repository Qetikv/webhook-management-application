<script lang="ts">
  import Modal from '../common/Modal.svelte';
  import WebhookForm from './WebhookForm.svelte';

  export let isOpen = false;
  export let isSubmitting = false;
  export let webhook: {
    id: string;
    name: string;
    url: string;
    status: 'active' | 'inactive';
  };

  function handleSubmit(event: CustomEvent) {
    dispatch('submit', {
      id: webhook.id,
      ...event.detail
    });
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<Modal
  {isOpen}
  title="Edit Webhook"
  onClose={handleClose}
>
  <WebhookForm
    name={webhook.name}
    url={webhook.url}
    status={webhook.status}
    {isSubmitting}
    on:submit={handleSubmit}
  />
</Modal>

<script context="module">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>