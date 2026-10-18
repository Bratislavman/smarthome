<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string | number;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>();

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
</script>

<template>
  <div class="base-input">
    <label v-if="label" :for="inputId" class="input-label">
      {{ label }}
    </label>
    <input
      :id="inputId"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="['input-field', { 'has-error': error }]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="input-error">{{ error }}</span>
  </div>
</template>

<style scoped>
.base-input {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
}

.input-field {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input-field:focus {
  outline: none;
  border-color: var(--accent-color);
}

.input-field:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-field.has-error {
  border-color: var(--error-color);
}

.input-error {
  font-size: 0.75rem;
  color: var(--error-color);
}
</style>