<template>
  <div class="section_CSVPlotter tool_page">
    <div class="wrapper md-layout md-alignment-top-center md-size-100 curationplot">
      <div class="team_header md-layout-item md-size-100">
        <h1 class="visualize_header-h1 teams_header">Curation Plot</h1>
      </div>
      <md-content
        md-elevation-7
        class="upload md-layout-item md-size-33 md-layout md-gutter md-alignment-space-between-left"
        @dragover="dragover"
        @dragleave="dragleave"
        @drop="drop"
        :style="{ 'background-color': boxColor }"
      >
        <div class="md-layout-item md-size-90">
          <input
            type="file"
            multiple
            name="fields[assetsFieldHandle][]"
            id="assetsFieldHandle"
            @change="onChange"
            ref="myUpload"
            accept=".csv"
            class="md-layout-item md-size-100"
          />
          <label class="md-layout-item md-size-100">
            <p>Drop csv files here or click here to upload and plot</p>
          </label>
          <div class="md-layout-item md-size-100" v-if="csvName">
            {{ csvName }}
            <md-button class="md-accent" @click="remove()" title="Remove file">
              <md-icon>delete</md-icon>
            </md-button>
          </div>
        </div>
      </md-content>
      <!-- Line chart -->
      <md-content id="viz" md-elevation-7 class="md-layout-item md-size-66 chart" :key="csvName">
        <nm-linechart
          :options="{ width: 500, height: 400 }"
          :dataset="dataset"
          :xlabel="xlabel"
          :ylabel="ylabel"
        ></nm-linechart>
      </md-content>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import LineChart from '@/components/nanomine/LineChart.vue';

// Component name for debugging
defineOptions({
  name: 'CurationPlot',
});

// Store
const store = useStore();

// Template refs
const myUpload = ref<HTMLInputElement>();

// Interfaces
interface DataPoint {
  x: number;
  y: number;
}

interface Dataset {
  data: DataPoint[];
  xlabel: string;
  ylabel: string;
}

// Reactive data
const title = ref('Curation Plot');
const dialog = ref(false);
const boxColor = ref('#e3e3e3');
const csv = ref<File | null>(null);
const csvName = ref('');
const csvText = ref('');
const data = ref<DataPoint[]>([]);
const dataset = ref<Dataset>({
  data: [],
  xlabel: '',
  ylabel: '',
});
const xlabel = ref('');
const ylabel = ref('');

// Methods
const reset = () => {
  boxColor.value = '#e3e3e3';
  csv.value = null;
  csvName.value = '';
  csvText.value = '';
  data.value = [];
  dataset.value = {
    data: [],
    xlabel: '',
    ylabel: '',
  };
  xlabel.value = '';
  ylabel.value = '';
  if (myUpload.value) {
    myUpload.value.value = '';
  }
};

const onChange = () => {
  if (myUpload.value && myUpload.value.files) {
    csv.value = myUpload.value.files[0];
    console.log(csv.value);
    csvName.value = csv.value.name;
    console.log(csvName.value);
    const fr = new FileReader();
    fr.readAsText(csv.value);
    fr.addEventListener('load', () => {
      csvText.value = fr.result as string;
      csv2xy(csvText.value);
    });
  }
};

const remove = () => {
  reset();
};

const dragover = (event: DragEvent) => {
  event.preventDefault();
  boxColor.value = '#c4c4c4';
};

const dragleave = (event: DragEvent) => {
  boxColor.value = '#e3e3e3';
};

const drop = (event: DragEvent) => {
  event.preventDefault();
  boxColor.value = '#97fc83';
  if (myUpload.value && event.dataTransfer) {
    myUpload.value.files = event.dataTransfer.files;
    onChange(); // Trigger the onChange event manually
  }
};

const csv2xy = (csvText: string) => {
  const rows = csvText.split(/\r\n|\r|\n/);
  const length = rows.length - 1;
  const dataArray: DataPoint[] = [];
  let xlabelValue = '';
  let ylabelValue = '';

  [xlabelValue, ylabelValue] = rows[0].split(',');

  for (let i = 1; i < length; ++i) {
    const rowV = rows[i].split(',');
    dataArray.push({
      x: +rowV[0],
      y: +rowV[1],
    });
  }

  xlabel.value = xlabelValue;
  ylabel.value = ylabelValue;
  data.value = dataArray;
};

// Watchers
watch(data, (newData) => {
  if (newData.length > 0) {
    console.log('xlabel: ' + xlabel.value);
    console.log('ylabel: ' + ylabel.value);
    console.log(newData[0].x);
    console.log(newData[0].y);
    console.log(newData);
    console.log('watch run');
    dataset.value = {
      data: newData,
      xlabel: xlabel.value,
      ylabel: ylabel.value,
    };
  }
});

// Lifecycle hooks
onMounted(() => {
  store.commit('setAppHeaderInfo', { icon: 'workspaces', name: 'Curation Plot' });
});
</script>

<style scoped>
/* Component-specific styles can be added here if needed */
</style>
