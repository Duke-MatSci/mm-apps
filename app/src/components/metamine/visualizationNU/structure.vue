<template>
  <div ref="structurePlot"></div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as d3 from 'd3';

defineOptions({ name: 'Structure' });

const store = useStore();
const structurePlot = ref<HTMLElement>();
let svg: any = null;

const MARGIN = {
  TOP: 30,
  RIGHT: 30,
  BOTTOM: 30,
  LEFT: 30,
};
const SIDE = 230;
const WIDTH = SIDE - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = SIDE - MARGIN.TOP - MARGIN.BOTTOM;

// Computed properties
const dataPoint = computed(() => store.state.metamineNU.dataPoint);

// Methods
const createSvg = (dataPoint: any) => {
  if (!structurePlot.value) return;

  const height = dataPoint.height ? dataPoint.height : HEIGHT;
  const width = dataPoint.width ? dataPoint.width : WIDTH;
  const marginLeft = dataPoint.marginLeft ? dataPoint.marginLeft : MARGIN.LEFT;
  const marginTop = dataPoint.marginTop ? dataPoint.marginTop : MARGIN.TOP;

  svg = d3
    .select(structurePlot.value)
    .append('svg')
    .attr('width', width + marginLeft * 2)
    .attr('height', height + marginTop * 2)
    .attr('viewBox', [0, 0, width + marginLeft * 2, height + marginTop * 2])
    .style('z-index', 10)
    .style('margin-bottom', '20px')
    .style('padding-bottom', '10px')
    .append('g')
    .attr('transform', `translate(${marginLeft}, ${marginTop})`);

  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', 0 - marginTop / 2)
    .attr('text-anchor', 'middle')
    .style('font-size', dataPoint.fontSize ? dataPoint.fontSize : '16px')
    .style('font-family', 'Arial, sans-serif')
    .text('Unit Cell Geometry');

  svg
    .append('text')
    .attr('x', width / 2)
    .attr('y', height + marginTop)
    .attr('class', 'volumn-ratio')
    .attr('text-anchor', 'middle')
    .style('font-size', dataPoint.fontSize ? dataPoint.fontSize : '16px')
    .style('font-family', 'Arial, sans-serif');

  update(dataPoint);
};

const update = (dataPoint: any) => {
  if (!svg || !structurePlot.value) return;

  const data = dataPoint.geometry;
  const color = dataPoint.outline_color;
  const height = dataPoint.height ? dataPoint.height : HEIGHT;
  const width = dataPoint.width ? dataPoint.width : WIDTH;
  const marginLeft = dataPoint.marginLeft ? dataPoint.marginLeft : MARGIN.LEFT;

  let res: any[] = [];
  res = pixelate(data, color);
  const yScale = d3.scaleLinear().domain([0, 50]).range([height, 0]);
  const xScale = d3.scaleLinear().domain([0, 50]).range([0, width]);

  const size = (width + marginLeft * 2) / 50;
  const ratio = calculateRatio(data);
  svg.select('.volumn-ratio').text(`Volumn Ratio: ${ratio}`);

  const pixels = svg.selectAll('rect').data(res);
  pixels
    .enter()
    .append('rect')
    .merge(pixels)
    .attr('x', (d: any) => xScale(d.x))
    .attr('y', (d: any) => yScale(d.y))
    .attr('width', size)
    .attr('height', size)
    .attr('fill', (d: any) => d.fill);

  pixels.exit().remove();

  const tooltip = d3
    .select(structurePlot.value)
    .append('div')
    .attr('class', 'nuplot-tooltip')
    .style('background-color', 'white')
    .style('border', 'solid')
    .style('border-width', '1px')
    .style('border-radius', '5px')
    .style('padding', '10px')
    .style('visibility', 'hidden')
    .style('z-index', 100);

  const mouseover = function (event: any, d: any) {
    tooltip.style('visibility', 'visible');
  };

  const mousemove = function (event: any, d: any) {
    tooltip
      .html(`(${data.CM0 || 'N/A'}, ${data.CM1 || 'N/A'})`)
      .style('left', event.pageX + 10 + 'px')
      .style('top', event.pageY + 10 + 'px');
  };

  const mouseleave = function (event: any, d: any) {
    tooltip.style('visibility', 'hidden');
  };

  svg.on('mouseover', mouseover).on('mousemove', mousemove).on('mouseleave', mouseleave);
};

const calculateRatio = (data: any) => {
  if (!data) return 0;
  let count1 = 0;
  const xSquares = 50;
  const ySquares = 50;
  for (let i = 0; i < xSquares; i++) {
    for (let j = 0; j < ySquares; j++) {
      if (data[i * xSquares + j] === '1') count1++;
    }
  }
  return (count1 / (xSquares * ySquares)).toFixed(2);
};

const pixelate = (data: any, color: string) => {
  if (!data) return [];
  const xSquares = 50;
  const ySquares = 50;
  const d: any[] = [];
  for (let i = 0; i < xSquares; i++) {
    for (let j = 0; j < ySquares; j++) {
      d.push({
        x: i,
        y: j,
        fill: data[i * xSquares + j] === '0' ? 'white' : color,
      });
    }
  }
  return d;
};

// Lifecycle
onMounted(() => {
  createSvg(dataPoint.value);
});

// Watchers
watch(
  dataPoint,
  (val) => {
    if (svg) {
      update(val);
    }
  },
  { deep: true }
);
</script>
