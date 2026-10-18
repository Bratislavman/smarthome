import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { deviceService } from '@/services/deviceService';
import type { Device } from '@/types/device';

export const useDevicesStore = defineStore('devices', () => {
  const devices = ref<Device[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const onlineDevices = computed(() => {
    return devices.value.filter(d => d.status === 'online');
  });

  const fetchDevices = async () => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await deviceService.getDevices();
      devices.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch devices';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  const updateDevice = (id: string, updates: Partial<Device>) => {
    const index = devices.value.findIndex(d => d.id === id);
    if (index !== -1) {
      devices.value[index] = { ...devices.value[index], ...updates };
    }
  };

  const addDevice = (device: Device) => {
    devices.value.push(device);
  };

  const removeDevice = (id: string) => {
    devices.value = devices.value.filter(d => d.id !== id);
  };

  return {
    devices,
    loading,
    error,
    onlineDevices,
    fetchDevices,
    updateDevice,
    addDevice,
    removeDevice
  };
});