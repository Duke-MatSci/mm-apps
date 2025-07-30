<template>
  <div class="generator-container teams_header-partner tools_laucher">
    <div v-once v-if="isInvalidData" class="data-error">
      <div v-if="isValidGrid && data">
        Error: expected data string of length {{ Math.pow(grid, 2) }}, got {{ data.length }}
      </div>
      <div v-else>Error: undefined value provided for grid and/or data property</div>
    </div>
    <div
      v-if="isValidGrid && data"
      class="unit-cell-generator grid utility-margin-top"
      :style="gridStyle"
    >
      <div
        v-for="(value, index) in filledData"
        :key="index"
        :class="{
          'visualize-pagination-active': parseInt(value),
          'unit-cell-generator__grid-item': true,
        }"
      ></div>
    </div>
    <div v-else class="unit-cell-generator grid utility-margin-top">
      <!-- Error: expected prop grid of type Number, got {{typeof grid}} -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineOptions({ name: 'UnitCellImageGenerator' });

interface Props {
  data?: string;
  grid?: number;
}

const props = withDefaults(defineProps<Props>(), {
  data: '',
  grid: 0,
});

// Computed properties
const isValidGrid = computed(() => {
  return !!(typeof props.grid === 'number' || props.grid % 2 === 0);
});

const isInvalidData = computed(() => {
  if (!props.data) return false;
  return props.data.length < Math.pow(props.grid, 2);
});

const filledData = computed(() => {
  const missingData = Math.pow(props.grid, 2) - props.data.length;
  return missingData ? props.data.concat(Array(missingData).fill(0).join('')) : props.data;
});

const gridStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.grid}, 1fr)`,
    'grid-template-rows': `repeat(${props.grid}, 1fr)`,
  };
});
</script>
