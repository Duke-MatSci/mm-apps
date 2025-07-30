<template>
  <div class="range-selector-wrapper">
    <div class="md-title u--font-emph-700">Property Range</div>
    <div class="slider" v-for="(name, index) in rangeList" :key="index">
      <div class="u--layout-flex u--layout-flex-justify-sb u_centralize_items">
        <div style="width: 20%">{{ name }}</div>
        <div style="width: 80%">
          <div class="nuplot-range-slider u--margin-centered u_centralize_text viz-u-postion__rel">
            <input
              class="nuplot-range-slider u--margin-centered u_centralize_text viz-u-postion__abs utility-transparentbg"
              type="range"
              v-bind:min="defaultValues[index][0]"
              v-bind:max="defaultValues[index][1]"
              step="1"
              v-model="values[index][0]"
              @change="handleMinSliderChangeFuncs($event, index)"
            />
            <input
              class="nuplot-range-slider u--margin-centered u_centralize_text viz-u-postion__abs utility-transparentbg"
              type="range"
              v-bind:min="defaultValues[index][0]"
              v-bind:max="defaultValues[index][1]"
              step="1"
              v-model="values[index][1]"
              @change="handleMaxSliderChangeFuncs($event, index)"
            />
          </div>
          <div class="u--layout-flex u--layout-flex-justify-sb">
            <div class="u--color-grey-sec">
              {{ sigFigs(defaultValues[index][0], 4) }}
            </div>
            <div class="u--color-grey-sec">
              {{ sigFigs(defaultValues[index][1], 4) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import sigFigs from '@/modules/metamine/utils/sigFigs';
import { requiredColumns } from '@/components/metamine/visualizationNU/constants';

defineOptions({ name: 'RangeSelector' });

const store = useStore();

// Reactive data
const rangeList = ref(
  requiredColumns.filter((col) => ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col))
);

// Computed properties
const activeData = computed(() => store.state.metamineNU.activeData);
const datasets = computed(() => store.state.metamineNU.datasets);
const dataLibrary = computed(() => store.state.metamineNU.dataLibrary);

const defaultValues = computed(() => {
  if (datasets.value.length > 0) {
    const range = rangeList.value.map((name) => [
      Math.min(...datasets.value.map((d: any) => d[name])),
      Math.max(...datasets.value.map((d: any) => d[name])),
    ]);
    return range;
  } else {
    const range = rangeList.value.map((name) => [0, 0]);
    return range;
  }
});

const values = computed(() => {
  if (activeData.value.length > 0) {
    return rangeList.value.map((name) => [
      Math.min(...activeData.value.map((d: any) => d[name])),
      Math.max(...activeData.value.map((d: any) => d[name])),
    ]);
  } else {
    return rangeList.value.map((name) => [0, 0]);
  }
});

// Methods
const handleMinSliderChangeFuncs = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  if (parseFloat(target.value) > values.value[index][1]) {
    values.value[index][0] = values.value[index][1];
  }
  const activeDatasetNames = activeData.value.map((d: any) => d.name);
  const filteredDatasets = datasets.value.filter((d: any, i: number) => {
    const filtered =
      d[rangeList.value[index]] >= values.value[index][0] &&
      d[rangeList.value[index]] <= values.value[index][1] &&
      activeDatasetNames.includes(d.name);
    return filtered;
  });
  let sourceItems = dataLibrary.value;
  const destItems = filteredDatasets;
  const unselected = activeData.value.filter((d: any) => !filteredDatasets.includes(d));

  sourceItems = sourceItems.concat(unselected);
  store.commit('metamineNU/setActiveData', destItems);
  store.commit('metamineNU/setDataLibrary', sourceItems);
};

const handleMaxSliderChangeFuncs = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  if (parseFloat(target.value) < values.value[index][0]) {
    values.value[index][1] = values.value[index][0];
  }
  const activeDatasetNames = activeData.value.map((d: any) => d.name);
  const filteredDatasets = datasets.value.filter((d: any, i: number) => {
    const filtered =
      d[rangeList.value[index]] >= values.value[index][0] &&
      d[rangeList.value[index]] <= values.value[index][1] &&
      activeDatasetNames.includes(d.name);
    return filtered;
  });
  let sourceItems = dataLibrary.value;
  const destItems = filteredDatasets;
  const unselected = activeData.value.filter((d: any) => !filteredDatasets.includes(d));

  sourceItems = sourceItems.concat(unselected);
  store.commit('metamineNU/setActiveData', destItems);
  store.commit('metamineNU/setDataLibrary', sourceItems);
};

// Watchers
watch(
  activeData,
  () => {
    // Deep watching is handled automatically by Vue 3
  },
  { deep: true }
);

watch(
  dataLibrary,
  () => {
    // Deep watching is handled automatically by Vue 3
  },
  { deep: true }
);
</script>
