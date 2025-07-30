<template>
  <div class="md-app md-layout-column">
    <slot name="md-app-drawer-left"></slot>
    <slot name="md-app-drawer-right-previous"></slot>

    <div class="md-app-container md-layout-column">
      <slot name="md-app-toolbar" :toolbar-classes="toolbarClasses" :toolbar-styles="toolbarStyles">
        <div
          class="md-toolbar md-app-toolbar md-theme-default md-elevation-4"
          :class="toolbarClasses"
          :style="toolbarStyles"
        ></div>
      </slot>

      <div
        class="md-app-scroller md-layout-column md-flex"
        :class="scrollerClasses"
        @scroll="handleScroll"
      >
        <slot name="md-app-content"></slot>
      </div>
    </div>

    <slot name="md-app-drawer-right"></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { useMdAppMixin } from './MdAppMixin';

// Props
interface Props {
  mdMode?: string;
  mdWaterfall?: boolean;
  mdScrollbar?: boolean;
  mdTheme?: string | boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mdMode: undefined,
  mdWaterfall: false,
  mdScrollbar: true,
  mdTheme: undefined,
});

// Use MdAppMixin
const { MdApp, scrollerClasses, handleScroll } = useMdAppMixin(props);

// Toolbar classes and styles
const toolbarClasses = computed(() => {
  return {
    'md-theme-default': true, // Default theme class
    'md-elevation-4': MdApp.value.toolbar.hasElevation, // Default elevation
    'md-no-elevation': !MdApp.value.toolbar.hasElevation,
    'md-reveal-active': MdApp.value.toolbar.revealActive,
    'md-fixed-last-active': MdApp.value.toolbar.fixedLastActive,
    'md-overlap-off': MdApp.value.toolbar.overlapOff,
  };
});

const toolbarStyles = computed(() => {
  let styles: Record<string, string> = {
    top: `${MdApp.value.toolbar.top}px`,
  };

  if (MdApp.value.toolbar.fixedLastActive) {
    styles['transform'] = `translate3D(0, ${MdApp.value.toolbar.fixedLastHeight}px, 0)`;
  }

  return styles;
});

// Define component name
defineOptions({
  name: 'MdAppSideDrawer',
});
</script>

<style lang="scss">
@import '../MdAnimation/variables.scss';
@import '../MdLayout/mixins.scss';

.md-app {
  display: flex;
  overflow: hidden;
  position: relative;
  height: 100vh;

  &.md-fixed {
    .md-app-scroller {
      overflow: auto;
    }
  }

  &.md-reveal,
  &.md-fixed-last,
  &.md-overlap,
  &.md-flexible {
    transform: translate3d(0, 0, 0);

    .md-app-toolbar {
      position: absolute;
      top: 0;
    }
  }

  &.md-flexible,
  &.md-overlap {
    .md-app-toolbar {
      min-height: 0;
    }
  }

  &.md-flexible {
    .md-toolbar-row {
      &:first-child {
        z-index: 2;
      }

      &:last-child {
        position: fixed;
        bottom: 0;
        z-index: 1;
      }
    }

    .md-display-1 {
      position: fixed;
    }
  }

  // App toolbar styles
  .md-app-toolbar {
    min-height: 64px;
  }

  .md-overlap {
    .md-app-toolbar {
      height: 196px;
    }
  }

  .md-fixed-last-active {
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transition-property: box-shadow, transform;
    will-change: height, box-shadow, transform;
  }

  .md-overlap-off {
    z-index: 3 !important;
  }

  .md-no-elevation {
    box-shadow: none !important;
  }

  .md-reveal,
  .md-fixed-last,
  .md-flexible,
  .md-overlap {
    .md-reveal-active {
      transform: translate3d(0, calc(100% + 10px), 0);
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: box-shadow, transform;
      will-change: height, box-shadow, transform;
    }
  }

  &.md-overlap {
    .md-app-toolbar {
      z-index: 1;
    }

    .md-app-content {
      margin: -64px 24px 24px;
      position: relative;
      z-index: 2;

      @include md-layout-small {
        margin: -64px 16px 16px;
      }

      @include md-layout-xsmall {
        margin: -64px 8px 8px;
      }
    }
  }
}

.md-app-drawer {
  &.md-permanent-card + .md-app-scroller .md-content {
    @include md-layout-small-and-up {
      padding-left: 0;
      padding-right: 0;
      border-left: none;
      border-right: none;
    }
  }
}

.md-app-content {
  padding: 16px;

  @include md-layout-small-and-up {
    border-left: 1px solid transparent;
    border-right: 1px solid transparent;
  }

  > p {
    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.md-app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translate3D(0, 0, 0);
  transition: padding-left 0.4s $md-transition-default-timing,
    padding-right 0.4s $md-transition-default-timing;
  will-change: padding-left, padding-right;
}

.md-app-scroller {
  flex: 1;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
</style>
