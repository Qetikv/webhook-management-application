<script lang="ts">
  export let headers: { key: string; label: string }[] = [];
  export let data: Record<string, any>[] = [];
  export let isLoading = false;
  export let emptyMessage = 'No data available';
</script>

<div class="w-full overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        {#each headers as header}
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header.label}
          </th>
        {/each}
        <slot name="header-actions" />
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      {#if isLoading}
        <tr>
          <td
            colspan={headers.length + ($$slots['row-actions'] ? 1 : 0)}
            class="px-6 py-4 text-center text-sm text-gray-500"
          >
            Loading...
          </td>
        </tr>
      {:else if data.length === 0}
        <tr>
          <td
            colspan={headers.length + ($$slots['row-actions'] ? 1 : 0)}
            class="px-6 py-4 text-center text-sm text-gray-500"
          >
            {emptyMessage}
          </td>
        </tr>
      {:else}
        {#each data as row}
          <tr class="hover:bg-gray-50">
            {#each headers as header}
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <slot name="cell" {row} column={header.key}>
                  {row[header.key]}
                </slot>
              </td>
            {/each}
            <slot name="row-actions" {row} />
          </tr>
        {/each}
      {/if}
    </tbody>
  </table>
</div>