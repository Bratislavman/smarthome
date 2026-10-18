<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useAnalytics } from './useAnalytics';
import BaseCard from '@/components/ui/BaseCard.vue';
import TemperatureChart from '@/components/charts/TemperatureChart.vue';

const { data, loading, fetchData } = useAnalytics();

const selectedPeriod = ref<'day' | 'week' | 'month'>('day');

onMounted(() => {
  fetchData(selectedPeriod.value);
});

const handlePeriodChange = (period: 'day' | 'week' | 'month') => {
  selectedPeriod.value = period;
  fetchData(period);
};
</script>

<template>
  <div class="analytics-dashboard">
    <div class="period-selector">
      <button
        :class="{ active: selectedPeriod === 'day' }"
        @click="handlePeriodChange('day')"
      >
        Day
      </button>
      <button
        :class="{ active: selectedPeriod === 'week' }"
        @click="handlePeriodChange('week')"
      >
        Week
      </button>
      <button
        :class="{ active: selectedPeriod === 'month' }"
        @click="handlePeriodChange('month')"
      >
        Month
      </button>
    </div>
    
    <div v-if="loading" class="loading">Loading analytics...</div>
    
    <template v-else>
      <BaseCard title="Temperature Overview">
        <TemperatureChart :data="data.temperature" title="Temperature Trend" />
      </BaseCard>
      
      <div class="stats-grid">
        <BaseCard title="Average Temperature">
          <div class="stat-value">{{ data.stats.avgTemperature }}°C</div>
        </BaseCard>
        
        <BaseCard title="Max Temperature">
          <div class="stat-value">{{ data.stats.maxTemperature }}°C</div>
        </BaseCard>
        
        <BaseCard title="Min Temperature">
          <div class="stat-value">{{ data.stats.minTemperature }}°C</div>
        </BaseCard>
        
        <BaseCard title="Total Energy">
          <div class="stat-value">{{ data.stats.totalEnergy }} kWh</div>
        </BaseCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
.analytics-dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.period-selector {
  display: flex;
  gap: 0.5rem;
}

.period-selector button {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.period-selector button.active {
  background: var(--accent-color);
  color: white;
  border-color: var(--accent-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  padding: 1rem;
}

.loading {
  text-align: center;
  padding: 3rem;
}
</style>