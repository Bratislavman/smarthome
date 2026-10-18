import { ref, computed } from "vue";
import { useDevicesStore } from "@/stores/devices";
import type { Device } from "@/types/device";

export function useDevices() {
  const store = useDevicesStore();

  const devices = computed(() => store.devices);
  const loading = computed(() => store.loading);
  const error = computed(() => store.error);

  const fetchDevices = async () => {
    await store.fetchDevices();
  };

  const getDeviceById = (id: string): Device | undefined => {
    return devices.value.find((d) => d.id === id);
  };

  const getDevicesByType = (type: string) => {
    return devices.value.filter((d) => d.type === type);
  };

  const getOnlineDevices = computed(() => {
    return devices.value.filter((d) => d.status === "online");
  });

  return {
    devices,
    loading,
    error,
    fetchDevices,
    getDeviceById,
    getDevicesByType,
    onlineDevices: getOnlineDevices,
  };
}
