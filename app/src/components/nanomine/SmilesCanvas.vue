<template>
  <div class="smiles">
    <!--<CanvasWrapper ref="canvas-wrapper"></CanvasWrapper>-->
    <canvas :id="canvasId" ref="wrapped-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as SmilesDrawer from 'smiles-drawer';
import _ from 'lodash';

// NOTE: The old repository had a CanvasWrapper.vue to manage the canvas tag.
// It didn't seem immediately necessary, but if you're coming back to this and
// think it is, then look in the nanomine repository for that file.
// -- Rory Schadler, March 2022.
// import CanvasWrapper from './CanvasWrapper'

// Props
interface Props {
  smilesOptions?: any;
  smilesInput?: string;
  formulaHandler?: ((formula: string) => void) | undefined;
  theme?: string;
  computeOnly?: boolean;
  onSuccessHandler?: (() => void) | undefined;
  onErrorHandler?: ((error: any) => void) | undefined;
}

const props = withDefaults(defineProps<Props>(), {
  smilesOptions: () => ({}),
  smilesInput: '',
  formulaHandler: undefined,
  theme: 'light',
  computeOnly: false,
  onSuccessHandler: undefined,
  onErrorHandler: undefined,
});

// Template refs
const wrappedCanvas = ref<HTMLCanvasElement>();

// Reactive data
const smilesOptionsAdjusted = ref<any>(null);
const smilesDrawer = ref<any>(null);
const smilesValue = ref('');
const smilesTheme = ref(props.theme);
const smilesComputeOnly = ref(props.computeOnly);
const provider = ref({
  context: null as CanvasRenderingContext2D | null,
});

// Computed
const canvasId = computed(() => _.uniqueId('canvasId'));

// Methods
const getMolecularFormula = () => {
  return smilesDrawer.value?.getMolecularFormula();
};

const getParentDimensions = () => {
  if (wrappedCanvas.value?.parentElement) {
    return {
      width: wrappedCanvas.value.parentElement.clientWidth,
      height: wrappedCanvas.value.parentElement.clientHeight,
    };
  }
  return { width: 0, height: 0 };
};

const adjustDimensions = () => {
  const dim = getParentDimensions();
  if (wrappedCanvas.value) {
    wrappedCanvas.value.width = dim.width;
    wrappedCanvas.value.height = dim.height;
  }
};

const getCanvas = () => {
  return wrappedCanvas.value;
};

const clearCanvas = () => {
  const c = wrappedCanvas.value;
  if (c && provider.value.context) {
    provider.value.context.clearRect(0, 0, c.width, c.height);
  }
};

const overrideOptions = (opts: any) => {
  const parentDims = getParentDimensions();
  if (opts) {
    smilesOptionsAdjusted.value = _.clone(opts);
  } else {
    smilesOptionsAdjusted.value = {};
  }
  smilesOptionsAdjusted.value.height = parentDims.height;
  smilesOptionsAdjusted.value.width = parentDims.width;
};

const setInput = (inputStr: string) => {
  if (inputStr) {
    SmilesDrawer.parse(
      smilesValue.value,
      function (tree: any) {
        smilesDrawer.value?.draw(tree, canvasId.value);
        if (props.onSuccessHandler) {
          props.onSuccessHandler();
        }
        if (props.formulaHandler) {
          props.formulaHandler(getMolecularFormula());
        }
      },
      function (err: any) {
        if (props.formulaHandler) {
          props.formulaHandler('*Error*');
        }
        if (props.onErrorHandler) {
          props.onErrorHandler(err);
        }
      }
    );
  } else {
    // clear values on empty input
    if (props.onSuccessHandler) {
      props.onSuccessHandler();
    }
    if (props.formulaHandler) {
      props.formulaHandler('');
    }
    clearCanvas(); // clear the smiles image
  }
};

// Watchers
watch(
  () => props.smilesOptions,
  (v) => {
    overrideOptions(v);
  }
);

watch(
  () => props.smilesInput,
  (v) => {
    smilesValue.value = v;
    setInput(v);
  }
);

watch(
  () => props.theme,
  (v) => {
    smilesTheme.value = v;
  }
);

watch(
  () => props.computeOnly,
  (v) => {
    smilesComputeOnly.value = v;
  }
);

// Lifecycle
onMounted(() => {
  overrideOptions(props.smilesOptions);
  smilesDrawer.value = new SmilesDrawer.Drawer(smilesOptionsAdjusted.value);
  if (wrappedCanvas.value) {
    provider.value.context = wrappedCanvas.value.getContext('2d');
  }
  adjustDimensions();
  smilesValue.value = props.smilesInput;
  setInput(props.smilesInput);
});

// Component name for debugging
defineOptions({
  name: 'Smiles',
});
</script>
