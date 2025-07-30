<template>
  <div class="main tool_page pixelunit wrapper">
    <div class="md-layout md-alignment-top-left md-gutter adjust-padding">
      <div class="md-layout-item md-size-100">
        <h2>2D Pixelated Static Metamaterial Properties: Interactive Plot</h2>
        <p>Select properties from the dropdown menus below to graph on the x and y axes.</p>
        <p>
          Hovering over data points provides additional information. Scroll to zoom, click and drag
          to pan, and double-click to reset.
        </p>
      </div>
      <div class="section_loader" v-if="loading">
        <spinner :loading="loading" text="Loading metamaterial data..." />
      </div>
      <div class="section_loader" v-else-if="error.status">
        Error while rendering Vega-Lite specification: {{ error.message }}.
      </div>
      <div
        class="md-layout-item md-small-size-100"
        style="margin: 2rem"
        v-show="!loading && !error.status"
      >
        <div>
          <div class="viz-u-display__desktop" />
          <span class="md-layout md-gutter">
            <div class="md-layout-item md-size-30">
              <div class="facet-content_label">X Axis</div>
              <select class="form__select facet-content_item" name="xaxis" v-model="xAxis">
                <option v-for="(val, index) in xAxisOpts" :key="index" :value="val.label">
                  {{ val.label }}
                </option>
              </select>
            </div>
            <div class="md-layout-item md-size-30">
              <div class="facet-content_label">Y Axis</div>
              <select class="form__select facet-content_item" name="yaxis" v-model="yAxis">
                <option v-for="(val, index) in yAxisOpts" :key="index" :value="val.label">
                  {{ val.label }}
                </option>
              </select>
            </div>
            <div class="md-layout-item md-size-30">
              <div class="facet-content_label">Unit cell size</div>
              <select class="form__select facet-content_item" name="pixelDim" v-model="pixelDim">
                <option v-for="(val, index) in pixelDimOpts" :key="index" :value="val.attr">
                  {{ val.label }}
                </option>
              </select>
            </div>
          </span>
          <div v-if="loading" style="margin-top: 1rem">
            <spinner :loading="loading" text="Updating chart..." />
          </div>
          <div id="vegaembed" class="btn--animated vega-embed-chartview" style="width: 100%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import Spinner from '@/components/Spinner.vue';
import { buildCsvSpec } from '@/modules/vega-chart';
import embed from 'vega-embed';
import { baseSpec, createPatch } from '@/modules/metamine/metamaterial-vegalite';
import { METAMATERIAL_QUERY } from '@/modules/gql/metamaterial-gql';
import {
  METAMATERIAL_COLUMNS,
  GRID_OPTIONS,
  DEFAULT_QUERY_VALUES,
} from '@/modules/metamine/constants';

defineOptions({ name: 'MetamaterialPlot' });

interface Attribute {
  attr: string;
  label: string;
}

interface PixelDimOption {
  attr: string;
  label: string;
}

interface ErrorState {
  status: boolean;
  message: string | null;
}

interface PixelData {
  totalItems: number;
  data: any[];
}

// Reactive data
const loading = ref(false);
const timeout = ref<ReturnType<typeof setTimeout> | null>(null);
const spec = ref<any>(null);
const baseSpecRef = ref(baseSpec);
const error = ref<ErrorState>({ status: false, message: null });
const pixelDim = ref('TEN');
const xAxis = ref(DEFAULT_QUERY_VALUES.query1);
const yAxis = ref(DEFAULT_QUERY_VALUES.query2);
const pixelData = ref<PixelData | Record<string, never>>({});

// Dictionary so we can add more attributes in the future
// that might have different attr names than labels
const attributes = ref<Attribute[]>(METAMATERIAL_COLUMNS.map((col) => ({ attr: col, label: col })));

const pixelDimOpts = ref<PixelDimOption[]>(
  GRID_OPTIONS.map((option) => ({ attr: option.attr, label: option.label }))
);

// Computed properties
// Don't allow graphing the same property against itself (causes vega-lite errors)
const xAxisOpts = computed(() => {
  return attributes.value.filter((attr) => attr.label !== yAxis.value);
});

const yAxisOpts = computed(() => {
  return attributes.value.filter((attr) => attr.label !== xAxis.value);
});

// GraphQL query
const { result: pixelDataResult, loading: apolloLoading } = useQuery(
  METAMATERIAL_QUERY,
  computed(() => ({
    input: { unitCell: pixelDim.value },
  })),
  {
    fetchPolicy: 'cache-and-network',
  }
);

// Watch for GraphQL result changes
watch(
  pixelDataResult,
  (newResult) => {
    if (newResult?.pixelData) {
      pixelData.value = newResult.pixelData;
      buildSpec();
      patchVegaSpec();
    }
  },
  { immediate: true }
);

// Methods
const buildSpec = () => {
  if ('data' in pixelData.value && pixelData.value.data) {
    spec.value = buildCsvSpec(baseSpecRef.value as any, pixelData.value.data);
  }
};

// Handle screen resizing
const alignVegaTooltips = () => {
  const canvas = document.getElementsByClassName('marks')[0] as HTMLElement;
  const vegaBindings = document.getElementsByClassName('vega-bindings')[0] as HTMLElement;
  if (canvas && vegaBindings) {
    vegaBindings.style.width = canvas.style.width;
  }
};

// Enables dynamic bindings
const patchVegaSpec = async () => {
  try {
    if (spec.value) {
      await embed('#vegaembed', spec.value, createPatch(xAxis.value, yAxis.value)).then(() =>
        alignVegaTooltips()
      );
    }
  } catch (e) {
    error.value = { status: true, message: (e as Error).message };
  } finally {
    loading.value = false;
  }
};

/**
 * Pause to allow event to register
 */
const changeAxes = () => {
  loading.value = true;
  if (timeout.value) {
    clearTimeout(timeout.value);
  }
  timeout.value = setTimeout(async () => await patchVegaSpec(), 500);
};

// Watchers
watch(xAxis, () => {
  changeAxes();
});

watch(yAxis, () => {
  changeAxes();
});

// Watch for Apollo loading state
watch(apolloLoading, (newLoading) => {
  if (newLoading) {
    loading.value = true;
  }
});
</script>
