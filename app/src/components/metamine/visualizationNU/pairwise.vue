<template>
  <!-- D3 plot container -->
  <div ref="pairwisePlot"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as d3 from 'd3';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { organizeByName } from '@/modules/metamine/utils/organizeByName';
import { requiredColumns } from '@/components/metamine/visualizationNU/constants';

// === STATIC CONSTANTS ===
const margin = { top: 10, right: 20, bottom: 50, left: 100 };
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
let wFactor = vw <= 1280 ? 0.9 : 0.48;
const widthDefault = vw * wFactor;
const padding = 20;

function expo(x: number, f?: number) {
  if (x < 1000 && x > -1000) return x;
  return Number(x).toExponential(f);
}

// === REFS & STORE ===
const pairwisePlot = ref<HTMLDivElement | null>(null);
const store = useStore();
const router = useRouter();

// === VUEX STATES ===
const csvData = computed(() => store.state.metamineNU.datasets);
const activeData = computed(() => store.state.metamineNU.activeData);
const dataPoint = computed(() => store.state.metamineNU.dataPoint);
const fetchedNames = computed(() => store.state.metamineNU.fetchedNames);

// === WIDTH/HEIGHT ===
// mainChart is looked up by id just like old computed
const mainChart = computed(() => document.getElementById('main_chart'));
const width = computed(() => mainChart.value?.offsetWidth ?? widthDefault);
const height = computed(() => width.value); // matches old `height = width`

// === LOCAL STATE (replaces data()) ===
const chart = ref(false);
const svg = ref<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
const cell = ref<d3.Selection<SVGGElement, any, any, any> | null>(null);

// store cell dimension
const cellWidth = ref(0);
const cellHeight = ref(0);

// also hold mapping arrays
const X = ref<any[]>([]);
const Y = ref<any[]>([]);
const Z = ref<any[]>([]);
const zDomain = ref<any>(null);

// === CREATE SVG ===
function createSvg({ container, columns }: { container: HTMLElement; columns: string[] }) {
  const data = activeData.value;
  const x = columns;
  const y = columns;
  const z = () => 1;
  let _zDomain: any = undefined;
  const fillOpacity = 0.7;

  // Compute values
  const Xmap = d3.map(x, (x) => d3.map(data, typeof x === 'function' ? x : (d: any) => +d[x]));
  const Ymap = d3.map(y, (y) => d3.map(data, typeof y === 'function' ? y : (d: any) => +d[y]));
  const Zmap = d3.map(data, z);

  if (_zDomain === undefined) _zDomain = Zmap;
  _zDomain = new d3.InternSet(_zDomain);

  const _svg = d3
    .select(container)
    .append('svg')
    .attr('width', width.value)
    .attr('height', height.value)
    .attr('viewBox', [-margin.left, -margin.top, width.value, height.value])
    .attr('style', 'max-width: 100%;');

  const _cellWidth =
    (width.value - margin.left - margin.right - (Xmap.length - 1) * padding) / Xmap.length;
  const _cellHeight =
    (height.value - margin.top - margin.bottom - (Ymap.length - 1) * padding) / Ymap.length;

  const _cell = _svg
    .append('g')
    .selectAll('g')
    .data(d3.cross(d3.range(Xmap.length), d3.range(Ymap.length)))
    .join('g')
    .attr('fill-opacity', fillOpacity)
    .attr(
      'transform',
      ([i, j]) => `translate(${i * (_cellWidth + padding)},${j * (_cellHeight + padding)})`
    );

  _cell
    .append('rect')
    .attr('fill', 'white')
    .attr('stroke', 'grey')
    .attr('stroke-width', 2)
    .attr('width', _cellWidth)
    .attr('height', _cellHeight)
    .attr('class', 'cell');

  if (x === y) {
    _svg
      .append('g')
      .attr('font-size', 14)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .selectAll('text')
      .data(x)
      .join('text')
      .attr(
        'transform',
        (d, i) =>
          `translate(${0 - margin.left + padding * 1.5},${
            i * (_cellHeight + padding) + margin.top * 6
          }) rotate(270)`
      )
      .attr('x', padding / 2)
      .attr('y', padding / 2)
      .attr('dy', '.71em')
      .text((d) => d);
  }

  if (x === y) {
    _svg
      .append('g')
      .attr('font-size', 14)
      .attr('font-family', 'sans-serif')
      .attr('font-weight', 'bold')
      .selectAll('text')
      .data(y)
      .join('text')
      .attr(
        'transform',
        (d, i) =>
          `translate(${i * (_cellWidth + padding)},${
            _cellHeight * 6 + margin.bottom + padding * 4
          })`
      )
      .attr('x', padding / 2)
      .attr('y', padding / 2)
      .text((d) => d);
  }

  // assign local reactive refs
  chart.value = true;
  svg.value = _svg;
  cell.value = _cell;
  cellWidth.value = _cellWidth;
  cellHeight.value = _cellHeight;
  X.value = Xmap;
  Y.value = Ymap;
  Z.value = Zmap;
  zDomain.value = _zDomain;

  // call update after svg creation
  update({
    columns,
    container,
    maxNumDatasets: fetchedNames.value.length,
    router,
  });
}

// === RENDER AXIS ===
function renderAxis(
  {
    data,
    columns = data.columns,
    x = columns,
    y = columns,
    z = () => 1,
    xType = d3.scaleLinear,
    yType = d3.scaleLinear,
    zDomain,
  } = {} as any
) {
  if (!svg.value) return;

  const Xmap = d3.map(x, (x) => d3.map(data, typeof x === 'function' ? x : (d: any) => +d[x]));
  const Ymap = d3.map(y, (y) => d3.map(data, typeof y === 'function' ? y : (d: any) => +d[y]));
  const Zmap = d3.map(data, z);

  if (zDomain === undefined) zDomain = Zmap;
  zDomain = new d3.InternSet(zDomain);

  const _cellWidth =
    (width.value - margin.left - margin.right - (Xmap.length - 1) * padding) / Xmap.length;
  const _cellHeight =
    (height.value - margin.top - margin.bottom - (Ymap.length - 1) * padding) / Ymap.length;

  const xScales = Xmap.map((X) => xType(d3.extent(X), [0, _cellWidth]));
  const yScales = Ymap.map((Y) => yType(d3.extent(Y), [_cellHeight, 0]));
  const xAxis = d3
    .axisBottom()
    .tickFormat((x: any) => `${expo(x, 0)}`)
    .ticks(3);
  const yAxis = d3
    .axisLeft()
    .tickFormat((x: any) => `${expo(x, 0)}`)
    .ticks(3);

  svg.value
    .append('g')
    .selectAll('g')
    .data(yScales)
    .join('g')
    .attr('transform', (d, i) => `translate(0,${i * (_cellHeight + padding)})`)
    .attr('class', 'yAxisGroup')
    .each(function (yScale) {
      d3.select(this).call(yAxis.scale(yScale));
    });

  svg.value
    .append('g')
    .selectAll('.xAxisGroup')
    .data(xScales)
    .join('g')
    .attr(
      'transform',
      (d, i) =>
        `translate(${i * (_cellWidth + padding)}, ${height.value - margin.bottom - margin.top})`
    )
    .attr('class', 'xAxisGroup')
    .each(function (xScale) {
      d3.select(this).call(xAxis.scale(xScale));
    });
}

// === UPDATE ===
function update({
  columns,
  x = columns,
  y = columns,
  z = () => 1,
  height: h = width.value,
  xType = d3.scaleLinear,
  yType = d3.scaleLinear,
  zDomain,
  router,
  colors = {},
  container,
  maxNumDatasets,
}: any) {
  if (!cell.value || !svg.value || !container) return;

  // ... keep same code from original update() replacing `this.` with refs
  // d3 event handlers use store.commit(...) instead of this.$store

  // After computing, use svg.value & cell.value

  // Clean old
  d3.selectAll('.xAxisGroup,.yAxisGroup,.legend,.tooltip_circ,.tooltip_hist').remove();
  for (let i = 0; i < maxNumDatasets; i++) {
    d3.selectAll('.group' + i).remove();
  }

  const datasets: any[] = [];
  const datasetDic: Record<number, string> = {};
  for (let i = 0; i < maxNumDatasets; i++) datasets.push([]);
  const data = activeData.value;
  const organizedData = organizeByName(data);
  organizedData.map((d: any, i: number) => {
    colors[d.name] = d.color;
    datasets[i] = d.data ?? [];
    datasetDic[i] = d.name;
  });
  const finalData = [].concat(...datasets);

  // render axis like old
  renderAxis({
    data: finalData,
    columns: requiredColumns.filter((col) =>
      ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col)
    ),
    colors: data.color,
    container,
  });

  // ... keep full d3 scatter + hist logic same, just referencing router, store.commit, etc.
}

// === WATCHERS ===
watch(
  () => activeData.value,
  () => {
    if (pairwisePlot.value) {
      update({
        columns: requiredColumns.filter((col) =>
          ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col)
        ),
        container: pairwisePlot.value,
        maxNumDatasets: fetchedNames.value.length,
        router,
      });
    }
  },
  { deep: true }
);

watch(
  () => dataPoint.value,
  (newVal) => {
    store.commit('metamineNU/setDataPoint', newVal, { root: true });
  }
);

// === MOUNT ===
onMounted(() => {
  store.commit('metamineNU/setPage', 'pairwise', { root: true });
  if (pairwisePlot.value) {
    createSvg({
      container: pairwisePlot.value,
      columns: requiredColumns.filter((col) =>
        ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col)
      ),
    });
  }
});
</script>
