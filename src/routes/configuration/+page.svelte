<script lang="ts">
  import WebhooksTable from '../../WebhooksTable.svelte';

  const webhooks = [
    {
      id: "1",
      nickname: "Payment Webhook",
      url: "https://api.example.com/webhooks/payment",
      createdDate: "2024-02-14T10:00:00Z",
      lastModifiedDate: "2024-02-14T15:00:00Z",
      lastModifiedUser: {
        avatar: "https://i.pravatar.cc/150?u=1",
        name: "John Doe"
      },
      authorizationType: "Bearer Token"
    },
    {
      id: "2",
      nickname: "Order Webhook",
      url: "https://api.example.com/webhooks/order",
      createdDate: "2024-02-13T09:00:00Z",
      lastModifiedDate: "2024-02-14T14:30:00Z",
      lastModifiedUser: {
        avatar: "https://i.pravatar.cc/150?u=2",
        name: "Jane Smith"
      },
      authorizationType: "Basic Auth"
    }
  ];
</script>

<div class="page-container">
  <WebhooksTable {webhooks} />
</div>

<style>
  .page-container {
    height: 100%;
  }
</style>