<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDevices } from '@/composables/useDevices';
import { useSocket } from '@/composables/useWebSocket'; // <-- Импортируем useSocket
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import TemperatureChart from '@/components/charts/TemperatureChart.vue';

const route = useRoute();
const router = useRouter();
const { getDeviceById, fetchDevices } = useDevices();

const deviceId = route.params.id as string;
const device = computed(() => getDeviceById(deviceId));

const temperatureHistory = ref<Array<{ time: string; value: number }>>([]);

useSocket(deviceId, (data) => {
  if (data.type === 'temperature' && data.deviceId === deviceId) {
    temperatureHistory.value.push({
      time: new Date(data.timestamp).toLocaleTimeString(),
      value: data.value
    });
    
    if (temperatureHistory.value.length > 50) {
      temperatureHistory.value.shift();
    }
  }
});

onMounted(async () => {
  await fetchDevices();
});

const goBack = () => {
  router.push('/devices');
};
</script>

<template>
  <div v-if="device" class="device-details">
    <BaseButton @click="goBack" variant="secondary">
      ← Back to Devices
    </BaseButton>
    
    <BaseCard :title="device.name" :subtitle="device.type">
      <div class="device-info">
        <div class="info-row">
          <span class="label">Status:</span>
          <span class="value" :class="device.status">{{ device.status }}</span>
        </div>
        
        <div v-if="device.temperature !== undefined" class="info-row">
          <span class="label">Temperature:</span>
          <span class="value">{{ device.temperature }}°C</span>
        </div>
        
        <div v-if="device.humidity !== undefined" class="info-row">
          <span class="label">Humidity:</span>
          <span class="value">{{ device.humidity }}%</span>
        </div>
        
        <div v-if="device.power !== undefined" class="info-row">
          <span class="label">Power:</span>
          <span class="value">{{ device.power }}W</span>
        </div>
      </div>
    </BaseCard>
    
    <BaseCard title="Temperature History">
      <TemperatureChart :data="temperatureHistory" />
    </BaseCard>
  </div>
  
  <div v-else class="loading">
    <p>Loading device details...</p>
  </div>
</template>

<style scoped>
.device-details {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.device-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-weight: 500;
  color: var(--text-secondary);
}

.value {
  font-weight: 600;
}

.value.online {
  color: var(--success-color);
}

.value.offline {
  color: var(--error-color);
}

.value.warning {
  color: var(--warning-color);
}

.loading {
  text-align: center;
  padding: 3rem;
}
</style>