<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  padding?: boolean;
}

withDefaults(defineProps<Props>(), {
  padding: true
});
</script>

<template>
  <div class="base-card">
    <div v-if="title || subtitle" class="card-header">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
    </div>
    <div :class="['card-content', { 'no-padding': !padding }]">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.base-card {
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.card-content {
  padding: 1.5rem;
}

.card-content.no-padding {
  padding: 0;
}
</style>