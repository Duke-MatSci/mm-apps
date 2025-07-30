<template>
  <div ref="histogramPlot"></div>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import * as d3 from 'd3';
import { ref, computed, watch, onMounted } from 'vue';
import { useStore } from 'vuex';
import { organizeByName } from '@/modules/metamine/utils/organizeByName';
import { requiredColumns } from '@/components/metamine/visualizationNU/constants';

const padding = 10;
const marginTop = 0;
const marginRight = 0;
const marginBottom = 0;
const marginLeft = 0;
const width = 968;
const columns = requiredColumns.filter((col) =>
  ['C11', 'C12', 'C22', 'C16', 'C26', 'C66'].includes(col)
);

function expo(x: number, f?: number) {
  if (x < 1000 && x > -1000) return x;
  return Number(x).toExponential(f);
}

// === STORE ===
const store = useStore();

// === VUEX STATE ===
const activeData = computed(() => store.state.metamineNU.activeData);
const fetchedNames = computed(() => store.state.metamineNU.fetchedNames);
const dataPoint = computed(() => store.state.metamineNU.dataPoint);
const query1 = computed(() => store.state.metamineNU.query1);

// === REFS ===
const histogramPlot = ref<HTMLDivElement | null>(null);
const svg = ref<d3.Selection<SVGSVGElement, unknown, null, undefined> | null>(null);
const cell = ref<d3.Selection<SVGGElement, [number, number], SVGGElement, unknown> | null>(null);
const cellWidth = ref<number>(0);
const cellHeight = ref<number>(0);
const chartReady = ref(false);

// === CREATE SVG ===
function createSvg(container: HTMLElement) {
  const data = activeData.value;
  const x = columns;
  const y = columns;
  const z = () => 1;
  let zDomain: any;

  const X = d3.map(x, (xCol) => d3.map(data, (d) => +d[xCol]));
  const Y = d3.map(y, (yCol) => d3.map(data, (d) => +d[yCol]));
  const Z = d3.map(data, z);

  if (!zDomain) zDomain = Z;
  zDomain = new d3.InternSet(zDomain);

  const h = width;
  const cWidth = (width - marginLeft - marginRight - (X.length - 1) * padding) / X.length;
  const cHeight = (h - marginTop - marginBottom - (Y.length - 1) * padding) / Y.length;

  const _svg = d3
    .select(container)
    .append('svg')
    .attr('width', width)
    .attr('height', h)
    .attr('viewBox', [padding * 2, padding * 5, width, h + padding * 13])
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;');

  const _cell = _svg
    .append('g')
    .selectAll('g')
    .data(d3.cross(d3.range(X.length), d3.range(Y.length)))
    .join('g')
    .attr('fill-opacity', 0.7)
    .attr('transform', `translate(${cWidth + padding},${cHeight - 2 * marginBottom})`);

  svg.value = _svg;
  cell.value = _cell;
  cellWidth.value = cWidth;
  cellHeight.value = cHeight;
  chartReady.value = true;
}

// === UPDATE HISTOGRAM ===
function update(container: HTMLElement, maxNumDatasets: number) {
  if (!svg.value || !cell.value) return;

  const q = query1.value;
  const index = columns.indexOf(q);

  const datasets: any[] = [];
  const datasetDic: Record<number, string> = {};
  const tooltipInfo: any[] = [];
  const colors: Record<string, string> = {};

  for (let i = 0; i < maxNumDatasets; i++) datasets.push([]);

  const organizedData = organizeByName(activeData.value);
  organizedData.forEach((d, i) => {
    colors[d.name] = d.color;
    datasets[i] = d.data ? d.data : [];
    datasetDic[i] = d.name;
  });

  const finalData = ([] as any[]).concat(...datasets);

  // cleanup before update
  d3.selectAll('.xAxisGroup').remove();
  d3.selectAll('.yAxisGroup').remove();
  d3.selectAll('.legend').remove();
  d3.selectAll('.tooltip_hist').remove();
  d3.selectAll('.x-label').remove();
  d3.selectAll('.y-label').remove();
  for (let i = 0; i < maxNumDatasets; i++) {
    d3.selectAll('.group' + i).remove();
    d3.selectAll('.mean-line' + i).remove();
  }

  const mouseleaveRec = function (this: any) {
    d3.select(this).style('stroke', 'grey').style('stroke-width', 0).style('fill-opacity', 0.8);
  };

  const mouseoverHist = function (this: any) {
    d3.select(this)
      .raise()
      .style('stroke', 'black')
      .style('stroke-width', 5)
      .style('fill-opacity', 1);
  };

  const x = columns;
  const y = columns;
  const z = () => 1;
  let zDomain: any;

  const X = d3.map(x, (xCol) => d3.map(finalData, (d) => +d[xCol]));
  const Y = d3.map(y, (yCol) => d3.map(finalData, (d) => +d[yCol]));
  const Z = d3.map(finalData, z);
  if (!zDomain) zDomain = Z;
  zDomain = new d3.InternSet(zDomain);

  const cWidth = width - marginRight - (X.length - 1) * padding;
  const cHeight = width - marginTop - marginBottom - (Y.length - 1) * padding;
  const xScales = X.map((XCol) => d3.scaleLinear(d3.extent(XCol) as [number, number], [0, cWidth]));

  const allBins: any[] = [];

  cell.value.each(function ([xIdx, yIdx]) {
    if (xIdx === index && yIdx === index) {
      d3.select(this)
        .append('g')
        .attr('id', `${q}`)
        .attr('class', 'x-label')
        .attr('font-size', 20)
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold')
        .selectAll('text')
        .data([columns[index]])
        .join('text')
        .attr('transform', () => `translate(${width / 3},${width + padding * 2})`)
        .attr('x', padding / 2)
        .attr('y', padding / 2)
        .text((d) => d);

      d3.select(this)
        .append('g')
        .attr('class', 'y-label')
        .attr('font-size', 20)
        .attr('font-family', 'sans-serif')
        .attr('font-weight', 'bold')
        .selectAll('text')
        .data(['Frequency'])
        .join('text')
        .attr(
          'transform',
          `translate(${-width / 10 - padding * 6},${cHeight / 2 + padding}) rotate(270)`
        )
        .attr('x', padding / 2)
        .attr('y', padding / 2)
        .text((d) => d);

      for (let i = 0; i < maxNumDatasets; i++) {
        const a = columns;
        const b = columns;
        const X0 = d3.map(a, (aCol) => d3.map(datasets[i], (d) => +d[aCol]));
        let Y0 = d3.map(b, (bCol) => d3.map(datasets[i], (d) => +d[bCol]));
        const Z = d3.map(datasets[i], z);
        const I0 = d3.range(Z.length).filter((ii) => zDomain.has(Z[ii]));

        const thresholds = 40;
        Y0 = d3.map(Y0[index], () => 1);
        const bins = d3
          .bin<number>()
          .thresholds(thresholds)
          .value((ii) => X0[index][ii])(I0);
        allBins.push(...bins);

        const tooltipTemp: any = {};
        if (organizedData[i]) {
          const tempArr = organizedData[i].data.map((d) => d[q]);
          tooltipTemp.name = organizedData[i].name;
          tooltipTemp.color = organizedData[i].color;
          tooltipTemp.min = d3.min(tempArr);
          tooltipTemp.max = d3.max(tempArr);
          tooltipTemp.mean = d3.mean(tempArr);
          tooltipTemp.median = d3.median(tempArr);
          tooltipInfo.push(tooltipTemp);
        }

        const Y1 = Array.from(bins, (bin) => d3.sum(bin, (ii) => Y0[ii]));
        const xDomain = [bins[0].x0, bins[bins.length - 1].x1];
        const yDomain = [0, d3.max(Y1)];
        const xScale = d3.scaleLinear(xDomain as [number, number], [0, cWidth]);
        const yScale = d3.scaleLinear(yDomain as [number, number], [cHeight, 0]);

        const insetLeft = 0.5;
        const insetRight = 0.5;

        if (datasets[i].length === 0) {
          d3.selectAll('.group' + i).remove();
        } else {
          const histogram = d3
            .select(this)
            .append('g')
            .attr('class', 'group' + i);
          histogram
            .selectAll('rect')
            .data(bins)
            .join('rect')
            .attr('fill', colors[datasetDic[i]])
            .attr('x', (bin) => xScale(bin.x0 as number) + insetLeft)
            .attr('width', (bin) =>
              bins.length === 1
                ? 5
                : Math.max(
                    0,
                    xScale(bin.x1 as number) - xScale(bin.x0 as number) - insetLeft - insetRight
                  )
            )
            .attr('y', (_, j) => yScale(Y1[j]))
            .attr('height', (_, j) => yScale(0) - yScale(Y1[j]))
            .attr('transform', `translate(${-width / 10}, ${0})`);

          d3.selectAll('.group' + i)
            .on('mouseover', mouseoverHist)
            .on('mouseleave', mouseleaveRec);
          histogram.exit().remove();
        }
      }
    } else if (xIdx !== index) {
      d3.select(`#${columns[xIdx]}`).remove();
    }
  });

  const maxBinLen = d3.max(allBins, (b) => b.length);
  const histYScales = d3
    .scaleLinear()
    .domain([0, maxBinLen as number])
    .range([cHeight, 0]);
  const xAxis = d3
    .axisBottom()
    .tickFormat((d) => `${expo(+d, 0)}`)
    .ticks(3);
  const yAxis = d3.axisLeft().ticks(3);

  const yAxisLine = svg
    .value!.append('g')
    .selectAll('g')
    .data([histYScales])
    .join('g')
    .attr('transform', `translate(${padding * 6 + 5},${padding * 16 - 5})`)
    .attr('class', 'yAxisGroup')
    .call(yAxis.scale(histYScales));

  yAxisLine.selectAll('text').attr('font-size', 20).attr('font-family', 'sans-serif');

  const xAxisLine = svg
    .value!.append('g')
    .selectAll('.xAxisGroup')
    .data(xScales)
    .join('g')
    .attr('transform', `translate(${width / 15}, ${width + padding * 10 + 5})`)
    .attr('class', 'xAxisGroup')
    .call(xAxis.scale(xScales[index]));

  xAxisLine
    .selectAll('text')
    .attr('font-size', 18)
    .attr('font-family', 'sans-serif')
    .attr('text-anchor', 'middle');

  const transitionDuration = 200;
  const exitTransition = d3.transition().duration(transitionDuration);
  const updateTransition = exitTransition.transition().duration(transitionDuration);

  tooltipInfo.forEach((d, i) => {
    const mean = d.mean;
    svg
      .value!.append('g')
      .append('line')
      .attr('class', 'mean-line' + i)
      .raise()
      .transition(updateTransition)
      .attr('x1', xScales[index](mean) + width / 15)
      .attr('y1', width + padding * 10 + 5)
      .attr('x2', xScales[index](mean) + width / 15)
      .attr('y2', padding * 16 - 5)
      .attr('stroke', colors[datasetDic[i]])
      .attr('stroke-width', 6)
      .attr('fill', 'None')
      .style('stroke-dasharray', '5, 5');
  });

  const tooltipContent = tooltipInfo.map(
    (d) =>
      `<b>Dataset: </b>${d.name}<br><b>Range: </b>${expo(d.min, 0)} to ${expo(
        d.max,
        0
      )}<br><b>Mean: </b>${expo(d.mean.toPrecision(4))}<br><b>Median: </b>${expo(d.median, 0)}<br>`
  );

  d3.select(container)
    .append('div')
    .style('overflow-y', 'auto')
    .style('width', '280px')
    .style('height', '200px')
    .attr('class', 'tooltip_hist')
    .style('position', 'fixed')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('stroke', 'white')
    .style('box-shadow', '5px 5px 5px 0px rgba(0,0,0,0.3)')
    .style('border-width', '2px')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('visibility', 'visible')
    .html(tooltipContent.join('<br>'))
    .style('top', '100px')
    .style('left', '25vw');
}

// === WATCHERS ===
watch(
  () => activeData.value,
  () => {
    if (chartReady.value && histogramPlot.value) {
      update(histogramPlot.value, fetchedNames.value.length);
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

watch(
  () => query1.value,
  () => {
    if (chartReady.value && svg.value && histogramPlot.value) {
      update(histogramPlot.value, fetchedNames.value.length);
    }
  }
);

// === ON MOUNT ===
onMounted(() => {
  store.commit('metamineNU/setPage', 'hist', { root: true });
  if (histogramPlot.value) {
    createSvg(histogramPlot.value);
  }
});
</script>
