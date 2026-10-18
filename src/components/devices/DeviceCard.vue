<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import type { Device } from '@/types/device';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';

interface Props {
  device: Device;
}

const props = defineProps<Props>();
const router = useRouter();

const statusColor = computed(() => {
  switch (props.device.status) {
    case 'online': return 'var(--success-color)';
    case 'offline': return 'var(--error-color)';
    case 'warning': return 'var(--warning-color)';
    default: return 'var(--text-secondary)';
  }
});

const navigateToDetails = () => {
  router.push(`/devices/${props.device.id}`);
};
</script>

<template>
  <BaseCard class="device-card">
    <div class="device-header">
      <div class="device-info">
        <h3 class="device-name">{{ device.name }}</h3>
        <span class="device-type">{{ device.type }}</span>
      </div>
      <div class="device-status" :style="{ background: statusColor }"></div>
    </div>
    
    <div class="device-metrics">
      <div v-if="device.temperature !== undefined" class="metric">
        <span class="metric-label">Temperature</span>
        <span class="metric-value">{{ device.temperature }}°C</span>
      </div>
      <div v-if="device.humidity !== undefined" class="metric">
        <span class="metric-label">Humidity</span>
        <span class="metric-value">{{ device.humidity }}%</span>
      </div>
      <div v-if="device.power !== undefined" class="metric">
        <span class="metric-label">Power</span>
        <span class="metric-value">{{ device.power }}W</span>
      </div>
    </div>
    
    <div class="device-actions">
      <BaseButton size="small" @click="navigateToDetails">
        Details
      </BaseButton>
    </div>
  </BaseCard>
</template>

<style scoped>
.device-card {
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.device-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.device-name {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.device-type {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.device-status {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.device-metrics {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.metric {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.metric-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.metric-value {
  font-size: 1.25rem;
  font-weight: 600;
}

.device-actions {
  display: flex;
  gap: 0.5rem;
}
</style>