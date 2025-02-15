<script lang="ts">
  const statusData = [
    {
      id: 1,
      createDate: '2025-02-14T10:30:00Z',
      httpCode: 200,
      failures: 0,
      status: 'Delivered',
      message: 'Successfully delivered',
      lastTry: '2025-02-14T10:30:00Z',
      nextTry: '-'
    },
    {
      id: 2,
      createDate: '2025-02-14T10:35:00Z',
      httpCode: 500,
      failures: 3,
      status: 'Failed',
      message: 'Internal Server Error',
      lastTry: '2025-02-14T10:40:00Z',
      nextTry: '2025-02-14T11:40:00Z'
    }
  ];

  function formatDate(date: string): string {
    if (!date || date === '-') return date;
    const d = new Date(date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    const year = d.getFullYear();
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${month} ${day},${year}- ${hours}:${minutes}`;
  }

  function handleResend(id: number) {
    console.log('Resending webhook:', id);
  }
</script>

<div class="page-container">
  <div class="container">
    <table role="grid">
      <thead>
        <tr>
          <th>Create Date</th>
          <th>HTTP Code</th>
          <th>Failures</th>
          <th>Status</th>
          <th>Message</th>
          <th>Last Try</th>
          <th>Next Try</th>
        </tr>
      </thead>
      <tbody>
        {#each statusData as status (status.id)}
          <tr>
            <td>{formatDate(status.createDate)}</td>
            <td>{status.httpCode}</td>
            <td>{status.failures}</td>
            <td>
              <span class="status-badge {status.status.toLowerCase()}">
                {status.status}
              </span>
            </td>
            <td>{status.message}</td>
            <td>{formatDate(status.lastTry)}</td>
            <td>{formatDate(status.nextTry)}</td>
            <td class="text-right">
              <button
                type="button"
                class="resend-button"
                on:click={() => handleResend(status.id)}
              >
                <svg class="resend-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.91 5c-1.78-1.77-4.2-2.86-6.91-2.86-5.52 0-10 4.48-10 10s4.48 10 10 10c4.84 0 8.87-3.44 9.8-8" />
                  <path d="M17 16l4-4-4-4" />
                </svg>
                Resend
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .page-container {
    height: 100%;
  }

  .container {
    padding: 1rem 2rem;
    background-color: white;
    min-height: 100%;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  th, td {
    padding: 1rem;
    text-align: left;
    color: #666;
    border-bottom: 1px solid #f1f1f1;
  }

  th {
    font-weight: 500;
    color: #333;
  }

  tr:hover {
    background-color: rgba(249, 249, 249, 0.5);
  }

  .text-right {
    text-align: right;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-badge.delivered {
    background-color: #ecfdf5;
    color: #047857;
  }

  .status-badge.failed {
    background-color: #fef2f2;
    color: #dc2626;
  }

  .resend-button {
    display: inline-flex;
    align-items: center;
    padding: 0.375rem 0.75rem;
    border: 1px solid #ddd;
    border-radius: 0.375rem;
    background: white;
    color: #666;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s;
    gap: 0.5rem;
  }

  .resend-button:hover {
    background-color: #f5f5f5;
    color: #333;
    border-color: #ccc;
  }

  .resend-icon {
    height: 1rem;
    width: 1rem;
  }
</style>