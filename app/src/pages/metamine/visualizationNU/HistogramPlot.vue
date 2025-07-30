<template>
  <VisualizationLayout
    v-if="!isMiniDevice"
    class="u_toggle-display-off"
    :link="{
      to: '/mm/metamaterial_visualization_nu',
      text: 'Visualize In Pairwise Plot',
    }"
  >
    <template #main_chart> <Histogram /> </template>

    <template #side_tools>
      <DataSelector />
      <RangeSelector />
      <MaterialInformation />
    </template>
    <template #footer>
      <DataInfo />
    </template>
  </VisualizationLayout>

  <div v-else class="footer_content-mobile">
    <Dialog disableClose :minWidth="40" :active="isMiniDevice">
      <template v-slot:title>Metamine Information</template>
      <template v-slot:content
        >Metamine Charts and Visualization data are accessible only on large screen
        devices.</template
      >
      <template v-slot:actions>
        <md-button @click.prevent="goHome">Go Home</md-button>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import Histogram from '@/components/metamine/visualizationNU/histogram.vue';
import DataSelector from '@/components/metamine/visualizationNU/DataSelector.vue';
import RangeSelector from '@/components/metamine/visualizationNU/RangeSelector.vue';
import MaterialInformation from '@/components/metamine/visualizationNU/MaterialInformation.vue';
import VisualizationLayout from '@/components/metamine/visualizationNU/VisualizationLayout.vue';
import DataInfo from '@/components/metamine/visualizationNU/DataInfo.vue';
import Dialog from '@/components/Dialog.vue';

defineOptions({ name: 'HistogramPage' });

const router = useRouter();

// Reactive data
const windowWidth = ref(window.innerWidth);

// Computed properties
const isMiniDevice = computed(() => windowWidth.value <= 650);

// Methods
const goHome = () => {
  router.push('/mm');
};

const onResize = () => {
  windowWidth.value = window.innerWidth;
};

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>
