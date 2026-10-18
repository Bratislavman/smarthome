<script setup lang="ts">
import { computed } from "vue";
import type { Device } from "@/types/device";
import DeviceCard from "./DeviceCard.vue";
import BaseCard from "@/components/ui/BaseCard.vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

interface Props {
  devices: Device[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const hasDevices = computed(() => props.devices.length > 0);

const shouldUseVirtual = computed(() => {
  return props.devices.length > 50;
});

const rows = computed(() => {
  const result: { id: string; items: any[] }[] = [];
  for (let i = 0; i < props.devices.length; i += 4) {
    const items = props.devices.slice(i, i + 4);
    // ID строки — это ID первого элемента (для key-field)
    result.push({
      id: `row-${items[0].id}`,
      items
    });
  }
  return result;
});
</script>

<template>
  <div class="device-list">
    <div v-if="loading" class="loading-state">
      <p>Loading devices...</p>
    </div>
    <div v-else-if="!hasDevices" class="empty-state">
      <BaseCard>
        <p>No devices found</p>
      </BaseCard>
    </div>
    <div v-else-if="!shouldUseVirtual" class="devices-grid">
      <DeviceCard v-for="device in devices" :key="device.id" :device="device" />
    </div>
    <DynamicScroller
      v-else
      class="virtual-scroller"
      :items="rows"
      :min-item-size="240"
      key-field="id"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :size-dependencies="[item.items.length, ...item.items.map(i => i.name)]"
          :data-index="index"
        >
          <div class="row">
            <DeviceCard
              v-for="device in item.items"
              :key="device.id"
              :device="device"
              class="row-item"
            />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
  </div>
</template>

<style scoped>
.device-list {
  width: 100%;
  height: 300px;
}

.virtual-scroller {
  height: 100%;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
}

.row-item {
  width: 100%;
}

/* Адаптивность: на маленьких экранах меньше колонок */
@media (max-width: 1200px) {
  .row {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .row {
    grid-template-columns: 1fr;
  }
}

.loading-state {
  text-align: center;
  padding: 3rem;
}
</style>
