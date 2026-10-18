import { ref } from 'vue';
import { deviceService } from '@/services/deviceService';

interface AnalyticsData {
  temperature: Array<{ time: string; value: number }>;
  stats: {
    avgTemperature: number;
    maxTemperature: number;
    minTemperature: number;
    totalEnergy: number;
  };
}

export function useAnalytics() {
  const data = ref<AnalyticsData>({
    temperature: [],
    stats: {
      avgTemperature: 0,
      maxTemperature: 0,
      minTemperature: 0,
      totalEnergy: 0
    }
  });
  
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchData = async (period: 'day' | 'week' | 'month') => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await deviceService.getAnalytics(period);
      data.value = response.data;
    } catch (err) {
      error.value = 'Failed to load analytics';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    data,
    loading,
    error,
    fetchData
  };
}