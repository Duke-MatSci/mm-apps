<template>
  <md-toolbar class="md-app-toolbar" v-bind="$attrs" :class="toolbarClasses" :style="toolbarStyles">
    <slot />
  </md-toolbar>
</template>

<script lang="ts">
import { defineComponent, inject, computed, onMounted } from 'vue';

interface MdAppToolbar {
  element: HTMLElement | null;
  titleElement: HTMLElement | null;
  height: string;
  initialHeight: number;
  top: number;
  titleSize: number;
  hasElevation: boolean;
  revealActive: boolean;
  fixedLastActive: boolean;
  fixedLastHeight: number;
  overlapOff: boolean;
}

interface MdApp {
  toolbar: MdAppToolbar;
}

export default defineComponent({
  name: 'MdAppToolbar',
  inject: {
    MdApp: {
      default: null,
    },
  },
  computed: {
    toolbarClasses() {
      const mdApp = this.MdApp as MdApp;
      return {
        'md-no-elevation': !mdApp?.toolbar.hasElevation,
        'md-reveal-active': mdApp?.toolbar.revealActive,
        'md-fixed-last-active': mdApp?.toolbar.fixedLastActive,
        'md-overlap-off': mdApp?.toolbar.overlapOff,
      };
    },
    toolbarStyles() {
      const mdApp = this.MdApp as MdApp;
      let styles: any = {
        top: `${mdApp?.toolbar.top || 0}px`,
      };

      if (mdApp?.toolbar.fixedLastActive) {
        styles['transform'] = `translate3D(0, ${mdApp.toolbar.fixedLastHeight}px, 0)`;
      }

      return styles;
    },
  },
  mounted() {
    const mdApp = this.MdApp as MdApp;
    const title = this.$el.querySelector('.md-title, .md-display-1, .md-display-2');

    if (mdApp) {
      mdApp.toolbar.element = this.$el;
      mdApp.toolbar.titleElement = title;

      if (title) {
        mdApp.toolbar.titleSize = parseInt(window.getComputedStyle(title).fontSize, 10);
      }
    }
  },
});
</script>

<style lang="scss">
@import '../MdAnimation/variables';

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
