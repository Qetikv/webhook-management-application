<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let type: 'button' | 'submit' = 'button';
  export let disabled = false;
  export let fullWidth = false;

  const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-300',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 disabled:bg-gray-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white disabled:bg-red-300'
  };
</script>

<button
  {type}
  {disabled}
  class="{baseClasses} {variants[variant]} {fullWidth ? 'w-full' : ''}"
  on:click
>
  <slot />
</button>