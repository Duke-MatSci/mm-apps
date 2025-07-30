<template>
  <div ref="plotlyView"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Plotly from 'plotly.js/dist/plotly.min.js';

// Props
interface Props {
  chart?: any;
}

const props = withDefaults(defineProps<Props>(), {
  chart: () => ({}),
});

// Template refs
const plotlyView = ref<HTMLElement>();

// Methods
const generateWidth = (): number => {
  const ww = window.innerWidth;
  if (ww > 1280) return (ww * 2) / 3 - 100;
  if (ww > 960) return (ww * 2) / 4 + 40;
  if (ww < 960) return ww * 0.86;
  return ww * 0.86; // Default fallback
};

// Reactive data
const layout = ref({
  width: generateWidth(),
  height: 360,
  margin: {
    b: 40,
    t: 40,
    l: 40,
    r: 40,
  },
});

const config = ref({ responsive: true });

// Computed
const container = computed(() => plotlyView.value);
const isChartInvalid = computed(() => {
  return !props.chart || !Object.keys(props.chart).length;
});

const createPlot = (): void => {
  if (!isChartInvalid.value) return updatePlot();
  if (container.value) {
    Plotly.newPlot(container.value, [], { ...layout.value }, { ...config.value });
  }
};

const updatePlot = (): void => {
  if (isChartInvalid.value) return createPlot();
  if (container.value) {
    const { data = [], layout: chartLayout = {} } = props.chart;
    Plotly.newPlot(container.value, data, { ...chartLayout, ...layout.value }, { ...config.value });
  }
};

// Lifecycle
onMounted(() => {
  createPlot();
});

// Watchers
watch(
  () => props.chart,
  () => {
    updatePlot();
  },
  { deep: true }
);

// Component name for debugging
defineOptions({
  name: 'PlotlyView',
});
</script>
