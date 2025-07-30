<template>
  <div class="md-card-expand-content" :style="contentStyles">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import MdObserveElement from '../../../core/utils/MdObserveElement';

// Inject MdCard context
const MdCard = inject('MdCard') as any;

// Reactive data
const marginTop = ref(0);
const resizeObserver = ref<any>(null);
const transitionEnabled = ref(true);

// Computed properties
const expand = computed(() => {
  return MdCard?.expand;
});

const contentStyles = computed(() => {
  return {
    'margin-top': `-${marginTop.value}px`,
    opacity: marginTop.value === 0 ? 1 : 0,
    'transition-property': transitionEnabled.value ? undefined : 'none',
  };
});

// Methods
const calculateMarginTop = () => {
  const element = document.querySelector('.md-card-expand-content') as HTMLElement;
  if (!element) return;

  if (!expand.value) {
    const firstChild = element.children[0] as HTMLElement;
    if (firstChild) {
      marginTop.value = firstChild.offsetHeight;
    }
  } else {
    marginTop.value = 0;
  }
};

const calculateMarginTopImmediately = () => {
  if (expand.value) {
    return;
  }

  transitionEnabled.value = false;
  nextTick(() => {
    calculateMarginTop();
    nextTick(() => {
      // force reflow
      const element = document.querySelector('.md-card-expand-content') as HTMLElement;
      if (element) {
        element.offsetHeight;
      }
      transitionEnabled.value = true;
    });
  });
};

// Watchers
watch(expand, () => {
  calculateMarginTop();
});

// Lifecycle hooks
onMounted(() => {
  calculateMarginTopImmediately();

  const element = document.querySelector('.md-card-expand-content') as HTMLElement;
  if (element) {
    resizeObserver.value = MdObserveElement(
      element,
      {
        childList: true,
        characterData: true,
        subtree: true,
      },
      calculateMarginTopImmediately
    );
  }
});

onBeforeUnmount(() => {
  if (resizeObserver.value) {
    resizeObserver.value.disconnect();
  }
});

// Define component name
defineOptions({
  name: 'MdCardExpandContent',
});
</script>

<style lang="scss">
@import '../../MdAnimation/variables.scss';

.md-card-expand-content {
  overflow: hidden;
  transform: translate3D(0, 0, 0);
  transition: 0.4s $md-transition-default-timing;
  transition-property: opacity, margin-top;
  will-change: opacity, margin-top;
}
</style>
