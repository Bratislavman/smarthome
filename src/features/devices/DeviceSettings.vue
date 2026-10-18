<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Device } from '@/types/device';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { deviceService } from '@/services/deviceService';

interface Props {
  device: Device;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  saved: [device: Device]
}>();

const form = reactive({
  name: props.device.name,
  minTemperature: props.device.settings?.minTemperature ?? 18,
  maxTemperature: props.device.settings?.maxTemperature ?? 26
});

const loading = ref(false);
const error = ref('');

const handleSave = async () => {
  loading.value = true;
  error.value = '';
  
  try {
    const updated = await deviceService.updateDevice(props.device.id, {
      name: form.name,
      settings: {
        minTemperature: form.minTemperature,
        maxTemperature: form.maxTemperature
      }
    });
    
    emit('saved', updated);
  } catch (err) {
    error.value = 'Failed to save settings';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="handleSave" class="device-settings">
    <BaseInput
      v-model="form.name"
      label="Device Name"
      placeholder="Enter device name"
    />
    
    <BaseInput
      v-model="form.minTemperature"
      label="Min Temperature (°C)"
      type="number"
    />
    
    <BaseInput
      v-model="form.maxTemperature"
      label="Max Temperature (°C)"
      type="number"
    />
    
    <BaseButton type="submit" :loading="loading">
      Save Settings
    </BaseButton>
    
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<style scoped>
.device-settings {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 500px;
}

.error {
  color: var(--error-color);
  font-size: 0.875rem;
}
</style>