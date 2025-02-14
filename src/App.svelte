<script>
  import WebhooksTable from './WebhooksTable.svelte';

  let webhooks = [
    {
      nickname: 'Webhook 1',
      url: 'https://example.com/webhook1',
      createdDate: '2023-01-01T12:00:00Z',
      lastModifiedDate: '2023-01-02T12:00:00Z',
      lastModifiedUser: { avatar: 'https://example.com/avatar1.png' },
      authorizationType: 'Bearer Token'
    },
    {
      nickname: 'Webhook 2',
      url: 'https://example.com/webhook2',
      createdDate: '2023-01-03T12:00:00Z',
      lastModifiedDate: '2023-01-04T12:00:00Z',
      lastModifiedUser: { avatar: 'https://example.com/avatar2.png' },
      authorizationType: 'API Key'
    }
  ];
</script>

<main>
  <h1>Webhooks List</h1>
  <WebhooksTable {webhooks} />
</main> 

<script>
  import WebhooksTable from './WebhooksTable.svelte';

  const sampleWebhooks = [
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

<WebhooksTable webhooks={sampleWebhooks} />