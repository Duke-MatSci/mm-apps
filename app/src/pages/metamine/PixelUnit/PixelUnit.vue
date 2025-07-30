<template>
  <div class="main tool_page pixelunit wrapper">
    <div class="md-layout md-alignment-top-left md-gutter adjust-padding">
      <div class="md-layout-item md-size-100">
        <h2>
          Data from Caltech and Duke composed of 32K simulated results for static and dynamic
          analysis.
        </h2>
        <p>
          Click pixels to create a geometry configuration and view the result for the selected
          geometry.
        </p>
        <p>
          Default material is Stratasys Vero White (Poisson's Ratio 0.33, Young's Modulus 2e9 Pa)
          and selectable material is Stratasys Tango Black (Poisson's Ratio 0.33, Young's Modulus
          2e6 Pa).
        </p>
      </div>
      <div class="md-layout-item md-size-100 md-layout md-alignment-top-left md-gutter">
        <md-button class="md-layout-item md-size-10 md-primary" @click="handleReset()"
          >Reset</md-button
        >
      </div>
      <div class="md-layout-item md-size-35 md-small-size-100" style="min-width: 310px">
        <canvas id="unit-cell" ref="unitCellRef" width="300" height="300"></canvas>
      </div>

      <div class="md-layout-item md-size-60 md-small-size-100 md-layout md-gutter">
        <md-content class="md-primary md-layout-item md-size-100">
          <h2>Geometry Details</h2>
        </md-content>
        <md-card v-for="item of geometryItems" class="md-layout-item" :key="item.name">
          <md-card-header class="md-subheading">{{ item.name }}</md-card-header>
          <md-divider></md-divider>
          <md-card-content>{{ item.value }}</md-card-content>
        </md-card>
      </div>

      <div class="md-layout-item md-size-100 md-layout md-gutter">
        <md-content class="md-primary md-layout-item md-size-100">
          <h2>Bandgap Values</h2>
        </md-content>
        <md-table v-model="bgPairs" md-card>
          <md-table-row>
            <md-table-head>SH</md-table-head>
            <md-table-head>PSV</md-table-head>
          </md-table-row>

          <md-table-row v-for="(bgPair, index) of bgPairs" :key="index">
            <md-table-cell>{{ getBgValue(bgPair.sh) }}</md-table-cell>
            <md-table-cell>{{ getBgValue(bgPair.psv) }}</md-table-cell>
          </md-table-row>
        </md-table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import PixelUnit from '@/modules/PixelUnit';

defineOptions({ name: 'PixelUnit' });

interface GeometryItem {
  name: string;
  value: string;
}

interface BgPair {
  sh: number;
  psv: number;
  id?: number;
}

const store = useStore();

// Reactive data
const errorMsg = ref('');
const msg = ref('C4v 10 x 10 Geometry Explorer');
const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);
const borderColor = ref('black');
const setColor = ref('red');
const resetColor = ref('#c0c0c0');
const bgColor = ref('rgb(192,192,192)');
const lw = ref(4);
const pixels = ref(null);
const size = ref(10); // default to 10x10 matrix
const pixelStrElem = ref(null);
const matlabStr = ref('');
const effYmStr = ref('');
const effPrStr = ref('');
const psvStr = ref('');
const shStr = ref('');
const bgPairs = ref<BgPair[]>([
  { sh: 0, psv: 1 },
  { sh: 2, psv: 3 },
  { sh: 4, psv: 5 },
  { sh: 6, psv: 7 },
]);
const rowsPerPageItems = ref([4, 8, 12]);
const pagination = ref({
  rowsPerPage: 4,
});
const geometry = ref('');
const geometryItems = ref<GeometryItem[]>([
  {
    name: 'Geometry',
    value: '',
  },
  {
    name: "Effective Young's Modulus (Pa)",
    value: '',
  },
  {
    name: "Effective Poisson's ratio",
    value: '',
  },
]);
const bgItems = ref([
  {
    name: 'SH',
  },
  {
    name: 'PSV',
  },
]);

// Template refs
const unitCellRef = ref<HTMLCanvasElement>();

// PixelUnit instance
let pixelUnit: any = null;

// Callback functions for PixelUnit
const onPixelSet = (pos: any) => {
  // Handle pixel set event if needed
};

const onPixelReset = (pos: any) => {
  // Handle pixel reset event if needed
};

// Methods
const onGeometryEntered = () => {
  pixelUnit.setMatlabString(geometry.value);
};

const updateFields = () => {
  showMatlabString();
  showPSVString();
  showSHString();
  updateBgPairs();
  showYoungsModulusString();
  showPoissonsRatioString();
};

const getBgValue = (s: number) => {
  let v = Number.parseFloat(s.toString()).toFixed(8);
  if (v === 'NaN' || v === 'Infinity') {
    v = 'N/A';
  }
  return v;
};

const handleReset = () => {
  size.value = 10;
  pixelUnit.clearCanvas();
  pixelUnit.drawGrid();
  pixelUnit.resetPixels();
  updateFields();
};

const updateBgPairs = () => {
  const psv = pixelUnit.getPsv();
  const sh = pixelUnit.getSh();
  bgPairs.value = [];
  psv.forEach((v: number, idx: number) => {
    const p = { id: idx, sh: sh[idx], psv: v };
    bgPairs.value.push(p);
  });
};

const showMatlabString = () => {
  matlabStr.value = pixelUnit.getMatlabString();
  geometryItems.value[0].value = matlabStr.value;
};

const showPSVString = () => {
  psvStr.value = pixelUnit.getPsvString();
};

const showSHString = () => {
  shStr.value = pixelUnit.getShString();
};

const showYoungsModulusString = () => {
  effYmStr.value = pixelUnit.getYmString();
  geometryItems.value[1].value = effYmStr.value;
};

const showPoissonsRatioString = () => {
  effPrStr.value = pixelUnit.getPrString();
  geometryItems.value[2].value = effPrStr.value;
};

// Lifecycle
onBeforeMount(() => {
  store.commit('setAppHeaderInfo', {
    icon: 'scatter_plot',
    name: 'Geometry Explorer',
  });
});

onMounted(() => {
  if (!unitCellRef.value) return;

  canvas.value = unitCellRef.value;
  ctx.value = canvas.value.getContext('2d')!;
  lw.value = 4; // line width

  canvas.value.addEventListener('click', (ev) => {
    const pixel = pixelUnit.pt2pixel(ev.layerX, ev.layerY);
    pixelUnit.handleClick(pixel);
    updateFields();
  });

  fetch(
    'https://materialsmine.org/nmstatic/metamine/lin-bilal-liu-10x10-c4v-15bit-static-dynamic.txt'
  )
    .then((data) => data.text())
    .then((text) => {
      if (!canvas.value || !ctx.value) return;

      pixelUnit = new PixelUnit(
        text,
        canvas.value,
        ctx.value,
        size.value,
        lw.value,
        borderColor.value,
        setColor.value,
        resetColor.value,
        onPixelSet,
        onPixelReset,
        'C4v'
      );
      pixelUnit.drawGrid();
      updateFields();
    })
    .catch((err) => {
      errorMsg.value = err.message;
    });
});
</script>
