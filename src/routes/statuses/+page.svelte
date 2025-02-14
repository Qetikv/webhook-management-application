<script lang="ts">
  const statusList = [
    { name: 'All Systems Operational', status: 'operational' },
    { name: 'API Gateway', status: 'operational' },
    { name: 'Webhook Delivery', status: 'operational' },
    { name: 'Database', status: 'operational' }
  ];
</script>

<div class="page-container">
  <div class="page-header">
    <h1>System Status</h1>
    <p class="subtitle">Monitor your webhook system status</p>
  </div>
  
  <div class="card">
    <div class="status-grid">
      {#each statusList as item}
        <div class="status-item">
          <div class="status-info">
            <span class="status-dot {item.status}"></span>
            <span class="status-name">{item.name}</span>
          </div>
          <span class="status-label">{item.status}</span>
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .page-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.8rem;
    color: #333;
    margin: 0;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    color: #666;
    margin: 0;
  }

  .card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
  }

  .status-grid {
    display: grid;
    gap: 1rem;
  }

  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  .status-info {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .status-dot.operational {
    background-color: #22c55e;
  }

  .status-name {
    font-weight: 500;
    color: #333;
  }

  .status-label {
    font-size: 0.9rem;
    color: #666;
    text-transform: capitalize;
  }

  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }

    .card {
      padding: 1rem;
      border-radius: 6px;
    }

    .status-item {
      padding: 0.75rem;
    }
  }
</style>