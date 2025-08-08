<template>
  <div>
    <div :id="containerId" :ref="setContainerRef"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue';
import { CreateVoyager } from 'datavoyager';

// Component name for debugging
defineOptions({
  name: 'DataVoyager',
});

// Props
interface Props {
  data?: any;
  spec?: any;
}

const props = withDefaults(defineProps<Props>(), {
  data: () => null,
  spec: () => null,
});

// Emits
const emit = defineEmits<{
  'update:spec': [spec: any];
}>();

// Voyager configuration
const voyagerConf = {
  showDataSourceSelector: false,
  hideHeader: true,
  hideFooter: true,
  // Additional configuration options as per documentation
  serverUrl: undefined, // For server mode if needed
  wildcards: 'enabled' as const, // Enable wildcards for multiple chart specification
  relatedViews: 'initiallyShown' as const, // Enable related views suggestions
};

// Reactive data
const containerId = ref('voyager-embed');
const containerRef = ref<HTMLElement | null>(null);
const voyagerInstance = ref<any>(null);

// Template ref function
const setContainerRef = (el: any) => {
  containerRef.value = el as HTMLElement;
};

// Methods
const updateSpec = () => {
  if (voyagerInstance.value) {
    emit('update:spec', voyagerInstance.value.getSpec());
  }
};

const createVoyager = async () => {
  if (!containerRef.value) return;

  await nextTick();
  voyagerInstance.value = CreateVoyager(containerRef.value, voyagerConf, props.data || {});
  voyagerInstance.value.onStateChange(() => updateSpec());

  if (props.data) {
    voyagerInstance.value.updateData(props.data);
  }
};

// Watchers
watch(
  () => props.data,
  () => {
    if (voyagerInstance.value && props.data) {
      voyagerInstance.value.updateData(props.data);
    } else {
      createVoyager();
    }
  }
);

// Lifecycle
onMounted(() => {
  createVoyager();
});
</script>
<style lang="css">
@import 'datavoyager/build/style.css';
</style>
