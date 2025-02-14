<script lang="ts">
  const stats = [
    { label: 'Total Webhooks', value: '12' },
    { label: 'Active', value: '8' },
    { label: 'Events Today', value: '1.2k' },
    { label: 'Success Rate', value: '99.9%' }
  ];
</script>

<div class="page-container">
  <div class="page-header">
    <h1>Dashboard</h1>
    <p class="subtitle">Overview of your webhook system</p>
  </div>

  <div class="stats-grid">
    {#each stats as stat}
      <div class="stat-card">
        <div class="stat-value">{stat.value}</div>
        <div class="stat-label">{stat.label}</div>
      </div>
    {/each}
  </div>

  <div class="cards-grid">
    <div class="card">
      <h2>Recent Activity</h2>
      <p>Monitor your recent webhook activities</p>
      <a href="/webhooks" class="link-button">View All Webhooks →</a>
    </div>
    
    <div class="card">
      <h2>Quick Actions</h2>
      <div class="quick-actions">
        <button class="action-button">Create Webhook</button>
        <button class="action-button">View Logs</button>
        <button class="action-button">System Status</button>
      </div>
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

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-align: center;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 0.5rem;
  }

  .stat-label {
    color: #666;
    font-size: 0.9rem;
  }

  .cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .card {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.4rem;
    color: #333;
    margin: 0 0 1rem 0;
  }

  .link-button {
    display: inline-block;
    margin-top: 1rem;
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
  }

  .link-button:hover {
    color: var(--color-primary, #ffcc00);
  }

  .quick-actions {
    display: grid;
    gap: 0.75rem;
  }

  .action-button {
    width: 100%;
    padding: 0.75rem;
    background: #f5f5f5;
    border: none;
    border-radius: 4px;
    color: #333;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action-button:hover {
    background: var(--color-primary, #ffcc00);
  }

  @media (max-width: 768px) {
    .page-container {
      padding: 1rem;
    }

    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }

    .cards-grid {
      grid-template-columns: 1fr;
    }

    .card {
      padding: 1rem;
    }

    .stat-card {
      padding: 1rem;
    }

    .stat-value {
      font-size: 1.5rem;
    }
  }
</style>
