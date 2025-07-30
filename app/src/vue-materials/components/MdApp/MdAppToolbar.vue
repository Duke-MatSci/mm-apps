<template>
  <md-toolbar class="md-app-toolbar" v-bind="$attrs" :class="toolbarClasses" :style="toolbarStyles">
    <slot />
  </md-toolbar>
</template>

<script setup lang="ts">
import { computed, inject, onMounted } from 'vue';

// Inject MdApp context
const MdApp = inject('MdApp') as any;

// Computed properties
const toolbarClasses = computed(() => {
  return {
    'md-no-elevation': !MdApp?.value?.toolbar?.hasElevation,
    'md-reveal-active': MdApp?.value?.toolbar?.revealActive,
    'md-fixed-last-active': MdApp?.value?.toolbar?.fixedLastActive,
    'md-overlap-off': MdApp?.value?.toolbar?.overlapOff,
  };
});

const toolbarStyles = computed(() => {
  let styles: Record<string, string> = {
    top: `${MdApp?.value?.toolbar?.top || 0}px`,
  };

  if (MdApp?.value?.toolbar?.fixedLastActive) {
    styles['transform'] = `translate3D(0, ${MdApp.value.toolbar.fixedLastHeight}px, 0)`;
  }

  return styles;
});

// Lifecycle hooks
onMounted(() => {
  const element = document.querySelector('.md-app-toolbar') as HTMLElement;
  const title = element?.querySelector('.md-title, .md-display-1, .md-display-2') as HTMLElement;

  if (MdApp?.value?.toolbar) {
    MdApp.value.toolbar.element = element;
    MdApp.value.toolbar.titleElement = title;

    if (title) {
      MdApp.value.toolbar.titleSize = parseInt(window.getComputedStyle(title).fontSize, 10);
    }
  }
});

// Define component name
defineOptions({
  name: 'MdAppToolbar',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';

.md-no-elevation {
  box-shadow: none !important;
}

.md-reveal,
.md-fixed-last,
.md-flexible,
.md-overlap {
  .md-reveal-active {
    transform: translate3d(0, calc(100% + 10px), 0);
    transition: 0.3s $md-transition-stand-timing;
    transition-property: box-shadow, transform;
    will-change: height, box-shadow, transform;
  }
}

.md-app-toolbar {
  min-height: 64px;
}

.md-overlap {
  .md-app-toolbar {
    height: 196px;
  }
}

.md-fixed-last-active {
  transition: 0.3s $md-transition-stand-timing;
  transition-property: box-shadow, transform;
  will-change: height, box-shadow, transform;
}

.md-overlap-off {
  z-index: 3 !important;
}
</style>
