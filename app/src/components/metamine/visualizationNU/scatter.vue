<template>
  <div ref="scatterPlot"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as d3 from 'd3';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import {
  nnColorAssignment,
  requiredColumns,
} from '@/components/metamine/visualizationNU/constants';

// === CONSTANTS ===
const circleOriginalSize = 5;
const circleFocusSize = 8;

const MARGIN = { TOP: 0, RIGHT: 50, BOTTOM: 20, LEFT: 50 };
const vw = window.innerWidth || 800;
let wFactor = vw <= 1280 ? 1 : 0.55;
const SIDE_BAR_SIZE = 100;

const WIDTH = vw * wFactor - MARGIN.LEFT - MARGIN.RIGHT - SIDE_BAR_SIZE;
const HEIGHT = vw * wFactor - 100 - MARGIN.TOP - MARGIN.BOTTOM - SIDE_BAR_SIZE;

function expo(x: number, f?: number) {
  if (x < 1000 && x > -1000) return x;
  return Number(x).toExponential(f);
}

function isBrushed(brushCoords: [[number, number], [number, number]], cx: number, cy: number) {
  const [[x0, y0], [x1, y1]] = brushCoords;
  return x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1;
}

// === STORE & REFS ===
const store = useStore();
const scatterPlot = ref<HTMLDivElement | null>(null);

// Vuex computed state
const csvData = computed(() => store.state.metamineNU.datasets);
const activeData = computed(() => store.state.metamineNU.activeData);
const dataPoint = computed(() => store.state.metamineNU.dataPoint);
const fetchedNames = computed(() => store.state.metamineNU.fetchedNames);
const selectedData = computed(() => store.state.metamineNU.selectedData);
const query1 = computed(() => store.state.metamineNU.query1);
const query2 = computed(() => store.state.metamineNU.query2);
const reset = computed(() => store.state.metamineNU.reset);
const enableKnn = computed(() => store.state.metamineNU.enableKnn);

// D3 refs (replaces this.*)
const chart = ref(false);
const svg = ref<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
const xAxisGroup = ref<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
const yAxisGroup = ref<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);
const xLabel = ref<d3.Selection<SVGTextElement, unknown, null, undefined> | null>(null);
const yLabel = ref<d3.Selection<SVGTextElement, unknown, null, undefined> | null>(null);
const xScaleForBrush = ref<any>(null);
const yScaleForBrush = ref<any>(null);

// === CREATE SVG ===
function createSvg(container: HTMLElement) {
  const _svg = d3
    .select(container)
    .append('svg')
    .attr('width', WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
    .attr('height', HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
    .attr(
      'viewBox',
      `${-MARGIN.LEFT} ${-MARGIN.TOP} ${WIDTH + MARGIN.LEFT + MARGIN.RIGHT} ${
        HEIGHT + MARGIN.TOP + MARGIN.BOTTOM
      }`
    )
    .attr('style', 'max-width: 100%; overflow: visible;');

  // Brush container
  _svg.append('g').attr('class', 'brush');

  // Labels
  const _xLabel = _svg
    .append('text')
    .attr('x', WIDTH / 2)
    .attr('y', HEIGHT + 50)
    .attr('text-anchor', 'middle')
    .style('fill', 'black');

  const _yLabel = _svg
    .append('text')
    .attr('x', -HEIGHT / 2)
    .attr('y', -60)
    .attr('text-anchor', 'middle')
    .attr('transform', 'rotate(-90)')
    .style('fill', 'black');

  const _xAxisGroup = _svg.append('g').attr('transform', `translate(0,${HEIGHT})`);
  const _yAxisGroup = _svg.append('g');

  svg.value = _svg;
  xLabel.value = _xLabel;
  yLabel.value = _yLabel;
  xAxisGroup.value = _xAxisGroup;
  yAxisGroup.value = _yAxisGroup;
  chart.value = true;

  xScaleForBrush.value = null;
  yScaleForBrush.value = null;
}

// === UPDATE FUNCTION ===
function update(container: HTMLElement) {
  if (!svg.value) return;

  const data = activeData.value;
  const finalData = [].concat(...data);
  const q1 = query1.value;
  const q2 = query2.value;

  // Remove old elements
  d3.selectAll('.legend').remove();
  d3.select('.nuplot-tooltip').remove();
  d3.selectAll('.dataCircle').remove();
  d3.selectAll('defs').remove();
  d3.selectAll('.clipPath').remove();

  const yScale = d3
    .scaleLinear()
    .domain([d3.min(finalData, (d: any) => d[q2]), d3.max(finalData, (d: any) => d[q2])])
    .range([HEIGHT, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([d3.min(finalData, (d: any) => d[q1]), d3.max(finalData, (d: any) => d[q1])])
    .range([0, WIDTH]);

  xScaleForBrush.value = xScale;
  yScaleForBrush.value = yScale;

  svg.value
    .append('defs')
    .append('SVG:clipPath')
    .attr('id', 'clip')
    .append('SVG:rect')
    .attr('width', WIDTH)
    .attr('height', HEIGHT)
    .attr('x', 0)
    .attr('y', 0);

  const xAxisCall = d3.axisBottom(xScale).tickFormat((x: any) => `${expo(x, 2)}`);
  const yAxisCall = d3.axisLeft(yScale).tickFormat((y: any) => `${expo(y, 2)}`);

  xAxisGroup.value!.transition().duration(500).call(xAxisCall);
  yAxisGroup.value!.transition().duration(500).call(yAxisCall);

  xLabel.value!.text(q1);
  yLabel.value!.text(q2);

  const tooltip = d3
    .select(container)
    .append('div')
    .attr('class', 'nuplot-tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '1px')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('visibility', 'hidden')
    .style('z-index', 100);

  const mouseover = (e: any, d: any) => {
    d3.select(e.currentTarget)
      .attr('r', circleFocusSize)
      .style('stroke', 'black')
      .style('stroke-width', 2)
      .style('fill-opacity', 1);
    store.commit('metamineNU/setDataPoint', d, { root: true });
    tooltip.style('visibility', 'visible').transition().duration(200);
  };

  const mousemove = (e: any, d: any) => {
    tooltip
      .html(
        `Dataset: ${d.name}<br>symmetry: ${d.symmetry}<br>C11: ${d.C11}<br>C12: ${d.C12}<br>C22: ${d.C22}<br>C16: ${d.C16}<br>C26: ${d.C26}<br>C66: ${d.C66}`
      )
      .style('top', `${e.pageY + 10}px`)
      .style('left', `${e.pageX + 10}px`);
  };

  const mouseleave = (e: any, d: any) => {
    tooltip.style('visibility', 'hidden').transition().duration(200);
    const circle = d3.select(e.currentTarget);
    circle
      .attr('r', circle.classed('scatter-highlighted') ? circleFocusSize : circleOriginalSize)
      .style('stroke', 'none')
      .style('stroke-width', 2)
      .style('fill-opacity', 0.8);
  };

  const mousedown = (e: any, d: any) => {
    const inputData = requiredColumns
      .filter((col) => ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col))
      .map((c) => d[c]);
    const target = d3.select(e.currentTarget);
    target.classed('nuplot-selected', !target.classed('nuplot-selected'));

    const selected: any[] = [];
    d3.selectAll('.nuplot-selected').each((datum: any) => selected.push(datum));
    store.commit('metamineNU/setSelectedData', selected, { root: true });

    target.classed('nuplot-selected', true);

    if (enableKnn.value) {
      getKnnData(inputData, finalData).then((res) => {
        const { indices, distances } = res;
        d3.selectAll('.dataCircle')
          .data(finalData)
          .classed('nuplot-highlighted', (datum) => indices.includes(finalData.indexOf(datum)));
        d3.selectAll('.dataCircle').classed('nuplot-masked', function (datum: any) {
          return !this.getAttribute('class')!.includes('nuplot-highlighted');
        });

        const neighborElements = d3.selectAll('.nuplot-highlighted');
        const masked = d3.selectAll('.nuplot-masked');
        masked
          .attr('fill', (d: any) => d.color)
          .attr('r', circleOriginalSize)
          .classed('nuplot-selected', false);

        const neighbors: any[] = [];
        neighborElements.each((datum: any, i: number) => {
          datum.outline_color = nnColorAssignment[i];
          datum.distance = distances[indices.indexOf(finalData.indexOf(datum))];
          neighbors.push(datum);
        });
        neighbors.sort((a, b) => a.distance - b.distance);
        neighborElements.attr('fill', (d: any) => d.outline_color).attr('r', circleFocusSize);

        store.commit('metamineNU/setNeighbors', neighbors);
        store.commit('metamineNU/setDialogBoxActiveKnn', true);
      });
    }
  };

  const chartExtent: [[number, number], [number, number]] = [
    [0, 0],
    [WIDTH, HEIGHT],
  ];

  const zoom = d3
    .zoom()
    .scaleExtent([0.1, 20])
    .translateExtent(chartExtent)
    .extent(chartExtent)
    .on('zoom', (event: any) => {
      const newXScale = event.transform.rescaleX(xScale);
      const newYScale = event.transform.rescaleY(yScale);

      const xAxisCall = d3.axisBottom(newXScale).tickFormat((x: any) => `${expo(x, 2)}`);
      const yAxisCall = d3.axisLeft(newYScale).tickFormat((y: any) => `${expo(y, 2)}`);

      xAxisGroup.value!.transition().duration(500).call(xAxisCall);
      yAxisGroup.value!.transition().duration(500).call(yAxisCall);

      xScaleForBrush.value = newXScale;
      yScaleForBrush.value = newYScale;

      d3.selectAll('.dataCircle')
        .data(finalData)
        .attr('cy', (d: any) => newYScale(d[q2]))
        .attr('cx', (d: any) => newXScale(d[q1]));
    });

  const brush = d3.brush().on('brush end', (event: any) => {
    if (event.sourceEvent?.type === 'zoom') return;
    if (event.selection) {
      const _xScale = xScaleForBrush.value;
      const _yScale = yScaleForBrush.value;
      d3.selectAll('.dataCircle')
        .data(finalData)
        .classed('nuplot-selected', function (d: any) {
          return (
            d3.select(this).classed('nuplot-selected') ||
            isBrushed(event.selection, _xScale(d[q1]), _yScale(d[q2]))
          );
        });
    }
    const selected: any[] = [];
    d3.selectAll('.nuplot-selected').each((datum: any) => selected.push(datum));
    store.commit('metamineNU/setSelectedData', selected);
  });

  svg.value!.select('g.brush').call(brush).on('wheel.zoom', null);
  svg.value!.call(zoom).on('mousedown.zoom', null);

  const circles = svg
    .value!.append('g')
    .attr('clip-path', 'url(#clip)')
    .attr('class', 'clipPath')
    .selectAll('.dataCircle')
    .data(finalData);

  circles.exit().transition().attr('r', 0).remove();
  circles
    .enter()
    .append('circle')
    .merge(circles as any)
    .attr('r', circleOriginalSize)
    .attr('class', 'dataCircle')
    .attr('fill', (d: any) => d.color)
    .classed('nuplot-selected', (d: any) => selectedData.value.includes(d))
    .style('stroke', 'none')
    .style('stroke-width', 2)
    .style('fill-opacity', 0.8)
    .on('mousedown', mousedown)
    .on('mouseover', mouseover)
    .on('mousemove', mousemove)
    .on('mouseleave', mouseleave)
    .attr('cx', (d: any) => xScale(d[q1]))
    .attr('cy', (d: any) => yScale(d[q2]));

  if (reset.value) {
    svg.value!.call(zoom.transform, d3.zoomIdentity);
    d3.selectAll('.nuplot-selected').classed('nuplot-selected', false);
    store.commit('metamineNU/setSelectedData', []);
    store.commit('metamineNU/setReset', false);
  }
}

// === KNN DATA FETCH ===
async function getKnnData(dataPoint: any, data: any[]) {
  const url = 'https://metamaterials-srv.northwestern.edu/model/';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({
      dataPoint: [dataPoint],
      data: data.map((d) =>
        requiredColumns
          .filter((col) => ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col))
          .map((col) => d[col])
      ),
    }),
  }).catch((err) => {
    alert(err.message);
  });
  const { distances, indices } = await response!.json();
  return { distances, indices };
}

// === WATCHERS ===
watch(
  () => csvData.value,
  () => scatterPlot.value && update(scatterPlot.value),
  { deep: true }
);
watch(
  () => activeData.value,
  () => {
    if (svg.value && scatterPlot.value) update(scatterPlot.value);
  },
  { deep: true }
);
watch(
  () => fetchedNames.value,
  () => scatterPlot.value && update(scatterPlot.value)
);
watch(
  () => dataPoint.value,
  (newVal) => {
    store.commit('metamineNU/setDataPoint', newVal, { root: true });
  }
);
watch(
  () => query1.value,
  (newVal) => {
    if (svg.value && scatterPlot.value) update(scatterPlot.value);
  }
);
watch(
  () => query2.value,
  (newVal) => {
    if (svg.value && scatterPlot.value) update(scatterPlot.value);
  }
);
watch(
  () => reset.value,
  () => scatterPlot.value && svg.value && update(scatterPlot.value)
);
watch(
  () => enableKnn.value,
  () => scatterPlot.value && svg.value && update(scatterPlot.value)
);

// === MOUNT ===
onMounted(() => {
  store.commit('metamineNU/setPage', 'scatter', { root: true });
  if (scatterPlot.value) {
    createSvg(scatterPlot.value);
    update(scatterPlot.value);
  }
});
</script>
