<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  
  const dispatch = createEventDispatcher();
  const arrowIcon = '⌵';
  
  export let show = false;
  export let webhook: {
    id: string;
    nickname: string;
    url: string;
    authorizationType: string;
    selectedEvents?: {
      payIn: boolean;
      payOut: boolean;
    };
    payInStatuses?: string[];
    payOutStatuses?: string[];
    customHeaders?: Array<{ key: string; value: string }>;
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
  };

  let nickname = webhook?.nickname || '';
  let webhookUrl = webhook?.url || '';
  let selectedAuthType = webhook?.authorizationType || '';
  let customHeaders: Array<{ key: string; value: string }> = webhook?.customHeaders || [{ key: '', value: '' }];
  let basicAuth = webhook?.basicAuth || {
    username: '',
    password: ''
  };
  let bearerToken = webhook?.bearerToken || '';
  let oauthConfig = webhook?.oauthConfig || {
    tokenEndpoint: '',
    clientId: '',
    clientSecret: ''
  };
  let showPassword = false;
  let showOAuthorDropdown = false;
  let selectedEvents = webhook?.selectedEvents || {
    payIn: false,
    payOut: false
  };
  let payInStatuses: string[] = webhook?.payInStatuses || [];
  let payOutStatuses: string[] = webhook?.payOutStatuses || [];
  let showPayInStatuses = false;
  let showPayOutStatuses = false;

  const authTypes = [
    'No Authorization',
    'Custom Header',
    'Basic Authentication',
    'Bearer Token',
    'OAuth 2.0'
  ];

  const statuses = [
    'Created',
    'Pending',
    'Success',
    'Declined',
    'Timeout',
    'Processed',
    'Rejected'
  ];

  function handleClose() {
    dispatch('close');
  }

  function addCustomHeader() {
    customHeaders = [...customHeaders, { key: '', value: '' }];
  }

  function removeCustomHeader(index: number) {
    customHeaders = customHeaders.filter((_, i) => i !== index);
  }

  function handleSubmit() {
    const submitData = {
      id: webhook.id,
      nickname,
      webhookUrl,
      selectedAuthType,
      selectedEvents,
      payInStatuses,
      payOutStatuses,
      ...(selectedAuthType === 'Custom Header' ? { customHeaders } : {}),
      ...(selectedAuthType === 'Basic Authentication' ? { basicAuth } : {}),
      ...(selectedAuthType === 'Bearer Token' ? { bearerToken } : {}),
      ...(selectedAuthType === 'OAuth 2.0' ? { oauthConfig } : {})
    };

    dispatch('submit', submitData);
  }

  function togglePayInStatuses() {
    showPayInStatuses = !showPayInStatuses;
    if (showPayInStatuses) showPayOutStatuses = false;
  }

  function togglePayOutStatuses() {
    showPayOutStatuses = !showPayOutStatuses;
    if (showPayOutStatuses) showPayInStatuses = false;
  }
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal {
    background: white;
    border-radius: 8px;
    width: 95%;
    max-width: 800px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
  }

  .modal-header {
    padding: 2rem 2rem 1.5rem;
    background: white;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .modal-content {
    padding: 0 2rem 2rem;
    overflow-y: auto;
    flex: 1;
  }

  .modal-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #333;
  }

  .close-button {
    background: none;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 32px;
    height: 32px;
    font-size: 1.25rem;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    line-height: 1;
  }

  .close-button:hover {
    color: #333;
    border-color: #333;
  }

  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .form-group {
    flex: 1;
  }

  .form-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: 500;
  }

  .form-input {
    width: 100%;
    padding: 0.625rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
  }

  .form-input:focus {
    outline: none;
    border-color: #000;
  }

  .auth-types-container {
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 12px;
    padding: 1rem;
  }

  .auth-types {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .auth-type-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 0.9rem;
    white-space: nowrap;
  }

  .auth-type-button:hover {
    border-color: #000;
    background: #f8f8f8;
  }

  .auth-type-button.selected {
    background: #000;
    color: #fff;
    border-color: #000;
  }

  .events-container {
    border: 1px solid #ddd;
    border-radius: 12px;
    overflow: hidden;
  }

  .events-header {
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }

  .events-title {
    font-weight: 600;
    color: #333;
    margin: 0;
  }

  .events-body {
    background: #fff;
  }

  .event-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-bottom: 1px solid #ddd;
  }

  .event-row:last-child {
    border-bottom: none;
  }

  .event-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.9rem;
  }

  .event-indicator {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background: #fff;
    border: 1px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
  }

  .selected .event-indicator {
    background: #000;
  }

  .arrow-icon {
    margin-left: auto;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: #666;
    cursor: pointer;
    font-weight: normal;
  }

  .arrow-icon:hover {
    color: #333;
    border-color: #333;
  }

  .event-content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .selected-statuses {
    color: #666;
    font-size: 0.85rem;
  }

  .statuses-dropdown {
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin: 0.5rem 1rem;
    max-height: 200px;
    overflow-y: auto;
  }

  .status-option {
    padding: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .status-option:hover {
    background: #f5f5f5;
  }

  .status-checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid #ddd;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .status-checkbox.selected {
    background: #000;
    border-color: #000;
  }

  .save-button {
    width: 100%;
    padding: 0.75rem;
    background-color: #000;
    border: none;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    cursor: pointer;
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .save-button:hover {
    opacity: 0.9;
  }

  .save-button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }

  .custom-headers-container {
    margin: 1rem 0;
    padding: 1.5rem;
    border: 1px solid #ddd;
    border-radius: 12px;
  }

  .custom-header-row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .header-input-group {
    width: calc(45% - 0.5rem);
  }

  .basic-auth .header-input-group {
    width: calc(95% - 0.5rem);
  }

  .header-input-group + .header-input-group {
    margin-left: 1rem;
  }

  .header-input-group .form-input {
    width: 100%;
  }

  .header-label {
    display: block;
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: normal;
  }

  .remove-header-button {
    margin-left: 1rem;
    width: 32px;
    height: 32px;
    border: 2px solid #ddd;
    background: none;
    border-radius: 4px;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    padding: 0;
    line-height: 1;
  }

  .remove-header-button:hover {
    color: #333;
    border-color: #333;
  }

  .add-header-button {
    background: none;
    border: 2px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    color: #666;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .add-header-button:hover {
    color: #333;
    border-color: #333;
  }

  .password-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .forgot-link {
    position: absolute;
    right: 2rem;
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 0.8rem;
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
  }

  .forgot-link:hover {
    color: #000;
  }

  .password-toggle {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 1.1rem;
    opacity: 0.6;
    transition: opacity 0.2s;
  }

  .password-toggle:hover {
    opacity: 1;
  }
</style>

{#if show}
  <div class="modal-backdrop" on:click={handleClose}>
    <div class="modal" on:click|stopPropagation>
      <div class="modal-header">
        <h2 class="modal-title">Edit webhook</h2>
        <button class="close-button" on:click={handleClose}>&times;</button>
      </div>

      <form on:submit|preventDefault={handleSubmit} class="modal-content">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="nickname">Nickname</label>
            <input
              type="text"
              id="nickname"
              class="form-input"
              bind:value={nickname}
              placeholder="Enter webhook nickname"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="webhookUrl">Webhook URL</label>
            <input
              type="url"
              id="webhookUrl"
              class="form-input"
              bind:value={webhookUrl}
              placeholder="https://your-domain.com/webhook"
              required
            />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Authorization Type</label>
          <div class="auth-types-container">
            <div class="auth-types">
              {#each authTypes as authType}
                <button
                  type="button"
                  class="auth-type-button"
                  class:selected={selectedAuthType === authType}
                  on:click={() => selectedAuthType = authType}
                >
                  {authType}
                </button>
              {/each}
            </div>
          </div>
        </div>

        {#if selectedAuthType === 'Bearer Token'}
          <div class="custom-headers-container basic-auth">
            <div class="custom-header-row">
              <div class="header-input-group">
                <label class="header-label">Token</label>
                <input
                  type="text"
                  class="form-input"
                  bind:value={bearerToken}
                  placeholder="eg. 123.456.78"
                />
              </div>
            </div>
          </div>
        {/if}

        {#if selectedAuthType === 'Basic Authentication'}
          <div class="custom-headers-container basic-auth">
            <div class="custom-header-row">
              <div class="header-input-group">
                <label class="header-label">Username</label>
                <input
                  type="text"
                  class="form-input"
                  bind:value={basicAuth.username}
                  placeholder="Enter username"
                />
              </div>
              <div class="header-input-group">
                <label class="header-label">Password</label>
                <div class="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    class="form-input"
                    bind:value={basicAuth.password}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    class="forgot-link"
                    on:click={() => alert('Password recovery feature coming soon!')}
                  >
                    Forgot?
                  </button>
                  <button
                    type="button"
                    class="password-toggle"
                    on:click={() => showPassword = !showPassword}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {#if showPassword}
                      👁️
                    {:else}
                      👁️‍🗨️
                    {/if}
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/if}

        {#if selectedAuthType === 'OAuth 2.0'}
          <div class="custom-headers-container">
            <div class="form-group">
              <label class="form-label">OAuthor</label>
              <div style="border: 1px solid #ddd; border-radius: 4px; padding: 0.625rem; display: flex; align-items: center; justify-content: space-between; background-color: #f5f5f5;">
                <span style="color: #666;">Client Credentials Flow</span>
                <span class="arrow-icon" style="border: none; margin-left: 0.5rem;" on:click={() => showOAuthorDropdown = !showOAuthorDropdown}>{arrowIcon}</span>
              </div>
            </div>
            {#if showOAuthorDropdown}
              <div class="statuses-dropdown" style="margin: 0 0 1rem 0;">
                <div class="status-option">
                  <span>Client Credentials Flow</span>
                </div>
              </div>
            {/if}
            <div class="form-group" style="margin-top: 1rem;">
              <label class="form-label">Token Endpoint</label>
              <input
                type="url"
                class="form-input"
                bind:value={oauthConfig.tokenEndpoint}
                placeholder="https://"
              />
            </div>
            <div class="form-row" style="margin-top: 1rem;">
              <div class="form-group">
                <label class="form-label">Client ID</label>
                <input
                  type="text"
                  class="form-input"
                  bind:value={oauthConfig.clientId}
                />
              </div>
              <div class="form-group">
                <label class="form-label">Client Secret</label>
                <input
                  type="text"
                  class="form-input"
                  bind:value={oauthConfig.clientSecret}
                />
              </div>
              <div class="form-group">
                <label class="form-label">Grant Type</label>
                <input
                  type="text"
                  class="form-input"
                  value="client_credentials"
                  readonly
                />
              </div>
            </div>
          </div>
        {/if}

        {#if selectedAuthType === 'Custom Header'}
          <div class="custom-headers-container">
            {#each customHeaders as header, index}
              <div class="custom-header-row">
                <div class="header-input-group">
                  {#if index === 0}
                    <label class="header-label">Key</label>
                  {/if}
                  <input
                    type="text"
                    class="form-input"
                    bind:value={header.key}
                  />
                </div>
                <div class="header-input-group">
                  {#if index === 0}
                    <label class="header-label">Value</label>
                  {/if}
                  <input
                    type="text"
                    class="form-input"
                    bind:value={header.value}
                  />
                </div>
                {#if index !== 0}
                  <button
                    type="button"
                    class="remove-header-button"
                    on:click={() => removeCustomHeader(index)}
                    title="Delete header"
                  >
                    🗑
                  </button>
                {/if}
              </div>
            {/each}
            <button
              type="button"
              class="add-header-button"
              on:click={addCustomHeader}
            >
              + Add Row
            </button>
          </div>
        {/if}

        <div class="events-container">
          <div class="events-header">
            <h3 class="events-title">Events to Send</h3>
          </div>
          
          <div class="events-body">
            <div class="event-row" on:click={() => selectedEvents.payIn = !selectedEvents.payIn} class:selected={selectedEvents.payIn}>
              <div class="event-content">
                <button type="button" class="event-button">
                  <div class="event-indicator">
                    {#if selectedEvents.payIn}✓{/if}
                  </div>
                  <span>Pay-in</span>
                </button>
                {#if payInStatuses.length > 0}
                  <span class="selected-statuses">- {payInStatuses.join(', ')}</span>
                {/if}
              </div>
              <span class="arrow-icon" on:click|stopPropagation={togglePayInStatuses}>{arrowIcon}</span>
            </div>

            {#if showPayInStatuses}
              <div class="statuses-dropdown" style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 0.5rem;">
                {#each statuses as status}
                  <div
                    class="status-option"
                    style="flex: 0 1 auto;"
                    on:click={() => {
                      const index = payInStatuses.indexOf(status);
                      if (index === -1) {
                        payInStatuses = [...payInStatuses, status];
                      } else {
                        payInStatuses = payInStatuses.filter(s => s !== status);
                      }
                    }}
                  >
                    <div class="status-checkbox" class:selected={payInStatuses.includes(status)}>
                      {#if payInStatuses.includes(status)}✓{/if}
                    </div>
                    {status}
                  </div>
                {/each}
              </div>
            {/if}

            <div class="event-row" on:click={() => selectedEvents.payOut = !selectedEvents.payOut} class:selected={selectedEvents.payOut}>
              <div class="event-content">
                <button type="button" class="event-button">
                  <div class="event-indicator">
                    {#if selectedEvents.payOut}−{/if}
                  </div>
                  <span>Pay-out</span>
                </button>
                {#if payOutStatuses.length > 0}
                  <span class="selected-statuses">- {payOutStatuses.join(', ')}</span>
                {/if}
              </div>
              <span class="arrow-icon" on:click|stopPropagation={togglePayOutStatuses}>{arrowIcon}</span>
            </div>

            {#if showPayOutStatuses}
              <div class="statuses-dropdown" style="display: flex; flex-wrap: wrap; gap: 1rem; padding: 0.5rem;">
                {#each statuses as status}
                  <div
                    class="status-option"
                    style="flex: 0 1 auto;"
                    on:click={() => {
                      const index = payOutStatuses.indexOf(status);
                      if (index === -1) {
                        payOutStatuses = [...payOutStatuses, status];
                      } else {
                        payOutStatuses = payOutStatuses.filter(s => s !== status);
                      }
                    }}
                  >
                    <div class="status-checkbox" class:selected={payOutStatuses.includes(status)}>
                      {#if payOutStatuses.includes(status)}✓{/if}
                    </div>
                    {status}
                  </div>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <button
          type="submit"
          class="save-button"
          disabled={!nickname || !webhookUrl || !selectedAuthType}
        >
          <span>Save changes</span>
        </button>
      </form>
    </div>
  </div>
{/if}