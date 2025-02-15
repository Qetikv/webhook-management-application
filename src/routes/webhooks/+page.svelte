<script lang="ts">
  import WebhooksTable from '$lib/components/webhooks/WebhooksTable.svelte';
  import CreateWebhookModal from '$lib/components/webhooks/CreateWebhookModal.svelte';
  import EditWebhookModal from '$lib/components/webhooks/EditWebhookModal.svelte';
  import DeleteWebhookModal from '$lib/components/webhooks/DeleteWebhookModal.svelte';

  let webhooks = [];
  let isLoading = false;
  let isSubmitting = false;

  let showCreateModal = false;
  let showEditModal = false;
  let showDeleteModal = false;
  let selectedWebhook = null;

  async function loadWebhooks() {
    isLoading = true;
    try {
      const response = await fetch('/api/webhooks');
      webhooks = await response.json();
    } catch (error) {
      console.error('Failed to load webhooks:', error);
    } finally {
      isLoading = false;
    }
  }

  async function handleCreate(event: CustomEvent) {
    isSubmitting = true;
    try {
      await fetch('/api/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.detail)
      });
      await loadWebhooks();
      showCreateModal = false;
    } catch (error) {
      console.error('Failed to create webhook:', error);
    } finally {
      isSubmitting = false;
    }
  }

  async function handleEdit(event: CustomEvent) {
    isSubmitting = true;
    try {
      await fetch(`/api/webhooks/${event.detail.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event.detail)
      });
      await loadWebhooks();
      showEditModal = false;
    } catch (error) {
      console.error('Failed to update webhook:', error);
    } finally {
      isSubmitting = false;
    }
  }

  async function handleDelete(event: CustomEvent) {
    isSubmitting = true;
    try {
      await fetch(`/api/webhooks/${event.detail.id}`, {
        method: 'DELETE'
      });
      await loadWebhooks();
      showDeleteModal = false;
    } catch (error) {
      console.error('Failed to delete webhook:', error);
    } finally {
      isSubmitting = false;
    }
  }

  function handleAddClick() {
    showCreateModal = true;
  }

  function handleEditClick(event: CustomEvent) {
    selectedWebhook = event.detail.webhook;
    showEditModal = true;
  }

  function handleDeleteClick(event: CustomEvent) {
    selectedWebhook = event.detail.webhook;
    showDeleteModal = true;
  }

  import { onMount } from 'svelte';
  onMount(loadWebhooks);
</script>

<WebhooksTable
  {webhooks}
  {isLoading}
  on:add={handleAddClick}
  on:edit={handleEditClick}
  on:delete={handleDeleteClick}
/>

<CreateWebhookModal
  isOpen={showCreateModal}
  {isSubmitting}
  on:submit={handleCreate}
  on:close={() => showCreateModal = false}
/>

{#if selectedWebhook}
  <EditWebhookModal
    isOpen={showEditModal}
    {isSubmitting}
    webhook={selectedWebhook}
    on:submit={handleEdit}
    on:close={() => showEditModal = false}
  />

  <DeleteWebhookModal
    isOpen={showDeleteModal}
    {isSubmitting}
    webhook={selectedWebhook}
    on:confirm={handleDelete}
    on:close={() => showDeleteModal = false}
  />
{/if}