<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

interface Props {
  data: Array<{ time: string; value: number }>;
  title?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Temperature'
});

const chartRef = ref<HTMLDivElement>();
let chartInstance: echarts.ECharts | null = null;

const initChart = () => {
  if (!chartRef.value) return;
  
  chartInstance = echarts.init(chartRef.value);
  updateChart();
};

const updateChart = () => {
  if (!chartInstance) return;
  
  const option: echarts.EChartsOption = {
    title: {
      text: props.title,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: props.data.map(d => d.time)
    },
    yAxis: {
      type: 'value',
      name: '°C'
    },
    series: [{
      data: props.data.map(d => d.value),
      type: 'line',
      smooth: true,
      areaStyle: {
        opacity: 0.3
      }
    }]
  };
  
  chartInstance.setOption(option);
};

watch(() => props.data, updateChart, { deep: true });

onMounted(() => {
  initChart();
  window.addEventListener('resize', () => chartInstance?.resize());
});

onUnmounted(() => {
  chartInstance?.dispose();
});
</script>

<template>
  <div ref="chartRef" class="temperature-chart"></div>
</template>

<style scoped>
.temperature-chart {
  width: 100%;
  height: 400px;
}
</style>