<template>
  <div class="neighbor-panel-wrapper">
    <div class="table-header u_display-flex u--layout-flex-justify-sb u_centralize_items">
      <div class="nuplot-table-title article_metadata_strong md-title u--padding-zero">
        Nearest Neighbors Panel
      </div>
      <md-button>
        <download-csv :data="neighbors" name="five_nearest_neighbors.csv">
          Download Data <md-icon>download</md-icon>
        </download-csv>
      </md-button>
    </div>
    <md-table>
      <md-table-row>
        <md-table-cell v-for="neighbor in neighbors" :key="neighbor.index">
          <StructureKnnVue :dataPoint="neighbor" />
        </md-table-cell>
      </md-table-row>
      <md-table-row v-for="column in columns" :key="column">
        <md-table-cell
          v-for="neighbor in neighbors"
          :key="`${column}-${neighbor.index}`"
          style="font-size: 8px"
        >
          {{ column }}: {{ neighbor[column] }}
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<style scoped>
.neighbor-panel-wrapper {
  width: fit-content;
}
</style>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import JsonCSV from 'vue-json-csv';
import StructureKnnVue from '@/components/metamine/visualizationNU/StructureKnn.vue';
import { requiredColumns } from '@/components/metamine/visualizationNU/constants';

defineOptions({ name: 'NeighborPanel' });

const store = useStore();

// Reactive data
const columns = ref([
  ...requiredColumns.filter((col) => ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col)),
  'distance',
]);

// Computed properties
const neighbors = computed(() => store.state.metamineNU.neighbors);
</script>
