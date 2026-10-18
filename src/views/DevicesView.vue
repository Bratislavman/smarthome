<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useDevices } from '@/composables/useDevices';
import BaseCard from '@/components/ui/BaseCard.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import DeviceList from '@/components/devices/DeviceList.vue';

const { devices, loading, fetchDevices } = useDevices();

const searchQuery = ref('');
const selectedType = ref<string>('all');

const deviceTypes = computed(() => {
  const types = new Set(devices.value.map(d => d.type));
  return ['all', ...Array.from(types)];
});

const filteredDevices = computed(() => {
  return devices.value.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === 'all' || device.type === selectedType.value;
    return matchesSearch && matchesType;
  });
});

onMounted(() => {
  fetchDevices();
});
</script>

<template>
  <div class="devices-view flex-container">
    <h2>Devices</h2>
    
    <BaseCard title="Filters">
      <div class="filters">
        <BaseInput
          v-model="searchQuery"
          placeholder="Search devices..."
          class="search-input"
        />
        
        <select v-model="selectedType" class="type-filter">
          <option v-for="type in deviceTypes" :key="type" :value="type">
            {{ type === 'all' ? 'All Types' : type }}
          </option>
        </select>
      </div>
    </BaseCard>
    
    <DeviceList :devices="filteredDevices" :loading="loading" :use-virtual-scroll="true"/>
  </div>
</template>

<style scoped>
.devices-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.search-input {
  flex: 1;
  min-width: 200px;
}

.type-filter {
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 1rem;
  cursor: pointer;
}

/* Родитель на всю высоту экрана */
.flex-container {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  box-sizing: border-box;
  gap: 1.5rem;
}

.view-title {
  flex-shrink: 0; /* Заголовок не сжимается */
  margin: 0;
}

.filters-card {
  flex-shrink: 0; /* Фильтры не сжимаются */
}

/* Заставляем список занять всё оставшееся пространство */
.virtual-list-wrapper {
  flex: 1; 
  min-height: 0; /* Критически важно для работы flex children со скроллом */
  overflow: hidden; /* Скрываем вылезающий контент, скролл будет внутри компонента */
}
</style>