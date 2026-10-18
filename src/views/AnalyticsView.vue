<script setup lang="ts">
import AnalyticsDashboard from '@/features/analytics/AnalyticsDashboard.vue';
</script>

<template>
  <div class="analytics-view">
    <h2>Analytics</h2>
    <AnalyticsDashboard />
  </div>
</template>

<style scoped>
.analytics-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
</style>