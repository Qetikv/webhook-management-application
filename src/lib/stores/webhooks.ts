import { writable } from 'svelte/store';

export interface Webhook {
  id: string;
  name: string;
  url: string;
  status: string;
  lastTriggered?: string;
  authType: string;
  customHeaders?: { key: string; value: string }[];
  basicAuth?: {
    username: string;
    password: string;
  };
  bearerToken?: string;
  oauthConfig?: {
    tokenEndpoint: string;
    clientId: string;
    clientSecret: string;
  };
  events: {
    payIn: boolean;
    payOut: boolean;
  };
  payInStatuses: string[];
  payOutStatuses: string[];
}

function createWebhooksStore() {
  const { subscribe, set, update } = writable<Webhook[]>([]);

  return {
    subscribe,
    addWebhook: (webhook: Omit<Webhook, 'id'>) => {
      update(webhooks => {
        const id = crypto.randomUUID();
        return [...webhooks, { ...webhook, id }];
      });
    },
    updateWebhook: (id: string, webhook: Partial<Webhook>) => {
      update(webhooks => 
        webhooks.map(w => w.id === id ? { ...w, ...webhook } : w)
      );
    },
    deleteWebhook: (id: string) => {
      update(webhooks => webhooks.filter(w => w.id !== id));
    },
    reset: () => set([])
  };
}

export const webhooks = createWebhooksStore();