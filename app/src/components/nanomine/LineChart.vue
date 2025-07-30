<template>
  <div class="md-layout section_LineChart">
    <div class="md-layout-item md-size-20 md-alignment-top-left md-layout md-gutter">
      <div class="md-layout-item">
        <MdSwitch v-model="xLogScale" class="md-layout-item md-size-100">x Axis Log Scale</MdSwitch>
        <MdSwitch v-model="yLogScale" class="md-layout-item md-size-100">y Axis Log Scale</MdSwitch>
      </div>
    </div>
    <div class="md-layout-item">
      <svg
        :width="width + margin.left + margin.right"
        :height="height + margin.top + margin.bottom"
        class="nm-linechart"
      >
        <g :transform="`translate(${margin.left + 3}, ${10})`">
          <!-- Axes -->
          <g class="x-axis" :transform="`translate(0, ${height})`"></g>
          <g class="y-axis"></g>
          <!-- Axis Labels -->
          <g>
            <text
              class="x-axis-label"
              :transform="`translate(${width / 2}, ${height + margin.top + 20})`"
              style="text-anchor: middle"
            ></text>
            <text
              class="y-axis-label"
              :transform="`rotate(-90)`"
              :y="`${0 - margin.left}`"
              :x="`${0 - height / 2}`"
              :dy="`1em`"
              style="text-anchor: middle"
            ></text>
          </g>
          <!-- Line -->
          <g>
            <path class="nm-line" d=""></path>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as d3 from 'd3';

interface Props {
  dataset: {
    data: Array<{ x: number; y: number }>;
    xlabel: string;
    ylabel: string;
  };
  options?: {
    width?: number;
    height?: number;
  };
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ({}),
});

// Reactive data
const width = ref(0);
const height = ref(0);
const margin = ref({
  left: 70,
  right: 40,
  bottom: 50,
  top: 40,
});
const scales = ref({
  x: null as any,
  y: null as any,
});
const data = ref<Array<{ x: number; y: number }>>([]);
const xlabel = ref('');
const ylabel = ref('');
const xLogScale = ref(false);
const yLogScale = ref(false);

/**
 * setSize: This method will set the width, height
 * and also the margins of the chart.
 */
const setSize = () => {
  // Width and Height
  width.value = props.options.width || 400 - margin.value.left - margin.value.right;
  height.value = props.options.height || 250 - margin.value.top - margin.value.top;
};

const setScales = () => {
  if (!xLogScale.value) {
    scales.value.x = d3
      .scaleLinear()
      .domain(d3.extent(data.value, (d: { x: number; y: number }) => d.x) as [number, number])
      .range([0, width.value]);
  } else {
    scales.value.x = d3
      .scaleLog()
      .domain(d3.extent(data.value, (d: { x: number; y: number }) => d.x) as [number, number])
      .range([0, width.value]);
  }

  if (!yLogScale.value) {
    scales.value.y = d3
      .scaleLinear()
      .domain(d3.extent(data.value, (d: { x: number; y: number }) => d.y) as [number, number])
      .range([height.value, 0]);
  } else {
    scales.value.y = d3
      .scaleLog()
      .domain(d3.extent(data.value, (d: { x: number; y: number }) => d.y) as [number, number])
      .range([height.value, 0]);
  }
};

const renderAxes = (strokeColor: string) => {
  d3.select('.x-axis')
    .call(d3.axisBottom(scales.value.x).ticks(7))
    .selectAll('.tick line')
    .attr('stroke', strokeColor)
    .attr('stroke-opacity', '0.8');

  d3.select('.y-axis')
    .call(d3.axisLeft(scales.value.y).ticks(5))
    .selectAll('.tick line')
    .attr('stroke', strokeColor)
    .attr('stroke-opacity', '0.8');

  // Change axis label text
  d3.select('.x-axis-label').text(xlabel.value);
  d3.select('.y-axis-label').text(ylabel.value);

  // Change text color
  d3.selectAll('.y-axis text').attr('color', strokeColor);
  d3.selectAll('.x-axis text').attr('color', strokeColor);

  // Change path color
  d3.selectAll('.y-axis path').attr('stroke', strokeColor).attr('stroke-opacity', '0.8');
  d3.selectAll('.x-axis path').attr('stroke', strokeColor).attr('stroke-opacity', '0.8');
};

const line = () => {
  const { x, y } = scales.value;
  return d3
    .line<{ x: number; y: number }>()
    .x((d: { x: number; y: number }) => x(d.x))
    .y((d: { x: number; y: number }) => y(d.y));
};

const renderLine = () => {
  d3.select('.nm-line').datum(data.value).attr('d', line());
};

const init = () => {
  if (data.value.length > 0) {
    const strokeColor = '#000';
    setSize();
    setScales();
    renderAxes(strokeColor);
    renderLine();
  }
};

// Watchers
watch(
  () => props.dataset,
  (newData) => {
    data.value = newData.data;
    xlabel.value = newData.xlabel;
    ylabel.value = newData.ylabel;
    init();
  },
  { deep: true }
);

watch(xLogScale, () => {
  init();
});

watch(yLogScale, () => {
  init();
});

// Lifecycle
onMounted(() => {
  data.value = props.dataset.data;
  xlabel.value = props.dataset.xlabel;
  ylabel.value = props.dataset.ylabel;
  init();
});

defineOptions({
  name: 'LineChart',
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
