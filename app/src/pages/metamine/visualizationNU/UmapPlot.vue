<template>
  <VisualizationLayout v-if="!isMiniDevice" class="u_toggle-display-off" :link="link" :dense="true">
    <template #main_chart>
      <template v-if="!isLoading && showUmap">
        <Umap />
        <div class="tools-simulation u--layout-flex u--layout-flex-justify-sb">
          <md-switch v-model="enableKnn">Find Nearest Neighbors</md-switch>
          <dialog-box disableClose :active="dialogBoxActiveKnn">
            <template v-slot:content> <NeighborPanel /> </template>
            <template v-slot:actions>
              <md-button @click.prevent="closeDialogBox">Close</md-button>
            </template>
          </dialog-box>
          <button @click="toggleDialogBoxSaveData()" class="nuplot-button button-primary">
            Save Data
          </button>
          <dialog-box :active="dialogBoxActiveSaveData" :disableClose="true">
            <template v-slot:content> <SaveDataPanel /> </template>
            <template v-slot:actions>
              <md-button @click.prevent="toggleDialogBoxSaveData">Close</md-button>
            </template>
          </dialog-box>
          <button @click="handleReset" class="nuplot-button button-alert">Reset</button>
        </div>
      </template>
    </template>

    <template #subcharts>
      <Structure></Structure>
      <Youngs></Youngs>
      <Poisson></Poisson>
    </template>

    <template #side_tools>
      <DataSelector />
      <ParamSelector />
    </template>

    <template #footer>
      <DataInfo />
    </template>
  </VisualizationLayout>
  <div v-else class="footer_content-mobile">
    <dialog-box disableClose :minWidth="40" :active="isMiniDevice">
      <template v-slot:title>Metamine Information</template>
      <template v-slot:content
        >Metamine Charts and Visualization data are accessible only on large screen
        devices.</template
      >
      <template v-slot:actions>
        <md-button @click.prevent="goHome">Go Home</md-button>
      </template>
    </dialog-box>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Umap from '@/components/metamine/visualizationNU/umap.vue';
import DataSelector from '@/components/metamine/visualizationNU/DataSelector.vue';
import ParamSelector from '@/components/metamine/visualizationNU/ParamSelector.vue';
import Youngs from '@/components/metamine/visualizationNU/youngs.vue';
import Poisson from '@/components/metamine/visualizationNU/poisson.vue';
import Structure from '@/components/metamine/visualizationNU/structure.vue';
import NeighborPanel from '@/components/metamine/visualizationNU/NeighborPanel.vue';
import SaveDataPanel from '@/components/metamine/visualizationNU/SaveDataPanel.vue';
import Dialog from '@/components/Dialog.vue';
import VisualizationLayout from '@/components/metamine/visualizationNU/VisualizationLayout.vue';
import DataInfo from '@/components/metamine/visualizationNU/DataInfo.vue';

defineOptions({ name: 'UmapPage' });

const store = useStore();
const router = useRouter();

// Reactive data
const dialogBoxActiveSaveData = ref(false);
const reset = ref(false);
const windowWidth = ref(window.innerWidth);
const showUmap = ref(true);

// Computed properties
const isLoading = computed(() => store.getters['metamineNU/getLoadingState']);
const dialogBoxActiveKnn = computed(() => store.state.metamineNU.dialogBoxActiveKnn);

const enableKnn = computed({
  get() {
    return store.state.metamineNU.enableKnn;
  },
  set(value) {
    store.commit('metamineNU/updateEnableKnn', value);
  },
});

const isMiniDevice = computed(() => windowWidth.value <= 650);

// Link configuration
const link = ref({
  to: '/mm/metamaterial_visualization_nu/umap',
  text: 'Visualize In Reduced Dimension',
});

// Methods
const closeDialogBox = () => {
  store.commit('metamineNU/setDialogBoxActiveKnn', false);
};

const toggleDialogBoxSaveData = () => {
  dialogBoxActiveSaveData.value = !dialogBoxActiveSaveData.value;
};

const handleReset = () => {
  store.commit('metamineNU/setReset', true);
};

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
