<script lang="ts">
  import Modal from '../common/Modal.svelte';
  import WebhookForm from './WebhookForm.svelte';

  export let isOpen = false;
  export let isSubmitting = false;

  function handleSubmit(event: CustomEvent) {
    dispatch('submit', event.detail);
  }

  function handleClose() {
    dispatch('close');
  }
</script>

<Modal
  {isOpen}
  title="Create Webhook"
  onClose={handleClose}
>
  <WebhookForm
    {isSubmitting}
    on:submit={handleSubmit}
  />
</Modal>

<script context="module">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>