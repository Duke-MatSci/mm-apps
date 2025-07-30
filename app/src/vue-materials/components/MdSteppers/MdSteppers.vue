<template>
  <div class="md-steppers" :class="[steppersClasses, mdActiveTheme]">
    <div class="md-steppers-navigation" v-if="!mdVertical">
      <md-step-header v-for="(_, index) in MdSteppers.items" :key="index" :index="index" />
    </div>

    <div class="md-steppers-wrapper" :style="contentStyles">
      <div class="md-steppers-container" :style="containerStyles">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, provide, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MdStepHeader from './MdStepHeader.vue';

interface Props {
  mdSyncRoute?: boolean;
  mdDynamicHeight?: boolean;
  mdVertical?: boolean;
  mdLinear?: boolean;
  mdAlternative?: boolean;
  mdActiveStep?: string | number;
  mdTheme?: string;
}

const props = withDefaults(defineProps<Props>(), {
  mdSyncRoute: false,
  mdDynamicHeight: false,
  mdVertical: false,
  mdLinear: false,
  mdAlternative: false,
  mdActiveStep: 0,
  mdTheme: 'default',
});

const emit = defineEmits<{
  'md-changed': [value: string | number];
  'update:mdActiveStep': [value: string | number];
}>();

// Inject theme from parent component
const mdActiveTheme = inject(
  'mdActiveTheme',
  computed(() => `md-theme-${props.mdTheme}`)
);

// Reactive data
const activeStepIndex = ref(0);
const noTransition = ref(true);
const contentStyles = ref<Record<string, string>>({});
const activeButtonEl = ref<HTMLElement | null>(null);

const MdSteppers = ref({
  activeStep: props.mdActiveStep,
  isLinear: props.mdLinear,
  isVertical: props.mdVertical,
  items: {} as Record<string, any>,
  syncRoute: props.mdSyncRoute,
  getStepperNumber: (id: string) => {
    const stepperNames = Object.keys(MdSteppers.value.items);
    return stepperNames.indexOf(id) + 1;
  },
  setActiveStep: (id: string) => {
    if (props.mdLinear && !MdSteppers.value.isPreviousStepperDone(id)) {
      return false;
    }

    if (id !== MdSteppers.value.activeStep && (isStepperEditable(id) || !isStepperDone(id))) {
      setPreviousStepperAsDone(id);
      MdSteppers.value.activeStep = id;
      emit('md-changed', id);
      emit('update:mdActiveStep', id);
      MdSteppers.value.items[id].error = null;
    }
  },
  isPreviousStepperDone: (id: string) => {
    const { items } = MdSteppers.value;
    const stepperNames = Object.keys(items);
    const activeIndex = MdSteppers.value.getStepperNumber(id) - 2;
    const previousIndex = stepperNames[activeIndex];

    if (!previousIndex) {
      return true;
    }

    return items[previousIndex].done;
  },
});

// Provide MdSteppers to child components
provide('MdSteppers', MdSteppers);

const steppersClasses = computed(() => {
  return {
    'md-no-transition': noTransition.value,
    'md-alternative': props.mdAlternative,
    'md-horizontal': !props.mdVertical,
    'md-vertical': props.mdVertical,
    'md-dynamic-height': props.mdDynamicHeight,
  };
});

const activeIndex = computed(() => {
  return MdSteppers.value.activeStep;
});

const containerStyles = computed(() => {
  return {
    transform: !props.mdVertical
      ? `translate3D(${-activeStepIndex.value * 100}%, 0, 0)`
      : undefined,
  };
});

// Methods
const hasActiveStep = () => {
  return MdSteppers.value.activeStep || props.mdActiveStep;
};

const getItemsAndKeys = () => {
  const items = MdSteppers.value.items;
  return {
    items,
    keys: Object.keys(items),
  };
};

const isStepperDone = (id: string) => {
  return MdSteppers.value.items[id]?.done;
};

const isStepperEditable = (id: string) => {
  return MdSteppers.value.items[id]?.editable;
};

const setStepperAsDone = (id: string) => {
  MdSteppers.value.items[id].done = true;
};

const setPreviousStepperAsDone = (newId: string) => {
  const activeIndex = MdSteppers.value.getStepperNumber(MdSteppers.value.activeStep as string);
  const newIndex = MdSteppers.value.getStepperNumber(newId);

  if (newIndex > activeIndex) {
    setStepperAsDone(MdSteppers.value.activeStep as string);
  }
};

const setActiveButtonEl = () => {
  const element = document.querySelector('.md-stepper-header.md-button.md-active') as HTMLElement;
  activeButtonEl.value = element;
};

const setActiveStepByIndex = (index: number) => {
  const { keys } = getItemsAndKeys();

  if (!hasActiveStep()) {
    MdSteppers.value.activeStep = keys[index];
  }
};

const setupObservers = () => {
  const steppersContent = document.querySelector('.md-steppers-wrapper');

  if ('ResizeObserver' in window) {
    const resizeObserver = new (window as any).ResizeObserver(calculateStepperPos);
    resizeObserver.observe(document.querySelector('.md-steppers'));
  } else {
    (window as any).addEventListener('resize', calculateStepperPos);
  }

  if (steppersContent) {
    // Simplified observer setup for Vue 3
    const observer = new MutationObserver(calculateStepperPos);
    observer.observe(steppersContent, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }
};

const calculateStepperPos = () => {
  if (!props.mdVertical) {
    const stepperElement = document.querySelector(
      `.md-stepper:nth-child(${activeStepIndex.value + 1})`
    ) as HTMLElement;
    if (stepperElement) {
      contentStyles.value = {
        height: `${stepperElement.offsetHeight}px`,
      };
    }
  }
};

const onActiveStepIndex = () => {
  const { items, keys } = getItemsAndKeys();
  if (!hasActiveStep() && !activeStepIndex.value) {
    MdSteppers.value.activeStep = keys[0];
  } else {
    MdSteppers.value.activeStep = keys[activeStepIndex.value];

    for (let i = 0; i < activeStepIndex.value; i++) {
      setStepperAsDone(keys[i]);
    }
  }
};

// Throttled function
let throttleTimeout: number | null = null;
const throttledCalculateStepperPos = () => {
  if (throttleTimeout) {
    clearTimeout(throttleTimeout);
  }
  throttleTimeout = window.setTimeout(calculateStepperPos, 300);
};

// Watchers
watch(
  () => props.mdActiveStep,
  (stepper) => {
    MdSteppers.value.activeStep = stepper;
    emit('md-changed', stepper);
  }
);

watch(
  () => props.mdLinear,
  (isLinear) => {
    MdSteppers.value.isLinear = isLinear;
  }
);

watch(
  () => props.mdVertical,
  (isVertical) => {
    MdSteppers.value.isVertical = isVertical;
  }
);

watch(
  () => activeIndex.value,
  () => {
    nextTick(setActiveButtonEl);
  }
);

watch(
  () => activeStepIndex.value,
  () => {
    onActiveStepIndex();
    nextTick(throttledCalculateStepperPos);
  }
);

watch(
  () => activeButtonEl.value,
  (activeButton) => {
    if (activeButton && activeButton.parentNode) {
      const childNodes = Array.from(activeButton.parentNode.childNodes);
      activeStepIndex.value = childNodes.indexOf(activeButton);
    } else {
      activeStepIndex.value = 0;
    }
  }
);

// Lifecycle
onMounted(() => {
  nextTick()
    .then(() => {
      if (!props.mdSyncRoute) {
        setActiveStepByIndex(0);
      } else {
        onActiveStepIndex();
      }

      return nextTick();
    })
    .then(() => {
      setActiveButtonEl();
      calculateStepperPos();

      window.setTimeout(() => {
        noTransition.value = false;
        setupObservers();
      }, 100);
    });
});

onBeforeUnmount(() => {
  if (!('ResizeObserver' in window)) {
    (window as any).removeEventListener('resize', calculateStepperPos);
  }
});

defineOptions({
  name: 'MdSteppers',
  components: {
    MdStepHeader,
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdElevation/mixins.scss';
@import '../MdLayout/mixins.scss';
@import './theme.scss';

$md-stepper-icon-size: 24px;

.md-steppers {
  transition: 0.3s $md-transition-default-timing;
  transition-property: color, background-color;
  will-change: color, background-color;

  &.md-no-transition * {
    transition: none !important;
  }

  &.md-dynamic-height .md-steppers-wrapper {
    transition: height 0.3s $md-transition-default-timing;
    will-change: height;
  }

  &.md-horizontal.md-alternative {
    .md-stepper-header {
      height: 104px;

      &:first-of-type {
        .md-stepper-icon,
        .md-stepper-number {
          &:before {
            content: none;
          }
        }
      }

      &:last-of-type {
        .md-stepper-icon,
        .md-stepper-number {
          &:after {
            content: none;
          }
        }
      }

      .md-ripple {
        justify-content: center;
      }

      .md-button-content {
        padding-top: 16px;
        flex-direction: column;

        &:before,
        &:after {
          content: none;
        }
      }

      .md-stepper-text {
        height: 32px;
        justify-content: flex-start;
        text-align: center;
      }

      .md-stepper-icon,
      .md-stepper-number {
        margin: 0 8px 8px;
        position: relative;

        &:after,
        &:before {
          width: 9999%;
          height: 1px;
          position: absolute;
          top: 50%;
          z-index: 2;
          transition: background-color 0.3s $md-transition-default-timing;
          will-change: background-color;
          content: ' ';
        }

        &:after {
          left: calc(100% + 8px);
        }

        &:before {
          right: 32px;
        }
      }
    }
  }

  &.md-vertical {
    .md-stepper-header {
      height: 56px;

      .md-ripple {
        padding: 0 24px 0 16px;
      }
    }

    .md-steppers-container {
      display: block;
    }

    .md-button-content {
      &:before,
      &:after {
        content: none;
      }
    }

    .md-stepper-icon,
    .md-stepper-number {
      margin-right: 12px;
    }

    .md-stepper {
      flex: none;
      padding: 0;
      position: relative;

      &:last-of-type:after {
        content: none;
      }

      &:after {
        width: 1px;
        position: absolute;
        top: 48px;
        bottom: -8px;
        left: 36px;
        z-index: 2;
        transition: background-color 0.3s $md-transition-default-timing;
        will-change: background-color;
        content: ' ';
      }
    }
  }
}

.md-steppers-navigation {
  @include md-elevation(2);
  display: flex;

  .md-stepper-header {
    width: auto;
  }
}

.md-stepper-header {
  width: 100%;
  height: 72px;
  margin: 0;
  flex: 1;
  border-radius: 0;
  font-weight: 400;
  text-align: left;
  text-transform: none;

  &:first-of-type .md-button-content:before {
    content: none;
  }

  &:last-of-type .md-button-content:after {
    content: none;
  }

  &.md-active,
  &.md-error {
    font-weight: 500;
  }

  .md-ripple {
    padding: 0 16px;
    justify-content: flex-start;
  }

  .md-button-content {
    padding: 0 8px;
    display: flex;
    align-items: center;
    transition: color 0.3s $md-transition-default-timing;
    will-change: color;

    &:after,
    &:before {
      height: 1px;
      position: absolute;
      top: 50%;
      transition: background-color 0.3s $md-transition-default-timing;
      will-change: background-color;
      content: ' ';
    }

    &:after {
      width: 9999%;
      left: 100%;
    }

    &:before {
      width: 16px;
      left: -16px;
    }

    svg {
      transition: 0.3s $md-transition-default-timing;
      transition-property: color, fill;
      will-change: color, fill;
    }
  }
}

.md-stepper-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: 16px;
  white-space: nowrap;
}

.md-stepper-icon,
.md-stepper-number {
  margin-right: 8px;
  transition: color 0.3s $md-transition-default-timing;
  will-change: color;
}

.md-stepper-number {
  width: $md-stepper-icon-size;
  height: $md-stepper-icon-size;
  border-radius: $md-stepper-icon-size;
  transition: 0.3s $md-transition-default-timing;
  transition-property: color, background-color;
  will-change: color, background-color;
  font-size: 12px;
  line-height: $md-stepper-icon-size;
  text-align: center;
}

.md-stepper-done {
  width: 20px;
  height: 20px;
  transform: translateY(-1px);
}

.md-stepper-editable {
  width: 14px;
  height: 14px;
  transform: translateY(-1px);
}

.md-stepper-error,
.md-stepper-description {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
}

.md-stepper-description {
  opacity: 0.54;
}

.md-steppers-wrapper {
  overflow: hidden;
  transition: none;
  will-change: height;
}

.md-steppers-container {
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  transform: translateZ(0);
  transition: transform 0.35s $md-transition-default-timing;
  will-change: transform;
}

.md-stepper {
  width: 100%;
  flex: 1 0 100%;
  padding: 16px 24px;

  @include md-layout-small {
    padding: 8px 16px;
  }
}
</style>
