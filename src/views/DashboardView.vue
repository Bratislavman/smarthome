<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useDevices } from '@/composables/useDevices';
import BaseCard from '@/components/ui/BaseCard.vue';
import DeviceList from '@/components/devices/DeviceList.vue';

const { devices, loading, fetchDevices, onlineDevices } = useDevices();

const stats = computed(() => ({
  total: devices.value.length,
  online: onlineDevices.value.length,
  offline: devices.value.length - onlineDevices.value.length
}));

onMounted(() => {
  fetchDevices();
});
</script>

<template>
  <div class="dashboard-view">
    <h2>Dashboard</h2>
    
    <div class="stats-grid">
      <BaseCard title="Total Devices">
        <div class="stat-number">{{ stats.total }}</div>
      </BaseCard>
      
      <BaseCard title="Online">
        <div class="stat-number online">{{ stats.online }}</div>
      </BaseCard>
      
      <BaseCard title="Offline">
        <div class="stat-number offline">{{ stats.offline }}</div>
      </BaseCard>
    </div>
    
    <BaseCard title="Devices Overview">
      <DeviceList :devices="devices" :loading="loading" />
    </BaseCard>
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  padding: 1rem;
}

.stat-number.online {
  color: var(--success-color);
}

.stat-number.offline {
  color: var(--error-color);
}
</style>