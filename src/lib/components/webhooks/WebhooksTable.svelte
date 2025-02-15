<script lang="ts">
  import Table from '../common/Table.svelte';
  import Button from '../common/Button.svelte';
  
  export let webhooks: Array<{
    id: string;
    name: string;
    url: string;
    status: string;
    lastTriggered?: string;
  }> = [];
  export let isLoading = false;
  
  const headers = [
    { key: 'name', label: 'Name' },
    { key: 'url', label: 'URL' },
    { key: 'status', label: 'Status' },
    { key: 'lastTriggered', label: 'Last Triggered' }
  ];

  function formatDate(date: string | undefined): string {
    if (!date) return 'Never';
    return new Date(date).toLocaleString();
  }

  function getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }
</script>

<div class="bg-white shadow rounded-lg p-6">
  <div class="flex justify-between items-center mb-4">
    <h2 class="text-xl font-semibold">Webhooks</h2>
    <Button on:click={() => dispatch('add')}>
      Add Webhook
    </Button>
  </div>

  <Table {headers} data={webhooks} {isLoading}>
    <svelte:fragment slot="cell" let:row let:column>
      {#if column === 'status'}
        <span class="px-2 py-1 rounded-full text-sm {getStatusClass(row.status)}">
          {row.status}
        </span>
      {:else if column === 'lastTriggered'}
        {formatDate(row[column])}
      {:else}
        {row[column]}
      {/if}
    </svelte:fragment>

    <svelte:fragment slot="row-actions" let:row>
      <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button
          variant="secondary"
          on:click={() => dispatch('edit', { webhook: row })}
        >
          Edit
        </Button>
        <Button
          variant="danger"
          on:click={() => dispatch('delete', { webhook: row })}
        >
          Delete
        </Button>
      </td>
    </svelte:fragment>
  </Table>
</div>

<script context="module">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>