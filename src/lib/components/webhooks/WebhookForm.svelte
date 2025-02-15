<script lang="ts">
  import Button from '../common/Button.svelte';
  
  export let name = '';
  export let url = '';
  export let status: 'active' | 'inactive' = 'active';
  export let isSubmitting = false;

  let formElement: HTMLFormElement;

  function handleSubmit() {
    if (formElement.checkValidity()) {
      const formData = {
        name,
        url,
        status
      };
      dispatch('submit', formData);
    } else {
      formElement.reportValidity();
    }
  }
</script>

<form
  bind:this={formElement}
  on:submit|preventDefault={handleSubmit}
  class="space-y-4"
>
  <div>
    <label
      for="webhook-name"
      class="block text-sm font-medium text-gray-700"
    >
      Name
    </label>
    <input
      id="webhook-name"
      type="text"
      bind:value={name}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="Enter webhook name"
    />
  </div>

  <div>
    <label
      for="webhook-url"
      class="block text-sm font-medium text-gray-700"
    >
      URL
    </label>
    <input
      id="webhook-url"
      type="url"
      bind:value={url}
      required
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      placeholder="https://example.com/webhook"
    />
  </div>

  <div>
    <label
      for="webhook-status"
      class="block text-sm font-medium text-gray-700"
    >
      Status
    </label>
    <select
      id="webhook-status"
      bind:value={status}
      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  <div class="flex justify-end gap-3">
    <slot name="actions">
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : 'Save'}
      </Button>
    </slot>
  </div>
</form>

<script context="module">
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>