<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import YASR from '@triply/yasr';

// Props
interface Props {
  id?: string;
  results?: any;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => 'YASR',
  results: () => null,
});

// Component instance
const yasr = ref<any>(null);

// Methods
const setResults = (results: any) => {
  if (results && yasr.value) {
    yasr.value.setResponse(results);
  }
};

// Lifecycle
onMounted(() => {
  const element = document.getElementById(props.id);

  if (element) {
    yasr.value = new YASR(element, {
      outputPlugins: ['table'],
      useGoogleCharts: false,
      persistency: {
        results: {
          key: () => false,
        },
      },
    } as any);
    setResults(props.results);
  }
});

// Watchers
watch(
  () => props.results,
  (newVal, oldVal) => {
    setResults(newVal);
  }
);

// Component name for debugging
defineOptions({
  name: 'yasr',
});
</script>

<style css src="@triply/yasr/build/yasr.min.css"></style>
