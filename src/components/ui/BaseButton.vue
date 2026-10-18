<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  loading: false,
  disabled: false
});

defineEmits<{
  click: [event: MouseEvent]
}>();
</script>

<template>
  <button
    :class="['base-button', `variant-${variant}`, `size-${size}`]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="spinner"></span>
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.base-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.variant-primary {
  background: var(--accent-color);
  color: white;
}

.variant-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.variant-secondary {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.variant-danger {
  background: var(--error-color);
  color: white;
}

.size-small {
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
}

.size-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.size-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}

.spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>