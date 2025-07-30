<template>
  <div class="md-stepper">
    <md-step-header v-if="MdSteppers.isVertical" :index="id" />

    <div
      :class="['md-stepper-content', { 'md-active': isActive }]"
      :tabindex="tabIndex"
      v-show="isActive"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, watch, onMounted, onBeforeUnmount } from 'vue';
import MdStepHeader from './MdStepHeader.vue';

interface Props {
  id?: string;
  href?: string | number;
  mdLabel?: string;
  mdDescription?: string;
  mdError?: string;
  mdDone?: boolean;
  mdEditable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => 'md-stepper-' + Math.random().toString(36).substr(2, 9),
  mdEditable: true,
});

const emit = defineEmits<{
  'update:mdError': [value: string];
  'update:mdDone': [value: boolean];
}>();

// Inject MdSteppers from parent
const MdSteppers = inject<any>('MdSteppers');

const isActive = computed(() => {
  return props.id === MdSteppers?.activeStep;
});

const tabIndex = computed(() => {
  return !isActive.value ? -1 : 0;
});

const getPropValues = () => {
  const propNames = Object.keys(props);
  const ignoredProps = ['id', 'mdLabel', 'mdDescription', 'mdError', 'mdEditable'];
  let values: Record<string, any> = {};

  propNames.forEach((prop) => {
    if (!ignoredProps.includes(prop)) {
      if ((props as any)[prop]) {
        values[prop] = (props as any)[prop];
      }
    }
  });

  return values;
};

const setStepperData = () => {
  if (MdSteppers) {
    MdSteppers.items[props.id] = {
      label: props.mdLabel,
      description: props.mdDescription,
      error: props.mdError,
      done: props.mdDone,
      editable: props.mdEditable,
      props: getPropValues(),
      events: {},
    };
  }
};

const setupWatchers = () => {
  const getProp = (prop: string) => {
    if (MdSteppers?.items[props.id]) {
      return MdSteppers.items[props.id][prop];
    }
  };

  watch(
    () => getProp('error'),
    (newError) => {
      emit('update:mdError', newError);
    }
  );

  watch(
    () => getProp('done'),
    (newDone) => {
      emit('update:mdDone', newDone);
    }
  );
};

onMounted(() => {
  setStepperData();
  setupWatchers();
});

onBeforeUnmount(() => {
  if (MdSteppers?.items[props.id]) {
    delete MdSteppers.items[props.id];
  }
});

defineOptions({
  name: 'MdStep',
  components: {
    MdStepHeader,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-steppers.md-vertical .md-stepper-content {
  padding: 0 24px 0 60px;
  height: 0;
  overflow: hidden;
  opacity: 0;
  transform: translate3D(0, -20px, 0);
  transition: 0.35s $md-transition-stand-timing;
  transition-property: opacity, transform, height, padding-bottom;
  will-change: opacity, transform, height, padding-bottom;

  &.md-active {
    height: auto;
    padding-bottom: 40px;
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }
}
</style>
